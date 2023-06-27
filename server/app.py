#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, redirect, url_for, flash, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Resource
from models import Boat, Location, Owner
from flask_login import login_user, login_required, logout_user

# Local imports
from config import *

auth = Blueprint('auth', __name__)
main = Blueprint('main', __name__)
# Views go here!
@main.route('/')
def home():
    return 'you made it home'

@main.route('/profile')
def profile():
    return 'Profile'

@auth.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    
    owner = Owner.query.filter_by(username=username).first()
    
    if not owner or not check_password_hash(owner.password, password):
        flash('Username or Password was incorrect. Please try again.')
        return redirect(url_for('auth.login'))
    
    login_user(owner)
    return redirect(url_for('main.profile'))

@auth.route('/singup', methods=['POST'])
def signup_post():
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    bio = request.form.get('bio')
    email = request.form.get('email')
    username = request.form.get('name')
    password = request.form.get('password')
    
    if owner := Owner.query.filter_by(email= email).first():
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))
    
    new_owner = Owner(first_name=first_name, last_name=last_name, bio=bio, email=email, username=username, password=generate_password_hash(password, method='sha256'))
    
    db.session.add(new_owner)
    db.session.commit()
    
    return redirect(url_for('auth.login'))

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return 'You have been logged out'


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
