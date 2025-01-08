
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# --------- LONGIN INFO ----------

@app.route('/loginInfo', methods=['POST'])    # POST method 
def loginInfo():
    data = request.get_json()
    print(data)

    response = {}

    if data['username'] == 'admin' and data['password'] == 'admin':
        response =  '{"status":"success"}'
    
    else:
        response =  '{"status":"failed"}'

    return jsonify(response)

#  --------- NETWORK INFO ----------

@app.route('/scanNetworkInfo', methods=['GET'])    # GET method
def scanNetworkInfo():
    #response = {"ssid":["GSM_NET","GSM_NET_5G"]}
    file = open("scanNetworkInfo.json",'r')
    getScanNetwork = file.read()
    file.close()
    
    print(getScanNetwork)
    getScanNetwork = json.loads(getScanNetwork)
    status = '{"status":"success"}'
    getStatus = json.loads(status)
    print(getStatus)

    response = {**getScanNetwork, **getStatus}
    print(response)

    return jsonify(response)
    #*************************************************#
    
#  ----------- WI-FI CONFIG INFO ----------

@app.route('/wifiConfig', methods=['POST'])    # POST method 
def wifiConfig():
    data = request.get_json()
    print(data)

    getWifiConfig = json.dumps(data)

    file = open("wifiConfig.json",'w')
    file.write(getWifiConfig)
    file.close()

    response = {}
    response =  '{"status":"success"}'
    
    return jsonify(response)

#  ----------- MQTT INFO ----------

@app.route('/mqttInfo', methods=['POST'])    # POST method
def mqttInfo():
    data = request.get_json()
    print(data)

    getMqttInfo = json.dumps(data)

    file = open("mqttInfo.json",'w')
    file.write(getMqttInfo)
    file.close()
    print(type(getMqttInfo))

    response =  {"status":"success"}
    print(type(response))

    getMqttInfo_dict = json.loads(getMqttInfo)
    responsedata = {**getMqttInfo_dict,**response}

    responsedata1 = json.dumps(responsedata)
    
    return jsonify(responsedata1)

#  ----------- DEVICE INFO ----------

@app.route('/deviceInfo', methods=['GET'])    # POST method
def deviceInfo():
    file = open("deviceInfo.json",'r')
    getDeviceInfo = file.read()
    file.close()

    return jsonify(getDeviceInfo)

# ------------ Reboot Config Info -------------

@app.route('/configInfo', methods=['GET'])    # GET method
def configInfo():
    # # Display stored data before reboot
    wifiFile = open("wifiConfig.json","r")
    getWifiFile = wifiFile.read()
    wifiFile.close()

    print(type(getWifiFile))
    print(getWifiFile)

    mqttFile = open("mqttInfo.json","r")
    getMqttFile = mqttFile.read()
    mqttFile.close()

    print(type(getMqttFile))
    print(getMqttFile)

    deviceFile = open("deviceInfo.json","r")
    getDeviceFile = deviceFile.read()
    deviceFile.close()

    print(type(getDeviceFile))
    print(getDeviceFile)

    wifiData = json.loads(getWifiFile)
    mqttData = json.loads(getMqttFile)
    deviceData = json.loads(getDeviceFile)
  
    response = {**wifiData,**mqttData,**deviceData}

    responsedata = json.dumps(response)
   
    return jsonify(responsedata)

    #--------------- Reboot ----------------

@app.route('/rebootInfo', methods=['GET'])
def rebootInfo():
        
    wifiFile = open("wifiConfig.json",'r')
    getWifiFile = wifiFile.read()
    wifiFile.close()

    print(type(getWifiFile))
    print(getWifiFile)

    mqttFile = open("mqttInfo.json","r")
    getMqttFile = mqttFile.read()
    mqttFile.close()

    print(type(getMqttFile))
    print(getMqttFile)

    deviceFile = open("deviceInfo.json","r")
    getDeviceFile = deviceFile.read()
    deviceFile.close()

    print(type(getDeviceFile))
    print(getDeviceFile)

    wifiData = json.loads(getWifiFile)
    mqttData = json.loads(getMqttFile)
    deviceData = json.loads(getDeviceFile)

    rebootresponse = {"Reboot":"Success"}

    response = {**wifiData, **mqttData, **deviceData, **rebootresponse}

    responsedata = json.dumps(response)

    return jsonify(responsedata)

if __name__ == '__main__':
    app.run(debug=True)