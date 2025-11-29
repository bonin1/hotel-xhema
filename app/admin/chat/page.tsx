'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { FaPaperPlane, FaUserCircle, FaClock, FaCheckDouble, FaSignOutAlt, FaTimes } from 'react-icons/fa';

interface Message {
  roomId: string;
  sender: {
    id: string;
    name: string;
    isStaff: boolean;
  };
  message: string;
  timestamp: Date;
  read: boolean;
}

interface ChatRoom {
  roomId: string;
  guestName: string;
  messages: Message[];
  lastMessageTime: Date;
  unreadCount: number;
}

export default function StaffDashboard() {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [staffName, setStaffName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const staffNameRef = useRef('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const socketInitializedRef = useRef(false);

  // Check authentication on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch('/api/admin/verify');
        const data = await response.json();

        if (data.authenticated) {
          setIsAuthenticated(true);
          const username = sessionStorage.getItem('adminUsername') || data.username;
          setStaffName(username);
          setHasJoined(true);
        } else {
          router.push('/admin');
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        router.push('/admin');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifyAuth();
  }, [router]);

  // Initialize Socket.io connection when authenticated
  useEffect(() => {
    if (!isAuthenticated || !staffName || socketInitializedRef.current) return;

    socketInitializedRef.current = true;
    
    // Use Back4app for production socket server
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';
    
    const socketInstance = io(socketUrl, {
      path: '/socket.io/',
      transports: ['polling', 'websocket'], // Try polling first
      upgrade: true, // Then upgrade to WebSocket if possible
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketInstance.on('connect', () => {
      console.log('[Staff Dashboard] Connected to Socket.io server');
      
      // Automatically join staff-room when connected
      socketInstance.emit('join-room', {
        roomId: 'staff-room',
        userName: staffName,
        isStaff: true,
      });
      console.log('[Staff Dashboard] Joined staff-room');
    });

    // Listen for new messages in any room
    socketInstance.on('message', (message: Message) => {
      console.log('[Staff Dashboard] Received message:', message);
      
      // Ignore messages from 'staff-room' itself (it's just a notification channel)
      if (message.roomId === 'staff-room') {
        return;
      }
      
      setChatRooms((prev) => {
        const existingRoomIndex = prev.findIndex(room => room.roomId === message.roomId);
        
        if (existingRoomIndex >= 0) {
          const updated = [...prev];
          updated[existingRoomIndex].messages.push(message);
          updated[existingRoomIndex].lastMessageTime = new Date(message.timestamp);
          
          // Increment unread if not active room and not sent by staff
          if (activeRoomId !== message.roomId && !message.sender.isStaff) {
            updated[existingRoomIndex].unreadCount += 1;
          }
          
          // Sort by last message time
          updated.sort((a, b) => 
            new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
          );
          
          return updated;
        } else {
          // New room created by guest
          const newRoom: ChatRoom = {
            roomId: message.roomId,
            guestName: message.sender.name === 'System' 
              ? message.message.split(' ')[0] // Extract name from "X joined the chat"
              : message.sender.name,
            messages: [message],
            lastMessageTime: new Date(message.timestamp),
            unreadCount: message.sender.isStaff ? 0 : 1,
          };
          
          return [newRoom, ...prev];
        }
      });
    });

    socketInstance.on('message-history', (history: Message[]) => {
      console.log('[Staff Dashboard] Received message history:', history.length);
      
      if (activeRoomId && history.length > 0) {
        setChatRooms((prev) => {
          const updated = [...prev];
          const roomIndex = updated.findIndex(room => room.roomId === activeRoomId);
          
          if (roomIndex >= 0) {
            updated[roomIndex].messages = history;
          }
          
          return updated;
        });
      }
    });

    socketInstance.on('user-typing', ({ userName, isTyping: userIsTyping }) => {
      // Only show typing indicator if it's not from the current staff member
      if (userName !== staffNameRef.current) {
        setOtherUserTyping(userIsTyping);
      }
    });

    setSocket(socketInstance);

    return () => {
      console.log('[Staff Dashboard] Cleaning up socket connection');
      socketInitializedRef.current = false;
      socketInstance.disconnect();
    };
  }, [isAuthenticated, staffName]); // Run when authenticated and staffName is set

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatRooms, activeRoomId]);

  // Keep staffNameRef in sync with staffName
  useEffect(() => {
    staffNameRef.current = staffName;
  }, [staffName]);

  // Join a specific room
  const joinRoom = (roomId: string) => {
    if (!socket) return;

    const previousActiveRoom = activeRoomId;
    setActiveRoomId(roomId);

    // Send staff-joined message when staff first opens this conversation
    // Only send if this is a different room than the previous one
    if (previousActiveRoom !== roomId) {
      socket.emit('send-message', {
        roomId,
        userName: 'System',
        message: `${staffName} (Receptionist) joined the chat`,
        isStaff: true,
      });
    }

    // Reset unread count
    setChatRooms((prev) => {
      const updated = [...prev];
      const roomIndex = updated.findIndex(room => room.roomId === roomId);
      
      if (roomIndex >= 0) {
        updated[roomIndex].unreadCount = 0;
      }
      
      return updated;
    });

    console.log('[Staff Dashboard] Viewing room:', roomId);
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !socket || !activeRoomId) return;

    socket.emit('send-message', {
      roomId: activeRoomId,
      userName: staffName,
      message: inputMessage,
      isStaff: true,
    });

    setInputMessage('');
    setIsTyping(false);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  // Handle ending a chat
  const handleEndChat = (roomId: string) => {
    if (!socket) return;

    // Send end chat message to guest
    socket.emit('send-message', {
      roomId,
      userName: 'System',
      message: 'This conversation has been ended by staff. Thank you for contacting Hotel Xhema.',
      isStaff: true,
    });

    // Remove chat from staff dashboard
    setChatRooms((prev) => prev.filter(room => room.roomId !== roomId));
    
    // Clear active room if it was the ended one
    if (activeRoomId === roomId) {
      setActiveRoomId(null);
    }

    console.log('[Staff Dashboard] Ended chat:', roomId);
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (!socket || !activeRoomId) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { roomId: activeRoomId, userName: staffName, isTyping: true });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing', { roomId: activeRoomId, userName: staffName, isTyping: false });
    }, 1000);
  };

  // Format timestamp
  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const activeRoom = chatRooms.find(room => room.roomId === activeRoomId);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      sessionStorage.removeItem('adminUsername');
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F1C338] mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect is already happening in useEffect
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen bg-neutral-100 flex flex-col">
      {/* Header */}
      <div className="bg-[#334e68] text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Staff Dashboard</h1>
            <p className="text-sm text-neutral-200">Logged in as: {staffName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Rooms List */}
        <div className="w-80 bg-white border-r border-neutral-200 overflow-y-auto">
          <div className="p-4 border-b border-neutral-200">
            <h2 className="font-semibold text-neutral-800">Guest Conversations</h2>
            <p className="text-xs text-neutral-500 mt-1">
              {chatRooms.length === 0 ? 'Waiting for guests...' : `${chatRooms.length} active`}
            </p>
          </div>
          
          <div className="divide-y divide-neutral-200">
            {chatRooms.map((room) => (
              <button
                key={room.roomId}
                onClick={() => joinRoom(room.roomId)}
                className={`w-full p-4 text-left hover:bg-neutral-50 transition-colors ${
                  activeRoomId === room.roomId ? 'bg-primary-50 border-l-4 border-primary-600' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-neutral-400 text-xl" />
                    <span className="font-semibold text-neutral-800">{room.guestName}</span>
                  </div>
                  {room.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 font-semibold">
                      {room.unreadCount}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-neutral-600 truncate mb-1">
                  {room.messages[room.messages.length - 1]?.message || 'No messages yet'}
                </p>
                
                <div className="flex items-center gap-1 text-xs text-neutral-500">
                  <FaClock className="w-3 h-3" />
                  <span>{formatDate(room.lastMessageTime)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-neutral-50">
          {activeRoom ? (
            <>
              {/* Chat Header */}
              <div className="bg-white p-4 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-neutral-400 text-3xl" />
                    <div>
                      <h3 className="font-semibold text-neutral-800">{activeRoom.guestName}</h3>
                      <p className="text-sm text-neutral-500">Room ID: {activeRoom.roomId}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEndChat(activeRoom.roomId)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                    title="End conversation"
                  >
                    <FaTimes />
                    <span className="text-sm font-medium">End Chat</span>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeRoom.messages.map((msg, index) => {
                  const isOwnMessage = msg.sender.name === staffName;
                  const isSystemMessage = msg.sender.name === 'System';

                  if (isSystemMessage) {
                    return (
                      <div key={index} className="text-center">
                        <span className="text-xs text-neutral-500 bg-neutral-200 px-3 py-1 rounded-full">
                          {msg.message}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={index}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          isOwnMessage
                            ? 'bg-accent-700 text-white'
                            : 'bg-white text-neutral-800 border border-neutral-200'
                        } rounded-lg px-4 py-2 shadow-sm`}
                      >
                        {!isOwnMessage && (
                          <p className="text-xs font-semibold mb-1 text-neutral-600">
                            {msg.sender.name} (Guest)
                          </p>
                        )}
                        <p className="text-sm">{msg.message}</p>
                        <div className={`flex items-center gap-1 text-xs mt-1 ${
                          isOwnMessage ? 'text-accent-100 justify-end' : 'text-neutral-500'
                        }`}>
                          <span>{formatTime(msg.timestamp)}</span>
                          {isOwnMessage && msg.read && (
                            <FaCheckDouble className="w-3 h-3 text-blue-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {otherUserTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-neutral-200 text-neutral-600 rounded-lg px-4 py-2 shadow-sm">
                      <span className="text-sm italic">Guest is typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-neutral-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => {
                      setInputMessage(e.target.value);
                      handleTyping();
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message to guest..."
                    className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2"
                    aria-label="Send message"
                  >
                    <FaPaperPlane className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-neutral-400">
              <div className="text-center">
                <FaUserCircle className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">Choose a guest from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
