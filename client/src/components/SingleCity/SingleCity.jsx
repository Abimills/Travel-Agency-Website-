import React, { useState, useEffect } from "react";
import "../../pages/Home/home.css";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import FilterCategory from "../FilterCategory/FilterCategory";
import Loading from "../../components/Templates/Loading/Loading";

const SingleCity = () => {
  const { city } = useParams();
  const [data, setData] = useState();

  const { performFetch, isLoading } = useFetch("/review/sort", (data) => {
    setData(data);
  });
  useEffect(() => {
    performFetch();
  }, []);
  const dbData = data?.result?.filter((trip) => trip.city?.toLowerCase() == city.toLowerCase());
  return (
    <>
      <h1 className="top-destination top-one">Cities</h1>
      <div className="underline"></div>
      <div className="reviewContainer">
        <FilterCategory dbData={dbData} />
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default SingleCity;
