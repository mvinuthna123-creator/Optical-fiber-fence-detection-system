from flask import Flask, jsonify
from flask_cors import CORS
import serial, threading

app = Flask(__name__)
CORS(app)

# Global variables
arduino = None
latest_value = None   # None means no data yet

def read_loop():
    global latest_value
    while True:
        try:
            line = arduino.readline().decode().strip()
            if line.startswith("Sensor Value:"):
                latest_value = int(line.split(":")[1].strip())
                print("RAW Arduino line:", line)  # Debug print
        except Exception as e:
            print("Error reading Arduino:", e)
            latest_value = None   # mark disconnected/error

@app.route('/api/sensor')
def get_sensor():
    # Case 1: Arduino disconnected or no data
    if latest_value is None:
        return jsonify({
            "sensorValue": 0,
            "isIntrusion": False,          # 👈 no intrusion when disconnected
            "lastAlert": "Disconnected"
        })

    # Case 2: Arduino connected, normal values
    return jsonify({
        "sensorValue": latest_value,
        "isIntrusion": latest_value <= 5, # intrusion only if real low value
        "lastAlert": "None"
    })

if __name__ == '__main__':
    # ✅ Open COM3 once
    arduino = serial.Serial('COM3', 9600, timeout=1)
    # ✅ Start background thread
    threading.Thread(target=read_loop, daemon=True).start()
    app.run(port=5000, debug=False)
