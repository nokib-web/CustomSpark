import { LucideRocket, LucideZap, LucideShieldCheck, LucideLayers } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20 dark:text-slate-400 dark:ring-slate-100/10">
                Next.js 15 + Tailwind 4 Ready.{" "}
                <a href="#" className="font-semibold text-primary-600 dark:text-primary-400">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              Build your next <span className="text-primary-600">masterpiece</span> with Custom Spark
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              A premium boilerplate initialized with Next.js 15, TypeScript, Tailwind 4, and essential libraries.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all active:scale-95">
                Get started
              </button>
              <button className="text-sm font-semibold leading-6 text-slate-900 dark:text-white flex items-center gap-2">
                Learn more <LucideRocket size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Fast Performance</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Everything you need to ship faster
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                  <LucideZap className="h-5 w-5 flex-none text-primary-600" />
                  Next.js 15
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                  <p className="flex-auto">Experience the latest App Router features and Turbopack speed.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                  <LucideShieldCheck className="h-5 w-5 flex-none text-primary-600" />
                  Auth Ready
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                  <p className="flex-auto">Pre-configured Next-Auth for secure user authentication.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                  <LucideLayers className="h-5 w-5 flex-none text-primary-600" />
                  Type Safe
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                  <p className="flex-auto">Built-in TypeScript and Zod for end-to-end type safety.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                  <LucideShieldCheck className="h-5 w-5 flex-none text-primary-600" />
                  Modern UI
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                  <p className="flex-auto">Stunning aesthetics with Tailwind CSS and glassmorphism.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
