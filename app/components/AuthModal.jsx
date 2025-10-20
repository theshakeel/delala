"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function AuthModal() {
  const { modalOpen, closeModal, modalMode, login, register, loading, openModal } = useAuth();
  const [form, setForm] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "login") login(form);
    else register(form);
  };

  return (
    <Dialog open={modalOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal Panel */}
      <Dialog.Panel className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <Dialog.Title className="text-lg font-bold mb-4 text-center">
          {modalMode === "login" ? "Sign In" : "Register"}
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="space-y-3">
          {modalMode === "register" && (
            <>
              <input name="firstName" placeholder="First Name" onChange={handleChange} className="input" required />
              <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input" required />
              <input name="phone" placeholder="Phone" onChange={handleChange} className="input" required />
            </>
          )}

          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" required />

          {modalMode === "register" && (
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" required /> I agree to{" "}
              <a href="/terms" className="text-green-600 underline">
                terms & conditions
              </a>
            </label>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[var(--delala-green)] text-white py-2 rounded-md hover:bg-green-600"
          >
            {loading ? "Please wait..." : modalMode === "login" ? "Login" : "Register"}
          </button>

          <div className="text-center text-sm text-gray-600">
            {modalMode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button type="button" onClick={() => openModal("register")} className="text-green-600 underline">
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" onClick={() => openModal("login")} className="text-green-600 underline">
                  Login
                </button>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <button type="button" className="border py-2 rounded-md hover:bg-gray-50">
              Continue with Google
            </button>
            <button type="button" className="border py-2 rounded-md hover:bg-gray-50">
              Continue with Facebook
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}
