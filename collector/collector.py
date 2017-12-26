from pymongo import MongoClient
import json
import feedparser
import pickle

# Helpers
def json_parser(file_str):
    '''
    Helper function to parse json files
    Input:
        - file_str - the file string
    Returns:
        - json file
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

        pickle.dumpp(data_dict, open('recent_pull.p', 'wb'))
        print 'Data written to the recent_pull.p file'



def main():
    config = json_parser('./config/config.json')
    local_copy = LocalCopy()
    
    if local_copy.check():
        print 'Local copy found.'
        content = local_copy.get_data()['data']
    else:
        print 'No local copy found. Pulling new feeds.'



if __name__ == "__main__":
    main()
    print "Done!"