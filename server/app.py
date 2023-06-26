#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, Flask
from flask_restful import Resource

# Local imports
from config import *
from models import User, Recipe

# Views go here!
@app.route('/')
def home():
    return 'you made it home'

class Boats(Resource):
    def get(self):
        boats = [boat.to_dict() for boat in Boat.query.all()]
        return make_response(jsonify(boats), 200)
    
    def post(self):
        try:
            data = request.get_json()
            boat = Boat(**data)
            db.session.add(boat)
            db.session.commit()
            return make_response(jsonify(boat.to_dict()), 201)
        except Exception as e:
            return make_response(jsonify({"errors": [str(e)]}), 400)
        
api.add_resource(Boats, '/boats')
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)
