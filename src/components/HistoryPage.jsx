import React, { useEffect, useState } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import HistoryTable from "./utils/HistoryTable";
import MainContainer from "./forms/MainContainer";

function HistoryPage() {
  const [History, setHistory] = useState([]);

  useEffect(() => {
    http.get(`${apiUrl}/users/getHistory`).then((response) => {
      if (response.data.success) {
        setHistory(response.data.history);
      } else {
        alert("Failed to get History");
      }
    });
  }, []);

  return (
    <div>
      <MainContainer maxWidth="md">
        <HistoryTable history={History}/>
      </MainContainer>
    </div>
  );
}

export default HistoryPage;
