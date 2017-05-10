#!/usr/bin/python
import sys
import os
import fileinput
ip=filter(lambda ch: ch in '0123456789.', str(sys.argv[1]))
for line in fileinput.input("/usr/local/couchdb/etc/vm.args",inplace=1):
     print line.replace("-name couchdb@localhost","-name couchdb@" + str(ip))
for line in fileinput.input("/usr/local/couchdb/etc/default.ini",inplace=1):
     print line.replace("q=8","q=4")
for line in fileinput.input("/usr/local/couchdb/etc/default.ini",inplace=1):
     print line.replace("n=3","n=2")
