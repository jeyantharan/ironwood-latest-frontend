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
  const [dataA, setDataA] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://ironwood-latest-backend.vercel.app/place/allPlace');
      const responseEle = await axios.get(`https://ironwood-latest-backend.vercel.app/element/header/${lang}`);
      const responseEleEn = await axios.get(`https://ironwood-latest-backend.vercel.app/element/header/En`);

      setDataA(responseEleEn.data);
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

  // Ensure that dataEle and dataA are available before accessing them
  const restaurantSlidesData = separatedData[dataA?.[1]] || [];
  const happySlidesData = separatedData[dataA?.[2]] || [];
  const foodSlidesData = separatedData[dataA?.[3]] || [];

  return (
    <div>
      <HomeHeading />
      <div className='w-full flex-row justify-center bg-gray-100 p-4 mb-14'>
        {dataEle.length > 0 && (
          <>
            <SimpleCarousel title={dataEle[1]} slides={restaurantSlidesData} />
            <SimpleCarousel title={dataEle[2]} slides={happySlidesData} />
            <SimpleCarousel title={dataEle[3]} slides={foodSlidesData} />
          </>
        )}
      </div>
      {error && <div className="text-red-500">{error}</div>} {/* Display error message if any */}
    </div>
  );
};

export default Home;
