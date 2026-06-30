export default function FAQs() {
  const faqs = [
    { q: "How do I download my games?", a: "After purchase, you will receive a secure, direct download link." },
    { q: "Do these games require an internet connection?", a: "No. All games are 100% offline and DRM-free." },
    { q: "What are the system requirements?", a: "System requirements are listed on each individual product page." }
  ]

  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4 text-white">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
            <h3 className="text-lg font-bold text-red-600 mb-2">{faq.q}</h3>
            <p className="text-neutral-300">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}