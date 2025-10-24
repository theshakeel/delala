"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
function InputField({ type = "text", name, placeholder, onChange, required = false }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      className="
        w-full px-4 py-2.5 
        rounded-md border border-gray-300 
        text-gray-900 placeholder-gray-400 
        focus:outline-none focus:ring-2 
        focus:ring-[var(--delala-green)] focus:border-[var(--delala-green)]
        transition
      "
    />
  );
}

function SocialButton({ text }) {
  return (
    <button
      type="button"
      className="
        w-full border border-gray-300 py-2.5 rounded-md 
        hover:bg-gray-50 transition font-medium text-gray-700
      "
    >
      {text}
    </button>
  );
}

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
  <Dialog
    open={modalOpen}
    onClose={closeModal}
    className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0"
  >
    {/* Backdrop */}
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

    {/* Modal Panel */}
    <Dialog.Panel className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-8 transition-all">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Title */}
      <Dialog.Title className="text-2xl font-semibold text-center text-gray-900 mb-6">
        {modalMode === "login" ? "Sign In" : "Create Account"}
      </Dialog.Title>

      <form onSubmit={handleSubmit} className="space-y-4">
        {modalMode === "register" && (
          <>
            <InputField name="firstName" placeholder="First Name" onChange={handleChange} required />
            <InputField name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <InputField name="phone" placeholder="Phone Number" onChange={handleChange} required />
          </>
        )}

        <InputField type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <InputField type="password" name="password" placeholder="Password" onChange={handleChange} required />

        {modalMode === "register" && (
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              required
              className="rounded border-gray-300 focus:ring-[var(--delala-green)] focus:ring-2"
            />
            <span>
              I agree to{" "}
              <a href="/terms" className="text-[var(--delala-green)] underline">
                terms & conditions
              </a>
            </span>
          </label>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-[var(--delala-green)] text-white py-2.5 rounded-md font-medium shadow-sm hover:bg-green-600 transition disabled:opacity-60"
        >
          {loading ? "Please wait..." : modalMode === "login" ? "Login" : "Register"}
        </button>

        <div className="text-center text-sm text-gray-700">
          {modalMode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => openModal("register")}
                className="text-[var(--delala-green)] underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => openModal("login")}
                className="text-[var(--delala-green)] underline"
              >
                Login
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <SocialButton text="Continue with Google" />
          <SocialButton text="Continue with Facebook" />
        </div>
      </form>
    </Dialog.Panel>
  </Dialog>
);

}
