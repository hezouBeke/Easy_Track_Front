import React from 'react';

function TrackingOrder() {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tracking Order</h3>
        <div className="flex space-x-4">
          <input type="text" placeholder="Search..." className="px-4 py-2 border border-gray-300 rounded-lg"/>
          <button className="text-white bg-blue-600 px-4 py-2 rounded-lg">Filter</button>
          <button className="text-white bg-blue-600 px-4 py-2 rounded-lg">Export</button>
        </div>
      </div>
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Arrival Time</th>
            <th className="px-4 py-3">Weight</th>
            <th className="px-4 py-3">Route</th>
            <th className="px-4 py-3">Fee</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
            <td className="px-4 py-3">#001234ABCD</td>
            <td className="px-4 py-3">Electronic</td>
            <td className="px-4 py-3">7/1/2023</td>
            <td className="px-4 py-3">25kg</td>
            <td className="px-4 py-3">87 Wern Ddu Lane → 15 Vicar Lane</td>
            <td className="px-4 py-3">$1,050</td>
            <td className="px-4 py-3">
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Delivered</span>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default TrackingOrder;
