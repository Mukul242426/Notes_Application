import React, { useEffect, useState } from "react";
import "../Styling/Notes.css";
import Arrow from "../assets/Arrow.png";

function Notes({ selectedGroup }) {

// localStorage.clear();

  let [text, setText] = useState("");
  let [notes, setNotes] = useState([]);

  useEffect(()=>{
    if(localStorage.getItem(selectedGroup.id))
    {
      setNotes(JSON.parse(localStorage.getItem(selectedGroup.id)));
    }
  },[])

  useEffect(()=>{
    if(notes.length>0)
    {
      localStorage.setItem(selectedGroup.id,JSON.stringify(notes));
    }
  },[notes])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getCurrentTime = () => {
    const date = new Date();
    let hour = date.getHours();
    let minute =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    let meridien = "";
    if (hour > 12) {
      hour = hour % 12;
      meridien = "PM";
    } else {
      meridien = "AM";
    }

    return `${hour}:${minute} ${meridien}`;
  };

  const handleClick = () => {
    if (text.length > 0) {
      const current_date = getCurrentDate();
      const current_time = getCurrentTime();
      const obj = {
        time: current_time,
        date: current_date,
        content: text,
      };
      setNotes([...notes,obj]);
      setText("");
    }
  };

  return (
    <div className={selectedGroup===undefined?'notes hidden':'notes shown'}>
      <div className="notespart-one">
        <div
          className="notes-pic"
          style={{ backgroundColor: selectedGroup.colour }}
        >
          {selectedGroup.iconText}
        </div>
        <div className="notes-title">{selectedGroup.groupName}</div>
      </div>
      <div className="notespart-two">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <div className="first-coloumn">
              <div className="time">{note.time}</div>
              <div className="date">{note.date}</div>
            </div>
            <div className="second-coloumn">{note.content}</div>
          </div>
        ))}
      </div>
      <div className="notespart-three">
        <textarea
          className="text-area"
          placeholder="Enter your text here..........."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <div className="submit-btn" onClick={handleClick}>
          <img src={Arrow} alt="arrow" className="arrow-btn" />
        </div>
      </div>
    </div>
  );
}

export default Notes;
