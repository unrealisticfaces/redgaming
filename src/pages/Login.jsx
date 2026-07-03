import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, AlertTriangle } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/settings')
    } catch (err) {
      setError('Access Denied. Invalid credentials.')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center flex-grow animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-[#141414] border border-white/10 p-8 md:p-10 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]"></div>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
            <ShieldCheck className="text-red-400" size={20} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">System Override</h2>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 text-orange-500 text-[10px] font-black uppercase tracking-widest bg-orange-500/10 p-3 rounded-sm border border-orange-500/30">
            <AlertTriangle size={14} /> {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-neutral-400 mb-3 tracking-widest uppercase">Admin Identifier</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-4 text-xs font-bold text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner" 
              required
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black text-neutral-400 mb-3 tracking-widest uppercase">Passcode</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-4 text-xs font-bold text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-red-600 text-white font-black text-[11px] uppercase tracking-[0.2em] py-4 rounded-sm hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  )
}