import React, { useState } from 'react';



const CustomLanguageSwitcher = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(sessionStorage.getItem('lang') || 'En'); // Default to 'En' if not set

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang) => {
    sessionStorage.setItem('lang', lang);
    setLanguage(lang);
    window.location.reload();
    setIsOpen(false);
  };

  const getButtonClass = (lang) => {
    return language === lang
      ? "w-full text-left px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition duration-200"
      : "w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200";
  };

  return (
    <div className='relative flex justify-end bg-gray-100'>
      <button 
        onClick={toggleDropdown} 
        className="flex items-center text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 shadow-md transition duration-200"
      >
        {language} 
        <span className="ml-2">&#9662;</span> {/* Dropdown arrow */}
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10'>
          <div className='py-1'>
            <button 
              onClick={() => handleLanguageChange('En')} 
              className={getButtonClass('En')}
            >
              English
            </button>
            <button 
              onClick={() => handleLanguageChange('De')} 
              className={getButtonClass('De')}
            >
              German
            </button>
            <button 
              onClick={() => handleLanguageChange('It')} 
              className={getButtonClass('It')}
            >
              Italian
            </button>
            <button 
              onClick={() => handleLanguageChange('Cs')} 
              className={getButtonClass('Cs')}
            >
              Czech
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default CustomLanguageSwitcher;
