"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowLeft, FileText, Eye, Download, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ApprovalsPage() {
    const [recentDocs, setRecentDocs] = useState<any[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    const fetchRecent = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/ocr/recent");
            if (response.data.success) {
                setRecentDocs(response.data.data);
            }
        } catch (error) {
            console.error("Approvals fetch error:", error);
        }
    };

    useEffect(() => {
        fetchRecent();
    }, []);

    const handleApprove = async (id: string) => {
        // Simulate approval logic
        setRecentDocs(prev => prev.filter(doc => doc.id !== id));
        setSelectedDoc(null);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-none transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">Pending Approvals</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Review and verify extracted data before finalizing.</p>
                </div>
            </div>

            <div className="space-y-4">
                {recentDocs.map((doc, i) => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-morphism rounded-none p-6 border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-none bg-amber-50 flex items-center justify-center text-amber-600">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{doc.invoiceNumber || "INV-NEW"}</h4>
                                <p className="text-xs text-slate-500 font-medium">Extracted on {new Date(doc.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-900">₹{doc.totalAmount?.toLocaleString() || "0"}</p>
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Tax: ₹{doc.gstAmount?.toLocaleString() || "0"}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedDoc(doc)}
                                    className="p-2 text-primary hover:bg-primary/5 rounded-none transition-colors border border-primary/20"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleApprove(doc.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-none font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    Approve
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* View Modal */}
            <AnimatePresence>
                {selectedDoc && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDoc(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-6xl bg-white rounded-none shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh]"
                        >
                            {/* Original File Preview */}
                            <div className="flex-1 bg-slate-100 p-8 flex items-center justify-center overflow-auto border-r border-slate-100">
                                <img src={selectedDoc.fileUrl} alt="Original Invoice" className="max-w-full shadow-lg" />
                            </div>

                            {/* Extracted Data */}
                            <div className="w-full md:w-96 p-8 flex flex-col justify-between">
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-slate-900">Review Data</h3>
                                        <button onClick={() => setSelectedDoc(null)} className="p-2 hover:bg-slate-100 rounded-none transition-colors">
                                            <X className="w-5 h-5 text-slate-500" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-none">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Invoice Number</p>
                                            <p className="text-sm font-bold text-slate-900">{selectedDoc.invoiceNumber || "N/A"}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-none">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                                            <p className="text-sm font-bold text-slate-900">₹{selectedDoc.totalAmount?.toLocaleString() || "0"}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-none">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">OCR Confidence</p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-slate-200 rounded-none overflow-hidden">
                                                    <div className="h-full bg-emerald-500" style={{ width: `${(selectedDoc.aiConfidence || 0) * 100}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-emerald-600">{Math.round((selectedDoc.aiConfidence || 0) * 100)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-8 border-t border-slate-100">
                                    <button
                                        onClick={() => handleApprove(selectedDoc.id)}
                                        className="w-full py-4 bg-emerald-500 text-white font-bold rounded-none shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        Confirm & Approve
                                    </button>
                                    <button
                                        onClick={() => setSelectedDoc(null)}
                                        className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-none hover:bg-slate-200 transition-all"
                                    >
                                        Reject Extraction
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
