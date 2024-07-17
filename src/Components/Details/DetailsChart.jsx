import React from "react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from "recharts";

function DetailsChart({ detailsData }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={detailsData}>
        <Tooltip />
        <XAxis dataKey="date" />
        <Bar dataKey="amount" fill="#4C3777" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DetailsChart;
