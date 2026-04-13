"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, LogIn } from "lucide-react";

import { login } from "@/lib/auth";

export default function AdminLoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) setError("");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const userData = await login(formData.email, formData.password);

            if (userData) {
                localStorage.setItem("user_data", JSON.stringify(userData.username));

                const returnUrl =
                    sessionStorage.getItem("admin_return_url") || "/admin/dashboard";
                sessionStorage.removeItem("admin_return_url");
                router.replace(returnUrl);
            }
        } catch (error: unknown) {
            console.error("Login error:", error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary/10 to-secondary/10 p-4">
            <div className="w-full max-w-md">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="mb-6 text-center">
                            <div className="avatar mb-4">
                                <div className="h-16 w-16 rounded-full">
                                    <Image
                                        src="/assets/cissa.png"
                                        alt="CISSA Logo"
                                        width={64}
                                        height={64}
                                    />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-base-content">
                                Admin Login
                            </h1>
                            <p className="mt-2 text-sm text-base-content/70">
                                Sign in to access the CISSA admin dashboard
                            </p>
                        </div>

                        {error && (
                            <div className="alert alert-error mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Email Address
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full pl-10"
                                        required
                                        disabled={isLoading}
                                    />
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/50" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Password
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full pl-10 pr-10"
                                        required
                                        disabled={isLoading}
                                    />
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/50" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="mr-2 h-4 w-4" />
                                            Sign In
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-center">
                            <Link href="/" className="btn btn-ghost btn-sm">
                                ← Back to Website
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-base-content/50">
                    <p>
                        © {new Date().getFullYear()} CISSA - Communication and Information
                        Sciences Students&apos; Association
                    </p>
                </div>
            </div>
        </div>
    );
}