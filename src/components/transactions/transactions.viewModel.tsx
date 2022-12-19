import { useState, useEffect } from 'react';

import { Transaction as TransactionType } from "../../../types";
import "./index.css";
import { TransactionHistory } from "./index";

export const TransactionsContainer = () => {

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string>('');

  useEffect(() => {
    async function fetchTransactions() {
      setIsLoading(true);
      fetch("http://localhost:5173/api/transactions")
        .then((res) => {
          if (res.status === 500) throw new Error()
          return res.json()
        })
        .then((data) => setTransactions(data))
        .catch(() => setErrorText('Error fetching data'))
        .finally(() => setIsLoading(false));
    }

    fetchTransactions();
  }, []);

  return (
    <TransactionHistory transactions={transactions} errorText={errorText} isLoading={isLoading} />
  );
};
