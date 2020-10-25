import React, { useEffect, useState } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import HistoryTable from "./utils/HistoryTable";
import PageHeader from "./utils/PageHeader";
import { useToasts } from "react-toast-notifications";

function HistoryPage() {
  const { addToast } = useToasts();
  const [History, setHistory] = useState([]);

  useEffect(() => {
    http.get(`${apiUrl}/users/getHistory`).then((response) => {
      if (response.data.success) {
        setHistory(response.data.history);
      } else {
        addToast("Failed to get History", { appearance: "error" });
      }
    });
  }, []);

  return (
    <React.Fragment>
      <PageHeader>Purchase History</PageHeader>
      <div className="container-lg container-md">
        <HistoryTable history={History} />
      </div>
    </React.Fragment>
  );
}

export default HistoryPage;
