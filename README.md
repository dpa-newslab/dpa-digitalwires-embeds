# dnl_embeds.js

DEMO implementation of Web Components to display multimedia content in dpa-articles. All components are defined in [src/js/modules](src/js/modules).

**Attention: Not meant for production yet.**

For examples on how to convert and show `dnl-wgchart`-elements without implementing the Web Components check [embedding-webcharts](snippets/embedding-webcharts.html).

## Building for production

To build `dnl_embeds.js` for production, install dependencies via `yarn` or `npm` first. Then run `yarn build` or `npm build` to build the file. All you'll need to include to your site is `dist/dnl_embeds.js`. 

To specify which embeds are going to be defined on your site, (un)comment their import and definition in [index.js](src/js/index.js). You can also change the name of the custom elements there (e.g. `customElements.define("dnl-twitterembed", DNLTwitterEmbed)`, [index.js](src/js/index.js#L14)).

By copying the polyfill scripts (`dist/js/webcomponents/`) and adding `<script src="js/webcomponents/webcomponents-loader.js"></script>` to your website, you can choose whether to support older browsers like IE 11 or not (check [caniuse.com](https://caniuse.com/#search=web%20components) to see browser versions supporting Web Components out of the box).

## Development

Run `yarn start` or `npm start` and go to `localhost:8080` to see some example components.

### Main DNLEmbed-class

All Web Components created by [dpa](https://www.dpa.com/de/unternehmen/dpa-gruppe/dpa-it-services-gmbh) inherit from a main class called [DNLEmbed](src/js/modules/DNLEmbed.js). To work properly, they have to implement specific functions:

```
import {DNLEmbed} from './DNLEmbed.js';

export class MyChildComponent extends DNLEmbed{
  /**
  * Defines attributes, the component uses
  * Changes to them will lead to an `updateComponent`-call
  * @return {array}: Array that specifies which attributes are observed
  */
  static get observedAttributes(){
    return ["author", "quote", "src"];
  }

  /**
  * Builds the component's main structure. Used to append HTML-Elements and <style>-blocks to the component
  * Don't use the component's attributes here - they might not be there (at least in React.js).
  */
  setupComponent(){
    ...
  }

  /**
  * Called on initialization and on every attribute update. 
  * Can be used to modify sources and texts based on attributes. 
  */
  updateComponent(){
    ...
  }

  /**
  * Is used to resize components via postMessages from other domains, e.g. in an iframe. Function get's called every time a message is posted.
  */
  resize(){
    ...
  }
}
```
