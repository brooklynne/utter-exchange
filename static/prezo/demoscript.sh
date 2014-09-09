#!/bin/bash
# copy these three lines, uncommenting the next one for post creation boot of this script
# wget http://goo.gl/Ox97xm -O - | bash

# install our stuff
sudo apt-get install git -y
sudo apt-get install monit -y
sudo git clone https://gist.github.com/a049d165012049855bf1.git /root/prezo

# monit script
sudo cat <<EOF > /etc/monit/conf.d/prezo
set httpd port 5150 and
    use address localhost
    allow localhost

set daemon 30
with start delay 5

check process ngrok matching "serve"
    start program = "/root/prezo/prezo.sh"
    stop program = "/usr/bin/killall screen"
EOF

# restart monit service
sudo service monit restart
sleep 2
sudo monit monitor all

