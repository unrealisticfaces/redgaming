import { useState, useEffect } from 'react'
import { Image as ImageIcon, Search, X, MonitorPlay, Cpu, Gamepad2, HardDrive, Save, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react'
import { ref, get, child } from 'firebase/database'
import { db } from '../firebase'

export default function Products() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedGameModal, setSelectedGameModal] = useState(null)
  
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
        console.error("Failed to fetch catalog")
      } finally {
        setLoading(false)
      }
    }
    fetchCatalog()
  }, [])

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || game.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const totalUsedSpace = cart.reduce((total, game) => total + game.size, 0)
  const remainingSpace = driveCapacity - totalUsedSpace
  const progressPercentage = Math.min((totalUsedSpace / driveCapacity) * 100, 100)
  const isOverCapacity = totalUsedSpace > driveCapacity

  const toggleGameSelection = (game) => {
    const isSelected = cart.some(g => g.id === game.id)
    if (isSelected) {
      setCart(cart.filter(g => g.id !== game.id))
    } else {
      setCart([...cart, game])
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
    <div className="animate-in fade-in duration-700 w-full max-w-7xl mx-auto relative">
      
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

      <div className="bg-[#141414] border border-white/10 rounded-sm p-6 mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
        
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <HardDrive size={20} className="text-neutral-300" />
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Drive Configurator</h3>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Select Drive:</span>
                <select 
                  value={driveCapacity}
                  onChange={(e) => setDriveCapacity(Number(e.target.value))}
                  className="bg-[#222] border border-white/10 text-xs text-white font-bold py-1.5 px-3 rounded-sm focus:outline-none focus:border-red-500 cursor-pointer appearance-none"
                >
                  <option value={500}>500 GB Drive</option>
                  <option value={1000}>1 TB Drive (1000 GB)</option>
                  <option value={2000}>2 TB Drive (2000 GB)</option>
                  <option value={4000}>4 TB Drive (4000 GB)</option>
                  <option value={8000}>8 TB Drive (8000 GB)</option>
                </select>
              </div>
            </div>

            <div className="w-full h-3 bg-[#222] rounded-full overflow-hidden mb-2 relative border border-white/5">
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

          <div className="flex flex-col sm:flex-row gap-3 md:border-l md:border-white/10 md:pl-6">
            <button 
              onClick={() => setCart([])}
              className="px-4 py-3 bg-[#222] text-neutral-300 border border-white/10 rounded-sm hover:text-white hover:border-white/30 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Trash2 size={14} /> Clear
            </button>
            <button 
              onClick={exportToNotepad}
              className="px-6 py-3 bg-red-600 text-white rounded-sm hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cart.length === 0}
            >
              <Save size={14} /> Save List
            </button>
          </div>
        </div>

        {isOverCapacity && (
          <div className="mt-4 flex items-center gap-2 text-orange-500 text-[10px] font-black uppercase tracking-widest bg-orange-500/10 p-2 rounded-sm border border-orange-500/30">
            <AlertTriangle size={14} /> Warning: You have exceeded the selected drive capacity.
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-sm text-[10px] font-black transition-all duration-300 uppercase tracking-widest border ${
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {filteredGames.map(game => {
            const isSelected = cart.some(g => g.id === game.id)

            return (
              <div 
                key={game.id} 
                onClick={() => setSelectedGameModal(game)}
                className={`w-full bg-[#141414] rounded-sm border overflow-hidden hover:-translate-y-1.5 transition-all duration-500 group flex flex-col cursor-pointer relative shadow-lg ${
                  isSelected 
                    ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
                    : 'border-white/10 hover:border-red-500/50 hover:shadow-[0_10px_30px_rgba(239,68,68,0.2)]'
                }`}
              >
                
                {isSelected && (
                  <div className="absolute top-2 left-2 z-30 bg-red-500 text-white rounded-full p-1 shadow-lg">
                    <CheckCircle2 size={12} strokeWidth={4} />
                  </div>
                )}

                <div className={`aspect-[3/4] w-full bg-[#111] relative overflow-hidden flex items-center justify-center border-b ${isSelected ? 'border-red-500/40' : 'border-white/10'}`}>
                  {game.image ? (
                    <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover z-0" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-[#222] to-[#141414] z-0"></div>
                  )}
                  
                  <div className={`absolute inset-0 transition-colors duration-500 z-10 ${isSelected ? 'bg-black/10' : 'bg-black/30 group-hover:bg-transparent'}`}></div>
                  
                  {!game.image && <ImageIcon size={28} className="text-white/20 group-hover:text-red-400/60 transition-colors duration-700 z-0 scale-150 group-hover:scale-100" />}
                  
                  <span className="absolute top-2 right-2 z-20 bg-black/80 backdrop-blur-md px-2 py-1 text-[9px] font-black text-white rounded-sm border border-white/20 uppercase tracking-widest shadow-md">
                    {game.category}
                  </span>
                </div>
                
                <div className="p-4 flex flex-col flex-grow bg-gradient-to-t from-[#111] to-[#141414]">
                  <h3 className={`text-xs font-black mb-2 line-clamp-2 leading-snug tracking-wide ${isSelected ? 'text-red-400' : 'text-white'}`}>
                    {game.title}
                  </h3>
                  <div className="mt-auto">
                    <div className="text-[10px] font-bold text-neutral-400 tracking-widest">
                      {game.size} GB
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {selectedGameModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer" 
            onClick={() => setSelectedGameModal(null)}
          ></div>
          
          <div className="relative w-full max-w-3xl bg-[#141414] border border-white/10 rounded-sm shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 max-h-[85vh] md:h-[500px]">
            
            <div className="w-full md:w-[45%] h-48 md:h-full bg-[#111] relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 flex-shrink-0">
              {selectedGameModal.image ? (
                <img src={selectedGameModal.image} alt={selectedGameModal.title} className="absolute inset-0 w-full h-full object-cover z-0" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-[#222] to-[#141414] z-0"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:from-black/50 to-transparent z-0"></div>
              
              {!selectedGameModal.image && <ImageIcon size={64} className="text-white/10 drop-shadow-2xl z-0" />}
              
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 text-[10px] font-black text-white rounded-sm border border-white/20 uppercase tracking-widest z-10">
                {selectedGameModal.category}
              </div>
            </div>

            {/* FIXED UI: Flex layout pins the header and button, making only the description scrollable */}
            <div className="w-full md:w-[55%] flex flex-col relative bg-[#141414] h-full overflow-hidden">
              
              <button 
                onClick={() => setSelectedGameModal(null)} 
                className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-black/30 p-2 rounded-sm border border-white/10 hover:border-red-500/50 transition-all duration-300 z-20 hover:bg-red-500/20"
              >
                <X size={20} />
              </button>

              <div className="p-6 sm:p-8 flex flex-col h-full">
                
                {/* 1. Header (Pinned) */}
                <div className="mb-6 pr-8 flex-shrink-0">
                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3 drop-shadow-md line-clamp-2">
                    {selectedGameModal.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#222] border border-white/10 text-white text-[10px] font-black tracking-widest uppercase">
                      <HardDrive size={12} className="text-red-400" />
                      {selectedGameModal.size} GB
                    </div>
                  </div>
                </div>

                {/* 2. Middle Content (Scrolls if text is too long) */}
                <div className="space-y-6 flex-grow overflow-y-auto pr-4 -mr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ef4444 transparent' }}>
                  <div>
                    <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      System Assessment
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed font-medium whitespace-pre-wrap">
                      {selectedGameModal.details || `Fully optimized executable. Zero background telemetry. Experience pristine, uninterrupted gameplay exactly as it was meant to be played.`}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pb-2">
                     <div className="bg-[#222] p-3 rounded-sm border border-white/5 hover:border-red-500/30 transition-colors">
                       <MonitorPlay size={16} className="text-red-400 mb-2" />
                       <div className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-1">Resolution</div>
                       <div className="text-xs font-bold text-white">Up to 4K</div>
                     </div>
                     <div className="bg-[#222] p-3 rounded-sm border border-white/5 hover:border-red-500/30 transition-colors">
                       <Cpu size={16} className="text-red-400 mb-2" />
                       <div className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-1">Performance</div>
                       <div className="text-xs font-bold text-white">Unlocked FPS</div>
                     </div>
                  </div>
                </div>

                {/* 3. Footer Button (Pinned) */}
                <div className="mt-4 pt-4 border-t border-white/10 flex-shrink-0">
                  <button 
                    onClick={() => {
                      toggleGameSelection(selectedGameModal)
                      setSelectedGameModal(null)
                    }}
                    className={`w-full font-black text-xs uppercase tracking-[0.2em] py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-3 group ${
                      cart.some(g => g.id === selectedGameModal.id)
                        ? 'bg-[#222] text-red-400 border border-red-500/50 hover:bg-red-500/20'
                        : 'bg-red-600 text-white hover:bg-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]'
                    }`}
                  >
                    {cart.some(g => g.id === selectedGameModal.id) ? (
                      <>
                        <Trash2 size={16} /> Remove from Drive
                      </>
                    ) : (
                      <>
                        <Gamepad2 size={16} className="group-hover:scale-110 transition-transform" />
                        Add to Drive
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}