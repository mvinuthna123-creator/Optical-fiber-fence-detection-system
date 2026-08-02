import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { Line } from "react-chartjs-2";
import "../css/Dashboard.css";

// Chart.js registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  // State for dynamic hardware data
  const [sensorData, setSensorData] = useState({
    status: "SAFE",
    sensorValue: 0,
    isIntrusion: false,
    lastAlert: "None",
    connectionStatus: "Offline",
  });

  // Chart state
  const [chartValues, setChartValues] = useState([200, 400, 600, 850, 300]);

  // Function to fetch dynamic data from backend API
  const fetchLiveData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sensor");
      if (!response.ok) throw new Error("Hardware server unreachable");

      const data = await response.json();
      console.log("Fetched:", data);

      setSensorData({
        status: data.isIntrusion ? "INTRUSION DETECTED" : "SAFE",
        sensorValue: data.sensorValue,
        isIntrusion: data.isIntrusion || false,
        lastAlert: data.lastAlert || "None",
        connectionStatus: "Connected",
      });

      // push new sensorValue into chart
      setChartValues((prev) => {
        const updated = [...prev.slice(-9), data.sensorValue];
        return updated;
      });
    } catch (error) {
      setSensorData((prev) => ({
        ...prev,
        connectionStatus: "Disconnected",
      }));
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Chart data + options
  const chartData = {
    labels: Array.from({ length: chartValues.length }, (_, i) => `T${i + 1}`),
    datasets: [
      {
        label: "Sensor Reading",
        data: chartValues,
        borderColor: "#34d399",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#f8fafc" } },
    },
    scales: {
      x: { ticks: { color: "#94a3b8" } },
      y: { ticks: { color: "#94a3b8" } },
    },
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />

        <main className="main-content">
          {/* Header Bar */}
          <div className="header-section">
            <div>
              <h1>Perimeter Security Console</h1>
              <p className="subtitle">
                Distributed Fiber Optic Sensing (DAS) — Live Monitoring
              </p>
            </div>

            {/* Hardware Connection Indicator */}
            <div
              className={`status-badge ${sensorData.connectionStatus.toLowerCase()}`}
            >
              <span className="pulse-dot"></span>
              {sensorData.connectionStatus === "Connected"
                ? "HARDWARE ONLINE"
                : "HARDWARE OFFLINE"}
            </div>
          </div>

          {/* Dynamic Cards Grid */}
          <div className="card-grid">
            <Card
              title="System Status"
              value={sensorData.status}
              type={sensorData.isIntrusion ? "danger" : "success"}
              subtext="Zone 01 — Optical Perimeter"
            />

            <Card
              title="Live Strain / Sensor Reading"
              value={sensorData.sensorValue}
              type="primary"
              subtext="Signal Threshold: > 900"
            />

            <Card
              title="Intrusion Status"
              value={sensorData.isIntrusion ? "BREACH ALERT" : "NORMAL"}
              type={sensorData.isIntrusion ? "danger" : "neutral"}
              subtext="Piezo / Fiber Disturbance"
            />

            <Card
              title="Last Breach Timestamp"
              value={sensorData.lastAlert}
              type="warning"
              subtext="Recorded Trigger Event"
            />
          </div>

          {/* Chart Section */}
          <h2>Live Sensor Graph</h2>
          <Line data={chartData} options={chartOptions} />

          {/* Live Activity Feed Box */}
          <div className="activity-banner">
            <h3>Live Telemetry Feed</h3>
            <p>
              {sensorData.isIntrusion
                ? "🚨 CRITICAL BREACH: Vibration detected along optical fiber zone!"
                : "✅ System active. Single-mode optical fiber loop normal. No active strain anomalies."}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
