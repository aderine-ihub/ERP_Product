import Link from "next/link";

export default function CostAllocationPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="border-b bg-white px-6 py-4 dark:bg-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/papm" className="text-xl font-bold text-slate-900 dark:text-white">
            PAPM
          </Link>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            ← Back to Home
          </Link>
        </div>
        <nav className="mx-auto mt-4 flex max-w-6xl gap-6">
          <Link
            href="/papm/profitability-analysis"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            Profitability Analysis
          </Link>
          <Link
            href="/papm/cost-allocation"
            className="text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            Cost Allocation
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
          Cost Allocation
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Manage cost allocation rules and distribute costs across cost objects.
        </p>
      </main>
    </div>
  );
}
