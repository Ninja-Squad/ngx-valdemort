var fs = require('fs');

// TODO add changelog
['README.md', 'LICENSE.md'].forEach(fileName => {
  fs.createReadStream(fileName).pipe(fs.createWriteStream(`projects/ngx-valdemort/${fileName}`));
});
