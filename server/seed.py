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
            first_name=fake.name(),
            last_name=fake.name(),
            bio=fake.sentence
        )
        owners.append(owner)
    return owners

def create_locations():
    locations = []
    for _ in range(5):
        location = Location(
            city=fake.city(),
            state=fake.state(),
            country=fake.country(),
            address=fake.address()
        )
        locations.append(location)
    return locations 

def create_boats(owners, locations):
    boats = []
    for _ in range(8):
        boat = Boat(
            make=fake.name(),
            model=fake.name(),
            price=rc(range(2000, 10000000)),
            description=fake.sentence(),
            owner_id=rc([owner.id for owner in owners]),
            location_id=rc([location.id for location in locations])
        )
        boats.append(boat)
    return boats 

if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")
        Location.query.delete()
        Owner.query.delete()
        Boat.query.delete()
        
        print('seeding owners....')
        owners = create_owners()
        db.session.add(owners)
        db.session.commit()
        
        print('seeding locations...')
        locations = create_locations()
        db.session.commit(locations)
        db.session.commit()
        
        print('seeding boats...')
        boats = create_boats
        db.session.add(boats)
        db.session.commit()
        
        print('done seeding')
