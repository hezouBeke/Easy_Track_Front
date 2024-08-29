import React from 'react';

const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff"><path d="M229.41-160.67q-49.41 0-84.08-34.61-34.66-34.61-34.66-84.05H40v-454q0-27 19.83-46.84Q79.67-800 106.67-800h572.66v164.67h110l130.67 174v182h-74q0 49.44-34.59 84.05t-84 34.61q-49.41 0-84.08-34.61-34.66-34.61-34.66-84.05H348q0 49.33-34.59 84-34.59 34.66-84 34.66Zm-.08-66.66q21.67 0 36.84-15.17 15.16-15.17 15.16-36.83 0-21.67-15.16-36.84-15.17-15.16-36.84-15.16-21.66 0-36.83 15.16-15.17 15.17-15.17 36.84 0 21.66 15.17 36.83 15.17 15.17 36.83 15.17ZM106.67-346H132q17-24 41.69-38.33 24.7-14.34 55-14.34Q259-398.67 284-384q25 14.67 42 38h286.67v-387.33h-506V-346Zm620.66 118.67q21.67 0 36.84-15.17 15.16-15.17 15.16-36.83 0-21.67-15.16-36.84-15.17-15.16-36.84-15.16-21.66 0-36.83 15.16-15.17 15.17-15.17 36.84 0 21.66 15.17 36.83 15.17 15.17 36.83 15.17Zm-48-202.67H860L756-568.67h-76.67V-430ZM360-532.67Z"/></svg>
);

const MoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff"><path d="M448.67-195.33h60v-51.34q57.33-7.66 92-38 34.66-30.33 34.66-84 0-48-27.33-81t-97.33-61Q452-533.33 427-551q-25-17.67-25-47.67Q402-628 423.17-645q21.16-17 58.83-17 30.67 0 51.33 14.5Q554-633 566.67-606.67l53.33-24q-15-35-43.5-57t-65.83-25.66V-764h-60v50.67Q400-705 371-673.67q-29 31.34-29 75 0 48.34 29.17 77.34 29.16 29 88.83 52.66 65.67 26.34 90.5 47.34 24.83 21 24.83 52.66 0 32.34-25.5 50.5Q524.33-300 486.67-300q-37 0-65.84-21.5Q392-343 380-382l-56 20q18.67 46.67 48.83 74.17 30.17 27.5 75.84 39.16v53.34ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z"/></svg>
);

const LivresIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff"><path d="M285.33-241.33 60.67-466l47.66-47.33L285.67-336 333-288.67l-47.67 47.34Zm188.67 0L249.33-466l47.34-47.67L474-336.33 852.67-715 900-667.33l-426 426ZM474-430l-47.67-47.33 237.34-237.34 47.66 47.34L474-430Z"/></svg>
);

const DashboardCards = () => {
    const cards = [
        {
            title: "Expéditions en cours",
            value: "6.521",
            change: "+1.3%",
            icon: <TruckIcon />,
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
            icon: <MoneyIcon />,
            changeType: "up"
        },
        {
            title: "Livrés",
            value: "1.840",
            change: "-3.1%",
            icon: <LivresIcon />,
            changeType: "down"
        }
    ];

    return (
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-32 p-10 fixed top-12 right-0 justify-center">
            {cards.map((card, index) => (
                <div 
                    key={index} 
                    className="p-6 bg-blue-500 text-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-gray-00"
                >
                    <div className="flex items-end justify-between">
                        <div>
                            <h3 className="text-lg font-thin">{card.title}</h3>
                            <p className="text-2xl font-thin">{card.value}</p>
                        </div>
                        <div className="text-3xl">
                            {card.icon}
                        </div>
                    </div>
                    <div className={`mt-2 text-sm ${card.changeType === 'up' ? 'text-green-300' : 'text-red-300'}`}>
                        {card.changeType === 'up' ? '↑' : '↓'} {card.change}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardCards;
