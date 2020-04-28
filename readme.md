# Very simple web scraper for the SNPP distance courses website

## How it works
This script works by crawling the courses offered on the website https://www.snpp.edu.py/

## Requirements
- node
- npm || yarn
- git

## Installation

### Clone the repository

```bash
$ git clone git@github.com:hbarral/snpp-courses-scraper.git snpp-courses-scraper
```

### Install NPM dependencies

```bash
$ cd snpp-courses-scraper
$ npm i
```

### Configurations

```bash
$ cp .env.example .env
```
Define your own credentials within the `.env` file

## Usage
```bash
$ node index.js
```

The result can be seen in the file `courses.json` and also in` courses.csv`

## TODO
- [ ] choose the output format
- [ ] save in database
- [ ] frontend
