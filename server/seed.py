#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import Owner, Location, Boat

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

fake = Faker()

def create_owners():
    owners = []
    for _ in range(5):
        owner = Owner(
            
        )

if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
