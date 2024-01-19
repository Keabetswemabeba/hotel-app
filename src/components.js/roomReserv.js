import React, { useState, useEffect } from "react";
import main from "../images/mainRoom.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./roomReserv.css";
import Navigation from "./navigation";
import Footer from "./footer";

function RoomReserv() {
  const [ratings, setRatings] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getRoomDetails();
  }, []);

  const handleStarClick = (rating) => {
    setRatings(rating);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getRoomDetails = async () => {
    try {
      const querySnapShot = await getDocs(collection(db, "rooms"));
      const data = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isFavorite: false,
      }));

      const availableRooms = data.filter((room) => room.availability === true);
      const filteredRooms = availableRooms.filter((room) =>
        room.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setRooms(data);
      setAvailableRooms(availableRooms);
      setFilteredRooms(filteredRooms);
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleFavorite = (roomId) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, isFavorite: !room.isFavorite } : room
      )
    );
  };

  const book = (roomData) => {
    navigate("/reserve", { state: { bookedRoom: roomData } });
  };

  return (
    <div>
      <Navigation />
      <div className="room-img-container">
        <img className="room-img" alt="room" src={main} />
      </div>

      <div className="left-text">
        <div className="text-name">
          <span style={{ fontWeight: "bold", fontSize: "35px" }}>
            WELCOME TO
          </span>
          <br />
          <span style={{ fontWeight: "bolder", fontSize: "80px" }}>LUXURY</span>
          <br />
          <span style={{ fontWeight: "bold", fontSize: "30px" }}>HOTELS</span>
          <br />
          <span style={{ fontWeight: "lighter", fontSize: "25px" }}>
            Book your stay and enjoy Luxury
            <br />
            redefined at the most affordable rates
          </span>
        </div>
      </div>

      <div className="facilities">
        <h1>ROOMS AND RATES</h1>
        <p>
          Each of our bright, light-flooded rooms comes with everything you
          could possibly need for a comfortable stay. And yes,
          <br />
          comfort isn't our only objective; we also value good design, sleek
          contemporary furnishing complemented
          <br />
          by the rich tones of nature's palette as visible from our room's
          sea-view windows and terraces
        </p>
      </div>

      <div className=" AppleDew-content">
        <h1>AT COMFORT STAY</h1>
      </div>

      <div className="a">
        <input
          type="text"
          placeholder="Search for rooms..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />

        {rooms.map((data) => (
          <div key={data.id} className="booking-box">
            <div className="book-room">
              <img
                className="booking-pick"
                src={data.imageUrl}
                alt="Room"
              />
            </div>
            <div className="room-details">
              <h4 className="book-head">{data.title}</h4>
              <div className="book-details">
                <h3>{data.description}</h3>
              </div>
              <div className="price">
                <div className="roomk-price">
                  <h3>R{data.price}</h3>
                </div>
                <div className="room-bookingk-time">
                  <h5>/night</h5>
                </div>
              </div>
              <div className="numberReviews">
                <div className="rate">
                  <h4>4.0</h4>
                </div>
                <div className="numberOfReviews">
                  <h6>(7 Reviews)</h6>
                </div>
              </div>
              <div className="favoritek">
                <i
                  className={`fa fa-heart${data.isFavorite ? " active" : ""}`}
                  aria-hidden="true"
                  onClick={() => toggleFavorite(data.id)}
                ></i>
              </div>

              <div className="btns">
                <button onClick={() => book(data)} className="btn-book">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/reserve"
                  >
                    Book
                  </Link>
                </button>
              </div>
              <div className="ratings">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fa fa-star${
                      star <= ratings ? " star-active" : ""
                    }`}
                    onClick={() => handleStarClick(star)}
                    style={{ cursor: "pointer" }}
                  ></i>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <br></br>
      <Footer />
    </div>
  );
}

export default RoomReserv;
