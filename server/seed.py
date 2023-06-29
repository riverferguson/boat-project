#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import Owner, Location, Boat
import datetime 
from werkzeug.security import generate_password_hash

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db

# fake = Faker()

# def create_owners():
#     owners = []
#     for _ in range(5):
#         owner = Owner(
#             first_name=fake.name(),
#             last_name=fake.name(),
#             bio=fake.sentence(),
#             created_at=randint(1, 24),
#             updated_at=randint(1, 24)
#         )
#         owners.append(owner)
#     return owners

# def create_locations():
#     locations = []
#     for _ in range(5):
#         location = Location(
#             city=fake.city(),
#             state=fake.state(),
#             country=fake.country(),
#             address=fake.address(),
#             created_at=randint(1, 24),
#             updated_at=randint(1, 24)
#         )
#         locations.append(location)
#     return locations 

# def create_boats(owners, locations):
#     boats = []
#     for _ in range(8):
#         boat = Boat(
#             make=fake.name(),
#             model=fake.name(),
#             price=rc(range(2000, 10000000)),
#             image=fake.name(),
#             description=fake.sentence(),
#             owner_id=rc([owner.id for owner in owners]),
#             location_id=rc([location.id for location in locations]),
#             created_at=randint(1, 24),
#             updated_at=randint(1, 24)
#         )
#         boats.append(boat)
#     return boats 

if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")
        Location.query.delete()
        Owner.query.delete()
        Boat.query.delete()
        
        # print('seeding locations...')
        # locations = create_locations()
        # db.session.add_all(locations)
        # db.session.commit()
        
        
        # print('seeding owners....')
        # owners = create_owners()
        # db.session.add_all(owners)
        # db.session.commit()
        
        # print('seeding boats...')
        # boats = create_boats()
        # db.session.add_all(boats)
        # db.session.commit()
        
        # print('done seeding')
        
        
        l1 = Location(city='San Diego', state='California', country='USA', address='123 shithead lane')
        l2 = Location(city='Los Angeles', state='California', country='USA', address='123 spooner lane')
        l3 = Location(city='Morro Bay', state='California', country='USA', address='123 creek lane')
        l4 = Location(city='Seattle', state='Washington', country='USA', address='123 broad lane')
        
        locations = [l1, l2, l3, l4]
        db.session.add_all(locations)
        db.session.commit()
        
        
        o1 = Owner(first_name='River', last_name='Ferguson', bio='lets buy a boat', email='river@gmail.com', username='BigDawg69', password=generate_password_hash('12345', method='scrypt'))
        o2 = Owner(first_name='Guy', last_name='Buddy', bio='lets buy another boat', email='guy@gmail.com', username='Guy32', password=generate_password_hash('12345', method='scrypt'))
        o3 = Owner(first_name='Buddy', last_name='Guy', bio='lets buy even another boat', email='BuddyRunsPropane2U@comcast.net', username='Buddys Propane and Boats', password=generate_password_hash('12345', method='scrypt'))
        o4 = Owner(first_name='Dirk', last_name='Diggler', bio='Captian of the shit ship', email='Dirk@yahoo.com', username='Dirk42', password=generate_password_hash('12345', method='scrypt'))
        o5 = Owner(first_name='Drew', last_name='Womble', bio='Im poor and own no ships', email='drew@gmail.com', username='drew27', password=generate_password_hash('12345', method='scrypt'))
        
        owners = [o1, o2, o3, o4, o5]
        db.session.add_all(owners)
        db.session.commit()
        
        
        b1 = Boat(make='Bayliner', model='Cruiser', price = 200000, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPGlsFFpgOvBxF8lGopXJO82TU99-rQIdCJw&usqp=CAU', description='just some boat', owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        b2 = Boat(make='Boston Whaler', model='Cruiser', price = 400000, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPGlsFFpgOvBxF8lGopXJO82TU99-rQIdCJw&usqp=CAU', description='just some boat', owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        b3 = Boat(make='Carver', model='Yacht', price = 2000000, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPGlsFFpgOvBxF8lGopXJO82TU99-rQIdCJw&usqp=CAU', description='just some boat', owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        b4 = Boat(make='Malibu', model='Tow-boat', price = 300000, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPGlsFFpgOvBxF8lGopXJO82TU99-rQIdCJw&usqp=CAU', description='just some boat', owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        
        boats = [b1, b2, b3, b4]
        db.session.add_all(boats)
        db.session.commit()
        print('...done seeding data')