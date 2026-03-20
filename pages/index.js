import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages([...newMessages, { role: "bot", text: data.reply }]);
    } catch {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">AI Interview Coach 🚀</h1>

      <div className="w-full max-w-2xl bg-gray-800 rounded-xl p-4 h-[500px] overflow-y-auto shadow-lg">
        {messages.map((msg, i) => (
          <div key={i} className={`flex mb-3 ${msg.role==="user"?"justify-end":"justify-start"}`}>
            <div className={`px-4 py-2 rounded-xl max-w-xs whitespace-pre-wrap ${msg.role==="user"?"bg-blue-500":"bg-gray-700"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <p>🤖 Thinking...</p>}
        <div ref={bottomRef} />
      </div>

      <div className="flex w-full max-w-2xl mt-4 gap-2">
        <input
          className="flex-1 p-3 rounded-lg bg-gray-700"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Type your answer..."
        />
        <button onClick={sendMessage} className="bg-blue-600 px-5 rounded-lg">Send</button>
      </div>

      <button onClick={()=>setMessages([])} className="mt-3 text-sm text-gray-400">
        🔄 Reset Interview
      </button>
    </div>
  );
}
