/** 
 * Some basic tests of linkedLists in javascript
 * By Chris Nelson
 */

function Node(aVal) {
	var val = aVal;
	var next;

	function hasNext() {
		return !!next;
	}

	function setNext(toSet) {
		next = toSet;
	}

	function getVal() {
		return val;
	}

	function setVal(toSet) {
		val = toSet;
	}

	function getNext() {
		return next;
	}
	
	// encapsulating for fun
	return {
		"getNext": getNext,
		"hasNext": hasNext,
		"setNext": setNext,
		"getValue": getVal,
		"setValue": setVal
	}
}


function LinkedList() {
	var head;
	function append(toAppend) {
		var node = new Node(toAppend);
		if (!head) {
			head = node;
			return;
		}
		var target = head;
		while (target.hasNext()) {
			target = target.getNext();
		}
		target.setNext(node);
		console.log(toString());
 	}

	function toString() {
		var str = "";
		if (!head) { return str; }
		var node = head;
		var elems = [];
		do {
			elems.push(node.getValue());
			node = node.getNext();
		} while (node);
		str = elems.join(", ");
		return str;
	}

	function reverseList() {
		var oldHead = head;
		head = reverse(oldHead);
		console.log(toString());
	}

	function reverse(node) {
		if (!node || !node.hasNext()) {
			return node;
		}

		// grab the next item down in the list
		// this will be the new tail of the reversed list
		var nextItem = node.getNext();
		// clear out our current node's next link
		node.setNext(null);

		// reverse the remainder
		var reversed = reverse(nextItem);

		// set our nextItem's next link to our current node
		nextItem.setNext(node);

		return reversed;
	}

	function reverseListStack() {
		if (!head) { return; }

		var node = head;
		head = null;
		var listElems = [];

		while (node) {
			// we could clear out the 'next' references here, 
			// but it doesn't really do anything for us
			listElems.push(node);
			node = node.getNext();
		}

		// our new head is the old tail
		node = head = listElems.pop();

		while (listElems.length) {
			node.setNext(listElems.pop());
			node = node.getNext();
		}

		node.setNext(null); // new tail node

		console.log(toString());
	}

	return {
		"append": append,
		"reverse": reverseList,
		"reverseStack": reverseListStack,
		"toString": toString
	}
}

var ll = new LinkedList();
ll.append("first");
ll.append("second");
ll.append("third");
ll.reverse();

ll.append("1st");
ll.append("2nd");
ll.append("3rd");
ll.reverseStack();