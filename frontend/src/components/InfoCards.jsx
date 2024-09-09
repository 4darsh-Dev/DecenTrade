import React from 'react'

const InfoCard = ({ title, description, buttonText }) => (
    <div className="bg-gray-800 rounded-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <button className="bg-purple-500 text-white rounded-full px-4 py-2 hover:bg-purple-600 transition-colors">
            {buttonText}
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
        },
        {
            title: 'Top Creators',
            description:
                'Meet the leading artists and creators in the NFT space, showcasing their latest works.',
            buttonText: 'View Creators',
        },
        {
            title: 'How It Works',
            description:
                'Understand the process of buying, selling, and creating NFTs with our easy-to-follow guide.',
            buttonText: 'Get Started',
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
