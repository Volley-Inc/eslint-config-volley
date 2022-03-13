const { copyFileSync, constants } = require('fs');

function configure() {
  copyFileSync('test.txt', 'templatescopy.txt', constants.COPYFILE_EXCL);
  console.log('success');
}

configure();