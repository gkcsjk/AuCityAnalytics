import couchdb
couch = couchdb.Server('https://ccc:cloud@localhost:5984/')

db = couch['adelaide_ans']

doc = db.design('adelaide_view')
view = doc.view('neg_time?reduce=true, startkey = "00", endkey == "01", groud = none')
print view