'use strict';
// Summary:
//  Build for production

const path = require('path');
const shell = require('shelljs');
const helpers = require('./helpers');

const webpack = require('webpack');
const config = require('../webpack.dist.config');
config.warnings = true;

// Clean folder
const buildFolder = path.join(__dirname, '../build');
shell.rm('-rf', buildFolder);
shell.mkdir(buildFolder);
shell.mkdir(`${buildFolder}/static`);

const timestamp = require('crypto')
  .createHash('md5')
  .update(new Date().getTime().toString())
  .digest('hex')
  .substring(0, 10);

const lines = helpers.getLines(path.join(__dirname, '../src/index.html'));
helpers.removeLines(lines, '/_tmp/vendors.dll.js');
let indexHtml = lines.join('\n');
indexHtml = indexHtml.replace('/static/main.bundle.js', `/static/main.bundle.js`);
shell.ShellString(indexHtml).to(path.join(buildFolder, 'index.html'));

const start = new Date().getTime();
webpack(config, (err) => {
  if (err) console.log(err);
  else {
    shell.mv(path.join(buildFolder, './static/main.bundle.js'), path.join(buildFolder, `/static/main.bundle.js`));
    const end = new Date().getTime();
    console.log('Done, build time: ', end - start, 'ms');
  }
});

