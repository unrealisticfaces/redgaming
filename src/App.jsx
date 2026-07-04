import { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import logo from './assets/logo.jpg' 
import { Menu, X, ChevronRight, Loader2 } from 'lucide-react'

const Home = lazy(() => import('./pages/Home.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const FAQs = lazy(() => import('./pages/FAQs.jsx'))
const Support = lazy(() => import('./pages/Support.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const AdminSettings = lazy(() => import('./pages/AdminSettings.jsx'))

function App() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Store' },
    { path: '/about', label: 'About' },
    { path: '/faqs', label: 'FAQs' },
    { path: '/support', label: 'Support' }
  ]

  return (
    <div className="min-h-screen text-neutral-200 font-sans selection:bg-red-600 selection:text-white flex flex-col relative overflow-x-hidden">
      
      <div className="fixed inset-0 z-[-5] bg-[#0a0a0a]"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-red-500/15 blur-[120px] animate-pulse z-[-4] pointer-events-none transform-gpu" style={{ animationDuration: '4s' }}></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-red-600/10 blur-[150px] animate-pulse z-[-4] pointer-events-none transform-gpu" style={{ animationDuration: '7s' }}></div>
      <div className="fixed inset-0 z-[-3] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a0a0a]/60 to-[#0a0a0a] pointer-events-none transform-gpu"></div>
      <div className="fixed inset-0 z-[-2] bg-tech-grid opacity-60 pointer-events-none transform-gpu"></div>
      <div className="fixed inset-0 z-[-1] scanlines opacity-40 pointer-events-none mix-blend-overlay transform-gpu"></div>

      <nav className="fixed top-0 left-0 w-full z-40 bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-white/10 shadow-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between relative">
          
          <div className="flex items-center gap-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)] transform-gpu">
                <img 
                  src={logo} 
                  alt="RED GAMING" 
                  className="h-10 w-10 object-cover group-hover:scale-110 transition-transform duration-500 transform-gpu" 
                />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/80 rounded-full transition-colors duration-500"></div>
              </div>
              <span className="text-xl font-black text-white tracking-[0.15em] uppercase hidden sm:block drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                RED<span className="text-red-500">GAMING</span>
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 h-full items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`h-full flex items-center px-6 text-[11px] font-black tracking-[0.25em] transition-colors duration-300 uppercase ${
                    isActive ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="relative py-2">
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] rounded-full transform-gpu"></span>
                    )}
                  </span>
                </Link>
              )
            })}
          </div>

          <button 
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-sm transition-colors focus:outline-none active:scale-95 transform-gpu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      <div 
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 transform-gpu ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        <div 
          className={`absolute top-0 right-0 w-72 h-full bg-[#111111] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-l border-white/10 flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-white font-black tracking-widest uppercase text-sm drop-shadow-md">System Menu</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-400 hover:text-red-500 transition-colors p-2 -mr-2 rounded-full active:scale-95 bg-white/5 border border-white/10 hover:border-red-500/50"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col py-4 flex-grow overflow-y-auto">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group relative px-6 py-5 flex items-center overflow-hidden border-l-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-red-500 bg-white/5' 
                      : 'border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/20 to-transparent -translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-500 ease-out z-0"></div>

                  <div className="relative z-10 flex items-center w-full justify-between">
                    <span className={`text-base font-bold uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white group-active:text-white'
                    }`}>
                      {link.label}
                    </span>
                    
                    <ChevronRight size={18} className={`transition-all duration-500 ease-out transform-gpu ${
                      isActive 
                        ? 'text-red-500 translate-x-0 opacity-100' 
                        : 'text-red-500 -translate-x-4 opacity-0 group-hover:translate-x-0 group-active:translate-x-0 group-hover:opacity-100 group-active:opacity-100'
                    }`} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 pt-32 pb-24 relative flex-grow flex flex-col z-10">
        <Suspense fallback={
          <div className="flex-grow flex flex-col items-center justify-center animate-in fade-in duration-500">
            <Loader2 className="text-red-500 animate-spin mb-4" size={32} />
            <div className="text-[10px] font-black tracking-[0.2em] uppercase text-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
              INITIALIZING SECTOR...
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="w-full border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl py-10 mt-auto z-20 relative transform-gpu">
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