import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import "../css/Pages.css";

function Analytics() {
  return (
    <div className="page-layout">
      <Navbar />
      <div className="page-body">
        <Sidebar />
        <main className="page-content">
          <div className="page-header">
            <h1>System Security Analytics</h1>
            <p>Statistical summaries of intrusion detection frequency and optical telemetry</p>
          </div>

          <div className="card-grid" style={{ marginBottom: "30px" }}>
            <Card title="Total Events Logged" value="128" type="primary" subtext="Past 30 Days" />
            <Card title="False Alarm Rate" value="1.2%" type="success" subtext="ML Filter Active" />
            <Card title="Average Response Time" value="1.4s" type="warning" subtext="Arduino -> Web App" />
          </div>

          <div className="settings-card" style={{ maxWidth: "100%" }}>
            <h3 style={{ color: "#94a3b8", marginTop: 0 }}>Vibration Frequency Distribution (DAS)</h3>
            <p style={{ color: "#cbd5e1" }}>
              • <strong>5–20 Hz:</strong> Climbing / Cable Shaking detected (4 events)<br />
              • <strong>20–200 Hz:</strong> Fence Cutting / Digging acoustic signatures (1 event)<br />
              • <strong>200+ Hz:</strong> Ambient Environmental Noise / Wind (Filtered out)
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Analytics;