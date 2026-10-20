module.exports = {
  scripts: {
    // Format the generated changelog before the release commit; the release script runs from projects/ngx-valdemort.
    postchangelog: 'pnpm --dir ../.. exec oxfmt --write CHANGELOG.md'
  }
};
