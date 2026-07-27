# Optical Fiber Fence Detection System

A modern **Distributed Fiber Optic Sensing (DFOS)**-based perimeter security system with a **React.js Command Center Dashboard** for real-time monitoring, intrusion detection, and sensor analytics.

The project combines **optical fiber sensing**, **Arduino/ESP32 hardware**, and a **React web application** to provide a live visualization of perimeter security status.

---

# Features

- Real-time optical fiber intrusion detection
- Live sensor monitoring dashboard
- Security breach alerts
- Historical event logs
- Analytics and activity trends
- Threshold calibration
- Dark-themed Command Center UI
- Responsive React interface
- Hardware integration with Arduino / ESP32
- REST API communication

---

# System Architecture

```
Optical Fiber
      │
      ▼
Photodetector Module
      │
      ▼
Arduino / ESP32
      │
      ▼
Backend REST API
(Node.js / Express)
      │
      ▼
React Dashboard
      │
      ├── Dashboard
      ├── Alerts
      ├── History
      ├── Analytics
      └── Settings
```

---

# Project Structure

```
my-app/
├── public/
│   └── index.html
│
└── src/
    ├── components/
    │   ├── Card.js
    │   ├── Navbar.js
    │   └── Sidebar.js
    │
    ├── css/
    │   ├── Card.css
    │   ├── Dashboard.css
    │   ├── Navbar.css
    │   ├── Pages.css
    │   └── Sidebar.css
    │
    ├── pages/
    │   ├── Dashboard.js
    │   ├── Alerts.js
    │   ├── Analytics.js
    │   ├── History.js
    │   └── Settings.js
    │
    ├── App.js
    ├── index.js
    └── package.json
```

---

# Technology Stack

## Frontend

- React.js
- CSS3
- JavaScript
- Font Awesome / Lucide Icons

## Backend

- Node.js
- Express.js

*(Python Flask can also be used instead of Express.)*

## Embedded Hardware

- Arduino Uno
- NodeMCU ESP32
- Photodetector Module
- Active Buzzer

## Sensing Technology

- Single Mode Optical Fiber (Corning SMF-28)
- Rayleigh Backscattering
- Optical Interferometry
- Light Intensity Monitoring

---

# Installation

## Prerequisites

Install the following software before running the project:

- Node.js (Version 14 or above)
- npm
- Git

---

## Clone the Repository

```bash
git clone https://github.com/Gbhavya996/Optical-fiber-fence-detection-system.git
```

Navigate into the project folder:

```bash
cd Optical-fiber-fence-detection-system/my-app
```

---

## Install Dependencies

```bash
npm install
```

---

## Start the React Development Server

```bash
npm start
```

The application will open at:

```
http://localhost:3000
```

---

# Hardware Integration

1. Upload the optical fiber monitoring program to the Arduino or ESP32.

2. Connect the photodetector module to the analog input.

3. Start the backend server.

4. Ensure the backend exposes the following API:

```
GET /api/sensor
```

Example response:

```json
{
  "sensorValue": 940,
  "isIntrusion": true,
  "lastAlert": "17:08:22 IST",
  "status": "CRITICAL BREACH",
  "connection": "ACTIVE"
}
```

The React dashboard automatically polls this endpoint every second to update:

- Sensor readings
- Connection status
- Intrusion alerts
- Dashboard cards
- Alarm indicators

---

# Dashboard Modules

## Dashboard

Displays:

- Live sensor values
- System health
- Device connection
- Active intrusion status
- Telemetry cards

---

## Alerts

Shows:

- Recent intrusion alerts
- Alert timestamps
- Alert severity
- Active security notifications

---

## History

Provides:

- Searchable security logs
- Historical intrusion records
- Event timestamps

---

## Analytics

Displays:

- Intrusion trends
- Sensor activity
- System performance
- Data visualization

---

## Settings

Allows users to:

- Configure sensor thresholds
- Manage user profile
- Update device settings
- Calibrate the system

---

# API Response Format

```json
{
    "sensorValue": 940,
    "isIntrusion": true,
    "lastAlert": "17:08:22 IST",
    "status": "CRITICAL BREACH",
    "connection": "ACTIVE"
}
```

---

# Future Enhancements

- MQTT communication
- ESP32 Wi-Fi connectivity
- Firebase cloud storage
- SMS and Email alerts
- Mobile application
- AI-based anomaly detection
- Interactive data charts
- Multi-zone fiber monitoring

---

# Author

**Bhavya Reddy**

GitHub:
https://github.com/Gbhavya996

---

# License

This project is intended for educational and research purposes.

Feel free to modify and extend it for your own projects.
