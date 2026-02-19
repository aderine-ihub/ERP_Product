"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Shield, Zap, FileText, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-black/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Quantum ERP</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow pt-32 px-6">
        <section className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Zap className="w-3 h-3" />
            Next Gen Enterprise Solution
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 font-sans"
          >
            Manage Your Business <br />
            <span className="text-gradient">With Intelligence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg text-slate-600 leading-relaxed font-medium"
          >
            Quantum ERP simplifies your operations with AI-powered OCR, real-time analytics, and a seamless cloud-based ecosystem designed for modern enterprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link href="/register" className="group flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-primary/20">
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#features" className="px-8 py-4 glass text-slate-700 font-semibold rounded-xl hover:bg-black/5 transition-all border border-black/5">
              View Demo
            </Link>
          </motion.div>

          {/* Feature Grid */}
          <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-32 w-full">
            {[
              {
                title: "AI OCR Engine",
                description: "Extract data from invoices and bills instantly with 99.9% accuracy.",
                icon: <FileText className="w-6 h-6 text-blue-600" />
              },
              {
                title: "Real-time Analytics",
                description: "Get deep insights into your business performance with live dashboards.",
                icon: <BarChart3 className="w-6 h-6 text-purple-600" />
              },
              {
                title: "Bank-grade Security",
                description: "Your data is encrypted and protected with enterprise-level security protocols.",
                icon: <Shield className="w-6 h-6 text-emerald-600" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-8 rounded-2xl glass-morphism text-left space-y-4 group hover:border-black/5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-sans">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </section>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-black/5 mt-32 text-center text-slate-500 text-sm">
        © 2026 Quantum ERP Systems. Built for the modern workspace.
      </footer>
    </div>
  );
}
