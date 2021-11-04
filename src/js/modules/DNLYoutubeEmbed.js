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

import {DNLEmbed} from './DNLEmbed.js';

//Webcomponent creating youtube iframe
export class DNLYoutubeEmbed extends DNLEmbed{
    static get observedAttributes(){
        return ["src"];
    }
    
    constructor(){
        super();
    }

    setupComponent(){
        const {
            shadowRoot
        } = this;
        let style = document.createElement("style");
        style.textContent = `
            :host{
                align-items: center;
                display: flex;
                justify-content: center;
                margin: 0 auto;
                max-width: 800px;
                width: 100%
            }            
            .wrapper{
                padding-bottom: 56.25%;
                position: relative;
                width: 100%;
            }            
            iframe{
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
            }`
        
        shadowRoot.appendChild(style);

        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("frameborder", "0");
        this.iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
        wrapper.appendChild(this.iframe);

        shadowRoot.appendChild(wrapper);
        this.polyfill();
    }

    updateComponent(){
        const src = this.getAttribute("src");
        if(!src) {
            console.error("No youtube-source found");
            return;
        }
        this.iframe.src = src;
    }

    resize(postedMessage){
        //Resized by CSS
    }
}
