# FlaskWebserver

|              |   #server      |         #client |
|--------------|----------------|-----------------|
| webserverlogin | [/loginInfo]     |    (http://localhost:80/loginInfo) |
| network        | [/scanNetworkInfo]|   (http://localhost:80/scanNetworkInfo) |
| wificonfig     | [/wifiConfig]     |  (http://localhost:80//wifiConfig) |
| mqtt           | [/mqttInfo]       |   (http://localhost:80/mqttInfo)   |
| deviceinfo     | [/deviceInfo]     |  (http://localhost:80/deviceInfo)  |
| reboot         | [/rebootInfo]     |   (http://localhost:80/rebootInfo) |


## client:

### login:

|  url                                 |      headers          |   method    |  payload                               |              response  |
|--------------------------------------|-----------------------|-------------|----------------------------------------|------------------------|                      
|http://localhost:80/loginInfo         |   application/json    | POST        |  {"username":"admin","password":"admin"}|    {"status":"success"} |
| http://localhost:80/scanNetworkInfo  |    -                  | GET         |                                         |    {"status":"success","ssid":["gsnnet","kavi007"]}  |       
| http://localhost:80//wifiConfig      |   application/json    | POST        | {"ssid":"gsmnet","pass":"12345"}        |         {"status":"success"}|
| http://localhost:80/mqttInfo         |   application         | POST        |{"mserver":"S3.iotcompany.io,"Port":1883,"domainkey":"ESP345","devicetoken","345qt"} | {"status":"success"} |
| http://localhost:80/deviceInfo       |                       | GET         |                                         |{"status":"success","did":"ESPC201A","dmodel":"ROUTER","dversion":"v201"} |
| http://localhost:80/rebootInfo       |                       | GET         |                                         |{"mserver":"S3.iotcompany.io,"Port":1883,"domainkey":"ESP345","devicetoken","345qt"} |


## Server:

### python support

flask       - pip install flask
requests    - pip install requests
json        

### curl commands

```bash
curl -X POST http://127.0.0.1:5000/loginInfo  -H "Content-Type: application/json"  -d '{"username":"admin","password":"admin"}'
```
```bash
curl -X GET http://127.0.0.1:5000/scanNetworkInfo  -H "Content-Type: application/json"
```
```bash
curl -X POST http://127.0.0.1:5000/wifiConfig  -H "Content-Type: application/json"  -d '{"ssid":"GSM_NET","pass":"12345678"}'
```
```bash
curl -X POST http://127.0.0.1:5000/mqttInfo  -H "Content-Type: application/json"  -d '{"server":"S3.iotcompany.io","port":"1883","domain key":"ESP345","device token":"345qt"}'
```
```bash
curl -X GET http://127.0.0.1:5000/deviceInfo  -H "Content-Type: application/json"
```
```bash
curl -X GET http://127.0.0.1:5000/rebootInfo  -H "Content-Type: application/json"
```
