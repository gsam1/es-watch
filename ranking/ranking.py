from pymongo import MongoClient
from bson.objectid import ObjectId
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
    

class Ranking(object):
    '''
        It updates the score of the articles ands ranks them
    '''
    def __init__(self, db_con_string):
        self._dbhandler = DBHandler(db_con_string)
    
    def _calc_individual_score(self, published, upvotes):
        '''
            Calculates the score on which the articles are going to be sorted
        '''
        pub = published.encode().split()

        # TODO: There must be a smarter way of doing this.
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

    def scoring(self):
        '''
            Score all articles in the database
        '''
        print 'Scoring Began at: ' + str(datetime.now())

        for article in self._dbhandler.get_all():
            sc = self._calc_individual_score(article['published'], article['upvotes'])
            # Update the article to have 0 rank
            self._dbhandler.update_article_rank(article['_id'], 0)
            # Update the score
            self._dbhandler.update_article_score(article['_id'], sc)
        
        print 'Scoring Complete at: ' + str(datetime.now())

    def rank(self):
        '''
            Rank all articles in the database
        '''
        print 'Ranking Begant at: ' + str(datetime.now())
        max_rank = self._dbhandler.get_article_count()
        
        for i in xrange(1,max_rank+1):
            article_without_rank = list(self._dbhandler.get_min_score())[0]
            self._dbhandler.update_article_rank(article_without_rank['_id'],i)

        print 'Ranking Complete at: ' + str(datetime.now())


def main():
    '''
        Executes the ranking algorithm
    '''
    dbstring = json.loads(open('./config/config.json').read())['db']

    ranking = Ranking(dbstring)
    ranking.scoring()
    ranking.rank()


if __name__ == "__main__":
    main()
    print 'Ranking complete.'