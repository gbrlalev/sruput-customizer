import Accordion from '../components/shared/Accordion'

const faqs = [
  {
    question: 'How long does an order take to prepare?',
    answer: 'Each drink is made fresh once your order is placed, usually within 5-10 minutes.',
  },
  {
    question: 'Can I customize the sweetness and ice level?',
    answer: 'Yes, every drink can be customized by size, sweetness level, ice level, and toppings.',
  },
  {
    question: 'Do you offer delivery?',
    answer: 'Currently orders are confirmed manually after checkout. Delivery details will be shared upon confirmation.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'Payment details are shared with you after your order is placed.',
  },
]

function FAQ() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <div>
        {faqs.map((faq, index) => (
          <Accordion key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  )
}

export default FAQ