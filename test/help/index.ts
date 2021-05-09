export function fixBin(a) {
	return stripZero(mergeToBin(a));
}

export function fixText(encodeData) {
	if (Array.isArray(encodeData)) {
		var ret = '';
		for (var i = 0; i < encodeData.length; i++) {
			ret += fixText(encodeData[i]);
		}
		return ret;
	} else {
		return encodeData.text || '';
	}
}

export function mergeToBin(encodeData) {
	if (Array.isArray(encodeData)) {
		var ret = '';
		for (var i = 0; i < encodeData.length; i++) {
			ret += toBin(encodeData[i].data);
		}
		return ret;
	} else {
		return toBin(encodeData);
	}
}

export function toBin(res) {
	var ret = '';
	for (var i = 0; i < res.length; i++) {
		if (res[i] > 0) {
			ret += '1';
		} else {
			ret += '0';
		}
	}
	return ret;
}

export function stripZero(string) {
	return string.match(/^0*(.+?)0*$/)[1];
}
