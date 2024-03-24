(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))u(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function p(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function u(s){if(s.ep)return;s.ep=!0;const i=p(s);fetch(s.href,i)}})();class B{static get burger(){const e=document.querySelector(".header__burger");if(!e||!(e instanceof HTMLElement))throw new Error(".header__burger is not found");return e}static get menu(){const e=document.querySelector(".header__menu");if(!e||!(e instanceof HTMLElement))throw new Error(".header__menu is not found");return e}static get menuList(){const e=document.querySelector(".menu__list");if(!e||!(e instanceof HTMLElement))throw new Error(".header__burger is not found");return e}}function H(){const n=B.burger,e=B.menu,p=B.menuList;n.addEventListener("click",()=>{n.classList.toggle("active"),p.classList.toggle("active"),e.classList.toggle("active"),document.body.classList.toggle("lock")}),e.addEventListener("click",()=>{n.classList.contains("active")&&(n.classList.remove("active"),p.classList.remove("active"),e.classList.remove("active"),document.body.classList.remove("lock"))})}async function k(){return await(await fetch("./db/pets.json")).json()}class x{static get wrapper(){const e=document.querySelector(".popap");if(!e||!(e instanceof HTMLElement))throw new Error(".popap is not found");return e}static get closeBtn(){const e=document.querySelector(".popap__x");if(!e||!(e instanceof HTMLElement))throw new Error(".popap__x is not found");return e}static get content(){const e=document.querySelector(".popap__block");if(!e||!(e instanceof HTMLElement))throw new Error(".popap__block is not found");return e}}class y{static get cardTitle(){const e=document.querySelector(".title");if(!e||!(e instanceof HTMLElement))throw new Error(".title is not found");return e}static get photo(){var p;const e=(p=document.getElementById("pet_photo"))==null?void 0:p.querySelector("img");if(!e||!(e instanceof HTMLImageElement))throw new Error("photo is not found");return e}static get name(){const e=document.getElementById("pet_name");if(!e||!(e instanceof HTMLImageElement))throw new Error("#pet_name is not found");return e}static get typeAndBreed(){const e=document.getElementById("type_and_breed");if(!e||!(e instanceof HTMLElement))throw new Error("#type_and_breed is not found");return e}static get description(){const e=document.getElementById("description");if(!e||!(e instanceof HTMLElement))throw new Error("#description is not found");return e}static get age(){const e=document.getElementById("age");if(!e||!(e instanceof HTMLElement))throw new Error("#age is not found");return e}static get inoculations(){const e=document.getElementById("inoculations");if(!e||!(e instanceof HTMLElement))throw new Error("#inoculations is not found");return e}static get diseases(){const e=document.getElementById("diseases");if(!e||!(e instanceof HTMLElement))throw new Error("#diseases is not found");return e}static get parasites(){const e=document.getElementById("parasites");if(!e||!(e instanceof HTMLElement))throw new Error("#parasites is not found");return e}}async function S(){const n=await k(),e=x.wrapper,p=document.querySelectorAll(".our-friend__card"),u=x.closeBtn,s=x.content;function i(){e.classList.add("active"),document.body.classList.add("lock");const c=y.cardTitle.textContent,a=y.photo,L=y.name,E=y.typeAndBreed,f=y.description,w=y.age,t=y.inoculations,o=y.diseases,r=y.parasites;for(let d in n)n[d].name===c&&(a.src=n[d].img,L.textContent=n[d].name,E.textContent=`${n[d].type} - ${n[d].breed}`,f.textContent=n[d].description,w.textContent=n[d].age,t.textContent=n[d].inoculations.reduce((h,g,_,l)=>l.length>1?l.join(", "):""),o.textContent=n[d].diseases.reduce((h,g,_,l)=>l.length>1?l.join(", "):""),r.textContent=n[d].parasites.reduce((h,g,_,l)=>l.length>1?l.join(", "):""))}function m(){e.classList.remove("active"),document.body.classList.remove("lock")}p.forEach(c=>c.addEventListener("click",i)),u.addEventListener("click",m),e.addEventListener("click",c=>{c.composedPath().includes(s)||m()})}function b(n,e){return Math.floor(n+Math.random()*(e-n))}function P(n){return n.reduce((e,p)=>{let u=b(0,8);for(;e[u]!==void 0;)u=b(0,8);return e[u]=p,e},[])}class v{static get startBtn(){const e=document.querySelector(".pagination__start");if(!e||!(e instanceof HTMLButtonElement))throw new Error(".pagination__start is not found");return e}static get prevBtn(){const e=document.querySelector(".pagination__prev");if(!e||!(e instanceof HTMLButtonElement))throw new Error(".pagination__prev is not found");return e}static get nextBtn(){const e=document.querySelector(".pagination__next");if(!e||!(e instanceof HTMLButtonElement))throw new Error(".pagination__next is not found");return e}static get endBtn(){const e=document.querySelector(".pagination__end");if(!e||!(e instanceof HTMLButtonElement))throw new Error(".pagination__end is not found");return e}static get list(){const e=document.querySelector(".pagination__list");if(!e||!(e instanceof HTMLElement))throw new Error(".pagination__list is not found");return e}static get status(){const e=document.querySelector(".pagination__num span");if(!e||!(e instanceof HTMLElement))throw new Error(".pagination__num span is not found");return e}}async function q(){const n=await k(),e=p(6);function p(o){const r=[];for(;o>0;){let d=P(n);r.push(...d),o--}return r}const u=v.startBtn,s=v.prevBtn,i=v.nextBtn,m=v.endBtn;let c=E(),a=1,L=Math.ceil(e.length/c);function E(){return window.innerWidth>=1280?8:window.innerWidth>=768?6:3}function f(o,r,d){d--;const h=v.list,g=r*d,_=g+r,l=o.slice(g,_);h.innerHTML="",l.forEach(M=>{h.innerHTML+=`<div class="pagination__item">
         <div class="our-friend__card">
            <div class="photo"><img src="${M.img}" alt="pet"></div>
            <h3 class="title">${M.name}</h3>
            <button class="button batton-transparent">Learn more</button>
         </div>
         </div>`}),S()}f(e,c,a);function w(){const o=v.status;o.textContent=`${a}`}w();function t(){w(),u.classList.remove("inactive"),s.classList.remove("inactive"),u.disabled=!1,s.disabled=!1,m.classList.remove("inactive"),i.classList.remove("inactive"),m.disabled=!1,i.disabled=!1,a===1&&(u.classList.add("inactive"),s.classList.add("inactive"),u.disabled=!0,s.disabled=!0),a===L&&(m.classList.add("inactive"),i.classList.add("inactive"),m.disabled=!0,i.disabled=!0)}u.addEventListener("click",()=>(a=1,f(e,c,a),t(),a)),m.addEventListener("click",()=>(a=L,f(e,c,a),t(),a)),s.addEventListener("click",()=>{if(a>1)return a--,f(e,c,a),t(),a}),i.addEventListener("click",()=>{if(a<L)return a++,f(e,c,a),t(),a}),window.addEventListener("resize",()=>{c!==E()&&(c=E(),a=1,L=Math.ceil(e.length/c),f(e,c,a),t())})}class T{static get sliderTrack(){const e=document.querySelector(".slider__track");if(!e||!(e instanceof HTMLElement))throw new Error(".slider__track is not found");return e}static get controls(){const e=document.querySelector(".slider__controls");if(!e||!(e instanceof HTMLElement))throw new Error(".slider__controls is not found");return e}static get nextBtn(){const e=document.querySelector(".slider__next");if(!e||!(e instanceof HTMLElement))throw new Error(".slider__next is not found");return e}static get prewBtn(){const e=document.querySelector(".slider__prev");if(!e||!(e instanceof HTMLElement))throw new Error(".slider__prev is not found");return e}}async function C(){const n=await k(),e=T.sliderTrack,p=T.controls,u=T.nextBtn,s=T.prewBtn;let i=[];function m(){e.innerHTML="";for(let t in n)e.innerHTML+=`<div class="slider__item">
          <div class="our-friend__card">
              <div class="photo"><img src="${n[t].img}" alt="pet"></div>
              <h3 class="title">${n[t].name}</h3>
              <button class="button batton-transparent">Learn more</button>
          </div>
        </div>`}m();const c=document.querySelectorAll(".slider__item");function a(){const t=c.length;function o(){let r=b(1,t+1);return i.includes(r)?o():(i.push(r),r)}c.forEach(r=>r.style.order=`${o()}`)}a();function L(){return i=[],c.forEach(t=>i.push(+t.style.order)),i}function E(){let t=L().reduce((o,r,d,h)=>{if(r<=f()*2&&r>h.length-f())o.push(r);else{let g=b(1,c.length+1);for(;o.includes(g);)g=b(1,c.length+1);o.push(g)}return o},[]);c.forEach((o,r)=>o.style.order=`${t[r]}`),i=t}function f(){const t=document.querySelectorAll(".slider__item");let o=0;return t.forEach(r=>{r.offsetTop===0&&(o+=1)}),o}function w(){let t=0,o=0;p.addEventListener("click",r=>{const d=r.composedPath().includes(u);r.composedPath().includes(s)&&(o===2||(o+=1)),d&&(t===2||(t+=1)),o===1&&t===1&&(t=0,o=0),o===2&&t===2&&(E(),t=0,o=0)})}w(),s.addEventListener("click",()=>{c.forEach((t,o,r)=>{function d(){+t.style.order>r.length-f()?(t.classList.add("click"),t.style.setProperty("--x",`${e.offsetWidth}px`),t.style.setProperty("--y",`-${t.offsetTop}px`)):(t.classList.add("move"),t.style.setProperty("--x",`-${e.offsetWidth}px`))}function h(){t.classList.remove("click"),t.classList.remove("move")}function g(){let _=f(),l=Number(t.style.order);l>r.length-_?t.style.order=`${l-r.length+_}`:t.style.order=`${l+_}`}d(),setTimeout(g,200),setTimeout(h,200)})}),u.addEventListener("click",()=>{c.forEach((t,o,r)=>{function d(){+t.style.order>f()&&+t.style.order<=f()*2?(t.classList.add("click"),t.style.setProperty("--x",`-${e.offsetWidth}px`),t.style.setProperty("--y",`-${t.offsetTop}px`)):(t.classList.add("move"),t.style.setProperty("--x",`${e.offsetWidth}px`))}function h(){t.classList.remove("click"),t.classList.remove("move")}function g(){let _=f(),l=Number(t.style.order);l<=_?t.style.order=`${r.length-(_-l)}`:t.style.order=`${l-_}`}d(),setTimeout(g,200),setTimeout(h,200)})})}H();const $=document.querySelector(".slider");$&&C();const I=document.querySelector(".pagination");I&&q();const O=document.querySelector(".popap");O&&S();