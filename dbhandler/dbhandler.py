from pymongo import MongoClient
from bson.objectid import ObjectId
import json


class DBHandler(object):
    '''
    Class for handling the DB connection.
    Has a method for uploading everything into the Database
    '''
    def __init__(self, connection_details):
        '''
            Input is a connection object containing key-value pairs
            * connection - the connection string
            * db - the article database
            * collection - the article collection
        '''
        _client = MongoClient(connection_details['connection'])
        _db = _client[connection_details['db']]
        self.collection = _db[connection_details['collection']]

    def update_zero_rank(self):
        '''
            NOT WORKING WITH CURRENT IMPLEMENTATION OF PYMONGO (3.6.0)
            Update all articles with rank 0.
        '''
        self.collection.updateMany({},{'$set':{'rank':0}}, upsert=False)


    def update_article_score(self, _id, score):
        '''
            Update the article in the database database.
        '''
        self.collection.update_one({'_id':ObjectId(_id)},{'$set':{'score':score}}, upsert=False)
        # print 'Item updated: ' + gid

    def update_article_rank(self, _id, rank):
        '''
            Update the rank of the article.
        '''
        self.collection.update_one({'_id':ObjectId(_id)},{'$set':{'rank':rank}}, upsert=False)
    
    def get_all(self):
        return self.collection.find()

    def get_one(self, id):
        return self.collection.find_one({'_id':ObjectId(id)})
    
    def get_min_score(self):
        '''
            Gets the article with the minimum score and rank 0 (no rank).
        '''
        return self.collection.find({'rank':0}).sort([('score',1)]).limit(1)
    
    def get_article_count(self):
        '''
            Gets the article count.
        '''
        return self.collection.count()
    
    def push_to_db(self, content):
        '''
            Pushes the content to the database
        '''
        self.collection.insert(content)
    
    def print_db_handler_version(self):
        '''
            Simple method to examine parsed variables
        '''
        print 'Version -- initial'


# For testing purposes
if __name__ == '__main__':
    db_config = json.loads(open('../config/config_service.json').read())
    dbhandler = DBHandler(db_config)