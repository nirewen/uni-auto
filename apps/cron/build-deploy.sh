docker container rm -f uni-auto_api
docker build --target prod -t uni-auto_api:latest .
docker run -p 8765:3001 -d --name uni-auto_api uni-auto_api
