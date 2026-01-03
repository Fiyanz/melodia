import React, { useState } from 'react';
import { Music, Play, Pause, Heart, Share2, Users, DollarSign, TrendingUp, Calendar, Award, ShoppingCart, ArrowLeft, BarChart3, Clock, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function SongDetail() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Mock song data
  const song = {
    id: 1,
    title: "Summer Vibes",
    artist: "DJ Melodia",
    artistAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f3a9c",
    genre: "Electronic",
    releaseDate: "2024-01-15",
    duration: "3:42",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    totalShares: 1000,
    availableShares: 450,
    pricePerShare: 0.1,
    royaltyRate: 80,
    totalRaised: 55,
    currentValue: 130,
    streams: 125000,
    holders: 23,
    description: "An uplifting electronic track that captures the essence of summer. Perfect for beach parties and festival vibes. This song has been featured in multiple playlists and continues to gain traction.",
    ipfsHash: "QmX7eN8jK5mP4oR9sT6vW2xY3zA8bC9dE0fG1hI2jK3lM4"
  };

  // Mock price history data
  const priceHistory = [
    { date: 'Week 1', price: 0.10 },
    { date: 'Week 2', price: 0.11 },
    { date: 'Week 3', price: 0.09 },
    { date: 'Week 4', price: 0.12 },
    { date: 'Week 5', price: 0.13 },
    { date: 'Week 6', price: 0.13 },
  ];

  // Mock streaming data
  const streamingData = [
    { month: 'Aug', streams: 15000 },
    { month: 'Sep', streams: 22000 },
    { month: 'Oct', streams: 28000 },
    { month: 'Nov', streams: 25000 },
    { month: 'Dec', streams: 35000 },
  ];

  // Mock top holders
  const topHolders = [
    { address: '0x742d...3a9c', shares: 120, percentage: 12 },
    { address: '0x8B5e...4fA1', shares: 95, percentage: 9.5 },
    { address: '0x3C9f...7dB2', shares: 80, percentage: 8 },
    { address: '0x5D2a...9eC3', shares: 65, percentage: 6.5 },
  ];

  const handlePurchase = () => {
    const totalCost = (song.pricePerShare * purchaseAmount).toFixed(3);
    alert(`Purchase confirmed!\n\nSong: ${song.title}\nShares: ${purchaseAmount}\nTotal: ${totalCost} ETH\n\nTransaction will be sent to smart contract.`);
    setShowPurchaseModal(false);
    setPurchaseAmount(1);
  };

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
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 transition">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">0x742d...3a9c</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Cover & Player */}
          <div className="space-y-6">
            <div className="relative group">
              <img
                src={song.coverImage}
                alt={song.title}
                className="w-full aspect-square rounded-2xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl"></div>
              
              {/* Play Button Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition hover:scale-110 shadow-lg shadow-purple-500/50"
              >
                {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
              </button>

              {/* Song Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{song.title}</h1>
                    <p className="text-xl text-gray-300">{song.artist}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                        isFavorite ? 'bg-red-500' : 'bg-black/50 hover:bg-black/70'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button className="w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition">
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
              <div className="flex items-center space-x-4 mb-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div className="flex-1">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-1/3"></div>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{song.duration}</span>
              </div>
            </div>

            {/* Song Details */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 space-y-4">
              <h3 className="text-xl font-bold mb-4">Song Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Genre</p>
                  <p className="font-semibold">{song.genre}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Duration</p>
                  <p className="font-semibold">{song.duration}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Release Date</p>
                  <p className="font-semibold">{new Date(song.releaseDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Total Streams</p>
                  <p className="font-semibold">{(song.streams / 1000).toFixed(0)}K</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Artist Wallet</p>
                <p className="font-mono text-sm bg-black/30 p-2 rounded">{song.artistAddress}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Description</p>
                <p className="text-sm text-gray-300">{song.description}</p>
              </div>
            </div>
          </div>

          {/* Right: Investment Info */}
          <div className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <DollarSign className="w-8 h-8 text-green-400 mb-2" />
                <p className="text-sm text-gray-400">Price per Share</p>
                <p className="text-2xl font-bold text-green-400">{song.pricePerShare} ETH</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <Award className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-sm text-gray-400">Royalty Rate</p>
                <p className="text-2xl font-bold">{song.royaltyRate}%</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <Users className="w-8 h-8 text-purple-400 mb-2" />
                <p className="text-sm text-gray-400">Token Holders</p>
                <p className="text-2xl font-bold">{song.holders}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <TrendingUp className="w-8 h-8 text-pink-400 mb-2" />
                <p className="text-sm text-gray-400">Total Raised</p>
                <p className="text-2xl font-bold">{song.totalRaised} ETH</p>
              </div>
            </div>

            {/* Shares Available */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Shares Available</h3>
                <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm text-green-400">
                  {((song.availableShares / song.totalShares) * 100).toFixed(0)}% Available
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>{song.availableShares} / {song.totalShares} shares</span>
                  <span className="font-semibold">{((song.totalShares - song.availableShares) / song.totalShares * 100).toFixed(0)}% Sold</span>
                </div>
                <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${((song.totalShares - song.availableShares) / song.totalShares * 100)}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => setShowPurchaseModal(true)}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg shadow-purple-500/50 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Buy Shares</span>
              </button>
            </div>

            {/* Price Chart */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-purple-400" />
                Price History
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={priceHistory}>
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
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Streaming Analytics */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                Streaming Growth
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={streamingData}>
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
                  <Bar dataKey="streams" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Holders */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Top Token Holders</h3>
          <div className="space-y-3">
            {topHolders.map((holder, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-mono text-sm">{holder.address}</p>
                    <p className="text-xs text-gray-400">{holder.percentage}% ownership</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{holder.shares} shares</p>
                  <p className="text-sm text-gray-400">{(holder.shares * song.pricePerShare).toFixed(2)} ETH</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Contract Info */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
          <h3 className="text-xl font-bold mb-4">Smart Contract Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Contract Address</p>
              <p className="font-mono bg-black/30 p-2 rounded">0x8B5e4C9fD8A1b2E3c7F6a5D4e3B2c1A0f9E8d7C6</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">IPFS Hash</p>
              <p className="font-mono bg-black/30 p-2 rounded break-all">{song.ipfsHash}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Token Standard</p>
              <p className="font-semibold">ERC-1155</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Network</p>
              <p className="font-semibold">Ethereum Mainnet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl border border-purple-500/30 max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Buy Shares</h3>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <img
                src={song.coverImage}
                alt={song.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-bold">{song.title}</h4>
              <p className="text-gray-400">{song.artist}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Shares</label>
                <input
                  type="number"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(Math.max(1, Math.min(parseInt(e.target.value) || 1, song.availableShares)))}
                  min="1"
                  max={song.availableShares}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Max: {song.availableShares} shares available
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Price per share:</span>
                  <span className="font-semibold">{song.pricePerShare} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Quantity:</span>
                  <span className="font-semibold">{purchaseAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Royalty rate:</span>
                  <span className="font-semibold">{song.royaltyRate}%</span>
                </div>
                <div className="border-t border-white/10 pt-2 mt-2"></div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Cost:</span>
                  <span className="font-bold text-green-400 text-lg">
                    {(song.pricePerShare * purchaseAmount).toFixed(3)} ETH
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePurchase}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-105 transition"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
}