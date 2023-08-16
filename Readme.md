
### Readme

An Express-JS app, that utilizes puppeteer to take screenshots of a website.\
Includes a dockerfile to run this app on Google Cloud Run. \
The compose-dev.yml file is used on to run the app in dev environment. 

### run in development machine

If you're going to run it with the included chromium in puppeteer, \ 
make sure to comment the `executablePath` in `puppeteer.launch

```
node server.js 
OR
npm run start

#with docker-compose
docker-compose -f compose-dev.yml down
docker-compose -f compose-dev.yml build
docker-compose -f compose-dev.yml up

#with Docker
docker build -t puppeteer-screenshot .
docker run -p 3000:3000 puppeteer-screenshot
```

### Changelogs

### 0.2.3

* updated Readme
* uncommented `executablePath` for cloud run

### 0.2.2

* added minimal args to puppeteer chrome launch

### 0.2.1

* fixed chrome install

### 0.2.0

* added headless chrome

### 0.1.0

* initial commit