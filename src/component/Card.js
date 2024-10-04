import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const lang = sessionStorage.getItem("lang") || 'En'; // Default to 'En' if not set
console.log(lang);


const CardList = ({ title, cards }) => {
  
  console.log(cards);
  
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const responseC = await axios.get(`http://localhost:8080/element/card/${lang}`);
      setData(responseC.data || []); // Ensure data is an array
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lang]);
  
  console.log(data);

  return (
    <div className="mb-10 bg-gray-100">
      <div className="text-4xl text-center font-extrabold text-gray-800 bg-gradient-to-r from-gray-900 bg-clip-text text-transparent p-7 pl-0 relative">
        <div className="absolute inset-0 -z-10"></div>
        {title}
      </div>
      <div className="pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {cards && cards.length > 0 ? (
            cards.map((card) => {
              
              const cardData = card[lang]; // Access the language-specific data

              if (!cardData) {
                return (
                  <div key={card._id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                      <h2 className="text-2xl font-semibold text-gray-800">
                        Information not available for this language.
                      </h2>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={card._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={cardData.Image}
                    alt={cardData.Name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {cardData.Name}
                    </h2>
                    <p className="mt-2 text-gray-600">{card.ShortDescription}</p>
                    <div className="mt-4 text-right">
                      <Link to={`/place/${card._id}`} className="text-blue-500 hover:underline">
                        {data[1] || "Read More"}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600">{data[0] || "Informations not available."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardList;
