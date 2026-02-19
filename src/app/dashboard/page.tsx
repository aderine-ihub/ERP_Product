"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    FileCheck,
    Clock,
    AlertCircle,
    Plus,
    FileText
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";



const stats = [
    { label: "Total Revenue", value: "₹45,231.89", change: "+20.1%", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Bills Processed", value: "124", change: "+12.5%", icon: FileCheck, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Pending Approval", value: "12", change: "-4.3%", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Overdue Items", value: "3", change: "0%", icon: AlertCircle, color: "text-rose-400", bg: "bg-rose-500/10" },
];

export default function DashboardOverview() {
    const [recentDocs, setRecentDocs] = useState<any[]>([]);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/ocr/recent");
                if (response.data.success) {
                    setRecentDocs(response.data.data);
                }
            } catch (error) {
                console.error("Dashboard fetch error:", error);
            }
        };
        fetchRecent();
    }, []);

    return (
        <div className="space-y-8 pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">Overview</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Summary of your project's financial health.</p>
                </div>
                <Link href="/dashboard/transactions" className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-none hover:bg-blue-700 transition-all shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    Add Transaction
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-6 rounded-none glass-morphism border border-slate-100 hover:border-slate-200 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-none ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : stat.change === '0%' ? 'text-slate-400' : 'text-rose-600'}`}>
                                {stat.change.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : stat.change === '0%' ? null : <TrendingDown className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activities */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 glass-morphism rounded-none p-8 border border-slate-100"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900 font-sans">Recent Documents</h3>
                        <button className="text-sm text-primary hover:underline font-bold">View All</button>
                    </div>
                    <div className="space-y-4">
                        {recentDocs.length > 0 ? recentDocs.map((doc, i) => (
                            <div key={doc.id} className="flex items-center justify-between p-4 rounded-none hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-none bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs uppercase tracking-tighter">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{doc.invoiceNumber || "INV-NEW"}</h4>
                                        <p className="text-xs text-slate-500 font-medium">{new Date(doc.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900">₹{doc.totalAmount?.toLocaleString() || "0"}</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter font-bold">Processed</p>
                                </div>
                            </div>
                        )) : (
                            <div className="p-8 text-center border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2">
                                <FileText className="w-8 h-8 text-slate-300" />
                                <p className="text-sm text-slate-400 font-medium">No documents processed yet.</p>
                            </div>
                        )}
                    </div>

                </motion.div>

                {/* quick Actions/Tools */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="glass-morphism rounded-none p-8 border border-slate-100 h-fit"
                >
                    <h3 className="text-xl font-bold text-slate-900 font-sans mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link href="/dashboard/documents" className="w-full flex items-center gap-3 p-4 bg-primary text-white rounded-none font-bold shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            <Plus className="w-5 h-5" />
                            Scan New Invoice
                        </Link>

                        <Link href="/dashboard/approvals" className="w-full flex items-center gap-3 p-4 bg-slate-50 text-slate-600 rounded-none font-bold border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-all">
                            <FileCheck className="w-5 h-5" />
                            Approve Pending
                        </Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">System Health</h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                    <span className="text-slate-500">OCR Accuracy</span>
                                    <span className="text-emerald-600">99.8%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-none overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-none w-[99.8%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                    <span className="text-slate-500">Storage Used</span>
                                    <span className="text-blue-600">2.4 GB</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-none overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-none w-[65%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
