'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--delala-footer)] text-white pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          
          {/* About Section */}
          <div>
            <h4 className="font-semibold mb-3">About us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="hover:underline">About Delala</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact-us" className="hover:underline">Contact us</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">FAQ</Link>
              </li>
              <li>
                <Link href="/safety" className="hover:underline">Safety tips</Link>
              </li>
              <li className="text-gray-300">support@delala.com.et</li>
            </ul>
          </div>

          {/* App Section */}
          <div>
            <h4 className="font-semibold mb-3">Our apps</h4>
            <div className="flex gap-3">
              <Link href="https://play.google.com" target="_blank">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Play Store"
                  className="h-9 hover:opacity-90 transition"
                />
              </Link>
              <Link href="https://www.apple.com/app-store/" target="_blank">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29_logo.svg"
                  alt="App Store"
                  className="h-9 hover:opacity-90 transition"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-4 pb-8 text-sm text-gray-300">
          <div>
            &copy; {new Date().getFullYear()} <span className="font-medium text-white">delala.com.et</span> — All rights reserved.
          </div>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <span>•</span>
            <Link href="/contact-us" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
