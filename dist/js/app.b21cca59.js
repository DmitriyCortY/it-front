(function(t){function e(e){for(var a,r,c=e[0],l=e[1],i=e[2],u=0,d=[];u<c.length;u++)r=c[u],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&d.push(s[r][0]),s[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);_&&_(e);while(d.length)d.shift()();return o.push.apply(o,i||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,r=1;r<n.length;r++){var c=n[r];0!==s[c]&&(a=!1)}a&&(o.splice(e--,1),t=l(l.s=n[0]))}return t}var a={},r={app:0},s={app:0},o=[];function c(t){return l.p+"js/"+({}[t]||t)+"."+{"chunk-2d0d3720":"306471f4","chunk-2f9fd2ed":"9cebbbe9","chunk-41f473d1":"6d43b13d","chunk-f360e6a6":"f5585870"}[t]+".js"}function l(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(t){var e=[],n={"chunk-2f9fd2ed":1,"chunk-41f473d1":1,"chunk-f360e6a6":1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise((function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-2d0d3720":"31d6cfe0","chunk-2f9fd2ed":"529dba2b","chunk-41f473d1":"8658f016","chunk-f360e6a6":"ac8a18f2"}[t]+".css",s=l.p+a,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var i=o[c],u=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(u===a||u===s))return e()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){i=d[c],u=i.getAttribute("data-href");if(u===a||u===s)return e()}var _=document.createElement("link");_.rel="stylesheet",_.type="text/css",_.onload=e,_.onerror=function(e){var a=e&&e.target&&e.target.src||s,o=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete r[t],_.parentNode.removeChild(_),n(o)},_.href=s;var p=document.getElementsByTagName("head")[0];p.appendChild(_)})).then((function(){r[t]=0})));var a=s[t];if(0!==a)if(a)e.push(a[2]);else{var o=new Promise((function(e,n){a=s[t]=[e,n]}));e.push(a[2]=o);var i,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=c(t);var d=new Error;i=function(e){u.onerror=u.onload=null,clearTimeout(_);var n=s[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,n[1](d)}s[t]=void 0}};var _=setTimeout((function(){i({type:"timeout",target:u})}),12e4);u.onerror=u.onload=i,document.head.appendChild(u)}return Promise.all(e)},l.m=t,l.c=a,l.d=function(t,e,n){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)l.d(n,a,function(e){return t[e]}.bind(null,a));return n},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var d=0;d<i.length;d++)e(i[d]);var _=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("transition",{attrs:{name:"fade"}},[n("router-view")],1)],1)},s=[],o={data:function(){return{}},destroyed:function(){this.$store.dispatch("drop_start_load")},created:function(){this.$store.dispatch("load_all_start_datas"),this.$router.push({path:"/"})},watch:{},methods:{select_step:function(t){this.$router.push({path:"/step-".concat(t)})}},computed:{categoryes:function(){return this.$store.getters.categoryes},classes:function(){return this.$store.getters.classes},all_skeletons:function(){return this.$store.getters.all_skeletons},all_parts:function(){return this.$store.getters.all_parts},all_products:function(){return this.$store.getters.all_products},all_parts_points:function(){return this.$store.getters.all_parts_points},all_products_points:function(){return this.$store.getters.all_products_points},all_bases:function(){return this.$store.getters.all_bases},all_kits:function(){return this.$store.getters.all_kits},start_load_status:function(){return this.$store.getters.start_load_status}}},c=o,l=(n("5c0b"),n("2877")),i=Object(l["a"])(c,r,s,!1,null,null,null),u=i.exports,d=(n("d3b7"),n("8c4f"));a["default"].use(d["a"]);var _=[{path:"/",name:"Home",component:function(){return n.e("chunk-41f473d1").then(n.bind(null,"bb51"))}},{path:"/step-1",name:"Step 1",component:function(){return n.e("chunk-2f9fd2ed").then(n.bind(null,"314b"))}},{path:"/step-2",name:"Step 2",component:function(){return n.e("chunk-2d0d3720").then(n.bind(null,"5d94"))}},{path:"/step-3",name:"Step 3",component:function(){return n.e("chunk-f360e6a6").then(n.bind(null,"90d6"))}}],p=new d["a"]({routes:_}),f=p,h=n("2f62"),m=(n("4160"),n("b0c0"),n("159b"),n("96cf"),n("1da1")),b=n("bc3a"),k=n.n(b),g={state:{categoryes:[],classes:[],all_skeletons:[],all_parts:[],all_parts_points:[],all_products:[],all_products_points:[],all_bases:[],all_kits:[],start_load_status:!1,loader_counter:0,output_loading_error:!1},mutations:{categoryes:function(t,e){t.categoryes=e},classes:function(t,e){t.classes=e},all_skeletons:function(t,e){t.all_skeletons=e},all_parts:function(t,e){t.all_parts=e},all_parts_points:function(t,e){t.all_parts_points=e},all_products:function(t,e){t.all_products=e},all_products_points:function(t,e){t.all_products_points=e},all_bases:function(t,e){t.all_bases=e},all_kits:function(t,e){t.all_kits=e},start_load_status:function(t){t.start_load_status=!0,"Home"===f.currentRoute.name&&f.push({path:"/step-1"})},drop_start_load:function(t){t.categoryes=[],t.classes=[],t.all_skeletons=[],t.all_parts=[],t.all_parts_points=[],t.all_products=[],t.all_products_points=[],t.all_bases=[],t.all_kits=[],t.start_load_status=!1},loader_counter:function(t){t.loader_counter++},output_loading_error:function(t){t.output_loading_error=!0}},actions:{drop_start_load:function(t){var e=t.commit;try{e("drop_start_load")}catch(n){console.error(n)}},load_all_start_datas:function(t){var e=t.commit,n=t.dispatch,a=t.state;return Object(m["a"])(regeneratorRuntime.mark((function t(){var r,s,o,c,l,i,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,k.a.post("http://ivan-tactical.conf/classes/get_all.php");case 3:return r=t.sent,e("classes",r.data.data),t.next=7,k.a.post("http://ivan-tactical.conf/categoryes/get.php");case 7:return s=t.sent,e("categoryes",s.data.data),t.next=11,k.a.post("http://ivan-tactical.conf/skeleton/get_all.php");case 11:return o=t.sent,e("all_skeletons",o.data.data),t.next=15,k.a.post("http://ivan-tactical.conf/part/get_all.php");case 15:return c=t.sent,t.next=18,n("all_parts_points",c.data.data);case 18:return e("all_parts",c.data.data),t.next=21,k.a.post("http://ivan-tactical.conf/product/get_all.php");case 21:return l=t.sent,t.next=24,n("all_products_points",l.data.data);case 24:return e("all_products",l.data.data),t.next=27,k.a.post("http://ivan-tactical.conf/base/get_all.php");case 27:return i=t.sent,e("all_bases",i.data.data),t.next=31,k.a.post("http://ivan-tactical.conf/admin_kit_builder/get_all.php");case 31:u=t.sent,e("all_kits",u.data.data),e("start_load_status"),t.next=40;break;case 36:t.prev=36,t.t0=t["catch"](0),console.error(t.t0),a.loader_counter<3?(setTimeout((function(){n("load_all_start_datas")}),5e3),n("loader_counter")):n("output_loading_error");case 40:case"end":return t.stop()}}),t,null,[[0,36]])})))()},all_parts_points:function(t,e){var n=t.commit;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a,r,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a=new FormData,r=[],e.forEach((function(t){r.push(parseInt(t.id))})),a.append("ids",JSON.stringify(r)),t.next=7,k.a.post("http://ivan-tactical.conf/parts_points/get_by_list_ids.php",a);case 7:return s=t.sent,o=s.data.data,n("all_parts_points",o),t.abrupt("return",!0);case 13:return t.prev=13,t.t0=t["catch"](0),console.error(t.t0),t.abrupt("return",!1);case 17:case"end":return t.stop()}}),t,null,[[0,13]])})))()},all_products_points:function(t,e){var n=t.commit;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a,r,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a=new FormData,r=[],e.forEach((function(t){r.push(parseInt(t.id))})),a.append("ids",JSON.stringify(r)),t.next=7,k.a.post("http://ivan-tactical.conf/products_points/get_by_list_ids.php",a);case 7:return s=t.sent,o=s.data.data,n("all_products_points",o),t.abrupt("return",!0);case 13:return t.prev=13,t.t0=t["catch"](0),console.error(t.t0),t.abrupt("return",!1);case 17:case"end":return t.stop()}}),t,null,[[0,13]])})))()},loader_counter:function(t){var e=t.commit;try{e("loader_counter")}catch(n){console.error(n)}},output_loading_error:function(t){var e=t.commit;try{e("output_loading_error")}catch(n){console.error(n)}}},getters:{categoryes:function(t){return t.categoryes},classes:function(t){return t.classes},all_skeletons:function(t){return t.all_skeletons},all_parts:function(t){return t.all_parts},all_products:function(t){return t.all_products},all_parts_points:function(t){return t.all_parts_points},all_products_points:function(t){return t.all_products_points},all_bases:function(t){return t.all_bases},all_kits:function(t){return t.all_kits},start_load_status:function(t){return t.start_load_status},output_loading_error:function(t){return t.output_loading_error}}},v={state:{base_data:[]},mutations:{base_data:function(t,e){t.base_data=e},drop_base_data:function(t){t.base_data=[]}},actions:{drop_base_data:function(t){var e=t.commit;try{e("drop_base_data")}catch(n){console.error(n)}},base_data:function(t,e){var n=t.commit;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a,r,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a=new FormData,a.append("id",parseInt(e)),t.next=5,k.a.post("http://ivan-tactical.conf/base/attach_get.php",a);case 5:for(r=t.sent,s=r.data.data,o=0;o<s.length;o++)0===parseInt(s[o].parent_part_point_id)&&delete s[o].parent_part_point_id,0===parseInt(s[o].skeleton_point_id)&&delete s[o].skeleton_point_id;n("base_data",s),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),console.error(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))()}},getters:{base_data:function(t){return t.base_data}}},y={state:{kit_data:[]},mutations:{kit_data:function(t,e){t.kit_data=e},drop_kit_data:function(t){t.kit_data=[]}},actions:{drop_kit_data:function(t){var e=t.commit;try{e("drop_kit_data")}catch(n){console.error(n)}},kit_data:function(t,e){var n=t.commit;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a,r,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a=new FormData,a.append("id",parseInt(e)),t.next=5,k.a.post("http://ivan-tactical.conf/admin_kit_builder/get_attach_by_kit_id.php",a);case 5:for(r=t.sent,s=r.data.data,o=0;o<s.length;o++)0===parseInt(s[o].parent_product_point_id)&&delete s[o].parent_product_point_id,0===parseInt(s[o].parent_skeleton_point_id)&&delete s[o].parent_skeleton_point_id;n("kit_data",s),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),console.error(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))()}},getters:{kit_data:function(t){return t.kit_data}}},w={state:{skeleton_points:[]},mutations:{skeleton_points:function(t,e){t.skeleton_points=e}},actions:{skeleton_points:function(t,e){var n=t.commit;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n("skeleton_points",[]),a=new FormData,a.append("id",parseInt(e)),t.next=6,k.a.post("http://ivan-tactical.conf/skeletons_points/get.php",a);case 6:r=t.sent,s=r.data.data,n("skeleton_points",s),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),console.error(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))()}},getters:{skeleton_points:function(t){return t.skeleton_points}}},x=(n("a4d3"),n("e01a"),n("5530")),O={state:{current_base_data:{base_id:null,skeleton_id:null},selected_kit:{category:null,description:null,id:null,name:null,skeleton_id:null},selected_base:{category:null,description:null,id:null,name:null,skeleton_id:null}},mutations:{current_base_data:function(t,e){t.current_base_data.base_id=e.base_id,t.current_base_data.skeleton_id=e.skeleton_id},selected_kit:function(t,e){t.selected_kit.category=e.category?e.category:null,t.selected_kit.description=e.description?e.description:null,t.selected_kit.id=e.id?e.id:null,t.selected_kit.name=e.name?e.name:null,t.selected_kit.skeleton_id=e.skeleton_id?e.skeleton_id:null},selected_base:function(t,e){t.selected_base.category=e.category?e.category:null,t.selected_base.description=e.description?e.description:null,t.selected_base.id=e.id?e.id:null,t.selected_base.name=e.name?e.name:null,t.selected_base.skeleton_id=e.skeleton_id?e.skeleton_id:null},drop_selected_kit:function(t){t.selected_kit.category=null,t.selected_kit.description=null,t.selected_kit.id=null,t.selected_kit.name=null,t.selected_kit.skeleton_id=null},drop_selected_base:function(t){t.selected_base.category=null,t.selected_base.description=null,t.selected_base.id=null,t.selected_base.name=null,t.selected_base.skeleton_id=null}},actions:{current_base_data:function(t,e){var n=t.commit;try{n("current_base_data",e),f.push({path:"/step-2"})}catch(a){console.error(a)}},selected_kit:function(t,e){var n=t.commit,a=t.dispatch;try{a("drop_selected_kit"),a("drop_selected_base"),n("selected_kit",e),f.push({path:"/step-3"})}catch(r){console.error(r)}},selected_base:function(t,e){var n=t.commit,a=t.dispatch;try{a("drop_selected_kit"),a("drop_selected_base"),n("selected_base",e),f.push({path:"/step-3"})}catch(r){console.error(r)}},drop_selected_kit:function(t){var e=t.commit;try{e("drop_selected_kit")}catch(n){console.error(n)}},drop_selected_base:function(t){var e=t.commit;try{e("drop_selected_base")}catch(n){console.error(n)}}},getters:{current_base_data:function(t){return t.current_base_data},selected_kit:function(t){return t.selected_kit},selected_base:function(t){return t.selected_base},kit_or_base_data:function(t){return t.selected_base.category,t.selected_base.description,t.selected_base.id,t.selected_base.name,null===t.selected_base.skeleton_id?Object(x["a"])({},t.selected_kit,{type:"kit"}):(t.selected_kit.category,t.selected_kit.description,t.selected_kit.id,t.selected_kit.name,null===t.selected_kit.skeleton_id?Object(x["a"])({},t.selected_base,{type:"base"}):void 0)}}},j={state:{add_to_card_ids:[]},mutations:{add_to_card:function(t,e){t.add_to_card_ids=e}},actions:{add_to_card:function(t,e){var n=t.commit;return Object(m["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:try{n("add_to_card",e),console.log(e)}catch(a){console.error(a)}case 1:case"end":return t.stop()}}),t)})))()}},getters:{}};a["default"].use(h["a"]);var $=new h["a"].Store({modules:{start_load:g,base_data:v,kits_data:y,skeleton_points:w,communication:O,add_to_card:j}}),R=n("ce5b"),S=n.n(R),E=n("f309");a["default"].use(E["a"]);var I=new E["a"]({}),P=n("1dce"),T=n.n(P),C=n("ee98"),D=n.n(C);a["default"].use(S.a),a["default"].use(T.a),a["default"].use(D.a),a["default"].prototype.$http=k.a,a["default"].use(f),a["default"].config.productionTip=!1,new a["default"]({router:f,store:$,vuetify:I,render:function(t){return t(u)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var a=n("7694"),r=n.n(a);r.a},7694:function(t,e,n){}});
//# sourceMappingURL=app.b21cca59.js.map