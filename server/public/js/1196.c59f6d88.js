"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[1196],{1196:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var a=n(7024),l=n(1819),r=n(7894),i=function(){var e=this,t=e._self._c;return t(l.Z,{staticClass:"down-top-padding",attrs:{fluid:""}},[t(r.Z,[t(a.Z,{attrs:{cols:"12",sm:"12"}},[t("BaseCard",{attrs:{heading:"Table Simple - Fixed height"}},[t("TableSimpleFixHeight")],1),t("BaseCard",{attrs:{heading:"Table Simple - Fixed header"}},[t("TableSimpleFixHeader")],1),t("BaseCard",{attrs:{heading:"Table Simple - Dense table"}},[t("TableSimpleDense")],1),t("BaseCard",{attrs:{heading:"Table Simple - Dark theme"}},[t("TableSimpleDarktheme")],1)],1)],1)],1)},s=[],o={name:"TableSimple",data:()=>({}),components:{TableSimpleFixHeight:()=>Promise.all([n.e(3738),n.e(7803),n.e(6844)]).then(n.bind(n,6844)),TableSimpleFixHeader:()=>Promise.all([n.e(3738),n.e(7803),n.e(8635)]).then(n.bind(n,8635)),TableSimpleDense:()=>Promise.all([n.e(3738),n.e(7803),n.e(6761)]).then(n.bind(n,6761)),TableSimpleDarktheme:()=>Promise.all([n.e(3738),n.e(7803),n.e(6166)]).then(n.bind(n,6166))}},d=o,u=n(1001),c=(0,u.Z)(d,i,s,!1,null,null,null),f=c.exports},1884:function(){},7024:function(e,t,n){n(1884);var a=n(144),l=n(7559),r=n(8131);const i=["sm","md","lg","xl"],s=(()=>i.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}))(),o=(()=>i.reduce(((e,t)=>(e["offset"+(0,r.jC)(t)]={type:[String,Number],default:null},e)),{}))(),d=(()=>i.reduce(((e,t)=>(e["order"+(0,r.jC)(t)]={type:[String,Number],default:null},e)),{}))(),u={col:Object.keys(s),offset:Object.keys(o),order:Object.keys(d)};function c(e,t,n){let a=e;if(null!=n&&!1!==n){if(t){const n=t.replace(e,"");a+=`-${n}`}return"col"!==e||""!==n&&!0!==n?(a+=`-${n}`,a.toLowerCase()):a.toLowerCase()}}const f=new Map;t["Z"]=a.ZP.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...s,offset:{type:[String,Number],default:null},...o,order:{type:[String,Number],default:null},...d,alignSelf:{type:String,default:null,validator:e=>["auto","start","end","center","baseline","stretch"].includes(e)},tag:{type:String,default:"div"}},render(e,{props:t,data:n,children:a,parent:r}){let i="";for(const l in t)i+=String(t[l]);let s=f.get(i);if(!s){let e;for(e in s=[],u)u[e].forEach((n=>{const a=t[n],l=c(e,n,a);l&&s.push(l)}));const n=s.some((e=>e.startsWith("col-")));s.push({col:!n||!t.cols,[`col-${t.cols}`]:t.cols,[`offset-${t.offset}`]:t.offset,[`order-${t.order}`]:t.order,[`align-self-${t.alignSelf}`]:t.alignSelf}),f.set(i,s)}return e(t.tag,(0,l.ZP)(n,{class:s}),a)}})},1819:function(e,t,n){n.d(t,{Z:function(){return i}});n(9027),n(1884);var a=n(144);function l(e){return a.ZP.extend({name:`v-${e}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(t,{props:n,data:a,children:l}){a.staticClass=`${e} ${a.staticClass||""}`.trim();const{attrs:r}=a;if(r){a.attrs={};const e=Object.keys(r).filter((e=>{if("slot"===e)return!1;const t=r[e];return e.startsWith("data-")?(a.attrs[e]=t,!1):t||"string"===typeof t}));e.length&&(a.staticClass+=` ${e.join(" ")}`)}return n.id&&(a.domProps=a.domProps||{},a.domProps.id=n.id),t(n.tag,a,l)}})}var r=n(7559),i=l("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(e,{props:t,data:n,children:a}){let l;const{attrs:i}=n;return i&&(n.attrs={},l=Object.keys(i).filter((e=>{if("slot"===e)return!1;const t=i[e];return e.startsWith("data-")?(n.attrs[e]=t,!1):t||"string"===typeof t}))),t.id&&(n.domProps=n.domProps||{},n.domProps.id=t.id),e(t.tag,(0,r.ZP)(n,{staticClass:"container",class:Array({"container--fluid":t.fluid}).concat(l||[])}),a)}})},7894:function(e,t,n){n(1884);var a=n(144),l=n(7559),r=n(8131);const i=["sm","md","lg","xl"],s=["start","end","center"];function o(e,t){return i.reduce(((n,a)=>(n[e+(0,r.jC)(a)]=t(),n)),{})}const d=e=>[...s,"baseline","stretch"].includes(e),u=o("align",(()=>({type:String,default:null,validator:d}))),c=e=>[...s,"space-between","space-around"].includes(e),f=o("justify",(()=>({type:String,default:null,validator:c}))),p=e=>[...s,"space-between","space-around","stretch"].includes(e),g=o("alignContent",(()=>({type:String,default:null,validator:p}))),m={align:Object.keys(u),justify:Object.keys(f),alignContent:Object.keys(g)},b={align:"align",justify:"justify",alignContent:"align-content"};function h(e,t,n){let a=b[e];if(null!=n){if(t){const n=t.replace(e,"");a+=`-${n}`}return a+=`-${n}`,a.toLowerCase()}}const y=new Map;t["Z"]=a.ZP.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d},...u,justify:{type:String,default:null,validator:c},...f,alignContent:{type:String,default:null,validator:p},...g},render(e,{props:t,data:n,children:a}){let r="";for(const l in t)r+=String(t[l]);let i=y.get(r);if(!i){let e;for(e in i=[],m)m[e].forEach((n=>{const a=t[n],l=h(e,n,a);l&&i.push(l)}));i.push({"no-gutters":t.noGutters,"row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),y.set(r,i)}return e(t.tag,(0,l.ZP)(n,{staticClass:"row",class:i}),a)}})}}]);
//# sourceMappingURL=1196.c59f6d88.js.map