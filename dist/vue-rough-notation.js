!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).VueRoughNotation=e()}(this,(function(){"use strict";const t="http://www.w3.org/2000/svg";class e{constructor(t){this.seed=t}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function s(t,e,s,i,n){return{type:"path",ops:u(t,e,s,i,n)}}function i(t,e){return function(t,e,i){const n=(t||[]).length;if(n>2){const s=[];for(let e=0;e<n-1;e++)s.push(...u(t[e][0],t[e][1],t[e+1][0],t[e+1][1],i));return e&&s.push(...u(t[n-1][0],t[n-1][1],t[0][0],t[0][1],i)),{type:"path",ops:s}}return 2===n?s(t[0][0],t[0][1],t[1][0],t[1][1],i):{type:"path",ops:[]}}(t,!0,e)}function n(t,e,s,n,o){return i([[t,e],[t+s,e],[t+s,e+n],[t,e+n]],o)}function o(t,e,s,i,n){return function(t,e,s,i){const[n,o]=l(i.increment,t,e,i.rx,i.ry,1,i.increment*a(.1,a(.4,1,s),s),s);let h=d(n,null,s);if(!s.disableMultiStroke){const[n]=l(i.increment,t,e,i.rx,i.ry,1.5,0,s),o=d(n,null,s);h=h.concat(o)}return{estimatedPoints:o,opset:{type:"path",ops:h}}}(t,e,n,function(t,e,s){const i=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(t/2,2)+Math.pow(e/2,2))/2)),n=Math.max(s.curveStepCount,s.curveStepCount/Math.sqrt(200)*i),o=2*Math.PI/n;let h=Math.abs(t/2),a=Math.abs(e/2);const u=1-s.curveFitting;return h+=r(h*u,s),a+=r(a*u,s),{increment:o,rx:h,ry:a}}(s,i,n)).opset}function h(t){return t.randomizer||(t.randomizer=new e(t.seed||0)),t.randomizer.next()}function a(t,e,s,i=1){return s.roughness*i*(h(s)*(e-t)+t)}function r(t,e,s=1){return a(-t,t,e,s)}function u(t,e,s,i,n,o=!1){const h=o?n.disableMultiStrokeFill:n.disableMultiStroke,a=c(t,e,s,i,n,!0,!1);if(h)return a;const r=c(t,e,s,i,n,!0,!0);return a.concat(r)}function c(t,e,s,i,n,o,a){const u=Math.pow(t-s,2)+Math.pow(e-i,2),c=Math.sqrt(u);let d=1;d=c<200?1:c>500?.4:-.0016668*c+1.233334;let l=n.maxRandomnessOffset||0;l*l*100>u&&(l=c/10);const p=l/2,f=.2+.2*h(n);let g=n.bowing*n.maxRandomnessOffset*(i-e)/200,m=n.bowing*n.maxRandomnessOffset*(t-s)/200;g=r(g,n,d),m=r(m,n,d);const w=[],_=()=>r(p,n,d),v=()=>r(l,n,d);return o&&(a?w.push({op:"move",data:[t+_(),e+_()]}):w.push({op:"move",data:[t+r(l,n,d),e+r(l,n,d)]})),a?w.push({op:"bcurveTo",data:[g+t+(s-t)*f+_(),m+e+(i-e)*f+_(),g+t+2*(s-t)*f+_(),m+e+2*(i-e)*f+_(),s+_(),i+_()]}):w.push({op:"bcurveTo",data:[g+t+(s-t)*f+v(),m+e+(i-e)*f+v(),g+t+2*(s-t)*f+v(),m+e+2*(i-e)*f+v(),s+v(),i+v()]}),w}function d(t,e,s){const i=t.length,n=[];if(i>3){const o=[],h=1-s.curveTightness;n.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<i;e++){const s=t[e];o[0]=[s[0],s[1]],o[1]=[s[0]+(h*t[e+1][0]-h*t[e-1][0])/6,s[1]+(h*t[e+1][1]-h*t[e-1][1])/6],o[2]=[t[e+1][0]+(h*t[e][0]-h*t[e+2][0])/6,t[e+1][1]+(h*t[e][1]-h*t[e+2][1])/6],o[3]=[t[e+1][0],t[e+1][1]],n.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[3][0],o[3][1]]})}if(e&&2===e.length){const t=s.maxRandomnessOffset;n.push({op:"lineTo",data:[e[0]+r(t,s),e[1]+r(t,s)]})}}else 3===i?(n.push({op:"move",data:[t[1][0],t[1][1]]}),n.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===i&&n.push(...u(t[0][0],t[0][1],t[1][0],t[1][1],s));return n}function l(t,e,s,i,n,o,h,a){const u=[],c=[],d=r(.5,a)-Math.PI/2;c.push([r(o,a)+e+.9*i*Math.cos(d-t),r(o,a)+s+.9*n*Math.sin(d-t)]);for(let h=d;h<2*Math.PI+d-.01;h+=t){const t=[r(o,a)+e+i*Math.cos(h),r(o,a)+s+n*Math.sin(h)];u.push(t),c.push(t)}return c.push([r(o,a)+e+i*Math.cos(d+2*Math.PI+.5*h),r(o,a)+s+n*Math.sin(d+2*Math.PI+.5*h)]),c.push([r(o,a)+e+.98*i*Math.cos(d+h),r(o,a)+s+.98*n*Math.sin(d+h)]),c.push([r(o,a)+e+.9*i*Math.cos(d+.5*h),r(o,a)+s+.9*n*Math.sin(d+.5*h)]),[c,u]}const p={maxRandomnessOffset:2,roughness:1.5,bowing:1,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,seed:0,combineNestedSvgPaths:!1,disableMultiStroke:!1,disableMultiStrokeFill:!1},f=JSON.parse(JSON.stringify(p));f.disableMultiStroke=!0;const g=JSON.parse(JSON.stringify(p));g.roughness=3,g.disableMultiStroke=!0;class m{constructor(t,e){this._state="unattached",this._resizing=!1,this._animationGroupDelay=0,this._resizeListener=()=>{this._resizing||(this._resizing=!0,setTimeout(()=>{if(this._resizing=!1,"showing"===this._state){const t=this.computeSize();t&&this.hasRectChanged(t)&&this.show()}},400))},this._e=t,this._config=e,this.attach()}get config(){return this._config}attach(){if("unattached"===this._state&&this._e.parentElement){!function(){if(!window.__rough_notation_keyframe_styles){const t=window.__rough_notation_keyframe_styles=document.createElement("style");t.textContent="\n    @keyframes rough-notation-dash {\n      to {\n        stroke-dashoffset: 0;\n      }\n    }\n    ",document.head.appendChild(t)}}();const e=this._svg=document.createElementNS(t,"svg"),s=e.style;s.position="absolute",s.top="0",s.left="0",s.overflow="visible",s.pointerEvents="none",s.width="100px",s.height="100px";const i="highlight"===this._config.type;if(this._e.insertAdjacentElement(i?"beforebegin":"afterend",e),this._state="not-showing",i){const t=window.getComputedStyle(this._e).position;(!t||"static"===t)&&(this._e.style.position="relative")}this.attachListeners()}}detachListeners(){window.removeEventListener("resize",this._resizeListener),this._resizeObserver&&this._resizeObserver.unobserve(this._e)}attachListeners(){this.detachListeners(),window.addEventListener("resize",this._resizeListener,{passive:!0}),!this._resizeObserver&&"ResizeObserver"in window&&(this._resizeObserver=new window.ResizeObserver(t=>{for(const e of t){let t=!0;if(e.contentRect){const s=this.computeSizeWithBounds(e.contentRect);s&&!this.hasRectChanged(s)&&(t=!1)}t&&this._resizeListener()}})),this._resizeObserver&&this._resizeObserver.observe(this._e)}sameInteger(t,e){return Math.round(t)===Math.round(e)}hasRectChanged(t){return!this._lastSize||!t||!(this.sameInteger(t.x,this._lastSize.x)&&this.sameInteger(t.y,this._lastSize.y)&&this.sameInteger(t.w,this._lastSize.w)&&this.sameInteger(t.h,this._lastSize.h))}isShowing(){return"not-showing"!==this._state}show(){switch(this._state){case"unattached":break;case"showing":this.hide(),this.show();break;case"not-showing":this.attach(),this._svg&&this.render(this._svg)}}hide(){if(this._svg)for(;this._svg.lastChild;)this._svg.removeChild(this._svg.lastChild);this._state="not-showing"}remove(){this._svg&&this._svg.parentElement&&this._svg.parentElement.removeChild(this._svg),this._svg=void 0,this._state="unattached",this.detachListeners()}render(e){const i=this.computeSize();i&&(!function(e,i,h,a){const r=[];let u=h.strokeWidth||2;const c=0===h.padding?0:h.padding||5,d=void 0===h.animate||!!h.animate;switch(h.type){case"underline":{const t=i.y+i.h+c;r.push(s(i.x,t,i.x+i.w,t,f)),r.push(s(i.x+i.w,t,i.x,t,f));break}case"strike-through":{const t=i.y+i.h/2;r.push(s(i.x,t,i.x+i.w,t,f)),r.push(s(i.x+i.w,t,i.x,t,f));break}case"box":{const t=i.x-c,e=i.y-c,s=i.w+2*c,o=i.h+2*c;r.push(n(t,e,s,o,f)),r.push(n(t,e,s,o,f));break}case"crossed-off":{const t=i.x,e=i.y,n=t+i.w,o=e+i.h;r.push(s(t,e,n,o,f)),r.push(s(n,o,t,e,f)),r.push(s(n,e,t,o,f)),r.push(s(t,o,n,e,f));break}case"circle":{const t=2*c,e=i.w+2*t,s=i.h+2*t,n=i.x-t+e/2,h=i.y-t+s/2;r.push(o(n,h,e,s,p));break}case"highlight":{u=.95*i.h;const t=i.y+i.h/2;r.push(s(i.x,t,i.x+i.w,t,g)),r.push(s(i.x+i.w,t,i.x,t,g));break}}if(r.length){const s=function(t){const e=[];for(const s of t){let t="";for(const i of s.ops){const s=i.data;switch(i.op){case"move":t.trim()&&e.push(t.trim()),t=`M${s[0]} ${s[1]} `;break;case"bcurveTo":t+=`C${s[0]} ${s[1]}, ${s[2]} ${s[3]}, ${s[4]} ${s[5]} `;break;case"lineTo":t+=`L${s[0]} ${s[1]} `}}t.trim()&&e.push(t.trim())}return e}(r),i=[],n=[];let o=0;const c=0===h.animationDuration?0:h.animationDuration||800,l=(0===h.animationDelay?0:h.animationDelay||0)+(a||0);for(const a of s){const s=document.createElementNS(t,"path");if(s.setAttribute("d",a),s.setAttribute("fill","none"),s.setAttribute("stroke",h.color||"currentColor"),s.setAttribute("stroke-width",""+u),d){const t=s.getTotalLength();i.push(t),o+=t}e.appendChild(s),n.push(s)}if(d){let t=0;for(let e=0;e<n.length;e++){const s=n[e],h=i[e],a=o?c*(h/o):0,r=l+t,u=s.style;u.strokeDashoffset=""+h,u.strokeDasharray=""+h,u.animation=`rough-notation-dash ${a}ms ease-out ${r}ms forwards`,t+=a}}}}(e,i,this._config,this._animationGroupDelay),this._lastSize=i,this._state="showing")}computeSize(){return this.computeSizeWithBounds(this._e.getBoundingClientRect())}computeSizeWithBounds(t){if(this._svg){const e=this._svg.getBoundingClientRect(),s=t;return{x:(s.x||s.left)-(e.x||e.left),y:(s.y||s.top)-(e.y||e.top),w:s.width,h:s.height}}return null}}const w=["underline","box","circle","highlight","strike-through","crossed-off"];var _={name:"RoughNotation",props:{type:{type:String,required:!0,validator:t=>w.indexOf(t)>-1},tag:{type:String,default:"div"},isShow:{type:Boolean,default:!1},animate:{type:Boolean,default:!0},animationDuration:{type:Number,default:800},animationDelay:{type:Number,default:0},color:{type:String,default:"currentColor"},strokeWidth:{type:Number,default:1},padding:{type:Number,default:5}},mounted(){var t,e;this.el=this.$el,this.annotation=(t=this.el,e={type:this.type,animate:this.animate,animationDuration:this.animationDuration,animationDelay:this.animationDelay,color:this.color,strokeWidth:this.strokeWidth,padding:this.padding},new m(t,e)),this.$watch("isShow",t=>{t?this.show():this.hide()},{immediate:!0})},beforeDestroy(){this.annotation&&this.annotation.remove()},methods:{show(){this.annotation&&this.annotation.show()},hide(){this.annotation&&this.annotation.hide()},isShowing(){return!(!this.annotation||!this.annotation.isShowing())}},render(t){const e=this.$slots.default;return this.tag?t(this.tag,null,e):e&&e[0]}};const v={install(t){t.component("rough-notation",_),t.component("RoughNotation",_)}};return function(){let t;"undefined"!=typeof window?t=window:"undefined"!=typeof global&&(t=global),t&&t.Vue&&t.Vue.use(v)}(),v}));
