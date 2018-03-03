from pymongo import MongoClient
import json
import feedparser
import pickle

# Helpers
def json_parser(file_str):
    '''
        Helper function to parse json files.
        Takes the file_str file string as input and returns the json
    '''
    return json.loads(open(file_str).read())

class LocalCopy(object):
    '''
        Checks if local copy of the data exists and if it does - loads it
        Methods:
            - check - returns a binary of True-False whether a local copy exists
            - get_data - gets the data written to the loacl copy
            - save - input array - dump the data into the file
    '''
    def __init__(self):
        try:
            data = pickle.load(open('recent_pull.p', 'rb'))
        except IOError:
            self.exists = (False, 0)
        else:
            self.exists = (True, data)
    
    def check(self):
        return self.exists[0]
    
    def get_data(self):
        return self.exists[1]

    def save(self, array):
        
        data_dict = {
            'data': array
        }

        pickle.dump(data_dict, open('recent_pull.p', 'wb'))
        print 'Data written to the recent_pull.p file.'


class FeedHandler(object):
    '''
        The class handles the transformation from the source feeds and outputs
        a list of lists in the proper format to get uploaded to the database.
    '''
    def __init__(self, source, local=True):
        '''
            Init method
        '''
        if local:
            self.feeds = json_parser(source)
        else:
            '''
                TODO: Implementation when the sources are uploaded to a DB
            '''
            pass
            
    def __key_creator(self, published):
        '''
            Creates the key for the database. Not sure if nessecary
        '''
        char_array = list(published)
        hex_array = map(lambda x: x.encode('hex'), char_array)
        hex_key = "".join(hex_array)
        return hex_key

    def __is_published(self, entry):
        '''
            Checks if the article has a published space
        '''
        try:
            published = entry['published']
        except KeyError:
            return False
        else:
            return True

    def __format_entry(self, entry, category):
        '''
            Formats the article so it can be safely parsed to the database.
        '''
        if self.__is_published(entry):
        # Checks if the article has a published field
            return {
                'published': entry['published'],
                'gid': self.__key_creator(entry['published']),
                'title': entry['title'],
                'url': entry['link'],
                'category': category,
                'upvotes': 0, #Initiate upvotes
                'rank': 0, #Initate the rank to 0,
                'score':0, #Initiate the article score at 0
                'submitted_by':'system'
            } 

    def __parse_feed(self, url, category):
        '''
            Parses the feeds using the feedparser module
            to the appropriate mode.
        '''
        raw_feed = feedparser.parse(url)
        feed_content = []
        for entry in raw_feed['entries']:
            feed_content.append(self.__format_entry(entry, category))
        
        return feed_content

    def exprort_data(self):
        '''
            Exports the parsed feeds in the appropriate format.
        '''
        content_array = []
        for cat in self.feeds:
            category = cat['category']
            for item in cat['feeds']:
                url = item['item']['xmlUrl']
                feed_content = self.__parse_feed(url, category)
                content_array += feed_content
        
        content_array = filter(None, content_array)
        return content_array


class DBHandler(object):
    '''
    Class for handling the DB connection.
    Has a method for uploading everything into the Database
    '''
    def __init__(self, connection):
        _client = MongoClient(connection)
        _db = _client.eswatch
        self.collection = _db.articles

    def push_to_db(self, content):
        self.collection.insert(content)



def main():
    '''
        Executes everything...
    '''
    config = json_parser('./config/config.json')
    local_copy = LocalCopy()
    
    sources = config['sources']
    db_string = config['db']

    if local_copy.check():
        print 'Local copy found.'
        content = local_copy.get_data()['data']
    else:
        print 'No local copy found. Pulling new feeds.'
        feed = FeedHandler(sources)
        content = feed.exprort_data()
        local_copy.save(content)
    
    db_handler = DBHandler(db_string)
    db_handler.push_to_db(content)


if __name__ == "__main__":
    main()
    print "Done!"