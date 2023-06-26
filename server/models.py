from sqlalchemy_serializer import SerializerMixin

from config import *
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy


class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'
    
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String)
    state = db.Column(db.String)
    country =  db.Column(db.String)
    address = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    def __repr__(self):
        return f'<Location {self.id}: {self.address}>'
    
class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    def __repr__(self):
        return f'<Owner {self.id}: {self.name}'
    

    
