from pymongo import MongoClient
import json
import numpy as np
from datetime import datetime

# HELPERS
def new_dt_logger(published):
    print 'New Datetime Fromat Detected: ' + published.encode()

# Classes
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
        # print 'Item updated: ' + gid

    def get_all(self):
        return self.collection.find()

    def get_one(self, gid):
        return self.collection.find_one({'gid':gid})


def calc_individual_score(published, upvotes):
    '''
        Calculates the score on which the articles are going to be sorted
    '''
    pub = published.encode().split()

    # There must be a smarter way of doing this.
    if len(pub) == 6:
        fmt = '%Y-%b-%d %H:%M:%S'
        pub_date_time = pub[3] + '-' + pub[2] + '-' + pub[1] + ' ' + pub[4]
    elif len(pub) == 1:
        fmt = '%Y-%m-%d %H:%M:%S'
        dt_split = pub[0].split('T')
        date = dt_split[0]
        time_split = dt_split[1].split('+')

        if len(time_split) == 2:
            time = time_split[0]

        elif len(time_split) == 1:
            time_ex_split = dt_split[1].split('.')

            if len(time_ex_split) == 2:
                time = time_ex_split[0]

            elif len(time_ex_split) == 1:
                if len(time_split[0].split('-')) == 2:
                    time = time_split[0].split('-')[0]

                elif len(time_split[0].split('-')) == 1:
                    time = time_split[0].split('-')[0].rstrip('Z')

                else:
                    new_dt_logger(published)
            else:
                new_dt_logger(published)
        else:
            new_dt_logger(published)

        pub_date_time = date + ' ' + time
    else:
        new_dt_logger(published)

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

    dbstring = json.loads(open('./config/config.json').read())['db']
    dbhandler = DBHandler(dbstring)
    # pull all articles from the db and update their score
    for article in dbhandler.get_all():
        sc = calc_individual_score(article['published'], article['upvotes'])
        dbhandler.update_article_score(article['gid'], sc)




if __name__ == "__main__":
    main()
    print 'Ranking complete.'