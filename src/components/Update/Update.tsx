"use client";

import React from "react";
import { useState, useEffect } from "react";

import style from "./style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faGlobe, faHeading, faMoneyBill, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Axios } from "@/api/Axios";

export default function Update({ hotel, fetchDataAfterUpdate }) {
  const [modal, setModal] = useState(false);
  const [updatedHotel, setUpdatedHotel] = useState({
    name: "",
    location: "",
    room: "",
    price: "",
  });

  useEffect(() => {
    if (hotel) {
      setUpdatedHotel({
        name: hotel.name || "",
        location: hotel.location || "",
        room: hotel.room || "",
        price: hotel.price || "",
      });
    }
  }, [hotel]);

  function handleChange() {
    setModal(!modal);
    console.log(modal);
  }

  const handleUpdate = async () => {
    try {
      const updatedData = await Axios.put(`/api/hotel/${hotel.id}/edit`, updatedHotel);
      console.log("Updated Data:", updatedData);

      // Assuming successful update, invoke the callback function to refetch data
      fetchDataAfterUpdate();
    } catch (error) {
      console.error("Error updating hotel data:", error);
    }
  };

  return (
    <div className={style.update}>
      <div className={style.updatecontainer} onClick={handleChange}>
        <FontAwesomeIcon icon={faPen} className={style.updateicon} />
      </div>
      {modal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <div className={style.modalContent}>
              <div className={style.header}>
                <div className={style.titleContainer}>
                  <div className={style.title}>Ubah</div>
                </div>
                <div className={style.close} onClick={handleChange}>
                  <FontAwesomeIcon icon={faXmark} className={style.closeicon} />
                </div>
              </div>
              <div className={style.hotelUpdate}>
                <div className={style.inputField}>
                  <FontAwesomeIcon icon={faHeading} className={style.icon} />
                  <div className={style.verticalDivider} />
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Nama: Sejahtera"
                    value={updatedHotel.name}
                    onChange={(e) => setUpdatedHotel({ ...updatedHotel, name: e.target.value })}
                  />
                </div>

                <div className={style.inputField}>
                  <FontAwesomeIcon icon={faGlobe} className={style.icon} />
                  <div className={style.verticalDivider} />
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Lokasi: Jerman"
                    value={updatedHotel.location}
                    onChange={(e) => setUpdatedHotel({ ...updatedHotel, location: e.target.value })}
                  />
                </div>

                <div className={style.inputField}>
                  <FontAwesomeIcon icon={faBed} className={style.icon} />
                  <div className={style.verticalDivider} />
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Kamar: GV232"
                    value={updatedHotel.room}
                    onChange={(e) => setUpdatedHotel({ ...updatedHotel, room: e.target.value })}
                  />
                </div>

                <div className={style.inputField}>
                  <FontAwesomeIcon icon={faMoneyBill} className={style.icon} />
                  <div className={style.verticalDivider} />
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Harga: 50000"
                    value={updatedHotel.price}
                    onChange={(e) => setUpdatedHotel({ ...updatedHotel, price: e.target.value })}
                  />
                </div>

                <button
                  type="button"
                  className={style.button}
                  onClick={(event) => {
                    handleUpdate(event);
                    handleChange(event);
                  }}
                >
                  <FontAwesomeIcon icon={faPen} className={style.updateicon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
