#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, Flask
from flask_restful import Resource
from models import Boat, Location, Owner

# Local imports
from config import *
from models import Owner, Location, Boat

# Views go here!

if __name__ == '__main__':
    app.run(port=5555, debug=True)