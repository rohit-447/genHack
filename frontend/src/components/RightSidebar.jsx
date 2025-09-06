import React from "react";
import "./RightSidebar.css"; // include CSS for scrollbar hiding

export default function RightSidebar({ risk, obligations }) {
  return (
    <div className="space-y-6 h-full">
      {/* Risk Analysis */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white h-[45vh] overflow-y-auto scrollbar-hide">
        <h2 className="text-xl font-bold text-red-400 border-b border-gray-700 pb-2">
          ⚠️ Risk Analysis
        </h2>
        <div className="mt-4 space-y-3">
          <div className="flex flex-col">
            <span
              className={`text-lg font-bold uppercase ${
                risk.level === "high"
                  ? "text-red-500"
                  : risk.level === "medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {risk.level || "N/A"}
            </span>
            <p className="text-base text-gray-200 mt-2 leading-relaxed">
              {risk.explanation || "No explanation available."}
            </p>
          </div>
        </div>
      </div>

      {/* Obligations & Deadlines */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white h-[45vh] overflow-y-auto scrollbar-hide">
        <h2 className="text-xl font-bold text-green-400 border-b border-gray-700 pb-2">
          📌 Obligations & Deadlines
        </h2>
        <div className="mt-4 space-y-4">
          {obligations && obligations.length > 0 ? (
            obligations.map((item, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-base text-gray-200">
                  <span className="font-semibold">
                    {item.responsibility || "N/A"}:
                  </span>{" "}
                  {item.obligation || "No obligation specified."}
                </p>
                {item.deadline && (
                  <p className="text-sm text-gray-400">Deadline: {item.deadline}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No obligations found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
