import './App.css';
import AppBar from "./component/AppBar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "./component/Footer";
import Home from './page/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Restaurant from './page/Restaurant';
import Happy from './page/Happy';
import Food from './page/Food';
import Rentel from './page/Rentel';
import Spa from './page/Spa';
import Skilift from './page/Skilift';
import Card from './component/Card';
import CustomLanguageSwitcher from './CustomLanguageSwitcher';

function App() {
  const lang = sessionStorage.getItem("lang") || 'En'; // Default to 'En' if not set

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [separatedData, setSeparatedData] = useState({});
  const [dataC, setDataC] = useState([]);
  const [dataA, setDataA] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get('https://ironwood-latest-backend.vercel.app/place/allPlace');
      const response1 = await axios.get(`https://ironwood-latest-backend.vercel.app/element/header/${lang}`);
      const Enonly = await axios.get(`https://ironwood-latest-backend.vercel.app/element/header/En`);
      
      
      setDataC(Enonly.data || []); // Ensure it's an array
      setDataA(response1.data || [])
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

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [lang]); // Add lang as a dependency to fetch new data if language changes
  
  
  // Default to empty array if the type is not present
  const d1 = separatedData[dataC[1]] || [];
  const d2 = separatedData[dataC[2]] || [];  
  const d3 = separatedData[dataC[3]] || [];
  // const rentelData = separatedData.Rentals || [];
  // const spaData = separatedData.Spa || [];
  // const skiliftData = separatedData.SkiLifts || [];
  

  return (
    <Router>
      <AppBar />
      <CustomLanguageSwitcher />

      {error && <div className="text-red-500">{error}</div>} {/* Display error message if any */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Element1" element={<Card title={dataA[1] || "Loading.."} cards={d1} />} />
        <Route path="/Element2" element={<Card title={dataA[2] || "Loading.."} cards={d2} />} />
        <Route path="/Element3" element={<Card title={dataA[3] ||"Loading.."} cards={d3} />} />
        {/* <Route path="/Rentals" element={<Card title={dataC[4] ||"Rentals"} cards={rentelData} />} />
        <Route path="/Spa" element={<Card title={dataC[5] || "Spa"} cards={spaData} />} />
        <Route path="/SkiLifts" element={<Card title={dataC[6] ||"Ski Lifts"} cards={skiliftData} />} /> */}
        <Route path="place/:_id" element={<Restaurant />} />
        <Route path="/Happy" element={<Happy />} />
        <Route path="/Food" element={<Food />} />
        <Route path="/Rentel" element={<Rentel />} />
        <Route path="/Spa-view" element={<Spa />} />
        <Route path="/Skilift" element={<Skilift />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
