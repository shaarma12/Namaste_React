import React, { useContext, useEffect, useState } from "react";
import Rescard from "./Rescard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { DiscountInfo } from "./Rescard";
import UserContext from "../utils/UserContext";
import GridCards from "./GridCards";
import OfferCorousel from "./OfferCorousel";
import search from "../../images/search.svg";
import { useDispatch, useSelector } from "react-redux";
import PriceBanner from "./PriceBanner";
import { displayAdress } from "../utils/addressSlice";
import ResChain, { DiscountChainInfo } from "./ResChain";

const Body = () => {
  // Using Context
  const { Login, setChanger } = useContext(UserContext);
  const banner = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [rest, setRest] = useState([]);
  const [text, setText] = useState("");
  const [restrauntChains, setRestrauntChains] = useState();
  const [gridImage, setGridImage] = useState(null);
  const [filterlist, setFilterlist] = useState([]);
  useEffect(() => {
    geolocation();
  }, []);

  const geolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchData(latitude, longitude);
      fetchAddressData(latitude, longitude);
    })
  }

  const fetchData = async (latitude, longitude) => {
    const url = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
    const response = await url.json();

    setRest(
      !gridImage?.cards[0]?.card?.card?.header?.title
        ? response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
        : response?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
    );
    setFilterlist(
      !gridImage?.cards[0]?.card?.card?.header?.title
        ? response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
        : response?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
    );
    setRestrauntChains(response?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setGridImage(response?.data);
    // setCorousel(gridImage?.cards[0]?.card?.card?.header?.title="What's on your mind?");
  };

  const fetchAddressData = async (latitude, longitude) => {
    const url = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=65ccf42560a02876303330moh6024eb`);
    const result = await url.json();
    dispatch(displayAdress(result?.address));
  }
  const CorouselChecker = gridImage?.cards[0]?.card?.card?.header?.title;
  // Calling High Order Component
  console.log("Top Restraunt Chains :-", restrauntChains);
  const DiscountBanner = DiscountInfo(Rescard);
  if (rest?.length === 0) return <Shimmer />;
  return (
    <>
      <div className="flex flex-col items-center">
        {banner.length > 0 && <PriceBanner />}
        {/* <input
          className="m-5 mr-48 p-1"
          placeholder="Your Name"
          value={Login}
          onChange={(e) => {
            setChanger(e.target.value);
          }}
        ></input> */}
        <div className="flex my-14 ml-[75rem] items-center mr-[75rem]">
          <input
            className="border-black border-2 rounded-tl-full rounded-bl-full mr-6 p-2 w-[32rem]"
            data-testid="searchInput"
            type="text"
            placeholder="Search for restaurant, cuisine...."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
          <button
            className="p-2 -ml-6 border-y-2 border-r-2 border-black rounded-tr-full rounded-br-full font-medium bg-black text-white"
            onClick={() => {
              const searching = rest.filter((i) => {
                return i.info.name.toLowerCase().includes(text.toLowerCase());
              });
              setFilterlist(searching);
            }}
          >
            <img src={search} alt="search" className="w-[1.8rem] pr-1" />
          </button>
        </div>
        {!CorouselChecker && (
          <div className="flex flex-col w-[75rem]">
            <h2 className="mt-6 text-2xl font-bold text-gray-900 mb-6 ml-3">
              Best offers for you
            </h2>
            <div className="flex overflow-x-scroll scroll-smooth no-scrollbar gap-2 w-[75rem]">
              <div className="flex -ml-[20rem]">
                {gridImage?.cards[0]?.card?.card?.imageGridCards?.info.map(
                  (i) => {
                    return <OfferCorousel key={i?.id} corouselData={i} />;
                  }
                )}
              </div>
            </div>
          </div>
        )}
        {!CorouselChecker ? (
          <div className="flex flex-col w-[75rem] mb-16">
            <h2 className="mt-6 text-2xl font-bold text-gray-900 mb-6 ml-3">
              {gridImage?.cards[1]?.card?.card?.header?.title}
            </h2>
            <div className="flex overflow-x-scroll scroll-smooth no-scrollbar gap-2 w-[75rem]">
              <div className="flex -ml-20">
                {gridImage?.cards[1]?.card?.card?.imageGridCards?.info.map(
                  (i) => {
                    return <GridCards key={i?.id} gridImage={i} />;
                  }
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-[75rem] mb-16">
            <h2 className="mt-6 text-2xl font-bold text-gray-900 mb-6 ml-3">
              {gridImage?.cards[0]?.card?.card?.header?.title}
            </h2>
            <div className="flex overflow-x-scroll scroll-smooth no-scrollbar gap-2 w-[75rem]">
              <div className="flex -ml-20">
                {gridImage?.cards[0]?.card?.card?.imageGridCards?.info.map(
                  (i) => {
                    return <GridCards key={i?.id} gridImage={i} />;
                  }
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col w-[75rem] border-t-2 mb-7 border-b-2 pb-12">
          <h2 className="mt-11 text-2xl font-bold text-gray-900 mb-5">
            Top restaurant chains in Delhi
          </h2>
          <div className="flex rounded-2xl w-[75rem] overflow-x-scroll no-scrollbar">
            {restrauntChains.map((i) => {
              return <Link to={`/restaurant/` + i?.info?.id} key={i?.info?.id}><ResChain restaurant={i} />
              </Link>
            })}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 -ml-2">
            Restaurants with online food delivery in Delhi
          </h2>
          <button
            onClick={() => {
              const change = rest.filter((i) => {
                return i.info.avgRating > 4;
              });
              setFilterlist(change);
            }}
            className="mt-6 py-2 px-4 rounded-3xl font-medium border-[2px] border-[#E2E2E7] hover:scale-y-110 transition-all duration-300 mr-[68rem] -ml-2 drop-shadow-xl"
          >
            Top Rated
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-14">
          {filterlist?.map((i) => {
            return (
              <Link key={i.info.id} to={"/restaurant/" + i.info.id}>
                {i?.info?.aggregatedDiscountInfoV2 === "{}" ? (
                  <Rescard restaurant={i} />
                ) : (
                  <DiscountBanner restaurant={i} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Body;
