from flask import Flask, jsonify
from flask_cors import CORS
import serial, threading, random

app = Flask(__name__)
CORS(app)

# Global variables
arduino = None
latest_value = None   # None means no data yet

# Try to connect Arduino
try:
    arduino = serial.Serial('COM3', 9600, timeout=1)
    print("Arduino connected ✅")
except Exception as e:
    print("Arduino not connected ⚠️ — running in demo mode")
    arduino = None

def read_loop():
    global latest_value
    while True:
        if arduino:
            try:
                line = arduino.readline().decode().strip()
                if line.startswith("Sensor Value:"):
                    latest_value = int(line.split(":")[1].strip())
                    print("RAW Arduino line:", line)  # Debug print
            except Exception as e:
                print("Error reading Arduino:", e)
                latest_value = None   # mark disconnected/error
        else:
            # Demo mode: fake values (Safe, Intrusion, Disconnected)
            latest_value = random.choice([80, 3, None])
            print("Demo sensor value:", latest_value)
            threading.Event().wait(2)  # pause 2s

@app.route('/api/sensor')
def get_sensor():
    # Case 1: Arduino disconnected or no data
    if latest_value is None:
        return jsonify({
            "sensorValue": 0,
            "isIntrusion": False,
            "lastAlert": "Disconnected"
        })

    # Case 2: Arduino connected or demo values
    return jsonify({
        "sensorValue": latest_value,
        "isIntrusion": latest_value <= 5,
        "lastAlert": "None"
    })

if __name__ == '__main__':
    threading.Thread(target=read_loop, daemon=True).start()
    app.run(port=5000, debug=False)
