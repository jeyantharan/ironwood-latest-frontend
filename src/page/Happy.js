import React from 'react'
import { withTranslation } from 'react-google-multi-lang';


const Happy = () => {
  return (
    <div className="flex flex-col items-center mb-16 p-4 space-y-6">
      {/* Image */}
      <img
        src="https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg"
        alt="Description of Image"
        className="w-full max-w-screen-md h-auto rounded-lg shadow-lg"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold text-center">
        Your Page Title
      </h1>

      {/* Description */}
      <p className="text-lg text-center max-w-screen-md">
        This is where the description goes. It can be a brief paragraph that provides information about the content of the page.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    <a href="tel:+390342929285" className="hover:underline">CALL</a>
</button>

        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        <a href=''className="hover:underline">GET DIRECTIONS</a>        </button>
      </div>

      {/* Map */}
      <div className="w-full max-w-screen-md h-64 bg-gray-200 rounded-lg shadow-lg">
        {/* Replace with your map component or iframe */}
        <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2705.5459931056566!2d8.020732677021094!3d47.3036711711637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47902497acb88157%3A0xe1d1a6d7dbc53b0e!2sAlte%20Dorfstrasse%204%2C%204813%20Uerkheim%2C%20Switzerland!5e0!3m2!1sen!2slk!4v1717093846251!5m2!1sen!2slk"
            allowFullScreen
          ></iframe>
      </div>
    </div>
  )
}

export default Happy;
