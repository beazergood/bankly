import { Account as AccountType } from '../../../types/index'
import { AccountItem } from "./item";
import "./index.css";

type Props = {
  accounts: AccountType[]
}

export const Accounts = ({ accounts }: Props) => {
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
