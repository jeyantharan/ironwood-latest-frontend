import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleCarousel from '../component/Slide';
import HomeHeading from '../component/HomeHeading';

const Home = () => {
  const lang = sessionStorage.getItem("lang") || 'En'; // Default to 'En' if lang is not set
  const [dataEle, setDataEle] = useState([]);
  const [error, setError] = useState(null);
  const [separatedData, setSeparatedData] = useState({});
  const [dataA, setDataA] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [d1, setD1] = useState([]);
  const [d2, setD2] = useState([]);
  const [d3, setD3] = useState([]);
  const [d4, setD4] = useState([]);
  const [d5, setD5] = useState([]);
  const [d6, setD6] = useState([]);
  const [d7, setD7] = useState([]);
  const [d8, setD8] = useState([]);

  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get('https://ironwood-latest-backend.vercel.app/place/allPlace');
      const responseEle = await axios.get(`https://ironwood-latest-backend.vercel.app/element/header/${lang}`);
      const responseEleEn = await axios.get('https://ironwood-latest-backend.vercel.app/element/header/En');

      setDataA(responseEleEn.data);
      setDataEle(responseEle.data);
      
      // Separate the data by type
      const separated = response.data.reduce((acc, item) => {
        const type = item.Type;
        if (!type) return acc; // Skip items without a Type
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(item);
        return acc;
      }, {});

      setSeparatedData(separated);
      
      // Set d1 and d2 based on the separated data
      setD1(separated[responseEleEn.data[1]] || []);
      setD2(separated[responseEleEn.data[2]] || []);
      setD3(separated[responseEleEn.data[3]] || []);
      setD4(separated[responseEleEn.data[4]] || []);
      setD5(separated[responseEleEn.data[5]] || []);
      setD6(separated[responseEleEn.data[6]] || []);
      setD7(separated[responseEleEn.data[7]] || []);
      setD8(separated[responseEleEn.data[8]] || []);
      
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err); // Log error
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchData();
  }, [lang]); // Fetch data whenever the language changes

  return (
    <div>
      <HomeHeading />
      {loading ? ( // Conditional rendering based on loading state
        <div>Loading...</div>
      ) : (
        <div className='w-full flex-row justify-center bg-gray-100 p-4 mb-14'>
          {Array.isArray(dataEle) && dataEle.length > 0 && ( // Check if dataEle is an array
            <>
              <SimpleCarousel title={dataEle[1]} slides={d1} />
              <SimpleCarousel title={dataEle[2]} slides={d2} />
              <SimpleCarousel title={dataEle[3]} slides={d3} />
              <SimpleCarousel title={dataEle[4]} slides={d4} />
              <SimpleCarousel title={dataEle[5]} slides={d5} />
              <SimpleCarousel title={dataEle[6]} slides={d6} />
              <SimpleCarousel title={dataEle[7]} slides={d7} />
              <SimpleCarousel title={dataEle[8]} slides={d8} />
              {/* You can uncomment the other SimpleCarousel components when you set the state for d3, d4, etc. */}
            </>
          )}
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>} {/* Display error message if any */}
    </div>
  );
};

export default Home;
