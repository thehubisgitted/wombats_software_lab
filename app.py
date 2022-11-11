from flask import Flask, redirect, url_for, request, send_from_directory, jsonify
import os, json
import MongoHandler
import hardwareSet
import User
import Project
import sys

app = Flask(__name__, static_url_path='', static_folder='SoftwareLabProject/build/')
#TODO: route everything correctly

mongo = MongoHandler.DataHandler()

@app.route('/')
def index():
    return send_from_directory('SoftwareLabProject/build/', 'index.html')

@app.route('/login', methods= ['POST'])
def LoginRequest():
    request_data = request.get_json()
    print(request_data, file=sys.stderr)
    
    user_id = request_data['userID']
    password = request_data['password']
    
    if mongo.verify_user_exists(user_id) is False:
        return jsonify({'confirmation':'User Doesn\'t Exist'})
    
    if mongo.verify_login(user_id, password) is False:
        return jsonify({'confirmation':'Password is Incorrect'})
    # if(request_data['userID'] == '1234'): # just checking if data can be read UserID 1234 will trigger this
    #     return jsonify({'confirmation': "1234 recieved successfully"})
    
    return jsonify({'confirmation':"Data Recieved!"})

@app.route('/registration', methods=['POST'])
def RegistrationRequest():
    request_data = request.get_json()
    print(request_data, file=sys.stderr)
    
    username = request_data['username']
    user_id = request_data['userID']
    password = request_data['password']
    confirm_password = request_data['confirmPassword']
    
    if(password != confirm_password):
        return jsonify({'confirmation': "WRONG_PASSWORD"})
    
    if(mongo.verify_user_exists(user_id) is True):
        return jsonify({'confirmation':"User_EXISTS"})
    
    if( (username == "") or (user_id == "") or (password == "") or (confirm_password == "") is True):
        return jsonify({'confirmation':"BLANK"});
    
    user = User(username,user_id,password)
    return jsonify({'confirmation':"RECIEVED"})
    
    

@app.route('/user/<username>')
def queryUser(username):
    mongo = MongoHandler()
    isAUser = mongo.verifyUserExists(username)
    if isAUser:
        return redirect(url_for('user_page'))
    else:
        mongo.createUser(username)

@app.route('/project/<id>')
def getProject():
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
