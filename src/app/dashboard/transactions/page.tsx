"use client";

import { motion } from "framer-motion";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TransactionsPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-none transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">Add Transaction</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Record a new financial entry manually.</p>
                </div>
            </div>

            <div className="glass-morphism rounded-none p-8 border border-slate-100">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Vendor Name</label>
                            <input type="text" placeholder="e.g. Amazon Web Services" className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                            <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Amount (₹)</label>
                            <input type="number" placeholder="0.00" className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all">
                                <option>Infrastructure</option>
                                <option>Software Subscription</option>
                                <option>Office Supplies</option>
                                <option>Marketing</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                        <textarea rows={3} placeholder="Add any additional notes..." className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>

                    <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-none shadow-xl shadow-primary/20 hover:bg-blue-700 transition-all">
                        Save Transaction
                    </button>
                </form>
            </div>
        </div>
    );
}
