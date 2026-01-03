import React, { useState } from 'react';
import { Music, Search, Filter, TrendingUp, Clock, Users, Play, ShoppingCart, Heart, BarChart3 } from 'lucide-react';

export default function Marketplace() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState(1);

  // Mock data - nanti diganti dengan data dari smart contract
  const songs = [
    {
      id: 1,
      title: "Summer Vibes",
      artist: "DJ Melodia",
      genre: "Electronic",
      coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
      totalShares: 1000,
      availableShares: 450,
      pricePerShare: 0.1,
      royaltyRate: 80,
      totalRaised: 55,
      streams: 125000,
      holders: 23
    },
    {
      id: 2,
      title: "Midnight Dreams",
      artist: "Luna Keys",
      genre: "Pop",
      coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      totalShares: 500,
      availableShares: 120,
      pricePerShare: 0.15,
      royaltyRate: 75,
      totalRaised: 57,
      streams: 89000,
      holders: 18
    },
    {
      id: 3,
      title: "Rock Anthem",
      artist: "Thunder Band",
      genre: "Rock",
      coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400",
      totalShares: 800,
      availableShares: 200,
      pricePerShare: 0.12,
      royaltyRate: 85,
      totalRaised: 72,
      streams: 210000,
      holders: 31
    },
    {
      id: 4,
      title: "Jazz Nights",
      artist: "Smooth Trio",
      genre: "Jazz",
      coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
      totalShares: 300,
      availableShares: 50,
      pricePerShare: 0.2,
      royaltyRate: 70,
      totalRaised: 50,
      streams: 45000,
      holders: 12
    },
    {
      id: 5,
      title: "Hip Hop Flow",
      artist: "MC Crypto",
      genre: "Hip Hop",
      coverImage: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400",
      totalShares: 1200,
      availableShares: 600,
      pricePerShare: 0.08,
      royaltyRate: 90,
      totalRaised: 48,
      streams: 156000,
      holders: 27
    }
  ];

  const genres = ['All', 'Pop', 'Rock', 'Electronic', 'Jazz', 'Hip Hop', 'R&B', 'Classical'];

  const filteredSongs = songs.filter(song => {
    const matchesGenre = selectedGenre === 'All' || song.genre === selectedGenre;
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const handleBuyShares = (song) => {
    setSelectedSong(song);
  };

  const confirmPurchase = () => {
    if (selectedSong && purchaseAmount > 0) {
      const totalCost = (selectedSong.pricePerShare * purchaseAmount).toFixed(3);
      alert(`Purchase confirmed!\n\nSong: ${selectedSong.title}\nShares: ${purchaseAmount}\nTotal: ${totalCost} ETH\n\nSmart contract will be called here.`);
      setSelectedSong(null);
      setPurchaseAmount(1);
    }
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
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                Creator Hub
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Music Marketplace</h1>
          <p className="text-xl text-gray-300">
            Discover and invest in tokenized music
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search songs or artists..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Sort Dropdown */}
            <select className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best ROI</option>
            </select>
          </div>

          {/* Genre Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  selectedGenre === genre
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="text-2xl font-bold text-purple-400">{filteredSongs.length}</div>
            <div className="text-sm text-gray-400">Available Songs</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="text-2xl font-bold text-green-400">
              {filteredSongs.reduce((sum, s) => sum + s.totalRaised, 0)} ETH
            </div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="text-2xl font-bold text-blue-400">
              {filteredSongs.reduce((sum, s) => sum + s.holders, 0)}
            </div>
            <div className="text-sm text-gray-400">Active Investors</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="text-2xl font-bold text-pink-400">
              {(filteredSongs.reduce((sum, s) => sum + s.streams, 0) / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-400">Total Streams</div>
          </div>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map(song => (
            <div
              key={song.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition hover:scale-105 group"
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <button className="absolute bottom-4 right-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                  <Play className="w-5 h-5 ml-1" />
                </button>
                <button className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Song Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                    {song.genre}
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{song.holders}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-1">{song.title}</h3>
                <p className="text-gray-400 mb-4">{song.artist}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-gray-400">Price/Share</p>
                    <p className="font-semibold text-green-400">{song.pricePerShare} ETH</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Royalty Rate</p>
                    <p className="font-semibold">{song.royaltyRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Available</p>
                    <p className="font-semibold">{song.availableShares}/{song.totalShares}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Streams</p>
                    <p className="font-semibold">{(song.streams / 1000).toFixed(0)}K</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Sold</span>
                    <span>{((song.totalShares - song.availableShares) / song.totalShares * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${((song.totalShares - song.availableShares) / song.totalShares * 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBuyShares(song)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-105 transition"
                  >
                    Buy Shares
                  </button>
                  <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                    <BarChart3 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Modal */}
      {selectedSong && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl border border-purple-500/30 max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Buy Shares</h3>
              <button
                onClick={() => setSelectedSong(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <img
                src={selectedSong.coverImage}
                alt={selectedSong.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-bold">{selectedSong.title}</h4>
              <p className="text-gray-400">{selectedSong.artist}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Shares</label>
                <input
                  type="number"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={selectedSong.availableShares}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Max: {selectedSong.availableShares} shares available
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Price per share:</span>
                  <span className="font-semibold">{selectedSong.pricePerShare} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Quantity:</span>
                  <span className="font-semibold">{purchaseAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Royalty rate:</span>
                  <span className="font-semibold">{selectedSong.royaltyRate}%</span>
                </div>
                <div className="border-t border-white/10 pt-2 mt-2"></div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Cost:</span>
                  <span className="font-bold text-green-400 text-lg">
                    {(selectedSong.pricePerShare * purchaseAmount).toFixed(3)} ETH
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={confirmPurchase}
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