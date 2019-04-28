# @atomico/base-element

[![npm](https://badgen.net/npm/v/@atomico/base-element)](http://npmjs.com/@atomico/base-element)

It provides a minimum utility interface for the creation of web-components.

```ts
class BaseElement extends HTMLElement {
	/**
	 * captures the properties defined in `static attributes`;
	 */
	props: Properties;
	/**
	 * it is resolved once the component has been mounted the document
	 */
	mounted: Promise<void>;
	/**
	 * It is solved once the component has been unmounted the document.
	 */
	unmounted: Promise<void>;
	/**
	 * defines the observables as property and attribute of the component
	 */
	static observables: Observables;
	/**
	 * validate to `value`, and then deliver it to the` update({[name]:value})` method.
	 */
	setProperty(name: string, value: Values): void;
	/**
	 * is dispatched every time `setProperty` is executed
	 */
	update(props: Properties): void;
}
```

This class is used by [@atomico/element](https://github.com/atomicojs/core) to use [@atomico/core](https://github.com/atomicojs/element) as web-component.

## Objective

`base-element`, allows to create HTMLElements under other libraries, similar to what it does [Skatejs](https://github.com/skatejs/skatejs), but less code.

## Observables

defines the observables as property and attribute of the component

```js
class CustomElement extends Element {
	static Observables = {
		fieldString: String, // [field-string]
		fieldNumber: Number, // [field-number]
		fieldBoolean: Boolean, // [field-boolean]
		fieldObject: Object, // [field-object]
		fieldArray: Array // [field-array],
		fieldFunction:Function // [field-function]
	};
}
```

the attributes force the type of the variable, so if you define an attribute as `Object`, it will apply
`JSON.parse` to a string type value, to read its type.

```js
// set property, remember that to apply this WC, you must already be registered
myCustomElement.fieldArray = [];
// set attribute, more benefit using setAttribute, since it allows a deferred loading of the WC
myCustomElement.setAttribute("field-array", []);
```

## Example with lit-html

```jsx
import { render, html } from "lit-html";
import Element from "@atomico/base-element";

export default class extends Element {
	contructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.props = {};
		this.update();
	}
	async update(props) {
		this.props = { ...this.props, ...props };
		if (this.prevent) return;
		this.prevent = true;
		await this.mounted;
		this.prevent = false;
		render(this.render(this.props), this.shadowRoot);
	}
}
```

## Example with preact

```jsx
import { render, h } from "preact";
import Element from "@atomico/base-element";

export default class extends Element {
	contructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.props = {};
		this.render = this.render.bind(this);
		this.unmounted.then(() => render("", this.shadowRoot));
		this.update();
	}
	async update(props) {
		this.props = { ...this.props, ...props };
		if (this.prevent) return;
		this.prevent = true;
		await this.mounted;
		this.prevent = false;
		render(h(this.render, this.props), this.shadowRoot);
	}
}
```

## Example with innerHTML

```js
import Element from "@atomico/base-element";

export default class extends Element {
	contructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.props = {};
		this.update();
	}
	async update(props) {
		this.props = { ...this.props, ...props };
		if (this.prevent) return;
		this.prevent = true;
		await this.mounted;
		this.prevent = false;
		let nextHTML = this.render(this.props);
		if (nextHTML !== this.shadowRoot.innerHTML) {
			this.shadowRoot.innerHTML = nextHTML;
		}
	}
}
```
