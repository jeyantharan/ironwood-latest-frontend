import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleCarousel from '../component/Slide';
import HomeHeading from '../component/HomeHeading';

const Home = () => {
  const lang = sessionStorage.getItem("lang") || 'En'; // Default to 'En' if lang is not set
  const [data, setData] = useState(null);
  const [dataEle, setDataEle] = useState([]);
  const [error, setError] = useState(null);
  const [separatedData, setSeparatedData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get('https://ironwood-backend.vercel.app/place/allPlace');
      const responseEle = await axios.get(`https://ironwood-backend.vercel.app/element/header/${lang}`);

      setDataEle(responseEle.data);

      // Separate the data by type
      const separated = response.data.reduce((acc, item) => {
        const type = item.Type;

        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(item);
        return acc;
      }, {});

      setData(response.data);
      setSeparatedData(separated);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lang]); // Fetch data whenever the language changes

  // Ensure that dataEle has the expected length before accessing it
  const restaurantSlidesData = separatedData.Restaurants || [];
  const happySlidesData = separatedData['Happy-Hours'] || [];
  const foodSlidesData = separatedData['Food-Shops'] || [];
  const rentalSlidesData = separatedData.Rentals || [];
  const spaSlidesData = separatedData.Spa || [];
  const skiliftSlidesData = separatedData.SkiLifts || [];

  return (
    <div>
      <HomeHeading />
      <div className='w-full flex-row justify-center bg-gray-100 p-4 mb-14'>
        {dataEle.length > 0 && (
          <>
            <SimpleCarousel title={dataEle[1]} slides={restaurantSlidesData} />
            <SimpleCarousel title={dataEle[2]} slides={happySlidesData} />
            <SimpleCarousel title={dataEle[3]} slides={foodSlidesData} />
            <SimpleCarousel title={dataEle[4]} slides={rentalSlidesData} />
            <SimpleCarousel title={dataEle[5]} slides={spaSlidesData} />
            <SimpleCarousel title={dataEle[6]} slides={skiliftSlidesData} />
          </>
        )}
      </div>
      {error && <div className="text-red-500">{error}</div>} {/* Display error message if any */}
    </div>
  );
};

export default Home;
