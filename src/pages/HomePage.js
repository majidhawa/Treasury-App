// src/pages/HomePage.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TransferModal from '../components/TransferModal';
import AccountCard from '../components/AccountCard';
import TransactionsTable from '../components/TransactionsTable';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleTransfer = (data) => {
    setTransactions((prev) => [...prev, data]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onTransferClick={() => setShowModal(true)} />

      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Accounts */}
        <div className="flex-1 overflow-hidden">
          <AccountCard />
        </div>

        {/* Transactions */}
        <div className="flex-1 overflow-hidden mt-4">
          <TransactionsTable transactions={transactions} />
        </div>
      </div>

      {/* Transfer Modal */}
      {showModal && (
        <TransferModal
          onClose={() => setShowModal(false)}
          onSubmit={handleTransfer}
        />
      )}
    </div>
  );
};

export default HomePage;
