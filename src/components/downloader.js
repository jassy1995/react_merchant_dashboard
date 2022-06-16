import React, { useState, useEffect, useContext } from "react";
import { CSVLink } from "react-csv";
import { Store } from "../store";
import { toast } from "react-toastify";
const axios = require("axios");

const Downloader = () => {
  const fileName = "marketer-report";
  const [loading, setLoading] = useState(false);

  const {
    state: { histories },
    dispatch,
  } = useContext(Store);

  const headers = [
    { label: "s/n", key: "id" },
    { label: "store", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "marketer name", key: "telemarketername" },
    { label: "feedback type", key: "feedback_type" },
    { label: "feedback comments", key: "feedback_comments" },
    { label: "opinion", key: "opinion" },
    { label: "date", key: "feedback_date" },
  ];

  useEffect(() => {
    getUserData();
  });

  const getUserData = () => {
    dispatch({ type: "START_FETCHING", payload: true });
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        dispatch({ type: "END_FETCHING", payload: false });
        setLoading(false);
      })
      .catch((error) => {
        dispatch({ type: "END_FETCHING", payload: false });
        let msg = error?.message
          ? error.message
          : "no or poor internet connection, try it again";
        toast.error(msg);
        console.log(error);
      });
  };

  return (
    <div className="container">
      <button className="font-bold text-white bg-myColor py-1 px-2 rounded-full  font-mono">
        <CSVLink
          headers={headers}
          data={histories}
          filename={fileName}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          {loading ? "Downloading..." : "Download"}
        </CSVLink>
      </button>
    </div>
  );
};

export default Downloader;
