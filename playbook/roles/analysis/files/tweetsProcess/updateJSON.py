import getopt
import sys
import NBTraining
import time
import json
import re

classifier, vectorizer = NBTraining.generate_classifier()

try:
    opts, args = getopt.getopt(sys.argv[1:], 'n:f:', ['new=', 'file='])
except getopt.GetoptError:
    sys.exit(2)
for opt, arg in opts:
    if opt in ('-n', '--new'):
        new = arg
    elif opt in ('-f', '--filename'):
        filename = arg

out_f = open(new, 'w')
in_f = open(filename, 'r')

index = 0


def save_result(f, data):
    data = json.dumps(data)
    f.write(data)
    f.write('\n')


start = time.time()

for line in in_f:
    result = re.search('\{(.*)\}', line)
    if result:
        result = '{' + result.group(1) + '}'
        doc = json.loads(result)
        try:
            doc = doc['doc']
            index += 1
            id = doc['id']
            lang = doc['lang']
            tweet = doc['text']
            created_time = doc['created_at']
            coordinates = doc['coordinates']
            label = NBTraining.classify_tweet(tweet, vectorizer, classifier)
        except KeyError as e:
            print "Error in", doc
        else:
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

        save_result(out_f, data)

in_f.close()
out_f.close()
end = time.time()
print "time:", end-start
