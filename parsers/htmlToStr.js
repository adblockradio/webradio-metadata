module.exports = function(str) {
	return str.replace(/&#039;/g, "’").replace(/&amp;/g, '&').trim();
}

/*var cleanMeta = function(meta) {
	return meta.replace(/\+/g, " ").replace(/-/g, "").replace(/  +/g, " ").replace(/\[ \]/g, " ").replace(/"/g, "");
}*/
