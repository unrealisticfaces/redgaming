import { MapPin } from 'lucide-react'

export default function Support() {
  const socials = [
    {
      name: "WhatsApp",
      handle: "017-9797 287",
      link: "https://wa.me/60179797287",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      )
    },
    {
      name: "Facebook",
      handle: "Red PC Gaming",
      link: "https://www.facebook.com/share/1D5zLdqBXq/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      )
    },
    {
      name: "TikTok",
      handle: "@red.pcgamingbajet",
      link: "https://www.tiktok.com/@red.pcgamingbajet",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      )
    },
    {
      name: "Shopee",
      handle: "Red Gaming Store",
      link: "https://my.shp.ee/Lz8hFW9K",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      )
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center flex-grow animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="text-center md:text-left mb-8">
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-white tracking-tighter uppercase drop-shadow-md">Direct Channels</h2>
        <p className="text-sm text-neutral-300 font-medium max-w-2xl">
          Need assistance or have a question about a game? Reach out to us directly through any of our secure channels below.
        </p>
      </div>

      {/* Interactive Map Banner */}
      <div className="w-full h-48 md:h-64 bg-[#141414] rounded-sm border border-white/10 mb-10 overflow-hidden relative group shadow-xl">
        <iframe
          src="https://maps.google.com/maps?q=Kajang,%20Selangor,%20Malaysia&t=&z=12&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-auto"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="HQ Location Map"
        ></iframe>
        
        {/* Floating Location Badge */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-sm flex items-center gap-2 z-10 pointer-events-none shadow-lg">
          <MapPin size={14} className="text-red-500" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-sm">HQ: Kajang, Selangor</span>
        </div>
      </div>
      
      {/* Social Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {socials.map((social) => (
          <a 
            key={social.name}
            href={social.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#141414] p-6 rounded-sm border border-white/10 hover:border-red-500/50 hover:shadow-[0_10px_30px_rgba(239,68,68,0.2)] hover:-translate-y-1 transition-all duration-300 group flex items-center gap-6 cursor-pointer"
          >
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-500 border border-red-500/20 flex-shrink-0">
              <div className="text-red-400">
                {social.icon}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-black text-white mb-1.5 tracking-widest uppercase drop-shadow-sm group-hover:text-red-400 transition-colors">
                {social.name}
              </h3>
              <p className="text-xs text-neutral-400 font-medium tracking-wide">
                {social.handle}
              </p>
            </div>
          </a>
        ))}
      </div>

    </div>
  )
}