const path = require('path');
const fs = require('fs');
const solc = require('solc');

const filePath = path.resolve(__dirname, 'Contracts', 'Lottery.sol');

//console.log(filePath);
const source = fs.readFileSync(filePath, "utf8");
//console.log(source);

//console.log(solc.compile(source, 1).contracts[':HelloWorld']);
module.exports = solc.compile(source, 1).contracts[':Lottery'];
