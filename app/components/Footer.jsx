"use client";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Dribbble,
  CreditCard,
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram, FaDribbble } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="md:flex md:justify-between md:items-center mb-12">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Subscribe for Latest Offers</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam, aliquid reiciendis! Exercitationem soluta provident non.
            </p>
          </div>
          <div className="md:w-1/2">
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter Your Email Address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
              <button className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 text-emerald-600" />
                <p>
                  1420 West Jalkuri Fatullah, <span className="block">Narayanganj, BD</span>
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-1 text-emerald-600" />
                <p>
                  support@classicads.com <span className="block">info@classicads.com</span>
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-1 text-emerald-600" />
                <p>
                  +8801838288389 <span className="block">+8801941101915</span>
                </p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Store Location", "Orders Tracking", "My Account", "Size Guide", "Faq"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-emerald-600 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              {["About Us", "Delivery System", "Secure Payment", "Contact Us", "Sitemap"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-emerald-600 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Info */}
          <div>
            {/* <a href="#" className="inline-block mb-4">
              <img src="images/logo.png" alt="logo" className="h-10" />
            </a> */}
            <ul className="space-y-2 text-sm">
              <li>
                <h5 className="text-lg font-bold">929,238</h5>
                <p>Registered Users</p>
              </li>
              <li>
                <h5 className="text-lg font-bold">242,789</h5>
                <p>Community Ads</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* Payment Cards */}
         <div className="flex gap-3">
  {["visa.png", "americanexpress.png", "mastercard.png", "paypal.png"].map((img) => (
    <a key={img} href="#">
      <img
        src={`/${img}`}  // <-- add leading slash
        alt={img}
        className="h-8 object-contain"
      />
    </a>
  ))}
</div>


          {/* Language & Currency */}
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1 border border-emerald-600 rounded-md hover:bg-emerald-100 transition-colors">
              <Globe className="w-4 h-4 text-emerald-600" /> English
            </button>
            <button className="flex items-center gap-1 px-3 py-1 border border-emerald-600 rounded-md hover:bg-emerald-100 transition-colors">
              <CreditCard className="w-4 h-4 text-emerald-600" /> USD
            </button>
          </div>

          {/* App Store */}
          {/* <div className="flex gap-2">
            <a href="#"><img src="images/play-store.png" alt="play-store" className="h-8 object-contain" /></a>
            <a href="#"><img src="images/app-store.png" alt="app-store" className="h-8 object-contain" /></a>
          </div> */}
        </div>

        {/* Footer End */}
        <div className="mt-6 border-t border-gray-300 pt-6 flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-600">
         
         <ul className="flex gap-3 mt-3 md:mt-0">
            <li><a href="#"><FaFacebookF className="w-4 h-4 text-emerald-600" /></a></li>
            <li><a href="#"><FaTwitter className="w-4 h-4 text-emerald-600" /></a></li>
            <li><a href="#"><FaLinkedinIn className="w-4 h-4 text-emerald-600" /></a></li>
            <li><a href="#"><FaYoutube className="w-4 h-4 text-emerald-600" /></a></li>
            <li><a href="#"><FaInstagram className="w-4 h-4 text-emerald-600" /></a></li>
            <li><a href="#"><FaDribbble className="w-4 h-4 text-emerald-600" /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
