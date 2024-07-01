"use strict";(self.webpackChunklab=self.webpackChunklab||[]).push([[6464],{13400:(e,t,a)=>{a.d(t,{Fp:()=>l,Gj:()=>A,L1:()=>f,QM:()=>h,Qp:()=>r,Ur:()=>m,YX:()=>i,ZD:()=>y,Z_:()=>w,hK:()=>b,i$:()=>n,iC:()=>j,lg:()=>u,mZ:()=>v,nC:()=>x,no:()=>g,oK:()=>d,qw:()=>C,r_:()=>p,u5:()=>N,uF:()=>o,zu:()=>k});var s=a(86213);const n="http://localhost:8282",c="".concat(n,"/api/community"),l=async e=>(await s.A.post("".concat(c,"/tip/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,i=async(e,t,a)=>{const{page:n,size:l}=e;return(await s.A.get("".concat(c,"/tip/list"),{params:{page:n,size:l,search:t,sort:a}})).data},o=async e=>(await s.A.get("".concat(c,"/tip/read/").concat(e))).data,r=async(e,t)=>(await s.A.put("".concat(c,"/tip/modify/").concat(e),t,{headers:{"Content-Type":"multipart/form-data"}})).data,d=async e=>(await s.A.delete("".concat(c,"/delete/").concat(e))).data,m=async e=>(await s.A.post("".concat(c,"/qna/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,p=async(e,t,a)=>{const{page:n,size:l}=e;return(await s.A.get("".concat(c,"/qna/list"),{params:{page:n,size:l,search:t,sort:a}})).data},u=async e=>(await s.A.get("".concat(c,"/qna/read/").concat(e))).data,g=async(e,t)=>(await s.A.put("".concat(c,"/qna/modify/").concat(e),t,{headers:{"Content-Type":"multipart/form-data"}})).data,h=async e=>(await s.A.post("".concat(c,"/review/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,x=async(e,t,a)=>{const{page:n,size:l}=e;return(await s.A.get("".concat(c,"/review/list"),{params:{page:n,size:l,search:t,sort:a}})).data},f=async e=>(await s.A.get("".concat(c,"/review/read/").concat(e))).data,y=async(e,t)=>(await s.A.put("".concat(c,"/review/modify/").concat(e),t,{headers:{"Content-Type":"multipart/form-data"}})).data,b=async e=>(await s.A.post("".concat(c,"/help/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,w=async e=>{const{page:t,size:a}=e;return(await s.A.get("".concat(c,"/help/list"),{params:{page:t,size:a}})).data},v=async e=>(await s.A.get("".concat(c,"/help/read/").concat(e))).data,j=async(e,t)=>(await s.A.put("".concat(c,"/help/modify/").concat(e),t,{headers:{"Content-Type":"multipart/form-data"}})).data,N=async e=>(await s.A.put("".concat(c,"/increase/").concat(e))).data,A=async e=>(await s.A.put("".concat(c,"/decrease/").concat(e))).data,C=async e=>{const{page:t,size:a}=e;return(await s.A.get("".concat(c,"/latest"),{params:{page:t,size:a}})).data},k=async e=>(await s.A.get("".concat(c,"/mylist/").concat(e))).data},54949:(e,t,a)=>{a.d(t,{A:()=>n});var s=a(70579);const n=e=>{let{title:t,content:a,callbackFn:n}=e;return(0,s.jsx)("div",{className:"fixed top-0 left-0 z-[1055] flex h-full w-full items-center justify-center bg-black bg-opacity-20",onClick:()=>{n&&n()},children:(0,s.jsxs)("div",{className:"relative bg-white shadow opacity-100 w-1/4 rounded-md px-6 min-w-[300px] flex flex-col items-center",onClick:e=>e.stopPropagation(),children:[(0,s.jsx)("div",{className:"w-full text-center bg-warming-400 mt-6 mb-6 pb-2 text-xl border-b-2 border-gray-500",children:t}),(0,s.jsx)("div",{className:"w-full text-center text-xl pt-4 pb-4",children:a}),(0,s.jsx)("div",{className:"w-full flex justify-center",children:(0,s.jsx)("button",{className:"rounded bg-mainColor mt-4 mb-4 px-6 py-2 text-lg text-white hover:bg-teal-600",onClick:()=>{n&&n()},children:"\ub2eb\uae30"})})]})})}},63280:(e,t,a)=>{a.d(t,{A:()=>l});var s=a(73216),n=a(35475);const c=(e,t)=>e?parseInt(e):t,l=()=>{const e=(0,s.Zp)(),[t]=(0,n.ok)(),a=c(t.get("page"),1),l=c(t.get("size"),10),i=(0,n.PI)({page:a,size:l}).toString();return{moveToList:t=>{let a="";if(t){const e=c(t.page,1),s=c(t.size,10);a=(0,n.PI)({page:e,size:s}).toString()}else a=i;e({pathname:"../help/list",search:a})},moveToModify:t=>{console.log(i),e({pathname:"../help/modify/".concat(t),search:i})},moveToRead:t=>{console.log(i),e({pathname:"../help/read/".concat(t),search:i})},moveToAdd:()=>{e({pathname:"../help/add",search:""})},page:a,size:l}}},86464:(e,t,a)=>{a.r(t),a.d(t,{default:()=>p});var s=a(73216),n=a(65043),c=a(13400),l=a(54949),i=a(63280),o=a(70579);const r={user_id:"iamuser",type:"4",title:"",content:"",commHit:0,commCategory:"1",nickname:"\uae40\uc720\uc800",files:[],uploadFileNames:[]},d=c.i$,m=e=>{let{commNo:t}=e;const[a,s]=(0,n.useState)(null),[m,p]=(0,n.useState)(null),[u,g]=(0,n.useState)([]),[h,x]=(0,n.useState)({...r}),{moveToRead:f}=(0,i.A)(),y=(0,n.useRef)();(0,n.useEffect)((()=>{(0,c.mZ)(t).then((e=>{console.log(e),x(e)}))}),[t]);const b=e=>{h[e.target.name]=e.target.value,x({...h})},w=(e,t)=>{if(t)g((t=>t.filter(((t,a)=>a!==e)))),v(e);else{const t=h.uploadFileNames.filter(((t,a)=>a!==e));h.uploadFileNames=t,x({...h})}},v=e=>{const t=new DataTransfer;Array.from(y.current.files).forEach(((a,s)=>{s!==e&&t.items.add(a)})),y.current.files=t.files};return(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"space-y-12 text-base",children:(0,o.jsx)("div",{className:"border-b border-gray-900/10 pb-12",children:(0,o.jsxs)("div",{className:"mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6",children:[a?(0,o.jsx)(l.A,{title:"\uc54c\ub9bc",content:"".concat(a),callbackFn:()=>{s(null),f(t)}}):(0,o.jsx)(o.Fragment,{}),m?(0,o.jsx)(l.A,{title:"\uc54c\ub9bc",content:"".concat(m),callbackFn:()=>p(null)}):(0,o.jsx)(o.Fragment,{}),(0,o.jsxs)("div",{className:"col-span-full",children:[(0,o.jsx)("label",{htmlFor:"title",className:"block font-medium leading-6 text-gray-900",children:"\uc81c\ubaa9"}),(0,o.jsx)("div",{className:"mt-2",children:(0,o.jsx)("input",{type:"text",name:"title",id:"title",value:h.title,onChange:b,className:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"})})]}),(0,o.jsxs)("div",{className:"col-span-full",children:[(0,o.jsx)("label",{htmlFor:"content",className:"block font-medium leading-6 text-gray-900",children:"\ub0b4\uc6a9"}),(0,o.jsx)("div",{className:"mt-2",children:(0,o.jsx)("textarea",{id:"content",name:"content",value:h.content,onChange:b,rows:"6",className:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600",children:h.content})})]}),(0,o.jsx)("div",{className:"col-span-full",children:(0,o.jsxs)("div",{className:"flex flex-wrap items-start",children:[h.uploadFileNames.map(((e,t)=>(0,o.jsxs)("div",{className:"relative inline-block",children:[(0,o.jsx)("img",{alt:"help",src:"".concat(d,"/api/community/help/display/").concat(e),className:"my-3 mx-1 w-36 h-36 object-cover"}),(0,o.jsx)("button",{type:"button",onClick:()=>w(t,!1),className:"absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center","aria-label":"Remove image",children:"X"})]},t))),u.map(((e,t)=>(0,o.jsxs)("div",{className:"relative inline-block",children:[(0,o.jsx)("img",{src:e.url,alt:e.name,className:"my-3 mx-1 w-36 h-36 object-cover"}),(0,o.jsx)("button",{type:"button",onClick:()=>w(t,!0),className:"absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center","aria-label":"Remove image",children:"X"})]},t))),(0,o.jsxs)("div",{className:"relative inline-block my-3 mx-1 w-36 h-36 border-2 border-gray-300 border-dashed rounded-md items-center justify-center cursor-pointer",children:[(0,o.jsx)("input",{ref:y,id:"file-upload",type:"file",multiple:!0,onChange:e=>{const t=Array.from(e.target.files);if(t.filter((e=>!e.type.startsWith("image/"))).length>0)return p("\uc774\ubbf8\uc9c0 \ud30c\uc77c\ub9cc \ub4f1\ub85d \uac00\ub2a5\ud569\ub2c8\ub2e4"),y.current.value="",void g([]);const a=t.map((e=>({url:URL.createObjectURL(e),name:e.name})));g(a)},className:"absolute inset-0 opacity-0 cursor-pointer"}),(0,o.jsx)("label",{htmlFor:"file-upload",className:"text-gray-500 text-4xl flex items-center justify-center h-full w-full",children:"+"})]})]})})]})})}),(0,o.jsxs)("div",{className:"mt-6 flex items-center justify-end gap-x-6",children:[(0,o.jsx)("button",{type:"button",className:"text-sm font-semibold leading-6 text-gray-900",onClick:()=>f(h.commNo),children:"\ucde8\uc18c\ud558\uae30"}),(0,o.jsx)("button",{type:"button",className:"rounded-md bg-mainColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",onClick:e=>{if(!h.title||!h.content)return void p("\uc81c\ubaa9\uacfc \ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694");const a=y.current.files,n=new FormData;for(let t=0;t<a.length;t++)n.append("files",a[t]);n.append("user_id",h.user_id),n.append("type",h.type),n.append("title",h.title),n.append("content",h.content),n.append("commHit",h.commHit),n.append("commCategory",h.commCategory),n.append("nickname",h.nickname),n.append("uploadFileNames",h.uploadFileNames),(0,c.iC)(t,n),s("\uac8c\uc2dc\uae00\uc774 \uc218\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4")},children:"\uc218\uc815\ud558\uae30"})]})]})},p=()=>{const{commNo:e}=(0,s.g)();return(0,o.jsx)("div",{className:"text-xl flex-grow",children:(0,o.jsx)("div",{className:"m-auto bg-white w-5/6 rounded-md py-16",children:(0,o.jsx)("div",{className:"flex flex-col",children:(0,o.jsx)("div",{className:"overflow-x-auto sm:-mx-6 lg:-mx-8",children:(0,o.jsx)("div",{className:"inline-block min-w-full py-2 sm:px-6 lg:px-8",children:(0,o.jsxs)("div",{className:"overflow-hidden",children:[(0,o.jsx)("div",{className:"text-xl font-semibold pl-2 my-2 border-l-4 border-teal-300",children:"\ub3c4\uc6c0\uc694\uccad"}),(0,o.jsx)(m,{commNo:e})]})})})})})})}}}]);
//# sourceMappingURL=6464.dcf74986.chunk.js.map