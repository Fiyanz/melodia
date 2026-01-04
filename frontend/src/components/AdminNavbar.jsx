import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function AdminNavbar({ account, onConnect }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-purple-900/50 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <ShieldCheck className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">
              Melodia <span className="text-green-400">Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-gray-400 text-sm hidden md:block">
                Only interacting as Contract Owner
            </span>
            <button
                onClick={onConnect}
                className="px-6 py-2 rounded-full border border-green-500 text-green-400 font-semibold hover:bg-green-500 hover:text-white transition"
            >
                {account
                ? "Admin: " + account.slice(0, 6) + "..."
                : "Connect Owner Wallet"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
