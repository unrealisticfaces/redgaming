import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import About from './pages/About.jsx'
import FAQs from './pages/FAQs.jsx'
import Support from './pages/Support.jsx'
import Login from './pages/Login.jsx'
import AdminSettings from './pages/AdminSettings.jsx'
import logo from './assets/logo.jpg' 
import { Settings, Menu, X } from 'lucide-react'

function App() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/products', label: 'STORE' },
    { path: '/about', label: 'ABOUT' },
    { path: '/faqs', label: 'FAQS' },
    { path: '/support', label: 'SUPPORT' }
  ]

  return (
    <div className="min-h-screen text-neutral-200 font-sans selection:bg-red-600 selection:text-white flex flex-col relative">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-5] bg-[#0a0a0a]"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-red-500/15 blur-[120px] animate-pulse z-[-4] pointer-events-none" style={{ animationDuration: '4s' }}></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-red-600/10 blur-[150px] animate-pulse z-[-4] pointer-events-none" style={{ animationDuration: '7s' }}></div>
      <div className="fixed inset-0 z-[-3] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a0a0a]/60 to-[#0a0a0a] pointer-events-none"></div>
      <div className="fixed inset-0 z-[-2] bg-tech-grid opacity-60 pointer-events-none"></div>
      <div className="fixed inset-0 z-[-1] scanlines opacity-40 pointer-events-none mix-blend-overlay"></div>

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-white/10 shadow-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between relative z-50">
          
          {/* Logo & Admin Link */}
          <div className="flex items-center gap-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                <img 
                  src={logo} 
                  alt="RED GAMING" 
                  className="h-10 w-10 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/80 rounded-full transition-colors duration-500"></div>
              </div>
              <span className="text-xl font-black text-white tracking-[0.15em] uppercase hidden sm:block drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                RED<span className="text-red-500">GAMING</span>
              </span>
            </Link>
            <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="text-transparent hover:text-neutral-500 transition-colors duration-300">
              <Settings size={14} />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 h-full items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`h-full flex items-center px-6 text-[11px] font-black tracking-[0.25em] transition-colors duration-300 ${
                    isActive ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="relative py-2">
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] rounded-full"></span>
                    )}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-sm transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} className="text-red-500" /> : <Menu size={26} />}
          </button>
        </div>

        {/* SOLID, HIGH-CONTRAST MOBILE DROPDOWN (No Transparency) */}
        <div 
          className={`lg:hidden absolute top-[100%] left-0 w-full bg-[#111111] border-b border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col py-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-8 py-5 text-sm font-black tracking-[0.2em] uppercase border-l-4 transition-all duration-300 ${
                    isActive 
                      ? 'border-red-500 text-white bg-red-500/10' 
                      : 'border-transparent text-neutral-300 hover:text-white hover:bg-[#222222]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Router */}
      <main className="container mx-auto px-6 pt-32 pb-24 relative flex-grow flex flex-col z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </main>

      {/* Desktop Footer */}
      <footer className="w-full border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl py-10 mt-auto z-20 relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="RED GAMING" className="h-8 w-8 rounded-full grayscale opacity-40" />
            <div className="text-[10px] font-black text-neutral-500 tracking-widest uppercase">
              © 2026 RED GAMING. All systems online.
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="https://www.facebook.com/share/1D5zLdqBXq/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-neutral-400 hover:text-red-500 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all hover:-translate-y-1 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://wa.me/60179797287" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-neutral-400 hover:text-red-500 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all hover:-translate-y-1 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
            <a href="https://tiktok.com/@red.pcgamingbajet" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-neutral-400 hover:text-red-500 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all hover:-translate-y-1 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a href="https://my.shp.ee/Lz8hFW9K" target="_blank" rel="noopener noreferrer" aria-label="Shopee" className="text-neutral-400 hover:text-red-500 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all hover:-translate-y-1 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App