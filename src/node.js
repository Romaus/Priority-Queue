class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			this.left.parent = this;
		}
		else if (this.right == null) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if (this.left!=null && this.left==node) {
			this.left.parent = null;
			this.left = null;
		}
		else if (this.right!=null && this.right==node) {
			this.right.parent = null;
			this.right = null;
		}
		else {throw 'error';}
	}

	remove() {
		if (this.parent!= null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent != null) {
			const tmpParent = this.parent.parent;
			const tmpLeft = this.parent.left;
			const tmpRight = this.parent.right;
	
			this.parent.parent = this;
			this.parent.left = this.left;
			this.parent.right = this.right;
	
			if (this.left != null) {
				this.left.parent = this.parent;
			}
	
			if (this.right != null) {
				this.right.parent = this.parent;
			}
	
			if (tmpParent != null) {
				if (tmpParent.left == this.parent) {
					tmpParent.left = this;
				} else if (tmpParent.right == this.parent) {
					tmpParent.right = this;
				}
			}
	
			this.left = this == tmpLeft ? this.parent : tmpLeft;
			this.right = this == tmpRight ? this.parent : tmpRight;
	
			if (this.left != null) {
				this.left.parent = this;
			}
	
			if (this.right != null) {
				this.right.parent = this;
			}
	
			this.parent = tmpParent;
		}
	}
}
module.exports = Node;