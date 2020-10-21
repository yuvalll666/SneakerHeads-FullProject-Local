import React, { useEffect, useState } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";

function HistoryPage() {
  const [History, setHistory] = useState([]);

  useEffect(() => {
    http.get(`${apiUrl}/users/getHistory`).then((response) => {
      if (response.data.success) {
        console.log(response.data.history);
        setHistory(response.data);
      } else {
        alert("Failed to get History");
      }
    });
  }, []);

  return <div>HistoryPage</div>;
}

export default HistoryPage;
