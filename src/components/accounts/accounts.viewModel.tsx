import { useEffect, useState } from 'react';
import { Account as AccountType } from '../../../types/index'
import { AccountItem } from "./item";
import "./index.css";

export const AccountsContainer = () => {

  const [accounts, setAccounts] = useState<AccountType[]>([]);

  useEffect(() => {
    async function fetchAccounts() {
      const response = await fetch("http://localhost:5173/api/accounts");
      const accounts = await response.json();
      setAccounts(accounts);
    }

    fetchAccounts();
  }, []);

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      <div className="accounts">
        {accounts.map((account) => (
          <AccountItem account={account} key={account.account_id} />
        ))}
      </div>
    </>
  );
};
