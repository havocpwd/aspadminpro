(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[5399],{5399:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return S}});var a=r(3381),o=r(1819),n=r(2503),s=r(7294),i=r(9088),l=r(3328),d=r(2515),u=r(9007),c=r(2732),p=function(){var t=this,e=t._self._c;return e(o.Z,{staticClass:"full-height",attrs:{fluid:""}},[e(n.Z,{staticClass:"elevation-1",attrs:{headers:t.headers,options:t.tableOptions,"footer-props":{"items-per-page-options":[60,70,100,-1]},items:t.orders,search:t.search,"items-per-page":30,loading:t.loading,"loading-text":"Loading... Please wait",dense:"","hide-default-footer":!0},scopedSlots:t._u([{key:"top",fn:function(){return[e(c.Z,{attrs:{flat:""}},[e(l.Z,{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function({on:r,attrs:a}){return[e(u.Z,t._g(t._b({attrs:{label:"Periode","prepend-icon":"mdi-calendar",readonly:"",rounded:""},model:{value:t.dateRangeText,callback:function(e){t.dateRangeText=e},expression:"dateRangeText"}},"v-text-field",a,!1),r))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[e(s.Z,{attrs:{range:""},on:{change:t.retrieveorders},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},[e(d.Z),e(a.Z,{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v(" Cancel ")]),e(a.Z,{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.dates)}}},[t._v(" OK ")])],1)],1),e(d.Z),e(a.Z,{attrs:{color:"primary",dark:"",icon:""},on:{click:t.printReport}},[e(i.Z,[t._v("mdi-printer")])],1)],1)]},proxy:!0}])})],1)},g=[],f=r(4226),h=r(6727),m=r.n(h),y=r(7920),v=r(5860);m().vfs=y.I.vfs;var x={data:()=>({loading:!1,search:"",menu:!1,dates:["2019-09-10","2019-09-20"],tableOptions:{itemsPerPage:60},headers:[{text:"No",value:"index",class:"primary"},{text:"Order No",align:"start",value:"orderNo",class:"primary"},{text:"Date Issued",value:"dateIssued",class:"primary"},{text:"Customer",value:"partner",class:"primary"},{text:"deliverTo",value:"deliverTo",class:"primary"},{text:"Note",value:"note",class:"primary"},{text:"Diskon",value:"discount",class:"primary"},{text:"Ongkos Kirim",value:"deliveryFee",class:"primary"},{text:"HPP",value:"cogsTotal",class:"primary"},{text:"Total",value:"grandTotal",class:"primary"}],orders:[],dateStart:new Date,dateEnd:new Date}),computed:{dateRangeText(){return this.dates.join(" ~ ")}},mounted(){this.getPeriodeDate(),this.retrieveorders()},methods:{getPeriodeDate(){let t=new Date;t.setDate(24);let e=new Date;t.getDate()>=e.getDate()&&t.getMonth()==e.getMonth()?(this.dateStart.setDate(24),this.dateStart.setMonth(this.dateStart.getMonth()-1),this.dateEnd.setDate(this.dateStart.getDate()+30),this.dateEnd.setMonth(this.dateEnd.getMonth()-1)):(this.dateStart.setDate(24),this.dateEnd.setDate(this.dateStart.getDate()+30),this.dateEnd.setMonth(this.dateEnd.getMonth())),this.dates=[this.dateStart.toISOString().substring(0,10),this.dateEnd.toISOString().substring(0,10)]},retrieveorders(){f.Z.getOrdersReports(this.dates[0],this.dates[1]).then((t=>{this.loading=!1,this.orders=t.data.orders.map(this.getDisplay)})).catch((t=>{console.log(t)}))},getDisplay(t,e){return{index:e+1,id:t.id,orderNo:t.orderNo,dateIssued:this.$moment(t.dateIssued,"YYYY-MM-DD").format("LL"),partner:t.partners,deliverTo:t.deliverTo,deliveryFee:t.deliveryFee,discount:t.discount,note:t.note,payment:t.payments,grandTotal:t.grandTotal,cogsTotal:t.cogsTotal,orderDetailTotal:t.orderDetailTotal}},async printReport(){const t=await v.createSalesReport(this.orders,this.dates),e=await m().createPdf(t);e.open()}}},T=x,b=r(1001),D=(0,b.Z)(T,p,g,!1,null,null,null),S=D.exports},1884:function(){},5860:function(t,e){e.createSalesReport=async(t,e)=>{function r(t){return"Rp. "+t.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")}let a=[];function o(t){for(var e=0,r=0;r<t.length;r++)e+=t[r].grandTotal;return e}function n(t){for(var e=0,r=0;r<t.length;r++)e+=t[r].profit;return e}function s(t){var e=0;return e=.025*t,e}t.forEach((function(t){var e={};let r=new Date(t.dateIssued);e.dateIssued=r.toLocaleDateString("en-US",{day:"numeric",month:"numeric",year:"numeric"}),e.deliverTo=t.deliverTo,e.deliveryFee=t.deliveryFee,e.discount=t.discount,e.note=t.note,e.orderNo=t.orderNo,e.partner=t.partner,e.payment=t.payment,e.cogsTotal=t.cogsTotal,e.orderDetailTotal=t.orderDetailTotal,e.grandTotal=t.grandTotal,e.profit=t.grandTotal-t.cogsTotal,a.push(e)}));let i=[];function l(t){var e=o(a),i=n(a),l=s(i),d=["no","orderNo","dateIssued","partner","deliverTo","cogsTotal","grandTotal","profit"],u=[];return u.push([{fillColor:"#3A4D8F",text:"No",style:"tableHeader"},{fillColor:"#3A4D8F",text:"No Invoice",style:"tableHeader"},{fillColor:"#3A4D8F",text:"Tanggal",style:"tableHeader"},{fillColor:"#3A4D8F",text:"Pelanggan",style:"tableHeader"},{fillColor:"#3A4D8F",text:"dikirim ke",style:"tableHeader"},{fillColor:"#3A4D8F",text:"HPP",style:"tableHeader"},{fillColor:"#3A4D8F",text:"Total Invoice",style:"tableHeader"},{fillColor:"#3A4D8F",text:"Profit",style:"tableHeader"}]),t.forEach((function(t){var e=[];d.forEach((function(r){e.push({text:t[r].toString(),style:"contentleft",fontSize:8})})),u.push(e)})),u.push([{colSpan:6,text:"Grant Total :",style:"subheader"},"","","","","",{text:r(e),style:"subheader"},{text:r(i),style:"subheader"}]),u.push([{colSpan:6,text:"Sedekah 2,5% :",style:"subheader"},"","","","","","",{text:r(l),style:"subheader"}]),u}a.forEach((function(t,e){var a={};a.no=e+1,a.dateIssued=t.dateIssued,a.deliverTo=t.deliverTo,a.deliveryFee=t.deliveryFee,a.discount=t.discount,a.note=t.note,a.orderNo=t.orderNo,a.partner=t.partner,a.payment=t.payment,a.cogsTotal=r(t.cogsTotal),a.orderDetailTotal=r(t.orderDetailTotal),a.grandTotal=r(t.grandTotal),a.profit=r(t.profit),i.push(a)}));let d={content:[{columns:[{text:"Laporan Pendapatan Bulanan",style:"header"},{text:"Periode : "+e,style:"subheader"}]},{style:"tableExample",table:{headerRows:1,widths:["auto","auto","auto","auto","auto","*","*","*"],body:l(i)},layout:{hLineWidth:function(t,e){return 0===t||e.table.body.length,1},vLineWidth:function(t,e){return 0===t||e.table.widths.length,1},hLineColor:function(t,e){return"grey"},vLineColor:function(t,e){return"grey"},fillColor:function(t,e,r){return t%2===0?"#CCCCCC":null}}},{text:"* Laporan ini dibuat berdasarkan dengan data yang sudah masuk kedalam system.",style:"small"}],styles:{header:{fontSize:10,bold:!0,color:"#3A4D8F",margin:[0,0,0,30]},subheader:{fontSize:8,alignment:"right",margin:[0,0,0,1]},contentleft:{fontSize:10,margin:[0,2,0,2]},contentup:{fontSize:10,bold:!0,margin:[0,30,0,0]},superMargin:{margin:[20,0,40,0],fontSize:15},small:{fontSize:8,margin:[0,40,40,20],italics:!0},tableExample:{margin:[0,0,0,0]},tableHeader:{bold:!0,fontSize:10,color:"white"}}};return d}},4226:function(t,e,r){"use strict";var a=r(3390);class o{getOrdersReports(t,e){return a.Z.get(`reports/orders?start=${t}&end=${e}`)}getPurchaseOrdersReports(t,e){return a.Z.get(`reports/purchaseorders?start=${t}&end=${e}`)}getOrderByPartner(t,e,r){return a.Z.get(`reports/customersorders?start=${t}&end=${e}&id=${r}`)}getPurchaseOrderByPartner(t,e,r){return a.Z.get(`reports/customerspurchaseorders?start=${t}&end=${e}&id=${r}`)}}e["Z"]=new o},1819:function(t,e,r){"use strict";r.d(e,{Z:function(){return s}});r(9027),r(1884);var a=r(144);function o(t){return a.ZP.extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:r,data:a,children:o}){a.staticClass=`${t} ${a.staticClass||""}`.trim();const{attrs:n}=a;if(n){a.attrs={};const t=Object.keys(n).filter((t=>{if("slot"===t)return!1;const e=n[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}));t.length&&(a.staticClass+=` ${t.join(" ")}`)}return r.id&&(a.domProps=a.domProps||{},a.domProps.id=r.id),e(r.tag,a,o)}})}var n=r(7559),s=o("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:r,children:a}){let o;const{attrs:s}=r;return s&&(r.attrs={},o=Object.keys(s).filter((t=>{if("slot"===t)return!1;const e=s[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),e.id&&(r.domProps=r.domProps||{},r.domProps.id=e.id),t(e.tag,(0,n.ZP)(r,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(o||[])}),a)}})}}]);
//# sourceMappingURL=5399.04646970.js.map