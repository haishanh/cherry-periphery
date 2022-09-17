## Development

The UI components come from the main Cherry repo and placed in `pacakges/app`(relative to the project root) as git submodule. So you will need to clone or update the submodule and build the UI components before work this extension. YOu can use below command:

```bash
# run this from the project root
pnpm cherry
```

Install dependencies:

```bash
# run this in pacakges/ext
pnpm i
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
