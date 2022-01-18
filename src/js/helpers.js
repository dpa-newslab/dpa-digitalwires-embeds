/* -*- coding: utf-8 -*-

 Copyright 2022, dpa-IT Services GmbH

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

function addScript(src){
    let scriptEls = document.querySelectorAll(`script[src="${src}"]`);
    if(scriptEls.length == 0){
        let scriptEl = document.createElement('script');
        scriptEl.setAttribute("src", src);
        scriptEl.setAttribute("async", "async");
        document.body.appendChild(scriptEl);
        return scriptEl;
    }else{
        return scriptEls[0];
    }
}

function getHashCode(urn) {
    //https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    let hash = 0,
        i, chr;
    if (urn.length === 0) return hash;
    for (i = 0; i < urn.length; i++) {
        chr = urn.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};


export {addScript, getHashCode};