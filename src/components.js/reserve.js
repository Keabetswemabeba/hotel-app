import React from "react";
import room from "../images/Room.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import {  collection, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import './reserve.css'
import Navigation from "./navigation";

function Reserve() {
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const { bookedRoom } = location.state || {};

  const navigate = useNavigate();

  const getRoomDetails = useCallback(async () => {
    try {
      const querySnapShot = await getDocs(collection(db, "rooms"));
      const data = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        quantity: doc.id === bookedRoom.id ? bookedRoom.quantity : 1,
      }));
      setRooms(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }, [bookedRoom]);

  useEffect(() => {
    getRoomDetails();
  }, [getRoomDetails]);

  const reserveRoom = (roomData) => {
    try {
      navigate("/reserveDetails", {
        state: {
          bookedRoom: roomData,
          title: roomData.title,
          description: roomData.description,
          price: roomData.price,
          
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handDecrement = (index) => {
    const updateRooms = [...rooms];
    if (updateRooms[index].quantity > 1) {
      updateRooms[index].quantity -= 1;
      setRooms(updateRooms);
    }
  };

  const handIncrement = (index) => {
    const updateRooms = [...rooms];
    updateRooms[index].quantity += 1;
    setRooms(updateRooms);
  };

  return (
    <div>
      <Navigation/>
      {bookedRoom ? (
        <div className="booking-box" key={bookedRoom.id}>
          <h4 className="book-head">{bookedRoom.title}</h4>
          <div className="reserve-details">
            <h3>{bookedRoom.description}</h3>
          </div>
          <div className="btns-reserve">
            <button
              className=" btn-reserve"
              onClick={() => reserveRoom(bookedRoom)}
            >
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/reserve"
              >
                Reserve
              </Link>
            </button>
          </div>
          <div className="reserve-booking-time">
            <h5>total</h5>
          </div>
          <div className="reserve-price">
            <h3>R{bookedRoom.price}</h3>
          </div>

          <div className="book-room">
            <img className="booking-pic" alt="book" src={bookedRoom.imageUrl}></img>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Reserve;
