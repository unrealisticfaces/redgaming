export default function Support() {
  const socials = [
    {
      name: "Facebook",
      handle: "Message us directly",
      link: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      )
    },
    {
      name: "WhatsApp",
      handle: "Fastest response time",
      link: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      )
    },
    {
      name: "Telegram",
      handle: "Secure comms",
      link: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
        </svg>
      )
    },
    {
      name: "Instagram",
      handle: "Updates & Community",
      link: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center flex-grow animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-white tracking-tighter uppercase drop-shadow-md">Direct Channels</h2>
        <p className="text-sm text-neutral-300 font-medium">
          Need assistance or have a question about a game? Reach out to us directly through any of our secure channels below.
        </p>
      </div>
      
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