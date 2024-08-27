import React from 'react';

const DashboardCards = () => {
    const cards = [
        {
            title: "Expéditions en cours",
            value: "6.521",
            change: "+1.3%",
            icon: "🚚",
            changeType: "up"
        },
        {
            title: "Colis",
            value: "10.105",
            change: "-2.1%",
            icon: "📦",
            changeType: "down"
        },
        {
            title: "Revenue",
            value: "$12.167",
            change: "+1.3%",
            icon: "💰",
            changeType: "up"
        },
        {
            title: "Livrés",
            value: "1.840",
            change: "-3.1%",
            icon: "✅",
            changeType: "down"
        }
    ];

    return (
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-28 p-10 fixed top-10 right-1 justify-center">
            {cards.map((card, index) => (
                <div 
                    key={index} 
                    className="p-6 bg-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                >
                    <div className="flex items-end justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
                            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                        </div>
                        <div className="text-3xl">
                            {card.icon}
                        </div>
                    </div>
                    <div className={`mt-2 text-sm ${card.changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {card.changeType === 'up' ? '↑' : '↓'} {card.change}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardCards;

