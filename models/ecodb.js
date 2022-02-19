const { EconomyManager } = require('quick.eco');
const eco = new EconomyManager({
    adapter: 'sqlite',
    adapterOptions: {
        filename: 'data' // => data.sqlite
    }    
});
module.exports = Object.freeze({
    eco: eco
  });