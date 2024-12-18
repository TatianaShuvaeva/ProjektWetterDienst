#! /bin/bash

# Create a virtual environment
apt -y install python3.11-venv
python3 -m venv .venv

# Activate the virtual environment
source .venv/bin/activate

# Install Python packages
pip install -r requirements.txt

# Install cypress
apt-get update
apt-get -y install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
npx cypress install

# export DISPLAY=host.docker.internal:0.0

# Access control disabled, clients can connect from any host
xhost +

# Install npm packages
npm install
