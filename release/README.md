# How to cut a release?

1. Make sure everything you want to release is merged on master, and that you pulled it locally
2. From master, create a new branch for the release: `git checkout -b release-xxx`
3. Run `pnpm release`. You might need to pass arguments depending on what type of release you want to do.
   For example, to release a beta minor release, you have to run
   `pnpm release --release-as minor --prerelease beta`.
   Otherwise, it will choose the version number based on the type of commits that were made (fix, feat, etc.).
   Read [the guide](https://github.com/conventional-changelog/standard-version#cut-a-release) for more information.
   In any case, if you screw up, it's not a big deal: you haven't pushed anything yet, nor published the npm package to the registry.
4. You might want to check that the generated version in projects/ngx-valdemort/package.json.
   If something is wrong, you just need to delete the tag created by `pnpm release`, reset hard to master and start again.
5. Delete your dist directory (`rm -rf dist`) then run `pnpm lint`, `pnpm build`, `pnpm test`,
   `pnpm build:demo`, `pnpm test:demo` and `pnpm doc` to make sure everything is fine, and to produce the artefacts
   to release.
   The CI will also do it, but you'd better know sooner than later and check twice).
   You can test the produced library release by linking it (`cd dist/ngx-valdemort; pnpm link`) and using it
   in an external project: (in the project: `pnpm link ngx-valdemort`).
6. Push your branch to trigger a CI build, and ask for a review: you'd better be sure everything is fine:
   `git push -u origin release-xxx`, then create a PR.
7. If the CI build is fine, you can merge to master and push:
   `git checkout master; git merge release-xxx; git push --follow-tags`.
8. You can now publish the release. Remove your dist directory because it now contains an ngcc-compiled version
   of the library which may not be published, then rebuild, and publish: `rm -rf dist; pnpm build; npm publish ./dist/ngx-valdemort`.
   If you want to publish a beta version, make sure to add the required beta tag: `npm publish --tag beta dist/ngx-valdemort`
9. And publish the documentation and demo (gh-pages branch).
   Make sure you have an `ngx-valdemort.ninja-squad.com` folder as a sibling of the project folder:
   `git clone git@github.com:Ninja-Squad/ngx-valdemort.git ngx-valdemort.ninja-squad.com`.
   In the `ngx-valdemort.ninja-squad.com` directory, checkout the `gh-pages` branch:
   `git checkout gh-pages`.
   Then execute `pnpm build:demo` and `pnpm doc` in the main repository to generate the documentation,
   and the demo, delete the previous content (except for the CNAME file), and copy the `dist/demo/browser` folder to the `ngx-valdemort.ninja-squad.com/` folder.
   Add, commit and push everything:
   ```
   cd ngx-valdemort
   pnpm build:demo
   pnpm doc
   cd ../ngx-valdemort.ninja-squad.com
   rm -r *
   git checkout -- CNAME
   cp -r ../ngx-valdemort/dist/demo/browser/* ./
   cp -r ../ngx-valdemort/dist/demo/documentation ./
   git add .
   git commit -am "docs: release-xxx [ci skip]"
   git push
   ```
