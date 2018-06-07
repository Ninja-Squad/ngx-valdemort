var fs = require('fs');

// TODO add CHANGELOG.md
['README.md', 'LICENSE.md'].forEach(fileName => {
  fs.createReadStream(fileName).pipe(fs.createWriteStream(`projects/ngx-valdemort/${fileName}`));
});
