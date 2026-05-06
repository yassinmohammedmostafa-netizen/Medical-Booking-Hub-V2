#!/bin/bash

# Oracle VM / Ubuntu Setup Script for Medical Booking Hub
echo "🚀 Starting Medical Booking Hub VM Setup..."

# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker
echo "📦 Installing Docker..."
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Test Docker
sudo docker --version
sudo docker compose version

echo "✅ Docker installation complete!"
echo "👉 Next steps:"
echo "1. Clone your repo: git clone https://github.com/yassinmohammedmostafa-netizen/Medical-Booking-Hub-V2.git"
echo "2. Create a .env file with your DATABASE_URL, etc."
echo "3. Run: sudo docker compose up --build -d"
