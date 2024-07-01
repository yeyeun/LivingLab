"use strict";(self.webpackChunklab=self.webpackChunklab||[]).push([[2829],{13400:(e,t,a)=>{a.d(t,{Fp:()=>l,Gj:()=>A,L1:()=>x,QM:()=>h,Qp:()=>r,Ur:()=>m,YX:()=>i,ZD:()=>y,Z_:()=>v,hK:()=>b,i$:()=>s,iC:()=>j,lg:()=>u,mZ:()=>w,nC:()=>f,no:()=>g,oK:()=>d,qw:()=>C,r_:()=>p,u5:()=>N,uF:()=>o,zu:()=>k});var n=a(86213);const s="http://localhost:8282",c="".concat(s,"/api/community"),l=async e=>(await n.A.post("".concat(c,"/tip/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,i=async(e,t,a)=>{const{page:s,size:l}=e;return(await n.A.get("".concat(c,"/tip/list"),{params:{page:s,size:l,search:t,sort:a}})).data},o=async e=>(await n.A.get("".concat(c,"/tip/read/").concat(e))).data,r=async(e,t)=>(await n.A.put("".concat(c,"/tip/modify/").concat(e),t,{headers:{"Content-Type":"multipart/form-data"}})).data,d=async e=>(await n.A.delete("".concat(c,"/delete/").concat(e))).data,m=async e=>(await n.A.post("".concat(c,"/qna/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,p=async(e,t,a)=>{const{page:s,size:l}=e;return(await n.A.get("".concat(c,"/qna/list"),{params:{page:s,size:l,search:t,sort:a}})).data},u=async e=>(await n.A.get("".concat(c,"/qna/read/").concat(e))).data,g=async(e,t)=>(await n.A.put("".concat(c,"/qna/modify/").concat(e),t,{headers:{"Content-Type":"multipart/form-data"}})).data,h=async e=>(await n.A.post("".concat(c,"/review/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,f=async(e,t,a)=>{const{page:s,size:l}=e;return(await n.A.get("".concat(c,"/review/list"),{params:{page:s,size:l,search:t,sort:a}})).data},x=async e=>(await n.A.get("".concat(c,"/review/read/").concat(e))).data,y=async(e,t)=>(await n.A.put("".concat(c,"/review/modify/").concat(e),t,{headers:{"Content-Type":"multipart/form-data"}})).data,b=async e=>(await n.A.post("".concat(c,"/help/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,v=async e=>{const{page:t,size:a}=e;return(await n.A.get("".concat(c,"/help/list"),{params:{page:t,size:a}})).data},w=async e=>(await n.A.get("".concat(c,"/help/read/").concat(e))).data,j=async(e,t)=>(await n.A.put("".concat(c,"/help/modify/").concat(e),t,{headers:{"Content-Type":"multipart/form-data"}})).data,N=async e=>(await n.A.put("".concat(c,"/increase/").concat(e))).data,A=async e=>(await n.A.put("".concat(c,"/decrease/").concat(e))).data,C=async e=>{const{page:t,size:a}=e;return(await n.A.get("".concat(c,"/latest"),{params:{page:t,size:a}})).data},k=async e=>(await n.A.get("".concat(c,"/mylist/").concat(e))).data},54949:(e,t,a)=>{a.d(t,{A:()=>s});var n=a(70579);const s=e=>{let{title:t,content:a,callbackFn:s}=e;return(0,n.jsx)("div",{className:"fixed top-0 left-0 z-[1055] flex h-full w-full items-center justify-center bg-black bg-opacity-20",onClick:()=>{s&&s()},children:(0,n.jsxs)("div",{className:"relative bg-white shadow opacity-100 w-1/4 rounded-md px-6 min-w-[300px] flex flex-col items-center",onClick:e=>e.stopPropagation(),children:[(0,n.jsx)("div",{className:"w-full text-center bg-warming-400 mt-6 mb-6 pb-2 text-xl border-b-2 border-gray-500",children:t}),(0,n.jsx)("div",{className:"w-full text-center text-xl pt-4 pb-4",children:a}),(0,n.jsx)("div",{className:"w-full flex justify-center",children:(0,n.jsx)("button",{className:"rounded bg-mainColor mt-4 mb-4 px-6 py-2 text-lg text-white hover:bg-teal-600",onClick:()=>{s&&s()},children:"\ub2eb\uae30"})})]})})}},63280:(e,t,a)=>{a.d(t,{A:()=>l});var n=a(73216),s=a(35475);const c=(e,t)=>e?parseInt(e):t,l=()=>{const e=(0,n.Zp)(),[t]=(0,s.ok)(),a=c(t.get("page"),1),l=c(t.get("size"),10),i=(0,s.PI)({page:a,size:l}).toString();return{moveToList:t=>{let a="";if(t){const e=c(t.page,1),n=c(t.size,10);a=(0,s.PI)({page:e,size:n}).toString()}else a=i;e({pathname:"../help/list",search:a})},moveToModify:t=>{console.log(i),e({pathname:"../help/modify/".concat(t),search:i})},moveToRead:t=>{console.log(i),e({pathname:"../help/read/".concat(t),search:i})},moveToAdd:()=>{e({pathname:"../help/add",search:""})},page:a,size:l}}},12829:(e,t,a)=>{a.r(t),a.d(t,{default:()=>p});var n=a(65043),s=a(13400),c=a(83003),l=a(73216),i=a(54949),o=a(63280),r=a(70579);const d={id:0,type:"4",title:"",content:"",commHit:0,commCategory:"1",nickname:"",files:[]},m=()=>{const[e,t]=(0,n.useState)(null),[a,m]=(0,n.useState)(null),[p,u]=(0,n.useState)({...d}),[g,h]=(0,n.useState)([]),{moveToList:f}=(0,o.A)(),x=(0,n.useRef)(),y=(0,c.d4)((e=>e.loginSlice)),b=y.id,v=null===y||void 0===y?void 0:y.email,w=null===y||void 0===y?void 0:y.nickname,j=(0,l.Zp)();(0,n.useEffect)((()=>{v||j("/user/login")}),[v,j]);const N=e=>{p[e.target.name]=e.target.value,u({...p})},A=e=>{const t=new DataTransfer;Array.from(x.current.files).forEach(((a,n)=>{n!==e&&t.items.add(a)})),x.current.files=t.files};return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"space-y-12 text-base",children:(0,r.jsx)("div",{className:"border-b border-gray-900/10 pb-12",children:(0,r.jsxs)("div",{className:"mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6",children:[e&&(0,r.jsx)(i.A,{title:"\uc54c\ub9bc",content:"".concat(e),callbackFn:()=>{t(null),f()}}),a&&(0,r.jsx)(i.A,{title:"\uc54c\ub9bc",content:"".concat(a),callbackFn:()=>m(null)}),(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)("label",{htmlFor:"title",className:"block font-medium leading-6 text-gray-900",children:"\uc81c\ubaa9"}),(0,r.jsx)("div",{className:"mt-2",children:(0,r.jsx)("input",{type:"text",name:"title",id:"title",value:p.title,onChange:N,className:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"})})]}),(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)("label",{htmlFor:"content",className:"block font-medium leading-6 text-gray-900",children:"\ub0b4\uc6a9"}),(0,r.jsx)("div",{className:"mt-2",children:(0,r.jsx)("textarea",{id:"content",name:"content",value:p.content,onChange:N,rows:"6",className:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600",children:p.content})})]}),(0,r.jsx)("div",{className:"col-span-full",children:(0,r.jsxs)("div",{className:"flex flex-wrap items-start",children:[g.map(((e,t)=>(0,r.jsxs)("div",{className:"relative inline-block",children:[(0,r.jsx)("img",{src:e.url,alt:e.name,className:"my-3 mx-1 w-36 h-36 object-cover"}),(0,r.jsx)("button",{type:"button",onClick:()=>(e=>{h((t=>t.filter(((t,a)=>a!==e)))),A(e)})(t),className:"absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center","aria-label":"Remove image",children:"X"})]},t))),(0,r.jsxs)("div",{className:"relative inline-block my-3 mx-1 w-36 h-36 border-2 border-gray-300 border-dashed rounded-md items-center justify-center cursor-pointer",children:[(0,r.jsx)("input",{ref:x,id:"file-upload",type:"file",multiple:!0,onChange:e=>{const t=Array.from(e.target.files);if(t.filter((e=>!e.type.startsWith("image/"))).length>0)return m("\uc774\ubbf8\uc9c0 \ud30c\uc77c\ub9cc \ub4f1\ub85d \uac00\ub2a5\ud569\ub2c8\ub2e4"),x.current.value="",void h([]);const a=t.map((e=>({url:URL.createObjectURL(e),name:e.name})));h(a)},className:"absolute inset-0 opacity-0 cursor-pointer"}),(0,r.jsx)("label",{htmlFor:"file-upload",className:"text-gray-500 text-4xl flex items-center justify-center h-full w-full",children:"+"})]})]})})]})})}),(0,r.jsxs)("div",{className:"mt-6 flex items-center justify-end gap-x-6",children:[(0,r.jsx)("button",{type:"button",className:"text-sm font-semibold leading-6 text-gray-900",onClick:()=>f(),children:"\ucde8\uc18c\ud558\uae30"}),(0,r.jsx)("button",{type:"button",className:"rounded-md bg-mainColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",onClick:e=>{if(!p.title||!p.content)return void m("\uc81c\ubaa9\uacfc \ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694");const a=x.current.files,n=new FormData;for(let t=0;t<a.length;t++)n.append("files",a[t]);n.append("id",b),n.append("nickname",w),n.append("type",p.type),n.append("title",p.title),n.append("content",p.content),n.append("commHit",p.commHit),n.append("commCategory",p.commCategory),(0,s.hK)(n),t("\uac8c\uc2dc\uae00\uc774 \ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4")},children:"\ub4f1\ub85d\ud558\uae30"})]})]})},p=()=>(0,r.jsx)("div",{className:"text-xl flex-grow",children:(0,r.jsx)("div",{className:"m-auto bg-white w-5/6 rounded-md py-16",children:(0,r.jsx)("div",{className:"flex flex-col",children:(0,r.jsx)("div",{className:"overflow-x-auto sm:-mx-6 lg:-mx-8",children:(0,r.jsx)("div",{className:"inline-block min-w-full py-2 sm:px-6 lg:px-8",children:(0,r.jsxs)("div",{className:"overflow-hidden",children:[(0,r.jsx)("div",{className:"text-xl font-semibold pl-2 my-2 border-l-4 border-teal-300",children:"\ub3c4\uc6c0\uc694\uccad"}),(0,r.jsx)(m,{})]})})})})})})}}]);
//# sourceMappingURL=2829.d6f4042e.chunk.js.map