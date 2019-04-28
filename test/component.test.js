import Element from "../module";

class CustomElement extends Element {
	static observables = {
		fieldString: String,
		fieldNumber: Number,
		fieldBoolean: Boolean,
		fieldObject: Object,
		fieldArray: Array,
		fieldFunction: Function
	};
	update(props) {
		this.props = { ...this.props, ...props };
	}
}

customElements.define("custom-element", CustomElement);

function scope(html) {
	let scope = document.createElement("div");

	document.body.appendChild(scope);

	scope.innerHTML = html;

	return scope.querySelector("*");
}

describe("Element Lifecycle", () => {
	it("Test field type string", async done => {
		let node = scope(`<custom-element field-string="hello"></custom-element>`);

		await node.mounted;

		expect(node.fieldString).toBe("hello");

		done();
	});
	it("Test field type number", async done => {
		let node = scope(`<custom-element field-number="100"></custom-element>`);

		await node.mounted;

		expect(node.fieldNumber).toBe(100);

		done();
	});
	it("Test field type boolean", async done => {
		let node = scope(`<custom-element field-boolean></custom-element>`);

		await node.mounted;

		expect(node.fieldBoolean).toBe(true);

		done();
	});
	it("Test field type object", async done => {
		let node = scope(
			`<custom-element field-object='{"field":true}'></custom-element>`
		);

		await node.mounted;

		expect(node.fieldObject).toEqual({ field: true });

		done();
	});
	it("Test field type array", async done => {
		let node = scope(`<custom-element field-array='[true]'></custom-element>`);

		await node.mounted;

		expect(node.fieldArray).toEqual([true]);

		done();
	});
	it("Test field type Function", async done => {
		window.globalHandler = function() {
			this.done();
		};

		let node = scope(
			`<custom-element field-function='globalHandler'></custom-element>`
		);

		await node.mounted;

		node.fieldFunction.call({ done });

		done();
	});
});
