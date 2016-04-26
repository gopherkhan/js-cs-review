function LinkedList() {
  var length = 0;
  var HEAD;

  function add(val) {
    var newNode = new ListNode(val);
    if (!HEAD) {
      HEAD = newNode;
      return;
    }

    var node = HEAD;
    while (node.hasNext()) {
      node = node.next();
    }
    node.setNext(newNode);
    ++length;
  }

  function reverse() {
    _recursiveReverse(HEAD)
  }

  function _recursiveReverse(node) {
    if (!node.hasNext()) {
      HEAD = node;
      return node;
    }
    var rightSide = node.unhook();
    var reversedTail = _recursiveReverse(rightSide);
    reversedTail.setNext(node);
    return node;
  }

  function getLength() {
    return length;
  }

  function toString() {
    var node = HEAD;
    var str = "";
    if (!node) { return str; }

    do {
      str += node.val() + ", ";
      node = node.next();
    } while (node);

    return str.substring(0, str.length - 2);
  }

  return {
    length: getLength,
    add: add,
    toString: toString,
    reverse: reverse
  };

  function ListNode(val) {
    var nextNode, val;

    function hasNext() {
      return !!nextNode;
    }

    function setNext(toSet) {
      nextNode = toSet;
    }

    function next() {
      return nextNode;
    }

    function getVal() {
      return val;
    }

    function unhook() {
      var oldNext = nextNode;
      nextNode = null;
      return oldNext;
    }

    return {
      val: getVal,
      next: next,
      hasNext: hasNext,
      setNext: setNext,
      unhook: unhook
    };
  }
}
