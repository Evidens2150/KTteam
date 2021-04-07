"use strict";function D(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||T(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var A=document.forms.todo,q=A.querySelector(".start-block_js"),I=A.querySelector(".add_js"),j=A.querySelector(".revers_js"),O=A.querySelector(".change_js"),w=A.querySelector(".remove_js"),N=A.querySelector(".textarea_js"),J=A.querySelector(".sliderarea_js"),x=A.querySelector(".edit-block_js"),M=[],e=localStorage.getItem("ToDoListData"),H=!1;function X(){function o(){M=M.reverse(),localStorage.setItem("ToDoListData",JSON.stringify(M)),j.removeEventListener("click",o),X()}function i(e){function t(e){e.preventDefault(),(M=JSON.parse(localStorage.getItem("ToDoListData"))).push(N.value),localStorage.setItem("ToDoListData",JSON.stringify(M)),I.removeEventListener("click",t),X()}e.preventDefault(),j.removeEventListener("click",o),H||(H=!0,I.removeAttribute("disabled"),I.addEventListener("click",t),window.addEventListener("keydown",function(e){"Enter"===e.code&&!I.hasAttribute("disabled")&&" "<N.value&&(e.preventDefault(),(M=JSON.parse(localStorage.getItem("ToDoListData"))).push(N.value),localStorage.setItem("ToDoListData",JSON.stringify(M)),I.removeEventListener("click",t),X())}))}M=JSON.parse(localStorage.getItem("ToDoListData")),A.reset(),N.focus(),H=!1,x.classList.add("hidden"),q.classList.remove("hidden"),I.setAttribute("disabled",""),N.addEventListener("input",i),j.addEventListener("click",o);var e,n,r,a,l,s,c,d,u,v,f,m,t,y,S,_,g,p=0;for(J.innerHTML="";0<M.length/10-p;)J.innerHTML+='\n    <div class="slider__slide">\n      <ol class="tasks__list list_js" id="slide_'.concat(p,'"> \n      </ol>\n    </div>'),p++;function L(){v=n.clientWidth;var e,t=function(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=T(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,t=function(){};return{s:t,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,o=!0,a=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return o=e.done,e},e:function(e){a=!0,i=e},f:function(){try{o||null==n.return||n.return()}finally{if(a)throw i}}}}(c);try{for(t.s();!(e=t.n()).done;)e.value.style.width="".concat(v,"px")}catch(e){t.e(e)}finally{t.f()}}function b(e,t){e<0||e>=c.length||(1<arguments.length&&void 0!==t&&!t||(t=d,clearTimeout(m),r.style.transition="transform ".concat(t,"ms"),m=setTimeout(function(){r.style.transition=""},t)),f[u].classList.remove("slider__pagination__item_active"),f[e].classList.add("slider__pagination__item_active"),0===e?l.setAttribute("disabled",""):l.removeAttribute("disabled"),e===c.length-1?s.setAttribute("disabled",""):s.removeAttribute("disabled"),r.style.transform="translateX(-".concat(v*e,"px)"),u=e,localStorage.setItem("activeSlide",u))}g=(e={}).sliderEl,h=void 0===g?".slider":g,g=e.defaultActiveSlide,e=void 0===g?+localStorage.getItem("activeSlide")||0:g,(g=document.querySelector(h))?(n=g.querySelector(".slider__wrapper"),r=g.querySelector(".slider__inner-wrapper"),a=g.querySelector(".slider__pagination"),l=g.querySelector(".slider__button_previous"),s=g.querySelector(".slider__button_next"),c=D(g.querySelectorAll(".slider__slide")),d=500,u=e=(e=e<0?0:e)>=c.length?c.length-1:e,v=0,f=[],m=null,a.innerHTML="",L(),function(){for(var e=0;e<c.length;e++){var t=function(e){var t=document.createElement("button");t.innerText="".concat(e+1),t.classList.add("slider__pagination__item"),e===u&&t.classList.add("slider__pagination__item_active");return t.addEventListener("click",function(){b(e)}),t}(e);a.insertAdjacentElement("beforeend",t),f.push(t)}}(),b(u,!1),window.addEventListener("resize",function(){L(),b(u,!1)}),l.addEventListener("click",function(){b(u-1)}),s.addEventListener("click",function(){b(u+1)}),y=0,S=!1,_=!150,n.addEventListener("touchstart",function(e){t=e.changedTouches[0].pageX,_=S=!0}),n.addEventListener("touchmove",function(e){S&&(150+(e=t-e.changedTouches[0].pageX)<(y=-e)&&_&&(b(u-1),_=!1),150+y<e&&_&&(b(u+1),_=!1))}),n.addEventListener("touchend",function(e){y=0,S=!1})):console.warn('Element "Slider" with querySelector "'.concat(h,'" is NOT FOUND on this page, please check your querySelector.'));var h=D(A.querySelectorAll(".list_js")),E=0;h.forEach(function(e){e.innerHTML="";for(var t,n,r=+e.id.replace(/[^0-9]/g,"")+1;E<10*r&&E<M.length;)e.innerHTML+=(n=M[t=E],'        \n    <li class="tasks__point task">\n        <p class="task__text task-text_js">'.concat(n,'</p>\n        <button class="task__button edit-button_js" id="').concat(t+1,'" aria-label="Edit this task">Edit</button>\n    </li>')),E++;N.addEventListener("input",i)});var k=D(A.querySelectorAll(".edit-button_js"));k.forEach(function(n){function r(e){e.preventDefault(),j.removeEventListener("click",o),O.removeEventListener("click",r),w.removeEventListener("click",i);e=n.id-1;(M=JSON.parse(localStorage.getItem("ToDoListData")))[e]=N.value,localStorage.setItem("ToDoListData",JSON.stringify(M)),X()}function i(e){e.preventDefault(),j.removeEventListener("click",o),w.removeEventListener("click",i),O.removeEventListener("click",r);e=n.id-1;(M=JSON.parse(localStorage.getItem("ToDoListData"))).splice(e,1),localStorage.setItem("ToDoListData",JSON.stringify(M)),X()}n.parentElement.querySelector(".task__text").insertAdjacentHTML("beforebegin","".concat(n.id,".")),n.addEventListener("click",function t(e){e.preventDefault();H=!0;k.forEach(function(e){e.removeEventListener("click",t)});n.removeEventListener("click",t);x.classList.remove("hidden");q.classList.add("hidden");N.value=n.parentElement.querySelector(".task__text").innerText;O.addEventListener("click",r);w.addEventListener("click",i)})})}M=(e||(M=["Collect underpants","???","PROFIT"],localStorage.setItem("ToDoListData",JSON.stringify(M))),JSON.parse(localStorage.getItem("ToDoListData"))),X();