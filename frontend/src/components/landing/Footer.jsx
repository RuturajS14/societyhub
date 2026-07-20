import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="relative bg-[#071426] text-white overflow-hidden"
    >
      {/* Background Blur */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        {/* Top */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Logo */}
          <div>

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">

                <FaBuilding className="text-white text-2xl" />

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  SocietyHub
                </h2>

                <p className="text-gray-400 text-sm">
                  Smart Society Management
                </p>

              </div>

            </div>

            <p className="text-gray-400 leading-8 mt-6">
              SocietyHub provides one modern platform to manage
              residents, maintenance, complaints, visitors,
              notices, billing and security for your society.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>
                <a href="#home" className="hover:text-blue-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#features" className="hover:text-blue-400 transition">
                  Features
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-blue-400 transition">
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Our Services
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>Resident Management</li>
              <li>Complaint Tracking</li>
              <li>Maintenance Billing</li>
              <li>Visitor Management</li>
              <li>Notice Board</li>
              <li>Amenities Booking</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-400">

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <FaPhoneAlt />
                </div>

                <span>+91 98765 43210</span>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <FaEnvelope />
                </div>

                <span>societyhub@gmail.com</span>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>

                <span>Pune, Maharashtra</span>

              </div>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500">
            © 2026 SocietyHub. All Rights Reserved.
          </p>

          <div className="flex gap-4 mt-6 md:mt-0">

            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 transition flex items-center justify-center"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-pink-600 transition flex items-center justify-center"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-sky-500 transition flex items-center justify-center"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FaLinkedinIn />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;