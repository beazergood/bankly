import type { Transaction as TransactionType } from "../../../types";
import { Avatar } from "./avatar";

type Props = {
  transaction: TransactionType;
};

export const Transaction = ({ transaction }: Props) => (
  <tr>
    <td>
      <div className="transaction-detail">
        <Avatar name={transaction.description} />
        <div className="transaction-description">
          {transaction.description}
          <div className="transaction-category">{transaction.category}</div>
        </div>
      </div>
    </td>
    <td>
      <div>
        {new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }).format(new Date(transaction.date))}
      </div>
    </td>
    <td className="transaction-amount">
      <div className="amount">
        {new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(transaction.amount.value)}
      </div>
    </td>
  </tr>
);
