import { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateResponse, ChatResponse } from "@/lib/chatEngine";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface WhatsAppChatProps {
  onResponse: (response: ChatResponse) => void;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! Welcome to HeirsSure. I'm your insurance assistant. I can help you:\n\n• Check claim status\n• Understand your insurance rights\n• Request documents\n• Get legal references\n\nHow may I assist you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 60000),
    status: "read",
  },
];

const quickReplies = [
  "Check claim CLM-2024-003",
  "What are my rights?",
  "Wetin be my entitlement?",
  "I'm frustrated with my claim!",
];

export function WhatsAppChat({ onResponse }: WhatsAppChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(messageText);
      onResponse(response);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        sender: "bot",
        timestamp: new Date(),
        status: "read",
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#e5ddd5] rounded-lg overflow-hidden shadow-xl border border-border">
      {/* WhatsApp Header */}
      <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">HS</span>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-medium text-sm">HeirsSure Assistant</h3>
          <p className="text-white/70 text-xs">
            {isTyping ? "typing..." : "online"}
          </p>
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <Video className="h-5 w-5 cursor-pointer" />
          <Phone className="h-5 w-5 cursor-pointer" />
          <MoreVertical className="h-5 w-5 cursor-pointer" />
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cfc4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`whatsapp-message ${
                message.sender === "user" ? "whatsapp-user" : "whatsapp-bot"
              }`}
            >
              <p className="whitespace-pre-wrap text-[13px] leading-relaxed">
                {message.content}
              </p>
              <div className={`flex items-center justify-end gap-1 mt-1 ${
                message.sender === "user" ? "text-white/70" : "text-gray-500"
              }`}>
                <span className="text-[10px]">{formatTime(message.timestamp)}</span>
                {message.sender === "user" && (
                  message.status === "read" ? (
                    <CheckCheck className="h-3 w-3 text-blue-400" />
                  ) : (
                    <Check className="h-3 w-3" />
                  )
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="whatsapp-bot px-4 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: "0s" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-3 py-2 bg-[#e5ddd5] border-t border-[#d1d1d1]">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleSend(reply)}
              className="flex-shrink-0 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-[#075e54] border border-[#075e54]/20 hover:bg-[#075e54]/5 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <Paperclip className="h-5 w-5" />
        </button>
        <div className="flex-1 relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message"
            className="rounded-full bg-white border-0 pr-10 text-sm"
          />
        </div>
        {inputValue.trim() ? (
          <Button
            onClick={() => handleSend()}
            size="icon"
            className="rounded-full bg-[#075e54] hover:bg-[#064d44] h-10 w-10"
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Mic className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
