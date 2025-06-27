import React, { useState } from 'react';
import accountsData from '../data/accountsData';
import fxRates from '../data/fxRates';

const TransferModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    from: '',
    to: '',
    amount: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { from, to, amount, date } = form;

    if (!from || !to || !amount || !date) {
      alert('Please fill all required fields.');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const fromAccountIndex = accountsData.findIndex(acc => acc.name === from);
    const toAccountIndex = accountsData.findIndex(acc => acc.name === to);

    if (fromAccountIndex === -1 || toAccountIndex === -1) {
      alert('Invalid account selection.');
      return;
    }

    const fromAccount = accountsData[fromAccountIndex];
    const toAccount = accountsData[toAccountIndex];

    if (fromAccount.balance < amountValue) {
      alert(`Insufficient funds in ${fromAccount.name}. Available: ${fromAccount.balance}`);
      return;
    }

    const key = `${fromAccount.currency}_${toAccount.currency}`;
    const rate = fxRates[key];

    if (!rate) {
      alert(`No conversion rate found for ${key}`);
      return;
    }

    const convertedAmount = amountValue * rate;

    // Update balances
    fromAccount.balance -= amountValue;
    toAccount.balance += convertedAmount;

    // Record FX in form note for log
    const conversionNote = fromAccount.currency !== toAccount.currency
      ? `Converted from ${amountValue} ${fromAccount.currency} to ${convertedAmount.toFixed(2)} ${toAccount.currency}`
      : '';

    onSubmit({
      ...form,
      fxRate: rate,
      convertedAmount: convertedAmount.toFixed(2),
      note: form.note
        ? `${form.note} — ${conversionNote}`
        : conversionNote,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">Transfer Funds</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* From Account */}
          <div>
            <label className="block text-sm font-medium">From Account</label>
            <select
              name="from"
              value={form.from}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            >
              <option value="">Select Account</option>
              {accountsData.map((acc) => (
                <option key={acc.id} value={acc.name}>
                  {acc.name} ({acc.currency}) - Balance: {acc.balance}
                </option>
              ))}
            </select>
          </div>

          {/* To Account */}
          <div>
            <label className="block text-sm font-medium">To Account</label>
            <select
              name="to"
              value={form.to}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            >
              <option value="">Select Account</option>
              {accountsData.map((acc) => (
                <option key={acc.id} value={acc.name}>
                  {acc.name} ({acc.currency})
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium">Transfer Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>

          {/* Optional Note */}
          <div>
            <label className="block text-sm font-medium">Note (Optional)</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Reason or remarks"
              rows="3"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferModal;
