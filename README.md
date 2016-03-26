# irs-990-extract
A command-line utility you can use to download, unzip, and transform IRS 990 data.

Specific data used in this project was based off irs.gov data 990 Forms.
The link used to obtain this data is:
https://www.irs.gov/uac/SOI-Tax-Stats-Annual-Extract-of-Tax-Exempt-Organization-Financial-Data

## Running
`node --harmony irs-990-extract.js` downloads and extracts IRS 990 data to `data/`. If `--harmony` is not available, use `gulp compile` to transpile the code to ES5. Run the resulting code with `node target/irs-990-extract.js`.

## Running
This will download, unzip and convert your data in one go.
`node app.js <file url> <file url> <file...`

`npm start <file url> <file url> <file...` #Run at 8GB memory allotment

##Download Functionality

`node app.js download <file url> <file url> <file...`

`npm start download <file url> <file url> <file...` #Run at 8GB memory allotment

Example: `node app.js download https://www.irs.gov/pub/irs-soi/14eofinextract990.zip https://www.irs.gov/pub/irs-soi/14eofinextract990ez.zip`

Just "Copy Link Location" to your terminal.  This will save the files in your data dirctory under the file name.

##Unzip Functionality
When unzipping files, the command takes no arguments.  It will look through the data directory and unzip any .zip files it locates.

`node app.js unzip`  

`npm start unzip`  #Run at 8GB memory allotment 


##Convert .dat To .json Functionality
When converting files, the command takes no arguments.  It will look through the data directory and convert any .dat files it locates. Due to V8 having a string length limit and Node having a default of 512MB memory alloted.  The files are cut into sections of 50,000 lines per file and named in a numberic sequential order. 

`node app.js convert`  

`npm start convert`  #Run at 8GB memory allotment

#### For files exceeding Node's 512MB memory default.

`node --max-old-space-size=1024 app.js convert` #increase to 1gb

`node --max-old-space-size=2048 app.js convert` #increase to 2gb

`node --max-old-space-size=3072 app.js convert` #increase to 3gb

`node --max-old-space-size=4096 app.js convert` #increase to 4gb

`node --max-old-space-size=5120 app.js convert` #increase to 5gb

`node --max-old-space-size=6144 app.js convert` #increase to 6gb

`node --max-old-space-size=7168 app.js convert` #increase to 7gb

`node --max-old-space-size=8192 app.js convert` #increase to 8gb
