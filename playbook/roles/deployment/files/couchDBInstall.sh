yes Y y | sudo apt update
yes Y y | sudo apt upgrade
yes Y y | sudo apt-get --no-install-recommends -y install \
    build-essential pkg-config erlang \
    libicu-dev libmozjs185-dev libcurl4-openssl-dev
yes Y y | wget http://mirror.ventraip.net.au/apache/couchdb/source/2.0.0/apache-couchdb-2.0.0.tar.gz
yes Y y | tar -xvf apache-couchdb-2.0.0.tar.gz
cd apache-couchdb-2.0.0
yes Y y | ./configure && make release
sudo adduser --system \
        --no-create-home \
        --shell /bin/bash \
        --group --gecos \
        "CouchDB Administrator" couchdb
sudo cp -R rel/couchdb /usr/local/
sudo chown -R couchdb:couchdb /usr/local/couchdb
sudo find /usr/local/couchdb -type d -exec chmod 0770 {} \;
sudo chmod 777 /usr/local/couchdb -R
echo couchdb:couchdb|sudo chpasswd
sudo rm /home/ubuntu/apache-couchdb-2.0.0.tar.gz

