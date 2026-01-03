import React, { useState } from 'react';
import { Music, TrendingUp, DollarSign, Wallet, PieChart, Download, Calendar, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

export default function Portfolio() {
  const [timeframe, setTimeframe] = useState('7d');

  // Mock user data
  const portfolioStats = {
    totalValue: 12.45,
    totalInvested: 10.2,
    totalProfit: 2.25,
    profitPercentage: 22.06,
    totalRoyalties: 0.85,
    holdings: 15,
    songsOwned: 8
  };

  // Mock holdings data
  const holdings = [
    {
      id: 1,
      title: "Summer Vibes",
      artist: "DJ Melodia",
      genre: "Electronic",
      coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200",
      sharesOwned: 50,
      totalShares: 1000,
      buyPrice: 0.1,
      currentPrice: 0.13,
      investedAmount: 5.0,
      currentValue: 6.5,
      profit: 1.5,
      profitPercent: 30,
      royaltiesEarned: 0.25,
      streams: 125000
    },
    {
      id: 2,
      title: "Midnight Dreams",
      artist: "Luna Keys",
      genre: "Pop",
      coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200",
      sharesOwned: 30,
      totalShares: 500,
      buyPrice: 0.15,
      currentPrice: 0.12,
      investedAmount: 4.5,
      currentValue: 3.6,
      profit: -0.9,
      profitPercent: -20,
      royaltiesEarned: 0.18,
      streams: 89000
    },
    {
      id: 3,
      title: "Rock Anthem",
      artist: "Thunder Band",
      genre: "Rock",
      coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=200",
      sharesOwned: 25,
      totalShares: 800,
      buyPrice: 0.12,
      currentPrice: 0.15,
      investedAmount: 3.0,
      currentValue: 3.75,
      profit: 0.75,
      profitPercent: 25,
      royaltiesEarned: 0.32,
      streams: 210000
    }
  ];

  // Mock chart data
  const portfolioValueData = [
    { date: 'Jan 1', value: 8.5 },
    { date: 'Jan 8', value: 9.2 },
    { date: 'Jan 15', value: 8.9 },
    { date: 'Jan 22', value: 10.5 },
    { date: 'Jan 29', value: 11.2 },
    { date: 'Feb 5', value: 12.1 },
    { date: 'Feb 12', value: 12.45 }
  ];

  const royaltyData = [
    { month: 'Sep', amount: 0.12 },
    { month: 'Oct', amount: 0.18 },
    { month: 'Nov', amount: 0.15 },
    { month: 'Dec', amount: 0.22 },
    { month: 'Jan', amount: 0.18 }
  ];

  const genreDistribution = [
    { name: 'Electronic', value: 40, color: '#8B5CF6' },
    { name: 'Pop', value: 25, color: '#EC4899' },
    { name: 'Rock', value: 20, color: '#3B82F6' },
    { name: 'Hip Hop', value: 10, color: '#10B981' },
    { name: 'Others', value: 5, color: '#F59E0B' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      {/* Navigation */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Music className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold">Melodia</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                Marketplace
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 transition">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">0x742d...3a9c</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Portfolio</h1>
          <p className="text-xl text-gray-300">
            Track your music investments and royalty earnings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-8 h-8 text-purple-400" />
              <span className={`flex items-center text-sm ${portfolioStats.profitPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {portfolioStats.profitPercentage >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(portfolioStats.profitPercentage).toFixed(2)}%
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Value</p>
            <p className="text-3xl font-bold">{portfolioStats.totalValue} ETH</p>
            <p className="text-sm text-gray-400 mt-2">
              ≈ ${(portfolioStats.totalValue * 3500).toFixed(2)} USD
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Profit</p>
            <p className="text-3xl font-bold text-green-400">+{portfolioStats.totalProfit} ETH</p>
            <p className="text-sm text-gray-400 mt-2">
              From {portfolioStats.totalInvested} ETH invested
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Royalties</p>
            <p className="text-3xl font-bold text-blue-400">{portfolioStats.totalRoyalties} ETH</p>
            <p className="text-sm text-gray-400 mt-2">
              This month
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <Music className="w-8 h-8 text-pink-400" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Songs Owned</p>
            <p className="text-3xl font-bold">{portfolioStats.songsOwned}</p>
            <p className="text-sm text-gray-400 mt-2">
              {portfolioStats.holdings} total holdings
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Value Chart */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Portfolio Value</h3>
              <div className="flex space-x-2">
                {['7d', '30d', '90d', '1y'].map(period => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-3 py-1 rounded-lg text-sm transition ${
                      timeframe === period
                        ? 'bg-purple-500'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={portfolioValueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Genre Distribution */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-6">Genre Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={genreDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {genreDistribution.map((genre, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: genre.color }}></div>
                    <span>{genre.name}</span>
                  </div>
                  <span className="font-semibold">{genre.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Royalty Earnings Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Royalty Earnings History</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition">
              <Download className="w-4 h-4" />
              <span>Claim Royalties</span>
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={royaltyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Holdings Table */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold mb-6">My Holdings</h3>
          <div className="space-y-4">
            {holdings.map(holding => (
              <div
                key={holding.id}
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/50 transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={holding.coverImage}
                    alt={holding.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <p className="font-bold">{holding.title}</p>
                      <p className="text-sm text-gray-400">{holding.artist}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-purple-500/20 rounded text-xs">
                        {holding.genre}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Shares Owned</p>
                      <p className="font-semibold">{holding.sharesOwned}</p>
                      <p className="text-xs text-gray-500">
                        {((holding.sharesOwned / holding.totalShares) * 100).toFixed(2)}% ownership
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Investment</p>
                      <p className="font-semibold">{holding.investedAmount} ETH</p>
                      <p className="text-xs text-gray-500">
                        @ {holding.buyPrice} ETH
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Current Value</p>
                      <p className="font-semibold">{holding.currentValue} ETH</p>
                      <p className={`text-xs flex items-center ${holding.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {holding.profit >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {holding.profit >= 0 ? '+' : ''}{holding.profit.toFixed(2)} ETH ({holding.profitPercent}%)
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Royalties Earned</p>
                      <p className="font-semibold text-blue-400">{holding.royaltiesEarned} ETH</p>
                      <p className="text-xs text-gray-500">
                        {(holding.streams / 1000).toFixed(0)}K streams
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 hover:scale-105 transition">
            <Music className="w-8 h-8 mb-3" />
            <h4 className="font-bold mb-2">Explore More Songs</h4>
            <p className="text-sm text-purple-100">Discover new music to invest in</p>
          </button>

          <button className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 hover:scale-105 transition">
            <DollarSign className="w-8 h-8 mb-3" />
            <h4 className="font-bold mb-2">Claim Royalties</h4>
            <p className="text-sm text-green-100">Withdraw your earned royalties</p>
          </button>

          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 hover:scale-105 transition">
            <Award className="w-8 h-8 mb-3" />
            <h4 className="font-bold mb-2">View Analytics</h4>
            <p className="text-sm text-blue-100">Deep dive into performance metrics</p>
          </button>
        </div>
      </div>
    </div>
  );
}