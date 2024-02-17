import { BiChevronDown, BiMenu, BiSearch } from "react-icons/bi";
import CustomModal from "../Modal/Modal.Component";
import axios from "axios";
import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;

function NavSm({ defaultLocation }) {
  return (
    <>
      <div className="text-white flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-black">It All Starts Here!</h3>
          <span className="text-gray-400 text-xs flex items-center cursor-pointer hover:text-blue-400">
            {defaultLocation || "Select you..."} <BiChevronDown />
          </span>
        </div>
        <div className="w-8 h-8 text-black">
          <BiSearch className="w-full h-full" />
        </div>
      </div>
    </>
  );
}

function NavMd() {
  return (
    <>
      <div className="w-full flex items-center gap-3 bg-black bg-opacity-40 px-3 py-1 rounded-lg">
        <BiSearch />
        <input
          type="search"
          placeholder="Search Events, Movies, Plays and Sports"
          className="w-full bg-transparent border-none focus:outline-none"
        />
      </div>
    </>
  );
}

function NavLg({ defaultLocation }) {
  const [location, setLocation] = useState(defaultLocation);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apiKey}`
        );

        const city = response.data.results[0]?.components.city; // Extract city name
        setLocation(city || defaultLocation); // Set location to city name or defaultLocation
      } catch (error) {
        console.error("Error getting user location:", error);
        setLocation(defaultLocation);
      }
    };

    getUserLocation();
  }, [defaultLocation]);

  return (
    <>
      <div className="container flex mx-auto px-4 items-center justify-between ">
        <div className="flex items-center w-1/2 gap-3">
          <div className="w-fit h-fit">
            <a href="/">
              <img
                src="https://i.ibb.co/KWrjD4C/logo.png"
                alt="logo"
                className="w-full h-full"
              />
            </a>
          </div>
          <div className="border-2 border-blue-800 rounded-xl p-2 w-full flex items-center gap-3 bg-white px-3 py-1">
            <BiSearch className=" text-red-700"/>
            <input
              type="search"
              className="w-full bg-transparent  focus:outline-none"
              placeholder="Search for movies, events and acitvites"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 m-3">
          <span className="text-black-200 text-base flex items-center cursor-pointer hover:text-red-600 mr-2">
            {location || "Select you..."} <BiChevronDown />
          </span>
          <CustomModal />

          <div className="w-8 h-8 ml-10 text-black">
            <BiMenu className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
}

// Main NavBar Component
const Navbar = ({ defaultLocation }) => {
  return (
    <nav className="bg-white-800 text-black px-4 py-3">
      {/* Mobile Screen Navbar */}
      <div className="md:hidden">
        <NavSm defaultLocation={defaultLocation} />
      </div>
      {/* Medium Screen Size */}
      <div className="hidden md:flex lg:hidden">
        <NavMd />
      </div>
      {/* Large Screen Size */}
      <div className="hidden md:hidden lg:flex">
        <NavLg defaultLocation={defaultLocation} />
      </div>
    </nav>
  );
};

export default Navbar;
