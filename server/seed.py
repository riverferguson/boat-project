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
        
        
        l1 = Location(city='San Diego', state='California', country='USA')
        l2 = Location(city='Los Angeles', state='California', country='USA')
        l3 = Location(city='Morro Bay', state='California', country='USA')
        l4 = Location(city='Seattle', state='Washington', country='USA')
        
        locations = [l1, l2, l3, l4]
        db.session.add_all(locations)
        db.session.commit()
        
        
        o1 = Owner(first_name='River', last_name='Ferguson', bio='Hello, my name is River and I am a boat enthusiast with a vast love of for the ocean.', email='river@gmail.com', username='BigDawg69', password=generate_password_hash('12345', method='scrypt'))
        o2 = Owner(first_name='Jim', last_name='Lahey', bio='Hey my name is Jim, thanks for taking a look at my listing!', email='guy@gmail.com', username='Guy32', password=generate_password_hash('12345', method='scrypt'))
        o3 = Owner(first_name='Buddy', last_name='Lannister', bio='My name is Buddy and I am here to check out all the boats!', email='BuddyRunsPropane2U@comcast.net', username='Buddys Propane and Boats', password=generate_password_hash('12345', method='scrypt'))
        o4 = Owner(first_name='Dirk', last_name='Wilson', bio='Hello, I am Dirk and I am interested in buying a yacht', email='Dirk@yahoo.com', username='Dirk42', password=generate_password_hash('12345', method='scrypt'))
        o5 = Owner(first_name='Drew', last_name='Womble', bio='Hey, my name is Drew and I am looking into buying my first boat', email='drew@gmail.com', username='drew27', password=generate_password_hash('12345', method='scrypt'))
        
        owners = [o1, o2, o3, o4, o5]
        db.session.add_all(owners)
        db.session.commit()
        
        
        b1 = Boat(make='Boston Whaler', model='Cabin Cruiser', price = 20000, image='https://brunswick.scene7.com/is/image/brunswick/2021-405-2020-116?$TT-900-580-D$&fit=crop&fmt=png-alpha', description='With its sleek deep-V hull, wide beam and state-of-the-art Mercury Verado power, the award-winning Boston Whaler Conquest tackles both saltwater fishing and sophisticated entertaining with ease. Ample fishing amenities and cutting-edge technology at the helm lead to confident, successful offshore excursions, no matter what Mother Nature throws your way. Premium, fully adjustable seats turn the cockpit into a fantastic alfresco dining space, and a well-appointed cabin with enclosed head, galley and entertainment zone offers comfortable overnighting.', owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        b2 = Boat(make='Boston Whaler', model='Montauk', price = 40000, image='https://brunswick.scene7.com/is/image/brunswick/210_Montauk_Gallery5?$TT-900-580-D$&fit=crop&fmt=png-alpha&op_sharpen=0', description='The classic Boston Whaler Montauk remains one of the most popular center console boats out there, thanks to practical design, rugged utility and easy “hose-and-go” cleanup. But theres more than initially meets the eye: Just below surface level, a shallow draft enables quick planing and a stable, dry ride. Above, the roomy center console layout features ample storage space for everyones gear. Go fishing, go wakeboarding or just simply go. The Montauks time-tested design, trademark unsinkability and a host of comfort-minded details make it all possible.', owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        b3 = Boat(make='Grady White', model='Center Console', price = 200000, image='https://gradywhite.blob.core.windows.net/media/24622/fisherman-180-grady-white-18-foot-center-console-148_300.jpg', description='The best center console boat under 20-feet, the 18-foot Fisherman 180 offers numerous features and creature comforts not found on other boats its size. From the 11-gallon livewell to storage for up to 12 rods, the 180 is fishing ready but quickly transitions for family boating. A swim platform with port side ladder offers easy access to and from the water, and an optional ski pylon makes it perfect for water sports. Built on Grady-Whites award winning SeaV²® hull, this is the best riding 18-foot boat!', owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        b4 = Boat(make='Grady White', model='Fisherman 236', price = 30000, image='https://gradywhite.blob.core.windows.net/media/23789/fisherman-236-grady-white-23-foot-center-console-4068_300.jpg', description='The most feature-rich 23-foot center console, Grady-Whites Fisherman 236 is a superior fishing boat and more family friendly than any competitive models. Standard features that make this boat remarkable include a 15.5-gallon livewell, an oversized enclosed head, and a transom door that makes it easy to board fish or get in and out of the water from the swim platform. Gradys patented seating designs add comfort for up to 10 passengers. From the bow seating with forward facing foldaway backrests to the foldaway aft bench seat, theres room for everyone.', owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        b5 = Boat(make='Supra', model='SL', price = 30000, image='https://www.supraboats.com/wp-content/uploads/2022/08/SUPRA_MY23_SL_ProfileStills_WaterLine_45_0000-1024x576.png', description="Bold body lines and contouring surfaces convey unlimited power and performance, while the sculpted design streamlines the SLs appearance on the water. The overall presence brings confidence and attitude.", owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        b6 = Boat(make='Supra', model='SR', price = 30000, image='https://www.supraboats.com/wp-content/uploads/2022/07/SUPRA_SR_MY23_NorthwestCoastEnvironment_v007_Water_Level_Cam_45_0000-1024x576.png', description='Effortless wake performance connecting with everyday needs. The renowned capability of the SR can respond to your toughest demands', owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        b7 = Boat(make='Bayliner', model='Element M17', price = 30000, image='https://brunswick.scene7.com/is/image/brunswick/VR5OB?$BC-691-251-D$&fit=crop&fmt=jpg', description='We designed the evolutionary Bayliner Element M17 to be the start of something new. It combines a stunningly affordable price familiar automotive-style handling and class-leading stability and safety features. Plus it has the power and comfort features to get you to the fun spots and enjoy every minute.', owner_id=rc([owner.id for owner in owners]), location_id=rc([location.id for location in locations]))
        
        boats = [b1, b2, b3, b4, b5, b6, b7]
        db.session.add_all(boats)
        db.session.commit()
        print('...done seeding data')