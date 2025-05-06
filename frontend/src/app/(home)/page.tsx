import MonthlyExpensesTable from "../components/MonthlyExpensesTable";

export default function Home() {
  return (
        <main className="container mt-5">
          <h1 className="text-primary">Welcome to Moneyly</h1>
          <p className="lead">Your 100% free personal finance app.</p>
          <MonthlyExpensesTable></MonthlyExpensesTable>
        </main>
  )
}
