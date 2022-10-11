## Development

The UI components come from the main Cherry repo and placed in `pacakges/app`(relative to the project root) as git submodule. So you will need to clone or update the submodule and build the UI components before work this extension. You can use these commands:

```bash
# run these commands from the **project root**

# init and update git submodule
git submodule init
git submodule update

# install deps, you will need to re-run this each time after update the submodule
pnpm i

# build cherry UI components
pnpm --filter cherry sync
pnpm --filter cherry package
```

Install dependencies

```bash
# install deps, this time run this in **pacakges/ext**
pnpm i

# pull icon images - I just don't like putting images like these icons into a source repo
node scripts/pull-icons.mjs
```

Firefox

```bash
# start build and watch
pnpm dev:firefox
# load ext in firefox
pnpm run:firefox

# debugging
# go to about:debugging > this firefox -> inspect this ext

# build for distribution, note the output assets is in dir `dist`
pnpm build:firefox
```

Chrome

```bash
# start build and watch
pnpm dev:chrome

# go to chrome://extensions, then load dir `dist` in chrome

# or
pnpm run:chrome

# build for distribution, note the output assets is in dir `dist`
pnpm build:chrome
```
