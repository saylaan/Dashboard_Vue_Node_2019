# How To build Server

> A Node.JS back end for project DEV_dashboard_2019 - EPITECH

## Setup

### Choose your package.json depending on your os (Windows/Linux)

``` bash

# Delete the package.json
rm -rf package.json

# Windows
move packageWindow package.json

# Linux

move packageLinux package.json

```

### Build Setup

``` bash
# install dependencies
npm install

# seed database before launch
npm run seed

# launch server 
npm start

```