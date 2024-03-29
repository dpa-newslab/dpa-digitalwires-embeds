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

const defineCustomElement = (name, element) => {
    if(!customElements.get(name)){
        customElements.define(name, element)
    }
};

import {DNLDwChart} from './modules/DNLDwChart';
defineCustomElement("dnl-dwchart", DNLDwChart);

import {DNLImage} from './modules/DNLImage';
defineCustomElement("dnl-image", DNLImage);

import {DNLTwitterEmbed} from './modules/DNLTwitterEmbed';
defineCustomElement("dnl-twitterembed", DNLTwitterEmbed);

import {DNLYoutubeEmbed} from './modules/DNLYoutubeEmbed';
defineCustomElement("dnl-youtubeembed", DNLYoutubeEmbed);

import {DNLWebchart} from './modules/DNLWebchart';
defineCustomElement("dnl-wgchart", DNLWebchart);
