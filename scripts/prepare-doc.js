var fs = require('fs');

['README.md', 'LICENSE.md', 'CHANGELOG.md'].forEach(fileName => {
  fs.createReadStream(fileName).pipe(fs.createWriteStream(`projects/ngx-valdemort/${fileName}`));
});
