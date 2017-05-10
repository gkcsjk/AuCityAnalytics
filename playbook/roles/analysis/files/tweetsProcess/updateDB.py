import couchdb
import getopt
import sys
import NBTraining
import time
import json

server = couchdb.Server('http://ccc:cloud@localhost:5984/')
classifier, vectorizer = NBTraining.generate_classifier()

try:
    opts, args = getopt.getopt(sys.argv[1:], 'c:f:', ['city=', 'file='])
except getopt.GetoptError:
    sys.exit(2)
for opt, arg in opts:
    if opt in ('-c', '--city'):
        city = arg
    elif opt in ('-f', '--filename'):
        filename = arg

db = server[city]
f = open(filename, 'w')
index = 0
count = 0
neutral = 0
pos = 0


def save_result(f, data):
    data = json.dumps(data)
    f.write(data)
    f.write('\n')


start = time.time()

for doc in db:
    index += 1
    doc = db[doc]
    id = doc['id']
    coordinates = doc['coordinates']
    lang = doc['lang']
    tweet = doc['text']
    created_time = doc['created_at']
    label = NBTraining.classify_tweet(tweet, vectorizer, classifier)

    if index%100 == 0:
        print "processing doc{}".format(index)
    data = {
        'id': id,
        'coordinates': coordinates,
        'lang': lang,
        'lable': label,
        'time': created_time,
        'text': tweet
    }

    save_result(f, data)

f.close()
end = time.time()
print "time:", end-start
