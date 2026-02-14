import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <main className="flex flex-col items-center gap-12 px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Finance Management Suite
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Choose your application
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/papm"
            className="group flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:scale-105 dark:bg-slate-800"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500 text-2xl font-bold text-white">
              P
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              PAPM
            </h2>
            <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
              Profitability and Performance Management
            </p>
          </Link>

          <Link
            href="/erp"
            className="group flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:scale-105 dark:bg-slate-800"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-500 text-2xl font-bold text-white">
              E
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              ERP
            </h2>
            <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
              Enterprise Resource Planning
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
