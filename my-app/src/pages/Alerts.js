import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../css/Pages.css";

function Alerts() {
  const alertList = [
    { id: 1, time: "10:45 AM", location: "Zone 1 - East Fence", sensorValue: 940, status: "Intrusion Detected", level: "Critical" },
    { id: 2, time: "11:20 AM", location: "Zone 1 - East Fence", sensorValue: 820, status: "Resolved", level: "Normal" },
    { id: 3, time: "01:15 PM", location: "Zone 3 - North Gate", sensorValue: 915, status: "Vibration Anomaly", level: "Warning" },
  ];

  return (
    <div className="page-layout">
      <Navbar />
      <div className="page-body">
        <Sidebar />
        <main className="page-content">
          <div className="page-header">
            <h1>Active Alerts & Triggers</h1>
            <p>Real-time security breach notifications sent from optical sensor nodes</p>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Location / Zone</th>
                  <th>Peak Strain Signal</th>
                  <th>Severity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {alertList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.time}</td>
                    <td>{item.location}</td>
                    <td>{item.sensorValue}</td>
                    <td>
                      <span className={`badge ${item.level === 'Critical' ? 'badge-danger' : item.level === 'Warning' ? 'badge-warning' : 'badge-success'}`}>
                        {item.level}
                      </span>
                    </td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Alerts;