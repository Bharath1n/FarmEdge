import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-300 font-serif text-white py-0">
      <div className="container mx-auto flex flex-col items-center">

        <div className="flex gap-6 mt-4 text-serif">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl text-black hover:text-gray-400 hover:-translate-y-1.5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl text-black hover:text-gray-400 hover:-translate-y-1.5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl text-black hover:text-gray-400 hover:-translate-y-1.5" />
          </a>
        </div>

        <p className="mt-4 text-sm text-black">© 2025 Farm Edge | All Rights Reserved🌿</p>
      </div>
    </footer>
  );
};

export default Footer;