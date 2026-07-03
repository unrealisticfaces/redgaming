import { useState, useEffect, useMemo } from 'react'
import { Image as ImageIcon, Search, Gamepad2, HardDrive, Save, Trash2, CheckCircle2, AlertTriangle, ChevronDown } from 'lucide-react'
import { ref, get, child } from 'firebase/database'
import { db } from '../firebase'

export default function Products() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [driveCapacity, setDriveCapacity] = useState(500)
  const [cart, setCart] = useState([])

  const categories = ['All', 'Kids', 'Multiplayer', 'PC', 'PS4']

  useEffect(() => {
    const fetchCatalog = async () => {
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
        console.error("Failed to fetch catalog:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCatalog()
  }, [])

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [games, searchQuery, activeCategory])

  const { totalUsedSpace, remainingSpace, progressPercentage, isOverCapacity } = useMemo(() => {
    const used = cart.reduce((total, game) => total + game.size, 0)
    const remain = driveCapacity - used
    const progress = Math.min((used / driveCapacity) * 100, 100)
    const over = used > driveCapacity
    return {
      totalUsedSpace: used,
      remainingSpace: remain,
      progressPercentage: progress,
      isOverCapacity: over
    }
  }, [cart, driveCapacity])

  const cartIds = useMemo(() => new Set(cart.map(g => g.id)), [cart])

  const toggleGameSelection = (game) => {
    if (cartIds.has(game.id)) {
      setCart(prev => prev.filter(g => g.id !== game.id))
    } else {
      setCart(prev => [...prev, game])
    }
  }

  const exportToNotepad = () => {
    if (cart.length === 0) return alert("Please select at least one game to export.")
    
    let text = "=========================================\n"
    text += "       RED GAMING - INSTALLATION LIST\n"
    text += "=========================================\n\n"
    
    const driveName = driveCapacity >= 1000 ? `${driveCapacity / 1000}TB` : `${driveCapacity}GB`
    text += `[ TARGET DRIVE ]: ${driveName}\n`
    text += `[ TOTAL USED   ]: ${totalUsedSpace.toFixed(2)} GB\n`
    text += `[ REMAINING    ]: ${remainingSpace.toFixed(2)} GB\n\n`
    
    if (isOverCapacity) {
      text += "WARNING: SELECTED GAMES EXCEED DRIVE CAPACITY!\n\n"
    }
    
    text += "--- SELECTED TITLES ---\n\n"
    cart.forEach((game, index) => {
      text += `${index + 1}. ${game.title}\n`
      text += `   Category: ${game.category}\n`
      text += `   Size: ${game.size.toFixed(2)} GB\n\n`
    })
    
    text += "=========================================\n"
    text += "End of list.\n"
    
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "RedGaming_Selection.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="animate-in fade-in duration-700 w-full max-w-7xl mx-auto relative transform-gpu">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 gap-6 border-b border-white/10">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">CATALOG</h2>
          <p className="text-neutral-400 mt-2 text-xs font-medium uppercase tracking-widest">Build your ultimate local library</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={14} />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-sm py-3 pl-10 pr-4 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-md"
          />
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-sm p-5 md:p-6 mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 md:gap-8">
          
          <div className="flex-1 w-full">
            {/* FIXED FOR MOBILE: Stacks properly, no text overlapping */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-3">
                <HardDrive size={20} className="text-neutral-300 shrink-0" />
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Drive Configurator</h3>
              </div>
              <div className="flex items-center justify-between w-full sm:w-auto bg-[#0a0a0a] sm:bg-transparent p-3 sm:p-0 rounded-sm border border-white/5 sm:border-none gap-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest whitespace-nowrap">Select Drive:</span>
                <div className="relative w-full sm:w-auto">
                  <select 
                    value={driveCapacity}
                    onChange={(e) => setDriveCapacity(Number(e.target.value))}
                    className="bg-[#222] border border-white/10 text-xs text-white font-bold py-2 pl-3 pr-8 rounded-sm focus:outline-none focus:border-red-500 cursor-pointer appearance-none w-full"
                  >
                    <option value={500}>500 GB</option>
                    <option value={1000}>1 TB (1000 GB)</option>
                    <option value={2000}>2 TB (2000 GB)</option>
                    <option value={4000}>4 TB (4000 GB)</option>
                    <option value={8000}>8 TB (8000 GB)</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="w-full h-3 bg-[#222] rounded-full overflow-hidden mb-3 relative border border-white/5">
              <div 
                className={`h-full transition-all duration-500 ${isOverCapacity ? 'bg-orange-500' : 'bg-red-500'}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className={isOverCapacity ? 'text-orange-500' : 'text-neutral-300'}>
                {totalUsedSpace.toFixed(1)} GB Used
              </span>
              <span className="text-neutral-400">
                {driveCapacity >= 1000 ? `${driveCapacity / 1000} TB` : `${driveCapacity} GB`} Total
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:border-l lg:border-white/10 lg:pl-6 mt-2 lg:mt-0">
            <button 
              onClick={() => setCart([])}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#222] text-neutral-300 border border-white/10 rounded-sm hover:text-white hover:border-white/30 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transform-gpu"
            >
              <Trash2 size={14} /> Clear
            </button>
            <button 
              onClick={exportToNotepad}
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 text-white rounded-sm hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transform-gpu"
              disabled={cart.length === 0}
            >
              <Save size={14} /> Save List
            </button>
          </div>
        </div>
        
        {isOverCapacity && (
          <div className="mt-4 flex items-center gap-2 text-orange-500 text-[10px] font-black uppercase tracking-widest bg-orange-500/10 p-2 rounded-sm border border-orange-500/30">
            <AlertTriangle size={14} /> Warning: Exceeded drive capacity!
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-sm text-[10px] font-black transition-all duration-300 uppercase tracking-widest border transform-gpu active:scale-95 ${
              activeCategory === category
                ? 'bg-red-500 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : 'bg-[#141414] border-white/10 text-neutral-300 hover:border-red-400 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-red-500 animate-pulse font-bold text-sm tracking-widest uppercase border border-dashed border-white/10 rounded-sm bg-[#141414]">
          Loading Database...
        </div>
      ) : filteredGames.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 font-bold text-sm tracking-widest uppercase border border-dashed border-white/10 rounded-sm bg-[#141414]">
          No games found matching criteria.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 pb-10">
          {filteredGames.map(game => {
            const isSelected = cartIds.has(game.id)
            return (
              <div 
                key={game.id} 
                className={`w-full bg-[#141414] rounded-sm border overflow-hidden transition-all duration-500 group flex flex-col relative shadow-lg transform-gpu ${
                  isSelected 
                    ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
                    : 'border-white/10 hover:border-red-500/50 hover:shadow-[0_10px_30px_rgba(239,68,68,0.2)] md:hover:-translate-y-1.5'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 left-2 z-30 bg-red-500 text-white rounded-full p-1 shadow-lg transform-gpu">
                    <CheckCircle2 size={12} strokeWidth={4} />
                  </div>
                )}
                
                <div className={`aspect-[3/4] w-full bg-[#111] relative overflow-hidden flex items-center justify-center border-b ${isSelected ? 'border-red-500/40' : 'border-white/10'}`}>
                  {game.image ? (
                    <img src={game.image} alt={game.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 md:group-hover:scale-110 transform-gpu" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-[#222] to-[#141414] z-0"></div>
                  )}
                  
                  <div className={`absolute inset-0 transition-colors duration-500 z-10 ${isSelected ? 'bg-black/20' : 'bg-black/10 md:group-hover:bg-black/60'}`}></div>
                  
                  <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <button
                      onClick={() => toggleGameSelection(game)}
                      className={`px-4 py-2.5 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 transform-gpu cursor-pointer ${
                        isSelected
                          ? 'bg-[#222] text-red-400 border border-red-500/50 hover:bg-red-500/20 shadow-lg'
                          : 'bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                      }`}
                    >
                      {isSelected ? <Trash2 size={14} /> : <Gamepad2 size={14} />}
                      {isSelected ? 'Remove' : 'Add to Drive'}
                    </button>
                  </div>
                  
                  {!game.image && <ImageIcon size={28} className="text-white/20 md:group-hover:text-red-400/60 transition-colors duration-700 z-0 scale-150 md:group-hover:scale-100 transform-gpu" />}
                  <span className="absolute top-2 right-2 z-20 bg-black/80 backdrop-blur-md px-2 py-1 text-[9px] font-black text-white rounded-sm border border-white/20 uppercase tracking-widest shadow-md">
                    {game.category}
                  </span>
                </div>
                
                <div className="p-4 flex flex-col flex-grow bg-gradient-to-t from-[#111] to-[#141414]">
                  <h3 className={`text-xs font-black mb-2 line-clamp-2 leading-snug tracking-wide ${isSelected ? 'text-red-400' : 'text-white'}`}>
                    {game.title}
                  </h3>
                  <div className="mt-auto flex flex-col gap-3">
                    <div className="text-[10px] font-bold text-neutral-400 tracking-widest">
                      {game.size} GB
                    </div>
                    
                    <button
                      onClick={() => toggleGameSelection(game)}
                      className={`flex md:hidden w-full py-2.5 rounded-sm font-black text-[10px] uppercase tracking-widest items-center justify-center gap-2 transition-all duration-300 transform-gpu active:scale-95 ${
                        isSelected
                          ? 'bg-[#222] text-red-400 border border-red-500/50 shadow-lg'
                          : 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                      }`}
                    >
                      {isSelected ? <Trash2 size={14} /> : <Gamepad2 size={14} />}
                      {isSelected ? 'Remove' : 'Add to Drive'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}