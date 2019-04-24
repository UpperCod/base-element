# @atomico/base-element

[![npm](https://badgen.net/npm/v/@atomico/base-element)](http://npmjs.com/@atomico/base-element)
[![gzip](https://badgen.net/bundlephobia/minzip/@atomico/base-element)](https://bundlephobia.com/result?p=@atomico/base-element)

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
	 * defines the observable attributes and properties of the component
	 */
	static attributes: Properties;
	/**
	 * validate to `value`, and then deliver it to the` update({[name]:value})` method.
	 */
	setPropertie(name: string, value: Values): void;
	/**
	 * is dispatched every time `setProperty` is executed
	 */
	update(props: Properties): void;
}
```

This class is used by [@atomico/element](https://github.com/atomicojs/core) to use [@atomico/core](https://github.com/atomicojs/element) as web-component.

## Motivacion

`base-element`, allows to create HTMLElements under other libraries, similar to what it does [Skatejs](https://github.com/skatejs/skatejs), but less code.

## Example of implementation of lit-html

```jsx
import { render, html } from "lit-html";
import Element from "@atomico/base-element";

export default class extends Element {
	contructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.props = {};
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

## Example of preact implementation

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
