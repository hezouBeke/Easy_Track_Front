
import React from 'react';

function OngoingDelivery() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ongoing delivery</h3>
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-900 dark:text-white">#001234ABCD</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">87 Wern Ddu Lane → 15 Vicar Lane</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-900 dark:text-white">#001234ABCD</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">40 Broomfield Place → 44 Helland Bridge</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">On the way</h3>
        <img src="/path-to-map-image.png" alt="Map" className="rounded-lg mt-4"/>
      </div>
    </div>
  );
}

export default OngoingDelivery;
