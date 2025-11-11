# EdgeTab
A fresh, modern and minimal new tab page for your browser.

[Download for Firefox](https://addons.mozilla.org/en-US/firefox/addon/edgetab) | [Download for Chrome](https://chromewebstore.google.com/detail/edgetab/lcmmpogmafbdcfgehjdapjoakhfhgmin)

## Development

Requires Node 22 and npm 10. Using the development server only works on Chrome, on Firefox you have to build and install the extension manually (see below)

1. Install `node_modules`

   ```
   npm i
   ```

2. Run the development server

   ```
   npm run dev
   ```

3. Install the browser extension as unpacked

## Building

Requires Node 22 and npm 10

1. Install `node_modules`

   ```
   npm i
   ```

2. Build the extension

   ```
   npm run build
   ```

   Alternatively, build for a specific platform

   ```
   npm run build:chrome
   npm run build:firefox
   ```

3. The extension package can be found in `./release/edgetab-*.zip`
