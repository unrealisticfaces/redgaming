export default function About() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col justify-center flex-grow animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-[#141414] border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]"></div>
        
        <h2 className="text-3xl md:text-4xl font-black mb-8 text-white tracking-tighter uppercase">About Us</h2>
        
        <div className="space-y-6 text-sm text-neutral-300 leading-loose font-medium">
          <p>
            We specialize in curating and distributing high-quality, premium games. Our mission is to provide gamers with seamless, interruption-free experiences that let you focus entirely on the gameplay.
          </p>
          <p>
            Every title in our catalog is rigorously tested for system performance, ensuring optimal framerates, stability, and integrity across a wide spectrum of hardware setups.
          </p>
        </div>
      </div>
    </div>
  )
}