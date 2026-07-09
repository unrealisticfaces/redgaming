import { MapPin, ChevronRight, MessageSquare, PlayCircle, Download, Wrench, Video, Terminal, ExternalLink, Shield, Folder } from 'lucide-react'
import redToolPreview from '../images/redtool.png'

const socials = [
  {
    name: "WhatsApp",
    handle: "017-9797 287",
    link: "https://wa.me/60179797287",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    )
  },
  {
    name: "Facebook",
    handle: "Red PC Gaming",
    link: "https://www.facebook.com/share/1D5zLdqBXq/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  },
  {
    name: "TikTok",
    handle: "@red.pcgamingbajet",
    link: "https://www.tiktok.com/@red.pcgamingbajet",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    )
  },
  {
    name: "Shopee",
    handle: "Red Gaming Store",
    link: "https://my.shp.ee/Lz8hFW9K",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
        <path d="M3 6h18"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    )
  }
]

export default function Support() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center flex-grow animate-in fade-in duration-700 pb-20">
      
      <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-black mb-2 text-white tracking-tighter uppercase">
            Comms Channel
          </h2>
          <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">
            Establish a direct connection to HQ
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111] border border-white/10 rounded-sm shadow-inner self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
        
        <div className="flex flex-col gap-3 h-full lg:col-span-1">
          <div className="flex items-center gap-2 mb-2 shrink-0">
            <MessageSquare size={14} className="text-red-500" />
            <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Direct Links</h3>
          </div>
          
          <div className="flex flex-col gap-3 flex-grow">
            {socials.map((social) => (
              <a 
                key={social.name}
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-[#111] border border-white/5 hover:border-red-500/40 rounded-sm active:scale-[0.98] transition-all duration-300 group flex-1"
              >
                <div className="flex items-center gap-4">
                  <div className="text-neutral-500 group-hover:text-red-400 transition-colors duration-300">
                    {social.icon}
                  </div>
                  <div>
                    <div className="text-xs font-black text-white uppercase tracking-widest mb-0.5 group-hover:text-red-400 transition-colors">
                      {social.name}
                    </div>
                    <div className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">
                      {social.handle}
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-neutral-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-full lg:col-span-2">
          <div className="flex items-center gap-2 mb-5 shrink-0">
            <MapPin size={14} className="text-red-500" />
            <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Headquarters</h3>
          </div>
          
          <div className="w-full flex-grow min-h-[350px] md:min-h-full bg-[#111] rounded-sm border border-white/10 p-1.5 shadow-xl relative overflow-hidden transform-gpu flex flex-col">
            <div className="w-full flex-grow bg-[#0a0a0a] rounded-sm overflow-hidden relative pointer-events-none select-none">
              
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=101.74%2C2.95%2C101.84%2C3.03&layer=mapnik&marker=2.9935%2C101.7892"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                title="HQ Location Map"
                tabIndex="-1"
              ></iframe>

            </div>
            
            <div className="absolute top-4 left-4 bg-black/90 border border-white/10 px-3 py-1.5 rounded-sm flex items-center gap-2 shadow-lg pointer-events-none z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">Kajang, Selangor</span>
            </div>
          </div>
        </div>

      </div>

      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
        <Wrench size={16} className="text-red-500" />
        <h3 className="text-sm font-black text-white uppercase tracking-widest">Resources & Utilities</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-[#111] border border-white/10 rounded-sm p-4 flex flex-col group hover:border-white/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white">
              <Shield size={14} className="text-red-500" />
              <span className="text-xs font-black uppercase tracking-widest">Phase 1: Security Override</span>
            </div>
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">02:15</span>
          </div>
          
          <a href="https://www.youtube.com/watch?v=j0U4SqUWtpk" target="_blank" rel="noopener noreferrer" className="relative w-full aspect-video bg-[#0a0a0a] rounded-sm overflow-hidden mb-4 border border-white/5 active:scale-[0.99] transition-transform">
            <img 
              src="https://i.ytimg.com/vi/llxYDN-gV9o/maxresdefault.jpg" 
              alt="Disable Defender Tutorial" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300">
                <PlayCircle size={32} className="text-white ml-1" />
              </div>
            </div>
          </a>
          
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Disable Windows Defender</h4>
            <p className="text-[10px] font-bold text-neutral-400 leading-relaxed">How to temporarily disable real-time protection to prevent false-positive deletions during game extraction.</p>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-sm p-4 flex flex-col group hover:border-white/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white">
              <Folder size={14} className="text-red-500" />
              <span className="text-xs font-black uppercase tracking-widest">Phase 2: Whitelist & Setup</span>
            </div>
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">03:45</span>
          </div>
          
          <a href="https://www.youtube.com/watch?v=QSAzwPc1GSA" target="_blank" rel="noopener noreferrer" className="relative w-full aspect-video bg-[#0a0a0a] rounded-sm overflow-hidden mb-4 border border-white/5 active:scale-[0.99] transition-transform">
            <img 
              src="https://i.ytimg.com/vi/KCoQyKsZVPg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDcnQYWWqZDN64Us4p9qucUzNTWLg" 
              alt="Folder Exclusions Tutorial" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300">
                <PlayCircle size={32} className="text-white ml-1" />
              </div>
            </div>
          </a>
          
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Folder Exclusions</h4>
            <p className="text-[10px] font-bold text-neutral-400 leading-relaxed">Step-by-step guide to adding folder exclusions.</p>
          </div>
        </div>
        
        <div className="bg-[#111] border border-white/10 rounded-sm p-4 flex flex-col group hover:border-white/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white">
              <Video size={14} className="text-red-500" />
              <span className="text-xs font-black uppercase tracking-widest">Phase 3: Initialization</span>
            </div>
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">04:20</span>
          </div>
          
          <a href="https://www.youtube.com/watch?v=ytbw7q2Rqdw" target="_blank" rel="noopener noreferrer" className="relative w-full aspect-video bg-[#0a0a0a] rounded-sm overflow-hidden mb-4 border border-white/5 active:scale-[0.99] transition-transform">
            <img 
              src="https://i.ytimg.com/vi/8PGkqi0FgvY/maxresdefault.jpg" 
              alt="Installation Tutorial" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300">
                <PlayCircle size={32} className="text-white ml-1" />
              </div>
            </div>
          </a>
          
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Install Redistributable</h4>
            <p className="text-[10px] font-bold text-neutral-400 leading-relaxed">Step-by-Step guide on how to installing required DirectX and VC++ packages.</p>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-sm p-4 flex flex-col group hover:border-red-500/40 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white">
              <Terminal size={14} className="text-red-500" />
              <span className="text-xs font-black uppercase tracking-widest">RED_TOOL.exe</span>
            </div>
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">v3.0.1</span>
          </div>

          <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-sm overflow-hidden mb-4 border border-white/5">
            <img 
              src={redToolPreview} 
              alt="RED TOOL Interface Preview" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-3 left-3 flex gap-2">
              <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-sm text-[8px] font-black text-red-400 uppercase tracking-widest backdrop-blur-md">DirectX</span>
              <span className="px-2 py-1 bg-white/10 border border-white/20 rounded-sm text-[8px] font-black text-white uppercase tracking-widest backdrop-blur-md">Visual C++</span>
            </div>
          </div>

          <a href="https://download1334.mediafire.com/5vflxl7l9szgHPRd0fWUy60cZdchhqw8ay1Y1T0n-XnfLdfwDPzQiGm27wG-1KqcPUhwvt3R0B0-Zu_TwWHXI4wpvRCuioks0UM7In_msfq4tHb_jagbrRhA_B3imx5G6Op1ETMiPsmSQAj06-AlpORCygwxZCG-oGU7lm9O-QIg/dyzzzwunvtjllu1/REDTOOL.rar" target="_blank" rel="noopener noreferrer" className="w-full mt-auto py-3 bg-red-600 text-white rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] active:scale-[0.98] transition-all transform-gpu">
              <Download size={14} /> Download RED TOOL (.rar)
          </a>
          
          <div className="mt-4 pt-3 border-t border-white/10">
              <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-2 block">Additional Runtimes Links:</span>
              <div className="flex flex-wrap gap-2">
                <a href="https://www.microsoft.com/en-us/download/details.aspx?id=35" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2 py-1.5 bg-[#222] hover:bg-[#333] border border-white/5 rounded-sm text-[9px] font-black text-neutral-300 uppercase tracking-widest transition-colors">
                  <ExternalLink size={10} /> DirectX Web
                </a>
                <a href="https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2 py-1.5 bg-[#222] hover:bg-[#333] border border-white/5 rounded-sm text-[9px] font-black text-neutral-300 uppercase tracking-widest transition-colors">
                  <ExternalLink size={10} /> VC++ Redist
                </a>
                <a href="https://download1351.mediafire.com/6v3kt9bnpjbgiT9f21CtfZElcROPKj5GYBDxRlxzkDJASykBPiAimfLw0DVmHP54We_aQngyhpkPARmfgsJ1wd5R_DT6OJFb0wdUmenLLNx4u7cJvdYCqJw4H8YM1jNe-4RmXxWbEZxvYMDLNJIv6mAzD6j5dyzl0ijv9nIU4ei2/i1l6ffqnidrw93p/All-in-One-Runtime-Installer-1.2.zip" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2 py-1.5 bg-[#222] hover:bg-[#333] border border-white/5 rounded-sm text-[9px] font-black text-neutral-300 uppercase tracking-widest transition-colors">
                  <ExternalLink size={10} /> All in One 
                </a>
                 <a href="https://download947.mediafire.com/o01vaq8ky4mgjkYRhK0Xw39ymS9qwivjt4kYsn-GMi7RFaBMuUQOp1BjT8hiYnqz37VlUbHFri9Z0N3t3-mpmyex7En_sOHp2UoG7AviqGxlo4BBpG49SC7sKe7KaV5oFxu1jNur7dHaYiQvN-3z2pPfsDhuGYr3LvqFePdMWGgr/fdw14q1c75r4pkh/GFWLClient.msi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2 py-1.5 bg-[#222] hover:bg-[#333] border border-white/5 rounded-sm text-[9px] font-black text-neutral-300 uppercase tracking-widest transition-colors">
                  <ExternalLink size={10} /> GFW
                </a>
                 <a href="https://download1077.mediafire.com/s5eq2f53mh1gHz0IXL1159RnRNE7f91TxOQxdOPQa25RjrU46_m-Z_UPCkXipWm5UdAUIpVMco95R8t265WxDkwHs7uD2xOCeoHfjB9AwKCzA0eBDH0_f4IJc1M6hTleNEY85TPAuMqt4irW61OeCe7q1YmfxViOMpGHztHy9VWJ/k5jqld908tsyhok/TikirRedistInstaller.rar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2 py-1.5 bg-[#222] hover:bg-[#333] border border-white/5 rounded-sm text-[9px] font-black text-neutral-300 uppercase tracking-widest transition-colors">
                  <ExternalLink size={10} /> TikirRedistInstaller
                </a>
              </div>
            </div>
        </div>

      </div>

    </div>
  )
}