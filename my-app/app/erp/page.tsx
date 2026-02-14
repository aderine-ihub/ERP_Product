import Link from "next/link";

export default function ERPPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="border-b bg-white px-6 py-4 dark:bg-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            ERP
          </h1>
          <Link
            href="/"
            className="text-sm text-emerald-600 hover:text-emerald-800 dark:text-emerald-400"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
          Enterprise Resource Planning
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Welcome to the ERP dashboard.
        </p>
      </main>
    </div>
  );
}
