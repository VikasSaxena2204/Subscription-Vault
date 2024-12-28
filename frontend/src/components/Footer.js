import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaGlobe } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';

const Footer = () => {
  return (
    <footer className="w-full bg-indigo-900 text-white px-8 py-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between">
      <div className="text-center md:text-left mx-4 mb-4 md:mb-0">
        <p className="text-sm md:text-base">
          💻 Crafted with 💖 by{' '}
          <a
            href="https://github.com/VikasSaxena2204"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 transition duration-300 transform hover:scale-105"
          >
            Vikas Saxena
          </a>{' '}
          🚀
        </p>
        <p className="text-xs md:text-sm">
          © {new Date().getFullYear()} 🌟 All rights reserved.
        </p>
        <p className="text-xs md:text-sm mt-4">
          Get in touch with me for <span className="font-semibold">collaborations, projects, or just a chat!</span> I love connecting with like-minded individuals!
        </p>
      </div>

      <div className="flex items-center gap-8 mt-4 md:mt-0">
        <a
          href="https://wa.me/919315858299"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-green-400 transition duration-300 transform hover:scale-110"
          aria-label="WhatsApp"
        >
          <IoLogoWhatsapp />
        </a>
        <a
          href="mailto:vikassaxena123578@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-red-400 transition duration-300 transform hover:scale-110"
          aria-label="Email"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://www.linkedin.com/in/2204-vikas-saxena/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-blue-500 transition duration-300 transform hover:scale-110"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/VikasSaxena2204"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-gray-500 transition duration-300 transform hover:scale-110"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://my-portfolio-vikas.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-amber-500 transition duration-300 transform hover:scale-110"
          aria-label="Portfolio"
        >
          <FaGlobe />
        </a>
        <a
          href="tel:+919315858299"
          className="text-xl hover:text-teal-400 transition duration-300 transform hover:scale-110"
          aria-label="Call"
        >
          <FaPhoneAlt />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
