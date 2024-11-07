// MortgageChart.js
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  animator,
} from "chart.js";

// Register components with Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MortgageChart = () => {
  const initialBalance = 200000; // Starting mortgage balance
  const months = 120; // Total loan term in months
  const monthlyBasePayment = 1500; // Example base payment without extra payment

  const [extraPayment, setExtraPayment] = useState(0);

  const calculateBalanceData = (extraPayment) => {
    const labels = Array.from({ length: months }, (_, i) => `Month ${i + 1}`);
    let balance = initialBalance;
    const dataPoints = [];

    for (let i = 0; i < months; i++) {
      if (balance <= 0) {
        balance = 0;
      }
      dataPoints.push(balance);
      balance -= monthlyBasePayment + extraPayment;
    }

    return {
      labels,
      datasets: [
        {
          label: `Mortgage Balance with $${extraPayment} Extra Payment`,
          data: dataPoints,
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        },
      ],
    };
  };

  const data = calculateBalanceData(extraPayment);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Balance ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time (Months)",
        },
      },
    },
  };

  const handleSliderChange = (event) => {
    setExtraPayment(Number(event.target.value));
  };

  return (
    <div>
      <h2>Mortgage Balance Over Time</h2>
      <Line data={data} options={options} />
      <div style={{ marginTop: "20px" }}>
        <label>Extra Monthly Payment: ${extraPayment}</label>
        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={extraPayment}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default MortgageChart;
