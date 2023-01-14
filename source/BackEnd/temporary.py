# Write Flutter Code
from flask import Flask, request, json, jsonify
from cse_notice import get_notice
app = Flask(__name__)

@app.route("/5463216168", methods=['POST']) #get 으로 변경
def get_data():
    response = get_notice()
    return response

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)