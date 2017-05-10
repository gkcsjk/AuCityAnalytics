import couchdb
import getopt
import sys
import time
import json
import re

server = couchdb.Server('http://ccc:cloud@127.0.0.1:5984/')

try:
    opts, args = getopt.getopt(sys.argv[1:], 'c:f:on', ['city=', 'file='])
except getopt.GetoptError:
    sys.exit(2)
for opt, arg in opts:
    if opt in ('-c', '--city'):
        city = arg
    elif opt in ('-f', '--filename'):
        filename = str(arg)
    elif opt == '-n':
        db = server.create(city)
    elif opt == '-o':
        db = server[city]


f = open(filename, 'r')
index = 0
start = time.time()
for line in f:
    index += 1
    try:
        tweet = json.loads(line)
    except IOError:
        print "loads error!"
    else:
        if index % 10 == 0:
            print "processing doc{0}".format(index)
        db.save(tweet)

f.close()
end = time.time()
print "time:", end-start
