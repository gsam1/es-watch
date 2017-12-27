from pymongo import MongoClient
import json
import numpy as np
from datetime import datetime

class DBHandler(object):
    '''
    Class for handling the DB connection.
    Has a method for uploading everything into the Database
    '''
    def __init__(self, connection):
        _client = MongoClient(connection)
        _db = _client.eswatch
        self.collection = _db.articles

    def update_article_score(self, gid, score):
        '''
            Update the article in the database database
        '''
        self.collection.update_one({'gid':gid},{'$set':{'score':score}}, upsert=False)
        print 'Item updated'

    def get_all(self):
        return self.collection.find()

    def get_one(self, gid):
        return self.collection.find_one({'gid':gid})


def calc_individual_score(published, upvotes):
    '''
        Calculates the score on which the articles are going to be sorted
    '''
    pub = published.encode().split()
    fmt = '%Y-%b-%d %H:%M:%S'
    pub_date_time = pub[3] + '-' + pub[2] + '-' + pub[1] + ' ' + pub[4]
    d1 = datetime.now()
    d2 = datetime.strptime(pub_date_time, fmt)
    time_diff = d1 - d2
    min_diff = time_diff.days*24*60 + time_diff.seconds / 60

    # Score Calc algorithm
    wd = 1 # Weighting on the date
    wu = 1 # Weighting on the upvotes
    random_factor = np.random.normal(0, 0.1)
    score = min_diff * wd - upvotes * wu + random_factor

    return score

def main():
    '''
        Executes the ranking algorithm
    '''
    # Pull the data from the database
    # Rank it based on 
    dbstring = json.loads(open('./config/config.json').read())['db']
    dbhandler = DBHandler(dbstring)
    # 5a43e36b5c59736a447b1802
    ar = dbhandler.get_one('5468752c2031342044656320323031372031353a32383a3234202b30303030')
    calc_individual_score(ar['published'], 0)
    






if __name__ == "__main__":
    main()
    print 'Ranking complete.'