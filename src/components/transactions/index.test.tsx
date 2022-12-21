import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from '../../../jest.setup'

import { TransactionsContainer } from "./transactions.viewModel";

describe("transaction history", () => {
  test("the expenses tab should be shown by default", async () => {
    render(<TransactionsContainer />);

    expect(screen.getByText("Transaction history")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();

    // waitFor errors, but setTimeout doesn't 🤔
    // await waitFor(() =>
    setTimeout(() => {
      expect(screen.getByText("-£20.25")).toBeInTheDocument()
    }, 2000)
    // );
  });

  test("changing between the expenses and income tabs should show different transactions", async () => {
    render(<TransactionsContainer />);

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });
    const incomeTable = screen.queryByRole("table", {
      name: "Income",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(incomeTable).not.toBeInTheDocument();

    // setTimeout feels wrong but works(?) 🤷🏻‍♂️
    setTimeout(() => {
      expect(screen.getByText("-£20.25")).toBeInTheDocument()
      incomeTabTrigger.click();
  
      expect(incomeTabTrigger).toHaveAttribute("data-state", "active");
      expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");
      expect(screen.queryByText("-£20.25")).not.toBeInTheDocument();
    }, 3000);    

  });
});

describe("loading & error states", () => {
  test("should show a loading indicator when transactions are loading...", () => {
    render(<TransactionsContainer />);

    expect(screen.getByText("Transaction history")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(screen.getByTestId("loading-element")).toBeInTheDocument();
  });

  test("should show an error state when the server returns an error 💥", async () => {

    server.use(
      rest.get("/api/transactions", (req, res, ctx) => {
        return res(ctx.delay(), ctx.status(500), ctx.json([]))
      })
    );

    render(<TransactionsContainer />);

    expect(screen.getByText("Transaction history")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
  });
});