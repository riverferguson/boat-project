#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Resource
from models import Boat, Location, Owner

# Local imports
from config import *

# Views go here!
@app.route('/')
def home():
    return 'you made it home'

class SignUp(Resource):
    def get(self):
        pass
    
    def post(self):
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        bio = request.form.get('bio')
        email = request.form.get('email')
        username = request.form.get('name')
        password = request.form.get('password')
    
        if owner := Owner.query.filter_by(username= username).first():
            return make_response('That user already exists. Try logging in')
    
        new_owner = Owner(first_name=first_name, last_name=last_name, bio=bio, email=email, username=username, password=generate_password_hash(password, method='sha256'))
        
        db.session.add(new_owner)
        db.session.commit()

        return make_response('New owner created. Try logging in')
        
api.add_resource(SignUp, '/signup')

class SignIn(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        
        existing_owner = Owner.query.filter_by(username=username).first()
        
        if not existing_owner or not check_password_hash(existing_owner.password, password):
            return make_response('Username or password was incorrect. Please try again.')
        
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

class BoatsById(Resource):
    def get(self, id):
        try:
            boat = Boats.query.get(id)
            return make_response(jsonify(boat.to_dict()), 200)
        except Exception:
            return make_response(jsonify({"error": "Boat not found"}), 404)

    def delete(self, id):
        try:
            boat = db.session.get(Boat, id)
            db.session.delete(boat)
            db.session.commit()
            return make_response(jsonify({}), 204)
        except Exception:
            return make_response(jsonify({"errors": "Boats not found"}), 404)

    def patch(self, id):
        boat_by_id = db.session.get(Boat, id)
        if not boat_by_id:
            return make_response({"error": "Boat not found"}, 404)
        try:
            data = request.get_json()
            for key in data:
                setattr(boat_by_id, key, data[key])
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
