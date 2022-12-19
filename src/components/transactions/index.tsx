import * as Tabs from "@radix-ui/react-tabs";

import { Transaction as TransactionType } from "../../../types";
import "./index.css";
import { Transaction } from "./item";
import { Loading } from '../loading';

const isExpense = (transaction: TransactionType) =>
  transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

type ExpensesProps = {
  transactions: TransactionType[];
  errorText?: string;
  isLoading: boolean;
}

type IncomeProps = {
  transactions: TransactionType[];
}

const Expenses = ({ transactions, errorText, isLoading }: ExpensesProps) => {

  const error = (
    <span data-testid="error-message" className="errorMsg">
      {errorText}
    </span>
  );

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
          {errorText && (
            <tr>
              <td colSpan={3}>
                {error}
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

const Income = ({ transactions }: IncomeProps) => {
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

export const TransactionHistory = ({ transactions, errorText, isLoading }: ExpensesProps) => {
  return (
    <>
      <h1 className="align-left">Transaction history</h1>
      <Tabs.Root defaultValue="expenses" className="flow">
        <Tabs.List className="tabs__list" aria-label="Filter your transactions">
          <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
          <Tabs.Trigger value="income">Income</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="TabsContent" value="expenses">
          <Expenses transactions={transactions} errorText={errorText} isLoading={isLoading} />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="income">
          <Income transactions={transactions} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};
