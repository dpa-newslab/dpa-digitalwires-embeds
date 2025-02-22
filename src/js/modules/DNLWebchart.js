/* -*- coding: utf-8 -*-

 Copyright 2025 dpa-IT Services GmbH

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import {DNLEmbed} from './DNLEmbed.js';

import {getHashCode} from '../helpers.js';

//Webcomponent displaying dpa-Webgrafiken
export class DNLWebchart extends DNLEmbed {
    static get observedAttributes(){
        return ["src"];
    }

    constructor() {
        super();
        //Change default id-prefix
        this.idPrefix = "wg-";
    }

    setupComponent() {
        this.iframe = document.createElement("iframe");

        const {
            shadowRoot,
            iframe
        } = this;
        
        
        iframe.setAttribute("frameborder", "0");
        shadowRoot.appendChild(iframe);

        const style = document.createElement("style");
        style.textContent = `
            :host{
                display: block;
                margin: 0 auto;
                max-width: 800px;
            }
            iframe{
                border: none;
                height: 520px;
                width: 100%;
            }
        `
        shadowRoot.appendChild(style);

        iframe.style="height: 1px;min-height:1px;"
        shadowRoot.appendChild(iframe);
        
        this.polyfill();
    }

    updateComponent(){
        const {
            iframe,
            idPrefix
        } = this;

        const src = this.getAttribute("src");
        if(!src){
            console.error("No webchart-source specified");
        }

        let url = new URL(src)
        this.origin = url.origin;

        iframe.id = idPrefix + getHashCode(src);

        if(this.origin == "https://factgraphics.dpa-addons.com"){
            Object.entries({
                "app": "dpa-faktencheck",
                "embedType": "iframe-dyn",
                "id": iframe.id
            }).forEach(([key, value]) => url.searchParams.set(key, value))
        }else{
            Object.entries({
                id: iframe.id,
                childId: iframe.id,
                clientHeight: 1
            }).forEach(([key, value]) => url.searchParams.set(key, value))
        }
        iframe.src = url.toString();
    }

    resize(postedMessage) {
        if(postedMessage.origin == this.origin){
            if(postedMessage.data.embed == this.iframe.id){
                this.iframe.style.height = `${postedMessage.data.height}px`
            }else if(typeof (postedMessage.data) == "string" && "pym" == postedMessage.data.slice(0, 3)){
                //Adapted method from pym.js - listening to posted message having the elements id
                let message = postedMessage.data.split("x");
                if (message[2] == this.iframe.id) {
                    this.iframe.style.height = message.slice(-1) + "px"
                }
            }
        }
    }
}
