import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../css/Pages.css";

function History() {
  const historyLogs = [
    { id: 101, date: "2026-07-25", time: "09:30:12", event: "Optical Signal Restored", zone: "Zone 2", operator: "Bhavya" },
    { id: 102, date: "2026-07-25", time: "08:14:55", event: "Fence Climbing Vibration Detected", zone: "Zone 1", operator: "System Auto" },
    { id: 103, date: "2026-07-24", time: "22:10:04", event: "System Calibration Check", zone: "All Zones", operator: "Admin" },
  ];

  return (
    <div className="page-layout">
      <Navbar />
      <div className="page-body">
        <Sidebar />
        <main className="page-content">
          <div className="page-header">
            <h1>Event Audit History</h1>
            <p>Complete historical log of optical cable disturbances and operator responses</p>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Event Description</th>
                  <th>Monitored Zone</th>
                  <th>Logged By</th>
                </tr>
              </thead>
              <tbody>
                {historyLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.date}</td>
                    <td>{log.time}</td>
                    <td>{log.event}</td>
                    <td>{log.zone}</td>
                    <td>{log.operator}</td>
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

export default History;