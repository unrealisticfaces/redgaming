import { useState, useEffect, useMemo } from 'react'
import { auth, db } from '../firebase'
import { updatePassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, push, set, get, child, update, remove } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { Settings, Gamepad2, TrendingUp, Shield, Save, LogOut, CheckCircle2, AlertTriangle, Trash2, Loader2, Wand2, Link as LinkIcon, Search, Clock, Pencil, Image as ImageIcon } from 'lucide-react'

const RAWG_API_KEY = 'a73ea23a91934b4c9cce7dbe01a9708d'

export default function AdminSettings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('games')
  const [authLoading, setAuthLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFetchingAPI, setIsFetchingAPI] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [games, setGames] = useState([])
  const [adminSearch, setAdminSearch] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [editingId, setEditingId] = useState(null)
  
  const [newGame, setNewGame] = useState({
    title: '',
    category: 'PC',
    size: '',
    image: '', 
    isTrending: false
  })

  useEffect(() => {
    let timeout
    const resetTimer = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        signOut(auth)
        navigate('/login')
      }, 600000)
    }

    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keypress', resetTimer)
    window.addEventListener('click', resetTimer)
    window.addEventListener('scroll', resetTimer)
    resetTimer()

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keypress', resetTimer)
      window.removeEventListener('click', resetTimer)
      window.removeEventListener('scroll', resetTimer)
    }
  }, [navigate])

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
      showMessage('error', 'Database connection failed.')
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
      const searchRes = await fetch(`https://api.rawg.io/api/games?search=${encodeURIComponent(newGame.title)}&key=${RAWG_API_KEY}&page_size=1`)
      const searchData = await searchRes.json()

      if (searchData.results && searchData.results.length > 0) {
        const gameData = searchData.results[0]
        setNewGame(prev => ({
          ...prev,
          title: gameData.name, 
          image: gameData.background_image || ''
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

  const handleSaveGame = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editingId) {
        await update(ref(db, `games/${editingId}`), {
          ...newGame,
          size: Number(newGame.size)
        })
        showMessage('success', 'Game record updated successfully.')
        setEditingId(null)
      } else {
        const newGameRef = push(ref(db, 'games'))
        await set(newGameRef, {
          ...newGame,
          size: Number(newGame.size),
          createdAt: new Date().toISOString()
        })
        showMessage('success', 'Game added to catalog successfully.')
      }
      setNewGame({ title: '', category: 'PC', size: '', image: '', isTrending: false })
      fetchGames()
    } catch (error) {
      showMessage('error', 'Failed to save game data.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditClick = (game) => {
    setEditingId(game.id)
    setNewGame({
      title: game.title,
      category: game.category || 'PC',
      size: game.size,
      image: game.image || '',
      isTrending: game.isTrending || false
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setNewGame({ title: '', category: 'PC', size: '', image: '', isTrending: false })
  }

  const handleDeleteGame = async (id) => {
    if(window.confirm('Are you sure you want to delete this game?')) {
      try {
        await remove(ref(db, `games/${id}`))
        showMessage('success', 'Game removed.')
        if (editingId === id) handleCancelEdit()
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

  const optimizedGamesList = useMemo(() => {
    return games
      .filter(game => game.title.toLowerCase().includes(adminSearch.toLowerCase()))
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
  }, [games, adminSearch])

  if (authLoading) {
    return (
      <div className="flex-grow flex items-center justify-center text-red-500 animate-pulse font-black tracking-widest uppercase text-sm gap-3">
        <Shield size={18} className="animate-spin" /> Verifying Credentials...
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col flex-grow py-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#111] rounded-full flex items-center justify-center border border-red-500">
            <Settings className="text-red-500" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase drop-shadow-md">System Settings</h2>
            <div className="flex items-center gap-2 mt-1">
              <Clock size={10} className="text-red-500" />
              <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest">Auto-Kill Active (10m)</p>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400 bg-[#111] px-4 py-2 rounded-sm border border-white/10 hover:bg-red-600 hover:text-white hover:border-red-600">
          <LogOut size={16} /> Terminate Session
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest p-4 rounded-sm border ${message.type === 'error' ? 'bg-orange-500 text-black border-orange-500' : 'bg-green-500 text-black border-green-500'}`}>
          {message.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
          {message.text}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 items-start h-full">
        <div className="w-full lg:w-64 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar shrink-0">
          <button onClick={() => setActiveTab('games')} className={`flex items-center gap-3 px-5 py-4 rounded-sm font-black text-xs uppercase tracking-widest whitespace-nowrap ${activeTab === 'games' ? 'bg-red-500 text-white' : 'bg-[#141414] text-neutral-400 border border-white/10 hover:bg-[#222]'}`}>
            <Gamepad2 size={16} /> Catalog Manager
          </button>
          <button onClick={() => setActiveTab('trending')} className={`flex items-center gap-3 px-5 py-4 rounded-sm font-black text-xs uppercase tracking-widest whitespace-nowrap ${activeTab === 'trending' ? 'bg-red-500 text-white' : 'bg-[#141414] text-neutral-400 border border-white/10 hover:bg-[#222]'}`}>
            <TrendingUp size={16} /> Trending Config
          </button>
          <button onClick={() => setActiveTab('security')} className={`flex items-center gap-3 px-5 py-4 rounded-sm font-black text-xs uppercase tracking-widest whitespace-nowrap ${activeTab === 'security' ? 'bg-red-500 text-white' : 'bg-[#141414] text-neutral-400 border border-white/10 hover:bg-[#222]'}`}>
            <Shield size={16} /> Security
          </button>
        </div>

        <div className="flex-1 w-full bg-[#141414] border border-white/10 rounded-sm p-6 md:p-8">
          
          {activeTab === 'games' && (
            <div className="flex flex-col xl:flex-row gap-10">
              
              <div className="w-full xl:w-5/12 flex-shrink-0">
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 border-b border-white/10 pb-4">
                  {editingId ? 'Edit Title' : 'Add New Title'}
                </h3>
                
                <form onSubmit={handleSaveGame} className="space-y-5">
                  <div className="bg-[#0a0a0a] border border-red-500/20 p-4 rounded-sm flex flex-col gap-3">
                    <label className="block text-[10px] font-black text-neutral-400 tracking-widest uppercase">1. Search Game Title</label>
                    <input type="text" value={newGame.title} onChange={e => setNewGame({...newGame, title: e.target.value})} className="w-full bg-[#141414] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:outline-none focus:border-red-500" placeholder="e.g., Cyberpunk 2077" />
                    <button 
                      type="button" 
                      onClick={handleAutoFill}
                      disabled={isFetchingAPI}
                      className="w-full bg-neutral-800 text-white px-6 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 border border-white/10 hover:bg-neutral-700"
                    >
                      {isFetchingAPI ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} className="text-red-400" />}
                      {isFetchingAPI ? 'Searching...' : 'Auto-Fill Data'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">Category</label>
                      <select value={newGame.category} onChange={e => setNewGame({...newGame, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:outline-none focus:border-red-500">
                        <option value="PC">PC</option>
                        <option value="PS4">PS4</option>
                        <option value="Multiplayer">Multiplayer</option>
                        <option value="Kids">Kids</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">File Size (GB)</label>
                      <input type="number" step="0.1" required value={newGame.size} onChange={e => setNewGame({...newGame, size: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-xs font-bold text-white focus:outline-none focus:border-red-500" placeholder="0.0" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">Cover Image URL (Auto or Manual)</label>
                    <div className="flex gap-3 items-start">
                      <div className="relative flex-grow">
                        <LinkIcon size={14} className="absolute left-3 top-3.5 text-neutral-500" />
                        <input 
                          type="url" 
                          value={newGame.image} 
                          onChange={e => setNewGame({...newGame, image: e.target.value})} 
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm py-3 pl-9 pr-3 text-xs font-bold text-white focus:outline-none focus:border-red-500" 
                          placeholder="Paste direct image link..." 
                        />
                      </div>
                      <div className="w-12 h-12 shrink-0 rounded-sm border border-white/10 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                        {newGame.image ? (
                          <img src={newGame.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                        ) : (
                          <ImageIcon size={16} className="text-neutral-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting || !newGame.title}
                      className="flex-1 bg-red-600 text-white px-6 py-4 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-red-500"
                    >
                      {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      {editingId ? (isSubmitting ? 'Updating...' : 'Update Record') : (isSubmitting ? 'Injecting...' : 'Inject into Database')}
                    </button>
                    {editingId && (
                      <button 
                        type="button" 
                        onClick={handleCancelEdit}
                        className="px-6 py-4 bg-[#222] text-neutral-400 border border-white/10 rounded-sm font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="w-full xl:w-7/12 flex flex-col mt-10 xl:mt-0 xl:border-l xl:border-white/10 xl:pl-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b border-white/10 pb-4 gap-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Database Record</h3>
                  <div className="relative w-full sm:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search record..." 
                      value={adminSearch}
                      onChange={e => setAdminSearch(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm py-2 pl-9 pr-3 text-xs font-bold text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
                
                {dataLoading ? (
                  <div className="text-red-500 text-[10px] font-black tracking-widest uppercase animate-pulse py-4">
                    Retrieving Data...
                  </div>
                ) : (
                  <div className="overflow-y-auto pr-2 space-y-3 h-[500px]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ef4444 transparent' }}>
                    {optimizedGamesList.map(game => (
                      <div key={game.id} className={`flex items-center justify-between p-3 rounded-sm border transition-colors ${editingId === game.id ? 'bg-red-500/10 border-red-500/50' : 'bg-[#0a0a0a] border-white/5'}`}>
                        <div className="flex items-center gap-4 overflow-hidden">
                          {game.image ? (
                             <img src={game.image} alt={game.title} className="w-12 h-12 object-cover rounded-sm border border-white/10 shrink-0" />
                          ) : (
                             <div className="w-12 h-12 bg-[#141414] rounded-sm border border-white/10 flex items-center justify-center shrink-0">
                               <Gamepad2 size={16} className="text-neutral-600" />
                             </div>
                          )}
                          <div className="truncate pr-4">
                            <div className="font-bold text-white text-sm truncate">{game.title}</div>
                            <div className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">{game.category} • {game.size} GB</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => handleEditClick(game)} className="text-neutral-500 p-3 bg-[#141414] rounded-sm border border-white/5 hover:bg-[#222] hover:text-white active:scale-90">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDeleteGame(game.id)} className="text-neutral-500 p-3 bg-[#141414] rounded-sm border border-white/5 hover:bg-red-900 hover:text-white hover:border-red-500 active:scale-90">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {optimizedGamesList.length === 0 && <div className="text-neutral-500 text-xs font-bold text-center py-10">No matching records found.</div>}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'trending' && (
            <div className="max-w-2xl">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Trending Configurator</h3>
              <p className="text-xs text-neutral-400 font-medium mb-8">Select which games are displayed in the Home page marquee carousel.</p>
              
              {dataLoading ? (
                <div className="text-red-500 text-[10px] font-black tracking-widest uppercase animate-pulse">Loading Database...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ef4444 transparent' }}>
                  {games.map(game => (
                    <div key={game.id} onClick={() => toggleTrending(game)} className={`flex items-center justify-between p-4 rounded-sm border cursor-pointer ${game.isTrending ? 'bg-red-900 border-red-500' : 'bg-[#0a0a0a] border-white/5 hover:bg-[#111]'}`}>
                      <div className="font-bold text-sm text-white truncate pr-4">{game.title}</div>
                      <div className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center ${game.isTrending ? 'border-white bg-red-500' : 'border-neutral-600'}`}>
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
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Security Protocols</h3>
              <p className="text-xs text-neutral-400 font-medium mb-8">Update your master admin passcode.</p>
              
              <form onSubmit={handlePasswordChange} className="max-w-md space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-neutral-400 mb-2 tracking-widest uppercase">New Passcode</label>
                  <input type="password" required minLength="6" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-4 text-xs font-bold text-white focus:outline-none focus:border-red-500" />
                </div>
                <button type="submit" className="bg-red-600 text-white px-8 py-4 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-500">
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