
### Readme

An Express-JS app, that utilizes puppeteer to take screenshots of a website.

### run in development machine

```
node server.js 
OR
npm run start
```

### deployment & docker builds

``` 
docker build -t puppeteer-screenshot .
docker run -p 3000:3000 puppeteer-screenshot

docker-compose -f compose-dev.yml down
docker-compose -f compose-dev.yml build
docker-compose -f compose-dev.yml up
```

### Changelogs

### 0.2.2

* added minimal args to puppeteer chrome launch

### 0.2.1

* fixed chrome install

### 0.2.0

* added headless chrome

### 0.1.0

* initial commit