"use client";

import { useEffect, useState } from "react";

import style from "./style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { Axios } from "@/api/Axios";
const HOTEL_READ_URL = "/api/hotel";

export default function Hotel() {
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    Axios.get(HOTEL_READ_URL)
      .then((response) => {
        setHotel(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
      <div className={style.content}>
        <div className={style.add}>
          <FontAwesomeIcon icon={faPlus} className={style.addicon} />
        </div>
        {hotel.map((hotel) => (
          <div className={style.card} key={hotel.id}>
            <div className={style.image}></div>
            <div className={style.information}>
              <div className={style.hoteltitle}>{hotel.name}</div>
              <div className={style.hotellocation}>
                <div className={style.location}>{hotel.location}</div>
                <div className={style.hotelroomprice}>
                  <div className={style.room}>{hotel.room}</div>
                  <div className={style.price}>IDR {hotel.price}/hari</div>
                </div>
              </div>
            </div>
            <div className={style.action}>
              <div className={`${style.button} ${style.update}`}>
                <FontAwesomeIcon icon={faPen} className={style.icon} />
              </div>
              <div className={`${style.button} ${style.delete}`} onClick={() => handleDelete(hotel.id)}>
                <FontAwesomeIcon icon={faTrash} className={style.icon} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
