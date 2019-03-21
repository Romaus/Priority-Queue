const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize ? maxSize : 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.maxSize > this.heap.sizeHeap) {
			this.heap.push(data, priority);
		}
		else {
			throw 'error';
		}
	}

	shift() {
		if (this.heap.sizeHeap > 0) {
		return this.heap.pop();
		}
		else {
			throw 'error';
		}
	}

	size() {
		return this.heap.sizeHeap
	}

	isEmpty() {
		return this.heap.sizeHeap > 0 ? false : true;
	}
}

module.exports = PriorityQueue;
