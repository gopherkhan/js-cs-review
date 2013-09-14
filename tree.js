
function Node(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}


var NULL_NODE = "~";

function buildNode(srcArray) {
	if (!srcArray || !srcArray.length) {
		return null;
	}
	var elem = srcArray.pop();
	if (elem == NULL_NODE) {
		return null;
	}
	var toRet = new Node(elem);
	toRet.left = buildNode(srcArray);
	toRet.right = buildNode(srcArray);

	return toRet;
}

function parseTree(toParse) {
	if (!toParse) {
		return;
	}
	// work with the elements in reverse, and just keep decrementing the array
	var elems = toParse.split(" ").reverse();
	return buildNode(elems);
}

function encodeTree(toEncode) {
	if (!toEncode) {
		return NULL_NODE;
	}
	var encoded = toEncode.val.toString();
	encoded += " " + encodeTree(toEncode.left) + " " + encodeTree(toEncode.right);
	return encoded.trim();
}


var rowRow = "2 11 52 ~ ~ 12 ~ ~ 23";
console.log(encodeTree(parseTree(rowRow)));

Function.prototype.binder = function(context) {
	var toCall = this;
	var arr = Array.prototype.slice.apply(arguments,[1]);
	return function() {
		toCall.apply(context, arr.concat(Array.prototype.slice.apply(arguments)));
	}
}