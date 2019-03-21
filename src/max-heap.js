const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.sizeHeap = 0;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.root != null) {
			let poped = this.detachRoot();
			this.restoreRootFromLastInsertedNode(poped);
			this.shiftNodeDown(this.root);
			this.sizeHeap--;
			return poped.data;
		}
	}

	detachRoot() {
		let index = this.parentNodes.indexOf(this.root);
		if (index != -1) {
			this.parentNodes.splice(index, 1);
		}
		const root = this.root;
		this.root = null;
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
		this.parentNodes.pop();
		if ((lastInsertedNode != undefined)){
			if ((lastInsertedNode.parent != detached) && (this.parentNodes.indexOf(lastInsertedNode.parent) == -1)) {
				this.parentNodes.unshift(lastInsertedNode.parent);
			}
			if ((lastInsertedNode.parent != null) && (lastInsertedNode.parent.left == lastInsertedNode)) {
				lastInsertedNode.parent.left = null;
			}
	
			if ((lastInsertedNode.parent != null) && (lastInsertedNode.parent.right == lastInsertedNode)) {
				lastInsertedNode.parent.right = null;
			}
		
		this.root = lastInsertedNode;
		this.root.parent = null;
		if ((detached.left == null) || (detached.right == null)) {
			this.parentNodes.unshift(this.root);
		}
		if (detached.left != null) {
		  this.root.left = detached.left;
		  this.root.left.parent = this.root;
		} else {
		  this.root.left = null;
		}
		if (detached.right != null) {
		  this.root.right = detached.right;
		  this.root.right.parent = this.root;
		} else {
		  this.root.right = null;
		}   
		} 
	  }

	size() {
		return this.sizeHeap;
	}

	isEmpty() {
		return this.sizeHeap > 0 ? false : true;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.sizeHeap = 0;
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
		}
		else {
			this.parentNodes[0].appendChild(node);
		}
		this.parentNodes.push(node);
		this.sizeHeap++;
		if (this.sizeHeap > 2 && (this.sizeHeap-1)%2 == 0) {
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if (node.parent != null && node.priority > node.parent.priority) {
			let firstIndex = this.parentNodes.indexOf(node);
			let secondIndex = this.parentNodes.indexOf(node.parent);
			let tempParent = node.parent;
			node.swapWithParent();
			if (firstIndex >=0 && secondIndex >=0) {
				this.parentNodes[firstIndex] = tempParent;
				this.parentNodes[secondIndex] = node
			}
			else if (firstIndex >=0 ) {
				this.parentNodes[firstIndex] = tempParent;
			}
			else if (secondIndex >=0) {
					this.parentNodes[secondIndex] = node;
			}
			if (node.parent == null) {
				this.root = node;
			}
			this.shiftNodeUp(node);	
		}
	}

	shiftNodeDown(node) {
		const isRoot = node == this.root;
        let child;
        if ((node != null) && (node.left == null)) {
            child = node.right;
        } else if ((node != null) && (node.right == null)) {
            child = node.left;
        } else if (node != null) {
            child = node.left.priority >= node.right.priority
                    ? node.left
                    : node.right;
        }
        if (child == null) {
            return;
        }
        if (node.priority >= child.priority) {
            return;
        }

		child.swapWithParent();
		if (isRoot) {
            this.root = child;
		}
		const nodeIndex = this.parentNodes.indexOf(node);
        const childIndex = this.parentNodes.indexOf(child);
        if (childIndex != -1) {
            this.parentNodes[childIndex] = node;
        }
        if (nodeIndex != -1) {
            this.parentNodes[nodeIndex] = child;
        }
        this.shiftNodeDown(node);
    }
}

module.exports = MaxHeap;
