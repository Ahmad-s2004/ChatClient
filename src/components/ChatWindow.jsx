import React, { useEffect } from 'react';
import { ChevronLeft, Search, Video, Plus, Calendar, Hash, Send, MessageSquare, ChartBarDecreasingIcon } from 'lucide-react';

const ChatWindow = ({
    selectedChat, messages, currentUser, onlineUsers, view, setView,
    isSearching, setIsSearching, chatSearchQuery, setChatSearchQuery,
    typedMessage, setTypedMessage, handleSendMessageSubmit, messagesEndRef,
    socket, setMessages
}) => {

    if (!selectedChat) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                <MessageSquare size={48} className="mb-4 opacity-20" />
                <p>Select a chat to start</p>
            </div>
        );
    }

    const isSelectedUserOnline = onlineUsers.includes(selectedChat._id?.toString());
    const selectedChatAvatar = selectedChat.img ? `https://i.pravatar.cc/150?u=${selectedChat.img}` : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedChat.name)}`;

    useEffect(() => {
        if (!socket) return;
    
        const handleIncomingMessage = (newMessage) => {
            // 1. Pehle pure message ko print karo taake inspect element me structure dikhe
            console.log("SOCKET INCOMING PACKET:", newMessage);
    
            // 2. Window ki Active ID nikalen
            const activeChatId = (selectedChat?.chatId || selectedChat?._id || selectedChat)?.toString();
            
            // 3. Fallback lagao taake agar backend 'chat' ya 'sender' bhej raha ho toh code crash ya fail na ho
            const incomingChatId = (newMessage?.chatId || newMessage?.chat)?._id?.toString() || (newMessage?.chatId || newMessage?.chat)?.toString();
            const incomingSenderId = (newMessage?.senderId || newMessage?.sender)?._id?.toString() || (newMessage?.senderId || newMessage?.sender)?.toString();
    
            console.log("DEBUG MATCHING:", {
                activeChatId,
                incomingChatId,
                incomingSenderId,
                isMatch: (incomingChatId === activeChatId || incomingSenderId === activeChatId)
            });
    
            // 4. Match validation or temporary Bypass (agar matching test karni ho)
            if (incomingChatId === activeChatId || incomingSenderId === activeChatId || !incomingChatId) {
                setMessages((prev) => {
                    // Agar bina _id ke real-time instant packet aa raha hai toh content duplicate check lagao
                    const alreadyExists = prev.some(msg => 
                        (msg._id && msg._id === newMessage._id) || 
                        (msg.content === newMessage.content && Math.abs(new Date(msg.createdAt) - new Date(newMessage.createdAt)) < 2000)
                    );
                    
                    if (alreadyExists) {
                        console.log("❌ Message already exists in state, skipping.");
                        return prev;
                    }
                    
                    console.log("✅ Message state me push ho rha ha!");
                    return [...prev, newMessage];
                });
            } else {
                console.log("⚠️ Message drop ho gya kyunki ID match nahi hui.");
            }
        };
    
        socket.on("receive_message", handleIncomingMessage);
        
        return () => {
            socket.off("receive_message", handleIncomingMessage);
        };
    }, [socket, selectedChat, setMessages]);;

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (!typedMessage.trim()) return;

        try {
            const chatIdentifier = selectedChat.chatId || selectedChat._id;
            const receiverId = selectedChat._id;

            if (socket) {
                socket.emit("send_message", {
                    chatId: chatIdentifier,
                    senderId: currentUser?._id,
                    receiverId: receiverId,
                    content: typedMessage,
                    createdAt: new Date().toISOString()
                });
                console.log(currentUser._id)
            }
            await handleSendMessageSubmit(e);

        } catch (error) {
            console.error("Socket emit/send execution broken:", error);
        }
    };

    return (
        <div className={`flex-1 flex flex-col min-w-0 bg-[#121212] ${view === 'chat' ? 'flex' : 'hidden md:flex'}`}>

            <header className="h-20 border-b border-gray-800/60 bg-[#121212]/80 backdrop-blur-md sticky top-0 z-20 flex items-center px-0.5 md:px-8 shadow-2xl">
                {!isSearching ? (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center min-w-0">
                            <button className="md:hidden p-2 hover:bg-gray-800 rounded-full" onClick={() => setView('list')}>
                                <ChevronLeft size={24} />
                            </button>

                            <div className="flex items-center gap-4 truncate">
                                {selectedChat.isSpace ? (
                                    <div className="w-12 h-12 bg-gradient-to-tr from-pink-600 to-rose-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg">🎬</div>
                                ) : (
                                    <div className="relative flex-shrink-0">
                                        <img src={selectedChatAvatar} className="w-12 h-12 rounded-full border-2 border-emerald-500/20" alt="avatar" />
                                        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-[#121212] rounded-full ${isSelectedUserOnline ? 'bg-green-500' : 'bg-gray-500'
                                            }`}></div>
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <h2 className="text-md md:text-lg font-bold text-white flex items-center gap-2 truncate">
                                        {selectedChat.name}
                                        {isSelectedUserOnline && <span className="hidden sm:inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>}
                                    </h2>
                                    <p className="text-xs md:text-sm text-gray-500 font-medium truncate italic">
                                        {isSelectedUserOnline ? "Active now" : "Offline"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <button onClick={() => setIsSearching(true)} className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
                                <Search size={20} />
                            </button>
                            <button className="bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold border border-emerald-600/20 transition-all shadow-lg">
                                <Video size={18} />
                                <span className="hidden sm:block">Meet</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center w-full gap-4">
                        <div className="flex-1 flex items-center bg-[#1e1e1e] rounded-xl px-4 py-2 border border-gray-700 focus-within:border-emerald-500/50 transition-all">
                            <Search size={18} className="text-gray-500 mr-3" />
                            <input
                                autoFocus
                                type="text"
                                value={chatSearchQuery}
                                onChange={(e) => setChatSearchQuery(e.target.value)}
                                placeholder={`Search messages in ${selectedChat.name}...`}
                                className="bg-transparent w-full outline-none text-white text-sm"
                            />
                        </div>
                        <button
                            onClick={() => { setIsSearching(false); setChatSearchQuery(""); }}
                            className="text-sm font-medium text-gray-400 hover:text-white px-2"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                {messages.length > 0 ? (
                    messages
                        .filter(msg => msg.content?.toLowerCase().includes(chatSearchQuery.toLowerCase()))
                        .map((msg, index) => {

                            const msgSenderId = (msg.senderId?._id || msg.senderId || "").toString();
                            const currentUserId = (currentUser?._id || currentUser || "").toString();
                            const isMe = msgSenderId === currentUserId && currentUserId !== "";

                            const userAvatar = isMe
                                ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser?.name || 'You')}`
                                : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedChat.name)}`;

                            return (
                                <div key={msg._id || index} className={`flex space-x-3 md:space-x-4 ${isMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <img src={userAvatar} className="w-10 h-10 rounded-full flex-shrink-0 object-cover" alt="user" />
                                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} flex-1 min-w-0`}>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-bold text-white text-sm">{isMe ? "You" : (msg.senderId?.name || selectedChat.name)}</span>
                                            <span className="text-[10px] text-gray-500">
                                                {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                                            </span>
                                        </div>
                                        <div className={`border rounded-2xl p-4 shadow-lg max-w-2xl text-white text-sm break-words whitespace-pre-wrap ${isMe ? 'bg-emerald-600/20 border-emerald-500/20' : 'bg-[#1a2b3b] border-blue-900/30'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                ) : (
                    <div className="text-center text-gray-600 py-10">No messages yet. Start conversation!</div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 md:p-6 border-t border-gray-800 bg-[#121212]">
                <form onSubmit={onFormSubmit} className="bg-[#1e1e1e] border border-gray-700 rounded-2xl p-3 focus-within:border-gray-500 transition-all shadow-inner">
                    <div className="flex space-x-4 mb-2 text-gray-500">
                        <Plus size={18} className="cursor-pointer hover:text-white" />
                        <Calendar size={18} className="hidden sm:block cursor-pointer hover:text-white" />
                        <Hash size={18} className="hidden sm:block cursor-pointer hover:text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            value={typedMessage}
                            onChange={(e) => setTypedMessage(e.target.value)}
                            className="bg-transparent flex-1 outline-none text-sm text-white min-w-0"
                            placeholder="Write a message..."
                        />
                        <button type="submit" className="p-2 bg-emerald-600/10 hover:bg-emerald-600 rounded-lg group transition-all">
                            <Send size={18} className="text-emerald-500 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;