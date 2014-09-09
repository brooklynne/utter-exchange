#!/bin/bash

# called by monit to monitor serving presentation
cd /root/prezo
/usr/bin/screen -d -m /root/prezo/serve

