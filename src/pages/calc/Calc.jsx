import "../../general.scss";

import Navbar from "../../components/navbar/Navbar";

import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

import CALC from "../../img/calc.jpg";

const Calc = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLectureHall, setSelectedLectureHall] = useState(null);
  const [currentAvailability, setCurrentAvailability] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [unBookingSuccess, setUnbookingSuccess] = useState(false);
  const [CalcLecture, setCalcLecture] = useState([]);

  //connect to the backend

  useEffect(() => {
    const fetchLectureHalls = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/calc/find");

        setCalcLecture(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLectureHalls();
  }, []);

  useEffect(() => {
    const updateAvailability = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentAvailability = CalcLecture.map((lectureHall) => {
        const currentSchedule = lectureHall.schedules.find(
          (schedule) =>
            schedule.startTime <= `${currentHour}:${currentMinute}` &&
            `${currentHour}:${currentMinute}` < schedule.endTime
        );
        return {
          ...lectureHall,
          availability: currentSchedule ? currentSchedule.availability : false,
          currentStartTime: currentSchedule ? currentSchedule.startTime : null,
          currentEndTime: currentSchedule ? currentSchedule.endTime : null,
        };
      });
      setCurrentAvailability(currentAvailability);
    };

    updateAvailability();

    // Update the availability every minute
    const interval = setInterval(updateAvailability, 60000);

    return () => clearInterval(interval);
  }, [CalcLecture]);

  const handleBooking = async (id) => {
    if (!selectedLectureHall) {
      return;
    }

    const selectedSchedule = selectedLectureHall.schedules.find(
      (schedule) =>
        schedule.startTime === startTime && schedule.endTime === endTime
    );

    if (!selectedSchedule) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/calc/book/${id}`,
        {
          lectureHallName: selectedLectureHall.name,
          startTime,
          endTime,
        }
      );

      alert("successfully");
      setBookingSuccess(true);
    } catch (error) {
      alert(`the error is ${error}`);
      const errorMessage = error.response.data.error;
      console.log(errorMessage);
    }
  };
  const handleUnBooking = async (id) => {
    if (!selectedLectureHall) {
      return;
    }

    const selectedSchedule = selectedLectureHall.schedules.find(
      (schedule) =>
        schedule.startTime === startTime && schedule.endTime === endTime
    );

    if (!selectedSchedule) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/calc/unbook/${id}`,
        {
          lectureHallName: selectedLectureHall.name,
          startTime,
          endTime,
        }
      );

      alert("unbooked successfully");
      setBookingSuccess(true);
    } catch (error) {
      alert(`the error is ${error}`);
      const errorMessage = error.response.data.error;
      console.log(errorMessage);
    }
  };
  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="calc">
        <img
          src="https://images.unsplash.com/photo-1627560985113-ab67e8031f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="hell0"
        />

        <div className="container">
          {selectedLectureHall ? (
            <>
              <div className="book">
                {bookingSuccess && <div>Lecture hall booked successfully!</div>}
                <h3>{selectedLectureHall.name}</h3>
                <p>Capacity: {selectedLectureHall.capacity}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLectureHall.schedules.map((schedule) => (
                      <tr key={`${schedule.startTime}-${schedule.endTime}`}>
                        <td>{schedule.startTime}</td>
                        <td>{schedule.endTime}</td>
                        <td>
                          {schedule.availability
                            ? "Available"
                            : "Not Available"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bookings">
                  <div className="books">
                    <div className="time">
                      <label htmlFor="start-time">Start Time:</label>
                      <select
                        id="start-time"
                        value={startTime}
                        onChange={(event) => setStartTime(event.target.value)}
                      >
                        <option value="">Select a start time</option>
                        {selectedLectureHall.schedules
                          .filter((schedule) => schedule.availability === true)
                          .map((schedule) => (
                            <option
                              key={schedule.startTime}
                              value={schedule.startTime}
                            >
                              {schedule.startTime}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="below">
                      <div className="time">
                        <label htmlFor="end-time">End Time:</label>
                        <select
                          id="end-time"
                          value={endTime}
                          onChange={(event) => setEndTime(event.target.value)}
                        >
                          <option value="">Select an end time</option>
                          {selectedLectureHall.schedules
                            .filter(
                              (schedule) =>
                                schedule.availability === true &&
                                schedule.startTime >= startTime
                            )
                            .map((schedule) => (
                              <option
                                key={schedule.endTime}
                                value={schedule.endTime}
                              >
                                {schedule.endTime}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="button">
                        <button
                          onClick={() => handleBooking(selectedLectureHall._id)}
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="unbook">
                    <div className="time">
                      <label htmlFor="start-time">Start Time:</label>
                      <select
                        id="start-time"
                        value={startTime}
                        onChange={(event) => setStartTime(event.target.value)}
                      >
                        <option value="">Select a start time</option>
                        {selectedLectureHall.schedules
                          .filter((schedule) => schedule.availability === false)
                          .map((schedule) => (
                            <option
                              key={schedule.startTime}
                              value={schedule.startTime}
                            >
                              {schedule.startTime}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="below">
                      <div className="time">
                        <label htmlFor="end-time">End Time:</label>
                        <select
                          id="end-time"
                          value={endTime}
                          onChange={(event) => setEndTime(event.target.value)}
                        >
                          <option value="">Select an end time</option>
                          {selectedLectureHall.schedules
                            .filter(
                              (schedule) =>
                                schedule.availability === false &&
                                schedule.startTime >= startTime
                            )
                            .map((schedule) => (
                              <option
                                key={schedule.endTime}
                                value={schedule.endTime}
                              >
                                {schedule.endTime}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="button">
                        <button
                          onClick={() =>
                            handleUnBooking(selectedLectureHall._id)
                          }
                        >
                          unBook
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {currentAvailability.map((lectureHall) => (
                <div
                  className="item"
                  key={lectureHall.id}
                  onClick={() => setSelectedLectureHall(lectureHall)}
                >
                  <img src={CALC} alt="" />
                  <div className="desc">
                    <span className="name">{lectureHall.name}</span>
                    <span className="capacity">
                      Capacity: {lectureHall.capacity}
                    </span>

                    <span className="status">
                      {lectureHall.availability ? "Available" : "Not available"}
                      {lectureHall.availability && (
                        <span>
                          {`  from ${lectureHall.currentStartTime} to
                        ${lectureHall.currentEndTime}`}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Calc;
