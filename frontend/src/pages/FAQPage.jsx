import React,{useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FAQImage from '../assets/FAQs-photo.jpg';

const FAQPage = () => {


    const faqData = [
        {
          question: 'What are smart contract-powered listings?',
          answer: 'Smart contract-powered listings ensure that all transactions are secure, transparent, and trustless, providing peace of mind for buyers and sellers by automating agreements on the blockchain.'
        },
        {
          question: 'How do I connect my wallet for transactions?',
          answer: 'You can easily connect your wallet by clicking the "Connect Wallet" button at the top of the page. Supported wallets include MetaMask and other major web3 wallets.'
        },
        {
          question: 'What digital assets can I trade on this platform?',
          answer: 'Our platform supports a wide range of digital assets including artwork, collectibles, domain names, and more. We are continually adding support for new types of assets.'
        },
        {
          question: 'How secure are transactions on this platform?',
          answer: 'All transactions are secured using blockchain technology and smart contracts, ensuring transparency, immutability, and protection from fraud.'
        },
        {
          question: 'What is the decentralized rating and review system?',
          answer: 'Our rating and review system is powered by the community, allowing users to leave genuine feedback that is stored on the blockchain, ensuring transparency and trust.'
        },
        {
          question: 'Are there any fees for buying or selling digital assets?',
          answer: 'Yes, there may be transaction fees associated with using the platform, including gas fees for blockchain transactions. These fees will be clearly displayed before you proceed with any transaction.'
        },
        {
          question: 'How can I browse available listings?',
          answer: 'Our user-friendly interface allows you to effortlessly browse and search for digital assets. You can filter by category, price, and popularity to find what you’re looking for.'
        },
        {
          question: 'Can I cancel a transaction after it’s been submitted?',
          answer: 'Once a transaction is confirmed on the blockchain, it cannot be reversed or canceled. Please review all details carefully before confirming any purchase or sale.'
        },
        {
          question: 'How do I ensure my account and assets are secure?',
          answer: 'Always use strong passwords and enable two-factor authentication where possible. Ensure your wallet’s private keys are secure and never share them with anyone.'
        },
        {
          question: 'What should I do if I encounter a problem with my listing or transaction?',
          answer: 'If you experience any issues, please contact our support team via the help section. We will assist you in resolving any problems related to your listings or transactions.'
        }
      ];




    return (
      <>
        
        <div className="flex justify-center items-center gap-20 max-w-7xl mx-auto mt-8 p-4">
          <div className="faq-component w-1/2 mr-4">
          <h2 className="text-4xl font-semibold mb-6 text-gray-900">Frequently Asked Questions</h2>
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
          </div>
          
          <div className="w-1/2 ml-4">
          <img src={FAQImage} alt="FAQ illustration" className="w-full h-auto rounded-lg shadow-md" />
          </div>
        </div>
        
        <Footer />
      </>
    )
}

export default FAQPage;




const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => setIsOpen(!isOpen);

  return (
    <div className="border-b border-gray-300 py-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleFAQ}
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <span className="text-gray-500">{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

