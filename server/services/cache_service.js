const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const setCache = (key, value) => myCache.set(key, value);

const getCache = key => myCache.get(key);

const hasCache = key => myCache.has(key);

const takeCache = key => myCache.take(key);

module.exports = { setCache, getCache, hasCache, takeCache };
