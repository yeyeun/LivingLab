"use strict";(self.webpackChunklab=self.webpackChunklab||[]).push([[1773],{13400:(e,a,t)=>{t.d(a,{Fp:()=>c,Gj:()=>C,L1:()=>f,QM:()=>h,Qp:()=>r,Ur:()=>m,WN:()=>z,YX:()=>l,ZD:()=>y,Z_:()=>b,hK:()=>v,i$:()=>s,iC:()=>j,lg:()=>u,mZ:()=>w,nC:()=>x,no:()=>g,oK:()=>d,qw:()=>A,r_:()=>p,u5:()=>N,uF:()=>o,zu:()=>k});var n=t(86213);const s="http://223.130.157.92:22222",i="".concat(s,"/api/community"),c=async e=>(await n.A.post("".concat(i,"/tip/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,l=async(e,a,t)=>{const{page:s,size:c}=e;return(await n.A.get("".concat(i,"/tip/list"),{params:{page:s,size:c,search:a,sort:t}})).data},o=async e=>(await n.A.get("".concat(i,"/tip/read/").concat(e))).data,r=async(e,a)=>(await n.A.put("".concat(i,"/tip/modify/").concat(e),a,{headers:{"Content-Type":"multipart/form-data"}})).data,d=async e=>(await n.A.delete("".concat(i,"/delete/").concat(e))).data,m=async e=>(await n.A.post("".concat(i,"/qna/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,p=async(e,a,t)=>{const{page:s,size:c}=e;return(await n.A.get("".concat(i,"/qna/list"),{params:{page:s,size:c,search:a,sort:t}})).data},u=async e=>(await n.A.get("".concat(i,"/qna/read/").concat(e))).data,g=async(e,a)=>(await n.A.put("".concat(i,"/qna/modify/").concat(e),a,{headers:{"Content-Type":"multipart/form-data"}})).data,h=async e=>(await n.A.post("".concat(i,"/review/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,x=async(e,a,t)=>{const{page:s,size:c}=e;return(await n.A.get("".concat(i,"/review/list"),{params:{page:s,size:c,search:a,sort:t}})).data},f=async e=>(await n.A.get("".concat(i,"/review/read/").concat(e))).data,y=async(e,a)=>(await n.A.put("".concat(i,"/review/modify/").concat(e),a,{headers:{"Content-Type":"multipart/form-data"}})).data,v=async e=>(await n.A.post("".concat(i,"/help/add"),e,{headers:{"Content-Type":"multipart/form-data"}})).data,b=async e=>{const{page:a,size:t}=e;return(await n.A.get("".concat(i,"/help/list"),{params:{page:a,size:t}})).data},w=async e=>(await n.A.get("".concat(i,"/help/read/").concat(e))).data,j=async(e,a)=>(await n.A.put("".concat(i,"/help/modify/").concat(e),a,{headers:{"Content-Type":"multipart/form-data"}})).data,N=async e=>(await n.A.put("".concat(i,"/increase/").concat(e))).data,C=async e=>(await n.A.put("".concat(i,"/decrease/").concat(e))).data,A=async e=>{const{page:a,size:t}=e;return(await n.A.get("".concat(i,"/latest"),{params:{page:a,size:t}})).data},k=async e=>(await n.A.get("".concat(i,"/mylist/").concat(e))).data,z=async(e,a)=>{const{page:t,size:s}=e;return(await n.A.get("".concat(i,"/mylistall"),{params:{page:t,size:s,id:a}})).data}},54949:(e,a,t)=>{t.d(a,{A:()=>s});var n=t(70579);const s=e=>{let{title:a,content:t,callbackFn:s}=e;return(0,n.jsx)("div",{className:"fixed top-0 left-0 z-[1055] flex h-full w-full items-center justify-center bg-black bg-opacity-20",onClick:()=>{s&&s()},children:(0,n.jsxs)("div",{className:"relative bg-white shadow opacity-100 w-1/4 rounded-md px-6 min-w-[300px] flex flex-col items-center",onClick:e=>e.stopPropagation(),children:[(0,n.jsx)("div",{className:"w-full text-center bg-warming-400 mt-6 mb-6 pb-2 text-xl border-b-2 border-gray-500",children:a}),(0,n.jsx)("div",{className:"w-full text-center text-xl pt-4 pb-4",children:t}),(0,n.jsx)("div",{className:"w-full flex justify-center",children:(0,n.jsx)("button",{className:"rounded bg-mainColor mt-4 mb-4 px-6 py-2 text-lg text-white hover:bg-teal-600",onClick:()=>{s&&s()},children:"\ub2eb\uae30"})})]})})}},49267:(e,a,t)=>{t.d(a,{A:()=>c});var n=t(73216),s=t(35475);const i=(e,a)=>e?parseInt(e):a,c=()=>{const e=(0,n.Zp)(),[a]=(0,s.ok)(),t=i(a.get("page"),1),c=i(a.get("size"),10),l=(0,s.PI)({page:t,size:c}).toString();return{moveToList:a=>{let t="";if(a){const e=i(a.page,1),n=i(a.size,10);t=(0,s.PI)({page:e,size:n}).toString()}else t=l;e({pathname:"../review/list",search:t})},moveToModify:a=>{console.log(l),e({pathname:"../review/modify/".concat(a),search:l})},moveToRead:a=>{console.log(l),e({pathname:"../review/read/".concat(a),search:l})},moveToAdd:()=>{e({pathname:"../review/add",search:""})},page:t,size:c}}},1773:(e,a,t)=>{t.r(a),t.d(a,{default:()=>p});var n=t(65043),s=t(13400),i=t(83003),c=t(73216),l=t(54949),o=t(49267),r=t(70579);const d={id:0,type:"3",title:"",content:"",commHit:0,commCategory:"",nickname:"",files:[]},m=()=>{const[e,a]=(0,n.useState)(null),[t,m]=(0,n.useState)(null),[p,u]=(0,n.useState)({...d}),[g,h]=(0,n.useState)([]),{moveToList:x}=(0,o.A)(),f=(0,n.useRef)(),y=(0,i.d4)((e=>e.loginSlice)),v=y.id,b=null===y||void 0===y?void 0:y.email,w=null===y||void 0===y?void 0:y.nickname,j=(0,c.Zp)();(0,n.useEffect)((()=>{b||j("/user/login")}),[b,j]);const N=e=>{p[e.target.name]=e.target.value,u({...p})},C=e=>{const a=new DataTransfer;Array.from(f.current.files).forEach(((t,n)=>{n!==e&&a.items.add(t)})),f.current.files=a.files};return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"space-y-12 text-base",children:(0,r.jsx)("div",{className:"border-b border-gray-900/10 pb-12",children:(0,r.jsxs)("div",{className:"mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6",children:[e&&(0,r.jsx)(l.A,{title:"\uc54c\ub9bc",content:"".concat(e),callbackFn:()=>{a(null),x()}}),t&&(0,r.jsx)(l.A,{title:"\uc54c\ub9bc",content:"".concat(t),callbackFn:()=>m(null)}),(0,r.jsxs)("div",{className:"sm:col-span-3",children:[(0,r.jsx)("label",{htmlFor:"commCategory",className:"block font-medium leading-6 text-gray-900",children:"\uce74\ud14c\uace0\ub9ac"}),(0,r.jsx)("div",{className:"mt-2",children:(0,r.jsxs)("select",{id:"commCategory",name:"commCategory",value:p.commCategory,onChange:N,className:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600",children:[(0,r.jsx)("option",{value:"",selected:!0,disabled:!0,hidden:!0,children:"==\uce74\ud14c\uace0\ub9ac \uc120\ud0dd=="}),(0,r.jsx)("option",{value:"1",children:"\ubd80\ub3d9\uc0b0"}),(0,r.jsx)("option",{value:"2",children:"\uc778\ud14c\ub9ac\uc5b4"}),(0,r.jsx)("option",{value:"3",children:"\ud560\uc778\uc815\ubcf4"}),(0,r.jsx)("option",{value:"4",children:"\uae30\ud0c0"})]})})]}),(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)("label",{htmlFor:"title",className:"block font-medium leading-6 text-gray-900",children:"\uc81c\ubaa9"}),(0,r.jsx)("div",{className:"mt-2",children:(0,r.jsx)("input",{type:"text",name:"title",id:"title",value:p.title,onChange:N,className:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"})})]}),(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)("label",{htmlFor:"content",className:"block font-medium leading-6 text-gray-900",children:"\ub0b4\uc6a9"}),(0,r.jsx)("div",{className:"mt-2",children:(0,r.jsx)("textarea",{id:"content",name:"content",value:p.content,onChange:N,rows:"6",className:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600",children:p.content})})]}),(0,r.jsx)("div",{className:"col-span-full",children:(0,r.jsxs)("div",{className:"flex flex-wrap items-start",children:[g.map(((e,a)=>(0,r.jsxs)("div",{className:"relative inline-block",children:[(0,r.jsx)("img",{src:e.url,alt:e.name,className:"my-3 mx-1 w-36 h-36 object-cover"}),(0,r.jsx)("button",{type:"button",onClick:()=>(e=>{h((a=>a.filter(((a,t)=>t!==e)))),C(e)})(a),className:"absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center","aria-label":"Remove image",children:"X"})]},a))),(0,r.jsxs)("div",{className:"relative inline-block my-3 mx-1 w-36 h-36 border-2 border-gray-300 border-dashed rounded-md items-center justify-center cursor-pointer",children:[(0,r.jsx)("input",{ref:f,id:"file-upload",type:"file",multiple:!0,onChange:e=>{const a=Array.from(e.target.files);if(a.filter((e=>!e.type.startsWith("image/"))).length>0)return m("\uc774\ubbf8\uc9c0 \ud30c\uc77c\ub9cc \ub4f1\ub85d \uac00\ub2a5\ud569\ub2c8\ub2e4"),f.current.value="",void h([]);const t=a.map((e=>({url:URL.createObjectURL(e),name:e.name})));h(t)},className:"absolute inset-0 opacity-0 cursor-pointer"}),(0,r.jsx)("label",{htmlFor:"file-upload",className:"text-gray-500 text-4xl flex items-center justify-center h-full w-full",children:"+"})]})]})})]})})}),(0,r.jsxs)("div",{className:"mt-6 flex items-center justify-end gap-x-6",children:[(0,r.jsx)("button",{type:"button",className:"text-sm font-semibold leading-6 text-gray-900",onClick:()=>x(),children:"\ucde8\uc18c\ud558\uae30"}),(0,r.jsx)("button",{type:"button",className:"rounded-md bg-mainColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",onClick:e=>{if(!p.commCategory)return void m("\uce74\ud14c\uace0\ub9ac\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694");if(!p.title||!p.content)return void m("\uc81c\ubaa9\uacfc \ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694");const t=f.current.files,n=new FormData;for(let a=0;a<t.length;a++)n.append("files",t[a]);n.append("id",v),n.append("nickname",w),n.append("type",p.type),n.append("title",p.title),n.append("content",p.content),n.append("commHit",p.commHit),n.append("commCategory",p.commCategory),(0,s.QM)(n),a("\uac8c\uc2dc\uae00\uc774 \ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4")},children:"\ub4f1\ub85d\ud558\uae30"})]})]})},p=()=>(0,r.jsx)("div",{className:"text-xl flex-grow",children:(0,r.jsx)("div",{className:"m-auto bg-white w-5/6 rounded-md py-16",children:(0,r.jsx)("div",{className:"flex flex-col",children:(0,r.jsx)("div",{className:"overflow-x-auto sm:-mx-6 lg:-mx-8",children:(0,r.jsx)("div",{className:"inline-block min-w-full py-2 sm:px-6 lg:px-8",children:(0,r.jsxs)("div",{className:"overflow-hidden",children:[(0,r.jsx)("div",{className:"text-xl font-semibold pl-2 my-2 border-l-4 border-teal-300",children:"\ub9ac\ubdf0\uac8c\uc2dc\ud310"}),(0,r.jsx)(m,{})]})})})})})})}}]);
//# sourceMappingURL=1773.2a9587ea.chunk.js.map