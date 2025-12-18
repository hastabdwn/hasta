"use client";
import { useState } from "react";

export default function FormContact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("../api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("Message sent successfully 🎉");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("Failed to send message ❌");
            }
        } catch {
            setStatus("An error occurred ❌");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-[#ff4040] dark:border-[#3c3c3c] rounded-lg bg-white dark:bg-[#3c3c3c] dark:text-white"
                        required />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-[#ff4040] dark:border-[#3c3c3c] rounded-lg bg-white dark:bg-[#3c3c3c] dark:text-white"
                        required
                    />
                </div>
                <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#ff4040] dark:border-[#3c3c3c] rounded-lg bg-white dark:bg-[#3c3c3c] dark:text-white"
                    rows={4}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#ff4040] dark:bg-[#3c3c3c] dark:text-white cursor-pointer text-white px-6 py-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Get In Touch"}
                </button>
                {status && <p className="text-center text-sm mt-2">{status}</p>}
            </form >
        </div>
    )
}
