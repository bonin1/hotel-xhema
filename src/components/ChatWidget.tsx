'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { FaTimes, FaPaperPlane, FaComments, FaMinus } from 'react-icons/fa';

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

interface ChatWidgetProps {
  userType?: 'guest' | 'staff';
}

export default function ChatWidget({ userType = 'guest' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [roomId] = useState(() => userType === 'staff' ? 'hotel-support' : 'guest-' + Date.now());
  const userNameRef = useRef('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const isStaff = userType === 'staff';

  // Initialize Socket.io connection
  useEffect(() => {
    // Dynamically determine socket URL based on environment
    const getSocketUrl = () => {
      // In browser, check if we're in production
      if (typeof window !== 'undefined') {
        const isProduction = window.location.hostname !== 'localhost' && 
                            window.location.hostname !== '127.0.0.1';
        
        if (isProduction) {
          // In production: Use env variable if available, otherwise use current origin
          const prodUrl = process.env.NEXT_PUBLIC_SOCKET_URL_PROD || window.location.origin;
          console.log('[Chat] Production mode - Socket.IO URL:', prodUrl);
          return prodUrl;
        } else {
          // In development: Use env variable or default to localhost
          const devUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';
          console.log('[Chat] Development mode - Socket.IO URL:', devUrl);
          return devUrl;
        }
      }
      
      // SSR fallback
      return process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';
    };
    
    const socketUrl = getSocketUrl();
    
    const socketInstance = io(socketUrl, {
      path: '/socket.io/',
      transports: ['polling', 'websocket'], // Try polling first
      upgrade: true, // Then upgrade to WebSocket if possible
      withCredentials: false, // Critical for Back4app - prevents 401 errors
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    socketInstance.on('connect', () => {
      console.log('[Chat] Connected to Socket.io server');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('[Chat] Connection error:', error.message);
      console.log('[Chat] Attempting to reconnect...');
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('[Chat] Disconnected:', reason);
      if (reason === 'io server disconnect') {
        // Server disconnected, manually reconnect
        socketInstance.connect();
      }
    });

    socketInstance.on('reconnect', (attemptNumber) => {
      console.log('[Chat] Reconnected after', attemptNumber, 'attempts');
    });

    socketInstance.on('reconnect_error', (error) => {
      console.error('[Chat] Reconnection error:', error.message);
    });

    socketInstance.on('reconnect_failed', () => {
      console.error('[Chat] Failed to reconnect after maximum attempts');
    });

    socketInstance.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketInstance.on('message-history', (history: Message[]) => {
      setMessages(history);
    });

    socketInstance.on('user-typing', ({ userName: typingUser, isTyping }) => {
      // Only show typing indicator if it's not from the current user
      if (typingUser !== userNameRef.current) {
        setOtherUserTyping(isTyping);
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Keep userNameRef in sync with userName
  useEffect(() => {
    userNameRef.current = userName;
  }, [userName]);

  // Handle joining the chat
  const handleJoinChat = () => {
    if (!userName.trim() || !socket) return;

    socket.emit('join-room', {
      roomId,
      userName,
      isStaff,
    });

    setHasJoined(true);
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !socket) return;

    socket.emit('send-message', {
      roomId,
      userName,
      message: inputMessage,
      isStaff,
    });

    setInputMessage('');
    setIsTyping(false);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (!socket) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { roomId, userName, isTyping: true });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing', { roomId, userName, isTyping: false });
    }, 1000);
  };

  // Format timestamp
  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <FaComments className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">Hotel Xhema Support</h3>
              <p className="text-xs text-primary-100">We&apos;re here to help</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-700 p-2 rounded-full transition-colors"
                aria-label="Minimize chat"
                title="Minimize"
              >
                <FaMinus className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setHasJoined(false);
                  setMessages([]);
                  setUserName('');
                }}
                className="hover:bg-primary-700 p-2 rounded-full transition-colors"
                aria-label="Close chat"
                title="Close and reset chat"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Join form or Messages */}
          {!hasJoined ? (
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h4 className="text-xl font-semibold text-neutral-800 mb-4 text-center">
                Start a conversation
              </h4>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleJoinChat()}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
              />
              <button
                onClick={handleJoinChat}
                disabled={!userName.trim()}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Start Chat
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
                {messages.map((msg, index) => {
                  const isOwnMessage = msg.sender.name === userName;
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
                        className={`max-w-[75%] ${
                          isOwnMessage
                            ? 'bg-primary-600 text-white'
                            : msg.sender.isStaff
                            ? 'bg-accent-700 text-white'
                            : 'bg-white text-neutral-800'
                        } rounded-lg px-4 py-2 shadow-sm`}
                      >
                        {!isOwnMessage && (
                          <p className="text-xs font-semibold mb-1 opacity-75">
                            {msg.sender.name}
                            {msg.sender.isStaff && ' (Staff)'}
                          </p>
                        )}
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${isOwnMessage ? 'text-primary-100' : 'text-neutral-500'}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {otherUserTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-neutral-600 rounded-lg px-4 py-2 shadow-sm">
                      <span className="text-sm italic">Typing...</span>
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
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white p-2 rounded-lg transition-colors"
                    aria-label="Send message"
                  >
                    <FaPaperPlane className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
