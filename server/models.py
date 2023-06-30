from sqlalchemy_serializer import SerializerMixin

from config import *
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy



class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'
    
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String)
    state = db.Column(db.String)
    country =  db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    boats = db.relationship('Boat', back_populates='location')

    serialize_only = ('id', 'city', 'state', 'country')
    
    @validates('city')
    def validate_city(self, key, city):
        if not city:
            raise ValueError("City is required")
        return city 
    
    @validates('state')
    def validate_state(self, key, state):
        if not state:
            raise ValueError("State is required")
        return state
    
    @validates('country')
    def validate_country(self, key, country):
        if not country:
            raise ValueError("Country is required")
        return country
        
    def __repr__(self):
        return f'<Location {self.id}>'
    
class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    bio = db.Column(db.String)
    email = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    boats = db.relationship('Boat', back_populates='owner')
    serialize_only = ('id', 'first_name', 'last_name', 'bio', 'email', 'username', '-password')
    
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name must be present")
        return name 
    
    @validates('bio')
    def validate_bio(self, key, bio):
        if not bio:
            raise ValueError("Bio must be present")
        return bio
    
    def __repr__(self):
        return f'<Owner {self.id}: {self.username}'
    
class Boat(db.Model, SerializerMixin):
    __tablename__ = 'boats'
    
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String)
    model = db.Column(db.String)
    price = db.Column(db.Integer)
    image= db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    
    owner = db.relationship('Owner', back_populates='boats')
    location = db.relationship('Location', back_populates='boats')
    
    serialize_only = ('id', 'make', 'model', 'price', 'image', 'description', 'owner_id', 'location_id', 'location', 'owner')
    
    @validates('make')
    def validate_make(self, key, make):
        if not 1 <= len(make) <= 30:
            raise ValueError("Make must be between 1 and 30 characters")
        return make 
    
    @validates('model')
    def validate_model(self, key, model):
        if not 1 <= len(model) <= 50:
            raise ValueError("Model must be between 1 and 50 characters")
        return model
    
    @validates('price')
    def validates_price(self, key, price):
        if not 1 <= price <= 1000000000000:
            raise ValueError("Price must be greater than $1.00")
        return price
    
    @validates('description')
    def validates_description(self, key, description):
        if not description:
            raise ValueError("Description must be present")
        return description
    
    def __repr__(self):
        return f'<Boat {self.id}: {self.make} {self.model}'