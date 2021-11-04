/* -*- coding: utf-8 -*-

 Copyright 2021, 2021 dpa-IT Services GmbH

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

import * as shadyCss from '@webcomponents/shadycss';

//Superclass for all DNLEmbeds
export class DNLEmbed extends HTMLElement {
    constructor(attachShadowRoot=true) {
        super();
        if(attachShadowRoot){
            this.attachShadow({
                mode: 'open'
            });
        }
        this.idPrefix = "dnlembed-";
    }
  
    connectedCallback(){
        this.setupComponent();
        this.updateComponent();
        this.polyfill();
        window.addEventListener("message", (a) => this.resize(a));
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue){
            this.updateComponent();
            this.polyfill();
        }
    }

    disconnectedCallback(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = "";
        }else{
            this.innerHTML = "";
        }
    }

    setupComponent(){
        console.log("setupComponent must be implemented by subclass")
    }

    updateComponent(){
        console.log("updateComponent must be implemented by subclass")
    }

    resize(postedMessage) {
        console.log("Resize method must be implemented by subclass");
    }

    polyfill(){
        //Check if shadyCss polyfill is active
        if(typeof(ShadyCSS) === "undefined") return 
        
        //Check if 
        if(!this.shadowRoot) return

        const template = document.createElement("template");
        template.innerHTML = this.shadowRoot.innerHTML;
        shadyCss.prepareTemplate(template, this.localName)
        
        this.shadowRoot.innerHTML = template.innerHTML;
    }
};