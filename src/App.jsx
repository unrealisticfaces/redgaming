import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import About from './pages/About.jsx'
import FAQs from './pages/FAQs.jsx'
import Support from './pages/Support.jsx'
import logo from './assets/logo.jpg' 
import { ShoppingCart, User } from 'lucide-react'

function App() {
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/products', label: 'STORE' },
    { path: '/about', label: 'ABOUT US' },
    { path: '/faqs', label: 'FAQS' },
    { path: '/support', label: 'SUPPORT' }
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#050505] to-[#050505]"></div>

      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center relative">
          
          <Link to="/" className="flex items-center gap-3 group z-10">
            <img 
              src={logo} 
              alt="RED GAMING" 
              className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" 
            />
            <span className="text-xl font-black text-white tracking-widest uppercase hidden sm:block">
              RED<span className="text-red-600">GAMING</span>
            </span>
          </Link>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 h-full items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative h-full flex items-center px-6 text-[12px] font-black tracking-[0.2em] transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 shadow-[0_-2px_15px_rgba(220,38,38,0.6)]"></span>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-6 z-10">
            <button className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-[12px] font-bold tracking-[0.1em]">
              <User size={18} />
              <span className="hidden sm:block mt-0.5">LOGIN</span>
            </button>
            <div className="w-px h-6 bg-neutral-800 hidden sm:block"></div>
            <button className="text-neutral-400 hover:text-white transition-colors relative group">
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                0
              </span>
            </button>
          </div>

        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-12 relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </main>
    </div>
  )
}

export default App