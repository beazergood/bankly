import { AccountsContainer } from "../../components/accounts/accounts.viewModel";
import { TransactionsContainer } from "../../components/transactions/transactions.viewModel";

export const Home = () => (
  <div className="container">
    <AccountsContainer />
    <TransactionsContainer />
  </div>
);
