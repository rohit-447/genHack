import React from "react";
import "./LeftSidebar.css"; // import CSS for scrollbar hiding

export default function LeftSidebar({ simpleEnglish, articles, score }) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white h-full overflow-y-auto scrollbar-hide">
      {/* Score Section */}
      <div className="flex items-center justify-center mb-6">
  <div className="relative flex items-center justify-center w-36 h-36 rounded-full">
    {/* Background Circle */}
    <svg className="w-36 h-36 transform -rotate-90">
      <circle
        cx="72"
        cy="72"
        r="60"
        stroke="gray"
        strokeWidth="10"
        fill="transparent"
      />
      <circle
        cx="72"
        cy="72"
        r="60"
        stroke="url(#grad)"
        strokeWidth="10"
        fill="transparent"
        strokeDasharray={2 * Math.PI * 60}
        strokeDashoffset={
          2 * Math.PI * 60 - (score / 100) * 2 * Math.PI * 60
        }
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
    </svg>

    {/* Score Text */}
    <span className="absolute text-2xl font-bold text-white">{score}%</span>
  </div>
</div>

      {/* Simple English Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-400 border-b border-gray-700 pb-2">
          📄 Document in Plain English
        </h2>
        <p className="text-base text-gray-200 mt-4 leading-relaxed">
          {simpleEnglish}
        </p>
      </div>

      {/* Articles / References */}
      <div>
        <h2 className="text-xl font-bold text-purple-400 border-b border-gray-700 pb-2">
          📑 Key Findings & References
        </h2>
        <div className="mt-4 space-y-2 text-base text-gray-200 leading-relaxed">
          {articles && articles.length > 0 ? (
            <ul className="list-disc list-inside">
              {articles.map((article, index) => (
                <li key={index}>{article}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No articles or references found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
