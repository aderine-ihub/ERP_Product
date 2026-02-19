"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    FileText,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Download,
    Eye
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";


export default function DocumentsPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [ocrResult, setOcrResult] = useState<any>(null);
    const [recentDocuments, setRecentDocuments] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchRecentDocuments = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/ocr/recent");
            if (response.data.success) {
                setRecentDocuments(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch recent documents:", error);
        }
    };

    useEffect(() => {
        fetchRecentDocuments();
    }, []);


    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };


    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.post("http://localhost:5001/api/ocr/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent.total
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                    setUploadProgress(progress);
                },
            });

            if (response.data.success) {
                const data = response.data.data;
                setOcrResult({
                    invoiceNumber: data.documentId || "Unknown",
                    date: data.invoiceDate || "Unknown",
                    vendor: data.seller?.name || "Unknown",
                    total: `₹${data.totalAmount?.toLocaleString() || "0.00"}`,
                    tax: `₹${data.taxBreakdown?.cgst?.toLocaleString() || "0.00"}`,
                    status: "Success",
                    fileUrl: data.fileUrl,
                    raw: data
                });
                fetchRecentDocuments();
            }

        } catch (error) {
            console.error("OCR Upload failed:", error);
            // In a real app, you'd show a toast error here
        } finally {
            setIsUploading(false);
            setUploadProgress(100);
        }
    };


    const resetUpload = () => {
        setSelectedFile(null);
        setUploadProgress(0);
        setOcrResult(null);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">Documents</h2>
                <p className="text-slate-500 text-sm mt-1 font-medium">Upload and manage your invoices with OCR assistance.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Zone */}
                <div className="glass-morphism rounded-none p-8 border border-slate-100 space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-sans">
                        <Upload className="w-5 h-5 text-primary" />
                        Upload Invoice
                    </h3>

                    <div
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-none p-12 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group ${selectedFile ? "border-primary/50 bg-primary/5" : "border-slate-200 hover:border-primary/30 hover:bg-slate-50"
                            }`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            className="hidden"
                            accept="image/*,.pdf"
                        />

                        {selectedFile ? (
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-none bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-primary" />
                                </div>
                                <p className="text-slate-900 font-bold">{selectedFile.name}</p>
                                <p className="text-slate-500 text-xs mt-1 font-medium">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); resetUpload(); }}
                                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-none bg-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                                </div>
                                <p className="text-slate-600 font-bold">Click to upload or drag and drop</p>
                                <p className="text-slate-400 text-xs mt-2 font-medium">Support PNG, JPG, PDF (Max 10MB)</p>
                            </div>
                        )}
                    </div>

                    <button
                        disabled={!selectedFile || isUploading}
                        onClick={handleUpload}
                        className="w-full py-4 bg-primary text-white font-bold rounded-none shadow-xl shadow-primary/20 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing... {uploadProgress}%
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Start Extraction
                            </>
                        )}
                    </button>
                </div>

                {/* OCR Result Preview */}
                <AnimatePresence mode="wait">
                    {ocrResult ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-morphism rounded-none p-8 border border-slate-100 space-y-6"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-sans">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    Extraction Result
                                </h3>
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-md">OCR Verified</span>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: "Invoice Number", value: ocrResult.invoiceNumber },
                                    { label: "Date", value: ocrResult.date },
                                    { label: "Vendor", value: ocrResult.vendor },
                                    { label: "Total Amount", value: ocrResult.total, highlight: true },
                                    { label: "Tax Amount", value: ocrResult.tax },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 rounded-none bg-slate-50 border border-slate-100">
                                        <span className="text-sm text-slate-500 font-bold uppercase tracking-tighter">{item.label}</span>
                                        <span className={`text-sm font-bold ${item.highlight ? "text-primary text-lg" : "text-slate-900"}`}>
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <button
                                    onClick={() => window.open(ocrResult.fileUrl, "_blank")}
                                    className="flex items-center justify-center gap-2 p-3 bg-slate-100 text-slate-600 rounded-none font-bold hover:bg-slate-200 transition-all text-sm"
                                >
                                    <Eye className="w-4 h-4" />
                                    View Original
                                </button>
                                <button
                                    onClick={() => {
                                        const blob = new Blob([JSON.stringify(ocrResult.raw, null, 2)], { type: "application/json" });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = `invoice-${ocrResult.invoiceNumber}.json`;
                                        a.click();
                                    }}
                                    className="flex items-center justify-center gap-2 p-3 bg-slate-100 text-slate-600 rounded-none font-bold hover:bg-slate-200 transition-all text-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    Download JSON
                                </button>
                            </div>

                        </motion.div>
                    ) : (
                        <div className="glass-morphism rounded-none p-8 border border-slate-100 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                            <div className="w-20 h-20 rounded-none border-2 border-dashed border-slate-200 flex items-center justify-center">
                                <FileText className="w-10 h-10 text-slate-300" />
                            </div>
                            <p className="text-slate-400 font-bold italic">Upload an invoice to see OCR-extracted data</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* History Table */}
            <div className="glass-morphism rounded-none overflow-hidden border border-slate-100">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900 font-sans">Recent Processed</h3>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-slate-100 rounded-none text-[10px] font-bold text-slate-500 border border-slate-200">All Files</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-6 border-b border-slate-100">
                                <th className="py-4 px-8">File Name</th>
                                <th className="py-4 px-6 md:table-cell hidden">Vendor</th>
                                <th className="py-4 px-6">Amount</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentDocuments.map((doc, i) => (
                                <tr key={doc.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                                    <td className="py-4 px-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-none bg-blue-50 flex items-center justify-center">
                                                <FileText className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{doc.invoiceNumber || "No Number"}</p>
                                                <p className="text-[10px] text-slate-400 font-bold">{new Date(doc.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 md:table-cell hidden">
                                        <span className="text-sm text-slate-600 font-medium">Purchase Bill</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-bold text-slate-900">₹{doc.totalAmount?.toLocaleString() || "0"}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Completed
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={() => window.open(doc.fileUrl, "_blank")}
                                            className="p-2 text-slate-400 hover:text-primary transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}
