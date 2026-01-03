import React, { useState } from 'react';
import { Music, Upload, FileAudio, DollarSign, Users, Calendar, ArrowLeft, Check } from 'lucide-react';

export default function CreatorHub() {
  const [step, setStep] = useState(1);
  const [songData, setSongData] = useState({
    title: '',
    artist: '',
    genre: '',
    audioFile: null,
    coverImage: null,
    totalShares: '',
    pricePerShare: '',
    royaltyPercentage: '',
    releaseDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSongData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setSongData(prev => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini akan dipanggil smart contract function
    console.log('Creating song NFT with data:', songData);
    alert('Song tokenization in progress! Smart contract akan dipanggil di sini.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      {/* Navigation */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-white/10">
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

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center space-x-2 text-gray-300 hover:text-white mb-4 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Creator Hub</h1>
          <p className="text-xl text-gray-300">
            Tokenize your music and create royalty smart contracts
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 space-x-4">
          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition ${
                step >= num 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : 'bg-white/10'
              }`}>
                {step > num ? <Check className="w-6 h-6" /> : num}
              </div>
              {num < 3 && (
                <div className={`w-24 h-1 ${
                  step > num ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/10'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          {/* Step 1: Song Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FileAudio className="w-6 h-6 mr-2 text-purple-400" />
                Song Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Song Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={songData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition"
                    placeholder="Enter song title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Artist Name *</label>
                  <input
                    type="text"
                    name="artist"
                    value={songData.artist}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition"
                    placeholder="Enter artist name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Genre *</label>
                  <select
                    name="genre"
                    value={songData.genre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition"
                  >
                    <option value="">Select genre</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Classical">Classical</option>
                    <option value="R&B">R&B</option>
                    <option value="Country">Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Release Date *</label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={songData.releaseDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Audio File *</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-500 transition cursor-pointer">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileChange(e, 'audioFile')}
                    className="hidden"
                    id="audioFile"
                  />
                  <label htmlFor="audioFile" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <p className="text-gray-300">
                      {songData.audioFile ? songData.audioFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">MP3, WAV, FLAC (max 50MB)</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Cover Image</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-500 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'coverImage')}
                    className="hidden"
                    id="coverImage"
                  />
                  <label htmlFor="coverImage" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                    <p className="text-gray-300">
                      {songData.coverImage ? songData.coverImage.name : 'Click to upload cover art'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">JPG, PNG (recommended: 1000x1000px)</p>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Tokenomics */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-purple-400" />
                Tokenomics Setup
              </h2>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-6">
                <p className="text-sm text-purple-200">
                  💡 Define how your song will be tokenized and how royalties will be distributed to token holders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Total Shares Available *</label>
                  <input
                    type="number"
                    name="totalShares"
                    value={songData.totalShares}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition"
                    placeholder="e.g., 1000"
                  />
                  <p className="text-xs text-gray-400 mt-1">Number of royalty tokens to create</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price Per Share (ETH) *</label>
                  <input
                    type="number"
                    name="pricePerShare"
                    value={songData.pricePerShare}
                    onChange={handleInputChange}
                    required
                    step="0.001"
                    min="0"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition"
                    placeholder="e.g., 0.1"
                  />
                  <p className="text-xs text-gray-400 mt-1">Initial price for each token</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Royalty Percentage for Token Holders *</label>
                  <input
                    type="number"
                    name="royaltyPercentage"
                    value={songData.royaltyPercentage}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="100"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 transition"
                    placeholder="e.g., 80"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Percentage of royalties distributed to token holders (you keep the rest)
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-lg mb-4">Summary</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Shares:</span>
                  <span className="font-semibold">{songData.totalShares || '0'} tokens</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Price per Share:</span>
                  <span className="font-semibold">{songData.pricePerShare || '0'} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Raise:</span>
                  <span className="font-semibold text-green-400">
                    {(songData.totalShares * songData.pricePerShare || 0).toFixed(3)} ETH
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Royalty Distribution:</span>
                  <span className="font-semibold">{songData.royaltyPercentage || '0'}% to holders</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Deploy */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Check className="w-6 h-6 mr-2 text-purple-400" />
                Review & Deploy
              </h2>

              <div className="bg-white/5 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Song Title</p>
                    <p className="font-semibold">{songData.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Artist</p>
                    <p className="font-semibold">{songData.artist}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Genre</p>
                    <p className="font-semibold">{songData.genre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Release Date</p>
                    <p className="font-semibold">{songData.releaseDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Shares</p>
                    <p className="font-semibold">{songData.totalShares} tokens</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Price per Share</p>
                    <p className="font-semibold">{songData.pricePerShare} ETH</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Royalty to Holders</p>
                    <p className="font-semibold">{songData.royaltyPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Raise</p>
                    <p className="font-semibold text-green-400">
                      {(songData.totalShares * songData.pricePerShare || 0).toFixed(3)} ETH
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <h4 className="font-semibold mb-2 flex items-center">
                  ⚠️ Important
                </h4>
                <ul className="text-sm text-yellow-200 space-y-1 list-disc list-inside">
                  <li>Transaction will require gas fees</li>
                  <li>Smart contract deployment cannot be reversed</li>
                  <li>Make sure all information is correct</li>
                  <li>Files will be uploaded to IPFS</li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <h4 className="font-semibold mb-2">✅ What happens next?</h4>
                <ol className="text-sm text-green-200 space-y-2 list-decimal list-inside">
                  <li>Song NFT will be minted on the blockchain</li>
                  <li>Royalty smart contract will be deployed</li>
                  <li>Your song will appear in the marketplace</li>
                  <li>Investors can start buying tokens</li>
                </ol>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
              >
                Previous
              </button>
            )}
            
            <div className="ml-auto">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-105 transition"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold hover:scale-105 transition shadow-lg shadow-green-500/50"
                >
                  Deploy Smart Contract
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}