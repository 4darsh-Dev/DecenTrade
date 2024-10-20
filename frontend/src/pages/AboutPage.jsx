import React from 'react'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

const AboutPage = () => {
    return (
        <>
            <section className="min-h-screen bg-gradient-to-b from-[#252550] to-[#1A1A1A] text-white flex flex-col justify-center items-center p-6">
                <div className="glassmorphism-container p-10 rounded-lg shadow-lg max-w-6xl mx-auto mt-12">
                    <motion.h1
                        className="text-6xl font-bold mb-6 animate-pulse text-center"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Welcome to DecenTrade
                    </motion.h1>

                    <motion.p
                        className="text-xl mb-8 max-w-4xl text-center font-medium leading-relaxed"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        DecenTrade is a decentralized digital marketplace built
                        on the Ethereum blockchain, empowering users to engage
                        in secure and transparent transactions for digital
                        assets. 💎✨
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-r from-[#47B7FF] to-[#CA35FF] p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-100 glassmorphism flex flex-col justify-between h-full"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3 className="text-2xl font-bold mb-2">
                                    {feature.icon} {feature.title}
                                </h3>
                                <p className="flex-grow">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto text-center mt-12">
                    <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
                    <motion.p
                        className="text-lg mb-4 leading-relaxed"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        At DecenTrade, we envision a world where digital assets
                        are easily accessible, allowing everyone to participate
                        in the digital economy.
                    </motion.p>

                    <motion.p
                        className="text-lg mb-4 leading-relaxed"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.8 }}
                    >
                        Our mission is to create a secure, transparent, and
                        user-friendly platform for trading various digital
                        assets, empowering creators and collectors alike.
                    </motion.p>
                </div>

                <div className="max-w-5xl mx-auto mt-12">
                    <h2 className="text-4xl font-bold mb-6 text-center">
                        Why Choose Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {additionalFeatures.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-r from-[#9F10B2] to-[#541C82] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-100 glassmorphism"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-2xl font-bold mb-2">
                                    {item.title}
                                </h3>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

// Sample feature data
const features = [
    {
        title: '🤖 Smart Contract-Powered Listings',
        description:
            'Seamlessly create and manage listings with the security of smart contracts for safe and trustless transactions.',
    },
    {
        title: '🖥️ User-Friendly Interface',
        description:
            'Enjoy an intuitive design for effortless browsing and interaction with digital assets.',
    },
    {
        title: '🔒 Secure Wallet Integration',
        description:
            'Easily connect your wallet for safe and secure transactions, ensuring your assets are protected.',
    },
    {
        title: '🌟 Decentralized Rating & Review System',
        description:
            'Share and explore genuine feedback from users to foster trust in the marketplace.',
    },
    {
        title: '🎨 Support for Various Digital Assets',
        description:
            'Trade a wide range of digital items, including art, collectibles, domains, and more!',
    },
]

const additionalFeatures = [
    {
        title: '🌍 Global Accessibility',
        description:
            'Connect with users worldwide and trade without geographical barriers.',
    },
    {
        title: '🔗 Blockchain Transparency',
        description:
            'All transactions are recorded on the blockchain, ensuring complete transparency.',
    },
    {
        title: '⚡ Fast Transactions',
        description:
            'Enjoy quick transactions without the delays of traditional systems.',
    },
    {
        title: '🔄 Continuous Development',
        description:
            'Our platform evolves based on user feedback and technological advancements.',
    },
    {
        title: '💡 Educational Resources',
        description:
            'Access guides and tutorials to help you navigate the digital asset space.',
    },
    {
        title: '🔒 Enhanced Security',
        description:
            'Your assets are safe with our top-tier security protocols.',
    },
    {
        title: '📈 Analytics Dashboard',
        description:
            'Monitor your assets and performance with our comprehensive analytics tools.',
    },
    {
        title: '🎉 Regular Updates',
        description:
            'Stay informed with our regular updates about new features and enhancements.',
    },
    {
        title: '👩‍💻 24/7 Support',
        description:
            'Get help whenever you need it with our dedicated support team.',
    },
]

// Add styles directly to the Tailwind CSS in your project
const glassmorphismStyle = `
    .glassmorphism-container {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
`

export default AboutPage
