import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import MiddleSection from "../components/MiddleSection";

export default function Dashboard() {
  const [data, setData] = useState(
    {
        "simple_english": "",
        "articles": [],
        "risk": {
            "level": "",
            "explanation": ""
        },
        "score": "0",
        "obligations_and_deadlines": [{}]
    }
);
  const [loading, setLoading] = useState(false)

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-red-500">
        Failed to load data.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="grid grid-cols-4 gap-6 p-6 flex-1">
        <div className="col-span-1">
          <LeftSidebar simpleEnglish={data.simple_english} articles={data.articles} score={data.score}  />
        </div>
        <div className="col-span-2">
          <MiddleSection simpleEnglish={data.simple_english} setData={setData} />
        </div>
        <div className="col-span-1">
          <RightSidebar
            risk={data.risk || { level: "", explanation: "" }}
            obligations={data.obligations_and_deadlines || []}
          />

        </div>
      </div>

      {/* Footer */}
      {/* <div className="text-gray-400 text-sm flex justify-between px-6 py-4 border-t border-gray-700">
        <div className="flex gap-6">
          <span>Resources</span>
          <span>Legal</span>
          <span>Contact Us</span>
        </div>
        <div className="flex gap-4">
          <span>in</span>
          <span>f</span>
          <span>bird</span>
        </div>
      </div> */}
    </div>
  );
}
