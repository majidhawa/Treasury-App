import React, { useState } from 'react';
import accountsData from '../data/accountsData';

const AccountCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 6;

  const indexOfLast = currentPage * accountsPerPage;
  const indexOfFirst = indexOfLast - accountsPerPage;
  const currentAccounts = accountsData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(accountsData.length / accountsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-3">Virtual Accounts</h2>

      {/* Cards */}
      <div className="flex-1 overflow-auto grid grid-cols-2 md:grid-cols-3 gap-3 pr-1">
        {currentAccounts.map((account) => (
          <div
            key={account.id}
            className="border rounded p-2 text-sm shadow hover:shadow-md"
          >
            <h3 className="font-semibold">{account.name}</h3>
            <p className="text-xs text-gray-500">Currency: {account.currency}</p>
            <p className="font-bold mt-1">
              {account.currency} {account.balance.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-2 text-sm">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          &laquo; Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
