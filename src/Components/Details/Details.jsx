import React from "react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from "recharts";

function Details({ data, transactions }) {
  if (!data) return null; // Handle case where no customer is selected yet

  // Filter transactions for the selected customer
  const detailsData = transactions.filter(
    (trans) => trans.customer_id === data.id
  );

  return (
    <div className="container mx-auto m-4 py-5 px-8 rounded-3xl">
      <div className="border-b-4 pb-4 border-white/50">
        <h2 className="text-5xl font-bold">Details</h2>
      </div>
      <div className="py-4 grid grid-cols-3 h-96">
        <div className="col-span-1 text-center flex justify-center items-center flex-col">
          <div>
            <img
              className="w-32"
              src={data.img}
              alt={`Avatar of ${data.name}`}
            />
          </div>
          <h2 className="text-3xl font-bold pb-4 pt-2">{data.name}</h2>
          <p>Total Transactions Per Day:</p>
        </div>
        <div className="col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={300} data={detailsData}>
              <Tooltip />
              <XAxis dataKey="date" />
              <Bar dataKey="amount" fill="#4C3777" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Details;
