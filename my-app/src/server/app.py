from flask import Flask, jsonify
import random

app = Flask(__name__)

@app.route('/api/data')
def get_data():
    # Temporary fake sensor value (later replace with Arduino Serial read)
    value = random.randint(0, 100)
    return jsonify({"sensor_value": value})

@app.route('/api/sensor')
def get_sensor():
    value = random.randint(0, 100)
    print("DEBUG: /api/sensor called with value =", value)
    return jsonify({
        "sensorValue": value,               # ✅ matches React state
        "isIntrusion": value > 70,          # simulate intrusion if value > 70
        "lastAlert": "None"                 # placeholder until Arduino is connected
    })

if __name__ == '__main__':
    app.run(port=5000,debug=True)

