import { Link } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>

      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/alerts">Alerts</Link>
        </li>

        <li>
          <Link to="/history">History</Link>
        </li>

        <li>
          <Link to="/analytics">Analytics</Link>
        </li>

        <li>
          <Link to="/settings">Settings</Link>
        </li>

        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;