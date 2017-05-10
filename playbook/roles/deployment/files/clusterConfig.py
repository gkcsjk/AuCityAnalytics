#!/usr/bin/env python  
  
import os  
import sys  
import fileinput  
  
class Insert_line(object):  
  
    def __init__(self, file, keyword, newline):  
        self.__file = file  
        self.__key = keyword  
        self.__newline = newline  
  
    def _get_specify_lineno(self):  
        i = 1  
        try:  
            f = open("%s" % self.__file)  
        except IOError,e:  
            print e[1] + ' "%s"' % e.filename  
            sys.exit(1)  
        while True:  
            line = f.readline()  
            if not line: break  
            if "%s" % self.__key in line:  
                return i  
                break  
            i += 1  
        f.close()  
  
    def _inserted_newline_list(self):  
        if self._get_specify_lineno():  
            ls = os.linesep  
            f = open("%s" % self.__file)  
            li = f.readlines()  
            f.close()  
            li.insert(self._get_specify_lineno() - 1, self.__newline + ls )  
            return li  
  
    def inserted_new_file(self):  
        if self._inserted_newline_list():  
            lines = self._inserted_newline_list()  
            os.system("cp %s %s.bak" % (self.__file, self.__file))  
            f = open("%s" % self.__file, 'w')  
            f.writelines(lines)  
            f.close()  
        else:  
            print 'No such keyword "%s"' % self.__key  
  
def _main():  
    file = Insert_line("/usr/local/couchdb/etc/local.ini", ";port = 5984", "bind_address = 0.0.0.0")
    file.inserted_new_file()
    file = Insert_line("/usr/local/couchdb/etc/local.ini", ";admin = mysecretpassword", "ccc=cloud")
    file.inserted_new_file()
    file = Insert_line("/usr/local/couchdb/etc/local.ini", "[couch_peruser]", "database_dir = /couchdb/databases\nview_index_dir = /couchdb/views")
    file.inserted_new_file()
  
if __name__ == "__main__":  
    _main() 
