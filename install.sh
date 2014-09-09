#!/bin/bash

# name: install.sh
# description: install script for utter.io prezo
# author: kordless@utter.io

# install dependencies and services
apt-get install git -y

# check out the prezo
git clone https://github.com/StackMonkey/utter-exchange.git

# move into prezo and start webserver
cd utter-exchange/static/prezo/
python -m SimpleHTTPServer 80 
