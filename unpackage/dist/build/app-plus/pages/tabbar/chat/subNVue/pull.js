!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=44)}([function(t,e){t.exports={}},function(t,e,n){"use strict";n.r(e),e.default={appid:"__UNI__EA8A9B2"}},function(t,e,n){"use strict";function i(t,e,n,i,r,o,a,s,u,c){var l,p="function"==typeof t?t.options:t;if(u){p.components||(p.components={});var f=Object.prototype.hasOwnProperty;for(var d in u)f.call(u,d)&&!f.call(p.components,d)&&(p.components[d]=u[d])}if(c&&((c.beforeCreate||(c.beforeCreate=[])).unshift((function(){this[c.__module]=this})),(p.mixins||(p.mixins=[])).push(c)),e&&(p.render=e,p.staticRenderFns=n,p._compiled=!0),i&&(p.functional=!0),o&&(p._scopeId="data-v-"+o),a?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},p._ssrRegister=l):r&&(l=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),l)if(p.functional){p._injectStyles=l;var h=p.render;p.render=function(t,e){return l.call(e),h(t,e)}}else{var g=p.beforeCreate;p.beforeCreate=g?[].concat(g,l):[l]}return{exports:t,options:p}}n.d(e,"a",(function(){return i}))},function(t,e,n){"use strict";function i(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function r(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function o(t){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function c(t,e,n){return e&&u(t.prototype,e),n&&u(t,n),t}var l=n(4).version;function p(){var t="";if("n"===d()){try{t=plus.runtime.getDCloudId()}catch(e){t=""}return t}try{t=uni.getStorageSync("__DC_STAT_UUID")}catch(e){t="__DC_UUID_VALUE"}if(!t){t=Date.now()+""+Math.floor(1e7*Math.random());try{uni.setStorageSync("__DC_STAT_UUID",t)}catch(t){uni.setStorageSync("__DC_STAT_UUID","__DC_UUID_VALUE")}}return t}var f=function(){return parseInt((new Date).getTime()/1e3)},d=function(){return"n"},h=0,g=0,_=function(){return h=f(),"n"===d()&&uni.setStorageSync("__page__residence__time",f()),h},y=0,v=0,m=function(){var t=(new Date).getTime();return y=t,v=0,t},x=function(){var t=(new Date).getTime();return v=t,t},S=function(t){var e=0;return 0!==y&&(e=v-y),e=(e=parseInt(e/1e3))<1?1:e,"app"===t?{residenceTime:e,overtime:e>300}:"page"===t?{residenceTime:e,overtime:e>1800}:{residenceTime:e}},b=function(t){var e=getCurrentPages(),n=e[e.length-1].$vm,i=t._query,r=i&&"{}"!==JSON.stringify(i)?"?"+JSON.stringify(i):"";return t._query="","bd"===d()?n.$mp&&n.$mp.page.is+r:n.$scope&&n.$scope.route+r||n.$mp&&n.$mp.page.route+r},D=function(t){return!!("page"===t.mpType||t.$mp&&"page"===t.$mp.mpType||"page"===t.$options.mpType)},T=n(5).default,w=n(1).default||n(1),k=uni.getSystemInfoSync(),R=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(u,t);var e,n=(e=u,function(){var t,n=o(e);if(r()){var a=o(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return i(this,t)});function u(){var t;return s(this,u),(t=n.call(this)).instance=null,"function"==typeof uni.addInterceptor&&(t.addInterceptorInit(),t.interceptLogin(),t.interceptShare(!0),t.interceptRequestPayment()),t}return c(u,null,[{key:"getInstance",value:function(){return this.instance||(this.instance=new u),this.instance}}]),c(u,[{key:"addInterceptorInit",value:function(){var t=this;uni.addInterceptor("setNavigationBarTitle",{invoke:function(e){t._navigationBarTitle.page=e.title}})}},{key:"interceptLogin",value:function(){var t=this;uni.addInterceptor("login",{complete:function(){t._login()}})}},{key:"interceptShare",value:function(t){var e=this;t?uni.addInterceptor("share",{success:function(){e._share()},fail:function(){e._share()}}):e._share()}},{key:"interceptRequestPayment",value:function(){var t=this;uni.addInterceptor("requestPayment",{success:function(){t._payment("pay_success")},fail:function(){t._payment("pay_fail")}})}},{key:"report",value:function(t,e){this.self=e,_(),this.__licationShow=!0,this._sendReportRequest(t,!0)}},{key:"load",value:function(t,e){if(!e.$scope&&!e.$mp){var n=getCurrentPages();e.$scope=n[n.length-1]}this.self=e,this._query=t}},{key:"show",value:function(t){this.self=t,D(t)?this._pageShow(t):this._applicationShow(t)}},{key:"ready",value:function(t){}},{key:"hide",value:function(t){this.self=t,D(t)?this._pageHide(t):this._applicationHide(t,!0)}},{key:"error",value:function(t){this._platform;var e="";e=t.message?t.stack:JSON.stringify(t);var n={ak:this.statData.ak,uuid:this.statData.uuid,lt:"31",ut:this.statData.ut,ch:this.statData.ch,mpsdk:this.statData.mpsdk,mpv:this.statData.mpv,v:this.statData.v,em:e,usv:this.statData.usv,t:f(),p:this.statData.p};this.request(n)}}]),u}(function(){function t(){var e,n;s(this,t),this.self="",this._retry=0,this._platform="",this._query={},this._navigationBarTitle={config:"",page:"",report:"",lt:""},this._operatingTime=0,this._reportingRequestData={1:[],11:[]},this.__prevent_triggering=!1,this.__licationHide=!1,this.__licationShow=!1,this._lastPageRoute="",this.statData={uuid:p(),ut:d(),mpn:(n="","wx"!==d()&&"qq"!==d()||uni.canIUse("getAccountInfoSync")&&(n=uni.getAccountInfoSync().miniProgram.appId||""),n),ak:w.appid,usv:l,v:"n"===d()?plus.runtime.version:"",ch:(e="","n"===d()&&(e=plus.runtime.channel),e),cn:"",pn:"",ct:"",t:f(),tt:"",p:"android"===k.platform?"a":"i",brand:k.brand||"",md:k.model,sv:k.system.replace(/(Android|iOS)\s/,""),mpsdk:k.SDKVersion||"",mpv:k.version||"",lang:k.language,pr:k.pixelRatio,ww:k.windowWidth,wh:k.windowHeight,sw:k.screenWidth,sh:k.screenHeight}}return c(t,[{key:"_applicationShow",value:function(){if(this.__licationHide){if(x(),S("app").overtime){var t={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(t)}this.__licationHide=!1}}},{key:"_applicationHide",value:function(t,e){this.__licationHide=!0,x();var n=S();m();var i=b(this);this._sendHideRequest({urlref:i,urlref_ts:n.residenceTime},e)}},{key:"_pageShow",value:function(){var t,e,n=b(this),i=(t=getCurrentPages(),e=t[t.length-1].$vm,"bd"===d()?e.$mp&&e.$mp.page.is:e.$scope&&e.$scope.route||e.$mp&&e.$mp.page.route);if(this._navigationBarTitle.config=T&&T.pages[i]&&T.pages[i].titleNView&&T.pages[i].titleNView.titleText||T&&T.pages[i]&&T.pages[i].navigationBarTitleText||"",this.__licationShow)return m(),this.__licationShow=!1,void(this._lastPageRoute=n);if(x(),this._lastPageRoute=n,S("page").overtime){var r={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(r)}m()}},{key:"_pageHide",value:function(){if(!this.__licationHide){x();var t=S("page");return this._sendPageRequest({url:this._lastPageRoute,urlref:this._lastPageRoute,urlref_ts:t.residenceTime}),void(this._navigationBarTitle={config:"",page:"",report:"",lt:""})}}},{key:"_login",value:function(){this._sendEventRequest({key:"login"},0)}},{key:"_share",value:function(){this._sendEventRequest({key:"share"},0)}},{key:"_payment",value:function(t){this._sendEventRequest({key:t},0)}},{key:"_sendReportRequest",value:function(t){this._navigationBarTitle.lt="1";var e,n,i=t.query&&"{}"!==JSON.stringify(t.query)?"?"+JSON.stringify(t.query):"";this.statData.lt="1",this.statData.url=t.path+i||"",this.statData.t=f(),this.statData.sc=function(t){var e=d(),n="";return t||("wx"===e&&(n=uni.getLaunchOptionsSync().scene),n)}(t.scene),this.statData.fvts=(e=uni.getStorageSync("First__Visit__Time"),n=0,e?n=e:(n=f(),uni.setStorageSync("First__Visit__Time",n),uni.removeStorageSync("Last__Visit__Time")),n),this.statData.lvts=function(){var t=uni.getStorageSync("Last__Visit__Time"),e=0;return e=t||"",uni.setStorageSync("Last__Visit__Time",f()),e}(),this.statData.tvc=function(){var t=uni.getStorageSync("Total__Visit__Count"),e=1;return t&&(e=t,e++),uni.setStorageSync("Total__Visit__Count",e),e}(),"n"===d()?this.getProperty():this.getNetworkInfo()}},{key:"_sendPageRequest",value:function(t){var e=t.url,n=t.urlref,i=t.urlref_ts;this._navigationBarTitle.lt="11";var r={ak:this.statData.ak,uuid:this.statData.uuid,lt:"11",ut:this.statData.ut,url:e,tt:this.statData.tt,urlref:n,urlref_ts:i,ch:this.statData.ch,usv:this.statData.usv,t:f(),p:this.statData.p};this.request(r)}},{key:"_sendHideRequest",value:function(t,e){var n=t.urlref,i=t.urlref_ts,r={ak:this.statData.ak,uuid:this.statData.uuid,lt:"3",ut:this.statData.ut,urlref:n,urlref_ts:i,ch:this.statData.ch,usv:this.statData.usv,t:f(),p:this.statData.p};this.request(r,e)}},{key:"_sendEventRequest",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.key,n=void 0===e?"":e,i=t.value,r=void 0===i?"":i,o=this._lastPageRoute,a={ak:this.statData.ak,uuid:this.statData.uuid,lt:"21",ut:this.statData.ut,url:o,ch:this.statData.ch,e_n:n,e_v:"object"==typeof r?JSON.stringify(r):r.toString(),usv:this.statData.usv,t:f(),p:this.statData.p};this.request(a)}},{key:"getNetworkInfo",value:function(){var t=this;uni.getNetworkType({success:function(e){t.statData.net=e.networkType,t.getLocation()}})}},{key:"getProperty",value:function(){var t=this;plus.runtime.getProperty(plus.runtime.appid,(function(e){t.statData.v=e.version||"",t.getNetworkInfo()}))}},{key:"getLocation",value:function(){var t=this;w.getLocation?uni.getLocation({type:"wgs84",geocode:!0,success:function(e){e.address&&(t.statData.cn=e.address.country,t.statData.pn=e.address.province,t.statData.ct=e.address.city),t.statData.lat=e.latitude,t.statData.lng=e.longitude,t.request(t.statData)}}):(this.statData.lat=0,this.statData.lng=0,this.request(this.statData))}},{key:"request",value:function(t,e){var n=this,i=f(),r=this._navigationBarTitle;t.ttn=r.page,t.ttpj=r.config,t.ttc=r.report;var o=this._reportingRequestData;if("n"===d()&&(o=uni.getStorageSync("__UNI__STAT__DATA")||{}),o[t.lt]||(o[t.lt]=[]),o[t.lt].push(t),"n"===d()&&uni.setStorageSync("__UNI__STAT__DATA",o),g=f(),"n"===d()&&(h=uni.getStorageSync("__page__residence__time")),!(g-h<10)||e){var a=this._reportingRequestData;"n"===d()&&(a=uni.getStorageSync("__UNI__STAT__DATA")),_();var s=[],u=[],c=[],p=function(t){a[t].forEach((function(e){var n=function(t){var e="";for(var n in t)e+=n+"="+t[n]+"&";return e.substr(0,e.length-1)}(e);0===t?s.push(n):3===t?c.push(n):u.push(n)}))};for(var y in a)p(y);s.push.apply(s,u.concat(c));var v={usv:l,t:i,requests:JSON.stringify(s)};this._reportingRequestData={},"n"===d()&&uni.removeStorageSync("__UNI__STAT__DATA"),"h5"!==t.ut?"n"!==d()||"a"!==this.statData.p?this._sendRequest(v):setTimeout((function(){n._sendRequest(v)}),200):this.imageRequest(v)}}},{key:"_sendRequest",value:function(t){var e=this;uni.request({url:"https://tongji.dcloud.io/uni/stat",method:"POST",data:t,success:function(){},fail:function(n){++e._retry<3&&setTimeout((function(){e._sendRequest(t)}),1e3)}})}},{key:"imageRequest",value:function(t){var e=new Image,n=function(t){var e=Object.keys(t).sort(),n={},i="";for(var r in e)n[e[r]]=t[e[r]],i+=e[r]+"="+t[e[r]]+"&";return{sign:"",options:i.substr(0,i.length-1)}}(function(t){var e={};for(var n in t)e[n]=encodeURIComponent(t[n]);return e}(t)).options;e.src="https://tongji.dcloud.io/uni/stat.gif?"+n}},{key:"sendEvent",value:function(t,e){var n,i;(i=e,(n=t)?"string"!=typeof n?(console.error("uni.report [eventName] 参数类型错误,只能为 String 类型"),1):n.length>255?(console.error("uni.report [eventName] 参数长度不能大于 255"),1):"string"!=typeof i&&"object"!=typeof i?(console.error("uni.report [options] 参数类型错误,只能为 String 或 Object 类型"),1):"string"==typeof i&&i.length>255?(console.error("uni.report [options] 参数长度不能大于 255"),1):"title"===n&&"string"!=typeof i?(console.error("uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型"),1):void 0:(console.error("uni.report 缺少 [eventName] 参数"),1))||("title"!==t?this._sendEventRequest({key:t,value:"object"==typeof e?JSON.stringify(e):e},1):this._navigationBarTitle.report=e)}}]),t}()).getInstance(),P=!1,O={onLaunch:function(t){R.report(t,this)},onReady:function(){R.ready(this)},onLoad:function(t){if(R.load(t,this),this.$scope&&this.$scope.onShareAppMessage){var e=this.$scope.onShareAppMessage;this.$scope.onShareAppMessage=function(t){return R.interceptShare(!1),e.call(this,t)}}},onShow:function(){P=!1,R.show(this)},onHide:function(){P=!0,R.hide(this)},onUnload:function(){P?P=!1:R.hide(this)},onError:function(t){R.error(t)}};!function(){var t=n(6);(t.default||t).mixin(O),uni.report=function(t,e){R.sendEvent(t,e)}}()},function(t){t.exports={_from:"@dcloudio/uni-stat@next",_id:"@dcloudio/uni-stat@2.0.0-26920200424005",_inBundle:!1,_integrity:"sha512-FT8Z/C5xSmIxooqhV1v69jTkxATPz+FsRQIFOrbdlWekjGkrE73jfrdNMWm7gL5u41ALPJTVArxN1Re9by1bjQ==",_location:"/@dcloudio/uni-stat",_phantomChildren:{},_requested:{type:"tag",registry:!0,raw:"@dcloudio/uni-stat@next",name:"@dcloudio/uni-stat",escapedName:"@dcloudio%2funi-stat",scope:"@dcloudio",rawSpec:"next",saveSpec:null,fetchSpec:"next"},_requiredBy:["#USER","/","/@dcloudio/vue-cli-plugin-uni"],_resolved:"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200424005.tgz",_shasum:"47f4375095eda3089cf4678b4b96fc656a7ab623",_spec:"@dcloudio/uni-stat@next",_where:"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli",author:"",bugs:{url:"https://github.com/dcloudio/uni-app/issues"},bundleDependencies:!1,deprecated:!1,description:"",devDependencies:{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5",eslint:"^6.1.0",rollup:"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},files:["dist","package.json","LICENSE"],gitHead:"94494d54ed23e2dcf9ab8e3245b48b770b4e98a9",homepage:"https://github.com/dcloudio/uni-app#readme",license:"Apache-2.0",main:"dist/index.js",name:"@dcloudio/uni-stat",repository:{type:"git",url:"git+https://github.com/dcloudio/uni-app.git",directory:"packages/uni-stat"},scripts:{build:"NODE_ENV=production rollup -c rollup.config.js",dev:"NODE_ENV=development rollup -w -c rollup.config.js"},version:"2.0.0-26920200424005"}},function(t,e,n){"use strict";n.r(e),e.default={pages:{},globalStyle:{}}},function(t,e){t.exports=Vue},function(t,e,n){Vue.prototype.__$appStyle__={},Vue.prototype.__merge_style&&Vue.prototype.__merge_style(n(8).default,Vue.prototype.__$appStyle__)},function(t,e,n){"use strict";n.r(e);var i=n(0),r=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e.default=r.a},function(t,e,n){"use strict";function i(t){var e=Object.prototype.toString.call(t);return e.substring(8,e.length-1)}function r(){return"string"==typeof __channelId__&&__channelId__}Object.defineProperty(e,"__esModule",{value:!0}),e.log=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];console[t].apply(console,n)},e.default=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];var o=e.shift();if(r())return e.push(e.pop().replace("at ","uni-app:///")),console[o].apply(console,e);var a=e.map((function(t){var e=Object.prototype.toString.call(t).toLowerCase();if("[object object]"===e||"[object array]"===e)try{t="---BEGIN:JSON---"+JSON.stringify(t)+"---END:JSON---"}catch(e){t="[object object]"}else if(null===t)t="---NULL---";else if(void 0===t)t="---UNDEFINED---";else{var n=i(t).toUpperCase();t="NUMBER"===n||"BOOLEAN"===n?"---BEGIN:"+n+"---"+t+"---END:"+n+"---":String(t)}return t})),s="";if(a.length>1){var u=a.pop();s=a.join("---COMMA---"),0===u.indexOf(" at ")?s+=u:s+="---COMMA---"+u}else s=a[0];console[o](s)}},,,,,function(t,e,n){"use strict";var i=n(34),r=n(25),o=n(2);var a=Object(o.a)(r.default,i.b,i.c,!1,null,null,"716d66ee",!1,i.a,void 0);(function(t){this.options.style||(this.options.style={}),Vue.prototype.__merge_style&&Vue.prototype.__$appStyle__&&Vue.prototype.__merge_style(Vue.prototype.__$appStyle__,this.options.style),Vue.prototype.__merge_style?Vue.prototype.__merge_style(n(39).default,this.options.style):Object.assign(this.options.style,n(39).default)}).call(a),e.default=a.exports},,,,,,,,,,,function(t,e,n){"use strict";var i=n(26),r=n.n(i);e.default=r.a},function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{pullUrl:"",windowHeight:"300px"}},onLoad:function(t){this.$refs.maxTxPlayer.stopPlay()},onShow:function(){var e=this;uni.$on("pullUrl",(function(t){e.pullUrl=t.playUrl})),uni.$on("isHiddenLive",(function(n){t("log",n," at pages\\tabbar\\chat\\subNVue\\pull.nvue:73"),n.hiddenLive&&e.$refs.maxTxPlayer.stopPlay()}))},onNavigationBarButtonTap:function(){this.$refs.maxTxPlayer.stopPlay(),uni.navigateBack({delta:1,animationType:"pop-out",animationDuration:200})},onUnload:function(){this.$refs.maxTxPlayer.stopPlay()},methods:{discard:function(){},closeLive:function(){var t=this;uni.showModal({content:"确认关闭？",cancelText:"再看看",cancelColor:"#2fb2da",confirmText:"关闭",confirmColor:"#999",success:function(e){e.confirm&&(t.$refs.maxTxPlayer.stopPlay(),uni.$emit("pullLive",{title:"我是一个title",content:"我是data content"}))}})},onPlay:function(t){t.detail},startPlay:function(){this.$refs.maxTxPlayer.startPlay((function(t){}))},stopPlay:function(){this.$refs.maxTxPlayer.pause()},resumuPlay:function(){this.$refs.maxTxPlayer.resume()}}};e.default=n}).call(this,n(9).default)},function(t,e){t.exports={maxTxPlayer:{width:"750upx",height:"100",backgroundColor:"#000000"},foot:{height:"88rpx",width:"750rpx",position:"fixed",right:"0rpx",left:"0rpx",top:"400rpx",justifyContent:"space-between",alignItems:"center",flexDirection:"row",backgroundColor:"#F0F0F0"},liveBtn:{flexDirection:"row",alignItems:"center"},circleBoxAll:{justifyContent:"center",alignItems:"center"},inputBoxAll:{flexDirection:"row",alignItems:"center"},inputBox:{flexDirection:"row",marginTop:"15rpx",marginRight:"15rpx",marginBottom:"15rpx",marginLeft:"15rpx",paddingTop:"15rpx",paddingRight:"15rpx",paddingBottom:"15rpx",paddingLeft:"15rpx",backgroundColor:"#FFFFFF",borderRadius:"6"},inputTitle:{height:"80rpx",lineHeight:"80rpx"},input:{height:"80rpx",width:"340rpx",fontSize:"30rpx",paddingTop:"15rpx",paddingRight:"15rpx",paddingBottom:"15rpx",paddingLeft:"15rpx"},join:{backgroundColor:"#DD524D",width:"160rpx",height:"120rpx",lineHeight:"120rpx",textAlign:"center",color:"#FFFFFF",borderRadius:"10"},circleBox:{width:"150rpx",paddingTop:"10rpx",paddingRight:0,paddingBottom:"10rpx",paddingLeft:0,marginTop:"10rpx",marginRight:"10rpx",marginBottom:"10rpx",marginLeft:"10rpx",alignItems:"center",flexDirection:"column",textAlign:"center"},circleIco:{fontSize:"36rpx",width:"64rpx",height:"64rpx",lineHeight:"64rpx",borderRadius:"500",borderStyle:"solid",borderWidth:"1",borderColor:"#FFFFFF",textAlign:"center",fontFamily:"iconfont",color:"#FFFFFF"},phone:{backgroundColor:"#c5433a",borderStyle:"solid",borderWidth:"1",borderColor:"#c5433a"},hint:{fontSize:"22rpx",color:"#FF0000",paddingTop:"20rpx"},tools:{position:"fixed",right:0,bottom:"100rpx",zIndex:11,width:"150rpx"},"foot-content":{flexDirection:"column-reverse",position:"fixed",bottom:0,left:0,right:0,height:"500rpx",overflow:"hidden",paddingTop:"20rpx",paddingRight:"40rpx",paddingBottom:"20rpx",paddingLeft:"40rpx"}}},,,,,,,function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{on:{touchmove:t.discard}},[n("tx-avplayer",{ref:"maxTxPlayer",staticClass:["maxTxPlayer"],style:{height:t.windowHeight},attrs:{url:t.pullUrl,playRotation:"1",playModel:"0",enableZoom:""},on:{statechange:t.onPlay}}),n("view",{staticClass:["foot"]},[n("view",{staticClass:["liveBtn"]},[n("u-image",{staticStyle:{width:"130upx",height:"34upx",marginLeft:"12upx"},attrs:{src:"../../../../static/img/txt-check-zhibo.png",mode:""}})],1),n("view",{staticClass:["flex","liveBtn"]},[n("u-image",{staticStyle:{width:"108upx",height:"64upx",marginRight:"30upx"},attrs:{src:"../../../../static/img/btn-txt-bofang.png",mode:""},on:{click:function(e){t.startPlay()}}}),n("u-image",{staticStyle:{width:"48upx",height:"48upx",marginRight:"30upx"},attrs:{src:"../../../../static/img/icon-zhibo-stop.png",mode:""},on:{click:t.closeLive}})],1)])],1)},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){}))},,,,,function(t,e,n){"use strict";n.r(e);var i=n(27),r=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e.default=r.a},,,,,function(t,e,n){"use strict";n.r(e);n(3),n(7);var i=n(14);i.default.mpType="page",i.default.route="pages/tabbar/chat/subNVue/pull",i.default.el="#root",new Vue(i.default)}]);