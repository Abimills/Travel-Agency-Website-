import React, { useState, useContext, useEffect } from "react";
import "./Card.css";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { LoginContext } from "../Context/LoginContext";

const Card = ({ img, title, id, icon, date, description }) => {
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();
  const [favored, setFavored] = useState(false);
  const [newFavoredPlaces, setNewFavoredPlaces] = useState([]);
  const reviewId = id;
  const userId = user && user.userId;

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("user"));
    users && setFavored(users.fav?.includes(id));
  }, [id]);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("user"));
    if (newFavoredPlaces.fav?.length >= 0) {
      users.fav = newFavoredPlaces?.fav;
      localStorage.setItem("user", JSON.stringify(users));
    }
    return users;
  }, [newFavoredPlaces]);

  const handleFavoriteButton = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      navigate("/login");
    }
    if (user) {
      setFavored(!favored);
      const res = await fetch(
        `${process.env.BASE_SERVER_URL}/api/user/me/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewId,
            userId,
          }),
        }
      );
      const result = await res.json();
      setNewFavoredPlaces(result);
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        {favored ? (
          <AiFillHeart
            className="favored-icon "
            onClick={handleFavoriteButton}
          />
        ) : (
          <AiOutlineHeart
            className="favored-icon un-liked-icon"
            onClick={handleFavoriteButton}
          />
        )}
        <img src={img} alt="card-image" />

        <div className="info-box">
          <span className="placeName">
            <ImLocation />

            {title}
          </span>
          <p className="card-indiv-desc">{description}</p>

          <div className="star-header-container">
            <div className="stars">
              <div className="star-icon">{icon}</div>
              <p className="date">{date}</p>
            </div>
          </div>
        </div>
        <Link to={`/detail/${id}`}>
          <button className="explore-btn">Explore Now</button>
        </Link>
      </div>
    </div>
  );
};
Card.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.array,
  subDescription: PropTypes.string,
  userName: PropTypes.string,
  date: PropTypes.string,
};

export default Card;
