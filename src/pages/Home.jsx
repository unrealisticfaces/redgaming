import { ArrowRight, ShieldCheck, Zap, WifiOff } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-white drop-shadow-2xl">
        Unleash Premium <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]">
          Titles
        </span>
      </h1>

      <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12 leading-relaxed">
        High-performance, DRM-free offline titles engineered for flawless execution. Download directly, install locally, and play without network interruptions.
      </p>

      <Link to="/products" className="group relative inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-lg font-black uppercase tracking-widest hover:bg-red-500 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)]">
        Browse Library
        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-4xl">
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-xl flex flex-col items-center hover:border-red-600/30 transition-colors shadow-lg hover:shadow-xl">
          <Zap className="text-red-600 mb-4" size={32} />
          <h3 className="text-lg font-bold text-white mb-2">Max Framerates</h3>
          <p className="text-sm text-neutral-500">Optimized builds ensuring you get every single frame your rig can push.</p>
        </div>
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-xl flex flex-col items-center hover:border-red-600/30 transition-colors shadow-lg hover:shadow-xl">
          <WifiOff className="text-red-600 mb-4" size={32} />
          <h3 className="text-lg font-bold text-white mb-2">Zero Network Lag</h3>
          <p className="text-sm text-neutral-500">100% local execution. No telemetry, no always-online DRM bottlenecks.</p>
        </div>
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-xl flex flex-col items-center hover:border-red-600/30 transition-colors shadow-lg hover:shadow-xl">
          <ShieldCheck className="text-red-600 mb-4" size={32} />
          <h3 className="text-lg font-bold text-white mb-2">Clean Files</h3>
          <p className="text-sm text-neutral-500">Rigorous integrity checks guarantee your downloads are pristine and safe.</p>
        </div>
      </div>
    </div>
  )
}