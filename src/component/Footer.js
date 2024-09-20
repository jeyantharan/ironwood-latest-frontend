import React, { useState } from "react";
import { withTranslation } from 'react-google-multi-lang';


const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFooter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-slate-600 text-white">
      {/* Always visible line */}
      <div
        className="flex justify-between h-11 items-center px-4 py-2 cursor-pointer"
        onClick={toggleFooter}
      >
        <div className="text-sm font-semibold">Useful Information</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-6 h-6 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 9l-7.5 7.5L4.5 9"
          />
        </svg>
      </div>

      {/* Expandable content */}
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-fit text-center" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2 bg-gray-700 text-orange-200">
          <ul>
            <li>
              <a href="tel:+390342929285" className="hover:underline">
                Hots - (±39) 0342929285
              </a>
            </li>
            <br />
            <li>
              <a
                href="https://www.livigno.eu"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                APT Livigno <br/> https://www.livigno.eu <br/> (±39) 0342977800
              </a>
            </li>
            <br />
            <li>
              Guida alpina <br />
              CONTATTI -
              <a href="tel:+393713892480" className="hover:underline">
                {" "}
                +393713892480
              </a>{" "}
              <br />
              <a
                href="mailto:outventure.livigno@gmail.com"
                className="hover:underline"
              >
                outventure.livigno@gmail.com
              </a>{" "}
              <br />
              <a
                href="https://www.guidealpine.info"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.guidealpine.info
              </a>
            </li>
            <br />
            <li>
              Emergency -{" "}
              <a href="tel:112" className="hover:underline">
                112
              </a>
            </li>
            <br />
            <li>
              Taxi -{" "}
              <a href="tel:+393331645000" className="hover:underline">
                +393331645000
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded"
              onClick={toggleFooter}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
