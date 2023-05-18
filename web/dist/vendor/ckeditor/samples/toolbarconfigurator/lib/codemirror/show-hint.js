!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}((function(t){function i(t,i){this.cm=t,this.options=this.buildOptions(i),this.widget=null,this.tick=this.debounce=0,this.startPos=this.cm.getCursor(),this.startLen=this.cm.getLine(this.startPos.line).length;var e=this;t.on("cursorActivity",this.activityFunc=function(){e.cursorActivity()})}function e(t,i){for(;i&&i!=t;){if("LI"===i.nodeName.toUpperCase()&&i.parentNode==t)return i;i=i.parentNode}}function n(i,n){this.completion=i,this.data=n,this.picked=!1;var o=this,s=i.cm,c=this.hints=document.createElement("ul");c.className="CodeMirror-hints",this.selectedHint=n.selectedHint||0;for(var h=n.list,l=0;l<h.length;++l){var r=c.appendChild(document.createElement("li")),a=h[l],u="CodeMirror-hint"+(l!=this.selectedHint?"":" CodeMirror-hint-active");null!=a.className&&(u=a.className+" "+u),r.className=u,a.render?a.render(r,n,a):r.appendChild(document.createTextNode(a.displayText||("string"==typeof a?a:a.text))),r.hintId=l}var f,d=(l=s.cursorCoords(i.options.alignWithWord?n.from:null)).left,p=l.bottom,m=!0;if(c.style.left=d+"px",c.style.top=p+"px",r=window.innerWidth||Math.max(document.body.offsetWidth,document.documentElement.offsetWidth),u=window.innerHeight||Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),(i.options.container||document.body).appendChild(c),0<(a=c.getBoundingClientRect()).bottom-u){var g=a.bottom-a.top;0<l.top-(l.bottom-a.top)-g?(c.style.top=(p=l.top-g)+"px",m=!1):g>u&&(c.style.height=u-5+"px",c.style.top=(p=l.bottom-a.top)+"px",u=s.getCursor(),n.from.ch!=u.ch&&(l=s.cursorCoords(u),c.style.left=(d=l.left)+"px",a=c.getBoundingClientRect()))}0<(u=a.right-r)&&(a.right-a.left>r&&(c.style.width=r-5+"px",u-=a.right-a.left-r),c.style.left=(d=l.left-u)+"px"),s.addKeyMap(this.keyMap=function(t,i){function e(t,e){var o;o="string"!=typeof e?function(t){return e(t,i)}:n.hasOwnProperty(e)?n[e]:e,s[t]=o}var n={Up:function(){i.moveFocus(-1)},Down:function(){i.moveFocus(1)},PageUp:function(){i.moveFocus(1-i.menuSize(),!0)},PageDown:function(){i.moveFocus(i.menuSize()-1,!0)},Home:function(){i.setFocus(0)},End:function(){i.setFocus(i.length-1)},Enter:i.pick,Tab:i.pick,Esc:i.close},o=t.options.customKeys,s=o?{}:n;if(o)for(var c in o)o.hasOwnProperty(c)&&e(c,o[c]);if(o=t.options.extraKeys)for(c in o)o.hasOwnProperty(c)&&e(c,o[c]);return s}(i,{moveFocus:function(t,i){o.changeActive(o.selectedHint+t,i)},setFocus:function(t){o.changeActive(t)},menuSize:function(){return o.screenAmount()},length:h.length,close:function(){i.close()},pick:function(){o.pick()},data:n})),i.options.closeOnUnfocus&&(s.on("blur",this.onBlur=function(){f=setTimeout((function(){i.close()}),100)}),s.on("focus",this.onFocus=function(){clearTimeout(f)}));var v=s.getScrollInfo();return s.on("scroll",this.onScroll=function(){var t=s.getScrollInfo(),e=s.getWrapperElement().getBoundingClientRect(),n=p+v.top-t.top,o=n-(window.pageYOffset||(document.documentElement||document.body).scrollTop);if(m||(o+=c.offsetHeight),o<=e.top||o>=e.bottom)return i.close();c.style.top=n+"px",c.style.left=d+v.left-t.left+"px"}),t.on(c,"dblclick",(function(t){(t=e(c,t.target||t.srcElement))&&null!=t.hintId&&(o.changeActive(t.hintId),o.pick())})),t.on(c,"click",(function(t){(t=e(c,t.target||t.srcElement))&&null!=t.hintId&&(o.changeActive(t.hintId),i.options.completeOnSingleClick&&o.pick())})),t.on(c,"mousedown",(function(){setTimeout((function(){s.focus()}),20)})),t.signal(n,"select",h[0],c.firstChild),!0}t.showHint=function(t,i,e){if(!i)return t.showHint(e);if(e&&e.async&&(i.async=!0),i={hint:i},e)for(var n in e)i[n]=e[n];return t.showHint(i)},t.defineExtension("showHint",(function(e){1<this.listSelections().length||this.somethingSelected()||(this.state.completionActive&&this.state.completionActive.close(),(e=this.state.completionActive=new i(this,e)).options.hint&&(t.signal(this,"startCompletion",this),e.update()))}));var o=window.requestAnimationFrame||function(t){return setTimeout(t,1e3/60)},s=window.cancelAnimationFrame||clearTimeout;i.prototype={close:function(){this.active()&&(this.tick=this.cm.state.completionActive=null,this.cm.off("cursorActivity",this.activityFunc),this.widget&&this.widget.close(),t.signal(this.cm,"endCompletion",this.cm))},active:function(){return this.cm.state.completionActive==this},pick:function(i,e){var n=i.list[e];n.hint?n.hint(this.cm,i,n):this.cm.replaceRange("string"==typeof n?n:n.text,n.from||i.from,n.to||i.to,"complete"),t.signal(i,"pick",n),this.close()},showHints:function(t){if(!t||!t.list.length||!this.active())return this.close();this.options.completeSingle&&1==t.list.length?this.pick(t,0):this.showWidget(t)},cursorActivity:function(){this.debounce&&(s(this.debounce),this.debounce=0);var t=this.cm.getCursor(),i=this.cm.getLine(t.line);if(t.line!=this.startPos.line||i.length-t.ch!=this.startLen-this.startPos.ch||t.ch<this.startPos.ch||this.cm.somethingSelected()||t.ch&&this.options.closeCharacters.test(i.charAt(t.ch-1)))this.close();else{var e=this;this.debounce=o((function(){e.update()})),this.widget&&this.widget.disable()}},update:function(){if(null!=this.tick)if(this.data&&t.signal(this.data,"update"),this.options.hint.async){var i=++this.tick,e=this;this.options.hint(this.cm,(function(t){e.tick==i&&e.finishUpdate(t)}),this.options)}else this.finishUpdate(this.options.hint(this.cm,this.options),i)},finishUpdate:function(t){this.data=t;var i=this.widget&&this.widget.picked;this.widget&&this.widget.close(),t&&t.list.length&&(i&&1==t.list.length?this.pick(t,0):this.widget=new n(this,t))},showWidget:function(i){this.data=i,this.widget=new n(this,i),t.signal(i,"shown")},buildOptions:function(t){var i,e=this.cm.options.hintOptions,n={};for(i in c)n[i]=c[i];if(e)for(i in e)void 0!==e[i]&&(n[i]=e[i]);if(t)for(i in t)void 0!==t[i]&&(n[i]=t[i]);return n}},n.prototype={close:function(){if(this.completion.widget==this){this.completion.widget=null,this.hints.parentNode.removeChild(this.hints),this.completion.cm.removeKeyMap(this.keyMap);var t=this.completion.cm;this.completion.options.closeOnUnfocus&&(t.off("blur",this.onBlur),t.off("focus",this.onFocus)),t.off("scroll",this.onScroll)}},disable:function(){this.completion.cm.removeKeyMap(this.keyMap);var t=this;this.keyMap={Enter:function(){t.picked=!0}},this.completion.cm.addKeyMap(this.keyMap)},pick:function(){this.completion.pick(this.data,this.selectedHint)},changeActive:function(i,e){if(i>=this.data.list.length?i=e?this.data.list.length-1:0:0>i&&(i=e?0:this.data.list.length-1),this.selectedHint!=i){var n=this.hints.childNodes[this.selectedHint];n.className=n.className.replace(" CodeMirror-hint-active",""),(n=this.hints.childNodes[this.selectedHint=i]).className+=" CodeMirror-hint-active",n.offsetTop<this.hints.scrollTop?this.hints.scrollTop=n.offsetTop-3:n.offsetTop+n.offsetHeight>this.hints.scrollTop+this.hints.clientHeight&&(this.hints.scrollTop=n.offsetTop+n.offsetHeight-this.hints.clientHeight+3),t.signal(this.data,"select",this.data.list[this.selectedHint],n)}},screenAmount:function(){return Math.floor(this.hints.clientHeight/this.hints.firstChild.offsetHeight)||1}},t.registerHelper("hint","auto",(function(i,e){var n=i.getHelpers(i.getCursor(),"hint");if(n.length)for(var o=0;o<n.length;o++){var s=n[o](i,e);if(s&&s.list.length)return s}else if(n=i.getHelper(i.getCursor(),"hintWords")){if(n)return t.hint.fromList(i,{words:n})}else if(t.hint.anyword)return t.hint.anyword(i,e)})),t.registerHelper("hint","fromList",(function(i,e){for(var n=i.getCursor(),o=i.getTokenAt(n),s=[],c=0;c<e.words.length;c++){var h=e.words[c];h.slice(0,o.string.length)==o.string&&s.push(h)}if(s.length)return{list:s,from:t.Pos(n.line,o.start),to:t.Pos(n.line,o.end)}})),t.commands.autocomplete=t.showHint;var c={hint:t.hint.auto,completeSingle:!0,alignWithWord:!0,closeCharacters:/[\s()\[\]{};:>,]/,closeOnUnfocus:!0,completeOnSingleClick:!1,container:null,customKeys:null,extraKeys:null};t.defineOption("hintOptions",null)}));