import React from "react";
// import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between bg-gray-900 text-white px-6 py-4 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <span className="text-blue-500 font-bold text-xl">LegalLensAI</span>
      </div>
      <div className="flex gap-8 text-sm font-medium">
        <span>Dashboard</span>
        <span>Documents</span>
        <span>Analytics</span>
        <span>Settings</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documents, insights..."
            className="bg-gray-800 text-sm rounded-md pl-8 pr-4 py-1 focus:outline-none border border-gray-700"
          />
          {/* <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" /> */}
          <span>Search</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-600"></div>
      </div>
    </div>
  );
}
