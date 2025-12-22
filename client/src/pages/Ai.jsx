import React from 'react'
import Chatbot from '../components/Chatbot';


export default function Ai() {
  return (
    <div>
     <div className="rounded-xl bg-white p-6 shadow">
                <h2 className="mb-2 text-xl font-semibold">
                  AI Assistant
                </h2>
                <p className="text-gray-600">
                  Get instant answers using voice-enabled chatbot.
                </p>
              </div>
              <div className="mt-8">
        <Chatbot />
      </div>
      </div>
  );
}
