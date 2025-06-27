import React, { useState } from 'react';

const TransactionsTable = ({ transactions }) => {
  const [dateFilter, setDateFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter((txn) => {
    const matchesDate = dateFilter ? txn.date === dateFilter : true;
    const matchesSearch = searchTerm
      ? txn.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.to.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesDate && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Transaction Log</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        <input
          type="text"
          placeholder="Search by account name..."
          className="border px-2 py-1 rounded w-48"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions match the filter.</p>
      ) : (
        <div className="overflow-auto flex-1">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-300 text-gray-800 text-md">
              <tr>
                <th className="px-4 py-3 text-left">From</th>
                <th className="px-4 py-3 text-left">To</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Currency</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-blue-50`}
                >
                  <td className="px-4 py-2">{txn.from}</td>
                  <td className="px-4 py-2">{txn.to}</td>
                  <td className="px-4 py-2 font-medium">{txn.amount}</td>
                  <td className="px-4 py-2">{txn.currency || txn.from.split('_')[1]}</td>
                  <td className="px-4 py-2">{txn.date}</td>
                  <td className="px-4 py-2">{txn.note || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
