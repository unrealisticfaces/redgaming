import { ShieldCheck, HardDrive, Zap, Crosshair, CloudDownload } from 'lucide-react'

export default function About() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col flex-grow animate-in fade-in duration-700 transform-gpu">
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tighter uppercase drop-shadow-md">
          The <span className="text-red-500">Red Gaming</span> Protocol
        </h2>
        <p className="text-sm text-neutral-400 font-medium max-w-2xl mx-auto uppercase tracking-widest">
          No bandwidth limits. No DRM launchers. Just pure offline gaming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Our Mission</h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            In an era of 100GB+ downloads, mandatory online connections, and bloated background launchers, gamers are losing ownership of their libraries. RED GAMING was built to bypass the system.
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            We specialize in curating pristine, highly-optimized offline game archives. Whether you want a fully-loaded physical hard drive shipped to your door, or a direct high-speed download link to your inbox, we do the heavy lifting so you don't have to wait.
          </p>
        </div>
        
        <div className="bg-[#141414] p-8 rounded-sm border border-white/10 shadow-2xl relative overflow-hidden group transform-gpu transition-all duration-500 hover:border-red-500/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-700"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-red-500/10 p-2 rounded-sm border border-red-500/20">
                <HardDrive size={16} className="text-red-500" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Flexible Delivery</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">Get your games loaded directly onto high-speed physical drives, or opt for secure digital download links. Plug in or download, run the executable, and play.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-red-500/10 p-2 rounded-sm border border-red-500/20">
                <Crosshair size={16} className="text-red-500" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Precision Optimization</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">Every title is tested for maximum performance, stripping out unnecessary telemetry that throttles your hardware.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgraded 3-Box Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] p-8 rounded-sm border border-white/5 flex flex-col items-center text-center hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:-translate-y-1 transition-all duration-500 group transform-gpu">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <ShieldCheck size={32} className="text-red-500" />
          </div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">100% Offline</h4>
          <p className="text-[10px] text-neutral-400 leading-relaxed">Play anywhere, anytime. No internet connection or DRM verification required.</p>
        </div>
        
        <div className="bg-[#0a0a0a] p-8 rounded-sm border border-white/5 flex flex-col items-center text-center hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:-translate-y-1 transition-all duration-500 group transform-gpu">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <Zap size={32} className="text-red-500" />
          </div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">Plug & Play</h4>
          <p className="text-[10px] text-neutral-400 leading-relaxed">Pre-configured files mean zero complex installation steps. Copy, click, and launch.</p>
        </div>
        
        <div className="bg-[#0a0a0a] p-8 rounded-sm border border-white/5 flex flex-col items-center text-center hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:-translate-y-1 transition-all duration-500 group transform-gpu">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <CloudDownload size={32} className="text-red-500" />
          </div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">Drive or Cloud</h4>
          <p className="text-[10px] text-neutral-400 leading-relaxed">From 500GB physical drives to instant cloud links. You pick the capacity and delivery.</p>
        </div>
      </div>

    </div>
  )
}