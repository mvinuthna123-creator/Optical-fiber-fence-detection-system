import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import "../css/Dashboard.css";

function Dashboard() {
  // State for dynamic hardware data
  const [sensorData, setSensorData] = useState({
    status: "SAFE",
    sensorValue: 0,
    isIntrusion: false,
    lastAlert: "None",
    connectionStatus: "Connected",
  });

  // Function to fetch dynamic data from backend API
  const fetchLiveData = async () => {
    try {
      // ⚠️ REPLACE THIS URL with your backend server URL (e.g., http://localhost:5000/api/sensor)
      const response = await fetch("http://localhost:5000/api/sensor");
      
      if (!response.ok) {
        throw new Error("Hardware server unreachable");
      }
      
      const data = await response.json();

      setSensorData({
        status: data.isIntrusion ? "INTRUSION DETECTED" : "SAFE",
        sensorValue: data.sensorValue,
        isIntrusion: data.isIntrusion,
        lastAlert: data.lastAlert || "None",
        connectionStatus: "Connected",
      });
    } catch (error) {
      // Fallback state if server/Arduino isn't sending data yet
      setSensorData((prev) => ({
        ...prev,
        connectionStatus: "Disconnected",
      }));
    }
  };

  useEffect(() => {
    fetchLiveData(); // Initial fetch

    // Poll the backend every 1 second (1000 ms) for live hardware updates
    const interval = setInterval(() => {
      fetchLiveData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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