# openaq-metadata-editor
[![Build Status](https://travis-ci.org/openaq/openaq-metadata-editor.svg?branch=master)](https://travis-ci.org/openaq/openaq-metadata-editor)

An editor for OpenAQ station metadata.

## Dev dependencies 

- [gulp](https://github.com/gulpjs/gulp)
- [nvm](https://github.com/nvm-sh/nvm#install-script)

## Getting started

1. Install [nvm](https://github.com/nvm-sh/nvm#install-script) 
2. Run `nvm use` and `nvm install` to install the correct version of node for the project
3. Run `npm install` to install node modules 
4. Install gulp globally `npm install -g gulp`
5. Run `gulp serve` to start project 

### Troubleshooting: 

- If you run into issues running `gulp serve`, you may not have the correct version of node or gulp. Please make sure you follow the steps using `nvm` above in "Getting started"

- If you follow the steps above and `gulp serve` is still not running, try tunning `npm rebuild node-sass
`. More info on this solution [here](https://stackoverflow.com/questions/55921442/how-to-fix-referenceerror-primordials-is-not-defined-in-node/58022933#58022933)