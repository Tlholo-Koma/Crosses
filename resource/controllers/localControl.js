let isInlocalMode = false;


const setLocalMode = (bool) => isInlocalMode = bool;

const returnLocalMode = () => isInlocalMode;


module.exports = {returnLocalMode, setLocalMode};