/* -*- coding: utf-8 -*-

 Copyright 2022 dpa-IT Services GmbH

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

//Webcomponent displaying Datawrapper-charts, inherits from DNLEmbed
export class DNLDwChart extends DNLEmbed {
    static get observedAttributes(){
        return ["src"];
    }
    
    constructor() {
        super();
        //Change default id-prefix
        this.idPrefix = "dwchart-";
    }

    setupComponent() {
        const style = document.createElement("style");
        style.textContent = `
            :host{
                display: flex;
                margin: 0 auto;
                max-width: 800px;
            }
            
            iframe{
                border: none;
                width: 100%;
            }`
        this.shadowRoot.appendChild(style);

        this.iframe = document.createElement("iframe");
        
        this.iframe.frameborder = "0";
        this.shadowRoot.appendChild(this.iframe);
    }

    updateComponent(){
        const {
            iframe,
            idPrefix
        } = this;

        const src = this.getAttribute("src");
        if (!src){
            console.error("No dw-source specified");
            return;
        }

        iframe.src = src;
        const pathparts = new URL(src).pathname.split("/")
        
        let chartId = pathparts[1];
        iframe.id = idPrefix + chartId;
    }

    //Making iframe responsive
    resize(postedMessage) {
        //Adapted method used by datawrapper-embed-script that uses a postMessage-pattern
        if (void 0 !== postedMessage.data["datawrapper-height"]) {
            for (var e in postedMessage.data["datawrapper-height"]) {
                if (e == this.iframe.id.slice(this.idPrefix.length)) {
                    this.iframe.style.height = postedMessage.data["datawrapper-height"][e] + "px";
                }
            }
        }
    }
}
