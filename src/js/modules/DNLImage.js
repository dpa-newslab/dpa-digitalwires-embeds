/* -*- coding: utf-8 -*-

 Copyright 2023 dpa-IT Services GmbH

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

export class DNLImage extends DNLEmbed{
    static get observedAttributes(){
        return ["src", "alt", "title", "caption", "creditline"];
    }
    
    constructor(){
        super(); 
    }

    setupComponent(){
        this.classList.add("empty");
        this.figure = document.createElement("figure");
        this.img = document.createElement("img");
        this.figcaption = document.createElement("figcaption");
        this.caption = document.createElement("p");
        this.creditline = document.createElement("p");

        const {          
            figure,  
            figcaption,
            img,
            caption,
            creditline,
            shadowRoot
        } = this;

        figure.setAttribute("part", "figure");
        figcaption.setAttribute("part", "figcaption");
        img.setAttribute("part", "img");
        caption.setAttribute("part", "caption");
        creditline.setAttribute("part", "creditline");

        let style = document.createElement("style");
        style.textContent = `
            :host{
                display: block;
                margin: 0 auto;
                max-width: 800px;
            }
            
            :host(.empty){
                display: none;
            }

            figure{
                margin: 0;
                position: relative;
            }

            img{
                display: block;
                height: auto;
                width: 100%;
            }

            figcaption{
                background: rgba(255, 255, 255, 0.8);
                bottom: 0;
                box-sizing: border-box;
                display: block;
                left: 0;
                padding: 15px;
                position: absolute;
                width: 100%;
            }

            :host(.is-feature) figcaption{
                padding: 0;
                position: relative;
            }

            figcaption p{
                margin: 0;
            }

            figcaption p.title{
                font-weight: 600;
                margin-bottom: 3px;
            }

            figcaption p.title+p.caption{
                font-size: .7em
            }

            p.creditline{
                font-size: .7em;
                font-style: italic;
                text-align: right;
            }
        `

        shadowRoot.appendChild(style);

        figure.appendChild(img);

        caption.classList.add("caption");
        figcaption.appendChild(caption);

        creditline.classList.add("creditline");
        figcaption.appendChild(creditline);

        figure.appendChild(figcaption);
        shadowRoot.appendChild(figure);
    }

    updateComponent(){
        const {
            img,
            caption,
            creditline,
            figcaption
        } = this;

        if(!this.getAttribute("src")){
            this.classList.add("empty");
            return;
        }
        
        img.setAttribute("src", this.getAttribute("src"));
        img.setAttribute("alt", this.getAttribute("alt"));
        
        const titleElement = this.figcaption.querySelector("p.title");
        const titleAttribute = this.getAttribute("title");
        if(titleElement !== null){
            if(titleAttribute){
                const title = document.createElement("p");
                title.classList.add("title");
                title.innerHTML = this.getAttribute("title");
                figcaption.prepend(title);
            }else{
                titleElement.setAttribute("part", "title");
                titleElement.innerHTML = titleAttribute;
            }
        }else if(titleAttribute){
            const title = document.createElement("p");
            title.classList.add("title");
            title.innerHTML = this.getAttribute("title");
            figcaption.prepend(title);
        }

        caption.innerHTML = this.getAttribute("caption");
        creditline.innerHTML = `Foto: ${this.getAttribute("creditline")}`;

        this.classList.remove("empty");
    }
    resize(){
        //Resized by CSS
    }
}
