import React from 'react'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

// Sample feature data with unique IDs
const features = [
    {
        id: 'feature1',
        title: '🤖 Smart Contract-Powered Listings',
        description:
            'Seamlessly create and manage listings with the security of smart contracts for safe and trustless transactions.',
    },
    {
        id: 'feature2',
        title: '🖥️ User-Friendly Interface',
        description:
            'Enjoy an intuitive design for effortless browsing and interaction with digital assets.',
    },
    {
        id: 'feature3',
        title: '🔒 Secure Wallet Integration',
        description:
            'Easily connect your wallet for safe and secure transactions, ensuring your assets are protected.',
    },
    {
        id: 'feature4',
        title: '🌟 Decentralized Rating & Review System',
        description:
            'Share and explore genuine feedback from users to foster trust in the marketplace.',
    },
    {
        id: 'feature5',
        title: '🎨 Support for Various Digital Assets',
        description:
            'Trade a wide range of digital items, including art, collectibles, domains, and more!',
    },
]

const additionalFeatures = [
    {
        id: 'additional1',
        title: '🌍 Global Accessibility',
        description:
            'Connect with users worldwide and trade without geographical barriers.',
    },
    {
        id: 'additional2',
        title: '🔗 Blockchain Transparency',
        description:
            'All transactions are recorded on the blockchain, ensuring complete transparency.',
    },
    {
        id: 'additional3',
        title: '⚡ Fast Transactions',
        description:
            'Enjoy quick transactions without the delays of traditional systems.',
    },
    {
        id: 'additional4',
        title: '🔄 Continuous Development',
        description:
            'Our platform evolves based on user feedback and technological advancements.',
    },
    {
        id: 'additional5',
        title: '💡 Educational Resources',
        description:
            'Access guides and tutorials to help you navigate the digital asset space.',
    },
    {
        id: 'additional6',
        title: '🔒 Enhanced Security',
        description:
            'Your assets are safe with our top-tier security protocols.',
    },
    {
        id: 'additional7',
        title: '📈 Analytics Dashboard',
        description:
            'Monitor your assets and performance with our comprehensive analytics tools.',
    },
    {
        id: 'additional8',
        title: '🎉 Regular Updates',
        description:
            'Stay informed with our regular updates about new features and enhancements.',
    },
    {
        id: 'additional9',
        title: '👩‍💻 24/7 Support',
        description:
            'Get help whenever you need it with our dedicated support team.',
    },
]

const AboutPage = () => {
    return (
        <>
            <section className="min-h-screen w-full bg-gradient-to-b from-[#252550] to-[#1A1A1A] text-white flex flex-col justify-center items-center p-6 overflow-hidden">
                <div className="p-10 rounded-lg shadow-lg max-w-6xl mx-auto mt-12 w-full sm:w-11/12">
                    <motion.h1
                        className="text-4xl sm:text-6xl font-bold mb-6 animate-pulse text-center"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Welcome to DecenTrade
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl mb-8 max-w-4xl text-center font-medium leading-relaxed mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        DecenTrade is a decentralized digital marketplace built
                        on the Ethereum blockchain, empowering users to engage
                        in secure and transparent transactions for digital
                        assets.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {features.map((feature) => (
                            <motion.div
                                key={feature.id} // Use unique ID as key
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
                        {additionalFeatures.map((item) => (
                            <motion.div
                                key={item.id} // Use unique ID as key
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

        </>
    )
}

export default AboutPage
