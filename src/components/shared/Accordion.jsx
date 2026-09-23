import { useState } from 'react'

function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-ink/10 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-medium"
      >
        {question}
        <span className="text-coffee">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <p className="text-ink/60 mt-2">{answer}</p>}
    </div>
  )
}

export default Accordion