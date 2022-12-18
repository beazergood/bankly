import type { Account } from "../../../types";
import "./index.css";

type Props = {
  account: Account;
};

export const AccountItem = ({ account }: Props) => {
  return (
    <div className="account">
      <div className="total">Total {account.balance.amount.currency}</div>
      <strong>
      {new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: account.balance.amount.currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(account.balance.amount.value)}
        </strong>
    </div>
  );
};
