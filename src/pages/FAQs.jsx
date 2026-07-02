import { ChevronRight } from 'lucide-react'

export default function FAQs() {
  const faqs = [
    { q: "How do I download my games?", a: "After purchase, you will receive a secure, direct download link immediately in your dashboard." },
    { q: "Are there any DRM restrictions?", a: "No. All games are completely standalone and stripped of any restrictive always-online DRM requirements." },
    { q: "What are the system requirements?", a: "System requirements are rigorously detailed on each individual product page prior to purchase." }
  ]

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col justify-center flex-grow animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl md:text-4xl font-black mb-10 text-white tracking-tighter uppercase text-center md:text-left drop-shadow-md">Support Database</h2>
      
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#141414] p-6 rounded-sm border border-white/10 hover:border-red-500/40 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-[0_5px_20px_rgba(239,68,68,0.15)]">
            <div className="flex items-start gap-4">
              <ChevronRight className="text-red-500 mt-0.5 group-hover:translate-x-1 transition-transform" size={16} />
              <div>
                <h3 className="text-sm font-black text-white mb-2 tracking-wide">{faq.q}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-medium">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}