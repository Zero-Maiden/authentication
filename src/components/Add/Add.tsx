"use client";

import React from "react";
import { useState } from "react";

import style from "./style.module.scss";

import { Axios } from "@/api/Axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faBed, faGlobe, faHeading, faMoneyBill, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Add(props) {
  const [modal, setModal] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    room: "",
    price: "",
  });

  function handleChange() {
    setModal(!modal);
    console.log(modal);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel({
      ...newHotel,
      [name]: value,
    });
  };

  // Update handleAddHotel to call the callback function after successful addition
  const handleAddHotel = async () => {
    try {
      await Axios.post("/api/hotel/create", newHotel);
      // Assuming successful addition, call the callback to refetch data in Hotel component
      console.log("New hotel added successfully");

      setNewHotel({
        name: "",
        location: "",
        room: "",
        price: "",
      });

      props.fetchDataAfterAddition(); // Call the callback function passed from Hotel.tsx
    } catch (error) {
      console.error("Error adding new hotel:", error);
    }
  };

  return (
    <div className={style.add}>
      <div className={style.addcontainer} onClick={handleChange}>
        <FontAwesomeIcon icon={faPlus} className={style.addicon} />
      </div>
      {modal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <div className={style.modalContent}>
              <div className={style.header}>
                <div className={style.titleContainer}>
                  <div className={style.title}>Tambah</div>
                </div>
                <div className={style.close} onClick={handleChange}>
                  <FontAwesomeIcon icon={faXmark} className={style.closeicon} />
                </div>
              </div>
              <div className={style.hotelAdd}>
                <div className={style.inputField}>
                  <FontAwesomeIcon icon={faHeading} className={style.icon} />
                  <div className={style.verticalDivider} />
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Nama: Sejahtera"
                    value={newHotel.name}
                    onChange={handleInputChange}
                    name="name"
                  />
                </div>

                <div className={style.inputField}>
                  <FontAwesomeIcon icon={faGlobe} className={style.icon} />
                  <div className={style.verticalDivider} />
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Lokasi: Jerman"
                    value={newHotel.location}
                    onChange={handleInputChange}
                    name="location"
                  />
                </div>

                <div className={style.inputField}>
                  <FontAwesomeIcon icon={faBed} className={style.icon} />
                  <div className={style.verticalDivider} />
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Kamar: GV232"
                    value={newHotel.room}
                    onChange={handleInputChange}
                    name="room"
                  />
                </div>

                <div className={style.inputField}>
                  <FontAwesomeIcon icon={faMoneyBill} className={style.icon} />
                  <div className={style.verticalDivider} />
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Harga: 50000"
                    value={newHotel.price}
                    onChange={handleInputChange}
                    name="price"
                  />
                </div>

                <button
                  type="submit"
                  className={style.button}
                  onClick={(event) => {
                    handleAddHotel(event);
                    handleChange(event);
                  }}
                >
                  <FontAwesomeIcon icon={faAdd} className={style.addicon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
