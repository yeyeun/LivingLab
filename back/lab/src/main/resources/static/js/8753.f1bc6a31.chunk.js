"use strict";(self.webpackChunklab=self.webpackChunklab||[]).push([[8753],{58911:(e,t,n)=>{n.d(t,{f:()=>h,T:()=>k});var a=n(65043),o=n(29827),i=n(61906),s=n(54705);const r="__react-kakao-maps-sdk__";let l=function(e){return e[e.INITIALIZED=0]="INITIALIZED",e[e.LOADING=1]="LOADING",e[e.SUCCESS=2]="SUCCESS",e[e.FAILURE=3]="FAILURE",e}({});const d="".concat(r,"_Loader");class c{constructor(e){(0,s.A)(this,"callbacks",[]),(0,s.A)(this,"done",!1),(0,s.A)(this,"loading",!1),(0,s.A)(this,"errors",[]);let{appkey:t,id:n=d,libraries:a=[],nonce:o,retries:i=3,url:r="//dapi.kakao.com/v2/maps/sdk.js"}=e;if(this.id=n,this.appkey=t,this.libraries=a,this.nonce=o,this.retries=i,this.url=r,c.instance&&!c.equalOptions(this.options,c.instance.options)&&!c.equalOptions(this.options,c.instance.options)){if(c.instance.status===l.FAILURE)throw new Error("Loader must not be called again with different options. \n".concat(JSON.stringify(this.options,null,2),"\n!==\n").concat(JSON.stringify(c.instance.options,null,2)));c.instance.reset(),c.instance=this}return c.instance||(c.instance=this),c.instance}get options(){return{appkey:this.appkey,id:this.id,libraries:this.libraries,nonce:this.nonce,retries:this.retries,url:this.url}}static addLoadEventLisnter(e){return window.kakao&&window.kakao.maps&&window.kakao.maps.load(e),c.loadEventCallback.add(e),e}static removeLoadEventLisnter(e){return c.loadEventCallback.delete(e)}load(){return new Promise(((e,t)=>{this.loadCallback((n=>{n?t(n):e(window.kakao)}))}))}get status(){return this.onEvent?l.FAILURE:this.done?l.SUCCESS:this.loading?l.LOADING:l.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}loadCallback(e){this.callbacks.push(e),this.execute()}resetIfRetryingFailed(){this.failed&&this.reset()}reset(){this.deleteScript(),this.done=!0,this.loading=!1,this.errors=[],this.onEvent=void 0}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.kakao&&window.kakao.maps)return console.warn("Kakao Maps\uc774 \uc774\ubbf8 \uc678\ubd80 \uc694\uc18c\uc5d0 \uc758\ud574 \ub85c\ub529\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.\uc124\uc815\ud55c \uc635\uc158\uacfc \uc77c\uce58 \ud558\uc9c0 \uc54a\uc744 \uc218 \uc788\uc73c\uba70, \uc774\uc5d0 \ub530\ub978 \uc608\uc0c1\uce58 \ub3d9\uc791\uc774 \ubc1c\uc0dd\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),void window.kakao.maps.load(this.callback);this.loading||(this.loading=!0,this.setScript())}}setScript(){document.getElementById(this.id)&&this.callback();const e=this.createUrl(),t=document.createElement("script");t.id=this.id,t.type="text/javascript",t.src=e,t.onerror=this.loadErrorCallback.bind(this),t.onload=this.callback.bind(this),t.defer=!0,t.async=!0,this.nonce&&(t.nonce=this.nonce),document.head.appendChild(t)}loadErrorCallback(e){if(this.errors.push(e),this.errors.length<=this.retries){const e=this.errors.length*2**this.errors.length;console.log("Failed to load Kakao Maps script, retrying in ".concat(e," ms.")),setTimeout((()=>{this.deleteScript(),this.setScript()}),e)}else this.done=!0,this.loading=!1,this.onEvent=this.errors[this.errors.length-1],this.callbacks.forEach((e=>{e(this.onEvent)})),this.callbacks=[],c.loadEventCallback.forEach((e=>{e(this.onEvent)}))}createUrl(){let e=this.url;return e+="?appkey=".concat(this.appkey),this.libraries.length&&(e+="&libraries=".concat(this.libraries.join(","))),e+="&autoload=false",e}deleteScript(){const e=document.getElementById(this.id);e&&e.remove()}callback(){kakao.maps.load((()=>{c.instance.done=!0,c.instance.loading=!1,c.instance.callbacks.forEach((e=>{e(c.instance.onEvent)})),c.instance.callbacks=[],c.loadEventCallback.forEach((e=>{e(c.instance.onEvent)}))}))}static equalOptions(e,t){if(e.appkey!==t.appkey)return!1;if(e.id!==t.id)return!1;if(e.libraries.length!==t.libraries.length)return!1;for(let n=0;n<e.libraries.length;++n)if(e.libraries[n]!==t.libraries[n])return!1;return e.nonce===t.nonce&&(e.retries===t.retries&&e.url===t.url)}}(0,s.A)(c,"loadEventCallback",new Set);var u=n(2474),p=n(70579);const h=a.createContext(void 0),k=a.forwardRef((function(e,t){let{id:n,as:s,children:l,center:d,isPanto:k=!1,padding:g=32,disableDoubleClick:v,disableDoubleClickZoom:m,draggable:f,zoomable:b,keyboardShortcuts:E,level:y,maxLevel:w,minLevel:C,mapTypeId:L,projectionId:I,scrollwheel:S,tileAnimation:x,onBoundsChanged:M,onCenterChanged:A,onClick:D,onDoubleClick:z,onDrag:O,onDragEnd:R,onDragStart:T,onIdle:P,onMaptypeidChanged:j,onMouseMove:_,onRightClick:Z,onTileLoaded:N,onZoomChanged:U,onZoomStart:F,onCreate:q,...H}=e;const B=s||"div",[G,J]=(0,a.useState)(!1),[K,W]=(0,a.useState)(),Q=(0,a.useRef)(null);return(0,o.E)((()=>{const e=c.addLoadEventLisnter((e=>J(!e)));return()=>{c.removeLoadEventLisnter(e)}}),[]),(0,o.E)((()=>{if(!G)return;const e=Q.current;if(!e)return;const t="lat"in d?new kakao.maps.LatLng(d.lat,d.lng):new kakao.maps.Coords(d.x,d.y),n=new kakao.maps.Map(e,{center:t,disableDoubleClick:v,disableDoubleClickZoom:m,draggable:f,keyboardShortcuts:E,level:y,mapTypeId:"string"===typeof L?kakao.maps.MapTypeId[L]:L,projectionId:I,scrollwheel:S,tileAnimation:x});return W(n),()=>{e.innerHTML=""}}),[G,v,m,x]),(0,a.useImperativeHandle)(t,(()=>K),[K]),(0,o.E)((()=>{K&&q&&q(K)}),[K,q]),(0,o.E)((()=>{if(!K)return;let e=K.getCenter();e instanceof kakao.maps.Coords&&(e=e.toLatLng());const t="lat"in d?new kakao.maps.LatLng(d.lat,d.lng):new kakao.maps.Coords(d.x,d.y);t instanceof kakao.maps.LatLng&&t.equals(e)||t instanceof kakao.maps.Coords&&t.toLatLng().equals(e)||(k?K.panTo(t,g):K.setCenter(t))}),[K,d.lat,d.lng,d.x,d.y]),(0,u.t)(K,"setDraggable",f),(0,u.t)(K,"setZoomable",b),(0,u.t)(K,"setKeyboardShortcuts",E),(0,u.t)(K,"setLevel",y),(0,u.t)(K,"setMapTypeId",G?"string"===typeof L?kakao.maps.MapTypeId[L]:L:void 0),(0,u.t)(K,"setProjectionId",I),(0,u.t)(K,"setMinLevel",w),(0,u.t)(K,"setMaxLevel",C),(0,i.l)(K,"bounds_changed",M),(0,i.l)(K,"center_changed",A),(0,i.l)(K,"click",D),(0,i.l)(K,"dblclick",z),(0,i.l)(K,"drag",O),(0,i.l)(K,"dragstart",T),(0,i.l)(K,"dragend",R),(0,i.l)(K,"idle",P),(0,i.l)(K,"maptypeid_changed",j),(0,i.l)(K,"mousemove",_),(0,i.l)(K,"rightclick",Z),(0,i.l)(K,"tilesloaded",N),(0,i.l)(K,"zoom_changed",U),(0,i.l)(K,"zoom_start",F),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(B,{id:n||"".concat(r,"_Map"),...H,ref:Q}),K&&(0,p.jsx)(h.Provider,{value:K,children:l})]})}))},28753:(e,t,n)=>{n.d(t,{f:()=>p});var a=n(65043),o=n(58911);var i=n(61906),s=n(97950),r=n(2474);const l=a.forwardRef((function(e,t){var n;let{map:o,position:i,marker:l,children:d,altitude:c,disableAutoPan:u,range:p,removable:h,zIndex:k,onCreate:g}=e;const v=(0,a.useMemo)((()=>{const e=document.createElement("div");e.style.display="none";return new kakao.maps.InfoWindow({altitude:c,disableAutoPan:u,range:p,removable:h,zIndex:k,content:e,position:i})}),[u,h]),m=(0,a.useMemo)((()=>v.getContent()),[v]);return(0,a.useImperativeHandle)(t,(()=>v),[v]),(0,a.useLayoutEffect)((()=>(v.open(o,l),()=>{v.close()})),[o,l]),(0,a.useLayoutEffect)((()=>{g&&g(v)}),[v,g]),(0,r.t)(v,"setPosition",i),(0,r.t)(v,"setAltitude",c),(0,r.t)(v,"setRange",p),(0,r.t)(v,"setZIndex",k),s.createPortal(d,null!==(n=m.parentElement)&&void 0!==n?n:m)}));var d=n(70579);const c=a.createContext(void 0),u=a.forwardRef((function(e,t){let{map:n,position:o,children:s,altitude:u,clickable:p,draggable:h,image:k,infoWindowOptions:g,onCreate:v,onClick:m,onDragEnd:f,onDragStart:b,onMouseOut:E,onMouseOver:y,opacity:w,range:C,title:L,zIndex:I}=e;const S=(0,a.useContext)(c),x=(0,a.useMemo)((()=>{var e,t,n,a,o,i,s,r,l,d,c,u;return k&&new kakao.maps.MarkerImage(k.src,new kakao.maps.Size(k.size.width,k.size.height),{alt:null===(e=k.options)||void 0===e?void 0:e.alt,coords:null===(t=k.options)||void 0===t?void 0:t.coords,offset:(null===(n=k.options)||void 0===n?void 0:n.offset)&&new kakao.maps.Point(null===(a=k.options)||void 0===a?void 0:a.offset.x,null===(o=k.options)||void 0===o?void 0:o.offset.y),shape:null===(i=k.options)||void 0===i?void 0:i.shape,spriteOrigin:(null===(s=k.options)||void 0===s?void 0:s.spriteOrigin)&&new kakao.maps.Point(null===(r=k.options)||void 0===r?void 0:r.spriteOrigin.x,null===(l=k.options)||void 0===l?void 0:l.spriteOrigin.y),spriteSize:(null===(d=k.options)||void 0===d?void 0:d.spriteSize)&&new kakao.maps.Size(null===(c=k.options)||void 0===c?void 0:c.spriteSize.width,null===(u=k.options)||void 0===u?void 0:u.spriteSize.height)})}),[JSON.stringify(k)]),M=(0,a.useMemo)((()=>new kakao.maps.Marker({altitude:u,clickable:p,draggable:h,image:x,opacity:w,range:C,title:L,zIndex:I,position:o})),[]);return(0,a.useImperativeHandle)(t,(()=>M),[M]),(0,a.useLayoutEffect)((()=>S?(S.addMarker(M,!0),()=>S.removeMarker(M,!0)):(M.setMap(n),()=>M.setMap(null))),[n,S,M]),(0,a.useLayoutEffect)((()=>{v&&v(M)}),[M,v]),(0,r.t)(M,"setPosition",o),(0,r.t)(M,"setImage",x),(0,r.t)(M,"setAltitude",u),(0,r.t)(M,"setClickable",p),(0,r.t)(M,"setDraggable",h),(0,r.t)(M,"setOpacity",w),(0,r.t)(M,"setRange",C),(0,r.t)(M,"setRange",C),(0,r.t)(M,"setTitle",L),(0,r.t)(M,"setTitle",L),(0,r.t)(M,"setZIndex",I),(0,i.l)(M,"click",m),(0,i.l)(M,"dragstart",b),(0,i.l)(M,"dragend",f),(0,i.l)(M,"mouseout",E),(0,i.l)(M,"mouseover",y),s?(0,d.jsx)(l,{position:o,map:n,marker:M,altitude:null===g||void 0===g?void 0:g.altitude,disableAutoPan:null===g||void 0===g?void 0:g.disableAutoPan,range:null===g||void 0===g?void 0:g.range,removable:null===g||void 0===g?void 0:g.removable,zIndex:null===g||void 0===g?void 0:g.zIndex,children:s}):null})),p=a.forwardRef((function(e,t){let{position:n,...i}=e;const s=(e=>{const t=(0,a.useContext)(o.f);if(!t)throw new Error("".concat(e?e+" Component":"useMap"," must exist inside Map Component!"));return t})("MapMarker"),r=(0,a.useMemo)((()=>"lat"in n?new kakao.maps.LatLng(n.lat,n.lng):new kakao.maps.Coords(n.x,n.y).toLatLng()),[n.lat,n.lng,n.x,n.y]);return(0,d.jsx)(u,{map:s,position:r,...i,ref:t})}))},29827:(e,t,n)=>{n.d(t,{E:()=>o});var a=n(65043);const o="undefined"!==typeof window&&"undefined"!==typeof document?a.useLayoutEffect:a.useEffect},61906:(e,t,n)=>{n.d(t,{l:()=>o});var a=n(29827);const o=(e,t,n)=>{(0,a.E)((()=>{if(!e||!n)return;const a=function(){for(var t=arguments.length,a=new Array(t),o=0;o<t;o++)a[o]=arguments[o];return void 0===a?n(e):n(e,...a)};return kakao.maps.event.addListener(e,t,a),()=>{kakao.maps.event.removeListener(e,t,a)}}),[e,t,n])}},2474:(e,t,n)=>{n.d(t,{t:()=>o});var a=n(29827);const o=function(e,t){for(var n=arguments.length,o=new Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];(0,a.E)((()=>{e&&!o.every((e=>"undefined"===typeof e))&&e[t].call(e,...o)}),[e,t,...o])}}}]);
//# sourceMappingURL=8753.f1bc6a31.chunk.js.map