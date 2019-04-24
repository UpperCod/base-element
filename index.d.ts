type Values = Number | String | Object | Boolean | Array<any>;

interface Attributes {
	[index: string]: Values;
}

interface Properties {
	[index: string]: any;
}

declare module "@atomico/base-element" {
	export default class BaseElement extends HTMLElement {
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
		static attributes: Attributes;
		/**
		 * validate to `value`, and then deliver it to the` update({[name]:value})` method.
		 */
		setPropertie(name: string, value: Values): void;
		/**
		 * is dispatched every time `setProperty` is executed
		 */
		update(props: Properties): void;
	}
}
