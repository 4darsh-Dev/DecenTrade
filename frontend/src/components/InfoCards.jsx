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
                'Ai diCoxer on mitigx eamth thea ugh-onm etelly, or rafl feciumae ar agirert exprlatte in extus ardum eson.',
            buttonText: 'Coag Nat',
        },
        {
            title: 'Top Creators',
            description:
                'Vm all oixet or xellae clant thea ege. Om aal tan yr xein regnar ens egfent expirelie hilects armolor eson.',
            buttonText: 'Cissa Neft',
        },
        {
            title: 'How It Works',
            description:
                'Vrutleges zon relisio eiam thea eym. Onm etelly, or rafl feciumae ase agirert coexplie in expus ardum eson.',
            buttonText: 'Cuxg Neft',
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
