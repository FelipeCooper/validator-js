const fs = require('fs')
const validators = []

fs.readdirSync(__dirname).forEach(file => {
  if(file === "index.js") return;
  const pathFile = './'.concat(file)
  validators.push(require(pathFile))
});

module.exports = validators