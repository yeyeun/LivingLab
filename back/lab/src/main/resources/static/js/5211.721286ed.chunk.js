"use strict";(self.webpackChunklab=self.webpackChunklab||[]).push([[5211],{54462:(e,r,t)=>{t.d(r,{A:()=>i});var a=t(73216),s=t(35475),o=t(83003),n=t(27734),l=t(70579);const i=()=>{const e=(0,a.Zp)(),r=(0,o.wA)(),t=(0,o.d4)((e=>e.loginSlice));return{loginState:t,isLogin:!!t.email,doLogin:async e=>(await r((0,n.Kw)(e))).payload,doLogout:()=>{r((0,n.ri)())},moveToPath:r=>{e({pathname:r},{replace:!0})},moveToLogin:()=>{e({pathname:"/user/login"},{replace:!0})},moveToLoginReturn:()=>(0,l.jsx)(a.C5,{replace:!0,to:"/user/login"}),exceptionHandle:r=>{console.log("Exception-----------------"),console.log(r);const t=r.response.data.error,a=(0,s.PI)({error:t}).toString();return"REQUIRE_LOGIN"===t?(alert("\ub85c\uadf8\uc778 \ud574\uc57c\ub9cc \ud569\ub2c8\ub2e4."),void e({pathname:"/user/login",search:a})):"ERROR_ACCESSDENIED"===r.response.data.error?(alert("\ud574\ub2f9\uba54\ub274\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \uad8c\ud55c\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."),void e({pathname:"/",search:a})):void 0},moveToJoin:()=>{e({pathname:"/user/join"},{replace:!0})}}}},4199:(e,r,t)=>{t.d(r,{A:()=>u});t(65043),t(32078),t(19318);var a=t(73216),s=t(35475),o=t(83003);const n=t.p+"static/media/logo1_vector.5156ed345fc947aa7ffb.png";t(27734);var l=t(54462),i=t(83910),c=t(97929),d=t(70579);const x=()=>{const e=(0,o.d4)((e=>e.loginSlice)),{doLogout:r,moveToPath:t}=(0,l.A)(),x=(0,a.zy)(),h=e=>"/"===e?x.pathname===e?"header-active":"menu-hover color-wood":x.pathname.startsWith(e)&&"/"!==x.pathname?"header-active":"menu-hover color-wood";return(0,d.jsx)("nav",{id:"navbar",className:"z-50 flex-wrap sticky top-0 relative flex w-full py-2.5 shadow",style:{backgroundColor:"rgba(255, 255, 255, 0.97)"},children:(0,d.jsxs)("div",{className:"flex w-full flex-wrap items-center justify-between px-3 ",children:[(0,d.jsx)(s.N_,{to:"/",children:(0,d.jsx)("img",{src:n,alt:"LOGO",className:"w-60 m-2"})}),(0,d.jsxs)("ul",{className:"flex flex-row p-3 list-none header-fontsize items-center",children:[(0,d.jsx)("li",{className:"px-5 pl-5",children:(0,d.jsx)(s.N_,{to:"/",className:h("/"),children:"\ud648"})}),(0,d.jsx)("li",{className:"px-5",children:(0,d.jsx)(s.N_,{to:"/buy",className:h("/buy"),children:"\uacf5\ub3d9\uad6c\ub9e4"})}),(0,d.jsx)("li",{className:"px-5",children:(0,d.jsx)(s.N_,{to:"/team",className:h("/team"),children:"\ub3d9\ub124\ubaa8\uc784"})}),(0,d.jsx)("li",{className:"px-5",children:(0,d.jsx)(s.N_,{to:"/market",className:h("/market"),children:"\ub3d9\ub124\uc7a5\ud130"})}),(0,d.jsx)("li",{className:"px-5",children:(0,d.jsx)(s.N_,{to:"/shareRoom",className:h("/shareRoom"),children:"\uc790\ucde8\ubc29\uc250\uc5b4"})}),(0,d.jsx)("li",{className:"px-5",children:(0,d.jsx)(s.N_,{to:"/community",className:h("/community"),children:"\ucee4\ubba4\ub2c8\ud2f0"})})]}),(0,d.jsx)("div",{className:"relative flex items-center",children:e.email?(0,d.jsxs)("div",{className:"relative flex items-center",children:[(0,d.jsx)("button",{type:"button",className:"border border-gray-700 bg-gray-700 text-white \r rounded-lg px-2 mx-1 transition duration-100 ease select-none hover:bg-gray-950 \r focus:outline-none focus:shadow-outline",children:(0,d.jsx)(s.N_,{to:"/myPage/activity",children:(0,d.jsxs)("div",{className:"flex items-center p-2 text-white rounded-sm",children:[(0,d.jsx)(i.g,{icon:c.X46,className:"flex-shrink-0 w-5 h-5 mr-2 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"}),"\ub9c8\uc774\ud398\uc774\uc9c0"]})})}),(0,d.jsx)("button",{type:"button",className:"border border-gray-700 bg-gray-700 text-white \r rounded-lg px-2 mx-1 transition duration-300 ease select-none hover:bg-gray-950 \r focus:outline-none focus:shadow-outline",onClick:()=>{r(),alert("\ub85c\uadf8\uc544\uc6c3\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),t("/")},children:(0,d.jsxs)("div",{className:"flex items-center p-2 text-white rounded-lg",children:[(0,d.jsx)(i.g,{icon:c.yBu,className:"flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"}),(0,d.jsx)("span",{className:"flex-1 ms-3 whitespace-nowrap",children:"\ub85c\uadf8\uc544\uc6c3"})]})})]}):(0,d.jsxs)("div",{children:[(0,d.jsx)("button",{type:"button",className:"border border-gray-700 bg-gray-700 text-white \r rounded-lg px-2 mx-1 transition duration-100 ease select-none hover:bg-gray-950 \r focus:outline-none focus:shadow-outline",children:(0,d.jsx)(s.N_,{to:"/user/join",children:(0,d.jsxs)("div",{className:"flex items-center p-2 text-white rounded-lg",children:[(0,d.jsxs)("svg",{className:"flex-shrink-0 w-5 h-5 mr-2 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 20 20",children:[(0,d.jsx)("path",{d:"M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"}),(0,d.jsx)("path",{d:"M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"}),(0,d.jsx)("path",{d:"M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"})]}),"\ud68c\uc6d0\uac00\uc785"]})})}),(0,d.jsx)("button",{type:"button",className:"border border-gray-700 bg-gray-700 text-white \r rounded-lg px-2 mx-1 transition duration-300 ease select-none hover:bg-gray-950 \r focus:outline-none focus:shadow-outline",children:(0,d.jsx)(s.N_,{to:"/user/login",children:(0,d.jsxs)("div",{className:"flex items-center p-2 text-white rounded-lg",children:[(0,d.jsx)(i.g,{icon:c.rtb,className:"flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"}),(0,d.jsx)("span",{className:"flex-1 ms-3 whitespace-nowrap",children:"\ub85c\uadf8\uc778"})]})})})]})})]})})},h=()=>(0,d.jsx)("footer",{className:"bg-gray-500 text-white w-full py-10",children:(0,d.jsxs)("div",{className:"container mx-auto text-center",children:[(0,d.jsx)("b",{className:"text-2xl",children:"Living Lab"}),(0,d.jsx)("p",{children:"\xa9 Copyright 2024. LivingLab, Co., Ltd. All rights reserved "})]})}),m=()=>(0,d.jsx)("div",{className:"fixed bottom-4 right-4",children:(0,d.jsx)("button",{onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},className:"bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-emerald-700 transition duration-300 text-2xl",children:(0,d.jsx)(i.g,{icon:c.INu})})}),u=e=>{let{children:r}=e;return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:"font-NotoSansKR min-h-screen flex flex-col",children:[(0,d.jsx)(x,{}),r,(0,d.jsx)(m,{}),(0,d.jsx)(h,{})]})})}},64631:(e,r,t)=>{t.r(r),t.d(r,{default:()=>n});var a=t(4199),s=t(73216),o=t(70579);const n=()=>(0,o.jsx)("div",{children:(0,o.jsx)(a.A,{children:(0,o.jsx)("div",{className:"text-xl p-4 flex-grow",children:(0,o.jsx)(s.sv,{})})})})},19318:(e,r,t)=>{e.exports=t.p+"static/media/profile_img.3d97f9305e64ac2b93f6.png"}}]);
//# sourceMappingURL=5211.721286ed.chunk.js.map