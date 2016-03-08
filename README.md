# irs-990-extract
A command-line utility you can use to download, unzip, and transform IRS 990 data.

Specific data used in this project was based off irs.gov data 990 Forms.
The link used to obtain this data is:
https://www.irs.gov/uac/SOI-Tax-Stats-Annual-Extract-of-Tax-Exempt-Organization-Financial-Data

## Running
`node --harmony irs-990-extract.js` downloads and extracts IRS 990 data to `data/`. If `--harmony` is not available, use `gulp compile` to transpile the code to ES5. Run the resulting code with `node target/irs-990-extract.js`.

