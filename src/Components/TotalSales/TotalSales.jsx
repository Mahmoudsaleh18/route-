import React, { useState, useEffect } from "react";
import axios from "axios";
import MainChart from "./MainChart";

function TotalSales() {
  const [totalSales, setTotalSales] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://react-task-ten-chi.vercel.app/transactions"
        );
        setTransactions(response.data);

        // Calculate total sales
        const totalAmount = response.data.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
        setTotalSales(totalAmount);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto m-4 py-5 px-8 custom rounded-3xl">
      <div className="border-b-4 pb-4 border-white/50">
        <h2 className="text-5xl font-bold">
          Total Sales:{" "}
          <span className="text-[#4C3777] text-5xl">${totalSales}</span>
        </h2>
      </div>
      <div className="py-4">
        <MainChart transactions={transactions} />
      </div>
    </div>
  );
}

export default TotalSales;
