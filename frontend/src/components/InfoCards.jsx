import React from 'react'
import { ArrowRight, Star } from 'lucide-react'

const Badge = ({ text }) => (
    <span className="bg-purple-600 text-xs font-semibold text-white px-2 py-1 rounded-full">
        {text}
    </span>
)

const InfoCard = ({ title, description, buttonText, badge }) => (
    <div className="bg-gray-800 rounded-lg p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gray-700">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            {badge && <Badge text={badge} />}
        </div>
        <p className="text-gray-400 mb-6">{description}</p>
        <button className="bg-purple-500 text-white rounded-full px-4 py-2 hover:bg-purple-600 transition-colors flex items-center gap-2 group">
            {buttonText}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
    </div>
)

const InfoCards = () => {
    const cards = [
        {
            title: 'Explore NFTs',
            description:
                'Discover and invest in unique digital assets, from art to collectibles, on our platform.',
            buttonText: 'Learn More',
            badge: 'New',
        },
        {
            title: 'Top Creators',
            description:
                'Meet the leading artists and creators in the NFT space, showcasing their latest works.',
            buttonText: 'View Creators',
            badge: 'Popular',
        },
        {
            title: 'How It Works',
            description:
                'Understand the process of buying, selling, and creating NFTs with our easy-to-follow guide.',
            buttonText: 'Get Started',
            badge: 'Guide',
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {cards.map((card, index) => (
                <InfoCard key={index} {...card} />
            ))}
        </div>
    )
}

export default InfoCards
