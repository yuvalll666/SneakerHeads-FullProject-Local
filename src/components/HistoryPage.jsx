import React, { useEffect, useState } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import HistoryTable from "./utils/HistoryTable";
import PageHeader from "./utils/PageHeader"

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
    <React.Fragment>
    <PageHeader>
    Purchase History
  </PageHeader>
      <div className="container">
        <HistoryTable history={History}/>
      </div>

    </React.Fragment>
  );
}

export default HistoryPage;
