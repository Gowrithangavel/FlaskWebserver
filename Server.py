
from flask import Flask, request, jsonify

app = Flask(__name__)


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


if __name__ == '__main__':
    app.run(debug=True)