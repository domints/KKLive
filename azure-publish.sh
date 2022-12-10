#!/bin/bash
cd ~/deploy_temp/kklive && \
echo "Removing old app" && \
rm -rf /var/www/kklive/* && \
echo "Old version removed. Unzipping artifacts" && \
tar -xzf artifact.tar.gz -C /var/www/kklive && \
echo "Artifacts unzipped. Deployment script finished!"