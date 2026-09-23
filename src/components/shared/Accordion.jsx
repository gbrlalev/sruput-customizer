import { useState } from 'react'

function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-medium"
      >
        {question}
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <p className="text-gray-600 mt-2">{answer}</p>}
    </div>
  )
}

export default Accordion