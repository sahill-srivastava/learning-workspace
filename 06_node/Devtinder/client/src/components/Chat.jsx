import { useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);

  const [messages, setMessages] = useState([{ text: "Hello Sahil" }]);
  return (
    <section className="my-15">
      <h1 className="text-4xl text-center mb-5">Chat</h1>
      <div className="w-[680px] h-[60vh] flex flex-col mx-auto border-2 border-base-300 p-4 rounded-2xl">
        <div className="flex-1 overflow-y-scroll">
          {messages.map((msg, index) => {
            return (
              <div key={index} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Gunjan
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
          
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <input type="text" className="flex-1 border border-white rounded" />
          <button className="shrink-0 bg-sky-400 px-4 py-1 rounded">
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
