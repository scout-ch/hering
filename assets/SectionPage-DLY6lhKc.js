import{d as m,j as e,C as a,e as g,u as p,r as l}from"./index-CCTNwLGU.js";import{M as d,r as u,L as h}from"./MarkdownComponents-D2OmoaxJ.js";function f(s){const{t:n}=m(),t=s.targets.map(function(r){return e.jsx("div",{className:"role",children:n(`target.role.${r.rolle}`)},r.rolle)});return e.jsx("div",{className:"targets",children:t})}function x(s){const n=s.data;return n?e.jsx("div",{className:"chapter",children:e.jsxs("div",{id:n.slug,children:[e.jsxs("div",{className:"chapter-title",children:[n.icon&&e.jsx("img",{className:"chapter-icon",src:n.icon.url,alt:"icon"}),e.jsx("h2",{id:n.slug,children:n.title})]}),e.jsxs("div",{className:"chapter-main",children:[e.jsx(f,{targets:n.responsible}),e.jsx(d,{remarkPlugins:[u],components:h,children:n.content})]})]})}):null}function j(s,n){if(s.length!==0){if(s.length>1){if(n.length>0)return;const t=s.find(r=>r.isIntersecting);if(!t)return;window.dispatchEvent(new CustomEvent(a,{detail:{chapterSlug:t.target.children[0].id}}));return}s.forEach(t=>{var i;if(t.intersectionRect.top/t.rootBounds.height>.1)return;const o=t.isIntersecting?t.target.children[0].id:(i=t.target.nextElementSibling)==null?void 0:i.children[0].id;o&&window.dispatchEvent(new CustomEvent(a,{detail:{chapterSlug:o}}))})}}function N(s){const{slug:n}=g(),t=s.sections[n||""],r=p();if(l.useEffect(()=>{t&&(document.title=t.title)},[t]),l.useEffect(()=>{const i=new IntersectionObserver(c=>j(c,r.hash),{root:document,rootMargin:"0px",threshold:[.2]});return document.querySelectorAll(".chapter").forEach(c=>{i.observe(c)}),()=>{i.disconnect()}},[t,r]),!t)return null;const o=t.chapters.sort((i,c)=>i.sorting-c.sorting).map(i=>e.jsx(x,{data:i},i.title));return e.jsx("div",{className:"content",id:"section",children:e.jsxs("div",{className:"content-main",children:[e.jsx("div",{id:"section-title",className:"section-title",children:e.jsx("h1",{children:t.title})}),e.jsx(d,{remarkPlugins:[u],components:h,children:t.content}),o]})})}export{N as default};