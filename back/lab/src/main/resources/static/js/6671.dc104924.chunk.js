"use strict";(self.webpackChunklab=self.webpackChunklab||[]).push([[6671],{63280:(e,t,l)=>{l.d(t,{A:()=>c});var s=l(73216),a=l(35475);const n=(e,t)=>e?parseInt(e):t,c=()=>{const e=(0,s.Zp)(),[t]=(0,a.ok)(),l=n(t.get("page"),1),c=n(t.get("size"),10),o=(0,a.PI)({page:l,size:c}).toString();return{moveToList:t=>{let l="";if(t){const e=n(t.page,1),s=n(t.size,10);l=(0,a.PI)({page:e,size:s}).toString()}else l=o;e({pathname:"../help/list",search:l})},moveToModify:t=>{console.log(o),e({pathname:"../help/modify/".concat(t),search:o})},moveToRead:t=>{console.log(o),e({pathname:"../help/read/".concat(t),search:o})},moveToAdd:()=>{e({pathname:"../help/add",search:""})},page:l,size:c}}},6671:(e,t,l)=>{l.r(t),l.d(t,{default:()=>N});var s=l(73216),a=l(35692),n=l(65043),c=l(83003),o=l(13400),i=l(80311),r=l(77694),m=l(63280),d=l(54949),x=l(49379),h=l(71753),p=l(51358),u=l(70579);const g={commNo:0,title:"",content:"",commHit:0,commCategory:"",uploadFileNames:[]},j={likeNo:0,id:0,commNo:0},b=o.i$,f=e=>{let{commNo:t}=e;const[l,s]=(0,n.useState)(null),[f,N]=(0,n.useState)(null),[v,y]=(0,n.useState)(g),[w,k]=(0,n.useState)(""),[S,C]=(0,n.useState)([]),{moveToList:F,moveToModify:A}=(0,m.A)(),T=(0,c.d4)((e=>e.loginSlice)),z=null===T||void 0===T?void 0:T.id,E=null===T||void 0===T?void 0:T.email,[D,I]=(0,n.useState)({}),[M,H]=(0,n.useState)(j),[K,L]=(0,n.useState)(null);(0,n.useEffect)((()=>{(0,o.mZ)(t).then((e=>{console.log(e),y(e)}))}),[t,K]),(0,n.useEffect)((()=>{(0,i.vS)(t).then((e=>{C(e)}))}),[t,f]),(0,n.useEffect)((()=>{E&&(0,r.Mg)(t,z).then((e=>{H(e),I(!!e)}))}),[E,K]);const P=e=>{N(e)},Z=()=>{if(!E)return void N("\ub85c\uadf8\uc778 \ud6c4 \uc774\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4");if(!w)return void N("\ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694");const e={id:z,content:w,commNo:t};(0,i.Oe)(e),N("\ub313\uae00\uc774 \ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),k("")};return(0,u.jsxs)("div",{className:"relative p-4",children:[(0,u.jsx)("div",{className:"max-w-5xl mx-auto",children:(0,u.jsx)("div",{className:"mt-3 w-full rounded-b flex flex-col justify-between leading-normal",children:(0,u.jsxs)("div",{children:[l&&(0,u.jsx)(d.A,{title:"\uc54c\ub9bc",content:"".concat(l),callbackFn:()=>{s(null),F()}}),(0,u.jsx)("div",{className:"mb-2",children:(0,u.jsx)("span",{className:"text-slate-900 text-base bg-teal-200 rounded-3xl px-2 pt-0.5 pb-1",children:"\ub3c4\uc6c0\uc694\uccad"})}),(0,u.jsx)("h1",{className:"text-gray-900 font-bold text-3xl",children:v.title}),(0,u.jsxs)("div",{className:"py-5 text-sm font-regular text-gray-900 flex",children:[(0,u.jsx)("p",{className:"mr-3 flex flex-row items-center",children:(0,u.jsx)("p",{className:"ml-1",children:v.nickname})}),(0,u.jsx)("p",{className:"mr-3 flex flex-row items-center",children:(0,u.jsx)("p",{className:"ml-1",children:"2024-06-02"})}),(0,u.jsxs)("p",{className:"ml-auto mr-2 flex flex-row",children:[(0,u.jsx)("img",{src:E&&D?h:x,onClick:()=>{if(E){if(D)(0,r.n$)(M.likeNo),(0,o.Gj)(t),L("\uc88b\uc544\uc694 \ubaa9\ub85d\uc5d0\uc11c \uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4");else{const e={id:z,commNo:t};(0,r.sS)(e),(0,o.u5)(t),L("\uc88b\uc544\uc694 \ubaa9\ub85d\uc5d0 \ucd94\uac00\ub418\uc5c8\uc2b5\ub2c8\ub2e4")}I(!D)}else L("\ub85c\uadf8\uc778 \ud6c4 \uc774\uc6a9 \uac00\ub2a5\ud569\ub2c8\ub2e4")},alt:"...",className:"w-5 mr-3 inline"}),(0,u.jsx)("span",{className:"mx-1",children:v.commHit})]})]}),(0,u.jsx)("hr",{}),v.uploadFileNames.map(((e,t)=>(0,u.jsx)("img",{alt:"help",width:600,src:"".concat(b,"/api/community/help/display/").concat(e),className:"my-3"},t))),(0,u.jsx)("p",{className:"text-base leading-8 my-5",children:v.content.split("\n").map((e=>(0,u.jsxs)("span",{children:[e,(0,u.jsx)("br",{})]})))}),(0,u.jsx)("hr",{}),(0,u.jsxs)("div",{className:"flex justify-center space-x-2 mt-4",children:[z===v.id?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("button",{type:"button",className:"bg-gray-400 text-white rounded-md text-sm px-1 py-0.5 hover:bg-gray-500 ml-1",onClick:()=>A(t),children:"\uc218\uc815\ud558\uae30"}),(0,u.jsx)("button",{type:"button",className:"bg-gray-400 text-white rounded-md text-sm px-1 py-0.5 hover:bg-gray-500 ml-1",onClick:e=>{(0,o.oK)(t),s("\uac8c\uc2dc\uae00\uc774 \uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4")},children:"\uc0ad\uc81c\ud558\uae30"})]}):(0,u.jsx)(u.Fragment,{}),(0,u.jsx)("button",{type:"button",className:"bg-gray-400 text-white rounded-md text-sm px-1 py-0.5 hover:bg-gray-500 ml-1",onClick:()=>F(),children:"\ubaa9\ub85d\uc73c\ub85c \uc774\ub3d9"})]}),(0,u.jsx)("div",{children:(0,u.jsxs)("div",{className:"my-6 flex items-center space-x-2",children:[(0,u.jsx)("input",{type:"text",placeholder:"\ub313\uae00\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694",value:w,className:"flex-1 py-2 px-2 text-base bg-white rounded-lg border border-gray-200",onChange:e=>k(e.target.value),onKeyDown:e=>"Enter"===e.key?Z():null}),(0,u.jsx)("button",{type:"button",className:"py-2.5 px-4 text-xs font-medium text-center text-white bg-subColor opacity-90 rounded-lg hover:bg-amber-900",onClick:Z,children:"\ub313\uae00 \ub4f1\ub85d"})]})}),S.length>0?S.map((e=>(0,u.jsx)(a.A,{replyNo:e.replyNo,id:e.id,content:e.content,regDate:e.regDate,isWriter:v.id===e.id,isEdit:z===e.id,callbackFn:P}))):(0,u.jsx)("div",{className:"flex justify-center text-base",children:"\ub4f1\ub85d\ub41c \ub313\uae00\uc774 \uc5c6\uc2b5\ub2c8\ub2e4"})]})})}),f&&(0,u.jsx)(d.A,{title:"\uc54c\ub9bc",content:"".concat(f),callbackFn:()=>N(null)}),K&&(0,u.jsx)(p.A,{title:"\uc54c\ub9bc",content:"".concat(K),callbackFn:()=>{L(null)}})]})},N=()=>{const{commNo:e}=(0,s.g)();return(0,u.jsx)("div",{className:"text-xl flex-grow",children:(0,u.jsx)("div",{className:"m-auto bg-white w-5/6 rounded-md py-16",children:(0,u.jsx)("div",{className:"flex flex-col",children:(0,u.jsx)("div",{className:"overflow-x-auto sm:-mx-6 lg:-mx-8",children:(0,u.jsx)("div",{className:"inline-block min-w-full py-2 sm:px-6 lg:px-8",children:(0,u.jsxs)("div",{className:"overflow-hidden",children:[(0,u.jsx)("div",{className:"text-xl font-semibold pl-2 my-2 border-l-4 border-teal-300",children:"\ub3c4\uc6c0\uc694\uccad"}),(0,u.jsx)(f,{commNo:e})]})})})})})})}}}]);
//# sourceMappingURL=6671.dc104924.chunk.js.map