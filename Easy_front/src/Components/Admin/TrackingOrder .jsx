import React from 'react';

const TrackingOrder = () => {
    const orders = [
        {
            id: "#001234ABCD",
            category: "Electronic",
            arrivalTime: "7/1/2023",
            weight: "25kg",
            route: "87 Wern Ddu Lane ➞ 15 Vicar Lane",
            fee: "$1,050",
            status: "Delivered"
        },
        {
            id: "#0023456LKH",
            category: "Furniture",
            arrivalTime: "7/1/2023",
            weight: "50kg",
            route: "40 Broomfield Place ➞ 44 Helland Bridge",
            fee: "$2,200",
            status: "Pending"
        },
        {
            id: "#0023456LKH",
            category: "Clothing",
            arrivalTime: "7/1/2023",
            weight: "50kg",
            route: "11 Walden Road ➞ 39 Grenoble Road",
            fee: "$800",
            status: "Shipping"
        },
    ];

    const getStatusClass = (status) => {
        switch(status) {
            case "Delivered":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Shipping":
                return "bg-blue-100 text-blue-700";
            default:
                return "";
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg relative top-96 right-0 left-64 w-[1420px]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Tracking Order</h2>
                <div className="flex items-center">
                    <input 
                        type="text" 
                        placeholder="Search.." 
                        className="border border-gray-300 rounded-md p-2 mr-4"
                    />
                    <button className="flex items-center text-gray-500 hover:text-gray-700 mr-4">
                        <span className="mr-2">Filter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line></svg>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-gray-700">
                        <span className="mr-2">Exports</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Order ID</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Category</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Arrival Time</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Weight</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Route</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Fee</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 text-sm text-gray-700">{order.id}</td>
                                <td className="py-2 text-sm text-gray-700">{order.category}</td>
                                <td className="py-2 text-sm text-gray-700">{order.arrivalTime}</td>
                                <td className="py-2 text-sm text-gray-700">{order.weight}</td>
                                <td className="py-2 text-sm text-gray-700">{order.route}</td>
                                <td className="py-2 text-sm text-gray-700">{order.fee}</td>
                                <td className="py-2 text-sm">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrackingOrder;
