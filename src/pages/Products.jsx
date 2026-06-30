import { useState } from 'react'
import { ShoppingCart, Image as ImageIcon, Search } from 'lucide-react'

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const games = [
    { id: 1, title: "Tactical Ops", price: "$14.99", category: "FPS", image: "bg-neutral-800" },
    { id: 2, title: "Kingdom Fall", price: "$19.99", category: "RPG", image: "bg-neutral-800" },
    { id: 3, title: "Speed Demon", price: "$9.99", category: "Racing", image: "bg-neutral-800" },
    { id: 4, title: "Shadow Stealth", price: "$12.99", category: "Action", image: "bg-neutral-800" },
    { id: 5, title: "Neon Drifter", price: "$8.99", category: "Racing", image: "bg-neutral-800" },
    { id: 6, title: "Wasteland", price: "$24.99", category: "RPG", image: "bg-neutral-800" },
    { id: 7, title: "Strike Force", price: "$11.99", category: "FPS", image: "bg-neutral-800" },
    { id: 8, title: "Cyber Blade", price: "$15.99", category: "Action", image: "bg-neutral-800" },
    { id: 9, title: "Dead Zone", price: "$18.99", category: "FPS", image: "bg-neutral-800" },
    { id: 10, title: "Street Kings", price: "$10.99", category: "Racing", image: "bg-neutral-800" }
  ]

  const categories = ['All', 'FPS', 'RPG', 'Racing', 'Action']

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || game.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-800 pb-6 gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight">STORE</h2>
          <p className="text-neutral-400 mt-1 text-sm">Premium offline titles ready for purchase.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
            <input
              type="text"
              placeholder="Search titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all duration-300 uppercase tracking-wide ${
              activeCategory === category
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-red-600 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredGames.length === 0 ? (
        <div className="text-center py-16 text-neutral-500 font-medium">
          No titles found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredGames.map(game => (
            <div key={game.id} className="bg-neutral-900/60 backdrop-blur-md rounded-xl border border-neutral-800 overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(220,38,38,0.15)] hover:border-red-600/50 transition-all duration-300 group flex flex-col">
              
              <div className={`aspect-[3/4] w-full ${game.image} relative overflow-hidden flex items-center justify-center border-b border-neutral-800`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <ImageIcon size={32} className="text-neutral-700 group-hover:text-red-600/50 transition-colors z-0" />
                <span className="absolute top-2 right-2 z-20 bg-black/80 backdrop-blur-sm px-2 py-1 text-[10px] font-black text-white rounded border border-neutral-700 uppercase tracking-wider shadow-md">
                  {game.category}
                </span>
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-black text-white mb-3 line-clamp-2 leading-snug">{game.title}</h3>
                <div className="mt-auto flex items-center justify-between gap-2">
                  <span className="text-lg font-black text-red-600">{game.price}</span>
                  <button className="flex items-center justify-center gap-1.5 bg-white text-black py-1.5 px-3 rounded hover:bg-red-600 hover:text-white transition-colors duration-300 font-bold text-xs uppercase tracking-wider flex-shrink-0">
                    <ShoppingCart size={14} />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}