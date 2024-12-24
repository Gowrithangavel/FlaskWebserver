
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# --------- LONGIN INFO ----------

@app.route('/loginInfo', methods=['POST'])    # POST method 
def loginInfo():
    data = request.get_json()
    print(data)

    response = {}

    if data['username'] == 'admin' and data['password'] == 'admin':
        response =  {"status":"success"}
    
    else:
        response =  {"status":"failed"}

    return jsonify(response)

#  --------- NETWORK INFO ----------

@app.route('/scanNetworkInfo', methods=['GET'])    # GET method
def scanNetworkInfo():
    response = {"ssid":["GSM_NET","GSM_NET_5G"]}
    
    return jsonify(response)

#  ----------- WI-FI CONFIG INFO ----------

@app.route('/wifiConfig', methods=['POST'])    # POST method 
def wifiConfig():
    data = request.get_json()
    print(data)

    file = open("wifiConfig.json",'w')
    file.write(str(data))
    file.close()

    response = {}
    response =  {"status":"success"}
    
    return jsonify(response)

#  ----------- MQTT INFO ----------

@app.route('/mqttInfo', methods=['POST'])    # POST method
def mqttInfo():
    data = request.get_json()
    print(data)

    file = open("mqttInfo.json",'w')
    file.write(str(data))
    file.close()

    response =  {"status":"sucess"}
    
    return jsonify(response)

#  ----------- DEVICE INFO ----------

@app.route('/deviceInfo', methods=['GET'])    # POST method
def deviceInfo():
    file = open("deviceInfo.json",'r')
    getDeviceInfo = file.read()
    file.close()

    print(getDeviceInfo)
    getDeviceInfo = json.loads(getDeviceInfo)
    print(getDeviceInfo)
    status = {"status":"success"}
    print(status)

    responsedata = {**getDeviceInfo, **status}
    print(responsedata)

    return jsonify(responsedata)

# ------------ Reboot -------------

@app.route('/rebootInfo', methods=['GET'])    # GET method
def rebootInfo():
    # Display stored data before reboot
    response = {
        "status": "Rebooting...",
        # "stored_data": stored_data
    }
   
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)