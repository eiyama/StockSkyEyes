(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/home/index"],{"05d4":function(t,e,a){"use strict";(function(t){a("8abb"),a("921b");n(a("66fd"));var e=n(a("364b"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},"364b":function(t,e,a){"use strict";a.r(e);var n=a("6490"),i=a("b77b");for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);a("7831");var s,r=a("f0c5"),u=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=u.exports},"4c04":function(t,e,a){},6490:function(t,e,a){"use strict";var n={"mescroll-uni":()=>Promise.all([a.e("common/vendor"),a.e("components/mescroll-uni/mescroll-uni")]).then(a.bind(null,"a000"))},i=function(){var t=this,e=t.$createElement,a=(t._self._c,t.latestData.buyTime.slice(0,10)),n=t.__map(t.listData,function(e,a){var n=e.buyTime.slice(0,10),i=e.sellTime.slice(0,10);return{$orig:t.__get_orig(e),g1:n,g2:i}});t.$mp.data=Object.assign({},{$root:{g0:a,l0:n}})},o=[];a.d(e,"b",function(){return i}),a.d(e,"c",function(){return o}),a.d(e,"a",function(){return n})},7831:function(t,e,a){"use strict";var n=a("4c04"),i=a.n(n);i.a},9876:function(t,e,a){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(a("4563"));a("7848");function o(t){return t&&t.__esModule?t:{default:t}}var s,r=function(){return Promise.all([a.e("common/vendor"),a.e("components/mescroll-uni/mescroll-uni")]).then(a.bind(null,"a000"))},u=null,c=null,l={components:{MescrollUni:r},data:function(){return{labelCount:0,aggregateData:{},x:0,y:0,userInfo:{},cWidth:"",cHeight:"",pixelRatio:1,textarea:"",Interactive:"",currentUserIndex:1,currentIndex:-1,isUpdate:!1,UpdateConten:"",UpdateUrl:"",isScroll:!1,topHeight:"",latestData:{},customer:{},listData:[],downOption:{use:!0,auto:!0},upOption:{use:!0,auto:!0,textNoMore:"~ 我是有底线的 ~",page:{num:0,size:10},noMoreSize:0,empty:{use:!0,tip:"~ 暂无数据 ~",fixed:!0,top:"75%",zIndex:99}}}},mounted:function(){},onPageScroll:function(t){},onReady:function(){},onLoad:function(){s=this,this.cWidth=t.upx2px(700),this.cHeight=t.upx2px(330)},onShow:function(){t.showLoading({title:"加载中"}),this.GetStockProfitAndLoss(!0),this.getUserInfoData(),this.getTimIngor()},methods:{getTimIngor:function(){var e=this;this.$http.get("/StockSkyEyes/App/GetChatGroup").then(function(a){t.hideLoading(),a.data.result&&(t.setStorageSync("groupID",a.data.result.groupId),t.setStorageSync("userId",a.data.result.userId),t.setStorageSync("userSig",a.data.result.userSig),t.setStorageSync("Level",a.data.result.level),e.loginTim())})},loginTim:function(){var e=this.$store.state.isLogin,a=this,i="",o="";if(this.userInfo.isKF?(i=this.userInfo.kfId,o=this.userInfo.kftimUserSig):(i=t.getStorageSync("userId"),o=t.getStorageSync("userSig")),n("log",i,o," at pages\\tabbar\\home\\index.vue:258"),0==e){var s=this.tim.login({userID:i,userSig:o});s.then(function(e){a.$store.commit("toggleIsLogin",!0),t.setStorageSync("userTIMInfo",JSON.stringify(e.data))}).catch(function(t){n("warn","login error:",t," at pages\\tabbar\\home\\index.vue:270")})}},onChange:function(t){},GetStockProfitAndLoss:function(e){var a=this;this.$http.get("/StockSkyEyes/App/GetStockProfitAndLoss").then(function(n){if(t.hideLoading(),n.data&&200===n.data.status){for(var i=n.data.result,o={categories:[],series:[]},s={name:"",color:"#ffffff",data:[]},r=0;r<i.length;r++){var u=i[r].date.replace(/\-/g,".");u=u.slice(2,10),o.categories.push(u),s.data.push(i[r].value)}var c=o.categories.length;a.labelCount=c%5==0?5:(c-1)%4==0?4:3,o.series.push(s),a.aggregateData=o,a.showLineA("canvasLineA",a.aggregateData,e)}})},downCallback:function(t){this.listData=[],t.resetUpScroll()},upCallback:function(t){var e=this;1==t.num&&(this.listData=[]),this.getListDataFromNet(t.num,t.size,function(a){t.endSuccess(a.length),e.listData=e.listData.concat(a)},function(){t.endErr()})},getListDataFromNet:function(e,a,n,i){var o=this,s=[];this.latestData={},this.$http.get("/StockSkyEyes/App/GetStocks",{params:{offset:e,limit:a}}).then(function(t){if(t.data&&200===t.data.status){o.upOption.noMoreSize=t.data.result.length;for(var e=t.data.result,a=0;a<e.length;a++)e[a].isLatest?o.latestData=e[a]:s.push(e[a])}n&&n(s)}).catch(function(e){i&&i(),t.showToast({icon:"none",title:e,duration:2e3})})},mescrollInit:function(t){this.mescroll=t},getUserInfoData:function(){var e=this;this.$http.get("/StockSkyEyes/App/GetSelfInfo").then(function(a){if(t.hideLoading(),a.data&&200===a.data.status){var n=a.data.result;e.userInfo=n,t.setStorageSync("userInfo",n),"VIP"==a.data.result.level&&e.$http.get("/StockSkyEyes/App/GetKFInfo").then(function(a){a.data.result&&(e.customer=a.data.result,t.setStorageSync("customer",a.data.result))})}})},toApplyVip:function(){t.navigateTo({url:"./applyVip"})},showLineA:function(t,e,a){u=new i.default({$this:s,canvasId:t,type:"line",colors:["#facc14","#8543e0","#8543e0","#8543e0"],fontSize:11,padding:[15,15,0,15],legend:{show:!1,padding:5,lineHeight:11,margin:0,fontColor:"#Fff"},dataLabel:!1,dataPointShape:!0,background:"#e7253a",pixelRatio:s.pixelRatio,categories:e.categories,series:e.series,animation:a,xAxis:{type:"grid",gridColor:"rgba(255,255,255,0.15)",gridType:"solid",dashLength:8,disableGrid:!0,fontColor:"#ffffff",calibration:!0,gridEval:2,labelCount:s.labelCount},yAxis:{gridType:"solid",gridColor:"rgba(255,255,255,0.15)",dashLength:8,disableGrid:!1,data:[{fontColor:"#ffffff",format:function(t){return t.toFixed(2)}}]},width:s.cWidth*s.pixelRatio,height:s.cHeight*s.pixelRatio,extra:{line:{type:"straight",data:{fontColor:"#fff"}}}})},touchLineA:function(t){c=Date.now()},moveLineA:function(t){var e=Date.now(),a=e-c;if(!(a<Math.floor(1e3/60))){c=e;var n=u.getCurrentDataIndex(t);if(n>-1&&n<u.opts.categories.length){var i=u.opts.categories[n],o=u.opts.series[0].name,s=u.opts.series[0].data[n];this.Interactive=o+":"+i+"-"+s+"元"}u.showToolTip(t,{format:function(t,e){return e+" "+t.name+":"+t.data}})}},touchEndLineA:function(t){var e=u.getCurrentDataIndex(t);if(e>-1&&e<u.opts.categories.length){var a=u.opts.categories[e],n=u.opts.series[0].name,i=u.opts.series[0].data[e];this.Interactive=n+":"+a+"-"+i+"元"}u.touchLegend(t),u.showToolTip(t,{format:function(t,e){return e+" "+t.name+":"+t.data}})},toStockDetail:function(e,a){this.currentIndex=e,t.navigateTo({url:"./stockDetail?id="+a})},viewDetail:function(t,e){var a=e.buyTime.slice(2,10),n=e.sellTime.slice(2,10);a=a.replace(/\-/g,"."),n=n.replace(/\-/g,"."),this.currentIndex=t,this.viewStockDetail(a,n)},viewStockDetail:function(t,e){var a=this.aggregateData.categories,n=this.aggregateData.categories.length,i=a.indexOf(e),o=[],s=[],r=[];if(0==i){var u={color:"#facc14",name:""};u.data=o,this.aggregateData.series.length>1?this.aggregateData.series[1]=u:this.aggregateData.series.push(u),this.showLineA("canvasLineA",this.aggregateData,!1)}else{for(var c=0;c<i-1;c++)s.push(null);for(var l=this.aggregateData.series[0].data.slice(i-1,i+1),g=n-i,f=0;f<g;f++)r.push(null);o=s.concat(l).concat(r);var d={color:"#facc14",name:""};d.data=o,this.aggregateData.series.length>1?this.aggregateData.series[1]=d:this.aggregateData.series.push(d),this.showLineA("canvasLineA",this.aggregateData,!1)}},viewDetails:function(t){this.currentIndex=t,this.GetStockProfitAndLoss(!1)},toFunds:function(){t.navigateTo({url:"./funds"})}}};e.default=l}).call(this,a("6e42")["default"],a("0de9")["default"])},b77b:function(t,e,a){"use strict";a.r(e);var n=a("9876"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);e["default"]=i.a}},[["05d4","common/runtime","common/vendor"]]]);