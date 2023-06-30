#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session, abort, url_for, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Resource
from models import Boat, Location, Owner
from functools import wraps
# import ipdb

# Local imports
from config import *
from models import Owner, Location, Boat

# Views go here!
@app.route('/')
def home():
    return 'you made it home'

def login_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        boat_owner = session.get('user_id')
        boat_to_delete = db.session.get(Boat, kwargs)
        if not session['user_id'] or boat_owner != boat_to_delete.owner_id:
            return make_response({'error': 'Unauthorized'}, 401)
        return func(*args, **kwargs)
    return decorated_function

# @app.route('/current_user', methods=['GET'])
# def get():
#     if 'user_id' in session:
#         current_user = session['user_id']
#         return make_response(jsonify(current_user))
#     return make_response({'error': 'no user found'})

class SignUp(Resource):
    
    def post(self):
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        bio = request.get_json()['bio']
        email = request.get_json()['email']
        username = request.get_json()['username']
        password = request.get_json()['password']
    
        if owner := Owner.query.filter_by(username= username).first():
            return make_response('That user already exists. Try logging in')
    
        new_owner = Owner(first_name=first_name, last_name=last_name, bio=bio, email=email, username=username, password=generate_password_hash(password, method='scrypt'))
        
        db.session.add(new_owner)
        db.session.commit()

        session['user_id'] = new_owner.id

        return make_response('New owner created.')
        
api.add_resource(SignUp, '/signup')

class SignIn(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        
        existing_owner = Owner.query.filter_by(username=username).first()
        
        if not existing_owner or not check_password_hash(existing_owner.password, password):
            return make_response('Username or password was incorrect. Please try again.', 404)
        
        session['user_id'] = existing_owner.id
        return make_response(existing_owner.to_dict())
        
api.add_resource(SignIn, '/signin')

class CheckSession(Resource):
    def get(self):
        if user := Owner.query.filter(Owner.id == session.get('user_id')).first():
            return user.to_dict()
        else:
            return make_response({'message': '401: Not Authorized'}, 401)

api.add_resource(CheckSession, '/check_session')

class SignOut(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message': '204: No Content'}, 204)

api.add_resource(SignOut, '/signout')

class Boats(Resource):
    def get(self):
        boats = [boat.to_dict() for boat in Boat.query.all()]
        return make_response(jsonify(boats), 200)

    def post(self):  # sourcery skip: extract-method
        if not session['user_id']:
            return make_response({'error': 'Unauthorized'}, 401)
        try:
            boat_data = request.get_json().get('boat')
            location_data = request.get_json().get('location')
            location = Location(**location_data)
            db.session.add(location)
            db.session.commit()
            boat = Boat(**boat_data)
            boat.location = location
            boat.owner_id = session.get('user_id') 
            db.session.add(boat)
            db.session.commit()
            return make_response(jsonify(boat.to_dict()), 201)
        except Exception as e:
            return make_response(jsonify({"errors": [str(e)]}), 400)

api.add_resource(Boats, '/boats')

class BoatsById(Resource):
    def get(self, id):
        try:
            boat = Boat.query.get(id)
            return make_response(jsonify(boat.to_dict()), 200)
        except Exception:
            return make_response(jsonify({"error": "Boat not found"}), 404)
        
    @login_required
    def delete(self, id):
        try:
            boat = db.session.get(Boat, id)
            db.session.delete(boat)
            db.session.commit()
            return make_response(jsonify({}), 204)
        except Exception:
            return make_response(jsonify({"errors": "Boats not found"}), 404)
    
    @login_required
    def patch(self, id):
        boat_by_id = db.session.get(Boat, id)
        if not boat_by_id:
            return make_response({"error": "Boat not found"}, 404)
        try:
            boat_data = request.get_json().get('boat')
            location_data = request.get_json().get('location')
            for key in location_data:
                setattr(boat_by_id.location, key, location_data[key])
            for key in boat_data:
                setattr(boat_by_id, key, boat_data[key])
            db.session.commit()
            return make_response(boat_by_id.to_dict(), 200)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)
        
api.add_resource(BoatsById, '/boats/<int:id>')

class Owners(Resource):
    def get(self):
        owner = [owner.to_dict() for owner in Owner.query.all()]
        return make_response(jsonify(owner), 200)

api.add_resource(Owners, '/owners')

class OwnersById(Resource):
    def get(self, id):
        try:
            owner = Owner.query.get(id)
            return make_response(jsonify(owner.to_dict()), 200)
        except Exception:
            return make_response(jsonify({"error": "owner not found"}), 404)
        
    def patch(self, id):
        owner_by_id = db.session.get(Owner, id)
        if not owner_by_id:
            return make_response({"error": "Owner not found"}, 404)
        try:
            data = request.get_json()
            for key in data:
                setattr(owner_by_id, key, data[key])
            db.session.commit()
            return make_response(owner_by_id.to_dict(), 200)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)

api.add_resource(OwnersById, '/owners/<int:id>')

class Locations(Resource):
    def get(self):
        locations = [location.to_dict() for location in Location.query.all()]
        return make_response(jsonify(locations), 200)
api.add_resource(Locations, '/locations')

if __name__ == '__main__':
    app.run(port=5555, debug=True)