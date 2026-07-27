import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../css/Pages.css";

function Settings() {
  return (
    <div className="page-layout">
      <Navbar />
      <div className="page-body">
        <Sidebar />
        <main className="page-content">
          <div className="page-header">
            <h1>System & Hardware Settings</h1>
            <p>Configure sensitivity thresholds and connection credentials for your Arduino nodes</p>
          </div>

          <div className="settings-card">
            <div className="form-group">
              <label>Hardware API Endpoint URL</label>
              <input type="text" defaultValue="http://localhost:5000/api/sensor" />
            </div>

            <div className="form-group">
              <label>Sensor Trigger Strain Threshold (0 - 1023)</label>
              <input type="number" defaultValue="900" />
            </div>

            <div className="form-group">
              <label>Buzzer Alarm Duration (Seconds)</label>
              <input type="number" defaultValue="5" />
            </div>

            <div className="form-group">
              <label>Polling Interval (Milliseconds)</label>
              <input type="number" defaultValue="1000" />
            </div>

            <button className="btn-primary">Save Configurations</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;