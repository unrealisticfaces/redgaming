import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { updatePassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Settings, Gamepad2, TrendingUp, Shield, Upload, Save, LogOut, CheckCircle2, AlertTriangle, Trash2 } from 'lucide-react'

export default function AdminSettings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('games')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const [games, setGames] = useState([])
  
  // New Game Form State
  const [newGame, setNewGame] = useState({
    title: '',
    category: 'PC',
    size: '',
    details: '',
    image: '',
    isTrending: false
  })

  // Password State
  const [newPassword, setNewPassword] = useState('')

  // Check Auth & Fetch Data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login') // Kick out if not logged in
      } else {
        fetchGames()
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const fetchGames = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "games"))
      const gamesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setGames(gamesList)
      setLoading(false)
    } catch (error) {
      showMessage('error', 'Failed to load database.')
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  // Handle Base64 Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewGame({ ...newGame, image: reader.result }) // Base64 string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddGame = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "games"), {
        ...newGame,
        size: Number(newGame.size),
        createdAt: new Date().toISOString()
      })
      showMessage('success', 'Game added to catalog successfully.')
      setNewGame({ title: '', category: 'PC', size: '', details: '', image: '', isTrending: false })
      fetchGames()
    } catch (error) {
      showMessage('error', 'Failed to add game.')
    }
  }

  const handleDeleteGame = async (id) => {
    if(window.confirm('Are you sure you want to delete this game?')) {
      try {
        await deleteDoc(doc(db, "games", id))
        showMessage('success', 'Game removed.')
        fetchGames()
      } catch (error) {
        showMessage('error', 'Failed to remove game.')
      }
    }
  }

  const toggleTrending = async (game) => {
    try {
      await updateDoc(doc(db, "games", game.id), { isTrending: !game.isTrending })
      fetchGames()
    } catch (error) {
      showMessage('error', 'Failed to update trending status.')
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    try {
      await updatePassword(auth.currentUser, newPassword)
      showMessage('success', 'Admin passcode updated successfully.')
      setNewPassword('')
    } catch (error) {
      showMessage('error', 'Failed to update passcode. You may need to log out and log back in first.')
    }
  }

  const handleLogout = () => {
    signOut(auth)
    navigate('/')
  }

  if (loading) return <div className="flex-grow flex items-center justify-center text-red-500 animate-pulse">Initializing System...</div>

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col flex-grow animate-in fade-in duration-700 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Settings className="text-red-500 animate-[spin_4s_linear_infinite]" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase drop-shadow-md">System Settings</h2>
            <p className="text-neutral-400 text-xs font-medium uppercase tracking-widest">Master Control Panel</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors">
          <LogOut size={16} /> Terminate Session
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest p-4 rounded-sm border ${message.type === 'error' ? 'bg-orange-500/10 text-orange-500 border-orange-500/30' : 'bg-green-500/10 text-green-500 border-green-500/30'}`}>
          {message.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
          {message.text}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
          <button onClick={() => setActiveTab('games')} className={`flex items-center gap-3 px-5 py-4 rounded-sm font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'games' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-[#141414] text-neutral-400 border border-white/10 hover:border-red-500/50 hover:text-white'}`}>
            <Gamepad2 size={16} /> Catalog Manager
          </button>
          <button onClick={() => setActiveTab('trending')} className={`flex items-center gap-3 px-5 py-4 rounded-sm font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'trending' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-[#141414] text-neutral-400 border border-white/10 hover:border-red-500/50 hover:text-white'}`}>
            <TrendingUp size={16} /> Trending Config
          </button>
          <button onClick={() => setActiveTab('security')} className={`flex items-center gap-3 px-5 py-4 rounded-sm font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'security' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-[#141414] text-neutral-400 border border-white/10 hover:border-red-500/50 hover:text-white'}`}>
            <Shield size={16} /> Security
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full bg-[#141414] border border-white/10 rounded-sm shadow-2xl p-6 md:p-8">
          
          {/* CATALOG MANAGER TAB */}
          {activeTab === 'games' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 border-b border-white/10 pb-4">Add New Title</h3>
              
              <form onSubmit={handleAddGame} className="space-y-6 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">Game Title</label>
                    <input type="text" required value={newGame.title} onChange={e => setNewGame({...newGame, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:border-red-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">Category</label>
                    <select value={newGame.category} onChange={e => setNewGame({...newGame, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:border-red-500 focus:outline-none cursor-pointer">
                      <option value="PC">PC</option>
                      <option value="PS4">PS4</option>
                      <option value="Multiplayer">Multiplayer</option>
                      <option value="Kids">Kids</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">File Size (GB)</label>
                    <input type="number" step="0.1" required value={newGame.size} onChange={e => setNewGame({...newGame, size: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:border-red-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">Cover Image (Upload)</label>
                    <label className="w-full bg-[#0a0a0a] border border-white/10 border-dashed rounded-sm p-3 flex items-center justify-center gap-2 cursor-pointer hover:border-red-500 transition-colors text-xs font-bold text-neutral-400 hover:text-white">
                      <Upload size={14} /> {newGame.image ? 'Image Encoded (Base64)' : 'Select Image File'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} required />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">System Assessment / Details</label>
                  <textarea rows="3" required value={newGame.details} onChange={e => setNewGame({...newGame, details: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:border-red-500 focus:outline-none resize-none"></textarea>
                </div>

                <button type="submit" className="bg-red-600 text-white px-8 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-red-500 transition-colors flex items-center gap-2">
                  <Save size={14} /> Inject to Database
                </button>
              </form>

              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 border-b border-white/10 pb-4">Current Catalog</h3>
              <div className="space-y-3">
                {games.map(game => (
                  <div key={game.id} className="flex items-center justify-between bg-[#0a0a0a] p-4 rounded-sm border border-white/5">
                    <div className="flex items-center gap-4">
                      {game.image && <img src={game.image} alt={game.title} className="w-10 h-10 object-cover rounded-sm border border-white/10" />}
                      <div>
                        <div className="font-bold text-white text-sm">{game.title}</div>
                        <div className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">{game.category} • {game.size} GB</div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteGame(game.id)} className="text-neutral-500 hover:text-red-500 transition-colors p-2 bg-[#141414] rounded-sm">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {games.length === 0 && <div className="text-neutral-500 text-xs font-bold">Database is empty.</div>}
              </div>
            </div>
          )}

          {/* TRENDING CONFIG TAB */}
          {activeTab === 'trending' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Trending Configurator</h3>
              <p className="text-xs text-neutral-400 font-medium mb-8">Select which games are displayed in the Home page marquee carousel.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {games.map(game => (
                  <div key={game.id} onClick={() => toggleTrending(game)} className={`flex items-center justify-between p-4 rounded-sm border cursor-pointer transition-all ${game.isTrending ? 'bg-red-500/10 border-red-500/50' : 'bg-[#0a0a0a] border-white/5 hover:border-white/20'}`}>
                    <div className="font-bold text-sm text-white">{game.title}</div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${game.isTrending ? 'border-red-500 bg-red-500' : 'border-neutral-600'}`}>
                      {game.isTrending && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                  </div>
                ))}
                {games.length === 0 && <div className="text-neutral-500 text-xs font-bold col-span-2">No games in database.</div>}
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Security Protocols</h3>
              <p className="text-xs text-neutral-400 font-medium mb-8">Update your master admin passcode.</p>
              
              <form onSubmit={handlePasswordChange} className="max-w-md space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">New Passcode</label>
                  <input type="password" required minLength="6" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-4 text-xs font-bold text-white focus:border-red-500 focus:outline-none" />
                </div>
                <button type="submit" className="bg-red-600 text-white px-8 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-red-500 transition-colors flex items-center gap-2">
                  <Shield size={14} /> Update Credentials
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}