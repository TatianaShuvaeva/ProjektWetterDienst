#! /bin/bash

# Create a virtual environment
apt -y install python3.11-venv
python3 -m venv .venv

# Activate the virtual environment
source .venv/bin/activate

# Install Python packages
pip install -r requirements.txt

# Access control disabled, clients can connect from any host
xhost +

# Install npm packages
npm install
