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

import {addScript} from '../helpers.js';

//Webcomponent creating Twitter-embed
export class DNLTwitterEmbed extends DNLEmbed{
    static get observedAttributes(){
        return ["src"];
    }
    
    constructor(){
        //Shadow DOM can't be used atm (https://twittercommunity.com/t/widgets-createtweet-experiment/139144)
        super(false);
    }

    setupComponent(){
        const style = document.createElement("style");
        style.textContent = `
            :host{
                align-items: center;
                display: flex;
                justify-content: center;
                margin: 0 auto;
                max-width: 800px;
                width: 100%;
            }
            div.container{
                align-items: center;
                display: flex;
                justify-content: center;
                width: 100%;
            }

            div.container iframe {
                min-height: 10px;
                min-width: 10px;
            }
        `;
        this.appendChild(style);
    }

    updateComponent(){
        console.log("Update tweet")
        const src = this.getAttribute("src");

        if(!src){
            console.error("no twitter-src");
            return;
        }

        const urlData = new URL(src);

        const splittedPath = urlData.pathname.split("/");
        let tweetId;
        if(splittedPath[2] !== "status"){
            console.error("Specified Tweet-URL " + src + " does not match required format");
            return;
        }else{
            tweetId = splittedPath[3]
        }

        //compile widget
        if(typeof window.twttr === "undefined") {
            let twttrScript = addScript("https://platform.twitter.com/widgets.js");

            const prevTwttrOnload = twttrScript.onload;
            twttrScript.onload = (() => {
                if(prevTwttrOnload) prevTwttrOnload();
                this._createTweet(tweetId);
            })
        }else{
            this._createTweet(tweetId);
        }
    }

    _createTweet(tweetId){
        if(this.content){
           this.removeChild(this.content);
        }

        this.content = document.createElement("div");
        this.content.classList.add("container");
                
        window.twttr.widgets.createTweet(tweetId, this.content, {conversation: "none", dnt: true}).then(this._addErrorMessage.bind(this))
        
        this.appendChild(this.content)
    }

    _addErrorMessage(el){
        if(el === undefined){
            this.content.innerHTML = `<p>Der hier zuvor <a href=\"${this.getAttribute("src")}\">eingegebette Tweet</a> ist nicht (mehr) verfügbar.</p>`;
        }
    }

    resize(postedMessage){
        //console.log(postedMessage)
    }
}