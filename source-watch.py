from collector import collector
from ranking import ranking
from dbhandler.dbhandler import DBHandler
import json

if __name__ == "__main__":

    db_config = json.loads(open('./config/config_service.json').read())
    feed_source_path = './config/feed_sources.json'
    ranking_config = json.loads(open('./config/config_ranking.json').read())

    dbhandler = DBHandler(db_config)
    
    collector.main(dbhandler, feed_source_path)
    ranking.main(dbhandler, ranking_config)

    print "Done"

    # collector.main()
    # ranking.main()