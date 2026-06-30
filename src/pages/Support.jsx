export default function Support() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4 text-white">Technical Support</h2>
      <form className="space-y-6 bg-neutral-900 p-8 rounded-lg border border-neutral-800">
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
          <input type="email" className="w-full bg-neutral-950 border border-neutral-700 rounded p-3 text-neutral-200 focus:outline-none focus:border-red-600 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">Issue Description</label>
          <textarea rows="5" className="w-full bg-neutral-950 border border-neutral-700 rounded p-3 text-neutral-200 focus:outline-none focus:border-red-600 transition-colors"></textarea>
        </div>
        <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-500 transition-colors">
          Submit Ticket
        </button>
      </form>
    </div>
  )
}