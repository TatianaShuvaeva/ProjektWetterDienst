# Use the cypress/included image as the base
FROM cypress/included:13.16.1

# Install Python
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Set Python3 as the default python
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1
