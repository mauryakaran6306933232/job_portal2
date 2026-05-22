// import React, { useEffect, useState, useRef } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';
// import { Send, Loader2 } from 'lucide-react';

// export default function ChatDialog({ open, setOpen, receiverId, receiverName, jobId }) {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const { user } = useSelector(store => store?.user);
//     const socket = useRef();
//     const scrollRef = useRef();

//     // 1. Connect to Socket and fetch history
//     useEffect(() => {
//         if (open && receiverId) {
//             setLoading(true);
            
//             // Fetch Chat History
//             const fetchMessages = async () => {
//                 try {
//                     const res = await axios.get(`http://localhost:8000/api/v1/message/${receiverId}`, { withCredentials: true });
//                     if (res.data.success) {
//                         setMessages(res.data.messages);
//                     }
//                 } catch (error) {
//                     console.log("Fetch messages error:", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchMessages();

//             // Connect Socket for real-time
//             socket.current = io("http://localhost:8000");
//             socket.current.emit("joinRoom", user?._id);

//             // Listen for incoming messages
//             socket.current.on("receiveMessage", (data) => {
//                 setMessages(prev => [...prev, data]);
//             });
//         }

//         // Cleanup on close
//         return () => {
//             if (socket.current) {
//                 socket.current.disconnect();
//             }
//         };
//     }, [open, receiverId, user]);

//     // 2. Auto-scroll to bottom when new message arrives
//     useEffect(() => {
//         if (scrollRef.current) {
//             scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//         }
//     }, [messages]);

//     // 3. Send Message Handler
//     const sendMessage = async (e) => {
//         e.preventDefault();
//         if (!newMessage.trim()) return;

//         const messageData = {
//             senderId: user._id,
//             receiverId: receiverId,
//             content: newMessage,
//             jobId: jobId || null
//         };

//         // Emit via Socket
//         socket.current.emit("sendMessage", messageData);

//         // Optimistically add to UI (Socket will also add, so we prevent duplicate by using temp ID logic or just relying on socket)
//         setMessages(prev => [...prev, { 
//             sender: user._id, 
//             receiver: receiverId, 
//             content: newMessage, 
//             createdAt: new Date().toISOString() 
//         }]);
        
//         setNewMessage("");
//     };

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
//                 <DialogHeader className="p-6 pb-3 border-b">
//                     <DialogTitle>Chat with {receiverName || "User"}</DialogTitle>
//                 </DialogHeader>
                
//                 {/* Message Area */}
//                 <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
//                     {loading ? (
//                         <div className="flex justify-center items-center h-full">
//                             <Loader2 className="animate-spin text-gray-400" />
//                         </div>
//                     ) : messages.length === 0 ? (
//                         <p className="text-center text-sm text-gray-400 mt-20">No messages yet. Start the conversation!</p>
//                     ) : (
//                         messages.map((msg, idx) => (
//                             <div key={idx} className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}>
//                                 <div className={`max-w-[75%] p-3 rounded-xl shadow-sm text-sm ${
//                                     msg.sender === user._id 
//                                     ? 'bg-indigo-600 text-white rounded-br-none' 
//                                     : 'bg-white border rounded-bl-none'
//                                 }`}>
//                                     <p>{msg.content}</p>
//                                     <p className={`text-[10px] mt-1 text-right ${msg.sender === user._id ? 'text-indigo-200' : 'text-gray-400'}`}>
//                                         {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>

//                 {/* Input Area */}
//                 <form onSubmit={sendMessage} className="p-4 border-t bg-white flex gap-2">
//                     <Input 
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         placeholder="Type a message..." 
//                         className="flex-1"
//                     />
//                     <Button type="submit" size="icon" className="bg-[#6A38C2] hover:bg-[#5b30a6] shrink-0">
//                         <Send size={18} />
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }
import React, { useEffect, useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Send, Loader2 } from 'lucide-react';

export default function ChatDialog({ open, setOpen, receiverId, receiverName, jobId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store?.user);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    if (open && receiverId) {
      setLoading(true);
      const fetchMessages = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/v1/message/${receiverId}`, { withCredentials: true });
          if (res.data.success) setMessages(res.data.messages);
        } catch (error) {
          console.log("Fetch messages error:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();

      socket.current = io("http://localhost:8000");
      socket.current.emit("joinRoom", user?._id);
      socket.current.on("receiveMessage", (data) => {
        setMessages(prev => [...prev, data]);
      });
    }
    return () => { if (socket.current) socket.current.disconnect(); };
  }, [open, receiverId, user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const messageData = { senderId: user._id, receiverId: receiverId, content: newMessage, jobId: jobId || null };
    socket.current.emit("sendMessage", messageData);

    setMessages(prev => [...prev, { sender: user._id, receiver: receiverId, content: newMessage, createdAt: new Date().toISOString() }]);
    setNewMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] h-[100dvh] sm:h-[600px] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 sm:p-6 pb-3 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2">
            Chat with <span className='text-indigo-600'>{receiverName || "User"}</span>
          </DialogTitle>
        </DialogHeader>

        {/* Message Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-gray-50">
          {loading ? (
            <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-gray-400" /></div>
          ) : messages.length === 0 ? (
            <p className="text-center text-sm text-gray-400 mt-20">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-xl shadow-sm text-sm ${
                  msg.sender === user._id
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white border rounded-bl-none text-gray-800'
                }`}>
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                  <p className={`text-[10px] mt-1 text-right ${msg.sender === user._id ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage} className="p-3 sm:p-4 border-t bg-white flex gap-2 shrink-0">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="bg-[#6A38C2] hover:bg-[#5b30a6] shrink-0">
            <Send size={18} />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}