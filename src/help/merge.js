export default merge;

function merge(old, replaceObj) {
	var newMerge = {};
	var k;
	for (k in old) {
		if (old.hasOwnProperty(k)) {
			newMerge[k] = old[k];
		}
	}
	for (k in replaceObj) {
		if(replaceObj.hasOwnProperty(k) && typeof replaceObj[k] !== "undefined"){
			newMerge[k] = replaceObj[k];
		}
	}
	return newMerge;
}
