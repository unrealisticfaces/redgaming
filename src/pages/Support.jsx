import { MapPin, ChevronRight, MessageSquare } from 'lucide-react'

export default function Support() {
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

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center flex-grow animate-in fade-in duration-700">
      
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
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
          
          <div className="w-full flex-grow min-h-[300px] md:min-h-full bg-[#111] rounded-sm border border-white/10 p-1.5 shadow-xl relative overflow-hidden">
            <div className="w-full h-full bg-[#0a0a0a] rounded-sm overflow-hidden relative">
              
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=101.74%2C2.95%2C101.84%2C3.03&layer=mapnik&marker=2.9935%2C101.7892"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="HQ Location Map"
              ></iframe>

            </div>
            
            <div className="absolute top-4 left-4 bg-black/90 border border-white/10 px-3 py-1.5 rounded-sm flex items-center gap-2 shadow-lg pointer-events-none z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">Kajang, Selangor</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}