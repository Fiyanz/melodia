import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music, Coins, TrendingUp, Shield, Users, Zap } from "lucide-react";
import { ethers } from "ethers";
import { CONTRACTS } from "../config/contracts";

export default function HomePage({ account, onConnect }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSongs: "0",
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        let provider;
        if (typeof window.ethereum !== "undefined") {
          provider = new ethers.BrowserProvider(window.ethereum);
        } else {
          provider = new ethers.JsonRpcProvider("https://ethereum-sepolia.publicnode.com");
        }
        
        const contract = new ethers.Contract(
          CONTRACTS.musicIPNFT.address,
          CONTRACTS.musicIPNFT.abi,
          provider
        );
        const total = await contract.tokenCounter();
        setStats(prev => ({ ...prev, totalSongs: total.toString() }));
      } catch (error) {
        try {
          const fallbackProvider = new ethers.JsonRpcProvider("https://ethereum-sepolia.publicnode.com");
          const contract = new ethers.Contract(
            CONTRACTS.musicIPNFT.address,
            CONTRACTS.musicIPNFT.abi,
            fallbackProvider
          );
          const total = await contract.tokenCounter();
          setStats(prev => ({ ...prev, totalSongs: total.toString() }));
        } catch (e) {}
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🔥 BASE GRADIENT (WARNA LAMA) */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900" />

      {/* 🔥 OVERLAY GRADIENT (TAMBAHAN, TIDAK MENGHILANGKAN WARNA LAMA) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 via-transparent to-cyan-400/20" />

      {/* 🔥 DEPTH / GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HERO (Navbar removed) */}
        <section className="pt-32 pb-24 px-6 text-center">
          <div className="max-w-7xl mx-auto">

            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30">
              🎵 Decentralized Music Royalty Platform
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Tokenize Your Music,
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Share The Success
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Platform Web3 untuk musisi dan investor berbagi royalti
              secara transparan menggunakan smart contract Ethereum.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/creator")}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:scale-105 transition shadow-lg shadow-purple-500/40"
              >
                Start Creating
              </button>

              <button
                onClick={() => navigate("/marketplace")}
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition border border-white/20"
              >
                Explore Songs
              </button>
            </div>

          </div>
        </section>

        {/* STATS */}
        <section className="py-16 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              [stats.totalSongs, "Songs Tokenized"],
              ["$2.5M", "Royalties Paid"], // Masih dummy karena belum ada logic payment
              ["5,678", "Investors"],      // Masih dummy
              ["892", "Artists"],          // Masih dummy
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {value}
                </div>
                <div className="text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Why Choose <span className="text-purple-400">Melodia?</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Feature icon={Music} title="Creator Hub" />
              <Feature icon={Coins} title="Invest & Own" />
              <Feature icon={TrendingUp} title="Portfolio Dashboard" />
              <Feature icon={Shield} title="Blockchain Security" />
              <Feature icon={Users} title="Community Driven" />
              <Feature icon={Zap} title="Instant Payments" />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 text-center text-gray-400 border-t border-white/10 bg-black/30">
          © 2024 Melodia · Web3 Music Royalty Platform
        </footer>

      </div>
    </div>
  );
}

function Feature({ icon: Icon, title }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:scale-105 transition">
      <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-purple-400" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">
        Fully decentralized, transparent, and powered by smart contracts.
      </p>
    </div>
  );
}
