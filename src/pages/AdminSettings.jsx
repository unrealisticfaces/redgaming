import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { updatePassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, push, set, get, child, update, remove } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { Settings, Gamepad2, TrendingUp, Shield, Save, LogOut, CheckCircle2, AlertTriangle, Trash2, Loader2, Wand2, Link as LinkIcon } from 'lucide-react'

// ==========================================
// RAWG API KEY CONFIGURED
const RAWG_API_KEY = 'a73ea23a91934b4c9cce7dbe01a9708d'
// ==========================================

export default function AdminSettings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('games')
  
  const [authLoading, setAuthLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFetchingAPI, setIsFetchingAPI] = useState(false)
  
  const [message, setMessage] = useState({ type: '', text: '' })
  const [games, setGames] = useState([])
  
  const [newGame, setNewGame] = useState({
    title: '',
    category: 'PC',
    size: '',
    details: '',
    image: '', 
    isTrending: false
  })

  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login')
      } else {
        setAuthLoading(false)
        fetchGames()
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const fetchGames = async () => {
    try {
      const dbRef = ref(db)
      const snapshot = await get(child(dbRef, 'games'))
      if (snapshot.exists()) {
        const data = snapshot.val()
        const gamesList = Object.keys(data).map(key => ({ id: key, ...data[key] }))
        setGames(gamesList)
      } else {
        setGames([])
      }
    } catch (error) {
      showMessage('error', 'Database connection failed. Check Rules.')
    } finally {
      setDataLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  const handleAutoFill = async () => {
    if (!newGame.title) {
      showMessage('error', 'Please type a Game Title first.')
      return
    }

    setIsFetchingAPI(true)
    try {
      const searchRes = await fetch(`https://api.rawg.io/api/games?search=${encodeURIComponent(newGame.title)}&key=${RAWG_API_KEY}`)
      const searchData = await searchRes.json()

      if (searchData.results && searchData.results.length > 0) {
        const gameId = searchData.results[0].id
        
        const detailRes = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${RAWG_API_KEY}`)
        const detailData = await detailRes.json()

        // Clean any HTML tags out of the description
        let cleanDescription = detailData.description_raw || detailData.description.replace(/(<([^>]+)>)/gi, "")
        
        // Truncate overly long descriptions from RAWG so it doesn't flood the DB
        if (cleanDescription.length > 400) {
          cleanDescription = cleanDescription.substring(0, 400).trim() + "..."
        }

        setNewGame(prev => ({
          ...prev,
          title: detailData.name, 
          image: detailData.background_image || '', 
          details: cleanDescription || prev.details
        }))
        
        showMessage('success', 'Game data auto-filled successfully!')
      } else {
        showMessage('error', 'No game found with that title on RAWG.')
      }
    } catch (error) {
      showMessage('error', 'Failed to connect to RAWG API.')
    } finally {
      setIsFetchingAPI(false)
    }
  }

  const handleAddGame = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const newGameRef = push(ref(db, 'games'))
      await set(newGameRef, {
        ...newGame,
        size: Number(newGame.size),
        createdAt: new Date().toISOString()
      })
      showMessage('success', 'Game added to catalog successfully.')
      setNewGame({ title: '', category: 'PC', size: '', details: '', image: '', isTrending: false })
      fetchGames()
    } catch (error) {
      showMessage('error', 'Failed to add game. Check Rules.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteGame = async (id) => {
    if(window.confirm('Are you sure you want to delete this game?')) {
      try {
        await remove(ref(db, `games/${id}`))
        showMessage('success', 'Game removed.')
        fetchGames()
      } catch (error) {
        showMessage('error', 'Failed to remove game.')
      }
    }
  }

  const toggleTrending = async (game) => {
    try {
      await update(ref(db, `games/${game.id}`), { isTrending: !game.isTrending })
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
      showMessage('error', 'Failed to update passcode. Log out and back in first.')
    }
  }

  const handleLogout = () => {
    signOut(auth)
    navigate('/')
  }

  if (authLoading) {
    return (
      <div className="flex-grow flex items-center justify-center text-red-500 animate-pulse font-black tracking-widest uppercase text-sm gap-3">
        <Shield size={18} className="animate-spin" /> Verifying Credentials...
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col flex-grow animate-in fade-in duration-700 py-10">
      
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

        <div className="flex-1 w-full bg-[#141414] border border-white/10 rounded-sm shadow-2xl p-6 md:p-8">
          
          {activeTab === 'games' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 border-b border-white/10 pb-4">Add New Title</h3>
              
              <form onSubmit={handleAddGame} className="space-y-6 mb-12">
                
                <div className="bg-[#0a0a0a] border border-red-500/20 p-4 rounded-sm mb-6 flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex-1 w-full">
                    <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">1. Search Game Title</label>
                    <input type="text" value={newGame.title} onChange={e => setNewGame({...newGame, title: e.target.value})} className="w-full bg-[#141414] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:border-red-500 focus:outline-none" placeholder="e.g., Cyberpunk 2077" />
                  </div>
                  <button 
                    type="button" 
                    onClick={handleAutoFill}
                    disabled={isFetchingAPI}
                    className="w-full sm:w-auto bg-neutral-800 text-white px-6 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-neutral-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 border border-white/10 hover:border-white/30"
                  >
                    {isFetchingAPI ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} className="text-red-400" />}
                    {isFetchingAPI ? 'Searching...' : 'Auto-Fill Data'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">Category</label>
                    <select value={newGame.category} onChange={e => setNewGame({...newGame, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:border-red-500 focus:outline-none cursor-pointer">
                      <option value="PC">PC</option>
                      <option value="PS4">PS4</option>
                      <option value="Multiplayer">Multiplayer</option>
                      <option value="Kids">Kids</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">File Size (GB)</label>
                    <input type="number" step="0.1" required value={newGame.size} onChange={e => setNewGame({...newGame, size: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:border-red-500 focus:outline-none" placeholder="0.0" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">Cover Image URL</label>
                    <div className="relative">
                      <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input type="url" value={newGame.image} onChange={e => setNewGame({...newGame, image: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm py-3 pl-9 pr-3 text-xs font-bold text-white focus:border-red-500 focus:outline-none" placeholder="https://..." />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">System Assessment / Details</label>
                  <textarea rows="4" required value={newGame.details} onChange={e => setNewGame({...newGame, details: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:border-red-500 focus:outline-none resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || !newGame.title}
                  className="bg-red-600 text-white px-8 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-red-500 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] active:scale-95"
                >
                  {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {isSubmitting ? 'Injecting...' : 'Add Game'}
                </button>
              </form>

              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 border-b border-white/10 pb-4">Current Catalog</h3>
              
              {dataLoading ? (
                <div className="text-red-500 text-[10px] font-black tracking-widest uppercase animate-pulse py-4">
                  Loading Database...
                </div>
              ) : (
                <div className="space-y-3">
                  {games.map(game => (
                    <div key={game.id} className="flex items-center justify-between bg-[#0a0a0a] p-4 rounded-sm border border-white/5">
                      <div className="flex items-center gap-4">
                        {game.image ? (
                           <img src={game.image} alt={game.title} className="w-10 h-10 object-cover rounded-sm border border-white/10" />
                        ) : (
                           <div className="w-10 h-10 bg-[#141414] rounded-sm border border-white/10 flex items-center justify-center">
                             <Gamepad2 size={16} className="text-neutral-600" />
                           </div>
                        )}
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
              )}
            </div>
          )}

          {activeTab === 'trending' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Trending Configurator</h3>
              <p className="text-xs text-neutral-400 font-medium mb-8">Select which games are displayed in the Home page marquee carousel.</p>
              
              {dataLoading ? (
                <div className="text-red-500 text-[10px] font-black tracking-widest uppercase animate-pulse">Loading Database...</div>
              ) : (
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
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Security Protocols</h3>
              <p className="text-xs text-neutral-400 font-medium mb-8">Update your master admin passcode.</p>
              
              <form onSubmit={handlePasswordChange} className="max-w-md space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">New Passcode</label>
                  <input type="password" required minLength="6" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-4 text-xs font-bold text-white focus:border-red-500 focus:outline-none" />
                </div>
                <button type="submit" className="bg-red-600 text-white px-8 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-red-500 transition-colors flex items-center gap-2 active:scale-95">
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