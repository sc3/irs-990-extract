# irs-990-extract
A command-line utility you can use to download, unzip, and transform IRS 990 data.

## Running
`node --harmony irs-990-extract.js` downloads and extract IRS 990 data to `data/`. If `--harmony` is not available, use `gulp compile` to transpile the code to ES5. Run the resulting code with `node target/irs-990-extract.js`.
