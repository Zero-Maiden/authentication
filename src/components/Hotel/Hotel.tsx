"use client";

import { useEffect, useState } from "react";

import style from "./style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Axios } from "@/api/Axios";
import Add from "../Add/Add";
import Update from "../Update/Update";
const HOTEL_READ_URL = "/api/hotel";

export default function Hotel() {
  const [hotel, setHotel] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);

  useEffect(() => {
    Axios.get(HOTEL_READ_URL)
      .then((response) => {
        setHotel(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [fetchDataTrigger]);

  const fetchDataAfterAddition = () => {
    setFetchDataTrigger(!fetchDataTrigger);
  };

  const handleAddHotel = async (newHotelData) => {
    try {
      const response = await Axios.post("/api/hotel/create", newHotelData);
      console.log("New hotel added successfully:", response.data);
    } catch (error) {
      console.error("Error adding new hotel:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/api/hotel/${id}`);
      // Assuming successful deletion, update state to remove the deleted hotel
      setHotel((prevHotel) => prevHotel.filter((hotel) => hotel.id !== id));
    } catch (error) {
      console.error("Error hapus hotel.");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Hotel</div>
      <Add handleAddHotel={handleAddHotel} fetchDataAfterAddition={fetchDataAfterAddition} />
      <div className={style.content}>
        {hotel.map((hotelData) => (
          <div className={style.card} key={hotelData.id}>
            <div className={style.image}></div>
            <div className={style.information}>
              <div className={style.hoteltitle}>{hotelData.name}</div>
              <div className={style.hotellocation}>
                <div className={style.location}>{hotelData.location}</div>
                <div className={style.hotelroomprice}>
                  <div className={style.room}>{hotelData.room}</div>
                  <div className={style.price}>IDR {hotelData.price}/hari</div>
                </div>
              </div>
            </div>
            <div className={style.action}>
              <Update hotel={hotelData} />
              <div className={`${style.button} ${style.delete}`} onClick={() => handleDelete(hotelData.id)}>
                <FontAwesomeIcon icon={faTrash} className={style.icon} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
