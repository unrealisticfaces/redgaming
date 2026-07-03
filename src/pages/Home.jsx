import { useState, useEffect, useMemo } from 'react'
import { ArrowRight, ShieldCheck, Zap, MonitorPlay, Image as ImageIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ref, get } from 'firebase/database'
import { db } from '../firebase'

export default function Home() {
  const [trendingGames, setTrendingGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const snapshot = await get(ref(db, 'games'))
        
        if (snapshot.exists()) {
          const data = snapshot.val()
          const gamesList = Object.keys(data)
            .map(key => ({ id: key, ...data[key] }))
            .filter(game => game.isTrending === true)
            
          setTrendingGames(gamesList)
        } else {
          setTrendingGames([])
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  const { marqueeGames, dynamicAnimationDuration } = useMemo(() => {
    const multiplied = [...trendingGames, ...trendingGames, ...trendingGames, ...trendingGames]
    return {
      marqueeGames: multiplied,
      dynamicAnimationDuration: Math.max(60, multiplied.length * 3)
    }
  }, [trendingGames])

  return (
    <div className="flex flex-col items-center justify-center py-12 w-full animate-in fade-in duration-1000 transform-gpu">
      
      <div className="text-center max-w-4xl mx-auto mb-32 z-10">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[1.1] text-white drop-shadow-2xl">
          YOUR GAMES. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-400 via-red-500 to-red-800 drop-shadow-[0_0_40px_rgba(239,68,68,0.5)]">
            YOUR RULES.
          </span>
        </h1>

        <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Escape the bloated launchers and DRM restrictions. Build an elite library of highly optimized, premium games that belong exclusively to you. Download once, play forever.
        </p>

        <Link to="/products" className="group relative inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-sm font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(239,68,68,0.7)] active:scale-95">
          <span className="text-red-500 group-hover:text-white transition-colors">[</span>
          <span className="relative z-10 flex items-center gap-2">
            ENTER THE VAULT
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </span>
          <span className="text-red-500 group-hover:text-white transition-colors">]</span>
        </Link>
      </div>

      <div className="w-full max-w-[100vw] relative mb-32 z-10 overflow-hidden">
        <div className="flex items-center gap-3 mb-8 px-6 lg:px-0 max-w-7xl mx-auto">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]"></div>
          <h2 className="text-xl font-black text-white tracking-widest uppercase drop-shadow-md">Trending Games</h2>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

        <div className="w-full relative h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-red-500 animate-pulse text-xs font-black uppercase tracking-widest">Loading Uplink...</div>
            </div>
          ) : trendingGames.length === 0 ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-neutral-500 text-xs font-black uppercase tracking-widest">No trending games configured in database.</div>
            </div>
          ) : (
            <div 
              className="flex animate-marquee gap-5 px-5 transform-gpu will-change-transform pointer-events-none"
              style={{ animationDuration: `${dynamicAnimationDuration}s` }}
            >
              {marqueeGames.map((game, index) => (
                <div key={`${game.id}-${index}`} className="w-[180px] sm:w-[220px] flex-shrink-0 bg-[#141414] rounded-sm border border-white/10 overflow-hidden shadow-xl transform-gpu backface-hidden">
                  
                  <div className="aspect-[3/4] w-full bg-[#111] relative flex items-center justify-center overflow-hidden">
                    {game.image ? (
                      <img 
                        src={game.image} 
                        alt={game.title} 
                        loading="lazy" 
                        decoding="async" 
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90" 
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-b from-[#222] to-[#141414] z-0"></div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/30 z-10"></div>
                    
                    {!game.image && <ImageIcon size={28} className="text-white/10 z-0 scale-150 transform-gpu" />}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
                      <h3 className="text-xs font-black text-white tracking-widest uppercase truncate drop-shadow-md">{game.title}</h3>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-6 lg:px-0 z-10">
        <div className="bg-[#141414]/80 backdrop-blur-xl border border-white/10 p-8 flex flex-col items-center hover:border-red-500/50 transition-all duration-500 group rounded-sm shadow-2xl hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] md:hover:-translate-y-1 transform-gpu">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-red-500/20">
            <Zap className="text-red-400" size={24} />
          </div>
          <h3 className="text-sm font-black text-white mb-3 tracking-widest uppercase drop-shadow-sm">Optimized Builds</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-medium text-center">Engineered for flawless execution, ensuring you extract every single frame your hardware can generate.</p>
        </div>

        <div className="bg-[#141414]/80 backdrop-blur-xl border border-white/10 p-8 flex flex-col items-center hover:border-red-500/50 transition-all duration-500 group rounded-sm shadow-2xl hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] md:hover:-translate-y-1 transform-gpu">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-red-500/20">
            <MonitorPlay className="text-red-400" size={24} />
          </div>
          <h3 className="text-sm font-black text-white mb-3 tracking-widest uppercase drop-shadow-sm">Seamless Experience</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-medium text-center">No telemetry, no background processes, no DRM bottlenecks. Just pure, uninterrupted gameplay.</p>
        </div>

        <div className="bg-[#141414]/80 backdrop-blur-xl border border-white/10 p-8 flex flex-col items-center hover:border-red-500/50 transition-all duration-500 group rounded-sm shadow-2xl hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] md:hover:-translate-y-1 transform-gpu">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-red-500/20">
            <ShieldCheck className="text-red-400" size={24} />
          </div>
          <h3 className="text-sm font-black text-white mb-3 tracking-widest uppercase drop-shadow-sm">Pristine Archives</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-medium text-center">Rigorous integrity checks guarantee your game files are pristine, complete, and safe to launch.</p>
        </div>
      </div>
    </div>
  )
}