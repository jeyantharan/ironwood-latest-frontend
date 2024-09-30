import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { withTranslation } from 'react-google-multi-lang';

function Restaurant() {
  const [data, setData] = useState(null);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { _id } = useParams();
  const lang = sessionStorage.getItem("lang") || 'En'; // Default to 'En' if not set
  console.log("Selected language:", lang);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://ironwood-latest-backend.vercel.app/place/${_id}`);
      console.log("API Response:", response.data); // Log the entire response

      if (response.data && response.data[lang]) {
        setData(response.data[lang]);
      } else {
        setError('No data found for the selected language.');
      }
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err); // Log the error
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [_id]);

  useEffect(() => {
    if (data && data.Map) {
      setIsValidUrl(data.Map);
    }
  }, [data]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!data) {
    return <div className="text-center text-gray-600">No data found.</div>;
  }

  return (
    <div className="flex flex-col bg-gray-100 items-center p-4 mb-16 space-y-6">
      {/* Image */}
      <img
        src={data.Image}
        alt="Description of Image"
        className="w-full max-w-screen-md h-auto rounded-lg shadow-lg"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold text-center">
        {data.Name}
      </h1>

      {/* Description */}
      <p className="text-lg text-center max-w-screen-md">
        {data.Description}
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <a href={`tel:${data.Phone}`} className="hover:underline">
            CALL
          </a>
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <a href={data.DirMap} className="hover:underline">GET DIRECTIONS</a>
        </button>
      </div>

      {/* Map */}
      <div className="w-full max-w-screen-md h-64 bg-gray-200 rounded-lg shadow-lg">
        {isValidUrl ? (
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={data.Map}
            allowFullScreen
            onError={() => setIsValidUrl(false)} // Handle iframe load errors
          />
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-600">
            <p>Map could not be loaded. Please check the URL.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Restaurant;
