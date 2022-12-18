import { useState, useEffect } from 'react';
import * as Tabs from "@radix-ui/react-tabs";

import { Transaction as TransactionType } from "../../../types";
import { transactions } from "../../api/data/transactions";
import "./index.css";
import { Transaction } from "./item";
import { Loading } from '../loading';

const isExpense = (transaction: TransactionType) =>
  transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

const Expenses = () => {

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      setIsLoading(true);
      fetch("http://localhost:5173/api/transactions")
        .then((res) => {
          if (res.status === 500) throw new Error()
          return res.json()
        })
        .then((data) => setTransactions(data))
        .catch(() => setError('Error fetching data'))
        .finally(() => setIsLoading(false));


    }

    fetchTransactions();
  }, []);

  return (
    <table aria-label="Expenses">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <>
          {isLoading && (
            <tr>
              <td colSpan={3}>
                <Loading />
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={3} >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>
                  {error}
                </span>
              </td>
            </tr>
          )}
          {transactions.filter(isExpense).map((transaction) => (
            <Transaction transaction={transaction} key={transaction.id} />
          ))}
        </>
      </tbody>
    </table>
  );
};

const Income = () => {
  return (
    <table aria-label="Income">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.filter(isIncome).map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

export const TransactionHistory = () => {
  return (
    <>
      <h1 className="align-left">Transaction History</h1>
      <Tabs.Root defaultValue="expenses" className="flow">
        <Tabs.List className="tabs__list" aria-label="Filter your transactions">
          <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
          <Tabs.Trigger value="income">Income</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="TabsContent" value="expenses">
          <Expenses />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="income">
          <Income />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};
