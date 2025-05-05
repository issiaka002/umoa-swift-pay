
import React from 'react';
import { Eye } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  type?: string;
  from: string;
  to: string;
  amount: string;
  status: 'Succès' | 'En attente' | 'Échoué' | 'Complété';
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const statusClasses = {
    'Succès': 'status-success',
    'Complété': 'status-success',
    'En attente': 'status-pending',
    'Échoué': 'status-error',
  };

  return (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr className="bg-gray-50">
            <th>ID Transaction</th>
            <th>Date & Heure</th>
            {transactions[0]?.type && <th>Type</th>}
            <th>De / À</th>
            <th>Montant</th>
            <th>Statut</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="font-medium text-primary">{transaction.id}</td>
              <td>{transaction.date}</td>
              {transaction.type && <td>{transaction.type}</td>}
              <td>{transaction.from} → {transaction.to}</td>
              <td className="font-medium">{transaction.amount}</td>
              <td>
                <span className={statusClasses[transaction.status]}>
                  {transaction.status}
                </span>
              </td>
              <td className="text-right">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Eye size={18} className="text-gray-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
