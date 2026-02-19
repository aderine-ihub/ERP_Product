"use client";

import { motion } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Users,
    Settings,
    LogOut,
    Bell,
    Search,
    User
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: FileText, label: "Documents", href: "/dashboard/documents" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Users, label: "Vendors", href: "/dashboard/vendors" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleSignOut = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };


    return (
        <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-slate-200 flex flex-col z-20">
                <div className="p-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-none flex items-center justify-center">
                            <LayoutDashboard className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Quantum</span>
                    </Link>
                </div>

                <nav className="flex-grow px-4 space-y-2 mt-4">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-200 group ${isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:text-primary transition-colors text-slate-400"}`} />
                                <span className="font-semibold">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="ml-auto w-1.5 h-1.5 rounded-none bg-white"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-none transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span className="font-semibold">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col overflow-hidden relative">
                {/* Top Navbar */}
                <header className="h-16 glass border-b border-slate-200 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4 flex-grow max-w-xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search transactions, files..."
                                className="w-full bg-slate-100 border border-slate-200 rounded-none py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/50 transition-all placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-none border-2 border-[#f8fafc]" />
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2" />
                        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                            <div className="w-8 h-8 rounded-none bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center p-[1px]">
                                <div className="w-full h-full rounded-none bg-white flex items-center justify-center text-[10px] font-bold text-slate-900">
                                    JD
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-xs font-bold text-slate-900">John Doe</p>
                                <p className="text-[10px] text-slate-500 font-medium tracking-tight">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-grow overflow-y-auto p-8 relative">
                    {children}
                </div>
            </main>
        </div>
    );
}
