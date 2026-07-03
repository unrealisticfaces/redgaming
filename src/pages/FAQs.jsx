import { useState } from 'react'
import { ChevronDown, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "How do I actually get the games?",
      answer: "Use our Store page to build your custom list. Select your desired size, add games to your vault, and click 'Save List'. Send that text file to us via WhatsApp or Facebook. We will then either prepare your physical drive or generate your secure digital download links!"
    },
    {
      question: "Can I just get a download link instead of a hard drive?",
      answer: "Yes! If you already have your own storage and don't want to wait for shipping, we can provide secure, high-speed digital download links for your selected games. Just let us know your preference when you send us your list."
    },
    {
      question: "Are there any online payments on this website?",
      answer: "No. This website acts purely as a 'Vault Configurator' to help you organize your custom build. All transactions and payments are handled securely through our official WhatsApp, our Shopee storefront, or in-person at our Kajang HQ."
    },
    {
      question: "Do I need to be connected to the internet to play?",
      answer: "Absolutely not. Our PC and PS4 archives are strictly DRM-free and fully offline. Once the files are on your system (either via our physical drive or downloaded via our links), you can play them anywhere, anytime."
    },
    {
      question: "Do I supply my own hard drive, or do you provide them?",
      answer: "We offer multiple options! You can purchase a brand new HDD/SSD from us, drop off your own empty drive at our Kajang HQ, or skip the physical drive entirely and opt for our digital download links."
    },
    {
      question: "Do you post/ship physical drives across Malaysia?",
      answer: "Yes! If you choose the physical route, we securely package and ship our custom game drives nationwide. Postage details and tracking will be provided when you finalize your order."
    },
    {
      question: "Are the PS4 games compatible with my console?",
      answer: "The games listed in our PS4 category require a compatible, modified (jailbroken) console to install the PKG files. If you aren't sure what firmware your console is running, drop us a message and we can help you check!"
    }
  ]

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col flex-grow animate-in fade-in duration-700">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-white tracking-tighter uppercase drop-shadow-md">
          System Intel / <span className="text-red-500">FAQs</span>
        </h2>
        <p className="text-xs text-neutral-400 font-medium uppercase tracking-widest">
          Everything you need to know about our custom builds and digital links.
        </p>
      </div>

      <div className="space-y-4 mb-12">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`bg-[#141414] border rounded-sm overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 hover:border-white/20'}`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className={`text-sm font-black uppercase tracking-wide pr-4 ${openIndex === index ? 'text-red-400' : 'text-white'}`}>
                {faq.question}
              </span>
              <ChevronDown 
                size={18} 
                className={`flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'text-red-400 rotate-180' : 'text-neutral-500'}`} 
              />
            </button>
            
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm text-center flex flex-col items-center">
        <MessageSquare size={24} className="text-neutral-600 mb-4" />
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Still need answers?</h3>
        <p className="text-xs text-neutral-400 mb-6">Our comms channel is always open. Reach out to the HQ directly.</p>
        <Link 
          to="/support"
          className="bg-red-600 text-white px-8 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-red-500 transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
        >
          Contact Support
        </Link>
      </div>

    </div>
  )
}