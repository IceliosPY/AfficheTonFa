var Vw=Object.defineProperty,Hw=Object.defineProperties;var zw=Object.getOwnPropertyDescriptors;var d_=Object.getOwnPropertySymbols;var Gw=Object.prototype.hasOwnProperty,jw=Object.prototype.propertyIsEnumerable;var f_=(n,e,t)=>e in n?Vw(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,he=(n,e)=>{for(var t in e||={})Gw.call(e,t)&&f_(n,t,e[t]);if(d_)for(var t of d_(e))jw.call(e,t)&&f_(n,t,e[t]);return n},mt=(n,e)=>Hw(n,zw(e));var Aa=[null],Bl=[!1],ds=1,Ww=null,Pn=Symbol("SIGNAL");function Ge(n){let e=Aa[0];return Aa[0]=n,e}function Hl(){return Aa[0]}var Ra={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function no(n){if(Bl[0])throw new Error("");let e=Aa[0];if(e===null)return;e.consumerOnSignalRead(n);let t=e.producersTail;if(t!==void 0&&t.producer===n)return;let i,r=e.recomputing;if(r&&(i=t!==void 0?t.nextProducer:e.producers,i!==void 0&&i.producer===n)){e.producersTail=i,i.lastReadVersion=n.version,i.knownValidAtEpoch=ds;return}let s=n.consumersTail;if(s!==void 0&&s.consumer===e&&(!r||s.knownValidAtEpoch===ds))return;let o=io(e),a={producer:n,consumer:e,nextProducer:i,prevConsumer:void 0,knownValidAtEpoch:ds,lastReadVersion:n.version,nextConsumer:void 0};e.producersTail=a,t!==void 0?t.nextProducer=a:e.producers=a,o&&g_(n,a)}function h_(){ds++}function zl(n){if(!(io(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===ds)){if(!n.producerMustRecompute(n)&&!jl(n)){Vl(n);return}n.producerRecomputeValue(n),Vl(n)}}function ap(n){if(n.consumers===void 0)return;let e=Bl[0];Bl[0]=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||$w(i)}}finally{Bl[0]=e}}function cp(){return Aa[0]?.consumerAllowSignalWrites!==!1}function $w(n){n.dirty=!0,ap(n),n.consumerMarkedDirty?.(n)}function Vl(n){n.dirty=!1,n.lastCleanEpoch=ds}function Na(n){return n&&p_(n),Ge(n)}function p_(n){if(n.producersTail?.knownValidAtEpoch===ds){let e=n.producers;for(;e!==void 0;)e.knownValidAtEpoch=null,e=e.nextProducer}n.producersTail=void 0,n.recomputing=!0}function Gl(n,e){Ge(e),n&&m_(n)}function m_(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(io(n))do t=lp(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function jl(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||(zl(t),i!==t.version))return!0}return!1}function Pa(n){if(io(n)){let e=n.producers;for(;e!==void 0;)e=lp(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function g_(n,e){let t=n.consumersTail,i=io(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)g_(r.producer,r)}function lp(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!io(e)){let s=e.producers;for(;s!==void 0;)s=lp(s)}return t}function io(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function up(n){Ww?.(n)}function dp(n,e){return Object.is(n,e)}function qw(){throw new Error}var y_=qw;function v_(n){y_(n)}function fp(n){y_=n}var Xw=null;function hp(n,e){let t=Object.create(Oa);t.value=n,e!==void 0&&(t.equal=e);let i=()=>__(t);return i[Pn]=t,up(t),[i,o=>fs(t,o),o=>pp(t,o)]}function __(n){return no(n),n.value}function fs(n,e){cp()||v_(n),n.equal(n.value,e)||(n.value=e,Yw(n))}function pp(n,e){cp()||v_(n),fs(n,e(n.value))}var Oa=mt(he({},Ra),{equal:dp,value:void 0,kind:"signal"});function Yw(n){n.version++,h_(),ap(n),Xw?.(n)}var mp=[void 0];function Wl(){return mp[0]}function Pi(n){let e=mp[0];return mp[0]=n,e}var S_=Symbol("NotFound");function ro(n){return n===S_||n?.name==="\u0275NotFound"}function E_(n){let e=Ge(null);try{return n()}finally{Ge(e)}}function We(n){return typeof n=="function"}function so(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var $l=so(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function La(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var rn=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(We(i))try{i()}catch(s){e=s instanceof $l?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{M_(s)}catch(o){e=e??[],o instanceof $l?e=[...e,...o.errors]:e.push(o)}}if(e)throw new $l(e)}}add(e){var t;if(e&&e!==this)if(this.closed)M_(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&La(t,e)}remove(e){let{_finalizers:t}=this;t&&La(t,e),e instanceof n&&e._removeParent(this)}};rn.EMPTY=(()=>{let n=new rn;return n.closed=!0,n})();var gp=rn.EMPTY;function ql(n){return n instanceof rn||n&&"closed"in n&&We(n.remove)&&We(n.add)&&We(n.unsubscribe)}function M_(n){We(n)?n():n.unsubscribe()}var ui={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var oo={setTimeout(n,e,...t){let{delegate:i}=oo;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=oo;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function Xl(n){oo.setTimeout(()=>{let{onUnhandledError:e}=ui;if(e)e(n);else throw n})}function Fa(){}var b_=yp("C",void 0,void 0);function w_(n){return yp("E",void 0,n)}function T_(n){return yp("N",n,void 0)}function yp(n,e,t){return{kind:n,value:e,error:t}}var hs=null;function ao(n){if(ui.useDeprecatedSynchronousErrorHandling){let e=!hs;if(e&&(hs={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=hs;if(hs=null,t)throw i}}else n()}function C_(n){ui.useDeprecatedSynchronousErrorHandling&&hs&&(hs.errorThrown=!0,hs.error=n)}var ps=class extends rn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,ql(e)&&e.add(this)):this.destination=tT}static create(e,t,i){return new co(e,t,i)}next(e){this.isStopped?_p(T_(e),this):this._next(e)}error(e){this.isStopped?_p(w_(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?_p(b_,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Qw=Function.prototype.bind;function vp(n,e){return Qw.call(n,e)}var Sp=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){Yl(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){Yl(i)}else Yl(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){Yl(t)}}},co=class extends ps{constructor(e,t,i){super();let r;if(We(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&ui.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&vp(e.next,s),error:e.error&&vp(e.error,s),complete:e.complete&&vp(e.complete,s)}):r=e}this.destination=new Sp(r)}};function Yl(n){ui.useDeprecatedSynchronousErrorHandling?C_(n):Xl(n)}function eT(n){throw n}function _p(n,e){let{onStoppedNotification:t}=ui;t&&oo.setTimeout(()=>t(n,e))}var tT={closed:!0,next:Fa,error:eT,complete:Fa};var lo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function di(n){return n}function Zl(...n){return xp(n)}function xp(n){return n.length===0?di:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var Je=class n{constructor(e){e&&(this._subscribe=e)}lift(e){let t=new n;return t.source=this,t.operator=e,t}subscribe(e,t,i){let r=iT(e)?e:new co(e,t,i);return ao(()=>{let{operator:s,source:o}=this;r.add(s?s.call(r,o):o?this._subscribe(r):this._trySubscribe(r))}),r}_trySubscribe(e){try{return this._subscribe(e)}catch(t){e.error(t)}}forEach(e,t){return t=D_(t),new t((i,r)=>{let s=new co({next:o=>{try{e(o)}catch(a){r(a),s.unsubscribe()}},error:r,complete:i});this.subscribe(s)})}_subscribe(e){var t;return(t=this.source)===null||t===void 0?void 0:t.subscribe(e)}[lo](){return this}pipe(...e){return xp(e)(this)}toPromise(e){return e=D_(e),new e((t,i)=>{let r;this.subscribe(s=>r=s,s=>i(s),()=>t(r))})}};Je.create=n=>new Je(n);function D_(n){var e;return(e=n??ui.Promise)!==null&&e!==void 0?e:Promise}function nT(n){return n&&We(n.next)&&We(n.error)&&We(n.complete)}function iT(n){return n&&n instanceof ps||nT(n)&&ql(n)}function rT(n){return We(n?.lift)}function ut(n){return e=>{if(rT(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function gt(n,e,t,i,r){return new Ep(n,e,t,i,r)}var Ep=class extends ps{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var I_=so(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var Ft=class extends Je{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let t=new Kl(this,this);return t.operator=e,t}_throwIfClosed(){if(this.closed)throw new I_}next(e){ao(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let t of this.currentObservers)t.next(e)}})}error(e){ao(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:t}=this;for(;t.length;)t.shift().error(e)}})}complete(){ao(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:t,isStopped:i,observers:r}=this;return t||i?gp:(this.currentObservers=null,r.push(e),new rn(()=>{this.currentObservers=null,La(r,e)}))}_checkFinalizedStatuses(e){let{hasError:t,thrownError:i,isStopped:r}=this;t?e.error(i):r&&e.complete()}asObservable(){let e=new Je;return e.source=this,e}};Ft.create=(n,e)=>new Kl(n,e);var Kl=class extends Ft{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:gp}};var sn=class extends Ft{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var on=new Je(n=>n.complete());function A_(n){return n&&We(n.schedule)}function R_(n){return n[n.length-1]}function N_(n){return We(R_(n))?n.pop():void 0}function Tr(n){return A_(R_(n))?n.pop():void 0}function O_(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(d){o(d)}}function c(u){try{l(i.throw(u))}catch(d){o(d)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function P_(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function ms(n){return this instanceof ms?(this.v=n,this):new ms(n)}function L_(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(h){return function(g){return Promise.resolve(g).then(h,d)}}function a(h,g){i[h]&&(r[h]=function(S){return new Promise(function(p,m){s.push([h,S,p,m])>1||c(h,S)})},g&&(r[h]=g(r[h])))}function c(h,g){try{l(i[h](g))}catch(S){f(s[0][3],S)}}function l(h){h.value instanceof ms?Promise.resolve(h.value.v).then(u,d):f(s[0][2],h)}function u(h){c("next",h)}function d(h){c("throw",h)}function f(h,g){h(g),s.shift(),s.length&&c(s[0][0],s[0][1])}}function F_(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof P_=="function"?P_(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,c){o=n[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var Jl=(n=>n&&typeof n.length=="number"&&typeof n!="function");function Ql(n){return We(n?.then)}function eu(n){return We(n[lo])}function tu(n){return Symbol.asyncIterator&&We(n?.[Symbol.asyncIterator])}function nu(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function sT(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var iu=sT();function ru(n){return We(n?.[iu])}function su(n){return L_(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield ms(t.read());if(r)return yield ms(void 0);yield yield ms(i)}}finally{t.releaseLock()}})}function ou(n){return We(n?.getReader)}function Zt(n){if(n instanceof Je)return n;if(n!=null){if(eu(n))return oT(n);if(Jl(n))return aT(n);if(Ql(n))return cT(n);if(tu(n))return k_(n);if(ru(n))return lT(n);if(ou(n))return uT(n)}throw nu(n)}function oT(n){return new Je(e=>{let t=n[lo]();if(We(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function aT(n){return new Je(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function cT(n){return new Je(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,Xl)})}function lT(n){return new Je(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function k_(n){return new Je(e=>{dT(n,e).catch(t=>e.error(t))})}function uT(n){return k_(su(n))}function dT(n,e){var t,i,r,s;return O_(this,void 0,void 0,function*(){try{for(t=F_(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function In(n,e,t,i=0,r=!1){let s=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(s),!r)return s}function au(n,e=0){return ut((t,i)=>{t.subscribe(gt(i,r=>In(i,n,()=>i.next(r),e),()=>In(i,n,()=>i.complete(),e),r=>In(i,n,()=>i.error(r),e)))})}function cu(n,e=0){return ut((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function U_(n,e){return Zt(n).pipe(cu(e),au(e))}function B_(n,e){return Zt(n).pipe(cu(e),au(e))}function V_(n,e){return new Je(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function H_(n,e){return new Je(t=>{let i;return In(t,e,()=>{i=n[iu](),In(t,e,()=>{let r,s;try{({value:r,done:s}=i.next())}catch(o){t.error(o);return}s?t.complete():t.next(r)},0,!0)}),()=>We(i?.return)&&i.return()})}function lu(n,e){if(!n)throw new Error("Iterable cannot be null");return new Je(t=>{In(t,e,()=>{let i=n[Symbol.asyncIterator]();In(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function z_(n,e){return lu(su(n),e)}function G_(n,e){if(n!=null){if(eu(n))return U_(n,e);if(Jl(n))return V_(n,e);if(Ql(n))return B_(n,e);if(tu(n))return lu(n,e);if(ru(n))return H_(n,e);if(ou(n))return z_(n,e)}throw nu(n)}function kt(n,e){return e?G_(n,e):Zt(n)}function Ze(...n){let e=Tr(n);return kt(n,e)}function Mp(n,e){let t=We(n)?n:()=>n,i=r=>r.error(t());return new Je(e?r=>e.schedule(i,0,r):i)}function uu(n){return!!n&&(n instanceof Je||We(n.lift)&&We(n.subscribe))}var gs=so(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function St(n,e){return ut((t,i)=>{let r=0;t.subscribe(gt(i,s=>{i.next(n.call(e,s,r++))}))})}var{isArray:fT}=Array;function hT(n,e){return fT(e)?n(...e):n(e)}function j_(n){return St(e=>hT(n,e))}var{isArray:pT}=Array,{getPrototypeOf:mT,prototype:gT,keys:yT}=Object;function W_(n){if(n.length===1){let e=n[0];if(pT(e))return{args:e,keys:null};if(vT(e)){let t=yT(e);return{args:t.map(i=>e[i]),keys:t}}}return{args:n,keys:null}}function vT(n){return n&&typeof n=="object"&&mT(n)===gT}function $_(n,e){return n.reduce((t,i,r)=>(t[i]=e[r],t),{})}function bp(...n){let e=Tr(n),t=N_(n),{args:i,keys:r}=W_(n);if(i.length===0)return kt([],e);let s=new Je(_T(i,e,r?o=>$_(r,o):di));return t?s.pipe(j_(t)):s}function _T(n,e,t=di){return i=>{q_(e,()=>{let{length:r}=n,s=new Array(r),o=r,a=r;for(let c=0;c<r;c++)q_(e,()=>{let l=kt(n[c],e),u=!1;l.subscribe(gt(i,d=>{s[c]=d,u||(u=!0,a--),a||i.next(t(s.slice()))},()=>{--o||i.complete()}))},i)},i)}}function q_(n,e,t){n?In(t,n,e):e()}function X_(n,e,t,i,r,s,o,a){let c=[],l=0,u=0,d=!1,f=()=>{d&&!c.length&&!l&&e.complete()},h=S=>l<i?g(S):c.push(S),g=S=>{s&&e.next(S),l++;let p=!1;Zt(t(S,u++)).subscribe(gt(e,m=>{r?.(m),s?h(m):e.next(m)},()=>{p=!0},void 0,()=>{if(p)try{for(l--;c.length&&l<i;){let m=c.shift();o?In(e,o,()=>g(m)):g(m)}f()}catch(m){e.error(m)}}))};return n.subscribe(gt(e,h,()=>{d=!0,f()})),()=>{a?.()}}function yn(n,e,t=1/0){return We(e)?yn((i,r)=>St((s,o)=>e(i,s,r,o))(Zt(n(i,r))),t):(typeof e=="number"&&(t=e),ut((i,r)=>X_(i,r,n,t)))}function Y_(n=1/0){return yn(di,n)}function Z_(){return Y_(1)}function uo(...n){return Z_()(kt(n,Tr(n)))}function ka(n){return new Je(e=>{Zt(n()).subscribe(e)})}function fi(n,e){return ut((t,i)=>{let r=0;t.subscribe(gt(i,s=>n.call(e,s,r++)&&i.next(s)))})}function fo(n){return ut((e,t)=>{let i=null,r=!1,s;i=e.subscribe(gt(t,void 0,void 0,o=>{s=Zt(n(o,fo(n)(e))),i?(i.unsubscribe(),i=null,s.subscribe(t)):r=!0})),r&&(i.unsubscribe(),i=null,s.subscribe(t))})}function ho(n,e){return We(e)?yn(n,e,1):yn(n,1)}function K_(n){return ut((e,t)=>{let i=!1;e.subscribe(gt(t,r=>{i=!0,t.next(r)},()=>{i||t.next(n),t.complete()}))})}function Cr(n){return n<=0?()=>on:ut((e,t)=>{let i=0;e.subscribe(gt(t,r=>{++i<=n&&(t.next(r),n<=i&&t.complete())}))})}function J_(n=ST){return ut((e,t)=>{let i=!1;e.subscribe(gt(t,r=>{i=!0,t.next(r)},()=>i?t.complete():t.error(n())))})}function ST(){return new gs}function Ua(n){return ut((e,t)=>{try{e.subscribe(t)}finally{t.add(n)}})}function Ji(n,e){let t=arguments.length>=2;return i=>i.pipe(n?fi((r,s)=>n(r,s,i)):di,Cr(1),t?K_(e):J_(()=>new gs))}function du(n){return n<=0?()=>on:ut((e,t)=>{let i=[];e.subscribe(gt(t,r=>{i.push(r),n<i.length&&i.shift()},()=>{for(let r of i)t.next(r);t.complete()},void 0,()=>{i=null}))})}function wp(...n){let e=Tr(n);return ut((t,i)=>{(e?uo(n,t,e):uo(n,t)).subscribe(i)})}function On(n,e){return ut((t,i)=>{let r=null,s=0,o=!1,a=()=>o&&!r&&i.complete();t.subscribe(gt(i,c=>{r?.unsubscribe();let l=0,u=s++;Zt(n(c,u)).subscribe(r=gt(i,d=>i.next(e?e(c,d,u,l++):d),()=>{r=null,a()}))},()=>{o=!0,a()}))})}function Ba(n){return ut((e,t)=>{Zt(n).subscribe(gt(t,()=>t.complete(),Fa)),!t.closed&&e.subscribe(t)})}function Kn(n,e,t){let i=We(n)||e||t?{next:n,error:e,complete:t}:n;return i?ut((r,s)=>{var o;(o=i.subscribe)===null||o===void 0||o.call(i);let a=!0;r.subscribe(gt(s,c=>{var l;(l=i.next)===null||l===void 0||l.call(i,c),s.next(c)},()=>{var c;a=!1,(c=i.complete)===null||c===void 0||c.call(i),s.complete()},c=>{var l;a=!1,(l=i.error)===null||l===void 0||l.call(i,c),s.error(c)},()=>{var c,l;a&&((c=i.unsubscribe)===null||c===void 0||c.call(i)),(l=i.finalize)===null||l===void 0||l.call(i)}))}):di}var Se=class extends Error{code;constructor(e,t){super(xs(e,t)),this.code=e}};function xT(n){return`NG0${Math.abs(n)}`}function xs(n,e){return`${xT(n)}${e?": "+e:""}`}function dt(n){for(let e in n)if(n[e]===dt)return e;throw Error("")}function yu(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(yu).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function zp(n,e){return n?e?`${n} ${e}`:n:e||""}var ET=dt({__forward_ref__:dt});function vu(n){return n.__forward_ref__=vu,n}function Fn(n){return i0(n)?n():n}function i0(n){return typeof n=="function"&&Object.hasOwn(n,ET)&&n.__forward_ref__===vu}function Qe(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function yo(n){return{providers:n.providers||[],imports:n.imports||[]}}function Ga(n){return MT(n,_u)}function Gp(n){return Ga(n)!==null}function MT(n,e){return Object.hasOwn(n,e)&&n[e]||null}function bT(n){let e=n?.[_u]??null;return e||null}function Cp(n){return n&&Object.hasOwn(n,hu)?n[hu]:null}var _u=dt({\u0275prov:dt}),hu=dt({\u0275inj:dt}),Ce=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=Qe({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function jp(n){return n&&!!n.\u0275providers}var Wp=dt({\u0275cmp:dt}),$p=dt({\u0275dir:dt}),qp=dt({\u0275pipe:dt}),Xp=dt({\u0275mod:dt}),Dp=dt({\u0275fac:dt}),Es=dt({__NG_ELEMENT_ID__:dt}),Q_=dt({__NG_ENV_ID__:dt});function r0(n){return xu(n,"@NgModule"),n[Xp]||null}function Ms(n){return xu(n,"@Component"),n[Wp]||null}function Su(n){return xu(n,"@Directive"),n[$p]||null}function s0(n){return xu(n,"@Pipe"),n[qp]||null}function xu(n,e){if(n==null)throw new Se(-919,!1)}function Yp(n){return typeof n=="string"?n:n==null?"":String(n)}var o0=dt({ngErrorCode:dt}),wT=dt({ngErrorMessage:dt}),TT=dt({ngTokenPath:dt});function Zp(n,e){return a0("",-200,e)}function Eu(n,e){throw new Se(-201,!1)}function a0(n,e,t){let i=new Se(e,n);return i[o0]=e,i[wT]=n,t&&(i[TT]=t),i}function CT(n){return n[o0]}var Ip;function c0(){return Ip}function Ln(n){let e=Ip;return Ip=n,e}function Kp(n,e,t){let i=Ga(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;Eu(n,"")}var DT={},ys=DT,IT="__NG_DI_FLAG__",Ap=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=vs(t)||0;try{return this.injector.get(e,i&8?null:ys,i)}catch(r){if(ro(r))return r;throw r}}};function AT(n,e=0){let t=Wl();if(t===void 0)throw new Se(-203,!1);if(t===null)return Kp(n,void 0,e);{let i=RT(e),r=t.retrieve(n,i);if(ro(r)){if(i.optional)return null;throw r}return r}}function Pe(n,e=0){return(c0()||AT)(Fn(n),e)}function te(n,e){return Pe(n,vs(e))}function vs(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function RT(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function Rp(n){let e=[];for(let t=0;t<n.length;t++){let i=Fn(n[t]);if(Array.isArray(i)){if(i.length===0)throw new Se(900,!1);let r,s=0;for(let o=0;o<i.length;o++){let a=i[o],c=NT(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push(Pe(r,s))}else e.push(Pe(i))}return e}function NT(n){return n[IT]}function mo(n,e){let t=Object.hasOwn(n,Dp);return t?n[Dp]:null}function l0(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function u0(n){return n.flat(Number.POSITIVE_INFINITY)}function Mu(n,e){n.forEach(t=>Array.isArray(t)?Mu(t,e):e(t))}function Jp(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function ja(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}var bs={},hi=[],Wa=new Ce(""),Qp=new Ce("",-1),em=new Ce(""),go=class{get(e,t=ys){if(t===ys){let r=a0("",-201);throw r.name="\u0275NotFound",r}return t}};function ws(n){return{\u0275providers:n}}function d0(...n){return{\u0275providers:tm(!0,n),\u0275fromNgModule:!0}}function tm(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return Mu(e,o=>{let a=o;pu(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&f0(r,s),t}function f0(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];nm(r,s=>{e(s,i)})}}function pu(n,e,t,i){if(n=Fn(n),!n)return!1;let r=null,s=Cp(n),o=!s&&Ms(n);if(!s&&!o){let c=n.ngModule;if(s=Cp(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)pu(l,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let l;Mu(s.imports,u=>{pu(u,e,t,i)&&(l||=[],l.push(u))}),l!==void 0&&f0(l,e)}if(!a){let l=mo(r)||(()=>new r);e({provide:r,useFactory:l,deps:hi},r),e({provide:em,useValue:r,multi:!0},r),e({provide:Wa,useValue:()=>Pe(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=n;nm(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function nm(n,e){for(let t of n)jp(t)&&(t=t.\u0275providers),Array.isArray(t)?nm(t,e):e(t)}var PT=dt({provide:String,useValue:dt});function h0(n){return n!==null&&typeof n=="object"&&PT in n}function OT(n){return!!(n&&n.useExisting)}function LT(n){return!!(n&&n.useFactory)}function mu(n){return typeof n=="function"}var $a=new Ce(""),fu={},e0={},Tp;function qa(){return Tp===void 0&&(Tp=new go),Tp}var Rt=class{},_s=class extends Rt{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,Pp(e,o=>this.processProvider(o)),this.records.set(Qp,po(void 0,this)),r.has("environment")&&this.records.set(Rt,po(void 0,this));let s=this.records.get($a);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(em,hi,{self:!0}))}retrieve(e,t){let i=vs(t)||0;try{return this.get(e,ys,i)}catch(r){if(ro(r))return r;throw r}}destroy(){Va(this),this._destroyed=!0;let e=Ge(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),Ge(e)}}onDestroy(e){return Va(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Va(this);let t=Pi(this),i=Ln(void 0),r;try{return e()}finally{Pi(t),Ln(i)}}get(e,t=ys,i){if(Va(this),Object.hasOwn(e,Q_))return e[Q_](this);let r=vs(i),s,o=Pi(this),a=Ln(void 0);try{if(!(r&4)){let l=this.records.get(e);if(l===void 0){let u=VT(e)&&Ga(e);u&&this.injectableDefInScope(u)?l=po(Np(e),fu):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,r)}let c=r&2?qa():this.parent;return t=r&8&&t===ys?null:t,c.get(e,t)}catch(c){let l=CT(c);throw l===-200||l===-201?new Se(l,null):c}finally{Ln(a),Pi(o)}}resolveInjectorInitializers(){let e=Ge(null),t=Pi(this),i=Ln(void 0),r;try{let s=this.get(Wa,hi,{self:!0});for(let o of s)o()}finally{Pi(t),Ln(i),Ge(e)}}toString(){return"R3Injector[...]"}processProvider(e){e=Fn(e);let t=mu(e)?e:Fn(e&&e.provide),i=kT(e);if(!mu(e)&&e.multi===!0){let r=this.records.get(t);r||(r=po(void 0,fu,!0),r.factory=()=>Rp(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=Ge(null);try{if(t.value===e0)throw Zp("");return t.value===fu&&(t.value=e0,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&BT(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{Ge(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=Fn(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Np(n){let e=Ga(n),t=e!==null?e.factory:mo(n);if(t!==null)return t;if(n instanceof Ce)throw new Se(-204,!1);if(n instanceof Function)return FT(n);throw new Se(-204,!1)}function FT(n){if(n.length>0)throw new Se(-204,!1);let t=bT(n);return t!==null?()=>t.factory(n):()=>new n}function kT(n){if(h0(n))return po(void 0,n.useValue);{let e=p0(n);return po(e,fu)}}function p0(n,e,t){let i;if(mu(n)){let r=Fn(n);return mo(r)||Np(r)}else if(h0(n))i=()=>Fn(n.useValue);else if(LT(n))i=()=>n.useFactory(...Rp(n.deps||[]));else if(OT(n))i=(r,s)=>Pe(Fn(n.useExisting),s!==void 0&&s&8?8:void 0);else{let r=Fn(n&&(n.useClass||n.provide));if(UT(n))i=()=>new r(...Rp(n.deps));else return mo(r)||Np(r)}return i}function Va(n){if(n.destroyed)throw new Se(-205,!1)}function po(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function UT(n){return!!n.deps}function BT(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function VT(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function Pp(n,e){for(let t of n)Array.isArray(t)?Pp(t,e):t&&jp(t)?Pp(t.\u0275providers,e):e(t)}function Gt(n,e){let t;n instanceof _s?(Va(n),t=n):t=new Ap(n);let i,r=Pi(t),s=Ln(void 0);try{return e()}finally{Pi(r),Ln(s)}}function m0(){return c0()!==void 0||Wl()!=null}var mi=0,Be=1,Fe=2,Bt=3,Qn=4,An=5,Xa=6,vo=7,fn=8,nr=9,Oi=10,Kt=11,_o=12,im=13,Dr=14,kn=15,Ir=16,Ts=17,Li=18,Ya=19,rm=20,Qi=21,bu=22,So=23,Un=24,wu=25,g0=26,Za=27,Bn=28,y0=1;var Cs=7,Ka=8,Ds=9,vn=10;function Ar(n){return Array.isArray(n)&&typeof n[y0]=="object"}function ei(n){return Array.isArray(n)&&n[y0]===!0}function sm(n){return(n.flags&4)!==0}function ir(n){return n.componentOffset>-1}function Ja(n){return(n.flags&1)===1}function Is(n){return!!n.template}function xo(n){return(n[Fe]&512)!==0}function As(n){return(n[Fe]&256)===256}var v0="svg",_0="math";function an(n){for(;Array.isArray(n);)n=n[mi];return n}function S0(n,e){return an(e[n])}function gi(n,e){return an(e[n.index])}function om(n,e){return n.data[e]}function yi(n,e){let t=e[n];return Ar(t)?t:t[mi]}function x0(n){return(n[Fe]&4)===4}function Tu(n){return(n[Fe]&128)===128}function E0(n){return ei(n[Bt])}function Qa(n,e){return e==null?null:n[e]}function am(n){n[Ts]=0}function cm(n){n[Fe]&1024||(n[Fe]|=1024,Tu(n)&&tc(n))}function M0(n,e){for(;n>0;)e=e[Dr],n--;return e}function ec(n){return!!(n[Fe]&9216||n[Un]?.dirty)}function Cu(n){n[Oi].changeDetectionScheduler?.notify(8),n[Fe]&64&&(n[Fe]|=1024),ec(n)&&tc(n)}function tc(n){n[Oi].changeDetectionScheduler?.notify(0);let e=er(n);for(;e!==null&&!(e[Fe]&8192||(e[Fe]|=8192,!Tu(e)));)e=er(e)}function Du(n,e){if(As(n))throw new Se(911,!1);n[Qi]===null&&(n[Qi]=[]),n[Qi].push(e)}function b0(n,e){if(n[Qi]===null)return;let t=n[Qi].indexOf(e);t!==-1&&n[Qi].splice(t,1)}function er(n){let e=n[Bt];return ei(e)?e[Bt]:e}function lm(n){return n[vo]??=[]}function um(n){return n.cleanup??=[]}function w0(n,e,t,i){let r=lm(e);r.push(t),n.firstCreatePass&&um(n).push(i,r.length-1)}var st={lFrame:B0(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Op=!1;function T0(){return st.lFrame.elementDepthCount}function C0(){st.lFrame.elementDepthCount++}function D0(){st.lFrame.elementDepthCount--}function dm(){return st.bindingsEnabled}function I0(){return st.skipHydrationRootTNode!==null}function A0(n){return st.skipHydrationRootTNode===n}function R0(){st.skipHydrationRootTNode=null}function It(){return st.lFrame.lView}function Fi(){return st.lFrame.tView}function ki(){let n=fm();for(;n!==null&&n.type===64;)n=n.parent;return n}function fm(){return st.lFrame.currentTNode}function N0(){let n=st.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function Eo(n,e){let t=st.lFrame;t.currentTNode=n,t.isParent=e}function hm(){return st.lFrame.isParent}function P0(){st.lFrame.isParent=!1}function pm(){return Op}function mm(n){let e=Op;return Op=n,e}function O0(n){return st.lFrame.bindingIndex=n}function Iu(){return st.lFrame.bindingIndex++}function L0(){return st.lFrame.inI18n}function F0(n,e){let t=st.lFrame;t.bindingIndex=t.bindingRootIndex=n,Au(e)}function k0(){return st.lFrame.currentDirectiveIndex}function Au(n){st.lFrame.currentDirectiveIndex=n}function gm(){return st.lFrame.currentQueryIndex}function Ru(n){st.lFrame.currentQueryIndex=n}function HT(n){let e=n[Be];return e.type===2?e.declTNode:e.type===1?n[An]:null}function ym(n,e,t){if(t&4){let r=e,s=n;for(;r=r.parent,r===null&&!(t&1);)if(r=HT(s),r===null||(s=s[Dr],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=st.lFrame=U0();return i.currentTNode=e,i.lView=n,!0}function Nu(n){let e=U0(),t=n[Be];st.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function U0(){let n=st.lFrame,e=n===null?null:n.child;return e===null?B0(n):e}function B0(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function V0(){let n=st.lFrame;return st.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var vm=V0;function Pu(){let n=V0();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function H0(n){return(st.lFrame.contextLView=M0(n,st.lFrame.contextLView))[fn]}function Ou(){return st.lFrame.selectedIndex}function Rr(n){st.lFrame.selectedIndex=n}function _m(){let n=st.lFrame;return om(n.tView,n.selectedIndex)}function Sm(){return st.lFrame.currentNamespace}var z0=!0;function Lu(){return z0}function Fu(n){z0=n}function Lp(n,e=null,t=null,i){let r=xm(n,e,t,i);return r.resolveInjectorInitializers(),r}function xm(n,e=null,t=null,i,r=new Set){let s=[t||hi,d0(n)],o;return new _s(s,e||qa(),o||null,r)}var Jn=class n{static THROW_IF_NOT_FOUND=ys;static NULL=new go;static create(e,t){if(Array.isArray(e))return Lp({name:""},t,e,"");{let i=e.name??"";return Lp({name:i},e.parent,e.providers,i)}}static \u0275prov=Qe({token:n,providedIn:"any",factory:()=>Pe(Qp)});static __NG_ELEMENT_ID__=-1},Nt=new Ce(""),pi=class{static __NG_ELEMENT_ID__=zT;static __NG_ENV_ID__=e=>e},Fp=class extends pi{_lView;constructor(e){super(),this._lView=e}get destroyed(){return As(this._lView)}onDestroy(e){let t=this._lView;return Du(t,e),()=>b0(t,e)}};function zT(){return new Fp(It())}var G0=!1,j0=new Ce(""),rr=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new sn(!1);debugTaskTracker=te(j0,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new Je(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=Qe({token:n,providedIn:"root",factory:()=>new n})}return n})(),kp=class extends Ft{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,m0()&&(this.destroyRef=te(pi,{optional:!0})??void 0,this.pendingTasks=te(rr,{optional:!0})??void 0)}emit(e){let t=Ge(null);try{super.next(e)}finally{Ge(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof rn&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},Ut=kp;function gu(...n){}function Em(n){let e,t;function i(){n=gu;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function W0(n){return queueMicrotask(()=>n()),()=>{n=gu}}var Mm="isAngularZone",Ha=Mm+"_ID",GT=0,dn=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new Ut(!1);onMicrotaskEmpty=new Ut(!1);onStable=new Ut(!1);onError=new Ut(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=G0}=e;if(typeof Zone>"u")throw new Se(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&i,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,$T(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Mm)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new Se(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new Se(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,jT,gu,gu);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},jT={};function bm(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function WT(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){Em(()=>{n.callbackScheduled=!1,Up(n),n.isCheckStableRunning=!0,bm(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),Up(n)}function $T(n){let e=()=>{WT(n)},t=GT++;n._inner=n._inner.fork({name:"angular",properties:{[Mm]:!0,[Ha]:t,[Ha+t]:!0},onInvokeTask:(i,r,s,o,a,c)=>{if(qT(c))return i.invokeTask(s,o,a,c);try{return t0(n),i.invokeTask(s,o,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),n0(n)}},onInvoke:(i,r,s,o,a,c,l)=>{try{return t0(n),i.invoke(s,o,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!XT(c)&&e(),n0(n)}},onHasTask:(i,r,s,o)=>{i.hasTask(s,o),r===s&&(o.change=="microTask"?(n._hasPendingMicrotasks=o.microTask,Up(n),bm(n)):o.change=="macroTask"&&(n.hasPendingMacrotasks=o.macroTask))},onHandleError:(i,r,s,o)=>(i.handleError(s,o),n.runOutsideAngular(()=>n.onError.emit(o)),!1)})}function Up(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function t0(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function n0(n){n._nesting--,bm(n)}var za=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new Ut;onMicrotaskEmpty=new Ut;onStable=new Ut;onError=new Ut;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function qT(n){return $0(n,"__ignore_ng_zone__")}function XT(n){return $0(n,"__scheduler_tick__")}function $0(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var tr=class{_console=console;handleError(e){this._console.error("ERROR",e)}};function q0(n){return YT(n)?n:new Bp(n)}function YT(n){return n instanceof Error||typeof n=="object"&&n!==null&&typeof n.name=="string"&&typeof n.message=="string"}var Bp=class extends Error{constructor(e){super(String(e),{cause:e}),this.name="ErrorBoundaryWrappedError"}},vi=new Ce("",{factory:()=>{let n=te(dn),e=te(Rt),t;return i=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw i}):(t??=e.get(tr),t.handleError(i))})}}}),X0={provide:Wa,useValue:()=>{let n=te(tr,{optional:!0})},multi:!0};function sr(n,e){let[t,i,r]=hp(n,e?.equal),s=t,o=s[Pn];return s.set=i,s.update=r,s.asReadonly=Y0.bind(s),s}function Y0(){let n=this[Pn];if(n.readonlyFn===void 0){let e=()=>this();e[Pn]=n,n.readonlyFn=e}return n.readonlyFn}var nc=new Ce("",{factory:()=>ZT}),ZT="ng";var ku=new Ce(""),ic=new Ce("",{providedIn:"platform",factory:()=>"unknown"});var rc=new Ce("",{factory:()=>te(Nt).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var Ss=class{},sc=new Ce("",{factory:()=>!0});var wm=new Ce(""),Tm=(()=>{class n{static \u0275prov=Qe({token:n,providedIn:"root",factory:()=>new Vp})}return n})(),Vp=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},Hp=class{[Pn];constructor(e){this[Pn]=e}destroy(){this[Pn].destroy()}};var Uu=(()=>{class n{internalPendingTasks=te(rr);scheduler=te(Ss);errorHandler=te(vi);add(){let t=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(t)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(t))}}run(t){let i=this.add();try{t().catch(this.errorHandler).finally(i)}catch(r){this.errorHandler(r),i()}}static \u0275prov=Qe({token:n,providedIn:"root",factory:()=>new n})}return n})();var Jm=Symbol("InputSignalNode#UNSET"),DS=mt(he({},Oa),{transformFn:void 0,applyValueToInputSignal(n,e){fs(n,e)}});function Ju(n){return{toString:n}.toString()}var at=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(at||{}),Gu=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}};function IS(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var AS=null,Co=(()=>{AS=Z0;let n=()=>Z0;return n.ngInherit=!0,n})();function mC(){return AS}function Z0(n){return n.type.prototype.ngOnChanges&&(n.setInput=yC),gC}function gC(){let n=RS(this),e=n?.current;if(e){let t=n.previous;if(t===bs)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function yC(n,e,t,i,r){let s=this.declaredInputs[i],o=RS(n)||vC(n,{previous:bs,current:null}),a=o.current||(o.current={}),c=o.previous,l=c[s];a[s]=new Gu(l&&l.currentValue,t,c===bs),IS(n,e,r,t)}var Nm="__ngSimpleChanges__";function RS(n){return Object.hasOwn(n,Nm)&&n[Nm]||null}function vC(n,e){return n[Nm]=e}var K0=[];var yt=function(n,e=null,t){for(let i=0;i<K0.length;i++){let r=K0[i];r(n,e,t)}};function _C(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=mC()(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function NS(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function Bu(n,e,t){PS(n,e,3,t)}function Vu(n,e,t,i){(n[Fe]&3)===t&&PS(n,e,t,i)}function Cm(n,e){let t=n[Fe];(t&3)===e&&(t&=16383,t+=1,n[Fe]=t)}function PS(n,e,t,i){let r=i!==void 0?n[Ts]&65535:0,s=i??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[Ts]+=65536),(a<s||s==-1)&&(SC(n,t,e,c),n[Ts]=(n[Ts]&4294901760)+c+2),c++}function J0(n,e){yt(at.LifecycleHookStart,n,e);let t=Ge(null);try{e.call(n)}finally{Ge(t),yt(at.LifecycleHookEnd,n,e)}}function SC(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[Fe]>>14<n[Ts]>>16&&(n[Fe]&3)===e&&(n[Fe]+=16384,J0(a,s)):J0(a,s)}var wo=-1,cc=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function xC(n){return(n.flags&8)!==0}function EC(n){return(n.flags&16)!==0}function MC(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];wC(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function bC(n){return n===3||n===4||n===6}function wC(n){return n.charCodeAt(0)===64}function Qm(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?Q0(n,t,r,null,e[++i]):Q0(n,t,r,null,null))}}return n}function Q0(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){r!==null&&(n[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),r!==null&&n.splice(s++,0,r)}function OS(n){return n!==wo}function ju(n){return n&32767}function TC(n){return n>>16}function Wu(n,e){let t=TC(n),i=e;for(;t>0;)i=i[Dr],t--;return i}var Pm=!0;function eS(n){let e=Pm;return Pm=n,e}var CC=256,LS=CC-1,FS=5,DC=0,Ui={};function IC(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:Object.hasOwn(t,Es)&&(i=t[Es]),i==null&&(i=t[Es]=DC++);let r=i&LS,s=1<<r;e.data[n+(r>>FS)]|=s}function kS(n,e){let t=US(n,e);if(t!==-1)return t;let i=e[Be];i.firstCreatePass&&(n.injectorIndex=e.length,Dm(i.data,n),Dm(e,null),Dm(i.blueprint,null));let r=eg(n,e),s=n.injectorIndex;if(OS(r)){let o=ju(r),a=Wu(r,e),c=a[Be].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function Dm(n,e){n.push(0,0,0,0,0,0,0,0,e)}function US(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function eg(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=GS(r),i===null)return wo;if(t++,r=r[Dr],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return wo}function AC(n,e,t){IC(n,e,t)}function BS(n,e,t){if(t&8||n!==void 0)return n;Eu(e,"NodeInjector")}function VS(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[nr],s=Ln(void 0);try{return r?r.get(e,i,t&8):Kp(e,i,t&8)}finally{Ln(s)}}return BS(i,e,t)}function HS(n,e,t,i=0,r){if(n!==null){if(e[Fe]&2048&&!(i&2)){let o=OC(n,e,t,i,Ui);if(o!==Ui)return o}let s=zS(n,e,t,i,Ui);if(s!==Ui)return s}return VS(e,t,i,r)}function zS(n,e,t,i,r){let s=NC(t);if(typeof s=="function"){if(!ym(e,n,i))return i&1?BS(r,t,i):VS(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&8))Eu(t);else return o}finally{vm()}}else if(typeof s=="number"){let o=null,a=US(n,e),c=wo,l=i&1?e[kn][An]:null;for((a===-1||i&4)&&(c=a===-1?eg(n,e):e[a+8],c===wo||!nS(i,!1)?a=-1:(o=e[Be],a=ju(c),e=Wu(c,e)));a!==-1;){let u=e[Be];if(tS(s,a,u.data)){let d=RC(a,e,t,o,i,l);if(d!==Ui)return d}c=e[a+8],c!==wo&&nS(i,e[Be].data[a+8]===l)&&tS(s,a,e)?(o=u,a=ju(c),e=Wu(c,e)):a=-1}}return r}function RC(n,e,t,i,r,s){let o=e[Be],a=o.data[n+8],c=i==null?ir(a)&&Pm:i!=o&&(a.type&3)!==0,l=r&1&&s===a,u=Hu(a,o,t,c,l);return u!==null?$u(e,o,u,a,r):Ui}function Hu(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,c=n.directiveStart,l=n.directiveEnd,u=s>>20,d=i?a:a+u,f=r?a+u:l;for(let h=d;h<f;h++){let g=o[h];if(h<c&&t===g||h>=c&&g.type===t)return h}if(r){let h=o[c];if(h&&Is(h)&&h.type===t)return c}return null}function $u(n,e,t,i,r){let s=n[t],o=e.data;if(s instanceof cc){let a=s;if(a.resolving)throw Zp("");let c=eS(a.canSeeViewProviders);a.resolving=!0;let l=o[t].type||o[t],u,d=a.injectImpl?Ln(a.injectImpl):null,f=ym(n,i,0);try{s=n[t]=a.factory(void 0,r,o,n,i),e.firstCreatePass&&t>=i.directiveStart&&_C(t,o[t],e)}finally{d!==null&&Ln(d),eS(c),a.resolving=!1,vm()}}return s}function NC(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=Object.hasOwn(n,Es)?n[Es]:void 0;return typeof e=="number"?e>=0?e&LS:PC:e}function tS(n,e,t){let i=1<<n;return!!(t[e+(n>>FS)]&i)}function nS(n,e){return!(n&2)&&!(n&1&&e)}var or=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return HS(this._tNode,this._lView,e,vs(i),t)}};function PC(){return new or(ki(),It())}function OC(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[Fe]&2048&&!xo(o);){let a=zS(s,o,t,i|2,Ui);if(a!==Ui)return a;i&=-5;let c=s.parent;if(!c){let l=o[rm];if(l){let u=l.get(t,Ui,i);if(u!==Ui)return u}c=GS(o),o=o[Dr]}s=c}return r}function GS(n){let e=n[Be],t=e.type;return t===2?e.declTNode:t===1?n[An]:null}function At(n){return{token:n.token,providedIn:n.autoProvided===!1?null:"root",factory:n.factory,value:void 0}}function LC(){return Do(ki(),It())}function Do(n,e){return new Io(gi(n,e))}var Io=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=LC}return n})();function FC(n){return n instanceof Io?n.nativeElement:n}function kC(){return this._results[Symbol.iterator]()}var qu=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new Ft}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=u0(e);(this._changesDetected=!l0(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=kC};function jS(n){return(n.flags&128)===128}var tg=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(tg||{}),WS=new Map,UC=0;function BC(){return UC++}function VC(n){WS.set(n[Ya],n)}function Om(n){WS.delete(n[Ya])}var iS="__ngContext__";function To(n,e){Ar(e)?(n[iS]=e[Ya],VC(e)):n[iS]=e}function $S(n){return XS(n[_o])}function qS(n){return XS(n[Qn])}function XS(n){for(;n!==null&&!ei(n);)n=n[Qn];return n}var Lm;function ng(n){Lm=n}function YS(){if(Lm!==void 0)return Lm;if(typeof document<"u")return document;throw new Se(210,!1)}var ZS=!1,KS=new Ce("",{factory:()=>ZS});var rS=new WeakMap;function HC(n,e){if(n==null||typeof n!="object")return;let t=rS.get(n);t||(t=new WeakSet,rS.set(n,t)),t.add(e)}var zC=(n,e,t,i)=>{};function GC(n,e,t,i){zC(n,e,t,i)}function ig(n){return(n.flags&32)===32}var jC=()=>null;function JS(n,e,t=!1){return jC(n,e,t)}function QS(n,e){let t=n.contentQueries;if(t!==null){let i=Ge(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];Ru(s),a.contentQueries(2,e[o],o)}}}finally{Ge(i)}}}function Fm(n,e,t){Ru(0);let i=Ge(null);try{e(n,t)}finally{Ge(i)}}function ex(n,e,t){if(sm(e)){let i=Ge(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{Ge(i)}}}var Si=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(Si||{}),km=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}`}};function tx(n){return n instanceof km?n.changingThisBreaksApplicationSecurity:n}function WC(n,e){return n.createText(e)}function $C(n,e,t){n.setValue(e,t)}function nx(n,e,t){return n.createElement(e,t)}function Rs(n,e,t,i,r){n.insertBefore(e,t,i,r)}function ix(n,e,t){n.appendChild(e,t)}function sS(n,e,t,i,r){i!==null?Rs(n,e,t,i,r):ix(n,e,t)}function qC(n,e,t,i){n.removeChild(null,e,t,i)}function XC(n,e,t){n.setAttribute(e,"style",t)}function YC(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function rx(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&MC(n,e,i),r!==null&&YC(n,e,r),s!==null&&XC(n,e,s)}function ZC(n){return n instanceof Function?n():n}function KC(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}var sx="ng-template";function JC(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&KC(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(rg(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function rg(n){return n.type===4&&n.value!==sx}function QC(n,e,t){let i=n.type===4&&!t?sx:n.value;return e===i}function eD(n,e,t){let i=4,r=n.attrs,s=r!==null?iD(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!_i(i)&&!_i(c))return!1;if(o&&_i(c))continue;o=!1,i=c|i&1;continue}if(!o)if(i&4){if(i=2|i&1,c!==""&&!QC(n,c,t)||c===""&&e.length===1){if(_i(i))return!1;o=!0}}else if(i&8){if(r===null||!JC(n,r,c,t)){if(_i(i))return!1;o=!0}}else{let l=e[++a],u=tD(c,r,rg(n),t);if(u===-1){if(_i(i))return!1;o=!0;continue}if(l!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(_i(i))return!1;o=!0}}}}return _i(i)||o}function _i(n){return(n&1)===0}function tD(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return rD(e,n)}function nD(n,e,t=!1){for(let i=0;i<e.length;i++)if(eD(n,e[i],t))return!0;return!1}function iD(n){for(let e=0;e<n.length;e++){let t=n[e];if(bC(t))return e}return n.length}function rD(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function oS(n,e){return n?":not("+e.trim()+")":e}function sD(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!_i(o)&&(e+=oS(s,r),r=""),i=o,s=s||!_i(i);t++}return r!==""&&(e+=oS(s,r)),e}function oD(n){return n.map(sD).join(",")}function aD(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!_i(r))break;r=s}i++}return t.length&&e.push(1,...t),e}var Ao={},Pr=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(Pr||{}),cD;function sg(n,e){return cD(n,e)}var og=new Set;var GG=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Um=new WeakMap;function ox(n){return n?n[Dr]??n:null}var Mo=new WeakSet;function lD(n,e,t){let i=Um.get(n);if(!i||i.length===0)return;let r=e.parentNode,s=e.previousSibling,o=ox(t);for(let a=i.length-1;a>=0;a--){let{el:c,declarationView:l}=i[a],u=c.parentNode;c===e?(i.splice(a,1),Mo.add(c),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):s&&c===s?(i.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),c.parentNode?.removeChild(c)):u&&r&&u!==r&&(o===null||l===null||o===l)&&(i.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),c.parentNode?.removeChild(c))}}function uD(n,e,t){let i=ox(t),r=Um.get(n);r?r.some(s=>s.el===e)||r.push({el:e,declarationView:i}):Um.set(n,[{el:e,declarationView:i}])}var ag=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(ag||{}),Or=new Ce(""),aS=new Set;function cg(n){aS.has(n)||(aS.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var ax=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=Qe({token:n,providedIn:"root",factory:()=>new n})}return n})();var Bm=null;function cS(n,e,t,i){Bm?.maybeQueueEnterAnimation(n,e,t,i)}function lS(n,e,t,i){Bm===null?i(!1):Bm.runLeaveAnimationsWithCallback(n,e,t,i)}function bo(n,e,t,i,r,s,o,a){if(r!=null){let c,l=!1;ei(r)?c=r:Ar(r)&&(l=!0,r=r[mi]);let u=an(r);n===0&&i!==null?(cS(a,i,s,t),o==null?ix(e,i,u):Rs(e,i,u,o||null,!0)):n===1&&i!==null?(Rs(e,i,u,o||null,!0),lD(s,u,a),Mo.has(u)||cS(a,i,s,t)):n===2?(a?.[g0]?.leave?.has(s.index)&&uD(s,u,a),Mo.delete(u),lS(a,s,t,d=>{if(Mo.has(u)){Mo.delete(u);return}qC(e,u,l,d)})):n===3&&(Mo.delete(u),lS(a,s,t,()=>{e.destroyNode(u)})),c!=null&&MD(e,n,t,c,s,i,o)}}function dD(n,e){cx(n,e),e[mi]=null,e[An]=null}function fD(n,e,t,i,r,s){i[mi]=r,i[An]=e,Qu(n,i,t,1,r,s)}function cx(n,e){e[Oi].changeDetectionScheduler?.notify(9),Qu(n,e,e[Kt],2,null,null)}function hD(n){let e=n[_o];if(!e)return Im(n[Be],n);for(;e;){let t=null;if(Ar(e))t=e[_o];else{let i=e[vn];i&&(t=i)}if(!t){for(;e&&!e[Qn]&&e!==n;)Ar(e)&&Im(e[Be],e),e=e[Bt];e===null&&(e=n),Ar(e)&&Im(e[Be],e),t=e&&e[Qn]}e=t}}function lg(n,e){let t=n[Ds],i=t.indexOf(e);t.splice(i,1)}function lx(n,e){if(As(e))return;let t=e[Kt];t.destroyNode&&Qu(n,e,t,3,null,null),hD(e)}function Im(n,e){if(As(e))return;let t=Ge(null);try{e[Fe]&=-129,e[Fe]|=256,e[Un]&&Pa(e[Un]),mD(n,e),pD(n,e),e[Be].type===1&&e[Kt].destroy();let i=e[Ir];if(i!==null&&ei(e[Bt])){i!==e[Bt]&&lg(i,e);let r=e[Li];r!==null&&r.detachView(n)}Om(e)}finally{Ge(t)}}function pD(n,e){let t=n.cleanup,i=e[vo];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?i[a]():i[-a].unsubscribe(),o+=2}else{let a=i[t[o+1]];t[o].call(a)}i!==null&&(e[vo]=null);let r=e[Qi];if(r!==null){e[Qi]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[So];if(s!==null){e[So]=null;for(let o of s)o.destroy()}}function mD(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof cc)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];yt(at.LifecycleHookStart,a,c);try{c.call(a)}finally{yt(at.LifecycleHookEnd,a,c)}}else{yt(at.LifecycleHookStart,r,s);try{s.call(r)}finally{yt(at.LifecycleHookEnd,r,s)}}}}}function gD(n,e,t){if(e===null)throw new Se(510,!1);return yD(n,e.parent,t)}function yD(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[mi];if(ir(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===Si.None||r===Si.Emulated)return null}return gi(i,t)}function vD(n,e,t){return SD(n,e,t)}function _D(n,e,t){return n.type&40?gi(n,t):null}var SD=_D,uS;function ug(n,e,t,i){let r=gD(n,i,e),s=e[Kt],o=i.parent||e[An],a=vD(o,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)sS(s,r,t[c],a,!1);else sS(s,r,t,a,!1);uS!==void 0&&uS(s,i,e,t,r)}function oc(n,e){if(e!==null){let t=e.type;if(t&3)return gi(e,n);if(t&4)return Vm(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return oc(n,i);{let r=n[e.index];return ei(r)?Vm(-1,r):an(r)}}else{if(t&128)return oc(n,e.next);if(t&32)return sg(e,n)()||an(n[e.index]);{let i=ux(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=er(n[kn]);return oc(r,i)}else return oc(n,e.next)}}}return null}function ux(n,e){if(e!==null){let i=n[kn][An],r=e.projection;return i.projection[r]}return null}function Vm(n,e){let t=vn+n+1;if(t<e.length){let i=e[t],r=i[Be].firstChild;if(r!==null)return oc(i,r)}return e[Cs]}function dg(n,e,t,i,r,s,o){for(;t!=null;){let a=i[nr];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(o&&e===0&&(c&&To(an(c),i),t.flags|=2),!ig(t))if(l&8)dg(n,e,t.child,i,r,s,!1),bo(e,n,a,r,c,t,s,i);else if(l&32){let u=sg(t,i),d;for(;d=u();)bo(e,n,a,r,d,t,s,i);bo(e,n,a,r,c,t,s,i)}else l&16?ED(n,e,i,t,r,s):bo(e,n,a,r,c,t,s,i);t=o?t.projectionNext:t.next}}function Qu(n,e,t,i,r,s){n.type===3?xD(t,i,e,r,s):dg(t,i,n.firstChild,e,r,s,!1)}function xD(n,e,t,i,r){let o=t[Be].firstChild,a=o.next,c=an(t[o.index]),l=an(t[a.index]),u=a.index+1,d=t[u];if(e===1||e===0)i!==null&&(d&&d.hasChildNodes()?Rs(n,i,d,r,!0):(Rs(n,i,c,r,!0),Rs(n,i,l,r,!0)));else if(e===2){if(d||(d=document.createDocumentFragment(),t[u]=d),c&&c.parentNode===d)return;let f=c;for(;f!==null;){let h=f.nextSibling;if(d.appendChild(f),f===l)break;f=h}}}function ED(n,e,t,i,r,s){let o=t[kn],c=o[An].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];bo(e,n,t[nr],r,u,i,s,t)}else{let l=c,u=o[Bt];jS(i)&&(l.flags|=128),dg(n,e,l,u,r,s,!0)}}function MD(n,e,t,i,r,s,o){let a=i[Cs],c=an(i);if(a!==c&&bo(e,n,t,s,a,r,o),(i[Fe]&4)===0)for(let l=vn;l<i.length;l++){let u=i[l];Qu(u[Be],u,n,e,s,a)}}function fg(n,e,t,i,r,s,o,a,c,l,u){let d=Bn+i,f=d+r,h=bD(d,f),g=typeof l=="function"?l():l;return h[Be]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function bD(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:Ao);return t}function wD(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=fg(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function hg(n,e,t,i,r,s,o,a,c,l,u){let d=e.blueprint.slice();return d[mi]=r,d[Fe]=i|4|128|8|64|1024,(l!==null||n&&n[Fe]&2048)&&(d[Fe]|=2048),am(d),d[Bt]=d[Dr]=n,d[fn]=t,d[Oi]=o||n&&n[Oi],d[Kt]=a||n&&n[Kt],d[nr]=c||n&&n[nr]||null,d[An]=s,d[Ya]=BC(),d[Xa]=u,d[rm]=l,d[kn]=e.type==2?n[kn]:d,d}function TD(n,e,t){let i=gi(e,n),r=wD(t),s=n[Oi].rendererFactory,o=pg(n,hg(n,r,null,dx(t),i,e,null,s.createRenderer(i,t),null,null,null));return n[e.index]=o}function dx(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function fx(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function pg(n,e){return n[_o]?n[im][Qn]=e:n[_o]=e,n[im]=e,e}function Ls(n=1){hx(Fi(),It(),Ou()+n,!1)}function hx(n,e,t,i){if(!i)if((e[Fe]&3)===3){let s=n.preOrderCheckHooks;s!==null&&Bu(e,s,t)}else{let s=n.preOrderHooks;s!==null&&Vu(e,s,0,t)}Rr(t)}var ed=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(ed||{});function Hm(n,e,t,i){let r=Ge(null);try{let[s,o,a]=n.inputs[t],c=null;(o&ed.SignalBased)!==0&&(c=e[s][Pn]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,s):IS(e,c,s,i)}finally{Ge(r)}}function px(n,e,t,i,r){let s=Ou(),o=i&2;try{Rr(-1),o&&e.length>Bn&&hx(n,e,Bn,!1);let a=o?at.TemplateUpdateStart:at.TemplateCreateStart;yt(a,r,t),t(i,r)}finally{Rr(s);let a=o?at.TemplateUpdateEnd:at.TemplateCreateEnd;yt(a,r,t)}}function mg(n,e,t){OD(n,e,t),(t.flags&64)===64&&LD(n,e,t)}function mx(n,e,t=gi){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function CD(n,e,t,i){let s=i.get(KS,ZS)||t===Si.ShadowDom||t===Si.ExperimentalIsolatedShadowDom,o=n.selectRootElement(e,s);return DD(o),o}function DD(n){ID(n)}var ID=()=>null;function AD(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function RD(n,e,t,i,r,s){let o=e[Be];if(gg(n,o,e,t,i)){ir(n)&&PD(e,n.index);return}n.type&3&&(t=AD(t)),ND(n,e,t,i,r,s)}function ND(n,e,t,i,r,s){if(n.type&3){let o=gi(n,e);i=s!=null?s(i,n.value||"",t):i,i=gx(t,o,i),r.setProperty(o,t,i)}else n.type&12}function gx(n,e,t){return n==="src"&&(e.tagName==="IMG"||e.tagName==="VIDEO")?t==null?"":tx(t):t}function PD(n,e){let t=yi(e,n);t[Fe]&16||(t[Fe]|=64)}function OD(n,e,t){let i=t.directiveStart,r=t.directiveEnd;ir(t)&&TD(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||kS(t,e);let s=t.initialInputs;for(let o=i;o<r;o++){let a=n.data[o],c=$u(e,n,o,t);if(To(c,e),s!==null&&BD(e,o-i,c,a,t,s),Is(a)){let l=yi(t.index,e);l[fn]=$u(e,n,o,t)}}}function LD(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=k0();try{Rr(s);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];Au(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&FD(c,l)}}finally{Rr(-1),Au(o)}}function FD(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function yx(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];nD(e,s.selectors,!1)&&(i??=[],Is(s)?i.unshift(s):i.push(s))}return i}function kD(n,e,t,i,r,s){let o=gi(n,e);i=gx(t,o,i),UD(e[Kt],o,s,n.value,t,i,r)}function UD(n,e,t,i,r,s,o){if(s==null)o?.(s,i||"",r),n.removeAttribute(e,r,t);else{let a=o==null?Yp(s):o(s,i||"",r);n.setAttribute(e,r,a,t)}}function BD(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let c=o[a],l=o[a+1];Hm(i,t,c,l)}}function VD(n,e,t,i,r){let s=Bn+t,o=e[Be],a=r(o,e,n,i,t);e[s]=a,Eo(n,!0);let c=n.type===2;return c?(rx(e[Kt],a,n),(T0()===0||Ja(n))&&To(a,e),C0()):To(a,e),Lu()&&(!c||!ig(n))&&ug(o,e,a,n),n}function HD(n){let e=n;return hm()?P0():(e=e.parent,Eo(e,!1)),e}function zD(n,e){let t=n[nr];if(!t)return;let i;try{i=t.get(vi,null)}catch{i=null}i?.(e)}function gg(n,e,t,i,r){let s=n.inputs?.[i],o=n.hostDirectiveInputs?.[i],a=!1;if(o)for(let c=0;c<o.length;c+=2){let l=o[c],u=o[c+1],d=e.data[l];Hm(d,t[l],u,r),a=!0}if(s)for(let c of s){let l=t[c],u=e.data[c];Hm(u,l,i,r),a=!0}return a}function GD(n,e){let t=yi(e,n),i=t[Be];jD(i,t);let r=t[mi];r!==null&&t[Xa]===null&&(t[Xa]=JS(r,t[nr])),yt(at.ComponentStart);try{yg(i,t,t[fn])}finally{yt(at.ComponentEnd,t[fn])}}function jD(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function yg(n,e,t){Nu(e);try{let i=n.viewQuery;i!==null&&Fm(1,i,t);let r=n.template;r!==null&&px(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[Li]?.finishViewCreation(n),n.staticContentQueries&&QS(n,e),n.staticViewQueries&&Fm(2,n.viewQuery,t);let s=n.components;s!==null&&WD(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[Fe]&=-5,Pu()}}function WD(n,e){for(let t=0;t<e.length;t++)GD(n,e[t])}function $D(n,e,t,i){let r=Ge(null);try{let s=e.tView,a=n[Fe]&4096?4096:16,c=hg(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[Ir]=l;let u=n[Li];return u!==null&&(c[Li]=u.createEmbeddedView(s)),yg(s,c,t),c}finally{Ge(r)}}function dS(n,e){return!e||e.firstChild===null||jS(n)}function lc(n,e,t,i,r=!1){if(n.type===3){let s=n.firstChild,o=s.next,a=an(e[s.index]),c=an(e[o.index]),l=a;for(;l!==null&&(i.push(l),l!==c);)l=l.nextSibling;return i}for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];if(s!==null)if(ei(s)){let a=s[Cs];a!==s[mi]&&i.push(an(s)),s[Fe]&4||vx(s,i),i.push(a)}else i.push(an(s));let o=t.type;if(o&8)lc(n,e,t.child,i);else if(o&32){let a=sg(t,e),c;for(;c=a();)i.push(c)}else if(o&16){let a=ux(e,t);if(Array.isArray(a))i.push(...a);else{let c=er(e[kn]);lc(c[Be],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function vx(n,e){for(let t=vn;t<n.length;t++){let i=n[t],r=i[Be].firstChild;r!==null&&lc(i[Be],i,r,e)}}function _x(n){if(n[wu]!==null){for(let e of n[wu])e.impl.addSequence(e);n[wu].length=0}}var Sx=[];function qD(n){return n[Un]??XD(n)}function XD(n){let e=Sx.pop()??Object.create(ZD);return e.lView=n,e}function YD(n){n.lView[Un]!==n&&(n.lView=null,Sx.push(n))}var ZD=mt(he({},Ra),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{tc(n.lView)},consumerOnSignalRead(){this.lView[Un]=this}});function KD(n){let e=n[Un]??Object.create(JD);return e.lView=n,e}var JD=mt(he({},Ra),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=er(n.lView);for(;e&&!xx(e[Be]);)e=er(e);e&&cm(e)},consumerOnSignalRead(){this.lView[Un]=this}});function xx(n){return n.type!==2}function Ex(n){if(n[So]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[So])if(i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()),n[So]===null))return;e=t&&!!(n[Fe]&8192)}}var QD=100;function Mx(n,e=0){let i=n[Oi].rendererFactory,r=!1;r||i.begin?.();try{eI(n,e)}finally{r||i.end?.()}}function eI(n,e){let t=pm();try{mm(!0),zm(n,e);let i=0;for(;ec(n);){if(i===QD)throw new Se(103,!1);i++,zm(n,1)}}finally{mm(t)}}function tI(n,e,t,i){if(As(e))return;let r=e[Fe],s=!1,o=!1;Nu(e);let a=!0,c=null,l=null;s||(xx(n)?(l=qD(e),c=Na(l)):Hl()===null?(a=!1,l=KD(e),c=Na(l)):e[Un]&&(Pa(e[Un]),e[Un]=null));try{am(e),O0(n.bindingStartIndex),t!==null&&px(n,e,t,2,i);let u=(r&3)===3;if(!s)if(u){let h=n.preOrderCheckHooks;h!==null&&Bu(e,h,null)}else{let h=n.preOrderHooks;h!==null&&Vu(e,h,0,null),Cm(e,0)}if(o||nI(e),Ex(e),wx(e,0),n.contentQueries!==null&&QS(n,e),!s)if(u){let h=n.contentCheckHooks;h!==null&&Bu(e,h)}else{let h=n.contentHooks;h!==null&&Vu(e,h,1),Cm(e,1)}rI(n,e);let d=n.components;d!==null&&Cx(e,d,0);let f=n.viewQuery;if(f!==null&&Fm(2,f,i),!s)if(u){let h=n.viewCheckHooks;h!==null&&Bu(e,h)}else{let h=n.viewHooks;h!==null&&Vu(e,h,2),Cm(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[bu]){for(let h of e[bu])h();e[bu]=null}s||(_x(e),e[Fe]&=-73)}catch(u){bx(e,u,s)}finally{l!==null&&(Gl(l,c),a&&YD(l)),Pu()}}function bx(n,e,t){let i=!1,r=e,s=n,o=Ge(null);try{for(;s!==null;){if(ei(s)){s=s[Bt];continue}let a=s[Za];if(a)try{let c=n[kn][fn],l=c?.constructor,u={declarationInstance:c,declarationType:l,caughtBy:a},d=Ge(null);try{a(q0(r),u)}finally{Ge(d)}i=!0;break}catch(c){r=c}s=s[Bt]}}finally{Ge(o)}if(!i)throw t||tc(n),r}function wx(n,e){for(let t=$S(n);t!==null;t=qS(t))for(let i=vn;i<t.length;i++){let r=t[i];Tx(r,e)}}function nI(n){for(let e=$S(n);e!==null;e=qS(e)){if(!(e[Fe]&2))continue;let t=e[Ds];for(let i=0;i<t.length;i++){let r=t[i];cm(r)}}}function iI(n,e,t){yt(at.ComponentStart);let i=yi(e,n);try{Tx(i,t)}finally{yt(at.ComponentEnd,i[fn])}}function Tx(n,e){Tu(n)&&zm(n,e)}function zm(n,e){let i=n[Be],r=n[Fe],s=n[Un],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&jl(s)),o||=!1,s&&(s.dirty=!1),n[Fe]&=-9217,o)tI(i,n,i.template,n[fn]);else if(r&8192){let a=Ge(null);try{try{Ex(n)}catch(l){bx(n,l,!1)}wx(n,1);let c=i.components;c!==null&&Cx(n,c,1),_x(n)}finally{Ge(a)}}}function Cx(n,e,t){for(let i=0;i<e.length;i++)iI(n,e[i],t)}function rI(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)Rr(~r);else{let s=r,o=t[++i],a=t[++i];F0(o,s);let c=e[s];yt(at.HostBindingsUpdateStart,c);try{a(2,c)}finally{yt(at.HostBindingsUpdateEnd,c)}}}}finally{Rr(-1)}}function vg(n,e){let t=pm()?64:1088;for(n[Oi].changeDetectionScheduler?.notify(e);n;){n[Fe]|=t;let i=er(n);if(xo(n)&&!i)return n;n=i}return null}function Dx(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function sI(n,e,t,i=!0){let r=e[Be];if(oI(r,e,n,t),i){let o=Vm(t,n),a=e[Kt],c=a.parentNode(n[Cs]);c!==null&&fD(r,n[An],a,e,c,o)}let s=e[Xa];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function Gm(n,e){if(n.length<=vn)return;let t=vn+e,i=n[t];if(i){let r=i[Ir];r!==null&&r!==n&&lg(r,i),e>0&&(n[t-1][Qn]=i[Qn]);let s=ja(n,vn+e);dD(i[Be],i);let o=s[Li];o!==null&&o.detachView(s[Be]),i[Bt]=null,i[Qn]=null,i[Fe]&=-129}return i}function oI(n,e,t,i){let r=vn+i,s=t.length;i>0&&(t[r-1][Qn]=e),i<s-vn?(e[Qn]=t[r],Jp(t,vn+i,e)):(t.push(e),e[Qn]=null),e[Bt]=t;let o=e[Ir];o!==null&&t!==o&&Ix(o,e);let a=e[Li];a!==null&&a.insertView(n),Cu(e),e[Fe]|=128}function Ix(n,e){let t=n[Ds],i=e[Bt];if(Ar(i))n[Fe]|=2;else{let r=i[Bt][kn];e[kn]!==r&&(n[Fe]|=2)}t===null?n[Ds]=[e]:t.push(e)}var Nr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[Be];return lc(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[fn]}set context(e){this._lView[fn]=e}get destroyed(){return As(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[Bt];if(ei(e)){let t=e[Ka],i=t?t.indexOf(this):-1;i>-1&&(Gm(e,i),ja(t,i))}this._attachedToViewContainer=!1}lx(this._lView[Be],this._lView)}onDestroy(e){Du(this._lView,e)}markForCheck(){vg(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[Fe]&=-129}reattach(){Cu(this._lView),this._lView[Fe]|=128}detectChanges(){this._lView[Fe]|=1024,Mx(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new Se(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=xo(this._lView),t=this._lView[Ir];t!==null&&!e&&lg(t,this._lView),cx(this._lView[Be],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new Se(902,!1);this._appRef=e;let t=xo(this._lView),i=this._lView[Ir];i!==null&&!t&&Ix(i,this._lView),Cu(this._lView)}};var Ns=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=aI;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let s=$D(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new Nr(s)}}return n})();function aI(){return _g(ki(),It())}function _g(n,e){return n.type&4?new Ns(e,n,Do(n,e)):null}function Sg(n,e,t,i,r){let s=n.data[e];if(s===null)s=cI(n,e,t,i,r),L0()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=N0();s.injectorIndex=o===null?-1:o.injectorIndex}return Eo(s,!0),s}function cI(n,e,t,i,r){let s=fm(),o=hm(),a=o?s:s&&s.parent,c=n.data[e]=uI(n,a,t,e,i,r);return lI(n,c,s,o),c}function lI(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function uI(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return I0()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,namespace:Sm(),attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var dI=()=>null;function fS(n,e){return dI(n,e)}var Ax=class{},Ps=class{};var Rx=(()=>{class n{static \u0275prov=Qe({token:n,providedIn:"root",factory:()=>null})}return n})();function Nx(n){return n.debugInfo?.className||n.type.name||null}var zu={},Xu=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,zu,i);return r!==zu||t===zu?r:this.parentInjector.get(e,t,i)}};function xg(n,e,t){if(t===Ao)return!1;let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function Am(n,e,t){return function i(r){let s=i.__ngNativeEl__;s!==void 0&&HC(r,s);let o=ir(n)?yi(n.index,e):e;vg(o,5);let a=e[fn],c=hS(e,a,t,r),l=i.__ngNextListenerFn__;for(;l;)c=hS(e,a,l,r)&&c,l=l.__ngNextListenerFn__;return c}}function hS(n,e,t,i){let r=Ge(null);try{return yt(at.OutputStart,e,t),t(i)!==!1}catch(s){return zD(n,s),!1}finally{yt(at.OutputEnd,e,t),Ge(r)}}function fI(n,e,t,i,r,s,o,a){let c=Ja(n),l=!1,u=null;if(!i&&c&&(u=pI(e,t,s,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,l=!0}else{let d=gi(n,t),f=i?i(d):d;GC(t,f,s,a),i||(a.__ngNativeEl__=d);let h=r.listen(f,s,a);if(!hI(s)){let g=i?S=>i(an(S[n.index])):n.index;Px(g,e,t,s,a,h,!1)}}return l}function hI(n){return n.startsWith("animation")||n.startsWith("transition")}function pI(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[vo],c=r[s+2];return a&&a.length>c?a[c]:null}typeof o=="string"&&(s+=2)}return null}function Px(n,e,t,i,r,s,o){let a=e.firstCreatePass?um(e):null,c=lm(t),l=c.length;c.push(r,s),a&&a.push(i,n,l,(l+1)*(o?-1:1))}function pS(n,e,t,i,r,s){let o=e[t],a=e[Be],l=a.data[t].outputs[i],d=o[l].subscribe(s);Px(n.index,a,e,r,s,d,!0)}var jm=Symbol("BINDING");var Fs=new Ce("");function mS(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=zp(r,a);else if(s==2){let c=a,l=e[++o];i=zp(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function ks(n,e=0){let t=It();if(t===null)return Pe(n,e);let i=ki();return HS(i,t,Fn(n),e)}function Ox(n,e,t,i,r){let s=i===null?null:{"":-1},o=r(n,t);if(o!==null){let a=o,c=null,l=null;for(let u of o)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(o);break}yI(n,e,t,a,s,c,l)}s!==null&&i!==null&&mI(t,i,s)}function mI(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new Se(-301,!1);i.push(e[r],s)}}function gI(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function yI(n,e,t,i,r,s,o){let a=i.length,c=null;for(let f=0;f<a;f++){let h=i[f];c===null&&Is(h)&&(c=h,gI(n,t,f)),AC(kS(t,e),n,h.type)}MI(t,n.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let f=0;f<a;f++){let h=i[f];h.providersResolver&&h.providersResolver(h)}let l=!1,u=!1,d=fx(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let h=i[f];if(t.mergedAttrs=Qm(t.mergedAttrs,h.hostAttrs),_I(n,t,e,d,h),EI(d,h,r),o!==null&&o.has(h)){let[S,p]=o.get(h);t.directiveToIndex.set(h.type,[d,S+t.directiveStart,p+t.directiveStart])}else(s===null||!s.has(h))&&t.directiveToIndex.set(h.type,d);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let g=h.type.prototype;!l&&(g.ngOnChanges||g.ngOnInit||g.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(g.ngOnChanges||g.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}vI(n,t,s)}function vI(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))gS(0,e,r,i),gS(1,e,r,i),vS(e,i,!1);else{let s=t.get(r);yS(0,e,s,i),yS(1,e,s,i),vS(e,i,!0)}}}function gS(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(Object.hasOwn(r,s)){let o;n===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(i),Lx(e,s)}}function yS(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(Object.hasOwn(r,s)){let o=r[s],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(i,s),Lx(e,o)}}function Lx(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function vS(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:s}=n;if(i===null||!t&&r===null||t&&s===null||rg(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let o=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&Object.hasOwn(r,c)){let l=r[c];for(let u of l)if(u===e){o??=[],o.push(c,i[a+1]);break}}else if(t&&Object.hasOwn(s,c)){let l=s[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){o??=[],o.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(o)}function _I(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=mo(r.type,!0)),o=new cc(s,Is(r),ks,null);n.blueprint[i]=o,t[i]=o,SI(n,e,i,fx(n,t,r.hostVars,Ao),r)}function SI(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;xI(o)!=a&&o.push(a),o.push(t,i,s)}}function xI(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function EI(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;Is(e)&&(t[""]=n)}}function MI(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function Fx(n,e,t,i,r,s,o,a){let c=e[Be],l=c.consts,u=Qa(l,o),d=Sg(c,n,t,i,u);return s&&Ox(c,e,d,Qa(l,a),r),d.mergedAttrs=Qm(d.mergedAttrs,d.attrs),d.attrs!==null&&mS(d,d.attrs,!1),d.mergedAttrs!==null&&mS(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function kx(n,e){NS(n,e),sm(e)&&n.queries.elementEnd(e)}var Ux=typeof ShadowRoot<"u",bI=typeof Document<"u";function wI(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],s={propName:t,templateName:e,isSignal:(i&ed.SignalBased)!==0};return r&&(s.transform=r),s})}function TI(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function CI(n,e,t){let i=e instanceof Rt?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new Xu(t,i):t}function DI(n){let e=n.get(Ps,null);if(e===null)throw new Se(407,!1);let t=n.get(Rx,null),i=n.get(Ss,null),r=n.get(Or,null,{optional:!0});return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function II(n,e,t){let i=Bx(n);return nx(e,i,i==="svg"?v0:i==="math"?_0:t)}function AI(n){if((n&&"localName"in n&&typeof n.localName=="string"?n.localName:n?.tagName)?.toLowerCase()==="script")throw new Se(905,!1)}function Bx(n){return(n.selectors[0][0]||"div").toLowerCase()}var uc=class{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=wI(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=TI(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=oD(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,s,o,a,c){yt(at.DynamicComponentStart);let l=Ge(null);try{let u=this.componentDef,d=CI(u,r||this.ngModule,e),f=DI(d),h=f.tracingService;return h&&h.componentCreate?h.componentCreate(Nx(u),()=>this.createComponentRef(f,d,t,i,s,o,a,c)):this.createComponentRef(f,d,t,i,s,o,a,c)}finally{Ge(l)}}createComponentRef(e,t,i,r,s,o,a,c){let l=this.componentDef,u=RI(r,l,o,s,c),d=e.rendererFactory.createRenderer(null,l),f=r?CD(d,r,l.encapsulation,t):II(l,d,a??null);AI(f);let h=t.get(Fs,null),g=NI(f,()=>t.get(Nt,null)??YS());h&&h.addHost(g);let S=o?.some(_S)||s?.some(x=>typeof x!="function"&&x.bindings.some(_S)),p=hg(null,u,null,512|dx(l),null,null,e,d,t,null,JS(f,t,!0));h&&Ux&&g instanceof ShadowRoot&&Du(p,()=>{h.removeHost(g)}),p[Bn]=f,Nu(p);let m=null;try{let x=Fx(Bn,p,2,"#host",()=>u.directiveRegistry,!0,0);rx(d,f,x),To(f,p),mg(u,p,x),ex(u,x,p),kx(u,x),i!==void 0&&OI(x,this.ngContentSelectors,i),m=yi(x.index,p),p[fn]=m[fn],yg(u,p,null)}catch(x){throw m!==null&&Om(m),Om(p),x}finally{yt(at.DynamicComponentEnd),Pu()}return new Yu(this.componentType,p,!!S)}};function RI(n,e,t,i,r){let s=n?["ng-version","22.2.4"]:aD(e.selectors[0]),o=null,a=null,c=0;if(t)for(let d of t)c+=d[jm].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(a??=[]).push(d));if(i)for(let d=0;d<i.length;d++){let f=i[d];if(typeof f!="function")for(let h of f.bindings){c+=h[jm].requiredVars;let g=d+1;h.create&&(h.targetIdx=g,(o??=[]).push(h)),h.update&&(h.targetIdx=g,(a??=[]).push(h))}}let l=[e];if(i)for(let d of i){let f=typeof d=="function"?d:d.type,h=Su(f);l.push(h)}return fg(0,null,PI(o,a),1,c,l,null,null,null,[s],null)}function NI(n,e){let t=n.getRootNode?.();return bI&&t instanceof Document?t.head:t&&Ux&&t instanceof ShadowRoot?t:e().head}function PI(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function _S(n){let e=n[jm].kind;return e==="input"||e==="twoWay"}var Yu=class extends Ax{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=om(t[Be],Bn),this.location=Do(this._tNode,t),this.instance=yi(this._tNode.index,t)[fn],this.hostView=this.changeDetectorRef=new Nr(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=gg(i,r[Be],r,e,t);this.previousInputValues.set(e,t);let o=yi(i.index,r);vg(o,1)}get injector(){return new or(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function OI(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null&&s.length?Array.from(s):null)}}var Lr=(()=>{class n{static __NG_ELEMENT_ID__=LI}return n})();function LI(){let n=ki();return Vx(n,It())}var Wm=class n extends Lr{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return Do(this._hostTNode,this._hostLView)}get injector(){return new or(this._hostTNode,this._hostLView)}get parentInjector(){let e=eg(this._hostTNode,this._hostLView);if(OS(e)){let t=Wu(e,this._hostLView),i=ju(e),r=t[Be].data[i+8];return new or(r,t)}else return new or(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=SS(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-vn}createEmbeddedView(e,t,i){let r,s,o;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector,o=i.onError);let a=fS(this._lContainer,e.ssrId),c=e.createEmbeddedViewImpl(t||{},s,a);return o&&(c._lView[Za]=o),this.insertImpl(c,r,dS(this._hostTNode,a)),c}createComponent(e,t,i,r,s,o,a){let c,l,u=t||{};c=u.index,i=u.injector,r=u.projectableNodes,s=u.environmentInjector||u.ngModuleRef,o=u.directives,a=u.bindings,l=u.onError;let d=new uc(Ms(e)),f=i||this.parentInjector;if(!s&&d.ngModule==null){let x=this.parentInjector.get(Rt,null);x&&(s=x)}let h=Ms(d.componentType??{}),g=fS(this._lContainer,h?.id??null),S=g?.firstChild??null,p=d.create(f,r,S,s,o,a,this._getHostElementNamespace());return l&&(p.hostView._lView[Za]=l),this.insertImpl(p.hostView,c,dS(this._hostTNode,g)),p}_getHostElementNamespace(){if(this._hostTNode.type&2){let e=this._hostTNode.parent??this._hostLView[An];return e!==null&&e.type&2&&typeof e.value=="string"&&e.value.toLowerCase()==="foreignobject"?null:e?.namespace??null}return this._hostTNode.namespace}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(E0(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[Bt],l=new n(c,c[An],c[Bt]);l.detach(l.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return sI(o,r,s,i),e.attachToViewContainerRef(),Jp(Rm(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=SS(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=Gm(this._lContainer,t);i&&(ja(Rm(this._lContainer),t),lx(i[Be],i))}detach(e){let t=this._adjustIndex(e,-1),i=Gm(this._lContainer,t);return i&&ja(Rm(this._lContainer),t)!=null?new Nr(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function SS(n){return n[Ka]}function Rm(n){return n[Ka]||(n[Ka]=[])}function Vx(n,e){let t,i=e[n.index];return ei(i)?t=i:(t=Dx(i,e,null,n),e[n.index]=t,pg(e,t)),kI(t,e,n,i),new Wm(t,n,e)}function FI(n,e){let t=n[Kt],i=t.createComment(""),r=gi(e,n),s=t.parentNode(r);return Rs(t,s,i,t.nextSibling(r),!1),i}var kI=VI,UI=()=>!1;function BI(n,e,t){return UI(n,e,t)}function VI(n,e,t,i){if(n[Cs])return;let r;t.type&8?r=an(i):r=FI(e,t),n[Cs]=r}var $m=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},qm=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)Eg(e,t).matches!==null&&this.queries[t].setDirty()}},Xm=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=XI(e):this.predicate=e}},Ym=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},Zm=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,HI(t,s)),this.matchTNodeWithReadOption(e,t,Hu(t,e,s,!1,!1))}else i===Ns?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,Hu(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===Io||r===Lr||r===Jn||r===Ns&&t.type&4)this.addMatch(t.index,-2);else{let s=Hu(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function HI(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function zI(n,e){return n.type&11?Do(n,e):n.type&4?_g(n,e):null}function GI(n,e,t,i){return t===-1?zI(e,n):t===-2?jI(n,e,i):$u(n,n[Be],t,e)}function jI(n,e,t){if(t===Io)return Do(e,n);if(t===Ns)return _g(e,n);if(t===Lr)return Vx(e,n);if(t===Jn)return new or(e,n)}function Hx(n,e,t,i){let r=e[Li].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let c=0;o!==null&&c<o.length;c+=2){let l=o[c];if(l<0)a.push(null);else{let u=s[l];a.push(GI(e,u,o[c+1],t.metadata.read))}}r.matches=a}return r.matches}function Km(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=Hx(n,e,r,t);for(let a=0;a<s.length;a+=2){let c=s[a];if(c>0)i.push(o[a/2]);else{let l=s[a+1],u=e[-c];for(let d=vn;d<u.length;d++){let f=u[d];f[Ir]===f[Bt]&&Km(f[Be],f,l,i)}if(u[Ds]!==null){let d=u[Ds];for(let f=0;f<d.length;f++){let h=d[f];Km(h[Be],h,l,i)}}}}}return i}function WI(n,e){return n[Li].queries[e].queryList}function $I(n,e,t){let i=new qu((t&4)===4);return w0(n,e,i,i.destroy),(e[Li]??=new qm).queries.push(new $m(i))-1}function qI(n,e,t){let i=Fi();return i.firstCreatePass&&(YI(i,new Xm(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),$I(i,It(),e)}function XI(n){return n.split(",").map(e=>e.trim())}function YI(n,e,t){n.queries===null&&(n.queries=new Ym),n.queries.track(new Zm(e,t))}function Eg(n,e){return n.queries.getByIndex(e)}function ZI(n,e){let t=n[Be],i=Eg(t,e);return i.crossesNgTemplate?Km(t,n,e,[]):Hx(t,n,i,e)}function Ro(n){return!!n&&typeof n.then=="function"}function Mg(n){return!!n&&typeof n.subscribe=="function"}var Os=class{},td=class{};var Zu=class extends Os{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];constructor(e,t,i,r=!0){super(),this.ngModuleType=e,this._parent=t;let s=r0(e);this._bootstrapComponents=ZC(s.bootstrap),this._r3Injector=xm(e,t,[{provide:Os,useValue:this},...i],yu(e),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},Ku=class extends td{moduleType;constructor(e){super(),this.moduleType=e}create(e){return new Zu(this.moduleType,e,[])}};var dc=class extends Os{injector;instance=null;constructor(e){super();let t=new _s([...e.providers,{provide:Os,useValue:this}],e.parent||qa(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function fc(n,e,t=null){return new dc({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var KI=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=tm(!1,t.type),r=i.length>0?fc([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=Qe({token:n,providedIn:"environment",factory:()=>new n(Pe(Rt))})}return n})();function xi(n){return Ju(()=>{let e=zx(n),t=mt(he({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection!==tg.Eager,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(KI).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Si.Emulated,styles:n.styles||hi,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&cg("NgStandalone"),Gx(t);let i=n.dependencies;return t.directiveDefs=xS(i,JI),t.pipeDefs=xS(i,s0),t.id=tA(t),t})}function JI(n){return Ms(n)||Su(n)}function hc(n){return Ju(()=>({type:n.type,bootstrap:n.bootstrap||hi,declarations:n.declarations||hi,imports:n.imports||hi,exports:n.exports||hi,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function QI(n,e){if(n==null)return bs;let t={};for(let i in n)if(Object.hasOwn(n,i)){let r=n[i],s,o,a,c;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,c=r[3]||null):(s=r,o=r,a=ed.None,c=null),t[s]=[i,a,c],e[s]=o}return t}function eA(n){if(n==null)return bs;let e={};for(let t in n)Object.hasOwn(n,t)&&(e[n[t]]=t);return e}function pc(n){return Ju(()=>{let e=zx(n);return Gx(e),e})}function zx(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||bs,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||hi,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:QI(n.inputs,e),outputs:eA(n.outputs),debugInfo:null}}function Gx(n){n.features?.forEach(e=>e(n))}function xS(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let s=e(r);s!==null&&i.push(s)}return i}:null}function tA(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let s of i.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}var jx=new Ce("");var bg=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=te(jx,{optional:!0})??[];injector=te(Jn);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=Gt(this.injector,r);if(Ro(s))t.push(s);else if(Mg(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})();function nA(n,e,t,i,r,s,o,a){if(t.firstCreatePass){n.mergedAttrs=Qm(n.mergedAttrs,n.attrs);let u=n.tView=fg(2,n,r,s,o,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),Eo(n,!1);let c=rA(t,e,n,i);Lu()&&ug(t,e,c,n),To(c,e);let l=Dx(c,e,c,n);e[i+Bn]=l,pg(e,l),BI(l,n,e)}function iA(n,e,t,i,r,s,o,a,c,l,u){let d=t+Bn,f;return e.firstCreatePass?(f=Sg(e,d,4,o||null,a||null),dm()&&Ox(e,n,f,Qa(e.consts,l),yx),NS(e,f)):f=e.data[d],nA(f,n,e,t,i,r,s,c),Ja(f)&&mg(e,n,f),l!=null&&mx(n,f,u),f}function nd(n,e,t,i,r,s,o,a){let c=It(),l=Fi(),u=Qa(l.consts,s);return iA(c,l,n,e,t,i,r,u,void 0,o,a),nd}var rA=sA;function sA(n,e,t,i){return Fu(!0),e[Kt].createComment("")}var wg=(()=>{class n{log(t){console.log(t)}warn(t){console.warn(t)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Qe({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();var Tg=new Ce("");var id=new Ce("");function Wx(){fp(n=>{let e="";throw new Se(-600,e)})}var oA=10;var No=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=te(vi);afterRenderManager=te(ax);zonelessEnabled=te(sc);rootEffectScheduler=te(Tm);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new Ft;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=te(rr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(St(t=>!t))}constructor(){te(Or,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=te(Rt);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=Jn.NULL){return this._injector.get(dn).run(()=>{if(yt(at.BootstrapComponentStart),!this._injector.get(bg).done){let m="";throw new Se(405,m)}let a=Ms(t),c=this._injector.get(Os),l=new uc(a,c);this.componentTypes.push(t);let{hostElement:u,directives:d,bindings:f}=aA(i),h=u||l.selector,g=l.create(r,[],h,c.injector,d,f),S=g.location.nativeElement,p=g.injector.get(Tg,null);return p?.registerApplication(S),g.onDestroy(()=>{this.detachView(g.hostView),ac(this.components,g),p?.unregisterApplication(S)}),this._loadComponent(g),yt(at.BootstrapComponentEnd,g),g})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){yt(at.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(ag.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw yt(at.ChangeDetectionEnd),new Se(101,!1);let t=Ge(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,Ge(t),this.afterTick.next(),yt(at.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Ps,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<oA;){yt(at.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{yt(at.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!ec(r))continue;let s=i&&!this.zonelessEnabled?0:1;Mx(r,s),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>ec(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;ac(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(id,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>ac(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new Se(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})();function aA(n){return n===void 0||typeof n=="string"||n instanceof Element?{hostElement:n}:n}function ac(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function rd(n,e,t,i){let r=It(),s=Iu();if(xg(r,s,e)){let o=Fi(),a=_m();kD(a,r,n,e,t,i)}return rd}function Us(n,e,t){let i=It(),r=Iu();if(xg(i,r,e)){let s=Fi(),o=_m();RD(o,i,n,e,i[Kt],t)}return Us}function ES(n,e,t,i,r){gg(e,n,t,r?"class":"style",i)}function Vn(n,e,t,i){let r=It(),s=r[Be],o=n+Bn,a=s.firstCreatePass?Fx(o,r,2,e,yx,dm(),t,i):s.data[o];if(ir(a)){let c=r[Oi].tracingService;if(c&&c.componentCreate){let l=s.data[a.directiveStart+a.componentOffset];return c.componentCreate(Nx(l),()=>(MS(n,e,r,a,i),Vn))}}return MS(n,e,r,a,i),Vn}function MS(n,e,t,i,r){if(VD(i,t,n,e,cA),Ja(i)){let s=t[Be];mg(s,t,i),ex(s,i,t)}r!=null&&mx(t,i)}function ti(){let n=Fi(),e=ki(),t=HD(e);return n.firstCreatePass&&kx(n,t),A0(t)&&R0(),D0(),t.classesWithoutHost!=null&&xC(t)&&ES(n,t,It(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&EC(t)&&ES(n,t,It(),t.stylesWithoutHost,!1),ti}function Fr(n,e,t,i){return Vn(n,e,t,i),ti(),Fr}var cA=(n,e,t,i,r)=>(Fu(!0),nx(e[Kt],i,Sm()));var mc="en-US";var lA=mc;function $x(n){typeof n=="string"&&(lA=n.toLowerCase().replace(/_/g,"-"))}function sd(n,e,t){let i=It(),r=Fi(),s=ki();return uA(r,i,i[Kt],s,n,e,t),sd}function uA(n,e,t,i,r,s,o){let a=!0,c=null;if((i.type&3||o)&&(c??=Am(i,e,s),fI(i,n,e,o,t,r,s,c)&&(a=!1)),a){let l=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let d=0;d<u.length;d+=2){let f=u[d],h=u[d+1];c??=Am(i,e,s),pS(i,e,f,h,r,c)}if(l&&l.length)for(let d of l)c??=Am(i,e,s),pS(i,e,d,r,r,c)}}function Cg(n=1){return H0(n)}function Po(n,e,t){return qI(n,e,t),Po}function gc(n){let e=It(),t=Fi(),i=gm();Ru(i+1);let r=Eg(t,i);if(n.dirty&&x0(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let s=ZI(e,i);n.reset(s,FC),n.notifyOnChanges()}return!0}return!1}function yc(){return WI(It(),gm())}function Oo(n,e=""){let t=It(),i=Fi(),r=n+Bn,s=i.firstCreatePass?Sg(i,r,1,e,null):i.data[r],o=dA(i,t,s,e);t[r]=o,Lu()&&ug(i,t,o,s),Eo(s,!1)}var dA=(n,e,t,i)=>(Fu(!0),WC(e[Kt],i));function fA(n,e,t,i=""){return xg(n,Iu(),t)?e+Yp(t)+i:Ao}function od(n){return Dg("",n),od}function Dg(n,e,t){let i=It(),r=fA(i,n,e,t);return r!==Ao&&hA(i,Ou(),r),Dg}function hA(n,e,t){let i=S0(e,n);$C(n[Kt],i,t)}var qx=(()=>{class n{applicationErrorHandler=te(vi);appRef=te(No);taskService=te(rr);ngZone=te(dn);zonelessEnabled=te(sc);tracing=te(Or,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new rn;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Ha):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(te(wm,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:case 2:{this.appRef.dirtyFlags|=2;break}case 3:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?W0:Em;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Ha+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})();function Xx(){return[{provide:Ss,useExisting:qx},{provide:dn,useClass:za},{provide:sc,useValue:!0}]}var Ig=(()=>{class n{compileModuleSync(t){return new Ku(t)}compileModuleAsync(t){return Promise.resolve(this.compileModuleSync(t))}clearCache(){}clearCacheFor(t){}getModuleId(t){}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})();function pA(){return typeof $localize<"u"&&$localize.locale||mc}var ad=new Ce("",{factory:()=>te(ad,{optional:!0,skipSelf:!0})||pA()});function ni(n){return E_(n)}var Yx=class n extends Error{_brand;constructor(e){super(e)}static IDLE=new n("IDLE");static LOADING=new n("LOADING")};function Qx(n,e){let t=Object.create(DS);t.value=n,t.transformFn=e?.transform;function i(){if(no(t),t.value===Jm){let r=null;throw new Se(-950,r)}return t.value}return i[Pn]=t,i}function Rg(n){return BA(n)?n.default:n}function BA(n){return n&&typeof n=="object"&&"default"in n}function Zx(n,e){return Qx(n,e)}function VA(n){return Qx(Jm,n)}var Ng=(Zx.required=VA,Zx);var HA=1e4;var t9=HA-1e3;var Pg=(()=>{class n{static __NG_ELEMENT_ID__=zA}return n})();function zA(n){return GA(ki(),It(),(n&16)===16)}function GA(n,e,t){if(ir(n)&&!t){let i=yi(n.index,e);return new Nr(i,i)}else if(n.type&175){let i=e[kn];return new Nr(i,e)}return null}var Ag=new Ce(""),jA=new Ce("");function vc(n){return!n.moduleRef}function WA(n){let e=vc(n)?n.r3Injector:n.moduleRef.injector,t=e.get(dn);return t.run(()=>{vc(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(vi),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),vc(n)){let s=()=>e.destroy(),o=n.platformInjector.get(Ag);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>n.moduleRef.destroy(),o=n.platformInjector.get(Ag);o.add(s),n.moduleRef.onDestroy(()=>{ac(n.allPlatformModules,n.moduleRef),r.unsubscribe(),o.delete(s)})}return qA(i,t,()=>{let s=e.get(rr),o=s.add(),a=e.get(bg);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get(ad,mc);if($x(c||mc),!e.get(jA,!0))return vc(n)?e.get(No):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(vc(n)){let u=e.get(No);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return $A?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{s.remove(o)})})})}var $A;function qA(n,e,t){try{let i=t();return Ro(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var cd=null;function XA(n=[],e){return Jn.create({name:e,providers:[{provide:$a,useValue:"platform"},{provide:Ag,useValue:new Set([()=>cd=null])},...n]})}function YA(n=[]){if(cd)return cd;let e=XA(n);return cd=e,Wx(),ZA(e),e}function ZA(n){let e=n.get(ku,null);Gt(n,()=>{e?.forEach(t=>t())})}function eE(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;yt(at.BootstrapApplicationStart);try{let s=r?.injector??YA(i),o=[Xx(),X0,...t||[]],a=new dc({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return WA({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{yt(at.BootstrapApplicationEnd)}}function _c(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()!==e)continue;let o=s;try{o=decodeURIComponent(s)}catch{}return o.length>1&&o[0]==='"'&&o[o.length-1]==='"'&&(o=o.slice(1,-1)),o}return null}var tE=null;function ar(){return tE}function Og(n){tE??=n}var Sc=class{},cr=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Qe({token:n,factory:()=>te(nE),providedIn:"platform"})}return n})();var nE=(()=>{class n extends cr{_location;_history;_doc=te(Nt);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return ar().getBaseHref(this._doc)}onPopState(t){let i=ar().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=ar().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Qe({token:n,factory:()=>new n,providedIn:"platform"})}return n})();var Br=class n{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(e){e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(t=>{let i=t.indexOf(":");if(i>0){let r=t.slice(0,i),s=t.slice(i+1).trim();this.addHeaderEntry(r,s)}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((t,i)=>{this.addHeaderEntry(i,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([t,i])=>{this.setHeaderEntries(t,i)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let t=this.headers.get(e.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,t){return this.clone({name:e,value:t,op:"a"})}set(e,t){return this.clone({name:e,value:t,op:"s"})}delete(e,t){return this.clone({name:e,value:t,op:"d"})}maybeSetNormalizedName(e,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,e)}init(){this.lazyInit&&(this.lazyInit instanceof n?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init();for(let[t,i]of e.headers.entries())this.headers.set(t,i),this.normalizedNames.set(t,e.normalizedNames.get(t))}clone(e){let t=new n;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof n?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([e]),t}applyUpdate(e){let t=e.name.toLowerCase();switch(e.op){case"a":case"s":let i=e.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(e.name,t);let r=e.op==="a"?(this.headers.get(t)||[]).slice():[];r.push(...i),this.headers.set(t,r);break;case"d":let s=e.value;if(s===void 0)this.headers.delete(t),this.normalizedNames.delete(t);else{let o=Array.isArray(s)?s:[s],a=this.headers.get(t);if(!a)return;a=a.filter(c=>o.indexOf(c)===-1),a.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,a)}break}}addHeaderEntry(e,t){let i=e.toLowerCase();this.maybeSetNormalizedName(e,i),this.headers.has(i)?this.headers.get(i).push(t):this.headers.set(i,[t])}setHeaderEntries(e,t){let i=(Array.isArray(t)?t:[t]).map(s=>s.toString()),r=e.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(e,r)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>e(this.normalizedNames.get(t),this.headers.get(t)))}};var ud=class{map=new Map;set(e,t){return this.map.set(e,t),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}},dd=class{encodeKey(e){return iE(e)}encodeValue(e){return iE(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function JA(n,e){let t=new Map;return n.length>0&&n.replace(/^\?/,"").split("&").forEach(r=>{let s=r.indexOf("="),[o,a]=s==-1?[e.decodeKey(r),""]:[e.decodeKey(r.slice(0,s)),e.decodeValue(r.slice(s+1))],c=t.get(o)||[];c.push(a),t.set(o,c)}),t}var QA=/[&+#]/g;function iE(n){return encodeURI(n).replace(QA,encodeURIComponent)}function ld(n){return`${n}`}var Ur=class n{map;encoder;updates=null;cloneFrom=null;constructor(e={}){if(this.encoder=e.encoder||new dd,e.fromString){if(e.fromObject)throw new Se(2805,!1);this.map=JA(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(t=>{let i=e.fromObject[t],r=Array.isArray(i)?i.map(ld):[ld(i)];this.map.set(t,r)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let t=this.map.get(e);return t?t[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,t){return this.clone({param:e,value:t,op:"a"})}appendAll(e){let t=[];return Object.keys(e).forEach(i=>{let r=e[i];Array.isArray(r)?r.forEach(s=>{t.push({param:i,value:s,op:"a"})}):t.push({param:i,value:r,op:"a"})}),this.clone(t)}set(e,t){return this.clone({param:e,value:t,op:"s"})}delete(e,t){return this.clone({param:e,value:t,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let t=this.encoder.encodeKey(e);return this.map.get(e).map(i=>t+"="+this.encoder.encodeValue(i)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let t=new n({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(e),t}init(){if(this.map===null&&(this.map=new Map),this.cloneFrom!==null){this.cloneFrom.init();for(let[e,t]of this.cloneFrom.map.entries())this.map.set(e,t);this.updates.forEach(e=>{switch(e.op){case"a":case"s":let t=e.op==="a"?(this.map.get(e.param)||[]).slice():[];t.push(ld(e.value)),this.map.set(e.param,t);break;case"d":if(e.value!==void 0){let i=(this.map.get(e.param)||[]).slice(),r=i.indexOf(ld(e.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(e.param,i):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null}}};function eR(n){switch(n){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function rE(n){return typeof ArrayBuffer<"u"&&n instanceof ArrayBuffer}function sE(n){return typeof Blob<"u"&&n instanceof Blob}function oE(n){return typeof FormData<"u"&&n instanceof FormData}function tR(n){return typeof URLSearchParams<"u"&&n instanceof URLSearchParams}var Lg="Content-Type",aE="Accept",uE="text/plain",dE="application/json",nR=`${dE}, ${uE}, */*`,xc=class n{url;body=null;headers;context;reportProgress=!1;reportUploadProgress=!1;reportDownloadProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(e,t,i,r){this.url=t,this.method=e.toUpperCase();let s;if(eR(this.method)||r?(this.body=i!==void 0?i:null,s=r):s=i,s){if(this.reportProgress=!!s.reportProgress,this.reportUploadProgress=!!s.reportUploadProgress,this.reportDownloadProgress=!!s.reportDownloadProgress,this.withCredentials=!!s.withCredentials,this.keepalive=!!s.keepalive,s.responseType&&(this.responseType=s.responseType),s.headers&&(this.headers=s.headers),s.context&&(this.context=s.context),s.params&&(this.params=s.params),s.priority&&(this.priority=s.priority),s.cache&&(this.cache=s.cache),s.credentials&&(this.credentials=s.credentials),typeof s.timeout=="number"){if(s.timeout<1||!Number.isInteger(s.timeout))throw new Se(2822,"");this.timeout=s.timeout}s.mode&&(this.mode=s.mode),s.redirect&&(this.redirect=s.redirect),s.integrity&&(this.integrity=s.integrity),s.referrer!==void 0&&(this.referrer=s.referrer),s.referrerPolicy&&(this.referrerPolicy=s.referrerPolicy),this.transferCache=s.transferCache}if(this.headers??=new Br,this.context??=new ud,!this.params)this.params=new Ur,this.urlWithParams=t;else{let o=this.params.toString();if(o.length===0)this.urlWithParams=t;else{let a=t,c="",l=t.indexOf("#");l!==-1&&(c=t.substring(l),a=t.substring(0,l));let u=a.indexOf("?"),d=u===-1?"?":u<a.length-1?"&":"";this.urlWithParams=a+d+o+c}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||rE(this.body)||sE(this.body)||oE(this.body)||tR(this.body)?this.body:this.body instanceof Ur?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||oE(this.body)?null:sE(this.body)?this.body.type||null:rE(this.body)?null:typeof this.body=="string"?uE:this.body instanceof Ur?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?dE:null}clone(e={}){let t=e.method||this.method,i=e.url||this.url,r=e.responseType||this.responseType,s=e.keepalive??this.keepalive,o=e.priority||this.priority,a=e.cache||this.cache,c=e.mode||this.mode,l=e.redirect||this.redirect,u=e.credentials||this.credentials,d=e.referrer??this.referrer,f=e.integrity||this.integrity,h=e.referrerPolicy||this.referrerPolicy,g=e.transferCache??this.transferCache,S=e.timeout??this.timeout,p=e.body!==void 0?e.body:this.body,m=e.withCredentials??this.withCredentials,x=e.reportProgress??this.reportProgress,T=e.reportUploadProgress??this.reportUploadProgress,M=e.reportDownloadProgress??this.reportDownloadProgress,C=e.headers||this.headers,w=e.params||this.params,y=e.context??this.context;return e.setHeaders!==void 0&&(C=Object.keys(e.setHeaders).reduce((E,L)=>E.set(L,e.setHeaders[L]),C)),e.setParams&&(w=Object.keys(e.setParams).reduce((E,L)=>E.set(L,e.setParams[L]),w)),new n(t,i,p,{params:w,headers:C,context:y,reportProgress:x,reportUploadProgress:T,reportDownloadProgress:M,responseType:r,withCredentials:m,transferCache:g,keepalive:s,cache:a,priority:o,timeout:S,mode:c,redirect:l,credentials:u,referrer:d,integrity:f,referrerPolicy:h})}},Fo=(function(n){return n[n.Sent=0]="Sent",n[n.UploadProgress=1]="UploadProgress",n[n.ResponseHeader=2]="ResponseHeader",n[n.DownloadProgress=3]="DownloadProgress",n[n.Response=4]="Response",n[n.User=5]="User",n})(Fo||{}),ko=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(e,t=200,i="OK"){this.headers=e.headers||new Br,this.status=e.status!==void 0?e.status:t,this.statusText=e.statusText||i,this.url=e.url||null,this.redirected=e.redirected,this.responseType=e.responseType,this.ok=this.status>=200&&this.status<300}},fd=class n extends ko{constructor(e={}){super(e)}type=Fo.ResponseHeader;clone(e={}){return new n({headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},hd=class n extends ko{body;constructor(e={}){super(e),this.body=e.body!==void 0?e.body:null}type=Fo.Response;clone(e={}){return new n({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0,redirected:e.redirected??this.redirected,responseType:e.responseType??this.responseType})}},Lo=class extends ko{name="HttpErrorResponse";message;error;ok=!1;constructor(e){super(e,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${e.url||"(unknown url)"}`:this.message=`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}},iR=200;var rR=/^\)\]\}',?\n/,S9=1024*1024,fE=new Ce("",{factory:()=>null}),pd=(()=>{class n{fetchImpl=te(kg,{optional:!0})?.fetch??((...t)=>globalThis.fetch(...t));ngZone=te(dn);destroyRef=te(pi);maxResponseSize=te(fE);handle(t){return new Je(i=>{let r=new AbortController,s=!1,o={next:c=>{c.type===Fo.Response&&(s=!0),i.next(c)},error:c=>{s=!0,i.error(c)},complete:()=>{s=!0,i.complete()}};this.doRequest(t,r.signal,o).then(Ug,c=>o.error(new Lo({error:c})));let a;return t.timeout&&(a=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{r.signal.aborted||r.abort(new DOMException("signal timed out","TimeoutError"))},t.timeout))),()=>{a!==void 0&&clearTimeout(a),!s&&!r.signal.aborted&&r.abort()}})}async doRequest(t,i,r){let s=this.createRequestInit(t),o;try{let p=this.ngZone.runOutsideAngular(()=>this.fetchImpl(t.urlWithParams,he({signal:i},s)));sR(p),r.next({type:Fo.Sent}),o=await p}catch(p){r.error(new Lo({error:p,status:p.status??0,statusText:p.statusText,url:t.urlWithParams,headers:p.headers}));return}let a=new Br(o.headers),c=o.statusText,l=o.url||t.urlWithParams,u=o.status,d=null,f=t.reportProgress||t.reportDownloadProgress;if(f&&r.next(new fd({headers:a,status:u,statusText:c,url:l})),o.body){let p=o.headers.get(Lg)??"",m=o.headers.get("content-length"),x=m!==null?Number(m):NaN;this.maxResponseSize!==null&&Number.isFinite(x)&&x>this.maxResponseSize&&(await o.body.cancel(),cE(this.maxResponseSize));let T=[],M=o.body.getReader(),C=0,w,y,E=typeof Zone<"u"&&Zone.current,L=!1;if(await this.ngZone.runOutsideAngular(async()=>{for(;;){if(this.destroyRef.destroyed){await M.cancel(),L=!0;break}let{done:O,value:F}=await M.read();if(O)break;if(T.push(F),C+=F.length,this.maxResponseSize!==null&&C>this.maxResponseSize&&(await M.cancel(),cE(this.maxResponseSize)),f){y=t.responseType==="text"?(y??"")+(w??=lE(p)).decode(F,{stream:!0}):void 0;let G=()=>r.next({type:Fo.DownloadProgress,total:Number.isFinite(x)?x:void 0,loaded:C,partialText:y});E?E.run(G):G()}}}),L){r.complete();return}let R=this.concatChunks(T,C);try{d=this.parseBody(t,R,p,u)}catch(O){r.error(new Lo({error:O,headers:new Br(o.headers),status:o.status,statusText:o.statusText,url:o.url||t.urlWithParams}));return}}u===0&&(u=d?iR:0);let h=u>=200&&u<300,g=o.redirected,S=o.type;h?(r.next(new hd({body:d,headers:a,status:u,statusText:c,url:l,redirected:g,responseType:S})),r.complete()):r.error(new Lo({error:d,headers:a,status:u,statusText:c,url:l,redirected:g,responseType:S}))}parseBody(t,i,r,s){switch(t.responseType){case"json":let o=new TextDecoder().decode(i).replace(rR,"");if(o==="")return null;try{return JSON.parse(o)}catch(a){if(s<200||s>=300)return o;throw a}case"text":return lE(r).decode(i);case"blob":return new Blob([i],{type:r});case"arraybuffer":return i.buffer}}createRequestInit(t){if(t.reportUploadProgress)throw new Se(2824,!1);let i={},r;if(r=t.credentials,t.withCredentials&&(r="include"),t.headers.forEach((s,o)=>i[s]=o.join(",")),t.headers.has(aE)||(i[aE]=nR),!t.headers.has(Lg)){let s=t.detectContentTypeHeader();s!==null&&(i[Lg]=s)}return{body:t.serializeBody(),method:t.method,headers:i,credentials:r,keepalive:t.keepalive,cache:t.cache,priority:t.priority,mode:t.mode,redirect:t.redirect,referrer:t.referrer,integrity:t.integrity,referrerPolicy:t.referrerPolicy}}concatChunks(t,i){let r=new Uint8Array(i),s=0;for(let o of t)r.set(o,s),s+=o.length;return r}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})(),kg=class{};function Ug(){}function sR(n){n.then(Ug,Ug)}function cE(n){throw new Se(-2825,!1)}var oR=/charset=\s*["']?([^;"'\s]+)["']?/i;function lE(n){let e=n.match(oR);if(e!==null)try{return new TextDecoder(e[1])}catch{}return new TextDecoder}var aR=new Ce("",{factory:()=>!0}),cR="XSRF-TOKEN",lR=new Ce("",{factory:()=>cR}),uR="X-XSRF-TOKEN",dR=new Ce("",{factory:()=>uR}),fR=(()=>{class n{cookieName=te(lR);doc=te(Nt);lastCookieString="";lastToken=null;parseCount=0;getToken(){let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=_c(t,this.cookieName),this.lastCookieString=t),this.lastToken}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})(),hE=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Qe({token:n,factory:function(i){let r=null;return i?r=new(i||n):r=Pe(fR),r},providedIn:"root"})}return n})();function pE(n,e){if(!te(aR)||n.method==="GET"||n.method==="HEAD")return e(n);try{let r=te(cr).href,{origin:s}=new URL(r),{origin:o}=new URL(n.url,s);if(s!==o)return e(n)}catch{return e(n)}let t=te(hE).getToken(),i=te(dR);return t!=null&&!n.headers.has(i)&&(n=n.clone({headers:n.headers.set(i,t)})),e(n)}function hR(n,e){return e(n)}function pR(n,e,t){return(i,r)=>Gt(t,()=>e(i,s=>n(s,r)))}var mE=new Ce("",{factory:()=>[pE]}),mR=new Ce(""),gE=new Ce("",{factory:()=>!0});var Bg=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Qe({token:n,factory:function(i){let r=null;return i?r=new(i||n):r=Pe(pd),r},providedIn:"root"})}return n})();var md=(()=>{class n{backend;injector;chain=null;pendingTasks=te(Uu);contributeToStability=te(gE);constructor(t,i){this.backend=t,this.injector=i}handle(t){if(this.chain===null){let r=this.injector.get(gd,null,{skipSelf:!0}),s=r!==null&&this.backend===r,o=this.injector.get(mR,[],s?{self:!0}:void 0),a=Array.from(new Set([...this.injector.get(mE),...o]));this.chain=a.reduceRight((c,l)=>pR(c,l,this.injector),hR)}let i=this.chain;if(this.contributeToStability){let r=this.pendingTasks.add();return ni(()=>i(t,s=>this.backend.handle(s))).pipe(Ua(r))}else return ni(()=>i(t,r=>this.backend.handle(r)))}static \u0275fac=function(i){return new(i||n)(Pe(Bg),Pe(Rt))};static \u0275prov=Qe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),gd=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Qe({token:n,factory:function(i){let r=null;return i?r=new(i||n):r=Pe(md),r},providedIn:"root"})}return n})();function Fg(n,e){return he({body:e},n)}var gR=(()=>{class n{handler;constructor(t){this.handler=t}request(t,i,r={}){let s;if(t instanceof xc)s=t;else{let c;r.headers instanceof Br?c=r.headers:c=new Br(r.headers);let l;r.params&&(r.params instanceof Ur?l=r.params:l=new Ur({fromObject:r.params})),s=new xc(t,i,r.body!==void 0?r.body:null,{headers:c,context:r.context,params:l,reportProgress:r.reportProgress,reportUploadProgress:r.reportUploadProgress,reportDownloadProgress:r.reportDownloadProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout})}let o=Ze(s).pipe(ho(c=>this.handler.handle(c)));if(t instanceof xc||r.observe==="events")return o;let a=o.pipe(fi(c=>c instanceof hd));switch(r.observe||"body"){case"body":switch(s.responseType){case"arraybuffer":return a.pipe(St(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new Se(2806,!1);return c.body}));case"blob":return a.pipe(St(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new Se(2807,!1);return c.body}));case"text":return a.pipe(St(c=>{if(c.body!==null&&typeof c.body!="string")throw new Se(2808,!1);return c.body}));default:return a.pipe(St(c=>c.body))}case"response":return a;default:throw new Se(2809,!1)}}delete(t,i={}){return this.request("DELETE",t,i)}get(t,i={}){return this.request("GET",t,i)}head(t,i={}){return this.request("HEAD",t,i)}jsonp(t,i){return this.request("JSONP",t,{params:new Ur().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,i={}){return this.request("OPTIONS",t,i)}patch(t,i,r={}){return this.request("PATCH",t,Fg(r,i))}post(t,i,r={}){return this.request("POST",t,Fg(r,i))}put(t,i,r={}){return this.request("PUT",t,Fg(r,i))}static \u0275fac=function(i){return new(i||n)(Pe(gd))};static \u0275prov=Qe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Vg(...n){let e=[gR,pd,md,{provide:gd,useExisting:md},{provide:Bg,useFactory:()=>te(pd)},{provide:mE,useValue:pE,multi:!0}];for(let t of n)e.push(...t.\u0275providers);return ws(e)}function yd(n,e){return n?e?n.endsWith("/")?e.startsWith("/")?n+e.slice(1):n+e:e.startsWith("/")?n+e:`${n}/${e}`:n:e}function yE(n){let e=n.search(/#|\?|$/);return n[e-1]==="/"?n.slice(0,e-1)+n.slice(e):n}function Ei(n){return n&&n[0]!=="?"?`?${n}`:n}var Vr=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Qe({token:n,factory:()=>te(_E),providedIn:"root"})}return n})(),Hg=new Ce(""),_E=(()=>{class n extends Vr{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,i){super(),this._platformLocation=t,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??te(Nt).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return yd(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+Ei(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,s){let o=this.prepareExternalUrl(r+Ei(s));this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,s){let o=this.prepareExternalUrl(r+Ei(s));this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(i){return new(i||n)(Pe(cr),Pe(Hg,8))};static \u0275prov=Qe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Bs=(()=>{class n{_subject=new Ft;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=_R(yE(vE(i))),this._locationStrategy.onPopState(r=>{let s={url:this.path(!0),pop:!0,state:r.state,type:r.type};r.hasUAVisualTransition&&(s.hasUAVisualTransition=!0),this._subject.next(s)})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+Ei(i))}normalize(t){return n.stripTrailingSlash(vR(this._basePath,vE(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Ei(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Ei(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Ei;static joinWithSlash=yd;static stripTrailingSlash=yE;static \u0275fac=function(i){return new(i||n)(Pe(Vr))};static \u0275prov=Qe({token:n,factory:()=>yR(),providedIn:"root"})}return n})();function yR(){return new Bs(Pe(Vr))}function vR(n,e){if(!n||!e.startsWith(n))return e;let t=e.substring(n.length);return t===""||["/",";","?","#"].includes(t[0])?t:e}function vE(n){return n.replace(/\/index\.html$/,"")}function _R(n){if(new RegExp("^(https?:)?//").test(n)){let[,t]=n.split(/\/\/[^\/]+/);return t}return n}var zg=(()=>{class n extends Vr{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(t,i){super(),this._platformLocation=t,i!=null&&(this._baseHref=i)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}path(t=!1){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(t){let i=yd(this._baseHref,t);return i.length>0?"#"+i:i}pushState(t,i,r,s){let o=this.prepareExternalUrl(r+Ei(s))||this._platformLocation.pathname;this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,s){let o=this.prepareExternalUrl(r+Ei(s))||this._platformLocation.pathname;this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(i){return new(i||n)(Pe(cr),Pe(Hg,8))};static \u0275prov=Qe({token:n,factory:n.\u0275fac})}return n})();var Gg=(()=>{class n{_viewContainer;_context=new vd;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(t,i){this._viewContainer=t,this._thenTemplateRef=i}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){SE(t,!1),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){SE(t,!1),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(t,i){return!0}static \u0275fac=function(i){return new(i||n)(ks(Lr),ks(Ns))};static \u0275dir=pc({type:n,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return n})(),vd=class{$implicit=null;ngIf=null};function SE(n,e){if(n&&!n.createEmbeddedView)throw new Se(2020,!1)}var _d=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=hc({type:n});static \u0275inj=yo({})}return n})();var xE="browser";var Ec=class{_doc;constructor(e){this._doc=e}manager},Sd=(()=>{class n extends Ec{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,s){return t.addEventListener(i,r,s),()=>this.removeEventListener(t,i,r,s)}removeEventListener(t,i,r,s){return t.removeEventListener(i,r,s)}static \u0275fac=function(i){return new(i||n)(Pe(Nt))};static \u0275prov=Qe({token:n,factory:n.\u0275fac})}return n})(),Md=new Ce(""),qg=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(o=>{o.manager=this});let r=t.filter(o=>!(o instanceof Sd));this._plugins=r.slice().reverse();let s=t.find(o=>o instanceof Sd);s&&this._plugins.push(s)}addEventListener(t,i,r,s){return this._findPluginFor(i).addEventListener(t,i,r,s)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new Se(-5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(Pe(Md),Pe(dn))};static \u0275prov=Qe({token:n,factory:n.\u0275fac})}return n})(),jg="ng-app-id";function EE(n){for(let e of n)e.remove()}function ME(n,e){let t=e.createElement("style");return t.textContent=n,t}function MR(n,e,t,i){let r=n.head?.querySelectorAll(`style[${jg}="${e}"],link[${jg}="${e}"]`);if(!r||r.length===0)return!1;for(let s of r)s.removeAttribute(jg),s instanceof HTMLLinkElement?i.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]});return!0}function $g(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var Xg=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,MR(t,i,this.inline,this.external)&&this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,ME);i?.forEach(r=>this.addUsage(r,this.external,$g))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let s=i.get(t);s?s.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(EE(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])EE(t);this.hosts.clear()}addHost(t){if(!this.hosts.has(t)){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,ME(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,$g(i,this.doc)))}}removeHost(t){this.hosts.delete(t);for(let i of[...this.inline.values(),...this.external.values()]){let r=[];for(let s of i.elements)s.parentNode===t?s.remove():r.push(s);i.elements=r}}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(Pe(Nt),Pe(nc),Pe(rc,8),Pe(ic))};static \u0275prov=Qe({token:n,factory:n.\u0275fac})}return n})(),Wg={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Yg=/%COMP%/g;var wE="%COMP%",bR=`_nghost-${wE}`,wR=`_ngcontent-${wE}`,TR=!0,CR=new Ce("",{factory:()=>TR}),DR=new Ce("");function IR(n){return wR.replace(Yg,n)}function AR(n){return bR.replace(Yg,n)}function TE(n,e){return e.map(t=>t.replace(Yg,n))}var Zg=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;cssVarNamespace;constructor(t,i,r,s,o,a,c=null,l=null,u=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.ngZone=a,this.nonce=c,this.tracingService=l,this.cssVarNamespace=u??"",this.defaultRenderer=new Mc(t,o,a,this.tracingService,this.cssVarNamespace)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof Ed?r.applyToHost(t):r instanceof bc&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(i.encapsulation){case Si.Emulated:s=new Ed(c,l,i,this.appId,u,o,a,d,this.cssVarNamespace);break;case Si.ShadowDom:return new xd(c,t,i,o,a,this.nonce,d,this.cssVarNamespace,l);case Si.ExperimentalIsolatedShadowDom:return new xd(c,t,i,o,a,this.nonce,d,this.cssVarNamespace);default:s=new bc(c,l,i,u,o,a,d,this.cssVarNamespace);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(Pe(qg),Pe(Fs),Pe(nc),Pe(CR),Pe(Nt),Pe(dn),Pe(rc),Pe(Or,8),Pe(DR,8))};static \u0275prov=Qe({token:n,factory:n.\u0275fac})}return n})(),Mc=class{eventManager;doc;ngZone;tracingService;cssVarNamespace;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r,s=""){this.eventManager=e,this.doc=t,this.ngZone=i,this.tracingService=r,this.cssVarNamespace=s}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(Wg[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(bE(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){if(e){let r=bE(e)?e.content:e;if(i!=null&&i.parentNode!==r)throw new Se(-5106,!1);r.insertBefore(t,i)}}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new Se(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=Wg[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=Wg[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){let s=t.startsWith("--");s&&(t=t.replace("%NS%",this.cssVarNamespace)),s||r&(Pr.DashCase|Pr.Important)?e.style.setProperty(t,i,r&Pr.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){let r=t.startsWith("--");r&&(t=t.replace("%NS%",this.cssVarNamespace)),r||i&Pr.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=ar().getGlobalEventTarget(this.doc,e),!e))throw new Se(-5102,!1);let s=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function bE(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var xd=class extends Mc{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,i,r,s,o,a,c,l){super(e,r,s,a,c),this.hostEl=t,this.sharedStylesHost=l,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let u=i.styles;u=TE(i.id,u).map(f=>f.replace(/%NS%/g,c));for(let f of u){let h=document.createElement("style");o&&h.setAttribute("nonce",o),h.textContent=f,this.shadowRoot.appendChild(h)}let d=i.getExternalStyles?.();if(d)for(let f of d){let h=$g(f,r);o&&h.setAttribute("nonce",o),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},bc=class extends Mc{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,s,o,a,c,l){super(e,s,o,a,c),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let u=i.styles,d=l?TE(l,u):u;this.styles=d.map(f=>f.replace(/%NS%/g,c)),this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&og.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Ed=class extends bc{contentAttr;hostAttr;constructor(e,t,i,r,s,o,a,c,l){let u=r+"-"+i.id;super(e,t,i,s,o,a,c,l,u),this.contentAttr=IR(u),this.hostAttr=AR(u)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var bd=class n extends Sc{supportsDOMEvents=!0;static makeCurrent(){Og(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=RR();return t==null?null:NR(t)}resetBaseElement(){wc=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return _c(document.cookie,e)}},wc=null;function RR(){return wc=wc||document.head.querySelector("base"),wc?wc.getAttribute("href"):null}function NR(n){return new URL(n,document.baseURI).pathname}var CE=["alt","control","meta","shift"],PR={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},OR={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},DE=(()=>{class n extends Ec{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,s){let o=n.parseEventName(i),a=n.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ar().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),CE.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),o+=l+".")}),o+=s,i.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,i){let r=PR[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),CE.forEach(o=>{if(o!==r){let a=OR[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(Pe(Nt))};static \u0275prov=Qe({token:n,factory:n.\u0275fac})}return n})();async function Kg(n,e,t){let i=he({rootComponent:n},LR(e,t));return eE(i)}function LR(n,e){return{platformRef:e?.platformRef,appProviders:[...VR,...n?.providers??[]],platformProviders:BR}}function FR(){bd.makeCurrent()}function kR(){return new tr}function UR(){return ng(document),document}var BR=[{provide:ic,useValue:xE},{provide:ku,useValue:FR,multi:!0},{provide:Nt,useFactory:UR}];var VR=[{provide:$a,useValue:"root"},{provide:tr,useFactory:kR},{provide:Md,useClass:Sd,multi:!0},{provide:Md,useClass:DE,multi:!0},Zg,{provide:Fs,useClass:Xg},{provide:Xg,useExisting:Fs},qg,{provide:Ps,useExisting:Zg},[]];var IE=(()=>{class n{_doc;constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static \u0275fac=function(i){return new(i||n)(Pe(Nt))};static \u0275prov=Qe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Ve="primary",Bc=Symbol("RouteTitle"),iy=class{params;constructor(e){this.params=e||{}}has(e){return Object.hasOwn(this.params,e)}get(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t[0]:t}return null}getAll(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t:[t]}return[]}get keys(){return Object.keys(this.params)}};function Hs(n){return new iy(n)}function Jg(n,e,t){for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(r[0]===":")t[r.substring(1)]=s;else if(r!==s.path)return!1}return!0}function kE(n,e,t){let i=t.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>n.length||t.pathMatch==="full"&&(e.hasChildren()||i.length<n.length))return null;let c={},l=n.slice(0,i.length);return Jg(i,l,c)?{consumed:l,posParams:c}:null}if(r!==i.lastIndexOf("**"))return null;let s=i.slice(0,r),o=i.slice(r+1);if(s.length+o.length>n.length||t.pathMatch==="full"&&e.hasChildren()&&t.path!=="**")return null;let a={};return!Jg(s,n.slice(0,s.length),a)||!Jg(o,n.slice(n.length-o.length),a)?null:{consumed:n,posParams:a}}function Ad(n){return new Promise((e,t)=>{n.pipe(Ji()).subscribe({next:i=>e(i),error:i=>t(i)})})}function GR(n,e){if(n.length!==e.length)return!1;for(let t=0;t<n.length;++t)if(!Vi(n[t],e[t]))return!1;return!0}function Vi(n,e){let t=n?ry(n):void 0,i=e?ry(e):void 0;if(!t||!i||t.length!=i.length)return!1;let r;for(let s=0;s<t.length;s++)if(r=t[s],!UE(n[r],e[r]))return!1;return!0}function ry(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function UE(n,e){if(Array.isArray(n)&&Array.isArray(e)){if(n.length!==e.length)return!1;let t=[...n].sort(),i=[...e].sort();return t.every((r,s)=>i[s]===r)}else return n===e}function jR(n){return n.length>0?n[n.length-1]:null}function Vc(n){return uu(n)?n:Ro(n)?kt(Promise.resolve(n)):Ze(n)}function BE(n){return uu(n)?Ad(n):Promise.resolve(n)}var WR={exact:zE,subset:GE},VE={exact:$R,subset:qR,ignored:()=>!0},HE={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},Rd={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function sy(n,e,t){let i=he(he({},Rd),t||{});return WR[i.paths](n.root,e.root,i.matrixParams)&&VE[i.queryParams](n.queryParams,e.queryParams)&&!(i.fragment==="exact"&&n.fragment!==e.fragment)}function $R(n,e){return Vi(n,e)}function zE(n,e,t){if(!Vs(n.segments,e.segments)||!Cd(n.segments,e.segments,t)||n.numberOfChildren!==e.numberOfChildren)return!1;for(let i in e.children)if(!n.children[i]||!zE(n.children[i],e.children[i],t))return!1;return!0}function qR(n,e){return Object.keys(e).length<=Object.keys(n).length&&Object.keys(e).every(t=>UE(n[t],e[t]))}function GE(n,e,t){return jE(n,e,e.segments,t)}function jE(n,e,t,i){if(n.segments.length>t.length){let r=n.segments.slice(0,t.length);return!(!Vs(r,t)||e.hasChildren()||!Cd(r,t,i))}else if(n.segments.length===t.length){if(!Vs(n.segments,t)||!Cd(n.segments,t,i))return!1;for(let r in e.children)if(!n.children[r]||!GE(n.children[r],e.children[r],i))return!1;return!0}else{let r=t.slice(0,n.segments.length),s=t.slice(n.segments.length);return!Vs(n.segments,r)||!Cd(n.segments,r,i)||!n.children[Ve]?!1:jE(n.children[Ve],e,s,i)}}function Cd(n,e,t){return e.every((i,r)=>VE[t](n[r].parameters,i.parameters))}var si=class{root;queryParams;fragment;_queryParamMap;constructor(e=new ct([],{}),t={},i=null){this.root=e,this.queryParams=t,this.fragment=i}get queryParamMap(){return this._queryParamMap??=Hs(this.queryParams),this._queryParamMap}toString(){return KR.serialize(this)}},ct=class{segments;children;parent=null;constructor(e,t){this.segments=e,this.children=t,Object.values(t).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Dd(this)}},Hr=class{path;parameters;_parameterMap;constructor(e,t){this.path=e,this.parameters=t}get parameterMap(){return this._parameterMap??=Hs(this.parameters),this._parameterMap}toString(){return $E(this)}};function XR(n,e){return Vs(n,e)&&n.every((t,i)=>Vi(t.parameters,e[i].parameters))}function Vs(n,e){return n.length!==e.length?!1:n.every((t,i)=>t.path===e[i].path)}function YR(n,e){let t=[];return Object.entries(n.children).forEach(([i,r])=>{i===Ve&&(t=t.concat(e(r,i)))}),Object.entries(n.children).forEach(([i,r])=>{i!==Ve&&(t=t.concat(e(r,i)))}),t}var Hc=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:()=>new zr})}return n})(),zr=class{parse(e){let t=new ay(e);return new si(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(e){let t=`/${Uo(e.root,!0)}`;ZR(t)&&(t="/");let i=tN(e.queryParams),r=typeof e.fragment=="string"?`#${QR(e.fragment)}`:"";return`${t}${i}${r}`}},AE="http://fake";function ZR(n){try{let e=new URL(n,AE);return e.origin!==AE||e.pathname.startsWith("//")}catch{return!0}}var KR=new zr;function Dd(n){return n.segments.map(e=>$E(e)).join("/")}function Uo(n,e){if(!n.hasChildren())return Dd(n);if(e){let t=n.children[Ve]?Uo(n.children[Ve],!1):"",i=[];return Object.entries(n.children).forEach(([r,s])=>{r!==Ve&&i.push(`${r}:${Uo(s,!1)}`)}),i.length>0?`${t}(${i.join("//")})`:t}else{if(Object.keys(n.children).length===1&&n.children[Ve]!=null)return`${Dd(n)}/${Uo(n.children[Ve],!1)}`;let t=YR(n,(i,r)=>r===Ve?[JR(Uo(n.children[Ve],!1))]:[`${r}:${Uo(i,!1)}`]);return`${Dd(n)}/(${t.join("//")})`}}function JR(n){return n.replace(qE,e=>e.replace(/:/g,"%3A"))}function WE(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function wd(n){return WE(n).replace(/%3B/gi,";")}function QR(n){return encodeURI(n)}function oy(n){return WE(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Id(n){return decodeURIComponent(n)}function RE(n){return Id(n.replace(/\+/g,"%20"))}function $E(n){return`${oy(n.path)}${eN(n.parameters)}`}function eN(n){return Object.entries(n).map(([e,t])=>`;${oy(e)}=${oy(t)}`).join("")}function tN(n){let e=Object.entries(n).map(([t,i])=>Array.isArray(i)?i.map(r=>`${wd(t)}=${wd(r)}`).join("&"):`${wd(t)}=${wd(i)}`).filter(t=>t);return e.length?`?${e.join("&")}`:""}var Qg=1073741824;function Nd(n,e,t){Number(e)>=32&&!Object.hasOwn(n,Qg)&&(n[Qg]=t,delete n[Qg]),n[e]=t}var qE=/^[^\/()?;#]+/;function ey(n){let e=n.match(qE);return e?e[0]:""}var nN=/^[^\/()?;=#]+/;function iN(n){let e=n.match(nN);return e?e[0]:""}var rN=/^[^=?&#]+/;function sN(n){let e=n.match(rN);return e?e[0]:""}var oN=/^[^&#]+/;function aN(n){let e=n.match(oN);return e?e[0]:""}var ay=class{url;remaining;constructor(e){this.url=e,this.remaining=e}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new ct([],{}):new ct([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(e=0){if(e>50)throw new Se(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(!0,e));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1,e)),(t.length>0||Object.keys(i).length>0)&&(r[Ve]=new ct(t,i)),r}parseSegment(){let e=ey(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new Se(4009,!1);return this.capture(e),new Hr(Id(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let t=iN(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let r=ey(this.remaining);r&&(i=r,this.capture(i))}Nd(e,Id(t),Id(i))}parseQueryParam(e){let t=sN(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let o=aN(this.remaining);o&&(i=o,this.capture(i))}let r=RE(t),s=RE(i);if(Object.hasOwn(e,r)){let o=e[r];Array.isArray(o)||(o=[o],e[r]=o),o.push(s)}else e[r]=s}parseParens(e,t){let i=Object.create(null);for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=ey(this.remaining),s=this.remaining[r.length];if(s!=="/"&&s!==")"&&s!==";")throw new Se(4010,!1);let o;r.indexOf(":")>-1?(o=r.slice(0,r.indexOf(":")),this.capture(o),this.capture(":")):e&&(o=Ve);let a=this.parseChildren(t+1),c=Object.keys(a).length===1&&a[Ve]?a[Ve]:new ct([],a);Nd(i,o??Ve,c),this.consumeOptional("//")}return i}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new Se(4011,!1)}};function XE(n){return n.segments.length>0?new ct([],{[Ve]:n}):n}function YE(n){let e=Object.create(null);for(let[i,r]of Object.entries(n.children)){let s=YE(r);if(i===Ve&&s.segments.length===0&&s.hasChildren())for(let[o,a]of Object.entries(s.children))Nd(e,o,a);else(s.segments.length>0||s.hasChildren())&&Nd(e,i,s)}let t=new ct(n.segments,e);return cN(t)}function cN(n){if(n.numberOfChildren===1&&n.children[Ve]){let e=n.children[Ve];return new ct(n.segments.concat(e.segments),e.children)}return n}function zo(n){return n instanceof si}function ZE(n,e,t=null,i=null,r=new zr){let s=KE(n);return JE(s,e,t,i,r)}function KE(n){let e;function t(s){let o={};for(let c of s.children){let l=t(c);o[c.outlet]=l}let a=new ct(s.url,o);return s===n&&(e=a),a}let i=t(n.root),r=XE(i);return e??r}function JE(n,e,t,i,r){let s=n;for(;s.parent;)s=s.parent;if(e.length===0)return ty(s,s,s,t,i,r);let o=lN(e);if(o.toRoot())return ty(s,s,new ct([],{}),t,i,r);let a=uN(o,s,n),c=a.processChildren?Cc(a.segmentGroup,a.index,o.commands):eM(a.segmentGroup,a.index,o.commands);return ty(s,a.segmentGroup,c,t,i,r)}function Pd(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function Rc(n){return typeof n=="object"&&n!=null&&n.outlets}function NE(n,e,t){n||="\u0275";let i=new si;return i.queryParams={[n]:e},t.parse(t.serialize(i)).queryParams[n]}function ty(n,e,t,i,r,s){let o={};for(let[l,u]of Object.entries(i??{}))u!=null&&(o[l]=Array.isArray(u)?u.map(d=>NE(l,d,s)):NE(l,u,s));let a;n===e?a=t:a=QE(n,e,t);let c=XE(YE(a));return new si(c,o,r)}function QE(n,e,t){let i=Object.create(null);return Object.entries(n.children).forEach(([r,s])=>{s===e?i[r]=t:i[r]=QE(s,e,t)}),new ct(n.segments,i)}var Od=class{isAbsolute;numberOfDoubleDots;commands;constructor(e,t,i){if(this.isAbsolute=e,this.numberOfDoubleDots=t,this.commands=i,e&&i.length>0&&Pd(i[0]))throw new Se(4003,!1);let r=i.find(Rc);if(r&&r!==jR(i))throw new Se(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function lN(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new Od(!0,0,n);let e=0,t=!1,i=n.reduce((r,s,o)=>{if(typeof s=="object"&&s!=null){if(s.outlets){let a={};return Object.entries(s.outlets).forEach(([c,l])=>{a[c]=typeof l=="string"?l.split("/"):l}),[...r,{outlets:a}]}if(s.segmentPath)return[...r,s.segmentPath]}return typeof s!="string"?[...r,s]:o===0?(s.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?t=!0:a===".."?e++:a!=""&&r.push(a))}),r):[...r,s]},[]);return new Od(t,e,i)}var Vo=class{segmentGroup;processChildren;index;constructor(e,t,i){this.segmentGroup=e,this.processChildren=t,this.index=i}};function uN(n,e,t){if(n.isAbsolute)return new Vo(e,!0,0);if(!t)return new Vo(e,!1,NaN);if(t.parent===null)return new Vo(t,!0,0);let i=Pd(n.commands[0])?0:1,r=t.segments.length-1+i;return dN(t,r,n.numberOfDoubleDots)}function dN(n,e,t){let i=n,r=e,s=t;for(;s>r;){if(s-=r,i=i.parent,!i)throw new Se(4005,!1);r=i.segments.length}return new Vo(i,!1,r-s)}function fN(n){return Rc(n[0])?n[0].outlets:{[Ve]:n}}function eM(n,e,t){if(n??=new ct([],{}),n.segments.length===0&&n.hasChildren())return Cc(n,e,t);let i=hN(n,e,t),r=t.slice(i.commandIndex);if(i.match&&i.pathIndex<n.segments.length){let s=new ct(n.segments.slice(0,i.pathIndex),{});return s.children[Ve]=new ct(n.segments.slice(i.pathIndex),n.children),Cc(s,0,r)}else return i.match&&r.length===0?new ct(n.segments,{}):i.match&&!n.hasChildren()?cy(n,e,t):i.match?Cc(n,0,r):cy(n,e,t)}function Cc(n,e,t){if(t.length===0)return new ct(n.segments,{});{let i=fN(t),r=Object.create(null);if(Object.keys(i).some(s=>s!==Ve)&&n.children[Ve]&&n.numberOfChildren===1&&n.children[Ve].segments.length===0){let s=Cc(n.children[Ve],e,t);return new ct(n.segments,s.children)}return Object.entries(i).forEach(([s,o])=>{typeof o=="string"&&(o=[o]),o!==null&&(r[s]=eM(n.children[s],e,o))}),Object.entries(n.children).forEach(([s,o])=>{i[s]===void 0&&(r[s]=o)}),new ct(n.segments,r)}}function hN(n,e,t){let i=0,r=e,s={match:!1,pathIndex:0,commandIndex:0};for(;r<n.segments.length;){if(i>=t.length)return s;let o=n.segments[r],a=t[i];if(Rc(a))break;let c=`${a}`,l=i<t.length-1?t[i+1]:null;if(r>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!OE(c,l,o))return s;i+=2}else{if(!OE(c,{},o))return s;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function cy(n,e,t){let i=n.segments.slice(0,e),r=0;for(;r<t.length;){let s=t[r];if(Rc(s)){let c=pN(s.outlets);return new ct(i,c)}if(r===0&&Pd(t[0])){let c=n.segments[e];i.push(new Hr(c.path,PE(t[0]))),r++;continue}let o=Rc(s)?s.outlets[Ve]:`${s}`,a=r<t.length-1?t[r+1]:null;o&&a&&Pd(a)?(i.push(new Hr(o,PE(a))),r+=2):(i.push(new Hr(o,{})),r++)}return new ct(i,{})}function pN(n){let e={};return Object.entries(n).forEach(([t,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(e[t]=cy(new ct([],{}),0,i))}),e}function PE(n){let e={};return Object.entries(n).forEach(([t,i])=>e[t]=`${i}`),e}function OE(n,e,t){return n==t.path&&Vi(e,t.parameters)}var Ld=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(e){this.rootInjector=e,this.children=new zs(this.rootInjector)}resetChildren(){this.children=new zs(this.rootInjector)}},zs=(()=>{class n{rootInjector;contexts=new Map;constructor(t){this.rootInjector=t}onChildOutletCreated(t,i){let r=this.getOrCreateContext(t);r.outlet=i,this.contexts.set(t,r)}onChildOutletDestroyed(t){let i=this.getContext(t);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t}getOrCreateContext(t){let i=this.getContext(t);return i||(i=new Ld(this.rootInjector),this.contexts.set(t,i)),i}getContext(t){return this.contexts.get(t)||null}static \u0275fac=function(i){return new(i||n)(Pe(Rt))};static \u0275prov=Qe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Fd=class{_root;constructor(e){this._root=e}get root(){return this._root.value}parent(e){let t=this.pathFromRoot(e);return t.length>1?t[t.length-2]:null}children(e){let t=ly(e,this._root);return t?t.children.map(i=>i.value):[]}firstChild(e){let t=ly(e,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(e){let t=uy(e,this._root);return t.length<2?[]:t[t.length-2].children.map(r=>r.value).filter(r=>r!==e)}pathFromRoot(e){return uy(e,this._root).map(t=>t.value)}};function ly(n,e){if(n===e.value)return e;for(let t of e.children){let i=ly(n,t);if(i)return i}return null}function uy(n,e){if(n===e.value)return[e];for(let t of e.children){let i=uy(n,t);if(i.length)return i.unshift(e),i}return[]}var _n=class{value;children;constructor(e,t){this.value=e,this.children=t}toString(){return`TreeNode(${this.value})`}};function Bo(n){let e={};return n&&n.children.forEach(t=>e[t.value.outlet]=t),e}var Nc=class extends Fd{snapshot;constructor(e,t){super(e),this.snapshot=t,Sy(this,e)}toString(){return this.snapshot.toString()}};function tM(n,e){let t=mN(n,e),i=new sn([new Hr("",{})]),r=new sn({}),s=new sn({}),o=new sn({}),a=new sn(""),c=new zi(i,r,o,a,s,Ve,n,t.root);return c.snapshot=t.root,new Nc(new _n(c,[]),t)}function mN(n,e){let t={},i={},r={},o=new Go([],t,r,"",i,Ve,n,null,{},e);return new Pc("",new _n(o,[]))}var zi=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;resources;_localInjector;pending;paramsSignal;queryParamsSignal;paramMapSignal;queryParamMapSignal;fragmentSignal;dataSignal;constructor(e,t,i,r,s,o,a,c){this.urlSubject=e,this.paramsSubject=t,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=s,this.outlet=o,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(St(l=>l[Bc]))??Ze(void 0),this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(St(e=>Hs(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(St(e=>Hs(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}_setPending(e){this._futureSnapshot=e,this.pending?.set(!0)}},gN="always";function _y(n,e,t){let i,{routeConfig:r}=n;return e!==null&&(t==="always"||r?.path===""||!e.component&&!e.routeConfig?.loadComponent)?i={params:Object.keys(n.params).length===0?e.params:Object.freeze(he(he({},e.params),n.params)),data:Object.freeze(he(he({},e.data),n.data)),resolve:he(he(he(he({},n.data),e.data),r?.data),n._resolvedData)}:i={params:Object.freeze(he({},n.params)),data:Object.freeze(he({},n.data)),resolve:he(he({},n.data),n._resolvedData??{})},r&&iM(r)&&(i.resolve[Bc]=r.title),i}var Go=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;resources;get title(){return this.data?.[Bc]}constructor(e,t,i,r,s,o,a,c,l,u){this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s,this.outlet=o,this.component=a,this.routeConfig=c,this._resolve=l,this._environmentInjector=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Hs(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Hs(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(i=>i.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${t}')`}},Pc=class extends Fd{url;constructor(e,t){super(t),this.url=e,Sy(this,t)}toString(){return nM(this._root)}};function Sy(n,e){e.value._routerState=n,e.children.forEach(t=>Sy(n,t))}function nM(n){let e=n.children.length>0?` { ${n.children.map(nM).join(", ")} } `:"";return`${n.value}${e}`}function ny(n){if(n.snapshot){let e=n.snapshot,t=n._futureSnapshot;n.snapshot=t,Vi(e.queryParams,t.queryParams)||n.queryParamsSubject.next(t.queryParams),e.fragment!==t.fragment&&n.fragmentSubject.next(t.fragment),Vi(e.params,t.params)||n.paramsSubject.next(t.params),GR(e.url,t.url)||n.urlSubject.next(t.url),Vi(e.data,t.data)||n.dataSubject.next(t.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function dy(n,e){let t=Vi(n.params,e.params)&&XR(n.url,e.url),i=!n.parent!=!e.parent;return t&&!i&&(!n.parent||dy(n.parent,e.parent))}function iM(n){return typeof n.title=="string"||n.title===null}var rM=new Ce(""),zc=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=Ve;activateEvents=new Ut;deactivateEvents=new Ut;attachEvents=new Ut;detachEvents=new Ut;routerOutletData=Ng();parentContexts=te(zs);location=te(Lr);changeDetector=te(Pg);inputBinder=te(Yd,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(t){if(t.name){let{firstChange:i,previousValue:r}=t.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new Se(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new Se(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new Se(4012,!1);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,i){this.activated=t,this._activatedRoute=i,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this,this.location.injector),this.attachEvents.emit(t.instance)}deactivate(){if(this.activated){let t=this.component;this.inputBinder?.unsubscribeFromRouteData(this),this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t)}}activateWith(t,i){if(this.isActivated)throw new Se(4013,!1);this._activatedRoute=t;let r=this.location,o=t.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new fy(t,a,r.injector,this.routerOutletData);this.activated=r.createComponent(o,{index:r.length,injector:c,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this,this.location.injector),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=pc({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[Co]})}return n})(),fy=class{route;childContexts;parent;outletData;constructor(e,t,i,r){this.route=e,this.childContexts=t,this.parent=i,this.outletData=r}get(e,t){return e===zi?this.route:e===zs?this.childContexts:e===rM?this.outletData:this.parent.get(e,t)}},Yd=new Ce("");var xy=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=xi({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&Fr(0,"router-outlet")},dependencies:[zc],encapsulation:2,changeDetection:1})}return n})();function Ey(n){let e=n.children&&n.children.map(Ey),t=e?mt(he({},n),{children:e}):he({},n);return!t.component&&!t.loadComponent&&(e||t.loadChildren)&&t.outlet&&t.outlet!==Ve&&(t.component=xy),t}var Dc="imperative",Jt=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(Jt||{}),Hn=class{id;url;constructor(e,t){this.id=e,this.url=t}},Gs=class extends Hn{type=Jt.NavigationStart;navigationTrigger;restoredState;constructor(e,t,i="imperative",r=null){super(e,t),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},lr=class extends Hn{urlAfterRedirects;type=Jt.NavigationEnd;constructor(e,t,i){super(e,t),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},cn=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(cn||{}),Oc=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(Oc||{}),ri=class extends Hn{reason;code;type=Jt.NavigationCancel;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function sM(n){return n instanceof ri&&(n.code===cn.Redirect||n.code===cn.SupersededByNewNavigation)}var ur=class extends Hn{reason;code;type=Jt.NavigationSkipped;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}},js=class extends Hn{error;target;type=Jt.NavigationError;constructor(e,t,i,r){super(e,t),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Lc=class extends Hn{urlAfterRedirects;state;type=Jt.RoutesRecognized;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},kd=class extends Hn{urlAfterRedirects;state;type=Jt.GuardsCheckStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Ud=class extends Hn{urlAfterRedirects;state;shouldActivate;type=Jt.GuardsCheckEnd;constructor(e,t,i,r,s){super(e,t),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=s}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Bd=class extends Hn{urlAfterRedirects;state;type=Jt.ResolveStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Vd=class extends Hn{urlAfterRedirects;state;type=Jt.ResolveEnd;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Hd=class{route;type=Jt.RouteConfigLoadStart;constructor(e){this.route=e}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},zd=class{route;type=Jt.RouteConfigLoadEnd;constructor(e){this.route=e}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Gd=class{snapshot;type=Jt.ChildActivationStart;constructor(e){this.snapshot=e}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},jd=class{snapshot;type=Jt.ChildActivationEnd;constructor(e){this.snapshot=e}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Wd=class{snapshot;type=Jt.ActivationStart;constructor(e){this.snapshot=e}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},$d=class{snapshot;type=Jt.ActivationEnd;constructor(e){this.snapshot=e}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var jo=class{},Fc=class{},Wo=class{url;navigationBehaviorOptions;constructor(e,t){this.url=e,this.navigationBehaviorOptions=t}};function yN(n){return!(n instanceof jo)&&!(n instanceof Wo)&&!(n instanceof Fc)}function vN(n,e,t){let i=new Set,r=kc(n,e._root,t?t._root:void 0,i);return{newlyCreatedRoutes:i,state:new Nc(r,e)}}function kc(n,e,t,i){if(t&&n.shouldReuseRoute(e.value,t.value.snapshot)){let r=t.value;r._setPending(e.value);let s=_N(n,e,t,i);return new _n(r,s)}else{if(n.shouldAttach(e.value)){let o=n.retrieve(e.value);if(o!==null){let a=o.route;return a.value._setPending(e.value),a.children=e.children.map(c=>kc(n,c,void 0,i)),a}}let r=SN(e.value);r._setPending(e.value),i.add(r);let s=e.children.map(o=>kc(n,o,void 0,i));return new _n(r,s)}}function _N(n,e,t,i){return e.children.map(r=>{for(let s of t.children)if(n.shouldReuseRoute(r.value,s.value.snapshot))return kc(n,r,s,i);return kc(n,r,void 0,i)})}function SN(n){return new zi(new sn(n.url),new sn(n.params),new sn(n.queryParams),new sn(n.fragment),new sn(n.data),n.outlet,n.component,n)}var Gr=class n extends Error{redirectTo;navigationBehaviorOptions;constructor(e,t){super(),this.redirectTo=e,this.navigationBehaviorOptions=t,Object.setPrototypeOf(this,n.prototype)}},oM="ngNavigationCancelingError";function Ic(n,e){let{redirectTo:t,navigationBehaviorOptions:i}=zo(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,r=aM(!1,cn.Redirect);return r.url=t,r.navigationBehaviorOptions=i,r}function aM(n,e){let t=new Error(`NavigationCancelingError: ${n||""}`);return t[oM]=!0,t.cancellationCode=e,t}function xN(n){return cM(n)&&zo(n.url)}function cM(n){return!!n&&n[oM]}var hy=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(e,t,i,r,s){this.routeReuseStrategy=e,this.futureState=t,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=s}activate(e){let t=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,i,e),ny(this.futureState.root),this.activateChildRoutes(t,i,e)}deactivateChildRoutes(e,t,i){let r=Bo(t);e.children.forEach(s=>{let o=s.value.outlet;this.deactivateRoutes(s,r[o],i),delete r[o]}),Object.values(r).forEach(s=>{this.deactivateRouteAndItsChildren(s,i)})}deactivateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(r===s)if(r.component){let o=i.getContext(r.outlet);o&&this.deactivateChildRoutes(e,t,o.children)}else this.deactivateChildRoutes(e,t,i);else s&&this.deactivateRouteAndItsChildren(t,i)}deactivateRouteAndItsChildren(e,t){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,t):this.deactivateRouteAndOutlet(e,t)}detachAndStoreRouteSubtree(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=Bo(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);if(i&&i.outlet){let o=i.outlet.detach(),a=i.children.contexts;i.resetChildren(),this.routeReuseStrategy.store(e.value.snapshot,{componentRef:o,route:e,contexts:a})}}deactivateRouteAndOutlet(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=Bo(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null),e.value._localInjector?.destroy()}activateChildRoutes(e,t,i){let r=Bo(t);e.children.forEach(s=>{this.activateRoutes(s,r[s.value.outlet],i),this.forwardEvent(new $d(s.value.snapshot))}),e.children.length&&this.forwardEvent(new jd(e.value.snapshot))}activateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(ny(r),r===s)if(r.component){let o=i.getOrCreateContext(r.outlet);this.activateChildRoutes(e,t,o.children)}else this.activateChildRoutes(e,t,i);else if(r.component){let o=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),o.children.onOutletReAttached(a.contexts),o.attachRef=a.componentRef,o.route=a.route.value,o.outlet&&o.outlet.attach(a.componentRef,a.route.value),ny(a.route.value),this.activateChildRoutes(e,null,o.children)}else o.attachRef=null,o.route=r,o.outlet&&o.outlet.activateWith(r,o.injector),this.activateChildRoutes(e,null,o.children)}else this.activateChildRoutes(e,null,i)}},qd=class{path;route;constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},Ho=class{component;route;constructor(e,t){this.component=e,this.route=t}};function EN(n,e,t){let i=n._root,r=e?e._root:null;return Tc(i,r,t,[i.value])}function MN(n){let e=n.routeConfig?n.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:n,guards:e}}function qo(n,e){let t=Symbol(),i=e.get(n,t);return i===t?typeof n=="function"&&!Gp(n)?n:e.get(n):i}function Tc(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=Bo(e);return n.children.forEach(o=>{bN(o,s[o.value.outlet],t,i.concat([o.value]),r),delete s[o.value.outlet]}),Object.entries(s).forEach(([o,a])=>Ac(a,t.getContext(o),t,r)),r}function bN(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=n.value,o=e?e.value:null,a=t?t.getContext(n.value.outlet):null;if(o&&s.routeConfig===o.routeConfig){let c=wN(o,s,s.routeConfig.runGuardsAndResolvers);c?r.canActivateChecks.push(new qd(i)):(s.data=o.data,s._resolvedData=o._resolvedData),s.component?Tc(n,e,a?a.children:null,i,r):Tc(n,e,t,i,r),c&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new Ho(a.outlet.component,o))}else o&&Ac(e,a,t,r),r.canActivateChecks.push(new qd(i)),s.component?Tc(n,null,a?a.children:null,i,r):Tc(n,null,t,i,r);return r}function wN(n,e,t){if(typeof t=="function")return Gt(e._environmentInjector,()=>t(n,e));switch(t){case"pathParamsChange":return!Vs(n.url,e.url);case"pathParamsOrQueryParamsChange":return!Vs(n.url,e.url)||!Vi(n.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!dy(n,e)||!Vi(n.queryParams,e.queryParams);default:return!dy(n,e)}}function Ac(n,e,t,i){let r=Bo(n),s=n.value;Object.entries(r).forEach(([o,a])=>{s.component?e?Ac(a,e.children.getContext(o),e.children,i):Ac(a,null,null,i):Ac(a,t?t.getContext(o):null,t,i)}),s.component?e&&e.outlet&&e.outlet.isActivated?i.canDeactivateChecks.push(new Ho(e.outlet.component,s)):i.canDeactivateChecks.push(new Ho(null,s)):i.canDeactivateChecks.push(new Ho(null,s))}function Gc(n){return typeof n=="function"}function TN(n){return typeof n=="boolean"}function CN(n){return n&&Gc(n.canLoad)}function DN(n){return n&&Gc(n.canActivate)}function IN(n){return n&&Gc(n.canActivateChild)}function AN(n){return n&&Gc(n.canDeactivate)}function RN(n){return n&&Gc(n.canMatch)}function lM(n){return n instanceof gs||n?.name==="EmptyError"}var Td=Symbol("INITIAL_VALUE");function $o(){return On(n=>bp(n.map(e=>e.pipe(Cr(1),fo(t=>{if(t instanceof Gr)return Ze(t);throw t}),wp(Td)))).pipe(St(e=>{for(let t of e)if(t!==!0){if(t===Td)return Td;if(t===!1||NN(t))return t}return!0}),fi(e=>e!==Td),Cr(1)))}function NN(n){return zo(n)||n instanceof Gr}function uM(n){return new Je(e=>{if(n.aborted){e.next(),e.complete();return}let t=()=>{e.next(),e.complete()};return n.addEventListener("abort",t),()=>n.removeEventListener("abort",t)})}function dM(n){return Ba(uM(n))}function PN(n){return yn(e=>{let{targetSnapshot:t,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:s}}=e;return s.length===0&&r.length===0?Ze(mt(he({},e),{guardsResult:!0})):ON(s,t,i).pipe(yn(o=>o&&TN(o)?LN(t,r,n):Ze(o)),St(o=>mt(he({},e),{guardsResult:o})))})}function ON(n,e,t){return kt(n).pipe(yn(i=>VN(i.component,i.route,t,e)),Ji(i=>i!==!0,!0))}function LN(n,e,t){return kt(e).pipe(ho(i=>uo(kN(i.route.parent,t),FN(i.route,t),BN(n,i.path),UN(n,i.route))),Ji(i=>i!==!0,!0))}function FN(n,e){return n!==null&&e&&e(new Wd(n)),Ze(!0)}function kN(n,e){return n!==null&&e&&e(new Gd(n)),Ze(!0)}function UN(n,e){let t=e.routeConfig?e.routeConfig.canActivate:null;if(!t||t.length===0)return Ze(!0);let i=t.map(r=>ka(()=>{let s=e._environmentInjector,o=qo(r,s),a=DN(o)?o.canActivate(e,n):Gt(s,()=>o(e,n));return Vc(a).pipe(Ji())}));return Ze(i).pipe($o())}function BN(n,e){let t=e[e.length-1],r=e.slice(0,e.length-1).reverse().map(s=>MN(s)).filter(s=>s!==null).map(s=>ka(()=>{let o=s.guards.map(a=>{let c=s.node._environmentInjector,l=qo(a,c),u=IN(l)?l.canActivateChild(t,n):Gt(c,()=>l(t,n));return Vc(u).pipe(Ji())});return Ze(o).pipe($o())}));return Ze(r).pipe($o())}function VN(n,e,t,i){let r=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!r||r.length===0)return Ze(!0);let s=r.map(o=>{let a=e._environmentInjector,c=qo(o,a);return My(()=>AN(c)?c.canDeactivate(n,e,t,i):Gt(a,()=>c(n,e,t,i))).pipe(Ji())});return Ze(s).pipe($o())}function HN(n,e,t,i,r){let s=e.canLoad;if(s===void 0||s.length===0)return Ze(!0);let o=s.map(a=>{let c=qo(a,n),l=My(()=>CN(c)?c.canLoad(e,t):Gt(n,()=>c(e,t)));return r?l.pipe(dM(r)):l});return Ze(o).pipe($o(),fM(i))}function My(n){try{return Vc(n())}catch(e){return new Je(t=>t.error(e))}}function fM(n){return Zl(Kn(e=>{if(typeof e!="boolean")throw Ic(n,e)}),St(e=>e===!0))}function zN(n,e,t,i,r,s){let o=e.canMatch;if(!o||o.length===0)return Ze(!0);let a=o.map(c=>{let l=qo(c,n);return My(()=>RN(l)?l.canMatch(e,t,r):Gt(n,()=>l(e,t,r))).pipe(dM(s))});return Ze(a).pipe($o(),fM(i))}var Bi=class n extends Error{name="NoMatch";segmentGroup;constructor(e){super(),this.segmentGroup=e||null,Object.setPrototypeOf(this,n.prototype)}},Uc=class n extends Error{urlTree;name="AbsoluteRedirect";constructor(e){super(),this.urlTree=e,Object.setPrototypeOf(this,n.prototype)}};function GN(n){throw new Se(4e3,!1)}function jN(n){throw aM(!1,cn.GuardRejected)}var py=class{urlSerializer;urlTree;constructor(e,t){this.urlSerializer=e,this.urlTree=t}async lineralizeSegments(e,t){let i=[],r=t.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[Ve])throw GN(`${e.redirectTo}`);r=r.children[Ve]}}async applyRedirectCommands(e,t,i,r,s){let o=await WN(t,r,s);if(o instanceof si)throw new Uc(o);let a=this.applyRedirectCreateUrlTree(o,this.urlSerializer.parse(o),e,i);if(o[0]==="/")throw new Uc(a);return a}applyRedirectCreateUrlTree(e,t,i,r){let s=this.createSegmentGroup(e,t.root,i,r);return new si(s,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(e,t){let i={};return Object.entries(e).forEach(([r,s])=>{if(typeof s=="string"&&s[0]===":"){let a=s.substring(1);i[r]=t[a]}else i[r]=s}),i}createSegmentGroup(e,t,i,r){let s=this.createSegments(e,t.segments,i,r),o=Object.create(null);return Object.entries(t.children).forEach(([a,c])=>{o[a]=this.createSegmentGroup(e,c,i,r)}),new ct(s,o)}createSegments(e,t,i,r){return t.map(s=>s.path[0]===":"?this.findPosParam(e,s,r):this.findOrReturn(s,i))}findPosParam(e,t,i){let r=i[t.path.substring(1)];if(!r)throw new Se(4001,!1);return r}findOrReturn(e,t){let i=0;for(let r of t){if(r.path===e.path)return t.splice(i),r;i++}return e}};function WN(n,e,t){if(typeof n=="string")return Promise.resolve(n);let i=n;return Ad(Vc(Gt(t,()=>i(e))))}function $N(n,e){return n.providers&&!n._injector&&(n._injector=fc(n.providers,e,`Route: ${n.path}`)),n._injector??e}function Hi(n){return n.outlet||Ve}function qN(n,e){let t=n.filter(i=>Hi(i)===e);return t.push(...n.filter(i=>Hi(i)!==e)),t}var my={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function hM(n){return{routeConfig:n.routeConfig,url:n.url,params:n.params,queryParams:n.queryParams,fragment:n.fragment,data:n.data,outlet:n.outlet,title:n.title,paramMap:n.paramMap,queryParamMap:n.queryParamMap}}function XN(n,e,t,i,r,s,o){let a=pM(n,e,t);if(!a.matched)return Ze(a);let c=hM(s(a));return i=$N(e,i),zN(i,e,t,r,c,o).pipe(St(l=>l===!0?a:he({},my)))}function pM(n,e,t){if(e.path==="")return e.pathMatch==="full"&&(n.hasChildren()||t.length>0)?he({},my):{matched:!0,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let r=(e.matcher||kE)(t,n,e);if(!r)return he({},my);let s={};Object.entries(r.posParams??{}).forEach(([a,c])=>{s[a]=c.path});let o=r.consumed.length>0?he(he({},s),r.consumed[r.consumed.length-1].parameters):s;return{matched:!0,consumedSegments:r.consumed,remainingSegments:t.slice(r.consumed.length),parameters:o,positionalParamSegments:r.posParams??{}}}function LE(n,e,t,i){return t.length>0&&KN(n,t,i)?{segmentGroup:new ct(e,ZN(i,new ct(t,n.children))),slicedSegments:[]}:t.length===0&&JN(n,t,i)?{segmentGroup:new ct(n.segments,YN(n,t,i,n.children)),slicedSegments:t}:{segmentGroup:new ct(n.segments,n.children),slicedSegments:t}}function YN(n,e,t,i){let r={};for(let s of t)if(Zd(n,e,s)&&!i[Hi(s)]){let o=new ct([],{});r[Hi(s)]=o}return he(he({},i),r)}function ZN(n,e){let t={};t[Ve]=e;for(let i of n)if(i.path===""&&Hi(i)!==Ve){let r=new ct([],{});t[Hi(i)]=r}return t}function KN(n,e,t){return t.some(i=>Zd(n,e,i)&&Hi(i)!==Ve)}function JN(n,e,t){return t.some(i=>Zd(n,e,i))}function Zd(n,e,t){return(n.hasChildren()||e.length>0)&&t.pathMatch==="full"?!1:t.path===""}function QN(n,e,t){return e.length===0&&!n.hasChildren()}var gy=class{};async function e1(n,e,t,i,r,s,o,a){return new yy(n,e,t,i,r,o,s,a).recognize()}var t1=31,yy=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;queryParams;constructor(e,t,i,r,s,o,a,c){this.injector=e,this.configLoader=t,this.rootComponentType=i,this.config=r,this.urlTree=s,this.paramsInheritanceStrategy=o,this.urlSerializer=a,this.abortSignal=c,this.applyRedirects=new py(this.urlSerializer,this.urlTree),this.queryParams=Object.freeze(he({},this.urlTree.queryParams))}noMatchError(e){return new Se(4002,`'${e.segmentGroup}'`)}async recognize(){let e=LE(this.urlTree.root,[],[],this.config).segmentGroup,{children:t,rootSnapshot:i}=await this.match(e),r=new _n(i,t),s=new Pc("",r),o=ZE(i,[],this.urlTree.queryParams,this.urlTree.fragment);return o.queryParams=this.urlTree.queryParams,s.url=this.urlSerializer.serialize(o),{state:s,tree:o}}async match(e){let t=new Go([],Object.freeze({}),this.queryParams,this.urlTree.fragment,Object.freeze({}),Ve,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,e,Ve,t),rootSnapshot:t}}catch(i){if(i instanceof Uc)return this.absoluteRedirectCount++,this.absoluteRedirectCount>t1&&(this.allowRedirects=!1),this.urlTree=i.urlTree,this.queryParams=Object.freeze(he({},this.urlTree.queryParams)),this.match(i.urlTree.root);throw i instanceof Bi?this.noMatchError(i):i}}async processSegmentGroup(e,t,i,r,s){if(i.segments.length===0&&i.hasChildren())return this.processChildren(e,t,i,s);let o=await this.processSegment(e,t,i,i.segments,r,!0,s);return o instanceof _n?[o]:[]}async processChildren(e,t,i,r){let s=[];for(let c of Object.keys(i.children))c==="primary"?s.unshift(c):s.push(c);let o=[];for(let c of s){let l=i.children[c],u=qN(t,c),d=await this.processSegment(e,u,l,l.segments,c,!0,r);d instanceof _n&&o.push(d)}let a=mM(o);return n1(a),a}async processSegment(e,t,i,r,s,o,a){for(let c of t)try{return await this.processSegmentAgainstRoute(c._injector??e,t,c,i,r,s,o,a)}catch(l){if(l instanceof Bi||lM(l))continue;throw l}if(QN(i,r))return new gy;throw new Bi(i)}async processSegmentAgainstRoute(e,t,i,r,s,o,a,c){if(Hi(i)!==o&&(o===Ve||!Zd(r,s,i)||!i.children?.length&&!i.loadChildren||s.length===0&&!r.hasChildren()))throw new Bi(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(e,r,i,s,o,c);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(e,r,t,i,s,o,c);throw new Bi(r)}async expandSegmentAgainstRouteUsingRedirect(e,t,i,r,s,o,a){let{matched:c,parameters:l,consumedSegments:u,positionalParamSegments:d,remainingSegments:f}=pM(t,r,s);if(!c)throw new Bi(t);let h=this.createSnapshot(e,r,s,l,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let g=await this.applyRedirects.applyRedirectCommands(u,r.redirectTo,d,hM(h),e),S=await this.applyRedirects.lineralizeSegments(r,g);return this.processSegment(e,i,t,S.concat(f),o,!1,a)}createSnapshot(e,t,i,r,s){let o=new Go(i,r,this.queryParams,this.urlTree.fragment,s1(t),Hi(t),t.component??t._loadedComponent??null,t,o1(t),e),a=_y(o,s,this.paramsInheritanceStrategy);return o.params=a.params,o.data=a.data,o}async matchSegmentAgainstRoute(e,t,i,r,s,o){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=T=>this.createSnapshot(e,i,T.consumedSegments,T.parameters,o),c=await Ad(XN(t,i,r,e,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(t.children={}),!c?.matched)throw new Bi(t);e=i._injector??e;let{routes:l}=await this.getChildConfig(e,i,r),u=i._loadedInjector??e,{parameters:d,consumedSegments:f,remainingSegments:h}=c,g=this.createSnapshot(e,i,f,d,o),S=Hi(i)===s,{segmentGroup:p,slicedSegments:m}=S?LE(t,f,h,l):{segmentGroup:t,slicedSegments:h};if(S&&m.length===0&&p.hasChildren()){let T=await this.processChildren(u,l,p,g);return new _n(g,T)}if(S&&l.length===0&&m.length===0)return new _n(g,[]);let x=await this.processSegment(u,l,p,m,S?Ve:s,!0,g);if(!S&&!(x instanceof _n))throw new Bi(t);return new _n(g,x instanceof _n?[x]:[])}async getChildConfig(e,t,i){if(t.children)return{routes:t.children,injector:e};if(t.loadChildren){if(t._loadedRoutes!==void 0){let s=t._loadedNgModuleFactory;return s&&!t._loadedInjector&&(t._loadedInjector=s.create(e).injector),{routes:t._loadedRoutes,injector:t._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await Ad(HN(e,t,i,this.urlSerializer,this.abortSignal))){let s=await this.configLoader.loadChildren(e,t);return t._loadedRoutes=s.routes,t._loadedInjector=s.injector,t._loadedNgModuleFactory=s.factory,s}throw jN(t)}return{routes:[],injector:e}}};function n1(n){n.sort((e,t)=>e.value.outlet===Ve?-1:t.value.outlet===Ve?1:e.value.outlet.localeCompare(t.value.outlet))}function i1(n){let e=n.value.routeConfig;return e&&e.path===""}function mM(n){let e=[],t=new Set;for(let r of n){if(!i1(r)){e.push(r);continue}let s=e.find(o=>r.value.routeConfig===o.value.routeConfig);s!==void 0?(s.children.push(...r.children),t.add(s)):e.push(r)}for(let r of t){let s=mM(r.children);e.push(new _n(r.value,s))}let i=e.filter(r=>!t.has(r));return r1(i),i}function r1(n){let e=Object.create(null);n.forEach(t=>{let i=e[t.value.outlet];if(i){let r=i.url.map(o=>o.toString()).join("/"),s=t.value.url.map(o=>o.toString()).join("/");throw new Se(4006,!1)}e[t.value.outlet]=t.value})}function s1(n){return n.data||{}}function o1(n){return n.resolve||{}}function a1(n,e,t,i,r,s,o){return yn(async a=>{let{state:c,tree:l}=await e1(n,e,t,i,a.extractedUrl,r,s,o);return mt(he({},a),{targetSnapshot:c,urlAfterRedirects:l})})}function c1(n){return yn(e=>{let{targetSnapshot:t,guards:{canActivateChecks:i}}=e;if(!i.length)return Ze(e);let r=new Set(i.map(a=>a.route)),s=new Set;for(let a of r)if(!s.has(a))for(let c of gM(a))s.add(c);let o=0;return kt(s).pipe(ho(a=>r.has(a)?l1(a,t,n):(a.data=_y(a,a.parent,n).resolve,Ze(void 0))),Kn(()=>o++),du(1),yn(a=>o===s.size?Ze(e):on))})}function gM(n){let e=n.children.map(t=>gM(t)).flat();return[n,...e]}function l1(n,e,t){let i=n.routeConfig,r=n._resolve;return i?.title!==void 0&&!iM(i)&&(r[Bc]=i.title),ka(()=>(n.data=_y(n,n.parent,t).resolve,u1(r,n,e).pipe(St(s=>(n._resolvedData=s,n.data=he(he({},n.data),s),null)))))}function u1(n,e,t){let i=ry(n);if(i.length===0)return Ze({});let r={};return kt(i).pipe(yn(s=>d1(n[s],e,t).pipe(Ji(),Kn(o=>{if(o instanceof Gr)throw Ic(new zr,o);r[s]=o}))),du(1),St(()=>r),fo(s=>lM(s)?on:Mp(s)))}function d1(n,e,t){let i=e._environmentInjector,r=qo(n,i),s=r.resolve?r.resolve(e,t):Gt(i,()=>r(e,t));return Vc(s)}var yM=new Ce("");function vy(n){return On(e=>{let t=n(e);return t?kt(t).pipe(St(()=>e)):Ze(e)})}var by=(()=>{class n{buildTitle(t){let i,r=t.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(s=>s.outlet===Ve);return i}getResolvedTitleForRoute(t){return t.data[Bc]}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:()=>te(vM)})}return n})(),vM=(()=>{class n extends by{title;constructor(t){super(),this.title=t}updateTitle(t){let i=this.buildTitle(t);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||n)(Pe(IE))};static \u0275prov=Qe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),jc=new Ce("",{factory:()=>({})}),Wc=new Ce(""),_M=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=te(Ig);async loadComponent(t,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let s=await BE(Gt(t,()=>i.loadComponent())),o=await xM(Rg(s));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=o,o}finally{this.componentLoaders.delete(i)}})();return this.componentLoaders.set(i,r),r}loadChildren(t,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let s=await SM(i,this.compiler,t,this.onLoadEndListener);return i._loadedRoutes=s.routes,i._loadedInjector=s.injector,i._loadedNgModuleFactory=s.factory,s}finally{this.childrenLoaders.delete(i)}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})();async function SM(n,e,t,i){let r=await BE(Gt(t,()=>n.loadChildren())),s=await xM(Rg(r)),o;s instanceof td||Array.isArray(s)?o=s:o=await e.compileModuleAsync(s),i&&i(n);let a,c,l=!1,u;return Array.isArray(o)?(c=o,l=!0):(a=o.create(t).injector,u=o,c=a.get(Wc,[],{optional:!0,self:!0}).flat()),{routes:c.map(Ey),injector:a,factory:u}}async function xM(n){return n}var Kd=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:()=>te(f1)})}return n})(),f1=(()=>{class n{shouldProcessUrl(t){return!0}extract(t){return t}merge(t,i){return t}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})(),EM=new Ce("");var h1=()=>{},MM=new Ce(""),bM=(()=>{class n{currentNavigation=sr(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=sr(null);events=new Ft;transitionAbortWithErrorSubject=new Ft;configLoader=te(_M);environmentInjector=te(Rt);destroyRef=te(pi);urlSerializer=te(Hc);rootContexts=te(zs);location=te(Bs);inputBindingEnabled=te(Yd,{optional:!0})!==null;titleStrategy=te(by);options=te(jc,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||gN;urlHandlingStrategy=te(Kd);createViewTransition=te(EM,{optional:!0});navigationErrorHandler=te(MM,{optional:!0});routerResourcesFeature=te(yM,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>Ze(void 0);rootComponentType=null;destroyed=!1;constructor(){let t=r=>this.events.next(new Hd(r)),i=r=>this.events.next(new zd(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=t,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(t){let i=++this.navigationId;ni(()=>{this.transitions?.next(mt(he({},t),{extractedUrl:this.urlHandlingStrategy.extract(t.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(t){return this.transitions=new sn(null),this.transitions.pipe(fi(i=>i!==null),On(i=>{let r=!0,s=!1,o=new AbortController,a=()=>!s&&this.currentTransition?.id===i.id;return Ze(i).pipe(On(c=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",cn.SupersededByNewNavigation),on;this.currentTransition=i;let l=this.lastSuccessfulNavigation();this.currentNavigation.set({id:c.id,initialUrl:c.rawUrl,extractedUrl:c.extractedUrl,targetBrowserUrl:typeof c.extras.browserUrl=="string"?this.urlSerializer.parse(c.extras.browserUrl):c.extras.browserUrl,trigger:c.source,extras:c.extras,previousNavigation:l?mt(he({},l),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:c.routesRecognizeHandler,beforeActivateHandler:c.beforeActivateHandler});let u=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),d=c.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!u&&d!=="reload")return this.events.next(new ur(c.id,this.urlSerializer.serialize(c.rawUrl),"",Oc.IgnoredSameUrlNavigation)),c.resolve(!1),on;if(this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))return Ze(c).pipe(On(f=>(this.events.next(new Gs(f.id,this.urlSerializer.serialize(f.extractedUrl),f.source,f.restoredState)),f.id!==this.navigationId?on:Promise.resolve(f))),a1(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),Kn(f=>{i.targetSnapshot=f.targetSnapshot,i.urlAfterRedirects=f.urlAfterRedirects,this.currentNavigation.update(h=>(h.finalUrl=f.urlAfterRedirects,h)),this.events.next(new Fc)}),On(f=>kt(i.routesRecognizeHandler.deferredHandle??Ze(void 0)).pipe(St(()=>f))),Kn(()=>{let f=new Lc(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(f)}));if(u&&this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)){let{id:f,extractedUrl:h,source:g,restoredState:S,extras:p}=c,m=new Gs(f,this.urlSerializer.serialize(h),g,S);this.events.next(m);let x=tM(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=mt(he({},c),{targetSnapshot:x,urlAfterRedirects:h,extras:mt(he({},p),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(T=>(T.finalUrl=h,T)),Ze(i)}else return this.events.next(new ur(c.id,this.urlSerializer.serialize(c.extractedUrl),"",Oc.IgnoredByUrlHandlingStrategy)),c.resolve(!1),on}),St(c=>{let l=new kd(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);return this.events.next(l),this.currentTransition=i=mt(he({},c),{guards:EN(c.targetSnapshot,c.currentSnapshot,this.rootContexts)}),i}),PN(c=>this.events.next(c)),On(c=>{if(i.guardsResult=c.guardsResult,c.guardsResult&&typeof c.guardsResult!="boolean")throw Ic(this.urlSerializer,c.guardsResult);let l=new Ud(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot,!!c.guardsResult);if(this.events.next(l),!a())return on;if(!c.guardsResult)return this.cancelNavigationTransition(c,"",cn.GuardRejected),on;if(c.guards.canActivateChecks.length===0)return Ze(c);let u=new Bd(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);if(this.events.next(u),!a())return on;let d=!1;return Ze(c).pipe(c1(this.paramsInheritanceStrategy),Kn({next:()=>{d=!0;let f=new Vd(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(f)},complete:()=>{d||this.cancelNavigationTransition(c,"",cn.NoDataFromResolver)}}))}),vy(c=>{let l=d=>{let f=[];if(d.routeConfig?._loadedComponent)d.component=d.routeConfig?._loadedComponent;else if(d.routeConfig?.loadComponent){let h=d._environmentInjector;f.push(this.configLoader.loadComponent(h,d.routeConfig).then(g=>{d.component=g}))}for(let h of d.children)f.push(...l(h));return f},u=l(c.targetSnapshot.root);return u.length===0?Ze(c):kt(Promise.all(u).then(()=>c))}),On(c=>{let{newlyCreatedRoutes:l,state:u}=vN(t.routeReuseStrategy,c.targetSnapshot,c.currentRouterState);return this.currentTransition=i=c=mt(he({},c),{targetRouterState:u,newlyCreatedRoutes:l}),this.currentNavigation.update(d=>(d.targetRouterState=u,d)),Ze(c)}),this.routerResourcesFeature?.setupAndRunResources(o.signal)??(c=>c),vy(()=>this.afterPreactivation()),On(()=>{let{currentSnapshot:c,targetSnapshot:l}=i,u=this.createViewTransition?.(this.environmentInjector,c.root,l.root,i.hasUAVisualTransition);return u?kt(u).pipe(St(()=>i)):Ze(i)}),Cr(1),On(c=>{r=!1,this.events.next(new jo);let l=i.beforeActivateHandler.deferredHandle;return l?kt(l.then(()=>c)):Ze(c)}),Kn(c=>{new hy(t.routeReuseStrategy,i.targetRouterState,i.currentRouterState,l=>this.events.next(l),this.inputBindingEnabled).activate(this.rootContexts),c.newlyCreatedRoutes?.clear(),a()&&(wM(c.targetRouterState),s=!0,this.currentNavigation.update(l=>(l.abort=h1,l)),this.lastSuccessfulNavigation.set(ni(this.currentNavigation)),this.events.next(new lr(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects))),this.titleStrategy?.updateTitle(c.targetRouterState.snapshot),c.resolve(!0))}),Ba(uM(o.signal).pipe(fi(()=>!s&&r),Kn(()=>{this.cancelNavigationTransition(i,o.signal.reason+"",cn.Aborted)}))),Kn({complete:()=>{s=!0}}),Ba(this.transitionAbortWithErrorSubject.pipe(Kn(c=>{throw c}))),Ua(()=>{o.abort(),s||this.cancelNavigationTransition(i,"",cn.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),fo(c=>{if(s=!0,FE(i),this.destroyed)return i.resolve(!1),on;if(c instanceof Gr&&(c=Ic(this.urlSerializer,c)),cM(c))this.events.next(new ri(i.id,this.urlSerializer.serialize(i.extractedUrl),c.message,c.cancellationCode)),xN(c)?this.events.next(new Wo(c.url,c.navigationBehaviorOptions)):i.resolve(!1);else{let l=new js(i.id,this.urlSerializer.serialize(i.extractedUrl),c,i.targetSnapshot??void 0);try{let u=Gt(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(u instanceof Gr){let{message:d,cancellationCode:f}=Ic(this.urlSerializer,u);this.events.next(new ri(i.id,this.urlSerializer.serialize(i.extractedUrl),d,f)),this.events.next(new Wo(u.redirectTo,u.navigationBehaviorOptions))}else throw this.events.next(l),c}catch(u){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(u)}}return on}))}))}cancelNavigationTransition(t,i,r){FE(t);let s=new ri(t.id,this.urlSerializer.serialize(t.extractedUrl),i,r);this.events.next(s),t.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let t=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=ni(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return t.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})();function p1(n){return n!==Dc}function FE(n){for(let e of n.newlyCreatedRoutes??[])e._localInjector?.destroy(),e._localInjector=void 0;wM(n.targetRouterState)}function wM(n){if(!n)return;let e=t=>{t.value.pending?.set(!1),t.children.forEach(e)};e(n._root)}var TM=new Ce("");var CM=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:()=>te(m1)})}return n})(),Xd=class{shouldDetach(e){return!1}store(e,t){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,t){return e.routeConfig===t.routeConfig}shouldDestroyInjector(e){return!0}},m1=(()=>{class n extends Xd{static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})(),wy=(()=>{class n{urlSerializer=te(Hc);options=te(jc,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=te(Bs);urlHandlingStrategy=te(Kd);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new si;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:t,initialUrl:i,targetBrowserUrl:r}){let s=t!==void 0?this.urlHandlingStrategy.merge(t,i):i,o=r??s;return o instanceof si?this.urlSerializer.serialize(o):o}routerUrlState(t){return t?.targetBrowserUrl===void 0||t?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(t.finalUrl)}}commitTransition({targetRouterState:t,finalUrl:i,initialUrl:r}){i&&t?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=t):this.rawUrlTree=r}routerState=tM(null,te(Rt));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:()=>te(g1)})}return n})(),g1=(()=>{class n extends wy{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{t(i.url,i.state,"popstate",{replaceUrl:!0},i.hasUAVisualTransition)})})}handleRouterEvent(t,i){t instanceof Gs?this.updateStateMemento():t instanceof ur?this.commitTransition(i):t instanceof Lc?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof jo?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof ri?sM(t)?t.code===cn.Redirect&&this.routerState===i.targetRouterState&&this.resetInternalState(i):this.restoreHistory(i):t instanceof js?this.restoreHistory(i,!0):t instanceof lr&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId)}setBrowserUrl(t,i){let{extras:r,id:s}=i,{replaceUrl:o,state:a}=r;if(this.location.isCurrentPathEqualTo(t)||o){let c=this.browserPageId,l=he(he({},a),this.generateNgRouterState(s,c,i));this.location.replaceState(t,"",l)}else{let c=he(he({},a),this.generateNgRouterState(s,this.browserPageId+1,i));this.location.go(t,"",c)}}restoreHistory(t,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,s=this.currentPageId-r;s!==0?this.location.historyGo(s):this.getCurrentUrlTree()===t.finalUrl&&s===0&&(this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:t}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(t,i,r){return this.canceledNavigationResolution==="computed"?he({navigationId:t,\u0275routerPageId:i},this.routerUrlState(r)):he({navigationId:t},this.routerUrlState(r))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})();function Ty(n,e){n.events.pipe(fi(t=>t instanceof lr||t instanceof ri||t instanceof js||t instanceof ur),St(t=>t instanceof lr||t instanceof ur?0:(t instanceof ri?t.code===cn.Redirect||t.code===cn.SupersededByNewNavigation:!1)?2:1),fi(t=>t!==2),Cr(1)).subscribe(()=>{e()})}var Jd=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=te(wg);stateManager=te(wy);options=te(jc,{optional:!0})||{};pendingTasks=te(rr);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=te(bM);urlSerializer=te(Hc);location=te(Bs);urlHandlingStrategy=te(Kd);injector=te(Rt);_events=new Ft;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=te(CM);injectorCleanup=te(TM,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=te(Wc,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!te(Yd,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:t=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new rn;subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,s=ni(this.navigationTransitions.currentNavigation);if(r!==null&&s!==null){if(this.stateManager.handleRouterEvent(i,s),i instanceof ri&&i.code!==cn.Redirect&&i.code!==cn.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof lr)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof Wo){let o=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),c=he({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||p1(r.source)},o);this.scheduleNavigation(a,Dc,null,c,r.hasUAVisualTransition,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}yN(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(t)}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Dc,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,i,r,s,o)=>{this.navigateToSyncWithBrowser(t,r,i,s,o)})}navigateToSyncWithBrowser(t,i,r,s,o){let a=r?.navigationId?r:null,c=r?.\u0275routerUrl??t;if(r?.\u0275routerUrl&&(s=mt(he({},s),{browserUrl:t})),r){let u=he({},r);delete u.navigationId,delete u.\u0275routerPageId,delete u.\u0275routerUrl,Object.keys(u).length!==0&&(s.state=u)}let l=this.parseUrl(c);this.scheduleNavigation(l,i,a,s,o).catch(u=>{this.disposed||this.injector.get(vi)(u)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return ni(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(Ey),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(t,i={}){let{relativeTo:r,queryParams:s,fragment:o,queryParamsHandling:a,preserveFragment:c}=i,l=c?this.currentUrlTree.fragment:o,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=he(he({},this.currentUrlTree.queryParams),s);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=s||null}let d;try{let f=r?r.snapshot:this.routerState.snapshot.root;d=KE(f)}catch{(typeof t[0]!="string"||t[0][0]!=="/")&&(t=[]),d=this.currentUrlTree.root}return JE(d,t,u,l??null,this.urlSerializer)}navigateByUrl(t,i={skipLocationChange:!1}){let r=zo(t)?t:this.parseUrl(t),s=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(s,Dc,null,i)}navigate(t,i={skipLocationChange:!1}){return y1(t),this.navigateByUrl(this.createUrlTree(t,i),i)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch{return this.console.warn(xs(4018,!1)),this.urlSerializer.parse("/")}}isActive(t,i){let r;if(i===!0?r=he({},HE):i===!1?r=he({},Rd):r=he(he({},Rd),i),zo(t))return sy(this.currentUrlTree,t,r);let s=this.parseUrl(t);return sy(this.currentUrlTree,s,r)}scheduleNavigation(t,i,r,s,o,a){if(this.disposed)return Promise.resolve(!1);let c,l,u;a?(c=a.resolve,l=a.reject,u=a.promise):u=new Promise((f,h)=>{c=f,l=h});let d=this.pendingTasks.add();return Ty(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(d))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:s,hasUAVisualTransition:o,resolve:c,reject:l,promise:u,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),u.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=At({token:n,factory:n.\u0275fac})}return n})();function y1(n){for(let e=0;e<n.length;e++)if(n[e]==null)throw new Se(4008,!1)}var S1=new Ce("");function Cy(n,...e){return ws([{provide:Wc,multi:!0,useValue:n},{provide:zi,useFactory:x1},{provide:id,multi:!0,useFactory:M1},e.map(t=>t.\u0275providers)])}function x1(){return te(Jd).routerState.root}function E1(n,e){return{\u0275kind:n,\u0275providers:e}}function M1(){let n=te(Jn);return e=>{let t=n.get(No);if(e!==t.components[0])return;let i=n.get(Jd),r=n.get(b1);n.get(w1)===1&&i.initialNavigation(),n.get(T1,null,{optional:!0})?.setUpPreloading(),n.get(S1,null,{optional:!0})?.init(),i.resetRootComponentType(t.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var b1=new Ce("",{factory:()=>new Ft}),w1=new Ce("",{factory:()=>1});var T1=new Ce("");function Dy(){return E1(6,[{provide:Vr,useClass:zg}])}var I1=new Set(["organization","person","case","event","document"]),A1=new Set(["organizational","historical","judicial","event","documentary"]),R1=new Set(["established","alleged","disputed","archived"]),Qd=n=>typeof n=="object"&&n!==null&&!Array.isArray(n);function jr(n,e,t,i){let r=n[e];return typeof r!="string"||r.trim().length===0?(i.push({path:`${t}.${e}`,message:"Cha\xEEne non vide requise"}),""):r}function DM(n,e,t){return!Array.isArray(n)||n.length===0?(t.push({path:e,message:"Au moins une source est requise"}),!1):(n.forEach((i,r)=>{if(!Qd(i)){t.push({path:`${e}[${r}]`,message:"Objet source requis"});return}for(let s of["id","title","publisher","publishedAt"])jr(i,s,`${e}[${r}]`,t)}),!0)}function IM(n){let e=[];if(!Qd(n))return{success:!1,issues:[{path:"$",message:"Objet graphe requis"}]};for(let r of["id","title","description","notice","updatedAt"])jr(n,r,"$",e);n.schemaVersion!=="1.0"&&e.push({path:"$.schemaVersion",message:"Version 1.0 requise"}),Array.isArray(n.nodes)||e.push({path:"$.nodes",message:"Tableau requis"}),Array.isArray(n.edges)||e.push({path:"$.edges",message:"Tableau requis"});let t=new Set;Array.isArray(n.nodes)&&n.nodes.forEach((r,s)=>{let o=`$.nodes[${s}]`;if(!Qd(r)){e.push({path:o,message:"Objet n\u0153ud requis"});return}let a=jr(r,"id",o,e);t.has(a)&&e.push({path:`${o}.id`,message:`Identifiant dupliqu\xE9: ${a}`}),t.add(a);for(let c of["label","summary","description"])jr(r,c,o,e);I1.has(r.category)||e.push({path:`${o}.category`,message:"Cat\xE9gorie inconnue"}),DM(r.sources,`${o}.sources`,e)});let i=new Set;return Array.isArray(n.edges)&&n.edges.forEach((r,s)=>{let o=`$.edges[${s}]`;if(!Qd(r)){e.push({path:o,message:"Objet relation requis"});return}let a=jr(r,"id",o,e);i.has(a)&&e.push({path:`${o}.id`,message:`Identifiant dupliqu\xE9: ${a}`}),i.add(a);let c=jr(r,"source",o,e),l=jr(r,"target",o,e);for(let u of["label","description","lastVerifiedAt"])jr(r,u,o,e);t.has(c)||e.push({path:`${o}.source`,message:`N\u0153ud inconnu: ${c}`}),t.has(l)||e.push({path:`${o}.target`,message:`N\u0153ud inconnu: ${l}`}),c===l&&e.push({path:o,message:"Une relation ne peut pas se relier elle-m\xEAme"}),A1.has(r.type)||e.push({path:`${o}.type`,message:"Type inconnu"}),R1.has(r.documentaryStatus)||e.push({path:`${o}.documentaryStatus`,message:"Statut inconnu"}),DM(r.sources,`${o}.sources`,e)}),e.length===0?{success:!0,data:n,issues:e}:{success:!1,issues:e}}var ef=class extends Error{constructor(e){super(`Graphe invalide (${e.length} erreur${e.length>1?"s":""})`),this.issues=e,this.name="GraphValidationError"}};var tf=class{constructor(e="data/v1/graphs"){this.baseUrl=e}async loadGraph(e,t){let i=encodeURIComponent(e.replace(/\.json$/u,"")),r=await fetch(`${this.baseUrl.replace(/\/$/u,"")}/${i}.json`,{signal:t});if(!r.ok)throw new Error(`Chargement impossible (${r.status} ${r.statusText})`);let s=IM(await r.json());if(!s.success||!s.data)throw new ef(s.issues);return s.data}};var rs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ss={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},sb=0,ov=1,ob=2;var wl=1,ab=2,xa=3,os=0,Cn=1,qi=2,Ks=0,Ea=1,av=2,cv=3,lv=4,cb=5;var Js=100,lb=101,ub=102,db=103,fb=104,hb=200,pb=201,mb=202,gb=203,uv=204,dv=205,yb=206,vb=207,_b=208,Sb=209,xb=210,Eb=211,Mb=212,bb=213,wb=214,wf=0,Tf=1,Cf=2,ca=3,Df=4,If=5,Af=6,Rf=7,fv=0,Tb=1,Cb=2,Xi=0,hv=1,pv=2,mv=3,gv=4,yv=5,vv=6,_v=7;var Sv=300,Qs=301,Ma=302,lh=303,uh=304,Nf=1e3,ji=1001,Pf=1002,en=1003,Db=1004;var Tl=1005;var Mn=1006,dh=1007;var xr=1008;var Rn=1009,xv=1010,Ev=1011,ba=1012,fh=1013,Di=1014,Ii=1015,Ai=1016,hh=1017,ph=1018,eo=1020,Mv=35902,bv=35899,wv=1021,Tv=1022,Ri=1023,vr=1026,Er=1027,Cv=1028,mh=1029,as=1030,gh=1031;var yh=1033,Cl=33776,Dl=33777,Il=33778,Al=33779,vh=35840,_h=35841,Sh=35842,xh=35843,Eh=36196,Mh=37492,bh=37496,wh=37488,Th=37489,Rl=37490,Ch=37491,Dh=37808,Ih=37809,Ah=37810,Rh=37811,Nh=37812,Ph=37813,Oh=37814,Lh=37815,Fh=37816,kh=37817,Uh=37818,Bh=37819,Vh=37820,Hh=37821,zh=36492,Gh=36494,jh=36495,Wh=36283,$h=36284,Nl=36285,qh=36286;var tl=2300,Of=2301,Mf=2302,Jy=2303,Qy=2400,ev=2401,tv=2402;var Ib=3200;var Xh=0,Ab=1,Mr="",Sn="srgb",nl="srgb-linear",il="linear",ft="srgb";var bf=7680;var Rb=519,Nb=512,Pb=513,Ob=514,Dv=515,Lb=516,Fb=517,Iv=518,Av=519,kb=35044;var Rv="300 es",ai=2e3,la=2001;function N1(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function P1(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function rl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ub(){let n=rl("canvas");return n.style.display="block",n}var AM={},ua=null;function Nv(...n){let e="THREE."+n.shift();ua?ua("log",e,...n):console.log(e,...n)}function Bb(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ne(...n){n=Bb(n);let e="THREE."+n.shift();if(ua)ua("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Le(...n){n=Bb(n);let e="THREE."+n.shift();if(ua)ua("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Zc(...n){let e=n.join(" ");e in AM||(AM[e]=!0,Ne(...n))}function Vb(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var Hb={[wf]:wf,[Cf]:Af,[Df]:Df,[ca]:If,[Tf]:Tf,[Af]:Cf,[Rf]:Rf,[If]:ca},Ti=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],RM=1234567,Kc=Math.PI/180,da=180/Math.PI;function wa(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]+"-"+hn[e&255]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[t&63|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]).toLowerCase()}function Xe(n,e,t){return Math.max(e,Math.min(t,n))}function Pv(n,e){return(n%e+e)%e}function O1(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function L1(n,e,t){return n!==e?(t-n)/(e-n):0}function Jc(n,e,t){return(1-t)*n+t*e}function F1(n,e,t,i){return Jc(n,e,1-Math.exp(-t*i))}function k1(n,e=1){return e-Math.abs(Pv(n,e*2)-e)}function U1(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function B1(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function V1(n,e){return n+Math.floor(Math.random()*(e-n+1))}function H1(n,e){return n+Math.random()*(e-n)}function z1(n){return n*(.5-Math.random())}function G1(n){n!==void 0&&(RM=n);let e=RM+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function j1(n){return n*Kc}function W1(n){return n*da}function $1(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function q1(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ov(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function X1(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+i)/2),u=o((e+i)/2),d=s((e-i)/2),f=o((e-i)/2),h=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,c*d,c*f,a*l);break;case"YZY":n.set(c*f,a*u,c*d,a*l);break;case"ZXZ":n.set(c*d,c*f,a*u,a*l);break;case"XZX":n.set(a*u,c*g,c*h,a*l);break;case"YXY":n.set(c*h,a*u,c*g,a*l);break;case"ZYZ":n.set(c*g,c*h,a*u,a*l);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Lv(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function zb(n,e){if(e.constructor===Float32Array)return n;let t=Lv(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function Gb(n,e){if(e.constructor===Float32Array)return n;let t=Lv(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}var Ta={DEG2RAD:Kc,RAD2DEG:da,generateUUID:wa,clamp:Xe,euclideanModulo:Pv,mapLinear:O1,inverseLerp:L1,lerp:Jc,damp:F1,pingpong:k1,smoothstep:U1,smootherstep:B1,randInt:V1,randFloat:H1,randFloatSpread:z1,seededRandom:G1,degToRad:j1,radToDeg:W1,isPowerOfTwo:$1,ceilPowerOfTwo:q1,floorPowerOfTwo:Ov,setQuaternionFromProperEuler:X1,normalize:Gb,denormalize:zb},_e=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jn=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],h=s[o+1],g=s[o+2],S=s[o+3];if(d!==S||c!==f||l!==h||u!==g){let p=c*f+l*h+u*g+d*S;p<0&&(f=-f,h=-h,g=-g,S=-S,p=-p);let m=1-a;if(p<.9995){let x=Math.acos(p),T=Math.sin(x);m=Math.sin(m*x)/T,a=Math.sin(a*x)/T,c=c*m+f*a,l=l*m+h*a,u=u*m+g*a,d=d*m+S*a}else{c=c*m+f*a,l=l*m+h*a,u=u*m+g*a,d=d*m+S*a;let x=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=x,l*=x,u*=x,d*=x}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[o],f=s[o+1],h=s[o+2],g=s[o+3];return e[t]=a*g+u*d+c*h-l*f,e[t+1]=c*g+u*f+l*d-a*h,e[t+2]=l*g+u*h+a*f-c*d,e[t+3]=u*g-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(s/2),f=c(i/2),h=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"YZX":this._x=f*u*d+l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d-f*h*g;break;case"XZY":this._x=f*u*d-l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d+f*h*g;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(s-l)*h,this._z=(o-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(s-l)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(o-r)/h,this._x=(s+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(NM.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(NM.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Iy.copy(this).projectOnVector(e),this.sub(Iy)}reflect(e){return this.sub(Iy.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Iy=new N,NM=new jn,ke=class{static{this.prototype.isMatrix3=!0}constructor(e,t,i,r,s,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],h=i[5],g=i[8],S=r[0],p=r[3],m=r[6],x=r[1],T=r[4],M=r[7],C=r[2],w=r[5],y=r[8];return s[0]=o*S+a*x+c*C,s[3]=o*p+a*T+c*w,s[6]=o*m+a*M+c*y,s[1]=l*S+u*x+d*C,s[4]=l*p+u*T+d*w,s[7]=l*m+u*M+d*y,s[2]=f*S+h*x+g*C,s[5]=f*p+h*T+g*w,s[8]=f*m+h*M+g*y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*s,h=l*s-o*c,g=t*d+i*f+r*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/g;return e[0]=d*S,e[1]=(r*l-u*i)*S,e[2]=(a*i-r*o)*S,e[3]=f*S,e[4]=(u*t-r*c)*S,e[5]=(r*s-a*t)*S,e[6]=h*S,e[7]=(i*c-l*t)*S,e[8]=(o*t-i*s)*S,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return Zc("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ay.makeScale(e,t)),this}rotate(e){return Zc("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ay.makeRotation(-e)),this}translate(e,t){return Zc("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ay.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ay=new ke,PM=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),OM=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Y1(){let n={enabled:!0,workingColorSpace:nl,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ft&&(r.r=yr(r.r),r.g=yr(r.g),r.b=yr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ft&&(r.r=aa(r.r),r.g=aa(r.g),r.b=aa(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Mr?il:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[o].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[nl]:{primaries:e,whitePoint:i,transfer:il,toXYZ:PM,fromXYZ:OM,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:e,whitePoint:i,transfer:ft,toXYZ:PM,fromXYZ:OM,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),n}var it=Y1();function yr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function aa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Xo,Lf=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Xo===void 0&&(Xo=rl("canvas")),Xo.width=e.width,Xo.height=e.height;let r=Xo.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Xo}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=rl("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=yr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(yr(t[i]/255)*255):t[i]=yr(t[i]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Z1=0,fa=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Z1++}),this.uuid=wa(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ry(r[o].image)):s.push(Ry(r[o]))}else s=Ry(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Ry(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Lf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}var K1=0,Ny=new N,bn=class n extends Ti{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=ji,r=ji,s=Mn,o=xr,a=Ri,c=Rn,l=n.DEFAULT_ANISOTROPY,u=Mr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:K1++}),this.uuid=wa(),this.name="",this.source=new fa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new _e(0,0),this.repeat=new _e(1,1),this.center=new _e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ny).x}get height(){return this.source.getSize(Ny).y}get depth(){return this.source.getSize(Ny).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Nf:e.x=e.x-Math.floor(e.x);break;case ji:e.x=e.x<0?0:1;break;case Pf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Nf:e.y=e.y-Math.floor(e.y);break;case ji:e.y=e.y<0?0:1;break;case Pf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};bn.DEFAULT_IMAGE=null;bn.DEFAULT_MAPPING=Sv;bn.DEFAULT_ANISOTROPY=1;var Tt=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],g=c[9],S=c[2],p=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-S)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+S)<.1&&Math.abs(g+p)<.1&&Math.abs(l+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(l+1)/2,M=(h+1)/2,C=(m+1)/2,w=(u+f)/4,y=(d+S)/4,E=(g+p)/4;return T>M&&T>C?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=w/i,s=y/i):M>C?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=w/r,s=E/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=y/s,r=E/s),this.set(i,r,s,t),this}let x=Math.sqrt((p-g)*(p-g)+(d-S)*(d-S)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(d-S)/x,this.z=(f-u)/x,this.w=Math.acos((l+h+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ff=class extends Ti{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];let r=i.count;for(let s=0;s<r;s++)this.textures[s]=new bn({width:e,height:t,depth:i.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Mn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new fa(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wn=class extends Ff{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},sl=class extends bn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var kf=class extends bn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Et=class n{static{this.prototype.isMatrix4=!0}constructor(e,t,i,r,s,o,a,c,l,u,d,f,h,g,S,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,d,f,h,g,S,p)}set(e,t,i,r,s,o,a,c,l,u,d,f,h,g,S,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=f,m[3]=h,m[7]=g,m[11]=S,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/Yo.setFromMatrixColumn(e,0).length(),s=1/Yo.setFromMatrixColumn(e,1).length(),o=1/Yo.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,h=o*d,g=a*u,S=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+g*l,t[5]=f-S*l,t[9]=-a*c,t[2]=S-f*l,t[6]=g+h*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,g=l*u,S=l*d;t[0]=f+S*a,t[4]=g*a-h,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=S+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,g=l*u,S=l*d;t[0]=f-S*a,t[4]=-o*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=S-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,h=o*d,g=a*u,S=a*d;t[0]=c*u,t[4]=g*l-h,t[8]=f*l+S,t[1]=c*d,t[5]=S*l+f,t[9]=h*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,h=o*l,g=a*c,S=a*l;t[0]=c*u,t[4]=S-f*d,t[8]=g*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+g,t[10]=f-S*d}else if(e.order==="XZY"){let f=o*c,h=o*l,g=a*c,S=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+S,t[5]=o*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=S*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(J1,e,Q1)}lookAt(e,t,i){let r=this.elements;return zn.subVectors(e,t),zn.lengthSq()===0&&(zn.z=1),zn.normalize(),Wr.crossVectors(i,zn),Wr.lengthSq()===0&&(Math.abs(i.z)===1?zn.x+=1e-4:zn.z+=1e-4,zn.normalize(),Wr.crossVectors(i,zn)),Wr.normalize(),nf.crossVectors(zn,Wr),r[0]=Wr.x,r[4]=nf.x,r[8]=zn.x,r[1]=Wr.y,r[5]=nf.y,r[9]=zn.y,r[2]=Wr.z,r[6]=nf.z,r[10]=zn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],h=i[13],g=i[2],S=i[6],p=i[10],m=i[14],x=i[3],T=i[7],M=i[11],C=i[15],w=r[0],y=r[4],E=r[8],L=r[12],R=r[1],O=r[5],F=r[9],G=r[13],A=r[2],z=r[6],Z=r[10],V=r[14],ne=r[3],W=r[7],J=r[11],Q=r[15];return s[0]=o*w+a*R+c*A+l*ne,s[4]=o*y+a*O+c*z+l*W,s[8]=o*E+a*F+c*Z+l*J,s[12]=o*L+a*G+c*V+l*Q,s[1]=u*w+d*R+f*A+h*ne,s[5]=u*y+d*O+f*z+h*W,s[9]=u*E+d*F+f*Z+h*J,s[13]=u*L+d*G+f*V+h*Q,s[2]=g*w+S*R+p*A+m*ne,s[6]=g*y+S*O+p*z+m*W,s[10]=g*E+S*F+p*Z+m*J,s[14]=g*L+S*G+p*V+m*Q,s[3]=x*w+T*R+M*A+C*ne,s[7]=x*y+T*O+M*z+C*W,s[11]=x*E+T*F+M*Z+C*J,s[15]=x*L+T*G+M*V+C*Q,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],S=e[7],p=e[11],m=e[15],x=c*h-l*f,T=a*h-l*d,M=a*f-c*d,C=o*h-l*u,w=o*f-c*u,y=o*d-a*u;return t*(S*x-p*T+m*M)-i*(g*x-p*C+m*w)+r*(g*T-S*C+m*y)-s*(g*M-S*w+p*y)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],c=e[2],l=e[6],u=e[10];return t*(o*u-a*l)-i*(s*u-a*c)+r*(s*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],S=e[13],p=e[14],m=e[15],x=t*a-i*o,T=t*c-r*o,M=t*l-s*o,C=i*c-r*a,w=i*l-s*a,y=r*l-s*c,E=u*S-d*g,L=u*p-f*g,R=u*m-h*g,O=d*p-f*S,F=d*m-h*S,G=f*m-h*p,A=x*G-T*F+M*O+C*R-w*L+y*E;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/A;return e[0]=(a*G-c*F+l*O)*z,e[1]=(r*F-i*G-s*O)*z,e[2]=(S*y-p*w+m*C)*z,e[3]=(f*w-d*y-h*C)*z,e[4]=(c*R-o*G-l*L)*z,e[5]=(t*G-r*R+s*L)*z,e[6]=(p*M-g*y-m*T)*z,e[7]=(u*y-f*M+h*T)*z,e[8]=(o*F-a*R+l*E)*z,e[9]=(i*R-t*F-s*E)*z,e[10]=(g*w-S*M+m*x)*z,e[11]=(d*M-u*w-h*x)*z,e[12]=(a*L-o*O-c*E)*z,e[13]=(t*O-i*L+r*E)*z,e[14]=(S*T-g*C-p*x)*z,e[15]=(u*C-d*T+f*x)*z,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,f=s*l,h=s*u,g=s*d,S=o*u,p=o*d,m=a*d,x=c*l,T=c*u,M=c*d,C=i.x,w=i.y,y=i.z;return r[0]=(1-(S+m))*C,r[1]=(h+M)*C,r[2]=(g-T)*C,r[3]=0,r[4]=(h-M)*w,r[5]=(1-(f+m))*w,r[6]=(p+x)*w,r[7]=0,r[8]=(g+T)*y,r[9]=(p-x)*y,r[10]=(1-(f+S))*y,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let o=Yo.set(r[0],r[1],r[2]).length(),a=Yo.set(r[4],r[5],r[6]).length(),c=Yo.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Mi.copy(this);let l=1/o,u=1/a,d=1/c;return Mi.elements[0]*=l,Mi.elements[1]*=l,Mi.elements[2]*=l,Mi.elements[4]*=u,Mi.elements[5]*=u,Mi.elements[6]*=u,Mi.elements[8]*=d,Mi.elements[9]*=d,Mi.elements[10]*=d,t.setFromRotationMatrix(Mi),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,r,s,o,a=ai,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),g,S;if(c)g=s/(o-s),S=o*s/(o-s);else if(a===ai)g=-(o+s)/(o-s),S=-2*o*s/(o-s);else if(a===la)g=-o/(o-s),S=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=ai,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),g,S;if(c)g=1/(o-s),S=o/(o-s);else if(a===ai)g=-2/(o-s),S=-(o+s)/(o-s);else if(a===la)g=-1/(o-s),S=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=g,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Yo=new N,Mi=new Et,J1=new N(0,0,0),Q1=new N(1,1,1),Wr=new N,nf=new N,zn=new N,LM=new Et,FM=new jn,_r=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],d=r[2],f=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Xe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return LM.makeRotationFromQuaternion(e),this.setFromRotationMatrix(LM,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return FM.setFromEuler(this),this.setFromQuaternion(FM,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_r.DEFAULT_ORDER="XYZ";var ha=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},eP=0,kM=new N,Zo=new jn,dr=new Et,rf=new N,$c=new N,tP=new N,nP=new jn,UM=new N(1,0,0),BM=new N(0,1,0),VM=new N(0,0,1),HM={type:"added"},iP={type:"removed"},Ko={type:"childadded",child:null},Py={type:"childremoved",child:null},wn=class n extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:eP++}),this.uuid=wa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new N,t=new _r,i=new jn,r=new N(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Et},normalMatrix:{value:new ke}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ha,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zo.setFromAxisAngle(e,t),this.quaternion.multiply(Zo),this}rotateOnWorldAxis(e,t){return Zo.setFromAxisAngle(e,t),this.quaternion.premultiply(Zo),this}rotateX(e){return this.rotateOnAxis(UM,e)}rotateY(e){return this.rotateOnAxis(BM,e)}rotateZ(e){return this.rotateOnAxis(VM,e)}translateOnAxis(e,t){return kM.copy(e).applyQuaternion(this.quaternion),this.position.add(kM.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(UM,e)}translateY(e){return this.translateOnAxis(BM,e)}translateZ(e){return this.translateOnAxis(VM,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dr.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?rf.copy(e):rf.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),$c.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dr.lookAt($c,rf,this.up):dr.lookAt(rf,$c,this.up),this.quaternion.setFromRotationMatrix(dr),r&&(dr.extractRotation(r.matrixWorld),Zo.setFromRotationMatrix(dr),this.quaternion.premultiply(Zo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Le("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(HM),Ko.child=e,this.dispatchEvent(Ko),Ko.child=null):Le("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(iP),Py.child=e,this.dispatchEvent(Py),Py.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dr.multiply(e.parent.matrixWorld)),e.applyMatrix4(dr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(HM),Ko.child=e,this.dispatchEvent(Ko),Ko.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($c,e,tP),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($c,nP,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>mt(he({},a),{boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>he({},a)),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};wn.DEFAULT_UP=new N(0,1,0);wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gr=class extends wn{constructor(){super(),this.isGroup=!0,this.type="Group"}},rP={type:"move"},pa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let S of e.hand.values()){let p=t.getJointPose(S,i),m=this._getHandJoint(l,S);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;l.inputState.pinching&&f>h+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(rP)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new gr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},jb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$r={h:0,s:0,l:0},sf={h:0,s:0,l:0};function Oy(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ke=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=it.workingColorSpace){return this.r=e,this.g=t,this.b=i,it.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=it.workingColorSpace){if(e=Pv(e,1),t=Xe(t,0,1),i=Xe(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Oy(o,s,e+1/3),this.g=Oy(o,s,e),this.b=Oy(o,s,e-1/3)}return it.colorSpaceToWorking(this,r),this}setStyle(e,t=Sn){function i(s){s!==void 0&&parseFloat(s)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Sn){let i=jb[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yr(e.r),this.g=yr(e.g),this.b=yr(e.b),this}copyLinearToSRGB(e){return this.r=aa(e.r),this.g=aa(e.g),this.b=aa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Sn){return it.workingToColorSpace(pn.copy(this),e),Math.round(Xe(pn.r*255,0,255))*65536+Math.round(Xe(pn.g*255,0,255))*256+Math.round(Xe(pn.b*255,0,255))}getHexString(e=Sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(pn.copy(this),t);let i=pn.r,r=pn.g,s=pn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(pn.copy(this),t),e.r=pn.r,e.g=pn.g,e.b=pn.b,e}getStyle(e=Sn){it.workingToColorSpace(pn.copy(this),e);let t=pn.r,i=pn.g,r=pn.b;return e!==Sn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL($r),this.setHSL($r.h+e,$r.s+t,$r.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL($r),e.getHSL(sf);let i=Jc($r.h,sf.h,t),r=Jc($r.s,sf.s,t),s=Jc($r.l,sf.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},pn=new Ke;Ke.NAMES=jb;var ol=class extends wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _r,this.environmentIntensity=1,this.environmentRotation=new _r,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},bi=new N,fr=new N,Ly=new N,hr=new N,Jo=new N,Qo=new N,zM=new N,Fy=new N,ky=new N,Uy=new N,By=new Tt,Vy=new Tt,Hy=new Tt,Zr=class n{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),bi.subVectors(e,t),r.cross(bi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){bi.subVectors(r,t),fr.subVectors(i,t),Ly.subVectors(e,t);let o=bi.dot(bi),a=bi.dot(fr),c=bi.dot(Ly),l=fr.dot(fr),u=fr.dot(Ly),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-h-g,g,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,hr)===null?!1:hr.x>=0&&hr.y>=0&&hr.x+hr.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,hr)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,hr.x),c.addScaledVector(o,hr.y),c.addScaledVector(a,hr.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return By.setScalar(0),Vy.setScalar(0),Hy.setScalar(0),By.fromBufferAttribute(e,t),Vy.fromBufferAttribute(e,i),Hy.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(By,s.x),o.addScaledVector(Vy,s.y),o.addScaledVector(Hy,s.z),o}static isFrontFacing(e,t,i,r){return bi.subVectors(i,t),fr.subVectors(e,t),bi.cross(fr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),fr.subVectors(this.a,this.b),bi.cross(fr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;Jo.subVectors(r,i),Qo.subVectors(s,i),Fy.subVectors(e,i);let c=Jo.dot(Fy),l=Qo.dot(Fy);if(c<=0&&l<=0)return t.copy(i);ky.subVectors(e,r);let u=Jo.dot(ky),d=Qo.dot(ky);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0&&c-u>0)return o=c/(c-u),t.copy(i).addScaledVector(Jo,o);Uy.subVectors(e,s);let h=Jo.dot(Uy),g=Qo.dot(Uy);if(g>=0&&h<=g)return t.copy(s);let S=h*l-c*g;if(S<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Qo,a);let p=u*g-h*d;if(p<=0&&d-u>=0&&h-g>=0)return zM.subVectors(s,r),a=(d-u)/(d-u+(h-g)),t.copy(r).addScaledVector(zM,a);let m=1/(p+S+f);return o=S*m,a=f*m,t.copy(i).addScaledVector(Jo,o).addScaledVector(Qo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kr=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(wi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(wi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=wi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,wi):wi.fromBufferAttribute(s,o),wi.applyMatrix4(e.matrixWorld),this.expandByPoint(wi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),of.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),of.copy(i.boundingBox)),of.applyMatrix4(e.matrixWorld),this.union(of)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wi),wi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qc),af.subVectors(this.max,qc),ea.subVectors(e.a,qc),ta.subVectors(e.b,qc),na.subVectors(e.c,qc),qr.subVectors(ta,ea),Xr.subVectors(na,ta),Ws.subVectors(ea,na);let t=[0,-qr.z,qr.y,0,-Xr.z,Xr.y,0,-Ws.z,Ws.y,qr.z,0,-qr.x,Xr.z,0,-Xr.x,Ws.z,0,-Ws.x,-qr.y,qr.x,0,-Xr.y,Xr.x,0,-Ws.y,Ws.x,0];return!zy(t,ea,ta,na,af)||(t=[1,0,0,0,1,0,0,0,1],!zy(t,ea,ta,na,af))?!1:(cf.crossVectors(qr,Xr),t=[cf.x,cf.y,cf.z],zy(t,ea,ta,na,af))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},pr=[new N,new N,new N,new N,new N,new N,new N,new N],wi=new N,of=new Kr,ea=new N,ta=new N,na=new N,qr=new N,Xr=new N,Ws=new N,qc=new N,af=new N,cf=new N,$s=new N;function zy(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){$s.fromArray(n,s);let a=r.x*Math.abs($s.x)+r.y*Math.abs($s.y)+r.z*Math.abs($s.z),c=e.dot($s),l=t.dot($s),u=i.dot($s);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Vt=new N,lf=new _e,sP=0,Wi=class extends Ti{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sP++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=kb,this.updateRanges=[],this.gpuType=Ii,this.version=0,this._normalizationScale=e!==void 0?Lv(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)lf.fromBufferAttribute(this,t),lf.applyMatrix3(e),this.setXY(t,lf.x,lf.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),r=this._normalize(r),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):zb(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Gb(e,this.array)}};var al=class extends Wi{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var cl=class extends Wi{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Pt=class extends Wi{constructor(e,t,i){super(new Float32Array(e),t,i)}},oP=new Kr,Xc=new N,Gy=new N,ma=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):oP.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xc.subVectors(e,this.center);let t=Xc.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Xc,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gy.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xc.copy(e.center).add(Gy)),this.expandByPoint(Xc.copy(e.center).sub(Gy))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},aP=0,oi=new Et,jy=new wn,ia=new N,Gn=new Kr,Yc=new Kr,Qt=new N,Ci=class n extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:aP++}),this.uuid=wa(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(N1(e)?cl:al)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return oi.makeRotationFromQuaternion(e),this.applyMatrix4(oi),this}rotateX(e){return oi.makeRotationX(e),this.applyMatrix4(oi),this}rotateY(e){return oi.makeRotationY(e),this.applyMatrix4(oi),this}rotateZ(e){return oi.makeRotationZ(e),this.applyMatrix4(oi),this}translate(e,t,i){return oi.makeTranslation(e,t,i),this.applyMatrix4(oi),this}scale(e,t,i){return oi.makeScale(e,t,i),this.applyMatrix4(oi),this}lookAt(e){return jy.lookAt(e),jy.updateMatrix(),this.applyMatrix4(jy.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ia).negate(),this.translate(ia.x,ia.y,ia.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Pt(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Gn.setFromBufferAttribute(s),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,Gn.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,Gn.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint(Gn.min),this.boundingBox.expandByPoint(Gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ma);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let i=this.boundingSphere.center;if(Gn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Yc.setFromBufferAttribute(a),this.morphTargetsRelative?(Qt.addVectors(Gn.min,Yc.min),Gn.expandByPoint(Qt),Qt.addVectors(Gn.max,Yc.max),Gn.expandByPoint(Qt)):(Gn.expandByPoint(Yc.min),Gn.expandByPoint(Yc.max))}Gn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Qt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Qt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Qt.fromBufferAttribute(a,l),c&&(ia.fromBufferAttribute(e,l),Qt.add(ia)),r=Math.max(r,i.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Wi(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],c=[],l=new Uint8Array(i.count);for(let L=0;L<i.count;L++)a[L]=new N,c[L]=new N;let u=new N,d=new N,f=new N,h=new _e,g=new _e,S=new _e,p=new N,m=new N;function x(L,R,O){l[L]=l[R]=l[O]=1,u.fromBufferAttribute(i,L),d.fromBufferAttribute(i,R),f.fromBufferAttribute(i,O),h.fromBufferAttribute(s,L),g.fromBufferAttribute(s,R),S.fromBufferAttribute(s,O),d.sub(u),f.sub(u),g.sub(h),S.sub(h);let F=1/(g.x*S.y-S.x*g.y);isFinite(F)&&(p.copy(d).multiplyScalar(S.y).addScaledVector(f,-g.y).multiplyScalar(F),m.copy(f).multiplyScalar(g.x).addScaledVector(d,-S.x).multiplyScalar(F),a[L].add(p),a[R].add(p),a[O].add(p),c[L].add(m),c[R].add(m),c[O].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let L=0,R=T.length;L<R;++L){let O=T[L],F=O.start,G=O.count;for(let A=F,z=F+G;A<z;A+=3)x(e.getX(A+0),e.getX(A+1),e.getX(A+2))}let M=new N,C=new N,w=new N,y=new N;function E(L){w.fromBufferAttribute(r,L),y.copy(w);let R=a[L];M.copy(R),M.sub(w.multiplyScalar(w.dot(R))).normalize(),C.crossVectors(y,R);let F=C.dot(c[L])<0?-1:1;o.setXYZW(L,M.x,M.y,M.z,F)}for(let L=0,R=i.count;L<R;++L)l[L]&&E(L);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Wi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new N,s=new N,o=new N,a=new N,c=new N,l=new N,u=new N,d=new N;if(e)for(let f=0,h=e.count;f<h;f+=3){let g=e.getX(f+0),S=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,S),o.fromBufferAttribute(t,p),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,S),l.fromBufferAttribute(i,p),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Qt.fromBufferAttribute(e,t),Qt.normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),h=0,g=0;for(let S=0,p=c.length;S<p;S++){a.isInterleavedBufferAttribute?h=c[S]*a.data.stride+a.offset:h=c[S]*u;for(let m=0;m<u;m++)f[g++]=l[h++]}return new Wi(f,u,d)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Wy=new N,cP=new N,lP=new ke,xn=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Wy.subVectors(i,t).cross(cP.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(Wy),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||lP.getNormalMatrix(e),r=this.coplanarPoint(Wy).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},uP=0,Jr=class extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uP++}),this.uuid=wa(),this.name="",this.type="Material",this.blending=Ea,this.side=os,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uv,this.blendDst=dv,this.blendEquation=Js,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=ca,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rb,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bf,this.stencilZFail=bf,this.stencilZPass=bf,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new xn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new _e().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _e().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var mr=new N,$y=new N,uf=new N,df=new N,Ys=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=mr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mr.copy(this.origin).addScaledVector(this.direction,t),mr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){$y.copy(e).add(t).multiplyScalar(.5),uf.copy(t).sub(e).normalize(),df.copy(this.origin).sub($y);let s=e.distanceTo(t)*.5,o=-this.direction.dot(uf),a=df.dot(this.direction),c=-df.dot(uf),l=df.lengthSq(),u=Math.abs(1-o*o),d,f,h,g;if(u>0)if(d=o*c-a,f=o*a-c,g=s*u,d>=0)if(f>=-g)if(f<=g){let S=1/u;d*=S,f*=S,h=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-s,-c),s),h=f*(f+2*c)+l):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy($y).addScaledVector(uf,f),h}intersectSphere(e,t){if(e.radius<0)return null;mr.subVectors(e.center,this.origin);let i=mr.dot(this.direction),r=mr.dot(mr)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,mr)!==null}intersectTriangle(e,t,i,r,s){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,d=e.x-o.x,f=e.y-o.y,h=e.z-o.z,g=t.x-o.x,S=t.y-o.y,p=t.z-o.z,m=i.x-o.x,x=i.y-o.y,T=i.z-o.z,M=Math.abs(c),C=Math.abs(l),w=Math.abs(u),y,E,L,R,O,F,G,A,z,Z,V,ne;if(M>=C&&M>=w?(L=c,F=d,z=g,ne=m,c>=0?(y=l,E=u,R=f,O=h,G=S,A=p,Z=x,V=T):(y=u,E=l,R=h,O=f,G=p,A=S,Z=T,V=x)):C>=w?(L=l,F=f,z=S,ne=x,l>=0?(y=u,E=c,R=h,O=d,G=p,A=g,Z=T,V=m):(y=c,E=u,R=d,O=h,G=g,A=p,Z=m,V=T)):(L=u,F=h,z=p,ne=T,u>=0?(y=c,E=l,R=d,O=f,G=g,A=S,Z=m,V=x):(y=l,E=c,R=f,O=d,G=S,A=g,Z=x,V=m)),L===0)return null;let W=y/L,J=E/L,Q=1/L,we=R-W*F,He=O-J*F,X=G-W*z,ge=A-J*z,Ee=Z-W*ne,Ae=V-J*ne,ye=Ee*ge-Ae*X,je=we*Ae-He*Ee,Ot=X*He-ge*we;if(r){if(ye<0||je<0||Ot<0)return null}else if((ye<0||je<0||Ot<0)&&(ye>0||je>0||Ot>0))return null;let Oe=ye+je+Ot;if(Oe===0)return null;let ht=Q*(ye*F+je*z+Ot*ne);return(Oe>0?ht<0:ht>0)?null:this.at(ht/Oe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Uf=class extends Jr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _r,this.combine=fv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},GM=new Et,qs=new Ys,ff=new ma,jM=new N,hf=new N,pf=new N,mf=new N,qy=new N,gf=new N,WM=new N,yf=new N,Tn=class extends wn{constructor(e=new Ci,t=new Uf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){gf.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],d=s[c];u!==0&&(qy.fromBufferAttribute(d,e),o?gf.addScaledVector(qy,u):gf.addScaledVector(qy.sub(t),u))}t.add(gf)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ff.copy(i.boundingSphere),ff.applyMatrix4(s),qs.copy(e.ray).recast(e.near),!(ff.containsPoint(qs.origin)===!1&&(qs.intersectSphere(ff,jM)===null||qs.origin.distanceToSquared(jM)>(e.far-e.near)**2))&&(GM.copy(s).invert(),qs.copy(e.ray).applyMatrix4(GM),!(i.boundingBox!==null&&qs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,qs)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,S=f.length;g<S;g++){let p=f[g],m=o[p.materialIndex],x=Math.max(p.start,h.start),T=Math.min(a.count,Math.min(p.start+p.count,h.start+h.count));for(let M=x,C=T;M<C;M+=3){let w=a.getX(M),y=a.getX(M+1),E=a.getX(M+2);r=vf(this,m,e,i,l,u,d,w,y,E),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),S=Math.min(a.count,h.start+h.count);for(let p=g,m=S;p<m;p+=3){let x=a.getX(p),T=a.getX(p+1),M=a.getX(p+2);r=vf(this,o,e,i,l,u,d,x,T,M),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,S=f.length;g<S;g++){let p=f[g],m=o[p.materialIndex],x=Math.max(p.start,h.start),T=Math.min(c.count,Math.min(p.start+p.count,h.start+h.count));for(let M=x,C=T;M<C;M+=3){let w=M,y=M+1,E=M+2;r=vf(this,m,e,i,l,u,d,w,y,E),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),S=Math.min(c.count,h.start+h.count);for(let p=g,m=S;p<m;p+=3){let x=p,T=p+1,M=p+2;r=vf(this,o,e,i,l,u,d,x,T,M),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function dP(n,e,t,i,r,s,o,a){let c;if(e.side===Cn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===os,a),c===null)return null;yf.copy(a),yf.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(yf);return l<t.near||l>t.far?null:{distance:l,point:yf.clone(),object:n}}function vf(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,hf),n.getVertexPosition(c,pf),n.getVertexPosition(l,mf);let u=dP(n,e,t,i,hf,pf,mf,WM);if(u){let d=new N;Zr.getBarycoord(WM,hf,pf,mf,d),r&&(u.uv=Zr.getInterpolatedAttribute(r,a,c,l,d,new _e)),s&&(u.uv1=Zr.getInterpolatedAttribute(s,a,c,l,d,new _e)),o&&(u.normal=Zr.getInterpolatedAttribute(o,a,c,l,d,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new N,materialIndex:0};Zr.getNormal(hf,pf,mf,f.normal),u.face=f,u.barycoord=d}return u}var Bf=class extends bn{constructor(e=null,t=1,i=1,r,s,o,a,c,l=en,u=en,d,f){super(null,o,a,c,l,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xs=new ma,fP=new _e(.5,.5),_f=new N,Qr=class{constructor(e=new xn,t=new xn,i=new xn,r=new xn,s=new xn,o=new xn){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ai,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],h=s[7],g=s[8],S=s[9],p=s[10],m=s[11],x=s[12],T=s[13],M=s[14],C=s[15];if(r[0].setComponents(l-o,h-u,m-g,C-x).normalize(),r[1].setComponents(l+o,h+u,m+g,C+x).normalize(),r[2].setComponents(l+a,h+d,m+S,C+T).normalize(),r[3].setComponents(l-a,h-d,m-S,C-T).normalize(),i)r[4].setComponents(c,f,p,M).normalize(),r[5].setComponents(l-c,h-f,m-p,C-M).normalize();else if(r[4].setComponents(l-c,h-f,m-p,C-M).normalize(),t===ai)r[5].setComponents(l+c,h+f,m+p,C+M).normalize();else if(t===la)r[5].setComponents(c,f,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xs)}intersectsSprite(e){Xs.center.set(0,0,0);let t=fP.distanceTo(e.center);return Xs.radius=.7071067811865476+t,Xs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xs)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(_f.x=r.normal.x>0?e.max.x:e.min.x,_f.y=r.normal.y>0?e.max.y:e.min.y,_f.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_f)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},$M=new Et,Vf=class n{constructor(){this.coordinateSystem=ai,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];$M.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),i[r]===void 0&&(i[r]=new Qr),i[r].setFromProjectionMatrix($M,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Qr),t[r].copy(i[r]);return this._count=e._count,this}clone(){return new n().copy(this)}};var ll=class extends bn{constructor(e=[],t=Qs,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ul=class extends bn{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Sr=class extends bn{constructor(e,t,i=Di,r,s,o,a=en,c=en,l,u=vr,d=1){if(u!==vr&&u!==Er)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new fa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},dl=class extends Sr{constructor(e,t=Di,i=Qs,r,s,o=en,a=en,c,l=vr){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},fl=class extends bn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ga=class n extends Ci{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],d=[],f=0,h=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Pt(l,3)),this.setAttribute("normal",new Pt(u,3)),this.setAttribute("uv",new Pt(d,2));function g(S,p,m,x,T,M,C,w,y,E,L){let R=M/y,O=C/E,F=M/2,G=C/2,A=w/2,z=y+1,Z=E+1,V=0,ne=0,W=new N;for(let J=0;J<Z;J++){let Q=J*O-G;for(let we=0;we<z;we++){let He=we*R-F;W[S]=He*x,W[p]=Q*T,W[m]=A,l.push(W.x,W.y,W.z),W[S]=0,W[p]=0,W[m]=w>0?1:-1,u.push(W.x,W.y,W.z),d.push(we/y),d.push(1-J/E),V+=1}}for(let J=0;J<E;J++)for(let Q=0;Q<y;Q++){let we=f+Q+z*J,He=f+Q+z*(J+1),X=f+(Q+1)+z*(J+1),ge=f+(Q+1)+z*J;c.push(we,He,ge),c.push(He,X,ge),ne+=6}a.addGroup(h,ne,L),h+=ne,f+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var hl=class n extends Ci{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],f=[],h=[],g=0,S=[],p=i/2,m=0;x(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new Pt(d,3)),this.setAttribute("normal",new Pt(f,3)),this.setAttribute("uv",new Pt(h,2));function x(){let M=new N,C=new N,w=0,y=(t-e)/i;for(let E=0;E<=s;E++){let L=[],R=E/s,O=R*(t-e)+e;for(let F=0;F<=r;F++){let G=F/r,A=G*c+a,z=Math.sin(A),Z=Math.cos(A);C.x=O*z,C.y=-R*i+p,C.z=O*Z,d.push(C.x,C.y,C.z),M.set(z,y,Z).normalize(),f.push(M.x,M.y,M.z),h.push(G,1-R),L.push(g++)}S.push(L)}for(let E=0;E<r;E++)for(let L=0;L<s;L++){let R=S[L][E],O=S[L+1][E],F=S[L+1][E+1],G=S[L][E+1];(e>0||L!==0)&&(u.push(R,O,G),w+=3),(t>0||L!==s-1)&&(u.push(O,F,G),w+=3)}l.addGroup(m,w,0),m+=w}function T(M){let C=g,w=new _e,y=new N,E=0,L=M===!0?e:t,R=M===!0?1:-1;for(let F=1;F<=r;F++)d.push(0,p*R,0),f.push(0,R,0),h.push(.5,.5),g++;let O=g;for(let F=0;F<=r;F++){let A=F/r*c+a,z=Math.cos(A),Z=Math.sin(A);y.x=L*Z,y.y=p*R,y.z=L*z,d.push(y.x,y.y,y.z),f.push(0,R,0),w.x=z*.5+.5,w.y=Z*.5*R+.5,h.push(w.x,w.y),g++}for(let F=0;F<r;F++){let G=C+F,A=O+F;M===!0?u.push(A,A+1,G):u.push(A+1,A,G),E+=3}l.addGroup(m,E,M===!0?1:2),m+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var ci=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ne("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,s=i.length,o;t?o=t:o=e*i[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=i[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===o)return r/(s-1);let u=i[r],f=i[r+1]-u,h=(o-u)/f;return(r+h)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new _e:new N);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new N,r=[],s=[],o=[],a=new N,c=new Et;for(let h=0;h<=e;h++){let g=h/e;r[h]=this.getTangentAt(g,new N)}s[0]=new N,o[0]=new N;let l=Number.MAX_VALUE,u=Math.abs(r[0].x),d=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=l&&(l=u,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let h=1;h<=e;h++){if(s[h]=s[h-1].clone(),o[h]=o[h-1].clone(),a.crossVectors(r[h-1],r[h]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Xe(r[h-1].dot(r[h]),-1,1));s[h].applyMatrix4(c.makeRotationAxis(a,g))}o[h].crossVectors(r[h],s[h])}if(t===!0){let h=Math.acos(Xe(s[0].dot(s[e]),-1,1));h/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(h=-h);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],h*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},pl=class extends ci{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new _e){let i=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,h=l-this.aY;c=f*u-h*d+this.aX,l=f*d+h*u+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Hf=class extends pl{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Fv(){let n=0,e=0,t=0,i=0;function r(s,o,a,c){n=s,e=a,t=-3*s+3*o-2*a-c,i=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,d){let f=(o-s)/l-(a-s)/(l+u)+(a-o)/u,h=(a-o)/u-(c-o)/(u+d)+(c-a)/d;f*=u,h*=u,r(o,a,f,h)},calc:function(s){let o=s*s,a=o*s;return n+e*s+t*o+i*a}}}var qM=new N,XM=new N,Xy=new Fv,Yy=new Fv,Zy=new Fv,zf=class extends ci{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new N){let i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(XM.subVectors(r[0],r[1]).add(r[0]),l=XM);let d=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(qM.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=qM),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(d),h),S=Math.pow(d.distanceToSquared(f),h),p=Math.pow(f.distanceToSquared(u),h);S<1e-4&&(S=1),g<1e-4&&(g=S),p<1e-4&&(p=S),Xy.initNonuniformCatmullRom(l.x,d.x,f.x,u.x,g,S,p),Yy.initNonuniformCatmullRom(l.y,d.y,f.y,u.y,g,S,p),Zy.initNonuniformCatmullRom(l.z,d.z,f.z,u.z,g,S,p)}else this.curveType==="catmullrom"&&(Xy.initCatmullRom(l.x,d.x,f.x,u.x,this.tension),Yy.initCatmullRom(l.y,d.y,f.y,u.y,this.tension),Zy.initCatmullRom(l.z,d.z,f.z,u.z,this.tension));return i.set(Xy.calc(c),Yy.calc(c),Zy.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new N().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function YM(n,e,t,i,r){let s=(i-e)*.5,o=(r-t)*.5,a=n*n,c=n*a;return(2*t-2*i+s+o)*c+(-3*t+3*i-2*s-o)*a+s*n+t}function hP(n,e){let t=1-n;return t*t*e}function pP(n,e){return 2*(1-n)*n*e}function mP(n,e){return n*n*e}function Qc(n,e,t,i){return hP(n,e)+pP(n,t)+mP(n,i)}function gP(n,e){let t=1-n;return t*t*t*e}function yP(n,e){let t=1-n;return 3*t*t*n*e}function vP(n,e){return 3*(1-n)*n*n*e}function _P(n,e){return n*n*n*e}function el(n,e,t,i,r){return gP(n,e)+yP(n,t)+vP(n,i)+_P(n,r)}var Gf=class extends ci{constructor(e=new _e,t=new _e,i=new _e,r=new _e){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new _e){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(el(e,r.x,s.x,o.x,a.x),el(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ya=class extends ci{constructor(e=new N,t=new N,i=new N,r=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new N){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(el(e,r.x,s.x,o.x,a.x),el(e,r.y,s.y,o.y,a.y),el(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},jf=class extends ci{constructor(e=new _e,t=new _e){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new _e){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new _e){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Wf=class extends ci{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$f=class extends ci{constructor(e=new _e,t=new _e,i=new _e){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new _e){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Qc(e,r.x,s.x,o.x),Qc(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ml=class extends ci{constructor(e=new N,t=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new N){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Qc(e,r.x,s.x,o.x),Qc(e,r.y,s.y,o.y),Qc(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qf=class extends ci{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new _e){let i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],d=r[o>r.length-3?r.length-1:o+2];return i.set(YM(a,c.x,l.x,u.x,d.x),YM(a,c.y,l.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new _e().fromArray(r))}return this}},SP=Object.freeze({__proto__:null,ArcCurve:Hf,CatmullRomCurve3:zf,CubicBezierCurve:Gf,CubicBezierCurve3:ya,EllipseCurve:pl,LineCurve:jf,LineCurve3:Wf,QuadraticBezierCurve:$f,QuadraticBezierCurve3:ml,SplineCurve:qf});var Zs=class n extends Ci{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,h=[],g=[],S=[],p=[];for(let m=0;m<u;m++){let x=m*f-o;for(let T=0;T<l;T++){let M=T*d-s;g.push(M,-x,0),S.push(0,0,1),p.push(T/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){let T=x+l*m,M=x+l*(m+1),C=x+1+l*(m+1),w=x+1+l*m;h.push(T,M,w),h.push(M,C,w)}this.setIndex(h),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(S,3)),this.setAttribute("uv",new Pt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var gl=class n extends Ci{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new N,f=new N,h=[],g=[],S=[],p=[];for(let m=0;m<=i;m++){let x=[],T=m/i,M=o+T*a,C=e*Math.cos(M),w=Math.sqrt(e*e-C*C),y=0;m===0&&o===0?y=.5/t:m===i&&c===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){let L=E/t,R=r+L*s;d.x=-w*Math.cos(R),d.y=C,d.z=w*Math.sin(R),g.push(d.x,d.y,d.z),f.copy(d).normalize(),S.push(f.x,f.y,f.z),p.push(L+y,1-T),x.push(l++)}u.push(x)}for(let m=0;m<i;m++)for(let x=0;x<t;x++){let T=u[m][x+1],M=u[m][x],C=u[m+1][x],w=u[m+1][x+1];(m!==0||o>0)&&h.push(T,M,w),(m!==i-1||c<Math.PI)&&h.push(M,C,w)}this.setIndex(h),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(S,3)),this.setAttribute("uv",new Pt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var yl=class n extends Ci{constructor(e=new ml(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:s};let o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new N,c=new N,l=new _e,u=new N,d=[],f=[],h=[],g=[];S(),this.setIndex(g),this.setAttribute("position",new Pt(d,3)),this.setAttribute("normal",new Pt(f,3)),this.setAttribute("uv",new Pt(h,2));function S(){for(let T=0;T<t;T++)p(T);p(s===!1?t:0),x(),m()}function p(T){u=e.getPointAt(T/t,u);let M=o.normals[T],C=o.binormals[T];for(let w=0;w<=r;w++){let y=w/r*Math.PI*2,E=Math.sin(y),L=-Math.cos(y);c.x=L*M.x+E*C.x,c.y=L*M.y+E*C.y,c.z=L*M.z+E*C.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=u.x+i*c.x,a.y=u.y+i*c.y,a.z=u.z+i*c.z,d.push(a.x,a.y,a.z)}}function m(){for(let T=1;T<=t;T++)for(let M=1;M<=r;M++){let C=(r+1)*(T-1)+(M-1),w=(r+1)*T+(M-1),y=(r+1)*T+M,E=(r+1)*(T-1)+M;g.push(C,w,E),g.push(w,y,E)}}function x(){for(let T=0;T<=t;T++)for(let M=0;M<=r;M++)l.x=T/t,l.y=M/r,h.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new n(new SP[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function to(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(ZM(r))r.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(ZM(r[0])){let s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function mn(n){let e={};for(let t=0;t<n.length;t++){let i=to(n[t]);for(let r in i)e[r]=i[r]}return e}function ZM(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function xP(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function kv(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var Wb={clone:to,merge:mn},EP=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,MP=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$i=class extends Jr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=EP,this.fragmentShader=MP,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=to(e.uniforms),this.uniformsGroups=xP(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Ke().setHex(r.value);break;case"v2":this.uniforms[i].value=new _e().fromArray(r.value);break;case"v3":this.uniforms[i].value=new N().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Tt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Et().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Xf=class extends $i{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},es=class extends Jr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xh,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _r,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Yf=class extends Jr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ib,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Zf=class extends Jr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ra(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Sf(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var ts=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Kf=class extends ts{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Qy,endingEnd:Qy}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case ev:s=e,a=2*t-i;break;case tv:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case ev:o=e,c=2*i-t;break;case tv:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,g=(i-t)/(r-t),S=g*g,p=S*g,m=-f*p+2*f*S-f*g,x=(1+f)*p+(-1.5-2*f)*S+(-.5+f)*g+1,T=(-1-h)*p+(1.5+h)*S+.5*g,M=h*p-h*S;for(let C=0;C!==a;++C)s[C]=m*o[u+C]+x*o[l+C]+T*o[c+C]+M*o[d+C];return s}},Jf=class extends ts{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*d+o[c+f]*u;return s}},Qf=class extends ts{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},eh=class extends ts{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let g=(i-t)/(r-t),S=1-g;for(let p=0;p!==a;++p)s[p]=o[l+p]*S+o[c+p]*g;return s}let f=a*2,h=e-1;for(let g=0;g!==a;++g){let S=o[l+g],p=o[c+g],m=h*f+g*2,x=d[m],T=d[m+1],M=e*f+g*2,C=u[M],w=u[M+1],y=wP(i,t,x,C,r);s[g]=$b(y,S,T,w,p)}return s}};function $b(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function bP(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function wP(n,e,t,i,r){let s=(n-e)/(r-e);for(let o=0;o<8;o++){let a=$b(s,e,t,i,r)-n;if(Math.abs(a)<1e-10)break;let c=bP(s,e,t,i,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-a/c))}return s}var $n=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ra(t,this.TimeBufferType),this.values=ra(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ra(e.times,Array),values:ra(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),Sf(e.settings)&&(i.settings={inTangents:ra(e.settings.inTangents,Array),outTangents:ra(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Qf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Jf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Kf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new eh(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case tl:t=this.InterpolantFactoryMethodDiscrete;break;case Of:t=this.InterpolantFactoryMethodLinear;break;case Mf:t=this.InterpolantFactoryMethodSmooth;break;case Jy:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ne("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tl;case this.InterpolantFactoryMethodLinear:return Of;case this.InterpolantFactoryMethodSmooth:return Mf;case this.InterpolantFactoryMethodBezier:return Jy}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e;Sf(this.settings)&&(KM(this.settings.inTangents,e),KM(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;Sf(this.settings)&&(JM(this.settings.inTangents,e),JM(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Le("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Le("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Le("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Le("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&P1(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){Le("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Mf,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,f=d-i,h=d+i;for(let g=0;g!==i;++g){let S=t[d+g];if(S!==t[f+g]||S!==t[h+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,Sf(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function KM(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]+=e}function JM(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}$n.prototype.ValueTypeName="";$n.prototype.TimeBufferType=Float32Array;$n.prototype.ValueBufferType=Float32Array;$n.prototype.DefaultInterpolation=Of;var ns=class extends $n{constructor(e,t,i){super(e,t,i)}};ns.prototype.ValueTypeName="bool";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=tl;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var th=class extends $n{constructor(e,t,i,r){super(e,t,i,r)}};th.prototype.ValueTypeName="color";var nh=class extends $n{constructor(e,t,i,r){super(e,t,i,r)}};nh.prototype.ValueTypeName="number";var ih=class extends ts{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)jn.slerpFlat(s,0,o,l-a,o,l,c);return s}},vl=class extends $n{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new ih(this.times,this.values,this.getValueSize(),e)}};vl.prototype.ValueTypeName="quaternion";vl.prototype.InterpolantFactoryMethodSmooth=void 0;var is=class extends $n{constructor(e,t,i){super(e,t,i)}};is.prototype.ValueTypeName="string";is.prototype.ValueBufferType=Array;is.prototype.DefaultInterpolation=tl;is.prototype.InterpolantFactoryMethodLinear=void 0;is.prototype.InterpolantFactoryMethodSmooth=void 0;var rh=class extends $n{constructor(e,t,i,r){super(e,t,i,r)}};rh.prototype.ValueTypeName="vector";var sh=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=l.length;d<f;d+=2){let h=l[d],g=l[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},qb=new sh,oh=class{constructor(e){this.manager=e!==void 0?e:qb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};oh.DEFAULT_MATERIAL_NAME="__DEFAULT";var _l=class extends wn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var Ky=new Et,QM=new N,eb=new N,ah=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _e(512,512),this.mapType=Rn,this.map=null,this.mapPass=null,this.matrix=new Et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qr,this._frameExtents=new _e(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;QM.setFromMatrixPosition(e.matrixWorld),t.position.copy(QM),eb.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(eb),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){Ky.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Ky,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,o=r?r.z/s.x:1,a=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===la||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(Ky)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},xf=new N,Ef=new jn,Gi=new N,Sl=class extends wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xf,Ef,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xf,Ef,Gi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(xf,Ef,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xf,Ef,Gi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Yr=new N,tb=new _e,nb=new _e,En=class extends Sl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=da*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Kc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return da*2*Math.atan(Math.tan(Kc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Yr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yr.x,Yr.y).multiplyScalar(-e/Yr.z),Yr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Yr.x,Yr.y).multiplyScalar(-e/Yr.z)}getViewSize(e,t){return this.getViewBounds(e,tb,nb),t.subVectors(nb,tb)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Kc*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var xl=class extends Sl{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},nv=class extends ah{constructor(){super(new xl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},va=class extends _l{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wn.DEFAULT_UP),this.updateMatrix(),this.target=new wn,this.shadow=new nv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},El=class extends _l{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var sa=-90,oa=1,_a=class extends wn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new En(sa,oa,e,t);r.layers=this.layers,this.add(r);let s=new En(sa,oa,e,t);s.layers=this.layers,this.add(s);let o=new En(sa,oa,e,t);o.layers=this.layers,this.add(o);let a=new En(sa,oa,e,t);a.layers=this.layers,this.add(a);let c=new En(sa,oa,e,t);c.layers=this.layers,this.add(c);let l=new En(sa,oa,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===ai)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===la)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let S=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.mipmapsAutoUpdate=S,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},ch=class extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var Uv="\\[\\]\\.:\\/",TP=new RegExp("["+Uv+"]","g"),Bv="[^"+Uv+"]",CP="[^"+Uv.replace("\\.","")+"]",DP=/((?:WC+[\/:])*)/.source.replace("WC",Bv),IP=/(WCOD+)?/.source.replace("WCOD",CP),AP=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bv),RP=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bv),NP=new RegExp("^"+DP+IP+AP+RP+"$"),PP=["material","materials","bones","map"],iv=class{constructor(e,t,i){let r=i||Mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Mt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(TP,"")}static parseTrackName(e){let t=NP.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);PP.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let c=i(a.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Le("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Le("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Le("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Le("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Le("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[r];if(o===void 0){let l=t.nodeName;Le("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Mt.Composite=iv;Mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Mt.prototype.GetterByBindingType=[Mt.prototype._getValue_direct,Mt.prototype._getValue_array,Mt.prototype._getValue_arrayElement,Mt.prototype._getValue_toArray];Mt.prototype.SetterByBindingTypeAndVersioning=[[Mt.prototype._setValue_direct,Mt.prototype._setValue_direct_setNeedsUpdate,Mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_array,Mt.prototype._setValue_array_setNeedsUpdate,Mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_arrayElement,Mt.prototype._setValue_arrayElement_setNeedsUpdate,Mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_fromArray,Mt.prototype._setValue_fromArray_setNeedsUpdate,Mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var SY=new Float32Array(1);var ib=new Et,Ml=class{constructor(e,t,i=0,r=1/0){this.ray=new Ys(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new ha,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Le("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ib.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ib),this}intersectObject(e,t=!0,i=[]){return rv(e,this,i,t),i.sort(rb),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)rv(e[r],this,i,t);return i.sort(rb),i}};function rb(n,e){return n.distance-e.distance}function rv(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let o=0,a=s.length;o<a;o++)rv(s[o],e,t,!0)}}var Sa=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Xe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Xe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var sv=class{static{this.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};var bl=class extends Ti{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Vv(n,e,t,i){let r=OP(i);switch(t){case wv:return n*e;case Cv:return n*e/r.components*r.byteLength;case mh:return n*e/r.components*r.byteLength;case as:return n*e*2/r.components*r.byteLength;case gh:return n*e*2/r.components*r.byteLength;case Tv:return n*e*3/r.components*r.byteLength;case Ri:return n*e*4/r.components*r.byteLength;case yh:return n*e*4/r.components*r.byteLength;case Cl:case Dl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Il:case Al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case _h:case xh:return Math.max(n,16)*Math.max(e,8)/4;case vh:case Sh:return Math.max(n,8)*Math.max(e,8)/2;case Eh:case Mh:case wh:case Th:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case bh:case Rl:case Ch:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Dh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ih:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ah:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Rh:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Nh:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ph:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Oh:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Lh:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Fh:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case kh:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Uh:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Bh:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Vh:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Hh:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case zh:case Gh:case jh:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Wh:case $h:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Nl:case qh:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function OP(n){switch(n){case Rn:case xv:return{byteLength:1,components:1};case ba:case Ev:case Ai:return{byteLength:2,components:1};case hh:case ph:return{byteLength:2,components:4};case Di:case fh:case Ii:return{byteLength:4,components:1};case Mv:case bv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function mw(){let n=null,e=!1,t=null,i=null;function r(s,o){i=n.requestAnimationFrame(r),t(s,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function FP(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){let g=d[f],S=d[h];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++f,d[f]=S)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){let S=d[h];n.bufferSubData(l,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var kP=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,UP=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,BP=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,VP=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,HP=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zP=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,GP=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jP=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,WP=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,$P=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qP=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,XP=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,YP=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ZP=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,KP=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,JP=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,QP=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eO=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tO=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nO=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,iO=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rO=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sO=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,oO=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,aO=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,cO=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lO=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,uO=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dO=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fO="gl_FragColor = linearToOutputTexel( gl_FragColor );",hO=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pO=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,mO=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,gO=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,yO=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vO=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_O=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,SO=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xO=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,EO=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,MO=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bO=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wO=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,TO=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CO=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,DO=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,IO=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,AO=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,RO=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,NO=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,PO=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,OO=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,LO=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,FO=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,kO=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,UO=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,BO=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,VO=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,HO=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zO=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,GO=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jO=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,WO=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$O=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qO=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,XO=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,YO=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ZO=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,KO=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JO=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,QO=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eL=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tL=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nL=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iL=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rL=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sL=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,oL=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,aL=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cL=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lL=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uL=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dL=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,fL=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hL=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pL=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mL=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gL=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yL=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vL=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,_L=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,SL=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xL=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,EL=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ML=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,bL=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wL=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,TL=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,CL=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,DL=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,IL=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,AL=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,RL=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,NL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,PL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,LL=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,FL=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kL=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,UL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BL=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HL=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zL=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,GL=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jL=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,WL=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$L=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qL=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XL=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,YL=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ZL=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,KL=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JL=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QL=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eF=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tF=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nF=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iF=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rF=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sF=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oF=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,aF=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cF=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lF=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uF=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,dF=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fF=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hF=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pF=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mF=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:kP,alphahash_pars_fragment:UP,alphamap_fragment:BP,alphamap_pars_fragment:VP,alphatest_fragment:HP,alphatest_pars_fragment:zP,aomap_fragment:GP,aomap_pars_fragment:jP,batching_pars_vertex:WP,batching_vertex:$P,begin_vertex:qP,beginnormal_vertex:XP,bsdfs:YP,iridescence_fragment:ZP,bumpmap_pars_fragment:KP,clipping_planes_fragment:JP,clipping_planes_pars_fragment:QP,clipping_planes_pars_vertex:eO,clipping_planes_vertex:tO,color_fragment:nO,color_pars_fragment:iO,color_pars_vertex:rO,color_vertex:sO,common:oO,defaultnormal_vertex:aO,displacementmap_pars_vertex:cO,displacementmap_vertex:lO,emissivemap_fragment:uO,emissivemap_pars_fragment:dO,colorspace_fragment:fO,colorspace_pars_fragment:hO,envmap_fragment:pO,envmap_common_pars_fragment:mO,envmap_pars_fragment:gO,envmap_pars_vertex:yO,envmap_physical_pars_fragment:DO,envmap_vertex:vO,fog_vertex:_O,fog_pars_vertex:SO,fog_fragment:xO,fog_pars_fragment:EO,gradientmap_pars_fragment:MO,lightmap_pars_fragment:bO,lights_lambert_fragment:wO,lights_lambert_pars_fragment:TO,lights_pars_begin:CO,lights_toon_fragment:IO,lights_toon_pars_fragment:AO,lights_phong_fragment:RO,lights_phong_pars_fragment:NO,lights_physical_fragment:PO,lights_physical_pars_fragment:OO,lights_fragment_begin:LO,lights_fragment_maps:FO,lights_fragment_end:kO,lightprobes_pars_fragment:UO,logdepthbuf_fragment:BO,logdepthbuf_pars_fragment:VO,logdepthbuf_pars_vertex:HO,logdepthbuf_vertex:zO,map_fragment:GO,map_pars_fragment:jO,map_particle_fragment:WO,map_particle_pars_fragment:$O,metalnessmap_fragment:qO,metalnessmap_pars_fragment:XO,morphinstance_vertex:YO,morphcolor_vertex:ZO,morphnormal_vertex:KO,morphtarget_pars_vertex:JO,morphtarget_vertex:QO,normal_fragment_begin:eL,normal_fragment_maps:tL,normal_pars_fragment:nL,normal_pars_vertex:iL,normal_vertex:rL,normalmap_pars_fragment:sL,clearcoat_normal_fragment_begin:oL,clearcoat_normal_fragment_maps:aL,clearcoat_pars_fragment:cL,iridescence_pars_fragment:lL,opaque_fragment:uL,packing:dL,premultiplied_alpha_fragment:fL,project_vertex:hL,dithering_fragment:pL,dithering_pars_fragment:mL,roughnessmap_fragment:gL,roughnessmap_pars_fragment:yL,shadowmap_pars_fragment:vL,shadowmap_pars_vertex:_L,shadowmap_vertex:SL,shadowmask_pars_fragment:xL,skinbase_vertex:EL,skinning_pars_vertex:ML,skinning_vertex:bL,skinnormal_vertex:wL,specularmap_fragment:TL,specularmap_pars_fragment:CL,tonemapping_fragment:DL,tonemapping_pars_fragment:IL,transmission_fragment:AL,transmission_pars_fragment:RL,uv_pars_fragment:NL,uv_pars_vertex:PL,uv_vertex:OL,worldpos_vertex:LL,background_vert:FL,background_frag:kL,backgroundCube_vert:UL,backgroundCube_frag:BL,cube_vert:VL,cube_frag:HL,depth_vert:zL,depth_frag:GL,distance_vert:jL,distance_frag:WL,equirect_vert:$L,equirect_frag:qL,linedashed_vert:XL,linedashed_frag:YL,meshbasic_vert:ZL,meshbasic_frag:KL,meshlambert_vert:JL,meshlambert_frag:QL,meshmatcap_vert:eF,meshmatcap_frag:tF,meshnormal_vert:nF,meshnormal_frag:iF,meshphong_vert:rF,meshphong_frag:sF,meshphysical_vert:oF,meshphysical_frag:aF,meshtoon_vert:cF,meshtoon_frag:lF,points_vert:uF,points_frag:dF,shadow_vert:fF,shadow_frag:hF,sprite_vert:pF,sprite_frag:mF},me={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new _e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new _e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Zi={basic:{uniforms:mn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:mn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:mn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:mn([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:mn([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:mn([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:mn([me.points,me.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:mn([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:mn([me.common,me.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:mn([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:mn([me.sprite,me.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distance:{uniforms:mn([me.common,me.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distance_vert,fragmentShader:Ye.distance_frag},shadow:{uniforms:mn([me.lights,me.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};Zi.physical={uniforms:mn([Zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new _e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new _e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new _e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};var Yh={r:0,b:0,g:0},gF=new Et,gw=new ke;gw.set(-1,0,0,0,1,0,0,0,1);function yF(n,e,t,i,r,s){let o=new Ke(0),a=r===!0?0:1,c,l,u=null,d=0,f=null;function h(x){let T=x.isScene===!0?x.background:null;if(T&&T.isTexture){let M=x.backgroundBlurriness>0;T=e.get(T,M)}return T}function g(x){let T=!1,M=h(x);M===null?p(o,a):M&&M.isColor&&(p(M,1),T=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(x,T){let M=h(T);M&&M.isCubeTexture?(l===void 0&&(l=new Tn(new ga(1,1,1),new $i({name:"BackgroundCubeMaterial",uniforms:to(Zi.backgroundCube.uniforms),vertexShader:Zi.backgroundCube.vertexShader,fragmentShader:Zi.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,w,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(gF.makeRotationFromEuler(T.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(gw),l.material.toneMapped=it.getTransfer(M.colorSpace)!==ft,(u!==M||d!==M.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,d=M.version,f=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Tn(new Zs(2,2),new $i({name:"BackgroundMaterial",uniforms:to(Zi.background.uniforms),vertexShader:Zi.background.vertexShader,fragmentShader:Zi.background.fragmentShader,side:os,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=it.getTransfer(M.colorSpace)!==ft,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,d=M.version,f=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,T){x.getRGB(Yh,kv(n)),t.buffers.color.setClear(Yh.r,Yh.g,Yh.b,T,s)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,T=1){o.set(x),a=T,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,p(o,a)},render:g,addToRenderList:S,dispose:m}}function vF(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(O,F,G,A,z){let Z=!1,V=d(O,A,G,F);s!==V&&(s=V,l(s.object)),Z=h(O,A,G,z),Z&&g(O,A,G,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,M(O,F,G,A),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function c(){return n.createVertexArray()}function l(O){return n.bindVertexArray(O)}function u(O){return n.deleteVertexArray(O)}function d(O,F,G,A){let z=A.wireframe===!0,Z=i[F.id];Z===void 0&&(Z={},i[F.id]=Z);let V=O.isInstancedMesh===!0?O.id:0,ne=Z[V];ne===void 0&&(ne={},Z[V]=ne);let W=ne[G.id];W===void 0&&(W={},ne[G.id]=W);let J=W[z];return J===void 0&&(J=f(c()),W[z]=J),J}function f(O){let F=[],G=[],A=[];for(let z=0;z<t;z++)F[z]=0,G[z]=0,A[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:A,object:O,attributes:{},index:null}}function h(O,F,G,A){let z=s.attributes,Z=F.attributes,V=0,ne=G.getAttributes();for(let W in ne)if(ne[W].location>=0){let Q=z[W],we=Z[W];if(we===void 0&&(W==="instanceMatrix"&&O.instanceMatrix&&(we=O.instanceMatrix),W==="instanceColor"&&O.instanceColor&&(we=O.instanceColor)),Q===void 0||Q.attribute!==we||we&&Q.data!==we.data)return!0;V++}return s.attributesNum!==V||s.index!==A}function g(O,F,G,A){let z={},Z=F.attributes,V=0,ne=G.getAttributes();for(let W in ne)if(ne[W].location>=0){let Q=Z[W];Q===void 0&&(W==="instanceMatrix"&&O.instanceMatrix&&(Q=O.instanceMatrix),W==="instanceColor"&&O.instanceColor&&(Q=O.instanceColor));let we={};we.attribute=Q,Q&&Q.data&&(we.data=Q.data),z[W]=we,V++}s.attributes=z,s.attributesNum=V,s.index=A}function S(){let O=s.newAttributes;for(let F=0,G=O.length;F<G;F++)O[F]=0}function p(O){m(O,0)}function m(O,F){let G=s.newAttributes,A=s.enabledAttributes,z=s.attributeDivisors;G[O]=1,A[O]===0&&(n.enableVertexAttribArray(O),A[O]=1),z[O]!==F&&(n.vertexAttribDivisor(O,F),z[O]=F)}function x(){let O=s.newAttributes,F=s.enabledAttributes;for(let G=0,A=F.length;G<A;G++)F[G]!==O[G]&&(n.disableVertexAttribArray(G),F[G]=0)}function T(O,F,G,A,z,Z,V){V===!0?n.vertexAttribIPointer(O,F,G,z,Z):n.vertexAttribPointer(O,F,G,A,z,Z)}function M(O,F,G,A){S();let z=A.attributes,Z=G.getAttributes(),V=F.defaultAttributeValues;for(let ne in Z){let W=Z[ne];if(W.location>=0){let J=z[ne];if(J===void 0&&(ne==="instanceMatrix"&&O.instanceMatrix&&(J=O.instanceMatrix),ne==="instanceColor"&&O.instanceColor&&(J=O.instanceColor)),J!==void 0){let Q=J.normalized,we=J.itemSize,He=e.get(J);if(He===void 0)continue;let X=He.buffer,ge=He.type,Ee=He.bytesPerElement,Ae=ge===n.INT||ge===n.UNSIGNED_INT||J.gpuType===fh;if(J.isInterleavedBufferAttribute){let ye=J.data,je=ye.isInterleavedBuffer===!0?ye.stride:ye.itemSize,Ot=J.offset;if(ye.isInstancedInterleavedBuffer||ye.isInstancedBufferAttribute){for(let Oe=0;Oe<W.locationSize;Oe++)m(W.location+Oe,ye.meshPerAttribute);O.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Oe=0;Oe<W.locationSize;Oe++)p(W.location+Oe);n.bindBuffer(n.ARRAY_BUFFER,X);for(let Oe=0;Oe<W.locationSize;Oe++)T(W.location+Oe,we/W.locationSize,ge,Q,je*Ee,(Ot+we/W.locationSize*Oe)*Ee,Ae)}else{if(J.isInstancedBufferAttribute){for(let ye=0;ye<W.locationSize;ye++)m(W.location+ye,J.meshPerAttribute);O.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ye=0;ye<W.locationSize;ye++)p(W.location+ye);n.bindBuffer(n.ARRAY_BUFFER,X);for(let ye=0;ye<W.locationSize;ye++)T(W.location+ye,we/W.locationSize,ge,Q,we*Ee,we/W.locationSize*ye*Ee,Ae)}}else if(V!==void 0){let Q=V[ne];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(W.location,Q);break;case 3:n.vertexAttrib3fv(W.location,Q);break;case 4:n.vertexAttrib4fv(W.location,Q);break;default:n.vertexAttrib1fv(W.location,Q)}}}}x()}function C(){L();for(let O in i){let F=i[O];for(let G in F){let A=F[G];for(let z in A){let Z=A[z];for(let V in Z)u(Z[V].object),delete Z[V];delete A[z]}}delete i[O]}}function w(O){if(i[O.id]===void 0)return;let F=i[O.id];for(let G in F){let A=F[G];for(let z in A){let Z=A[z];for(let V in Z)u(Z[V].object),delete Z[V];delete A[z]}}delete i[O.id]}function y(O){for(let F in i){let G=i[F];for(let A in G){let z=G[A];if(z[O.id]===void 0)continue;let Z=z[O.id];for(let V in Z)u(Z[V].object),delete Z[V];delete z[O.id]}}}function E(O){for(let F in i){let G=i[F],A=O.isInstancedMesh===!0?O.id:0,z=G[A];if(z!==void 0){for(let Z in z){let V=z[Z];for(let ne in V)u(V[ne].object),delete V[ne];delete z[Z]}delete G[A],Object.keys(G).length===0&&delete i[F]}}}function L(){R(),o=!0,s!==r&&(s=r,l(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:R,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfObject:E,releaseStatesOfProgram:y,initAttributes:S,enableAttribute:p,disableUnusedAttributes:x}}function _F(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function a(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let f=0;for(let h=0;h<u;h++)f+=l[h];t.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function SF(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(y){return!(y!==Ri&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){let E=y===Ai&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(y!==Rn&&y!==Ii&&!E&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Ne("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&d===!1;t.reversedDepthBuffer===!0&&d===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&d===!0&&Ne("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:T,maxFragmentUniforms:M,maxSamples:C,samples:w}}function xF(n){let e=this,t=null,i=0,r=!1,s=!1,o=new xn,a=new ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let g=d.clippingPlanes,S=d.clipIntersection,p=d.clipShadows,m=n.get(d);if(!r||g===null||g.length===0||s&&!p)s?u(null):l();else{let x=s?0:i,T=x*4,M=m.clippingState||null;c.value=M,M=u(g,f,T,h);for(let C=0;C!==T;++C)M[C]=t[C];m.clippingState=M,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,g){let S=d!==null?d.length:0,p=null;if(S!==0){if(p=c.value,g!==!0||p===null){let m=h+S*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let T=0,M=h;T!==S;++T,M+=4)o.copy(d[T]).applyMatrix4(x,a),o.normal.toArray(p,M),p[M+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}var Ll=class extends Wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ll(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ga(5,5,5),s=new $i({name:"CubemapFromEquirect",uniforms:to(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Cn,blending:Ks});s.uniforms.tEquirect.value=t;let o=new Tn(r,s),a=t.minFilter;return t.minFilter===xr&&(t.minFilter=Mn),new _a(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}},Xb=256,EF=3,MF=20,yw=256,vw=16,bF=3,wF=new N,TF=new Ke,Kh=class n{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new _a(1,10,null),this._boxMesh=new Tn(new ga(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=wF}=s,c=this._renderer;this._setSize(o);let l=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);let d=c.autoClear,f=c.autoClearColor,h=c.autoClearDepth,g=c.autoClearStencil,S=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,S===null&&(e.background=c.getClearColor(TF));let p=new _a(i,r,u);return p.position.copy(a),p.update(c,e),c.autoClear=d,c.autoClearColor=f,c.autoClearDepth=h,c.autoClearStencil=g,e.background=S,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kb(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zb(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Xb,Ov(e))}_fromTexture(e,t){e.mapping===Qs||e.mapping===Ma?this._setSize(e.image.length===0?Xb:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){let e=this._cubeSize,t=Yb(e,!1,!1),i=Math.log2(e)-EF;for(let r=0;r<=i;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Yb(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){let r=this._boxMesh,s=this._cubeCamera;r.material=i,s.renderTarget=e,s.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),s.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Qs||e.mapping===Ma?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kb()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Zb()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=CF(),this._integrationMaterial=DF());let t=this._cubeSize,i=e.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;let s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/vw);for(let o=0;o<=i;o++){let a=n.lodToRoughness(o,i);if(o>i-bF)s.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let c=a>0?Math.log2(t)+.5*Math.log2(6/(yw*Math.pow(a,4)))+.5:0;r.roughness.value=a,r.lodBias.value=c,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=IF());let i=this._blurMaterial,r=i.uniforms,s=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=s.texture,this._renderCube(e,0,i),r.envMap.value=e.texture,this._renderCube(s,0,i)}};function Yb(n,e,t){return new Ll(n,{minFilter:xr,generateMipmaps:e,type:Ai,colorSpace:nl,depthBuffer:t})}function Fl(n,e,t){return new $i({name:n,uniforms:e,vertexShader:Ye.cube_vert,fragmentShader:t,side:Cn,blending:Ks,depthTest:!1,depthWrite:!1})}function CF(){return Fl("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${yw}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function DF(){return Fl("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:vw}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function IF(){return Fl("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${MF}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Zb(){return Fl("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Kb(){return Fl("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function AF(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,h=!1){return f==null?null:h?o(f):s(f)}function s(f){if(f&&f.isTexture){let h=f.mapping;if(h===lh||h===uh)if(e.has(f)){let g=e.get(f).texture;return a(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let S=new Ll(g.height);return S.fromEquirectangularTexture(n,f),e.set(f,S),f.addEventListener("dispose",l),a(S.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let h=f.mapping,g=h===lh||h===uh,S=h===Qs||h===Ma;if(g||S){let p=t.get(f),m=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return i===null&&(i=new Kh(n)),p=g?i.fromEquirectangular(f,p):i.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),p.texture;if(p!==void 0)return p.texture;{let x=f.image;return g&&x&&x.height>0||S&&x&&c(x)?(i===null&&(i=new Kh(n)),p=g?i.fromEquirectangular(f):i.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),f.addEventListener("dispose",u),p.texture):null}}}return f}function a(f,h){return h===lh?f.mapping=Qs:h===uh&&(f.mapping=Ma),f}function c(f){let h=0,g=6;for(let S=0;S<g;S++)f[S]!==void 0&&h++;return h===g}function l(f){let h=f.target;h.removeEventListener("dispose",l);let g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function RF(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Zc("WebGLRenderer: "+i+" extension not supported."),r}}}function NF(n,e,t,i){let r={},s=new WeakMap,o=new FinalizationRegistry(g=>delete r[g]);function a(g){c(g.target)}function c(g){g.index!==null&&e.remove(g.index);for(let p in g.attributes)e.remove(g.attributes[p]);g.removeEventListener("dispose",a),delete r[g.id],o.unregister(g);let S=s.get(g);S&&(e.remove(S),s.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function l(g,S){return r[S.id]!==void 0||(S.addEventListener("dispose",a),r[S.id]=new WeakRef(S),o.register(S,S.id,S),t.memory.geometries++),S}function u(g){let S=g.attributes;for(let p in S)e.update(S[p],n.ARRAY_BUFFER)}function d(g){let S=g.index,p=g.attributes.position,m=0;if(p===void 0)return;let x=S!==null?S.array.length:p.array.length/3-1,T=p.count>=65535?cl:al,M=new T(Math.ceil(x/3)*6,1),C=M.array;if(S!==null){let y=S.array;m=S.version;for(let E=0,L=0;E<x;E+=3){let R=y[E+0],O=y[E+1],F=y[E+2];C[L++]=R,C[L++]=O,C[L++]=O,C[L++]=F,C[L++]=F,C[L++]=R}}else{m=p.version;for(let y=0,E=0;y<x;y+=3){let L=y+0,R=y+1,O=y+2;C[E++]=L,C[E++]=R,C[E++]=R,C[E++]=O,C[E++]=O,C[E++]=L}}M.version=m;let w=s.get(g);w&&e.remove(w),s.set(g,M)}function f(g){let S=s.get(g);if(S){let p=g.index;p!==null&&S.version<p.version&&d(g)}else d(g);return s.get(g)}function h(){for(let g in r){let S=r[g].deref();S!==void 0&&c(S)}}return{get:l,update:u,getWireframeAttribute:f,dispose:h}}function PF(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,f){n.drawElements(i,f,s,d*o),t.update(f,i,1)}function l(d,f,h){h!==0&&(n.drawElementsInstanced(i,f,s,d*o,h),t.update(f,i,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,h);let S=0;for(let p=0;p<h;p++)S+=f[p];t.update(S,i,1)}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function OF(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Le("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function LF(n,e,t){let i=new WeakMap,r=new Tt;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let R=function(){E.dispose(),i.delete(a),a.removeEventListener("dispose",R)};var h=R;f!==void 0&&f.texture.dispose();let g=a.morphAttributes.position!==void 0,S=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],T=a.morphAttributes.color||[],M=0;g===!0&&(M=1),S===!0&&(M=2),p===!0&&(M=3);let C=a.attributes.position.count*M,w=1;C>e.maxTextureSize&&(w=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);let y=new Float32Array(C*w*4*d),E=new sl(y,C,w,d);E.type=Ii,E.needsUpdate=!0;let L=M*4;for(let O=0;O<d;O++){let F=m[O],G=x[O],A=T[O],z=C*w*4*O;for(let Z=0;Z<F.count;Z++){let V=Z*L;g===!0&&(r.fromBufferAttribute(F,Z),y[z+V+0]=r.x,y[z+V+1]=r.y,y[z+V+2]=r.z,y[z+V+3]=0),S===!0&&(r.fromBufferAttribute(G,Z),y[z+V+4]=r.x,y[z+V+5]=r.y,y[z+V+6]=r.z,y[z+V+7]=0),p===!0&&(r.fromBufferAttribute(A,Z),y[z+V+8]=r.x,y[z+V+9]=r.y,y[z+V+10]=r.z,y[z+V+11]=A.itemSize===4?r.w:1)}}f={count:d,texture:E,size:new _e(C,w)},i.set(a,f),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];let S=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",S),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function FF(n,e,t,i,r){let s=new WeakMap;function o(l){let u=r.render.frame,d=l.geometry,f=e.get(l,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function a(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var kF={[hv]:"LINEAR_TONE_MAPPING",[pv]:"REINHARD_TONE_MAPPING",[mv]:"CINEON_TONE_MAPPING",[gv]:"ACES_FILMIC_TONE_MAPPING",[vv]:"AGX_TONE_MAPPING",[_v]:"NEUTRAL_TONE_MAPPING",[yv]:"CUSTOM_TONE_MAPPING"};function UF(n,e,t,i,r,s){let o=new Wn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,u=new Ci;u.setAttribute("position",new Pt([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Pt([0,2,0,0,2,0],2));let d=new Xf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Tn(u,d),h=new xl(-1,1,1,-1,0,1),g=null,S=null,p=!1,m,x=null,T=[],M=!1;this.setSize=function(C,w){o.setSize(C,w),a!==null&&a.setSize(C,w),c!==null&&c.setSize(C,w);for(let y=0;y<T.length;y++){let E=T[y];E.setSize&&E.setSize(C,w)}},this.setEffects=function(C){T=C,M=T.length>0&&T[0].isRenderPass===!0;let w=o.width,y=o.height;T.length>0&&a===null&&(a=new Wn(w,y,{type:Ai,depthBuffer:!1,stencilBuffer:!1}),c=new Wn(w,y,{type:Ai,depthBuffer:!1,stencilBuffer:!1}));let E=r===!0&&T.some(L=>L.needsDepthTexture===!0);E!==(o.depthTexture!==null)&&(E===!0&&l===null&&(l=new Sr(w,y),s===!0&&(l.format=Er,l.type=eo)),o.dispose(),o.depthTexture=E?l:null,o.resolveDepthBuffer=E,o.storeMultisampledDepthBuffer=E);for(let L=0;L<T.length;L++){let R=T[L];R.setSize&&R.setSize(w,y),E&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(l)}},this.begin=function(C,w){if(p||C.toneMapping===Xi&&T.length===0)return!1;if(x=w,w!==null){let y=w.width,E=w.height;(o.width!==y||o.height!==E)&&this.setSize(y,E)}return M===!1&&C.setRenderTarget(o),m=C.toneMapping,C.toneMapping=Xi,!0},this.hasRenderPass=function(){return M},this.end=function(C,w){C.toneMapping=m,p=!0;let y=o,E=a;for(let L=0;L<T.length;L++){let R=T[L];R.enabled!==!1&&(R.render(C,E,y,w),R.needsSwap!==!1&&(y=E,E=E===a?c:a))}if(g!==C.outputColorSpace||S!==C.toneMapping){g=C.outputColorSpace,S=C.toneMapping,d.defines={},it.getTransfer(g)===ft&&(d.defines.SRGB_TRANSFER="");let L=kF[S];L&&(d.defines[L]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=y.texture,C.setRenderTarget(x),C.render(f,h),x=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var _w=new bn,Sw=new Sr(1,1),xw=new dl(1),Ew=new sl,Mw=new kf,bw=new ll,Jb=[],Qb=[],ew=new Float32Array(16),tw=new Float32Array(9),nw=new Float32Array(4);function Da(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=Jb[r];if(s===void 0&&(s=new Float32Array(r),Jb[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function jt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Qh(n,e){let t=Qb[e];t===void 0&&(t=new Int32Array(e),Qb[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function BF(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function VF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;n.uniform2fv(this.addr,e),Wt(t,e)}}function HF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(jt(t,e))return;n.uniform3fv(this.addr,e),Wt(t,e)}}function zF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;n.uniform4fv(this.addr,e),Wt(t,e)}}function GF(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(jt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(jt(t,i))return;nw.set(i),n.uniformMatrix2fv(this.addr,!1,nw),Wt(t,i)}}function jF(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(jt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(jt(t,i))return;tw.set(i),n.uniformMatrix3fv(this.addr,!1,tw),Wt(t,i)}}function WF(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(jt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(jt(t,i))return;ew.set(i),n.uniformMatrix4fv(this.addr,!1,ew),Wt(t,i)}}function $F(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function qF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;n.uniform2iv(this.addr,e),Wt(t,e)}}function XF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;n.uniform3iv(this.addr,e),Wt(t,e)}}function YF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;n.uniform4iv(this.addr,e),Wt(t,e)}}function ZF(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function KF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;n.uniform2uiv(this.addr,e),Wt(t,e)}}function JF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;n.uniform3uiv(this.addr,e),Wt(t,e)}}function QF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;n.uniform4uiv(this.addr,e),Wt(t,e)}}function ep(n){return n.version===0&&(n.compareFunction=Av,n.needsUpdate=!0),n}function ek(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?s=ep(Sw):s=_w,t.setTexture2D(e||s,r)}function tk(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Mw,r)}function nk(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_CUBE_SHADOW?s=ep(xw):s=bw,t.setTextureCube(e||s,r)}function ik(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ew,r)}function rk(n){switch(n){case 5126:return BF;case 35664:return VF;case 35665:return HF;case 35666:return zF;case 35674:return GF;case 35675:return jF;case 35676:return WF;case 5124:case 35670:return $F;case 35667:case 35671:return qF;case 35668:case 35672:return XF;case 35669:case 35673:return YF;case 5125:return ZF;case 36294:return KF;case 36295:return JF;case 36296:return QF;case 35678:case 36198:case 36298:case 36306:case 35682:return ek;case 35679:case 36299:case 36307:return tk;case 35680:case 36300:case 36308:case 36293:return nk;case 36289:case 36303:case 36311:case 36292:return ik}}function sk(n,e){n.uniform1fv(this.addr,e)}function ok(n,e){let t=Da(e,this.size,2);n.uniform2fv(this.addr,t)}function ak(n,e){let t=Da(e,this.size,3);n.uniform3fv(this.addr,t)}function ck(n,e){let t=Da(e,this.size,4);n.uniform4fv(this.addr,t)}function lk(n,e){let t=Da(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function uk(n,e){let t=Da(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function dk(n,e){let t=Da(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function fk(n,e){n.uniform1iv(this.addr,e)}function hk(n,e){n.uniform2iv(this.addr,e)}function pk(n,e){n.uniform3iv(this.addr,e)}function mk(n,e){n.uniform4iv(this.addr,e)}function gk(n,e){n.uniform1uiv(this.addr,e)}function yk(n,e){n.uniform2uiv(this.addr,e)}function vk(n,e){n.uniform3uiv(this.addr,e)}function _k(n,e){n.uniform4uiv(this.addr,e)}function Sk(n,e,t){let i=this.cache,r=e.length,s=Qh(t,r);jt(i,s)||(n.uniform1iv(this.addr,s),Wt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=ep(Sw):o=_w;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function xk(n,e,t){let i=this.cache,r=e.length,s=Qh(t,r);jt(i,s)||(n.uniform1iv(this.addr,s),Wt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Mw,s[o])}function Ek(n,e,t){let i=this.cache,r=e.length,s=Qh(t,r);jt(i,s)||(n.uniform1iv(this.addr,s),Wt(i,s));let o;this.type===n.SAMPLER_CUBE_SHADOW?o=ep(xw):o=bw;for(let a=0;a!==r;++a)t.setTextureCube(e[a]||o,s[a])}function Mk(n,e,t){let i=this.cache,r=e.length,s=Qh(t,r);jt(i,s)||(n.uniform1iv(this.addr,s),Wt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Ew,s[o])}function bk(n){switch(n){case 5126:return sk;case 35664:return ok;case 35665:return ak;case 35666:return ck;case 35674:return lk;case 35675:return uk;case 35676:return dk;case 5124:case 35670:return fk;case 35667:case 35671:return hk;case 35668:case 35672:return pk;case 35669:case 35673:return mk;case 5125:return gk;case 36294:return yk;case 36295:return vk;case 36296:return _k;case 35678:case 36198:case 36298:case 36306:case 35682:return Sk;case 35679:case 36299:case 36307:return xk;case 35680:case 36300:case 36308:case 36293:return Ek;case 36289:case 36303:case 36311:case 36292:return Mk}}var Gv=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=rk(t.type)}},jv=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bk(t.type)}},Wv=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},Hv=/(\w+)(\])?(\[|\.)?/g;function iw(n,e){n.seq.push(e),n.map[e.id]=e}function wk(n,e,t){let i=n.name,r=i.length;for(Hv.lastIndex=0;;){let s=Hv.exec(i),o=Hv.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){iw(t,l===void 0?new Gv(a,n,e):new jv(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new Wv(a),iw(t,d)),t=d}}}var Ca=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);wk(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function rw(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Tk=37297,Ck=0;function Dk(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var sw=new ke;function Ik(n){it._getMatrix(sw,it.workingColorSpace,n);let e=`mat3( ${sw.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(n)){case il:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ow(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Dk(n.getShaderSource(e),a)}else return s}function Ak(n,e){let t=Ik(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Rk={[hv]:"Linear",[pv]:"Reinhard",[mv]:"Cineon",[gv]:"ACESFilmic",[vv]:"AgX",[_v]:"Neutral",[yv]:"Custom"};function Nk(n,e){let t=Rk[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Zh=new N;function Pk(){it.getLuminanceCoefficients(Zh);let n=Zh.x.toFixed(4),e=Zh.y.toFixed(4),t=Zh.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ok(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ol).join(`
`)}function Lk(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Fk(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ol(n){return n!==""}function aw(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function cw(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var kk=/^[ \t]*#include +<([\w\d./]+)>/gm;function $v(n){return n.replace(kk,Uk)}function Uk(n,e){let t=Ye[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return $v(t)}var Bk=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lw(n){return n.replace(Bk,Vk)}function Vk(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function uw(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Hk={[wl]:"SHADOWMAP_TYPE_PCF",[xa]:"SHADOWMAP_TYPE_VSM"};function zk(n){return Hk[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Gk={[Ma]:"ENVMAP_MODE_REFRACTION"};function jk(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Gk[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Wk={[fv]:"ENVMAP_BLENDING_MULTIPLY",[Tb]:"ENVMAP_BLENDING_MIX",[Cb]:"ENVMAP_BLENDING_ADD"};function $k(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Wk[n.combine]||"ENVMAP_BLENDING_NONE"}function qk(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=zk(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=jk(t),d=$k(t),f=Ok(t),h=Lk(s),g=r.createProgram(),S,p,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ol).join(`
`),S.length>0&&(S+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ol).join(`
`),p.length>0&&(p+=`
`)):(S=[uw(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ol).join(`
`),p=[uw(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xi?"#define TONE_MAPPING":"",t.toneMapping!==Xi?Ye.tonemapping_pars_fragment:"",t.toneMapping!==Xi?Nk("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,Ak("linearToOutputTexel",t.outputColorSpace),Pk(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ol).join(`
`)),o=$v(o),o=aw(o,t),o=cw(o,t),a=$v(a),a=aw(a,t),a=cw(a,t),o=lw(o),a=lw(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,S=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,p=["#define varying in",t.glslVersion===Rv?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Rv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let x=m+S+o,T=m+p+a,M=rw(r,r.VERTEX_SHADER,x),C=rw(r,r.FRAGMENT_SHADER,T);r.attachShader(g,M),r.attachShader(g,C),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function w(R){if(n.debug.checkShaderErrors){let O=r.getProgramInfoLog(g)||"",F=r.getShaderInfoLog(M)||"",G=r.getShaderInfoLog(C)||"",A=O.trim(),z=F.trim(),Z=G.trim(),V=!0,ne=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,M,C);else{let W=ow(r,M,"vertex"),J=ow(r,C,"fragment");Le("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+A+`
`+W+`
`+J)}else A!==""?Ne("WebGLProgram: Program Info Log:",A):(z===""||Z==="")&&(ne=!1);ne&&(R.diagnostics={runnable:V,programLog:A,vertexShader:{log:z,prefix:S},fragmentShader:{log:Z,prefix:p}})}r.deleteShader(M),r.deleteShader(C),y=new Ca(r,g),E=Fk(r,g)}let y;this.getUniforms=function(){return y===void 0&&w(this),y};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(g,Tk)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ck++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=M,this.fragmentShader=C,this}var Xk=0,qv=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Xv(e),t.set(e,i)),i}},Xv=class{constructor(e){this.id=Xk++,this.code=e,this.usedTimes=0}};function Yk(n){return n===as||n===Rl||n===Nl}function Zk(n,e,t,i,r,s){let o=new ha,a=new qv,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(y){return c.add(y),y===0?"uv":`uv${y}`}function g(y,E,L,R,O,F){let G=R.fog,A=O.geometry,z=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,Z=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,V=e.get(y.envMap||z,Z),ne=f[y.type],W=i.precision;y.precision!==null&&(W=i.getMaxPrecision(y.precision),W!==y.precision&&Ne("WebGLProgram.getParameters:",y.precision,"not supported, using",W,"instead."));let J=A.morphAttributes.position||A.morphAttributes.normal||A.morphAttributes.color,Q=J!==void 0?J.length:0,we=0;A.morphAttributes.position!==void 0&&(we=1),A.morphAttributes.normal!==void 0&&(we=2),A.morphAttributes.color!==void 0&&(we=3);let He,X,ge,Ee;if(ne){let pe=Zi[ne];He=pe.vertexShader,X=pe.fragmentShader}else{He=y.vertexShader,X=y.fragmentShader;let pe=a.getVertexShaderStage(y),pt=a.getFragmentShaderStage(y);a.update(y,pe,pt),ge=pe.id,Ee=pt.id}let Ae=n.getRenderTarget(),ye=n.state.buffers.depth.getReversed(),je=O.isInstancedMesh===!0,Ot=O.isBatchedMesh===!0,Oe=!!y.map,ht=!!y.matcap,vt=!!V,et=vt&&V.isPMREMTexture===!0,tn=!!y.aoMap,Ht=!!y.lightMap,Dn=!!y.bumpMap&&y.wireframe===!1,Ct=!!y.normalMap,Ni=!!y.displacementMap,qt=!!y.emissiveMap,qn=!!y.metalnessMap,Xn=!!y.roughnessMap,Yn=y.anisotropy>0,P=y.clearcoat>0,Zn=y.diffuseRoughness>0,bt=y.dispersion>0,wt=y.retroreflectivity>0,fe=y.iridescence>0,zt=y.sheen>0,Re=y.transmission>0,Ue=Yn&&!!y.anisotropyMap,b=P&&!!y.clearcoatMap,v=P&&!!y.clearcoatNormalMap,U=P&&!!y.clearcoatRoughnessMap,ee=Zn&&!!y.diffuseRoughnessMap,K=fe&&!!y.iridescenceMap,se=fe&&!!y.iridescenceThicknessMap,ue=zt&&!!y.sheenColorMap,$=zt&&!!y.sheenRoughnessMap,q=!!y.specularMap,ae=!!y.specularColorMap,D=!!y.specularIntensityMap,Y=Re&&!!y.transmissionMap,j=Re&&!!y.thicknessMap,ce=!!y.gradientMap,re=!!y.alphaMap,oe=y.alphaTest>0,De=!!y.alphaHash,qe=!!y.extensions,ie=Xi;y.toneMapped&&(Ae===null||Ae.isXRRenderTarget===!0)&&(ie=n.toneMapping);let Ie=et?V.isCompressedCubeTexture?V.image[0].mipmaps:V.mipmaps:null,$e={shaderID:ne,shaderType:y.type,shaderName:y.name,vertexShader:He,fragmentShader:X,defines:y.defines,customVertexShaderID:ge,customFragmentShaderID:Ee,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:W,batching:Ot,batchingColor:Ot&&O._colorsTexture!==null,instancing:je,instancingColor:je&&O.instanceColor!==null,instancingMorph:je&&O.morphTexture!==null,outputColorSpace:Ae===null?n.outputColorSpace:Ae.isXRRenderTarget===!0?Ae.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Oe,matcap:ht,envMap:vt,envMapMode:vt&&V.mapping,envMapPMREM:et,envMapMaxLod:et?Ie.length-1:null,envMapSize:et?Ie[0].width:null,aoMap:tn,lightMap:Ht,bumpMap:Dn,normalMap:Ct,displacementMap:Ni,emissiveMap:qt,normalMapObjectSpace:Ct&&y.normalMapType===Ab,normalMapTangentSpace:Ct&&y.normalMapType===Xh,packedNormalMap:Ct&&y.normalMapType===Xh&&Yk(y.normalMap.format),metalnessMap:qn,roughnessMap:Xn,anisotropy:Yn,anisotropyMap:Ue,clearcoat:P,clearcoatMap:b,clearcoatNormalMap:v,clearcoatRoughnessMap:U,diffuseRoughness:Zn,diffuseRoughnessMap:ee,dispersion:bt,retroreflection:wt,iridescence:fe,iridescenceMap:K,iridescenceThicknessMap:se,sheen:zt,sheenColorMap:ue,sheenRoughnessMap:$,specularMap:q,specularColorMap:ae,specularIntensityMap:D,transmission:Re,transmissionMap:Y,thicknessMap:j,gradientMap:ce,opaque:y.transparent===!1&&y.blending===Ea&&y.alphaToCoverage===!1,alphaMap:re,alphaTest:oe,alphaHash:De,combine:y.combine,mapUv:Oe&&h(y.map.channel),aoMapUv:tn&&h(y.aoMap.channel),lightMapUv:Ht&&h(y.lightMap.channel),bumpMapUv:Dn&&h(y.bumpMap.channel),normalMapUv:Ct&&h(y.normalMap.channel),displacementMapUv:Ni&&h(y.displacementMap.channel),emissiveMapUv:qt&&h(y.emissiveMap.channel),metalnessMapUv:qn&&h(y.metalnessMap.channel),roughnessMapUv:Xn&&h(y.roughnessMap.channel),anisotropyMapUv:Ue&&h(y.anisotropyMap.channel),clearcoatMapUv:b&&h(y.clearcoatMap.channel),clearcoatNormalMapUv:v&&h(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:U&&h(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ee&&h(y.diffuseRoughnessMap.channel),iridescenceMapUv:K&&h(y.iridescenceMap.channel),iridescenceThicknessMapUv:se&&h(y.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&h(y.sheenColorMap.channel),sheenRoughnessMapUv:$&&h(y.sheenRoughnessMap.channel),specularMapUv:q&&h(y.specularMap.channel),specularColorMapUv:ae&&h(y.specularColorMap.channel),specularIntensityMapUv:D&&h(y.specularIntensityMap.channel),transmissionMapUv:Y&&h(y.transmissionMap.channel),thicknessMapUv:j&&h(y.thicknessMap.channel),alphaMapUv:re&&h(y.alphaMap.channel),vertexTangents:!!A.attributes.tangent&&(Ct||Yn),vertexNormals:!!A.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!A.attributes.color&&A.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!A.attributes.uv&&(Oe||re),fog:!!G,useFog:y.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||A.attributes.normal===void 0&&Ct===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ye,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:A.attributes.position!==void 0,morphTargets:A.morphAttributes.position!==void 0,morphNormals:A.morphAttributes.normal!==void 0,morphColors:A.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:we,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:F.filter(pe=>pe.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ie,decodeVideoTexture:Oe&&y.map.isVideoTexture===!0&&it.getTransfer(y.map.colorSpace)===ft,decodeVideoTextureEmissive:qt&&y.emissiveMap.isVideoTexture===!0&&it.getTransfer(y.emissiveMap.colorSpace)===ft,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===qi,flipSided:y.side===Cn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:qe&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&y.extensions.multiDraw===!0||Ot)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return $e.vertexUv1s=c.has(1),$e.vertexUv2s=c.has(2),$e.vertexUv3s=c.has(3),c.clear(),$e}function S(y){let E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(let L in y.defines)E.push(L),E.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(p(E,y),m(E,y),E.push(n.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function p(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapPMREM),y.push(E.envMapMaxLod),y.push(E.envMapSize),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.diffuseRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.numSunLights),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numSunLightShadows),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.numLightProbeGrids),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function m(y,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.diffuseRoughness&&o.enable(25),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function x(y){let E=f[y.type],L;if(E){let R=Zi[E];L=Wb.clone(R.uniforms)}else L=y.uniforms;return L}function T(y,E){let L=u.get(E);return L!==void 0?++L.usedTimes:(L=new qk(n,E,y,r),l.push(L),u.set(E,L)),L}function M(y){if(--y.usedTimes===0){let E=l.indexOf(y);l[E]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function C(y){a.remove(y)}function w(){a.dispose()}return{getParameters:g,getProgramCacheKey:S,getUniforms:x,acquireProgram:T,releaseProgram:M,releaseShaderCache:C,programs:l,dispose:w}}function Kk(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Jk(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function dw(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function fw(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function a(f,h,g,S,p,m){let x=n[e];return x===void 0?(x={id:f.id,object:f,geometry:h,material:g,materialVariant:o(f),groupOrder:S,renderOrder:f.renderOrder,z:p,group:m},n[e]=x):(x.id=f.id,x.object=f,x.geometry=h,x.material=g,x.materialVariant=o(f),x.groupOrder=S,x.renderOrder=f.renderOrder,x.z=p,x.group=m),e++,x}function c(f,h,g,S,p,m,x){x.reversedDepth===!0&&(p=-p);let T=a(f,h,g,S,p,m);g.transmission>0?i.push(T):g.transparent===!0?r.push(T):t.push(T)}function l(f,h,g,S,p,m){let x=a(f,h,g,S,p,m);g.transmission>0?i.unshift(x):g.transparent===!0?r.unshift(x):t.unshift(x)}function u(f,h){t.length>1&&t.sort(f||Jk),i.length>1&&i.sort(h||dw),r.length>1&&r.sort(h||dw)}function d(){for(let f=e,h=n.length;f<h;f++){let g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function Qk(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new fw,n.set(i,[o])):r>=s.length?(o=new fw,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function eU(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new Ke};break;case"SpotLight":t={position:new N,direction:new N,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function tU(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var nU=0;function iU(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function rU(n){let e=new eU,t=tU(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new N);let r=new N,s=new Et,o=new Et;function a(l){let u=0,d=0,f=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let h=0,g=0,S=0,p=0,m=0,x=0,T=0,M=0,C=0,w=0,y=0,E=0,L=0,R=0;l.sort(iU);for(let F=0,G=l.length;F<G;F++){let A=l[F],z=A.color,Z=A.intensity,V=A.distance,ne=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===as?ne=A.shadow.map.texture:ne=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)u+=z.r*Z,d+=z.g*Z,f+=z.b*Z;else if(A.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(A.sh.coefficients[W],Z);R++}else if(A.isSunLight){let W=e.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let J=A.shadow,Q=t.get(A);Q.shadowIntensity=J.intensity,Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),i.sunShadow[g]=Q,i.sunShadowMap[g]=ne;let we=J.getViewportCount();for(let He=0;He<we;He++)i.sunShadowMatrix[S+He]=J.getMatrix(He),i.sunShadowCascade[S+He]=J._cascadeData[He];S+=we,g++}i.sun[h]=W,h++}else if(A.isDirectionalLight){let W=e.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let J=A.shadow,Q=t.get(A);Q.shadowIntensity=J.intensity,Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,i.directionalShadow[p]=Q,i.directionalShadowMap[p]=ne,i.directionalShadowMatrix[p]=A.shadow.matrix,C++}i.directional[p]=W,p++}else if(A.isSpotLight){let W=e.get(A);W.position.setFromMatrixPosition(A.matrixWorld),W.color.copy(z).multiplyScalar(Z),W.distance=V,W.coneCos=Math.cos(A.angle),W.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),W.decay=A.decay,i.spot[x]=W;let J=A.shadow;if(A.map&&(i.spotLightMap[E]=A.map,E++,J.updateMatrices(A),A.castShadow&&L++),i.spotLightMatrix[x]=J.matrix,A.castShadow){let Q=t.get(A);Q.shadowIntensity=J.intensity,Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,i.spotShadow[x]=Q,i.spotShadowMap[x]=ne,y++}x++}else if(A.isRectAreaLight){let W=e.get(A);W.color.copy(z).multiplyScalar(Z),W.halfWidth.set(A.width*.5,0,0),W.halfHeight.set(0,A.height*.5,0),i.rectArea[T]=W,T++}else if(A.isPointLight){let W=e.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),W.distance=A.distance,W.decay=A.decay,A.castShadow){let J=A.shadow,Q=t.get(A);Q.shadowIntensity=J.intensity,Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,Q.shadowCameraNear=J.camera.near,Q.shadowCameraFar=J.camera.far,i.pointShadow[m]=Q,i.pointShadowMap[m]=ne,i.pointShadowMatrix[m]=A.shadow.matrix,w++}i.point[m]=W,m++}else if(A.isHemisphereLight){let W=e.get(A);W.skyColor.copy(A.color).multiplyScalar(Z),W.groundColor.copy(A.groundColor).multiplyScalar(Z),i.hemi[M]=W,M++}}T>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let O=i.hash;(O.sunLength!==h||O.directionalLength!==p||O.pointLength!==m||O.spotLength!==x||O.rectAreaLength!==T||O.hemiLength!==M||O.numSunShadows!==g||O.numDirectionalShadows!==C||O.numPointShadows!==w||O.numSpotShadows!==y||O.numSpotMaps!==E||O.numLightProbes!==R)&&(i.sun.length=h,i.directional.length=p,i.spot.length=x,i.rectArea.length=T,i.point.length=m,i.hemi.length=M,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=S,i.sunShadowCascade.length=S,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.directionalShadowMatrix.length=C,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=y,i.spotShadowMap.length=y,i.spotLightMatrix.length=y+E-L,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=R,O.sunLength=h,O.directionalLength=p,O.pointLength=m,O.spotLength=x,O.rectAreaLength=T,O.hemiLength=M,O.numSunShadows=g,O.numDirectionalShadows=C,O.numPointShadows=w,O.numSpotShadows=y,O.numSpotMaps=E,O.numLightProbes=R,i.version=nU++)}function c(l,u){let d=0,f=0,h=0,g=0,S=0,p=0,m=u.matrixWorldInverse;for(let x=0,T=l.length;x<T;x++){let M=l[x];if(M.isSunLight){let C=i.sun[d];C.direction.setFromMatrixPosition(M.matrixWorld),C.direction.transformDirection(m),d++}else if(M.isDirectionalLight){let C=i.directional[f];C.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(m),f++}else if(M.isSpotLight){let C=i.spot[g];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(m),C.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(m),g++}else if(M.isRectAreaLight){let C=i.rectArea[S];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),C.halfWidth.set(M.width*.5,0,0),C.halfHeight.set(0,M.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),S++}else if(M.isPointLight){let C=i.point[h];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(m),h++}else if(M.isHemisphereLight){let C=i.hemi[p];C.direction.setFromMatrixPosition(M.matrixWorld),C.direction.transformDirection(m),p++}}}return{setup:a,setupView:c,state:i}}function hw(n){let e=new rU(n),t=[],i=[],r=[];function s(d){u.camera=d,t.length=0,i.length=0,r.length=0}function o(d){d.isLightProbeGrid?r.push(d):t.push(d)}function a(d){i.push(d)}function c(){e.setup(t),r.sort((d,f)=>d.priority-f.priority||d.id-f.id)}function l(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function sU(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new hw(n),e.set(r,[a])):s>=o.length?(a=new hw(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var oU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,aU=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,cU=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],lU=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],pw=new Et,Pl=new N,zv=new N;function uU(n,e,t){let i=new Qr,r=new _e,s=new _e,o=new Tt,a=new Yf,c=new Zf,l={},u=t.maxTextureSize,d={[os]:Cn,[Cn]:os,[qi]:qi},f=new $i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _e},radius:{value:4}},vertexShader:oU,fragmentShader:aU}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let g=new Ci;g.setAttribute("position",new Wi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new Tn(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wl;let m=this.type;this.render=function(w,y,E){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===ab&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=wl);let L=n.getRenderTarget(),R=n.getActiveCubeFace(),O=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Ks),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let G=m!==this.type;G&&y.traverse(function(A){A.material&&(Array.isArray(A.material)?A.material.forEach(z=>z.needsUpdate=!0):A.material.needsUpdate=!0)});for(let A=0,z=w.length;A<z;A++){let Z=w[A],V=Z.shadow;if(V===void 0){Ne("WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);let ne=V.getFrameExtents();r.multiply(ne),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ne.x),r.x=s.x*ne.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ne.y),r.y=s.y*ne.y,V.mapSize.y=s.y));let W=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=W,V.map===null||G===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===xa){if(Z.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Wn(r.x,r.y,{format:as,type:Ai,minFilter:Mn,magFilter:Mn,generateMipmaps:!1}),V.map.texture.name=Z.name+".shadowMap",V.map.depthTexture=new Sr(r.x,r.y,Ii),V.map.depthTexture.name=Z.name+".shadowMapDepth",V.map.depthTexture.format=vr,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=en,V.map.depthTexture.magFilter=en}else Z.isPointLight?(V.map=new Ll(r.x),V.map.depthTexture=new dl(r.x,Di)):(V.map=new Wn(r.x,r.y),V.map.depthTexture=new Sr(r.x,r.y,Di)),V.map.depthTexture.name=Z.name+".shadowMap",V.map.depthTexture.format=vr,this.type===wl?(V.map.depthTexture.compareFunction=W?Iv:Dv,V.map.depthTexture.minFilter=Mn,V.map.depthTexture.magFilter=Mn):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=en,V.map.depthTexture.magFilter=en);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==r.x||V.map.height!==r.y)&&V.map.setSize(r.x,r.y);let J=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();Z.isPointLight!==!0&&V.updateMatrices(Z,E);let Q=(V.camera.layers.mask&4294967294)!==0?V.camera.layers:E.layers;for(let we=0;we<J;we++){let He=V.getCamera(we);if(Z.isPointLight){let X=V.camera,ge=V.matrix,Ee=Z.distance||X.far;Ee!==X.far&&(X.far=Ee,X.updateProjectionMatrix()),Pl.setFromMatrixPosition(Z.matrixWorld),X.position.copy(Pl),zv.copy(X.position),zv.add(cU[we]),X.up.copy(lU[we]),X.lookAt(zv),X.updateMatrixWorld(),ge.makeTranslation(-Pl.x,-Pl.y,-Pl.z),pw.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),V._frustum.setFromProjectionMatrix(pw,X.coordinateSystem,X.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,we),n.clear();else{we===0&&(n.setRenderTarget(V.map),n.clear());let X=V.getViewport(we);o.set(s.x*X.x,s.y*X.y,s.x*X.z,s.y*X.w),F.viewport(o)}i=V.getFrustum(we),M(y,E,He,Z,Q,this.type)}V.isPointLightShadow!==!0&&this.type===xa&&x(V,E),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(L,R,O)};function x(w,y){let E=e.update(S);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,h.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),w.mapPass===null?w.mapPass=new Wn(r.x,r.y,{format:as,type:Ai}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),f.uniforms.shadow_pass.value=w.map.depthTexture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(y,null,E,f,S,null),h.uniforms.shadow_pass.value=w.mapPass.texture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(y,null,E,h,S,null)}function T(w,y,E,L){let R=null,O=E.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(O!==void 0)R=O;else if(R=E.isPointLight===!0?c:a,n.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let F=R.uuid,G=y.uuid,A=l[F];A===void 0&&(A={},l[F]=A);let z=A[G];z===void 0&&(z=R.clone(),A[G]=z,y.addEventListener("dispose",C)),R=z}if(R.visible=y.visible,R.wireframe=y.wireframe,L===xa?R.side=y.shadowSide!==null?y.shadowSide:y.side:R.side=y.shadowSide!==null?y.shadowSide:d[y.side],R.alphaMap=y.alphaMap,R.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,R.map=y.map,R.clipShadows=y.clipShadows,R.clippingPlanes=y.clippingPlanes,R.clipIntersection=y.clipIntersection,R.displacementMap=y.displacementMap,R.displacementScale=y.displacementScale,R.displacementBias=y.displacementBias,R.wireframeLinewidth=y.wireframeLinewidth,R.linewidth=y.linewidth,E.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let F=n.properties.get(R);F.light=E}return R}function M(w,y,E,L,R,O){if(w.visible===!1)return;if(w.layers.test(R)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&O===xa)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,w.matrixWorld);let A=e.update(w),z=w.material;if(Array.isArray(z)){let Z=A.groups;for(let V=0,ne=Z.length;V<ne;V++){let W=Z[V],J=z[W.materialIndex];if(J&&J.visible){let Q=T(w,J,L,O);w.onBeforeShadow(n,w,y,E,A,Q,W),n.renderBufferDirect(E,null,A,Q,w,W),w.onAfterShadow(n,w,y,E,A,Q,W)}}}else if(z.visible){let Z=T(w,z,L,O);w.onBeforeShadow(n,w,y,E,A,Z,null),n.renderBufferDirect(E,null,A,Z,w,null),w.onAfterShadow(n,w,y,E,A,Z,null)}}let G=w.children;for(let A=0,z=G.length;A<z;A++)M(G[A],y,E,L,R,O)}function C(w){w.target.removeEventListener("dispose",C);for(let E in l){let L=l[E],R=w.target.uuid;R in L&&(L[R].dispose(),delete L[R])}}}function dU(n,e){function t(){let D=!1,Y=new Tt,j=null,ce=new Tt(0,0,0,0);return{setMask:function(re){j!==re&&!D&&(n.colorMask(re,re,re,re),j=re)},setLocked:function(re){D=re},setClear:function(re,oe,De,qe,ie){ie===!0&&(re*=qe,oe*=qe,De*=qe),Y.set(re,oe,De,qe),ce.equals(Y)===!1&&(n.clearColor(re,oe,De,qe),ce.copy(Y))},reset:function(){D=!1,j=null,ce.set(-1,0,0,0)}}}function i(){let D=!1,Y=!1,j=null,ce=null,re=null;return{setReversed:function(oe){if(Y!==oe){let De=e.get("EXT_clip_control");oe?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),Y=oe;let qe=re;re=null,this.setClear(qe)}},getReversed:function(){return Y},setTest:function(oe){oe?ye(n.DEPTH_TEST):je(n.DEPTH_TEST)},setMask:function(oe){j!==oe&&!D&&(n.depthMask(oe),j=oe)},setFunc:function(oe){if(Y&&(oe=Hb[oe]),ce!==oe){switch(oe){case wf:n.depthFunc(n.NEVER);break;case Tf:n.depthFunc(n.ALWAYS);break;case Cf:n.depthFunc(n.LESS);break;case ca:n.depthFunc(n.LEQUAL);break;case Df:n.depthFunc(n.EQUAL);break;case If:n.depthFunc(n.GEQUAL);break;case Af:n.depthFunc(n.GREATER);break;case Rf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=oe}},setLocked:function(oe){D=oe},setClear:function(oe){re!==oe&&(re=oe,Y&&(oe=1-oe),n.clearDepth(oe))},reset:function(){D=!1,j=null,ce=null,re=null,Y=!1}}}function r(){let D=!1,Y=null,j=null,ce=null,re=null,oe=null,De=null,qe=null,ie=null;return{setTest:function(Ie){D||(Ie?ye(n.STENCIL_TEST):je(n.STENCIL_TEST))},setMask:function(Ie){Y!==Ie&&!D&&(n.stencilMask(Ie),Y=Ie)},setFunc:function(Ie,$e,pe){(j!==Ie||ce!==$e||re!==pe)&&(n.stencilFunc(Ie,$e,pe),j=Ie,ce=$e,re=pe)},setOp:function(Ie,$e,pe){(oe!==Ie||De!==$e||qe!==pe)&&(n.stencilOp(Ie,$e,pe),oe=Ie,De=$e,qe=pe)},setLocked:function(Ie){D=Ie},setClear:function(Ie){ie!==Ie&&(n.clearStencil(Ie),ie=Ie)},reset:function(){D=!1,Y=null,j=null,ce=null,re=null,oe=null,De=null,qe=null,ie=null}}}let s=new t,o=new i,a=new r,c={},l=new WeakMap,u={},d={},f={},h=new WeakMap,g=[],S=null,p=!1,m=null,x=null,T=null,M=null,C=null,w=null,y=null,E=new Ke(0,0,0),L=0,R=!1,O=null,F=null,G=null,A=null,z=null,Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,ne=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=ne>=1):W.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=ne>=2);let J=null,Q={},we=n.getParameter(n.SCISSOR_BOX),He=n.getParameter(n.VIEWPORT),X=new Tt().fromArray(we),ge=new Tt().fromArray(He);function Ee(D,Y,j,ce){let re=new Uint8Array(4),oe=n.createTexture();n.bindTexture(D,oe),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<j;De++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(Y,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,re):n.texImage2D(Y+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,re);return oe}let Ae={};Ae[n.TEXTURE_2D]=Ee(n.TEXTURE_2D,n.TEXTURE_2D,1),Ae[n.TEXTURE_CUBE_MAP]=Ee(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ae[n.TEXTURE_2D_ARRAY]=Ee(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ae[n.TEXTURE_3D]=Ee(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ye(n.DEPTH_TEST),o.setFunc(ca),Dn(!1),Ct(ov),ye(n.CULL_FACE),tn(Ks);function ye(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function je(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function Ot(D,Y){return f[D]!==Y?(n.bindFramebuffer(D,Y),f[D]=Y,D===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Y),D===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Y),!0):!1}function Oe(D,Y){let j=g,ce=!1;if(D){j=h.get(Y),j===void 0&&(j=[],h.set(Y,j));let re=D.textures;if(j.length!==re.length||j[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,De=re.length;oe<De;oe++)j[oe]=n.COLOR_ATTACHMENT0+oe;j.length=re.length,ce=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,ce=!0);ce&&n.drawBuffers(j)}function ht(D){return S!==D?(n.useProgram(D),S=D,!0):!1}let vt={[Js]:n.FUNC_ADD,[lb]:n.FUNC_SUBTRACT,[ub]:n.FUNC_REVERSE_SUBTRACT};vt[db]=n.MIN,vt[fb]=n.MAX;let et={[hb]:n.ZERO,[pb]:n.ONE,[mb]:n.SRC_COLOR,[uv]:n.SRC_ALPHA,[xb]:n.SRC_ALPHA_SATURATE,[_b]:n.DST_COLOR,[yb]:n.DST_ALPHA,[gb]:n.ONE_MINUS_SRC_COLOR,[dv]:n.ONE_MINUS_SRC_ALPHA,[Sb]:n.ONE_MINUS_DST_COLOR,[vb]:n.ONE_MINUS_DST_ALPHA,[Eb]:n.CONSTANT_COLOR,[Mb]:n.ONE_MINUS_CONSTANT_COLOR,[bb]:n.CONSTANT_ALPHA,[wb]:n.ONE_MINUS_CONSTANT_ALPHA};function tn(D,Y,j,ce,re,oe,De,qe,ie,Ie){if(D===Ks){p===!0&&(je(n.BLEND),p=!1);return}if(p===!1&&(ye(n.BLEND),p=!0),D!==cb){if(D!==m||Ie!==R){if((x!==Js||C!==Js)&&(n.blendEquation(n.FUNC_ADD),x=Js,C=Js),Ie)switch(D){case Ea:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case av:n.blendFunc(n.ONE,n.ONE);break;case cv:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case lv:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Le("WebGLState: Invalid blending: ",D);break}else switch(D){case Ea:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case av:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case cv:Le("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lv:Le("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Le("WebGLState: Invalid blending: ",D);break}T=null,M=null,w=null,y=null,E.set(0,0,0),L=0,m=D,R=Ie}return}re=re||Y,oe=oe||j,De=De||ce,(Y!==x||re!==C)&&(n.blendEquationSeparate(vt[Y],vt[re]),x=Y,C=re),(j!==T||ce!==M||oe!==w||De!==y)&&(n.blendFuncSeparate(et[j],et[ce],et[oe],et[De]),T=j,M=ce,w=oe,y=De),(qe.equals(E)===!1||ie!==L)&&(n.blendColor(qe.r,qe.g,qe.b,ie),E.copy(qe),L=ie),m=D,R=!1}function Ht(D,Y){D.side===qi?je(n.CULL_FACE):ye(n.CULL_FACE);let j=D.side===Cn;Y&&(j=!j),Dn(j),D.blending===Ea&&D.transparent===!1?tn(Ks):tn(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);let ce=D.stencilWrite;a.setTest(ce),ce&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),qt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ye(n.SAMPLE_ALPHA_TO_COVERAGE):je(n.SAMPLE_ALPHA_TO_COVERAGE)}function Dn(D){O!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),O=D)}function Ct(D){D!==sb?(ye(n.CULL_FACE),D!==F&&(D===ov?n.cullFace(n.BACK):D===ob?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):je(n.CULL_FACE),F=D}function Ni(D){D!==G&&(V&&n.lineWidth(D),G=D)}function qt(D,Y,j){D?(ye(n.POLYGON_OFFSET_FILL),(A!==Y||z!==j)&&(A=Y,z=j,o.getReversed()&&(Y=-Y,j=-j),n.polygonOffset(Y,j))):je(n.POLYGON_OFFSET_FILL)}function qn(D){D?ye(n.SCISSOR_TEST):je(n.SCISSOR_TEST)}function Xn(D){D===void 0&&(D=n.TEXTURE0+Z-1),J!==D&&(n.activeTexture(D),J=D)}function Yn(D,Y,j){j===void 0&&(J===null?j=n.TEXTURE0+Z-1:j=J);let ce=Q[j];ce===void 0&&(ce={type:void 0,texture:void 0},Q[j]=ce),(ce.type!==D||ce.texture!==Y)&&(J!==j&&(n.activeTexture(j),J=j),n.bindTexture(D,Y||Ae[D]),ce.type=D,ce.texture=Y)}function P(){let D=Q[J];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Zn(){try{n.compressedTexImage2D(...arguments)}catch(D){Le("WebGLState:",D)}}function bt(){try{n.compressedTexImage3D(...arguments)}catch(D){Le("WebGLState:",D)}}function wt(){try{n.texSubImage2D(...arguments)}catch(D){Le("WebGLState:",D)}}function fe(){try{n.texSubImage3D(...arguments)}catch(D){Le("WebGLState:",D)}}function zt(){try{n.compressedTexSubImage2D(...arguments)}catch(D){Le("WebGLState:",D)}}function Re(){try{n.compressedTexSubImage3D(...arguments)}catch(D){Le("WebGLState:",D)}}function Ue(){try{n.texStorage2D(...arguments)}catch(D){Le("WebGLState:",D)}}function b(){try{n.texStorage3D(...arguments)}catch(D){Le("WebGLState:",D)}}function v(){try{n.texImage2D(...arguments)}catch(D){Le("WebGLState:",D)}}function U(){try{n.texImage3D(...arguments)}catch(D){Le("WebGLState:",D)}}function ee(D){return d[D]!==void 0?d[D]:n.getParameter(D)}function K(D,Y){d[D]!==Y&&(n.pixelStorei(D,Y),d[D]=Y)}function se(D){X.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),X.copy(D))}function ue(D){ge.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),ge.copy(D))}function $(D,Y){let j=l.get(Y);j===void 0&&(j=new WeakMap,l.set(Y,j));let ce=j.get(D);ce===void 0&&(ce=n.getUniformBlockIndex(Y,D.name),n.uniformBlockBinding(Y,ce,ce),j.set(D,ce))}function q(D,Y,j){let re=l.get(Y).get(D);c[re]!==j&&(n.bindBufferBase(n.UNIFORM_BUFFER,re,j),c[re]=j)}function ae(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},J=null,Q={},f={},c={},h=new WeakMap,g=[],S=null,p=!1,m=null,x=null,T=null,M=null,C=null,w=null,y=null,E=new Ke(0,0,0),L=0,R=!1,O=null,F=null,G=null,A=null,z=null,X.set(0,0,n.canvas.width,n.canvas.height),ge.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ye,disable:je,bindFramebuffer:Ot,drawBuffers:Oe,useProgram:ht,setBlending:tn,setMaterial:Ht,setFlipSided:Dn,setCullFace:Ct,setLineWidth:Ni,setPolygonOffset:qt,setScissorTest:qn,activeTexture:Xn,bindTexture:Yn,unbindTexture:P,compressedTexImage2D:Zn,compressedTexImage3D:bt,texImage2D:v,texImage3D:U,pixelStorei:K,getParameter:ee,updateUBOMapping:$,uniformBlockBinding:q,texStorage2D:Ue,texStorage3D:b,texSubImage2D:wt,texSubImage3D:fe,compressedTexSubImage2D:zt,compressedTexSubImage3D:Re,scissor:se,viewport:ue,reset:ae}}function fU(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new _e,u=new WeakMap,d=new Set,f,h=new WeakMap,g=new Set,S=new FinalizationRegistry(b=>g.delete(b)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(b,v){return p?new OffscreenCanvas(b,v):rl("canvas")}function x(b,v,U){let ee=1,K=Ue(b);if((K.width>U||K.height>U)&&(ee=U/Math.max(K.width,K.height)),ee<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let se=Math.floor(ee*K.width),ue=Math.floor(ee*K.height);f===void 0&&(f=m(se,ue));let $=v?m(se,ue):f;return $.width=se,$.height=ue,$.getContext("2d").drawImage(b,0,0,se,ue),Ne("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+se+"x"+ue+")."),$}else return"data"in b&&Ne("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),b;return b}function T(b){return b.generateMipmaps}function M(b){n.generateMipmap(b)}function C(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(b,v,U,ee,K,se=!1){if(b!==null){if(n[b]!==void 0)return n[b];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ue;ee&&(ue=e.get("EXT_texture_norm16"),ue||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=v;if(v===n.RED&&(U===n.FLOAT&&($=n.R32F),U===n.HALF_FLOAT&&($=n.R16F),U===n.UNSIGNED_BYTE&&($=n.R8),U===n.UNSIGNED_SHORT&&ue&&($=ue.R16_EXT),U===n.SHORT&&ue&&($=ue.R16_SNORM_EXT)),v===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.R8UI),U===n.UNSIGNED_SHORT&&($=n.R16UI),U===n.UNSIGNED_INT&&($=n.R32UI),U===n.BYTE&&($=n.R8I),U===n.SHORT&&($=n.R16I),U===n.INT&&($=n.R32I)),v===n.RG&&(U===n.FLOAT&&($=n.RG32F),U===n.HALF_FLOAT&&($=n.RG16F),U===n.UNSIGNED_BYTE&&($=n.RG8),U===n.UNSIGNED_SHORT&&ue&&($=ue.RG16_EXT),U===n.SHORT&&ue&&($=ue.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.RG8UI),U===n.UNSIGNED_SHORT&&($=n.RG16UI),U===n.UNSIGNED_INT&&($=n.RG32UI),U===n.BYTE&&($=n.RG8I),U===n.SHORT&&($=n.RG16I),U===n.INT&&($=n.RG32I)),v===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.RGB8UI),U===n.UNSIGNED_SHORT&&($=n.RGB16UI),U===n.UNSIGNED_INT&&($=n.RGB32UI),U===n.BYTE&&($=n.RGB8I),U===n.SHORT&&($=n.RGB16I),U===n.INT&&($=n.RGB32I)),v===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.RGBA8UI),U===n.UNSIGNED_SHORT&&($=n.RGBA16UI),U===n.UNSIGNED_INT&&($=n.RGBA32UI),U===n.BYTE&&($=n.RGBA8I),U===n.SHORT&&($=n.RGBA16I),U===n.INT&&($=n.RGBA32I)),v===n.RGB&&(U===n.UNSIGNED_SHORT&&ue&&($=ue.RGB16_EXT),U===n.SHORT&&ue&&($=ue.RGB16_SNORM_EXT),U===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),v===n.RGBA){let q=se?il:it.getTransfer(K);U===n.FLOAT&&($=n.RGBA32F),U===n.HALF_FLOAT&&($=n.RGBA16F),U===n.UNSIGNED_BYTE&&($=q===ft?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT&&ue&&($=ue.RGBA16_EXT),U===n.SHORT&&ue&&($=ue.RGBA16_SNORM_EXT),U===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function y(b,v){let U;return b?v===null||v===Di||v===eo?U=n.DEPTH24_STENCIL8:v===Ii?U=n.DEPTH32F_STENCIL8:v===ba&&(U=n.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Di||v===eo?U=n.DEPTH_COMPONENT24:v===Ii?U=n.DEPTH_COMPONENT32F:v===ba&&(U=n.DEPTH_COMPONENT16),U}function E(b,v){return T(b)===!0||b.isFramebufferTexture&&b.minFilter!==en&&b.minFilter!==Mn?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function L(b){let v=new WeakRef(b);i.get(b).__ref=v,g.add(v),S.register(b,v,v)}function R(b){let v=i.get(b).__ref;v!==void 0&&(g.delete(v),S.unregister(v))}function O(b){G(b.target)}function F(b){A(b.target)}function G(b){b.removeEventListener("dispose",O),R(b),Z(b),b.isVideoTexture&&u.delete(b),b.isHTMLTexture&&d.delete(b)}function A(b){b.removeEventListener("dispose",F),R(b),ne(b)}function z(){for(let b of g){let v=b.deref();v!==void 0&&(v.isRenderTarget===!0?A(v):G(v))}g.clear(),d.clear()}function Z(b){let v=i.get(b);if(v.__webglInit===void 0)return;let U=b.source,ee=h.get(U);if(ee){let K=ee[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&V(b),Object.keys(ee).length===0&&h.delete(U)}i.remove(b)}function V(b){let v=i.get(b);n.deleteTexture(v.__webglTexture);let U=b.source,ee=h.get(U);delete ee[v.__cacheKey],o.memory.textures--}function ne(b){let v=i.get(b);v.__depthDisposeCallback&&v.__depthDisposeCallback();let U=b.depthTexture;if(U&&U.renderTarget===b&&G(U),b.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let se=0;se<v.__webglFramebuffer[K].length;se++)n.deleteFramebuffer(v.__webglFramebuffer[K][se]);else n.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)n.deleteFramebuffer(v.__webglFramebuffer[K]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let ee=b.textures;for(let K=0,se=ee.length;K<se;K++){let ue=i.get(ee[K]);ue.__webglTexture&&(n.deleteTexture(ue.__webglTexture),o.memory.textures--),i.remove(ee[K])}i.remove(b)}let W=0;function J(){W=0}function Q(){return W}function we(b){W=b}function He(){let b=W;return b>=r.maxTextures&&Ne("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+r.maxTextures),W+=1,b}function X(b){let v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.mipmapsAutoUpdate),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function ge(b,v){let U=i.get(b);if(b.isVideoTexture&&zt(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&U.__version!==b.version){let ee=b.image;if(ee===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Ht(U,b,v);return}}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+v)}function Ee(b,v){let U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){Ht(U,b,v);return}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+v)}function Ae(b,v){let U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){Ht(U,b,v);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+v)}function ye(b,v){let U=i.get(b);if(b.version>0&&U.__version!==b.version){Dn(U,b,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+v)}let je={[Nf]:n.REPEAT,[ji]:n.CLAMP_TO_EDGE,[Pf]:n.MIRRORED_REPEAT},Ot={[en]:n.NEAREST,[Db]:n.NEAREST_MIPMAP_NEAREST,[Tl]:n.NEAREST_MIPMAP_LINEAR,[Mn]:n.LINEAR,[dh]:n.LINEAR_MIPMAP_NEAREST,[xr]:n.LINEAR_MIPMAP_LINEAR},Oe={[Nb]:n.NEVER,[Av]:n.ALWAYS,[Pb]:n.LESS,[Dv]:n.LEQUAL,[Ob]:n.EQUAL,[Iv]:n.GEQUAL,[Lb]:n.GREATER,[Fb]:n.NOTEQUAL};function ht(b,v){if(v.type===Ii&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Mn||v.magFilter===dh||v.magFilter===Tl||v.magFilter===xr||v.minFilter===Mn||v.minFilter===dh||v.minFilter===Tl||v.minFilter===xr)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,je[v.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,je[v.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,je[v.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,Ot[v.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,Ot[v.minFilter]),v.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Oe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===en||v.minFilter!==Tl&&v.minFilter!==xr||v.type===Ii&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function vt(b,v){let U=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",O),L(v));let ee=v.source,K=h.get(ee);K===void 0&&(K={},h.set(ee,K));let se=X(v);if(se!==b.__cacheKey){K[se]===void 0&&(K[se]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),K[se].usedTimes++;let ue=K[b.__cacheKey];ue!==void 0&&(K[b.__cacheKey].usedTimes--,ue.usedTimes===0&&V(v)),b.__cacheKey=se,b.__webglTexture=K[se].texture}return U}function et(b,v,U){return Math.floor(Math.floor(b/U)/v)}function tn(b,v,U,ee){let se=b.updateRanges;if(se.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,U,ee,v.data);else{se.sort((D,Y)=>D.start-Y.start);let ue=0;for(let D=1;D<se.length;D++){let Y=se[ue],j=se[D],ce=Y.start+Y.count,re=et(j.start,v.width,4),oe=et(Y.start,v.width,4);j.start<=ce+1&&re===oe&&et(j.start+j.count-1,v.width,4)===re?Y.count=Math.max(Y.count,j.start+j.count-Y.start):(++ue,se[ue]=j)}se.length=ue+1;let $=t.getParameter(n.UNPACK_ROW_LENGTH),q=t.getParameter(n.UNPACK_SKIP_PIXELS),ae=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let D=0,Y=se.length;D<Y;D++){let j=se[D],ce=Math.floor(j.start/4),re=Math.ceil(j.count/4),oe=ce%v.width,De=Math.floor(ce/v.width),qe=re,ie=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,oe),t.pixelStorei(n.UNPACK_SKIP_ROWS,De),t.texSubImage2D(n.TEXTURE_2D,0,oe,De,qe,ie,U,ee,v.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,$),t.pixelStorei(n.UNPACK_SKIP_PIXELS,q),t.pixelStorei(n.UNPACK_SKIP_ROWS,ae)}}function Ht(b,v,U){let ee=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(ee=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(ee=n.TEXTURE_3D);let K=vt(b,v),se=v.source;t.bindTexture(ee,b.__webglTexture,n.TEXTURE0+U);let ue=i.get(se);if(se.version!==ue.__version||K===!0){if(t.activeTexture(n.TEXTURE0+U),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let ie=it.getPrimaries(it.workingColorSpace),Ie=v.colorSpace===Mr?null:it.getPrimaries(v.colorSpace),$e=v.colorSpace===Mr||ie===Ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let q=x(v.image,!1,r.maxTextureSize);q=Re(v,q);let ae=s.convert(v.format,v.colorSpace),D=s.convert(v.type),Y=w(v.internalFormat,ae,D,v.normalized,v.colorSpace,v.isVideoTexture);ht(ee,v);let j,ce=v.mipmaps,re=v.isVideoTexture!==!0,oe=ue.__version===void 0||K===!0,De=se.dataReady,qe=E(v,q);if(v.isDepthTexture)Y=y(v.format===Er,v.type),oe&&(re?t.texStorage2D(n.TEXTURE_2D,1,Y,q.width,q.height):t.texImage2D(n.TEXTURE_2D,0,Y,q.width,q.height,0,ae,D,null));else if(v.isDataTexture)if(ce.length>0){re&&oe&&t.texStorage2D(n.TEXTURE_2D,qe,Y,ce[0].width,ce[0].height);for(let ie=0,Ie=ce.length;ie<Ie;ie++)j=ce[ie],re?De&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,j.width,j.height,ae,D,j.data):t.texImage2D(n.TEXTURE_2D,ie,Y,j.width,j.height,0,ae,D,j.data);v.generateMipmaps=!1}else re?(oe&&t.texStorage2D(n.TEXTURE_2D,qe,Y,q.width,q.height),De&&tn(v,q,ae,D)):t.texImage2D(n.TEXTURE_2D,0,Y,q.width,q.height,0,ae,D,q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){re&&oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,qe,Y,ce[0].width,ce[0].height,q.depth);for(let ie=0,Ie=ce.length;ie<Ie;ie++)if(j=ce[ie],v.format!==Ri)if(ae!==null)if(re){if(De)if(v.layerUpdates.size>0){let $e=Vv(j.width,j.height,v.format,v.type);for(let pe of v.layerUpdates){let pt=j.data.subarray(pe*$e/j.data.BYTES_PER_ELEMENT,(pe+1)*$e/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,pe,j.width,j.height,1,ae,pt)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,j.width,j.height,q.depth,ae,j.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ie,Y,j.width,j.height,q.depth,0,j.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else re?De&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,j.width,j.height,q.depth,ae,D,j.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ie,Y,j.width,j.height,q.depth,0,ae,D,j.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{re&&oe&&t.texStorage2D(n.TEXTURE_2D,qe,Y,ce[0].width,ce[0].height);for(let ie=0,Ie=ce.length;ie<Ie;ie++)j=ce[ie],v.format!==Ri?ae!==null?re?De&&t.compressedTexSubImage2D(n.TEXTURE_2D,ie,0,0,j.width,j.height,ae,j.data):t.compressedTexImage2D(n.TEXTURE_2D,ie,Y,j.width,j.height,0,j.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?De&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,j.width,j.height,ae,D,j.data):t.texImage2D(n.TEXTURE_2D,ie,Y,j.width,j.height,0,ae,D,j.data)}else if(v.isDataArrayTexture)if(re){if(oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,qe,Y,q.width,q.height,q.depth),De)if(v.layerUpdates.size>0){let ie=Vv(q.width,q.height,v.format,v.type);for(let Ie of v.layerUpdates){let $e=q.data.subarray(Ie*ie/q.data.BYTES_PER_ELEMENT,(Ie+1)*ie/q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ie,q.width,q.height,1,ae,D,$e)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,ae,D,q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Y,q.width,q.height,q.depth,0,ae,D,q.data);else if(v.isData3DTexture)re?(oe&&t.texStorage3D(n.TEXTURE_3D,qe,Y,q.width,q.height,q.depth),De&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,ae,D,q.data)):t.texImage3D(n.TEXTURE_3D,0,Y,q.width,q.height,q.depth,0,ae,D,q.data);else if(v.isFramebufferTexture){if(oe)if(re)t.texStorage2D(n.TEXTURE_2D,qe,Y,q.width,q.height);else{let ie=q.width,Ie=q.height;for(let $e=0;$e<qe;$e++)t.texImage2D(n.TEXTURE_2D,$e,Y,ie,Ie,0,ae,D,null),ie>>=1,Ie>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){let ie=n.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),q.parentNode!==ie){ie.appendChild(q),d.add(v),ie.onpaint=Ie=>{let $e=Ie.changedElements;for(let pe of d)$e.includes(pe.image)&&(pe.needsUpdate=!0)},ie.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,q);else{let $e=n.RGBA,pe=n.RGBA,pt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,$e,pe,pt,q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ce.length>0){if(re&&oe){let ie=Ue(ce[0]);t.texStorage2D(n.TEXTURE_2D,qe,Y,ie.width,ie.height)}for(let ie=0,Ie=ce.length;ie<Ie;ie++)j=ce[ie],re?De&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,ae,D,j):t.texImage2D(n.TEXTURE_2D,ie,Y,ae,D,j);v.generateMipmaps=!1}else if(re){if(oe){let ie=Ue(q);t.texStorage2D(n.TEXTURE_2D,qe,Y,ie.width,ie.height)}De&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,D,q)}else t.texImage2D(n.TEXTURE_2D,0,Y,ae,D,q);T(v)&&v.mipmapsAutoUpdate===!0&&M(ee),ue.__version=se.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Dn(b,v,U){if(v.image.length!==6)return;let ee=vt(b,v),K=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+U);let se=i.get(K);if(K.version!==se.__version||ee===!0){t.activeTexture(n.TEXTURE0+U);let ue=it.getPrimaries(it.workingColorSpace),$=v.colorSpace===Mr?null:it.getPrimaries(v.colorSpace),q=v.colorSpace===Mr||ue===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);let ae=v.isCompressedTexture||v.image[0].isCompressedTexture,D=v.image[0]&&v.image[0].isDataTexture,Y=[];for(let pe=0;pe<6;pe++)!ae&&!D?Y[pe]=x(v.image[pe],!0,r.maxCubemapSize):Y[pe]=D?v.image[pe].image:v.image[pe],Y[pe]=Re(v,Y[pe]);let j=Y[0],ce=s.convert(v.format,v.colorSpace),re=s.convert(v.type),oe=w(v.internalFormat,ce,re,v.normalized,v.colorSpace),De=v.isVideoTexture!==!0,qe=se.__version===void 0||ee===!0,ie=K.dataReady,Ie=E(v,j);ht(n.TEXTURE_CUBE_MAP,v);let $e;if(v.isDepthTexture){if(oe=y(v.format===Er,v.type),qe)if(De)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,oe,j.width,j.height);else for(let pe=0;pe<6;pe++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,oe,j.width,j.height,0,ce,re,null)}else if(ae){De&&qe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,oe,j.width,j.height);for(let pe=0;pe<6;pe++){$e=Y[pe].mipmaps;for(let pt=0;pt<$e.length;pt++){let Xt=$e[pt];v.format!==Ri?ce!==null?De?ie&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,pt,0,0,Xt.width,Xt.height,ce,Xt.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,pt,oe,Xt.width,Xt.height,0,Xt.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,pt,0,0,Xt.width,Xt.height,ce,re,Xt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,pt,oe,Xt.width,Xt.height,0,ce,re,Xt.data)}}}else{if($e=v.mipmaps,De&&qe){$e.length>0&&Ie++;let pe=Ue(Y[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,oe,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(D){De?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Y[pe].width,Y[pe].height,ce,re,Y[pe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,oe,Y[pe].width,Y[pe].height,0,ce,re,Y[pe].data);for(let pt=0;pt<$e.length;pt++){let br=$e[pt].image[pe].image;De?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,pt+1,0,0,br.width,br.height,ce,re,br.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,pt+1,oe,br.width,br.height,0,ce,re,br.data)}}else{De?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ce,re,Y[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,oe,ce,re,Y[pe]);for(let pt=0;pt<$e.length;pt++){let Xt=$e[pt];De?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,pt+1,0,0,ce,re,Xt.image[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,pt+1,oe,ce,re,Xt.image[pe])}}}T(v)&&v.mipmapsAutoUpdate===!0&&M(n.TEXTURE_CUBE_MAP),se.__version=K.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Ct(b,v,U,ee,K,se){let ue=s.convert(U.format,U.colorSpace),$=s.convert(U.type),q=w(U.internalFormat,ue,$,U.normalized,U.colorSpace),ae=i.get(v),D=i.get(U);if(D.__renderTarget=v,!ae.__hasExternalTextures){let Y=Math.max(1,v.width>>se),j=Math.max(1,v.height>>se);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,se,q,Y,j,v.depth,0,ue,$,null):t.texImage2D(K,se,q,Y,j,0,ue,$,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),fe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,K,D.__webglTexture,0,wt(v)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ee,K,D.__webglTexture,se),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ni(b,v,U){if(n.bindRenderbuffer(n.RENDERBUFFER,b),v.depthBuffer){let ee=v.depthTexture,K=ee&&ee.isDepthTexture?ee.type:null,se=y(v.stencilBuffer,K),ue=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;fe(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,wt(v),se,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,wt(v),se,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,se,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,b)}else{let ee=v.textures;for(let K=0;K<ee.length;K++){let se=ee[K],ue=s.convert(se.format,se.colorSpace),$=s.convert(se.type),q=w(se.internalFormat,ue,$,se.normalized,se.colorSpace);fe(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,wt(v),q,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,wt(v),q,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,q,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function qt(b,v,U){let ee=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=i.get(v.depthTexture);K.__renderTarget=v;let se=ee?v.depthTexture.image[0]:v.depthTexture.image;(!K.__webglTexture||se.width!==v.width||se.height!==v.height)&&(se.width=v.width,se.height=v.height,v.depthTexture.needsUpdate=!0),ee?ye(v.depthTexture,0):ge(v.depthTexture,0);let ue=K.__webglTexture,$=wt(v),q=ee?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,ae=v.depthTexture.format===Er?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===vr)fe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ae,q,ue,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,ae,q,ue,0);else if(v.depthTexture.format===Er)fe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ae,q,ue,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,ae,q,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function qn(b){let v=i.get(b),U=b.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==b.depthTexture){let ee=b.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),ee){let K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,ee.removeEventListener("dispose",K)};ee.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=ee}if(b.depthTexture&&!v.__autoAllocateDepthBuffer)if(U)for(let ee=0;ee<6;ee++)qt(v.__webglFramebuffer[ee],b,ee);else b.texture.mipmaps.length>0?qt(v.__webglFramebuffer[0],b,0):qt(v.__webglFramebuffer,b,0);else if(U){v.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[ee]),v.__webglDepthbuffer[ee]===void 0)v.__webglDepthbuffer[ee]=n.createRenderbuffer(),Ni(v.__webglDepthbuffer[ee],b,!1);else{let K=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=v.__webglDepthbuffer[ee];n.bindRenderbuffer(n.RENDERBUFFER,se),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,se)}}else if(b.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Ni(v.__webglDepthbuffer,b,!1);else{let K=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,se),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,se)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Xn(b,v,U){let ee=i.get(b);v!==void 0&&Ct(ee.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&qn(b)}function Yn(b){let v=b.texture,U=i.get(b),ee=i.get(v);b.addEventListener("dispose",F),L(b);let K=b.textures,se=b.isWebGLCubeRenderTarget===!0,ue=K.length>1;if(ue||(ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture()),ee.__version=v.version,o.memory.textures++),se){U.__webglFramebuffer=[];for(let $=0;$<6;$++)if(v.mipmaps.length>0){U.__webglFramebuffer[$]=[];for(let q=0;q<v.mipmaps.length;q++)U.__webglFramebuffer[$][q]=n.createFramebuffer()}else U.__webglFramebuffer[$]=n.createFramebuffer()}else{if(v.mipmaps.length>0){U.__webglFramebuffer=[];for(let $=0;$<v.mipmaps.length;$++)U.__webglFramebuffer[$]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(ue)for(let $=0,q=K.length;$<q;$++){let ae=i.get(K[$]);ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&fe(b)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let $=0;$<K.length;$++){let q=K[$];U.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[$]);let ae=s.convert(q.format,q.colorSpace),D=s.convert(q.type),Y=w(q.internalFormat,ae,D,q.normalized,q.colorSpace,b.isXRRenderTarget===!0),j=wt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,j,Y,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,U.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Ni(U.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(se){t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),ht(n.TEXTURE_CUBE_MAP,v);for(let $=0;$<6;$++)if(v.mipmaps.length>0)for(let q=0;q<v.mipmaps.length;q++)Ct(U.__webglFramebuffer[$][q],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,q);else Ct(U.__webglFramebuffer[$],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);T(v)?M(n.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}else if(ue){for(let $=0,q=K.length;$<q;$++){let ae=K[$],D=i.get(ae),Y=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Y=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Y,D.__webglTexture),ht(Y,ae),Ct(U.__webglFramebuffer,b,ae,n.COLOR_ATTACHMENT0+$,Y,0),T(ae)&&M(Y)}t.unbindTexture()}else{let $=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&($=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture($,ee.__webglTexture),ht($,v),v.mipmaps.length>0)for(let q=0;q<v.mipmaps.length;q++)Ct(U.__webglFramebuffer[q],b,v,n.COLOR_ATTACHMENT0,$,q);else Ct(U.__webglFramebuffer,b,v,n.COLOR_ATTACHMENT0,$,0);T(v)?M($):v.mipmaps.length>0&&n.texParameteri($,n.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}b.depthBuffer&&qn(b)}function P(b){let v=b.textures;for(let U=0,ee=v.length;U<ee;U++){let K=v[U];if(T(K)&&K.mipmapsAutoUpdate===!0){let se=C(b),ue=i.get(K).__webglTexture;t.bindTexture(se,ue),M(se),t.unbindTexture()}}}let Zn=[];function bt(b){if(b.samples>0){if(fe(b)===!1){let v=b.textures,U=b.width,ee=b.height,K=n.COLOR_BUFFER_BIT,se=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(b),$=v.length>1;if($)for(let ae=0;ae<v.length;ae++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),b.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let ae=0;ae<v.length;ae++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[ae]);let D=i.get(v[ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,D,0)}n.blitFramebuffer(0,0,U,ee,0,0,U,ee,K,n.NEAREST),c===!0&&(Zn.length=0,Zn.push(n.COLOR_ATTACHMENT0+ae),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&Zn.push(se),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Zn))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let ae=0;ae<v.length;ae++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,ue.__webglColorRenderbuffer[ae]);let D=i.get(v[ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,D,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&c){let v=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function wt(b){return Math.min(r.maxSamples,b.samples)}function fe(b){let v=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function zt(b){let v=o.render.frame;u.get(b)!==v&&(u.set(b,v),b.update())}function Re(b,v){let U=b.colorSpace,ee=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||U!==nl&&U!==Mr&&(it.getTransfer(U)===ft?(ee!==Ri||K!==Rn)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Le("WebGLTextures: Unsupported texture color space:",U)),v}function Ue(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=He,this.resetTextureUnits=J,this.getTextureUnits=Q,this.setTextureUnits=we,this.setTexture2D=ge,this.setTexture2DArray=Ee,this.setTexture3D=Ae,this.setTextureCube=ye,this.rebindTextures=Xn,this.setupRenderTarget=Yn,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=qn,this.setupFrameBufferTexture=Ct,this.useMultisampledRTT=fe,this.dispose=z}function hU(n,e){function t(i,r=Mr){let s,o=it.getTransfer(r);if(i===Rn)return n.UNSIGNED_BYTE;if(i===hh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ph)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Mv)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===bv)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===xv)return n.BYTE;if(i===Ev)return n.SHORT;if(i===ba)return n.UNSIGNED_SHORT;if(i===fh)return n.INT;if(i===Di)return n.UNSIGNED_INT;if(i===Ii)return n.FLOAT;if(i===Ai)return n.HALF_FLOAT;if(i===wv)return n.ALPHA;if(i===Tv)return n.RGB;if(i===Ri)return n.RGBA;if(i===vr)return n.DEPTH_COMPONENT;if(i===Er)return n.DEPTH_STENCIL;if(i===Cv)return n.RED;if(i===mh)return n.RED_INTEGER;if(i===as)return n.RG;if(i===gh)return n.RG_INTEGER;if(i===yh)return n.RGBA_INTEGER;if(i===Cl||i===Dl||i===Il||i===Al)if(o===ft)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Cl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Dl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Il)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Cl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Dl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Il)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Al)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vh||i===_h||i===Sh||i===xh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===vh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_h)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Sh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===xh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Eh||i===Mh||i===bh||i===wh||i===Th||i===Rl||i===Ch)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Eh||i===Mh)return o===ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===bh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===wh)return s.COMPRESSED_R11_EAC;if(i===Th)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Rl)return s.COMPRESSED_RG11_EAC;if(i===Ch)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Dh||i===Ih||i===Ah||i===Rh||i===Nh||i===Ph||i===Oh||i===Lh||i===Fh||i===kh||i===Uh||i===Bh||i===Vh||i===Hh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Dh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ih)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ah)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Rh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Nh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ph)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Oh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Lh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===kh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Uh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Bh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Vh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Hh)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===zh||i===Gh||i===jh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===zh)return o===ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Gh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===jh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Wh||i===$h||i===Nl||i===qh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Wh)return s.COMPRESSED_RED_RGTC1_EXT;if(i===$h)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Nl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===qh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===eo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var pU=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mU=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Yv=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new fl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new $i({vertexShader:pU,fragmentShader:mU,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Tn(new Zs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Zv=class extends Ti{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,g=null,S=typeof XRWebGLBinding<"u",p=new Yv,m={},x=t.getContextAttributes(),T=null,M=null,C=[],w=[],y=new _e,E=null,L=null,R=new En;R.viewport=new Tt;let O=new En;O.viewport=new Tt;let F=[R,O],G=new ch,A=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ge=C[X];return ge===void 0&&(ge=new pa,C[X]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(X){let ge=C[X];return ge===void 0&&(ge=new pa,C[X]=ge),ge.getGripSpace()},this.getHand=function(X){let ge=C[X];return ge===void 0&&(ge=new pa,C[X]=ge),ge.getHandSpace()};function Z(X){let ge=w.indexOf(X.inputSource);if(ge===-1)return;let Ee=C[ge];Ee!==void 0&&(Ee.update(X.inputSource,X.frame,l||o),Ee.dispatchEvent({type:X.type,data:X.inputSource}))}function V(){r.removeEventListener("select",Z),r.removeEventListener("selectstart",Z),r.removeEventListener("selectend",Z),r.removeEventListener("squeeze",Z),r.removeEventListener("squeezestart",Z),r.removeEventListener("squeezeend",Z),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",ne);for(let X=0;X<C.length;X++){let ge=w[X];ge!==null&&(w[X]=null,C[X].disconnect(ge))}A=null,z=null,p.reset();for(let X in m)delete m[X];if(e.setRenderTarget(T),h=null,f=null,d=null,r=null,M=null,He.stop(),i.isPresenting=!1,e.setPixelRatio(E),e.setSize(y.width,y.height,!1),L!==null){let X=L.camera;X.fov=L.fov,X.zoom=L.zoom,X.updateProjectionMatrix(),L=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&S&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",Z),r.addEventListener("selectstart",Z),r.addEventListener("selectend",Z),r.addEventListener("squeeze",Z),r.addEventListener("squeezestart",Z),r.addEventListener("squeezeend",Z),r.addEventListener("end",V),r.addEventListener("inputsourceschange",ne),x.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(y),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,Ae=null,ye=null;x.depth&&(ye=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ee=x.stencil?Er:vr,Ae=x.stencil?eo:Di);let je={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(je),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new Wn(f.textureWidth,f.textureHeight,{format:Ri,type:Rn,depthTexture:new Sr(f.textureWidth,f.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let Ee={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,Ee),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),M=new Wn(h.framebufferWidth,h.framebufferHeight,{format:Ri,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),He.setContext(r),He.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function ne(X){for(let ge=0;ge<X.removed.length;ge++){let Ee=X.removed[ge],Ae=w.indexOf(Ee);Ae>=0&&(w[Ae]=null,C[Ae].disconnect(Ee))}for(let ge=0;ge<X.added.length;ge++){let Ee=X.added[ge],Ae=w.indexOf(Ee);if(Ae===-1){for(let je=0;je<C.length;je++)if(je>=w.length){w.push(Ee),Ae=je;break}else if(w[je]===null){w[je]=Ee,Ae=je;break}if(Ae===-1)break}let ye=C[Ae];ye&&ye.connect(Ee)}}function W(X,ge){ge===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ge.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let ge=X.near,Ee=X.far;p.texture!==null&&(p.depthNear>0&&(ge=p.depthNear),p.depthFar>0&&(Ee=p.depthFar)),G.near=O.near=R.near=ge,G.far=O.far=R.far=Ee,(A!==G.near||z!==G.far)&&(r.updateRenderState({depthNear:G.near,depthFar:G.far}),A=G.near,z=G.far),G.layers.mask=X.layers.mask|6,R.layers.mask=G.layers.mask&-5,O.layers.mask=G.layers.mask&-3;let Ae=X.parent,ye=G.cameras;W(G,Ae);for(let je=0;je<ye.length;je++)W(ye[je],Ae);G.projectionMatrix.copy(R.projectionMatrix),G.projectionMatrixInverse.copy(R.projectionMatrixInverse),L===null&&X.isPerspectiveCamera&&(L={camera:X,fov:X.fov,zoom:X.zoom}),J(X,G,Ae)};function J(X,ge,Ee){Ee===null?X.matrix.copy(ge.matrixWorld):(X.matrix.copy(Ee.matrixWorld),X.matrix.invert(),X.matrix.multiply(ge.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ge.projectionMatrix),X.projectionMatrixInverse.copy(ge.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=da*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=X)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(G)},this.getCameraTexture=function(X){return m[X]};let Q=null;function we(X,ge){if(u=ge.getViewerPose(l||o),g=ge,u!==null){let Ee=u.views;h!==null&&(e.setRenderTargetFramebuffer(M,h.framebuffer),e.setRenderTarget(M));let Ae=!1;Ee.length!==G.cameras.length&&(G.cameras.length=0,Ae=!0);for(let Oe=0;Oe<Ee.length;Oe++){let ht=Ee[Oe],vt=null;if(h!==null)vt=h.getViewport(ht);else{let tn=d.getViewSubImage(f,ht);vt=tn.viewport,Oe===0&&(e.setRenderTargetTextures(M,tn.colorTexture,tn.depthStencilTexture),e.setRenderTarget(M))}let et=F[Oe];et===void 0&&(et=new En,et.layers.enable(Oe),et.viewport=new Tt,F[Oe]=et),et.matrix.fromArray(ht.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(ht.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(vt.x,vt.y,vt.width,vt.height),Oe===0&&(G.matrix.copy(et.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Ae===!0&&G.cameras.push(et)}let ye=r.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&S){d=i.getBinding();let Oe=d.getDepthInformation(Ee[0]);Oe&&Oe.isValid&&Oe.texture&&p.init(Oe,r.renderState)}if(ye&&ye.includes("camera-access")&&S){e.state.unbindTexture(),d=i.getBinding();for(let Oe=0;Oe<Ee.length;Oe++){let ht=Ee[Oe].camera;if(ht){let vt=m[ht];vt||(vt=new fl,m[ht]=vt);let et=d.getCameraImage(ht);vt.sourceTexture=et}}}}for(let Ee=0;Ee<C.length;Ee++){let Ae=w[Ee],ye=C[Ee];Ae!==null&&ye!==void 0&&ye.update(Ae,ge,l||o)}Q&&Q(X,ge),ge.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ge}),g=null}let He=new mw;He.setAnimationLoop(we),this.setAnimationLoop=function(X){Q=X},this.dispose=function(){}}},gU=new Et,ww=new ke;ww.set(-1,0,0,0,1,0,0,0,1);function yU(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,kv(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,x,T,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&h(p,m,M)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),S(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,x,T):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Cn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Cn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let x=e.get(m),T=x.envMap,M=x.envMapRotation;T&&(p.envMap.value=T,p.envMapRotation.value.setFromMatrix4(gU.makeRotationFromEuler(M)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(ww),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,x,T){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=T*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function h(p,m,x){p.ior.value=m.ior,m.diffuseRoughness>0&&(p.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Cn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function S(p,m){let x=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function vU(n,e,t,i){let r={},s={};function o(x,T){let M=T.program;i.uniformBlockBinding(x,M,r[x.id])}function a(x,T){let M=r[x.id];M===void 0&&(g(x),M=c(x),r[x.id]=M,x.addEventListener("dispose",p));let C=T.program;i.updateUBOMapping(x,C);let w=e.render.frame;s[x.id]!==w&&(l(x),s[x.id]=w)}function c(x){let T=n.createBuffer(),M=x.__size,C=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,M,C),n.bindBuffer(n.UNIFORM_BUFFER,null),T}function l(x){let T=r[x.id],M=x.uniforms,C=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let w=0,y=M.length;w<y;w++){let E=M[w];if(Array.isArray(E))for(let L=0,R=E.length;L<R;L++)u(E[L],w,L,C);else u(E,w,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(x,T,M,C){if(f(x,T,M,C)===!0){let w=x.__offset,y=x.value;if(Array.isArray(y)){let E=0;for(let L=0;L<y.length;L++){let R=y[L],O=S(R,!0);d(R,x.__data,E),E+=O.storage/Float32Array.BYTES_PER_ELEMENT}}else d(y,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,w,x.__data)}}function d(x,T,M){typeof x=="number"||typeof x=="boolean"?T[M]=x:x.isMatrix3?(T[M]=x.elements[0],T[M+1]=x.elements[1],T[M+2]=x.elements[2],T[M+3]=0,T[M+4]=x.elements[3],T[M+5]=x.elements[4],T[M+6]=x.elements[5],T[M+7]=0,T[M+8]=x.elements[6],T[M+9]=x.elements[7],T[M+10]=x.elements[8],T[M+11]=0):ArrayBuffer.isView(x)?T.set(x.subarray(0,T.length-M),M):x.toArray(T,M)}function f(x,T,M,C){let w=x.value,y=T+"_"+M;if(Array.isArray(w)){C[y]===void 0&&(C[y]=[]);let E=C[y],L=!1;for(let R=0;R<w.length;R++)h(w[R],E,R)===!0&&(L=!0);return L}return h(w,C,y)}function h(x,T,M){if(T[M]===void 0)return typeof x=="number"||typeof x=="boolean"?T[M]=x:ArrayBuffer.isView(x)?T[M]=x.slice():T[M]=x.clone(),!0;{let C=T[M];if(typeof x=="number"||typeof x=="boolean"){if(C!==x)return T[M]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(C.equals(x)===!1)return C.copy(x),!0}}return!1}function g(x){let T=x.uniforms,M=0,C=16;for(let y=0,E=T.length;y<E;y++){let L=Array.isArray(T[y])?T[y]:[T[y]];for(let R=0,O=L.length;R<O;R++){let F=L[R],G=Array.isArray(F.value)?F.value:[F.value],A=Array.isArray(T[y])||Array.isArray(F.value),z=M;for(let V=0,ne=G.length;V<ne;V++){let W=G[V],J=S(W,A),Q=M%C,we=Q%J.boundary,He=Q+we;M+=we,He!==0&&C-He<J.storage&&(M+=C-He),V===0&&(z=M),M+=J.storage}let Z=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new Z((M-z)/Float32Array.BYTES_PER_ELEMENT),F.__offset=z}}let w=M%C;return w>0&&(M+=C-w),x.__size=M,x.__cache={},this}function S(x,T){let M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=16,M.storage=48):x.isMatrix4?(M.boundary=16,M.storage=64):x.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(M.boundary=16,M.storage=x.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",x),T===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function p(x){let T=x.target;T.removeEventListener("dispose",p),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function m(){for(let x in r)n.deleteBuffer(r[x]);r={},s={}}return{bind:o,update:a,dispose:m}}var _U=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Yi=null;function SU(){return Yi===null&&(Yi=new Bf(_U,16,16,as,Ai),Yi.name="DFG_LUT",Yi.minFilter=Mn,Yi.magFilter=Mn,Yi.wrapS=ji,Yi.wrapT=ji,Yi.generateMipmaps=!1,Yi.needsUpdate=!0),Yi}var Jh=class{constructor(e={}){let{canvas:t=Ub(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=Rn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;let S=h,p=new Set([yh,gh,mh]),m=new Set([Rn,Di,ba,eo,hh,ph]),x=new Uint32Array(4),T=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},C=null,w=null,y=[],E=[],L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,O=!1,F=null,G=null,A=null,z=null;this._outputColorSpace=Sn;let Z=0,V=0,ne=null,W=-1,J=null,Q=new Tt,we=new Tt,He=null,X=new Ke(0),ge=0,Ee=t.width,Ae=t.height,ye=1,je=null,Ot=null,Oe=new Tt(0,0,Ee,Ae),ht=new Tt(0,0,Ee,Ae),vt=!1,et=new Qr,tn=new Vf,Ht=!1,Dn=!1,Ct=new Et,Ni=new N,qt=new Tt,qn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xn=!1;function Yn(){return ne===null?ye:1}let P=i;function Zn(_,I){return t.getContext(_,I)}let bt,wt,fe,zt,Re,Ue,b,v,U,ee,K,se,ue,$,q,ae,D,Y,j,ce,re,oe,De;try{let _={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Ie,!1),t.addEventListener("webglcontextrestored",$e,!1),t.addEventListener("webglcontextcreationerror",pe,!1),P===null){let I="webgl2";if(P=Zn(I,_),P===null)throw Zn(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}qe()}catch(_){throw t.removeEventListener("webglcontextlost",Ie,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),Le("WebGLRenderer: "+_.message),_}function qe(){bt=new RF(P),bt.init(),re=new hU(P,bt),wt=new SF(P,bt,e,re),fe=new dU(P,bt),wt.reversedDepthBuffer&&f&&fe.buffers.depth.setReversed(!0),G=P.createFramebuffer(),A=P.createFramebuffer(),z=P.createFramebuffer(),zt=new OF(P),Re=new Kk,Ue=new fU(P,bt,fe,Re,wt,re,zt),b=new AF(R),v=new FP(P),oe=new vF(P,v),U=new NF(P,v,zt,oe),ee=new FF(P,U,v,oe,zt),Y=new LF(P,wt,Ue),q=new xF(Re),K=new Zk(R,b,bt,wt,oe,q),se=new yU(R,Re),ue=new Qk,$=new sU(bt),D=new yF(R,b,fe,ee,g,c),ae=new uU(R,ee,wt),De=new vU(P,zt,wt,fe),j=new _F(P,bt,zt),ce=new PF(P,bt,zt),zt.programs=K.programs,R.capabilities=wt,R.extensions=bt,R.properties=Re,R.renderLists=ue,R.shadowMap=ae,R.state=fe,R.info=zt}S!==Rn&&(L=new UF(S,t.width,t.height,a,r,s));let ie=new Zv(R,P);this.xr=ie,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let _=bt.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=bt.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(_){_!==void 0&&(ye=_,this.setSize(Ee,Ae,!1))},this.getSize=function(_){return _.set(Ee,Ae)},this.setSize=function(_,I,H=!0){if(ie.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}Ee=_,Ae=I,t.width=Math.floor(_*ye),t.height=Math.floor(I*ye),H===!0&&(t.style.width=_+"px",t.style.height=I+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,_,I)},this.getDrawingBufferSize=function(_){return _.set(Ee*ye,Ae*ye).floor()},this.setDrawingBufferSize=function(_,I,H){Ee=_,Ae=I,ye=H,t.width=Math.floor(_*H),t.height=Math.floor(I*H),this.setViewport(0,0,_,I)},this.setEffects=function(_){if(S===Rn){Le("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let I=0;I<_.length;I++)if(_[I].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(Q)},this.getViewport=function(_){return _.copy(Oe)},this.setViewport=function(_,I,H,k){_.isVector4?Oe.set(_.x,_.y,_.z,_.w):Oe.set(_,I,H,k),fe.viewport(Q.copy(Oe).multiplyScalar(Yn()).round())},this.getScissor=function(_){return _.copy(ht)},this.setScissor=function(_,I,H,k){_.isVector4?ht.set(_.x,_.y,_.z,_.w):ht.set(_,I,H,k),fe.scissor(we.copy(ht).multiplyScalar(Yn()).round())},this.getScissorTest=function(){return vt},this.setScissorTest=function(_){fe.setScissorTest(vt=_)},this.setOpaqueSort=function(_){je=_},this.setTransparentSort=function(_){Ot=_},this.getClearColor=function(_){return _.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(_=!0,I=!0,H=!0){let k=0;if(_){let B=!1;if(ne!==null){let de=ne.texture.format;B=p.has(de)}if(B){let de=ne.texture.type,xe=m.has(de),le=D.getClearColor(),ve=D.getClearAlpha(),Te=le.r,ze=le.g,tt=le.b;xe?(x[0]=Te,x[1]=ze,x[2]=tt,x[3]=ve,P.clearBufferuiv(P.COLOR,0,x)):(T[0]=Te,T[1]=ze,T[2]=tt,T[3]=ve,P.clearBufferiv(P.COLOR,0,T))}else k|=P.COLOR_BUFFER_BIT}I&&(k|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(k|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&P.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(_){_.setRenderer(this),F=_},this.dispose=function(){t.removeEventListener("webglcontextlost",Ie,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),D.dispose(),ue.dispose(),$.dispose(),Ue.dispose(),Re.dispose(),b.dispose(),ee.dispose(),U.dispose(),oe.dispose(),De.dispose(),K.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",t_),ie.removeEventListener("sessionend",n_),cs.stop()};function Ie(_){_.preventDefault(),Nv("WebGLRenderer: Context Lost."),O=!0}function $e(){Nv("WebGLRenderer: Context Restored."),O=!1;let _=zt.autoReset,I=ae.enabled,H=ae.autoUpdate,k=ae.needsUpdate,B=ae.type;qe(),zt.autoReset=_,ae.enabled=I,ae.autoUpdate=H,ae.needsUpdate=k,ae.type=B}function pe(_){Le("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function pt(_){let I=_.target;I.removeEventListener("dispose",pt),Xt(I)}function Xt(_){br(_),Re.remove(_)}function br(_){let I=Re.get(_).programs;I!==void 0&&(I.forEach(function(H){K.releaseProgram(H)}),_.isShaderMaterial&&K.releaseShaderCache(_))}this.renderBufferDirect=function(_,I,H,k,B,de){I===null&&(I=qn);let xe=B.isMesh&&B.matrixWorld.determinantAffine()<0,le=kw(_,I,H,k,B);fe.setMaterial(k,xe);let ve=H.index,Te=1;if(k.wireframe===!0){if(ve=U.getWireframeAttribute(H),ve===void 0)return;Te=2}let ze=H.drawRange,tt=H.attributes.position,Me=ze.start*Te,nt=(ze.start+ze.count)*Te;de!==null&&(Me=Math.max(Me,de.start*Te),nt=Math.min(nt,(de.start+de.count)*Te)),ve!==null?(Me=Math.max(Me,0),nt=Math.min(nt,ve.count)):tt!=null&&(Me=Math.max(Me,0),nt=Math.min(nt,tt.count));let Lt=nt-Me;if(Lt<0||Lt===1/0)return;oe.setup(B,k,le,H,ve);let xt,_t=j;if(ve!==null&&(xt=v.get(ve),_t=ce,_t.setIndex(xt)),B.isMesh)k.wireframe===!0?(fe.setLineWidth(k.wireframeLinewidth*Yn()),_t.setMode(P.LINES)):_t.setMode(P.TRIANGLES);else if(B.isLine){let ln=k.linewidth;ln===void 0&&(ln=1),fe.setLineWidth(ln*Yn()),B.isLineSegments?_t.setMode(P.LINES):B.isLineLoop?_t.setMode(P.LINE_LOOP):_t.setMode(P.LINE_STRIP)}else B.isPoints?_t.setMode(P.POINTS):B.isSprite&&_t.setMode(P.TRIANGLES);if(B.isBatchedMesh)if(bt.get("WEBGL_multi_draw"))_t.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let ln=B._multiDrawStarts,be=B._multiDrawCounts,gn=B._multiDrawCount,ot=ve?v.get(ve).bytesPerElement:1,ls=Re.get(k).currentProgram.getUniforms();for(let un=0;un<gn;un++)ls.setValue(P,"_gl_DrawID",un),_t.render(ln[un]/ot,be[un])}else if(B.isInstancedMesh)_t.renderInstances(Me,Lt,B.count);else if(H.isInstancedBufferGeometry){let ln=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,be=Math.min(H.instanceCount,ln);_t.renderInstances(Me,Lt,be)}else _t.render(Me,Lt)};function e_(_,I,H,k){F!==null&&_.isNodeMaterial&&F.setObject(k,_),Ht===!0&&q.setState(_,H,!1),_.transparent===!0&&_.side===qi&&_.forceSinglePass===!1?(_.side=Cn,_.needsUpdate=!0,Ia(_,I,k),_.side=os,_.needsUpdate=!0,Ia(_,I,k),_.side=qi):Ia(_,I,k)}this.compile=function(_,I,H=null){H===null&&(H=_),F!==null&&F.renderStart(_,I,H),w=$.get(H),w.init(I),E.push(w),H.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),_!==H&&_.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),w.setupLights(),F!==null&&F.updateLights(w.state.lightsArray),Dn=this.localClippingEnabled,Ht=q.init(this.clippingPlanes,Dn),Ht===!0&&q.setGlobalState(this.clippingPlanes,I),F!==null&&ae.render(w.state.shadowsArray,H,I);let k=new Set;return _.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let de=B.material;if(de)if(Array.isArray(de))for(let xe=0;xe<de.length;xe++){let le=de[xe];e_(le,H,I,B),k.add(le)}else e_(de,H,I,B),k.add(de)}),w=E.pop(),F!==null&&F.renderEnd(),k},this.compileAsync=function(_,I,H=null){let k=this.compile(_,I,H);return new Promise(B=>{function de(){if(k.forEach(function(xe){let ve=Re.get(xe).currentProgram;(ve===void 0||ve.isReady())&&k.delete(xe)}),k.size===0){B(_);return}setTimeout(de,10)}bt.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let sp=null;function Lw(_){sp&&sp(_)}function t_(){cs.stop()}function n_(){cs.start()}let cs=new mw;cs.setAnimationLoop(Lw),typeof self<"u"&&cs.setContext(self),this.setAnimationLoop=function(_){sp=_,ie.setAnimationLoop(_),_===null?cs.stop():cs.start()},ie.addEventListener("sessionstart",t_),ie.addEventListener("sessionend",n_),this.render=function(_,I){if(I!==void 0&&I.isCamera!==!0){Le("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;F!==null&&F.renderStart(_,I);let H=ie.enabled===!0&&ie.isPresenting===!0,k=L!==null&&(ne===null||H)&&L.begin(R,ne);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(I),I=ie.getCamera()),_.isScene===!0&&_.onBeforeRender(R,_,I,ne),w=$.get(_,E.length),w.init(I),w.state.textureUnits=Ue.getTextureUnits(),E.push(w),Ct.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),I.isArrayCamera?tn.setFromArrayCamera(I):et.setFromProjectionMatrix(Ct,ai,I.reversedDepth),Dn=this.localClippingEnabled,Ht=q.init(this.clippingPlanes,Dn),C=ue.get(_,y.length),C.init(),y.push(C),this.info.render.frame++,ie.enabled===!0&&ie.isPresenting===!0){let xe=R.xr.getDepthSensingMesh();xe!==null&&op(xe,I,-1/0,R.sortObjects)}op(_,I,0,R.sortObjects),C.finish(),F!==null&&F.updateLights(w.state.lightsArray),R.sortObjects===!0&&C.sort(je,Ot),Xn=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Xn&&D.addToRenderList(C,_),this.info.autoReset===!0&&this.info.reset(),Ht===!0&&q.beginShadows();let B=w.state.shadowsArray;if(ae.render(B,_,I),Ht===!0&&q.endShadows(),(k&&L.hasRenderPass())===!1){let xe=C.opaque,le=C.transmissive;if(w.setupLights(),I.isArrayCamera){let ve=I.cameras;if(le.length>0)for(let Te=0,ze=ve.length;Te<ze;Te++){let tt=ve[Te];r_(xe,le,_,tt)}Xn&&D.render(_);for(let Te=0,ze=ve.length;Te<ze;Te++){let tt=ve[Te];i_(C,_,tt,tt.viewport)}}else le.length>0&&r_(xe,le,_,I),Xn&&D.render(_),i_(C,_,I)}ne!==null&&V===0&&(Ue.updateMultisampleRenderTarget(ne),Ue.updateRenderTargetMipmap(ne)),k&&L.end(R),_.isScene===!0&&_.onAfterRender(R,_,I),oe.resetDefaultState(),W=-1,J=null,E.pop(),E.length>0?(w=E[E.length-1],Ue.setTextureUnits(w.state.textureUnits),Ht===!0&&q.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,y.pop(),y.length>0?C=y[y.length-1]:C=null,F!==null&&F.renderEnd()};function op(_,I,H,k){if(_.visible===!1)return;if(_.layers.test(I.layers)){if(_.isGroup)H=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(I);else if(_.isLight)w.pushLight(_),_.castShadow&&w.pushShadow(_);else if(_.isSprite){let xe=I.isArrayCamera?tn:et;if(!_.frustumCulled||_.intersectsFrustum(xe)){k&&qt.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Ct);let le=ee.update(_),ve=_.material;ve.visible&&C.push(_,le,ve,H,qt.z,null,I)}}else if(_.isMesh||_.isLine||_.isPoints){let xe=I.isArrayCamera?tn:et;if(!_.frustumCulled||_.intersectsFrustum(xe)){let le=ee.update(_),ve=_.material;if(k&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),qt.copy(_.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),qt.copy(le.boundingSphere.center)),qt.applyMatrix4(_.matrixWorld).applyMatrix4(Ct)),Array.isArray(ve)){let Te=le.groups;for(let ze=0,tt=Te.length;ze<tt;ze++){let Me=Te[ze],nt=ve[Me.materialIndex];nt&&nt.visible&&C.push(_,le,nt,H,qt.z,Me,I)}}else ve.visible&&C.push(_,le,ve,H,qt.z,null,I)}}}let de=_.children;for(let xe=0,le=de.length;xe<le;xe++)op(de[xe],I,H,k)}function i_(_,I,H,k){let{opaque:B,transmissive:de,transparent:xe}=_;w.setupLightsView(H),Ht===!0&&q.setGlobalState(R.clippingPlanes,H),k&&fe.viewport(Q.copy(k)),B.length>0&&kl(B,I,H),de.length>0&&kl(de,I,H),xe.length>0&&kl(xe,I,H),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function r_(_,I,H,k){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[k.id]===void 0){let Me=bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[k.id]=new Wn(1,1,{generateMipmaps:!0,type:Me?Ai:Rn,minFilter:xr,samples:Math.max(4,wt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:it.workingColorSpace})}let de=w.state.transmissionRenderTarget[k.id],xe=k.viewport||Q;de.setSize(xe.z*R.transmissionResolutionScale,xe.w*R.transmissionResolutionScale);let le=R.getRenderTarget(),ve=R.getActiveCubeFace(),Te=R.getActiveMipmapLevel();R.setRenderTarget(de),R.getClearColor(X),ge=R.getClearAlpha(),ge<1&&R.setClearColor(16777215,.5),R.clear(),Xn&&D.render(H);let ze=R.toneMapping;R.toneMapping=Xi;let tt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),w.setupLightsView(k),Ht===!0&&q.setGlobalState(R.clippingPlanes,k),kl(_,H,k),Ue.updateMultisampleRenderTarget(de),Ue.updateRenderTargetMipmap(de),bt.has("WEBGL_multisampled_render_to_texture")===!1){let Me=!1;for(let nt=0,Lt=I.length;nt<Lt;nt++){let xt=I[nt],{object:_t,geometry:ln,material:be,group:gn}=xt;if(be.side===qi&&_t.layers.test(k.layers)){let ot=be.side;be.side=Cn,be.needsUpdate=!0,s_(_t,H,k,ln,be,gn),be.side=ot,be.needsUpdate=!0,Me=!0}}Me===!0&&(Ue.updateMultisampleRenderTarget(de),Ue.updateRenderTargetMipmap(de))}R.setRenderTarget(le,ve,Te),R.setClearColor(X,ge),tt!==void 0&&(k.viewport=tt),R.toneMapping=ze}function kl(_,I,H){let k=I.isScene===!0?I.overrideMaterial:null;for(let B=0,de=_.length;B<de;B++){let xe=_[B],{object:le,geometry:ve,group:Te}=xe,ze=xe.material;ze.allowOverride===!0&&k!==null&&(ze=k),le.layers.test(H.layers)&&s_(le,I,H,ve,ze,Te)}}function s_(_,I,H,k,B,de){F!==null&&B.isNodeMaterial&&F.setObject(_,B),_.onBeforeRender(R,I,H,k,B,de),_.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),B.onBeforeRender(R,I,H,k,_,de),B.transparent===!0&&B.side===qi&&B.forceSinglePass===!1?(B.side=Cn,B.needsUpdate=!0,R.renderBufferDirect(H,I,k,B,_,de),B.side=os,B.needsUpdate=!0,R.renderBufferDirect(H,I,k,B,_,de),B.side=qi):R.renderBufferDirect(H,I,k,B,_,de),_.onAfterRender(R,I,H,k,B,de)}function o_(_){let I=0;for(let H of _)H.texture!==null&&I++;return I}function Ia(_,I,H){I.isScene!==!0&&(I=qn);let k=Re.get(_),B=w.state.lights,de=w.state.shadowsArray,xe=B.state.version,le=K.getParameters(_,B.state,de,I,H,w.state.lightProbeGridArray),ve=K.getProgramCacheKey(le),Te=k.programs;k.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,k.fog=I.fog;let ze=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;k.envMap=b.get(_.envMap||k.environment,ze),k.envMapRotation=k.environment!==null&&_.envMap===null?I.environmentRotation:_.envMapRotation,Te===void 0&&(_.addEventListener("dispose",pt),Te=new Map,k.programs=Te,k.programVariants=new Map);let tt=Te.get(ve);if(tt!==void 0){if(k.currentProgram===tt&&k.lightsStateVersion===xe)return c_(_,le),tt}else le.uniforms=K.getUniforms(_),F!==null&&_.isNodeMaterial&&F.build(_,H,le),_.onBeforeCompile(le,R),tt=K.acquireProgram(le,ve),Te.set(ve,tt),k.uniforms=le.uniforms;let Me=k.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Me.clippingPlanes=q.uniform),c_(_,le),k.needsLights=Bw(_),k.lightsStateVersion=xe,k.needsLights&&(Me.ambientLightColor.value=B.state.ambient,Me.lightProbe.value=B.state.probe,Me.sunLights.value=B.state.sun,Me.sunLightShadows.value=B.state.sunShadow,Me.directionalLights.value=B.state.directional,Me.directionalLightShadows.value=B.state.directionalShadow,Me.spotLights.value=B.state.spot,Me.spotLightShadows.value=B.state.spotShadow,Me.rectAreaLights.value=B.state.rectArea,Me.ltc_1.value=B.state.rectAreaLTC1,Me.ltc_2.value=B.state.rectAreaLTC2,Me.pointLights.value=B.state.point,Me.pointLightShadows.value=B.state.pointShadow,Me.hemisphereLights.value=B.state.hemi,Me.sunShadowMatrix.value=B.state.sunShadowMatrix,Me.sunShadowCascade.value=B.state.sunShadowCascade,Me.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Me.spotLightMatrix.value=B.state.spotLightMatrix,Me.spotLightMap.value=B.state.spotLightMap,Me.pointShadowMatrix.value=B.state.pointShadowMatrix),k.numLightProbeGrids=o_(w.state.lightProbeGridArray),k.currentProgram=tt,k.uniformsList=null,tt}function Fw(_,I,H,k,B){let de=Re.get(_),xe=de.currentProgram.id+","+k+","+B,le=de.programVariants.get(xe);return le===void 0?(le=Ia(_,I,H),de.programVariants.set(xe,le)):(de.currentProgram=le,de.uniformsList=null,de.outputColorSpace=k,de.toneMapping=B),le}function a_(_){if(_.uniformsList===null){let I=_.currentProgram.getUniforms();_.uniformsList=Ca.seqWithValue(I.seq,_.uniforms)}return _.uniformsList}function c_(_,I){let H=Re.get(_);H.outputColorSpace=I.outputColorSpace,H.batching=I.batching,H.batchingColor=I.batchingColor,H.instancing=I.instancing,H.instancingColor=I.instancingColor,H.instancingMorph=I.instancingMorph,H.skinning=I.skinning,H.morphTargets=I.morphTargets,H.morphNormals=I.morphNormals,H.morphColors=I.morphColors,H.morphTargetsCount=I.morphTargetsCount,H.numClippingPlanes=I.numClippingPlanes,H.numIntersection=I.numClipIntersection,H.vertexAlphas=I.vertexAlphas,H.vertexTangents=I.vertexTangents,H.toneMapping=I.toneMapping}function kw(_,I,H,k,B){I.isScene!==!0&&(I=qn),Ue.resetTextureUnits();let de=I.fog,xe=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?I.environment:null,le=ne===null?R.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:it.workingColorSpace,ve=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Te=b.get(k.envMap||xe,ve),ze=k.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,tt=!!H.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Me=!!H.morphAttributes.position,nt=!!H.morphAttributes.normal,Lt=!!H.morphAttributes.color,xt=Xi;k.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(xt=R.toneMapping);let _t=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ln=_t!==void 0?_t.length:0,be=Re.get(k),gn=w.state.lights;if(Ht===!0&&(Dn===!0||_!==J)){let Dt=_===J&&k.id===W;q.setState(k,_,Dt)}let ot=!1,ls=!1;k.version===be.__version?be.needsLights&&be.lightsStateVersion!==gn.state.version||B.isBatchedMesh&&be.batching===!1||!B.isBatchedMesh&&be.batching===!0||B.isBatchedMesh&&be.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&be.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&be.instancing===!1||!B.isInstancedMesh&&be.instancing===!0||B.isSkinnedMesh&&be.skinning===!1||!B.isSkinnedMesh&&be.skinning===!0||B.isInstancedMesh&&be.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&be.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&be.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&be.instancingMorph===!1&&B.morphTexture!==null||be.envMap!==Te||k.fog===!0&&be.fog!==de||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==q.numPlanes||be.numIntersection!==q.numIntersection)||be.vertexAlphas!==ze||be.vertexTangents!==tt||be.morphTargets!==Me||be.morphNormals!==nt||be.morphColors!==Lt||be.morphTargetsCount!==ln||be.numLightProbeGrids!==o_(w.state.lightProbeGridArray)?ot=!0:(be.outputColorSpace!==le||be.toneMapping!==xt)&&(ls=!0):(ot=!0,be.__version=k.version);let un=be.currentProgram;(ot===!0||ls===!0)&&(un=ls===!0?Fw(k,I,B,le,xt):Ia(k,I,B),F&&k.isNodeMaterial&&F.onUpdateProgram(k,un,be));let Ul=!1,wr=!1,us=!1,rt=un.getUniforms(),nn=be.uniforms;if(fe.useProgram(un.program)&&(Ul=!0,wr=!0,us=!0),k.id!==W&&(W=k.id,wr=!0),Ul||J!==_){fe.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),rt.setValue(P,"projectionMatrix",_.projectionMatrix),rt.setValue(P,"viewMatrix",_.matrixWorldInverse);let Yt=rt.map.cameraPosition;Yt!==void 0&&Yt.setValue(P,Ni.setFromMatrixPosition(_.matrixWorld)),wt.logarithmicDepthBuffer&&rt.setValue(P,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&rt.setValue(P,"isOrthographic",_.isOrthographicCamera===!0),J!==_&&(J=_,wr=!0,us=!0)}if(be.needsLights&&(gn.state.sunShadowMap.length>0&&rt.setValue(P,"sunShadowMap",gn.state.sunShadowMap,Ue),gn.state.directionalShadowMap.length>0&&rt.setValue(P,"directionalShadowMap",gn.state.directionalShadowMap,Ue),gn.state.spotShadowMap.length>0&&rt.setValue(P,"spotShadowMap",gn.state.spotShadowMap,Ue),gn.state.pointShadowMap.length>0&&rt.setValue(P,"pointShadowMap",gn.state.pointShadowMap,Ue)),B.isSkinnedMesh){rt.setOptional(P,B,"bindMatrix"),rt.setOptional(P,B,"bindMatrixInverse");let Dt=B.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),rt.setValue(P,"boneTexture",Dt.boneTexture,Ue))}B.isBatchedMesh&&(rt.setOptional(P,B,"batchingTexture"),rt.setValue(P,"batchingTexture",B._matricesTexture,Ue),rt.setOptional(P,B,"batchingIdTexture"),rt.setValue(P,"batchingIdTexture",B._indirectTexture,Ue),rt.setOptional(P,B,"batchingColorTexture"),B._colorsTexture!==null&&rt.setValue(P,"batchingColorTexture",B._colorsTexture,Ue));let li=H.morphAttributes;if((li.position!==void 0||li.normal!==void 0||li.color!==void 0)&&Y.update(B,H,un),(wr||be.receiveShadow!==B.receiveShadow)&&(be.receiveShadow=B.receiveShadow,rt.setValue(P,"receiveShadow",B.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&I.environment!==null&&(nn.envMapIntensity.value=I.environmentIntensity),nn.dfgLUT!==void 0&&(nn.dfgLUT.value=SU()),wr){if(rt.setValue(P,"toneMappingExposure",R.toneMappingExposure),be.needsLights&&Uw(nn,us),de&&k.fog===!0&&se.refreshFogUniforms(nn,de),se.refreshMaterialUniforms(nn,k,ye,Ae,w.state.transmissionRenderTarget[_.id]),be.needsLights&&be.numLightProbeGrids>0){let Dt=M,Yt=0;for(let Ki of w.state.lightProbeGridArray)Ki.texture!==null&&(Dt.textures[Yt]=Ki.texture,Dt.min[Yt]=Ki.boundingBox.min,Dt.max[Yt]=Ki.boundingBox.max,Dt.resolution[Yt]=Ki.resolution,Yt++);for(let Ki in Dt)Dt[Ki].length=Yt;nn.probesSH.value=Dt.textures,nn.probesMin.value=Dt.min,nn.probesMax.value=Dt.max,nn.probesResolution.value=Dt.resolution}Ca.upload(P,a_(be),nn,Ue)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Ca.upload(P,a_(be),nn,Ue),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&rt.setValue(P,"center",B.center),rt.setValue(P,"modelViewMatrix",B.modelViewMatrix),rt.setValue(P,"normalMatrix",B.normalMatrix),rt.setValue(P,"modelMatrix",B.matrixWorld),k.uniformsGroups!==void 0){let Dt=k.uniformsGroups;for(let Yt=0,Ki=Dt.length;Yt<Ki;Yt++){let u_=Dt[Yt];De.update(u_,un),De.bind(u_,un)}}return un}function Uw(_,I){_.ambientLightColor.needsUpdate=I,_.lightProbe.needsUpdate=I,_.sunLights.needsUpdate=I,_.sunLightShadows.needsUpdate=I,_.directionalLights.needsUpdate=I,_.directionalLightShadows.needsUpdate=I,_.pointLights.needsUpdate=I,_.pointLightShadows.needsUpdate=I,_.spotLights.needsUpdate=I,_.spotLightShadows.needsUpdate=I,_.rectAreaLights.needsUpdate=I,_.hemisphereLights.needsUpdate=I}function Bw(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(_,I,H){let k=Re.get(_);k.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Re.get(_.texture).__webglTexture=I,Re.get(_.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:H,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,I){let H=Re.get(_);H.__webglFramebuffer=I,H.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(_,I=0,H=0){ne=_,Z=I,V=H;let k=null,B=!1,de=!1;if(_){let le=Re.get(_);if(le.__useDefaultFramebuffer!==void 0){fe.bindFramebuffer(P.FRAMEBUFFER,le.__webglFramebuffer),Q.copy(_.viewport),we.copy(_.scissor),He=_.scissorTest,fe.viewport(Q),fe.scissor(we),fe.setScissorTest(He),W=-1;return}else if(le.__webglFramebuffer===void 0)Ue.setupRenderTarget(_);else if(le.__hasExternalTextures)Ue.rebindTextures(_,Re.get(_.texture).__webglTexture,Re.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let ze=_.depthTexture;if(le.__boundDepthTexture!==ze){if(ze!==null&&Re.has(ze)&&(_.width!==ze.image.width||_.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ue.setupDepthRenderbuffer(_)}}let ve=_.texture;(ve.isData3DTexture||ve.isDataArrayTexture||ve.isCompressedArrayTexture)&&(de=!0);let Te=Re.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Te[I])?k=Te[I][H]:k=Te[I],B=!0):_.samples>0&&Ue.useMultisampledRTT(_)===!1?k=Re.get(_).__webglMultisampledFramebuffer:Array.isArray(Te)?k=Te[H]:k=Te,Q.copy(_.viewport),we.copy(_.scissor),He=_.scissorTest}else Q.copy(Oe).multiplyScalar(ye).floor(),we.copy(ht).multiplyScalar(ye).floor(),He=vt;if(H!==0&&(k=G),fe.bindFramebuffer(P.FRAMEBUFFER,k)&&fe.drawBuffers(_,k),fe.viewport(Q),fe.scissor(we),fe.setScissorTest(He),B){let le=Re.get(_.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+I,le.__webglTexture,H)}else if(de){let le=I;for(let ve=0;ve<_.textures.length;ve++){let Te=Re.get(_.textures[ve]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+ve,Te.__webglTexture,H,le)}}else if(_!==null&&H!==0){let le=Re.get(_.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,le.__webglTexture,H)}W=-1};function l_(_){let I=Re.get(_);return(I.__readFormat!==_.format||I.__readType!==_.type)&&(I.__readFormat=_.format,I.__readType=_.type,I.__formatReadable=wt.textureFormatReadable(_.format),I.__typeReadable=wt.textureTypeReadable(_.type)),I}this.readRenderTargetPixels=function(_,I,H,k,B,de,xe,le=0){if(!(_&&_.isWebGLRenderTarget)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Re.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&xe!==void 0&&(ve=ve[xe],Array.isArray(ve)&&(ve=ve[0])),ve){fe.bindFramebuffer(P.FRAMEBUFFER,ve);try{let Te=_.textures[le],ze=Te.format,tt=Te.type;_.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+le);let Me=l_(Te);if(Me.__formatReadable===!1){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Me.__typeReadable===!1){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=_.width-k&&H>=0&&H<=_.height-B&&P.readPixels(I,H,k,B,re.convert(ze),re.convert(tt),de)}finally{let Te=ne!==null?Re.get(ne).__webglFramebuffer:null;fe.bindFramebuffer(P.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(_,I,H,k,B,de,xe,le=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=Re.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&xe!==void 0&&(ve=ve[xe],Array.isArray(ve)&&(ve=ve[0])),ve)if(I>=0&&I<=_.width-k&&H>=0&&H<=_.height-B){fe.bindFramebuffer(P.FRAMEBUFFER,ve);let Te=_.textures[le],ze=Te.format,tt=Te.type;_.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+le);let Me=l_(Te);if(Me.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Me.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,nt),P.bufferData(P.PIXEL_PACK_BUFFER,de.byteLength,P.STREAM_READ),P.readPixels(I,H,k,B,re.convert(ze),re.convert(tt),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let Lt=ne!==null?Re.get(ne).__webglFramebuffer:null;fe.bindFramebuffer(P.FRAMEBUFFER,Lt);let xt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Vb(P,xt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,nt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,de),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(nt),P.deleteSync(xt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,I=null,H=0){let k=Math.pow(2,-H),B=Math.floor(_.image.width*k),de=Math.floor(_.image.height*k),xe=I!==null?I.x:0,le=I!==null?I.y:0;Ue.setTexture2D(_,0),P.copyTexSubImage2D(P.TEXTURE_2D,H,0,0,xe,le,B,de),fe.unbindTexture()},this.copyTextureToTexture=function(_,I,H=null,k=null,B=0,de=0){let xe,le,ve,Te,ze,tt,Me,nt,Lt,xt=_.isCompressedTexture?_.mipmaps[de]:_.image;if(H!==null)xe=H.max.x-H.min.x,le=H.max.y-H.min.y,ve=H.isBox3?H.max.z-H.min.z:1,Te=H.min.x,ze=H.min.y,tt=H.isBox3?H.min.z:0;else{let rt=Math.pow(2,-B);xe=Math.floor(xt.width*rt),le=Math.floor(xt.height*rt),_.isDataArrayTexture?ve=xt.depth:_.isData3DTexture?ve=Math.floor(xt.depth*rt):ve=1,Te=0,ze=0,tt=0}k!==null?(Me=k.x,nt=k.y,Lt=k.z):(Me=0,nt=0,Lt=0);let _t=re.convert(I.format),ln=re.convert(I.type),be;I.isData3DTexture?(Ue.setTexture3D(I,0),be=P.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Ue.setTexture2DArray(I,0),be=P.TEXTURE_2D_ARRAY):(Ue.setTexture2D(I,0),be=P.TEXTURE_2D),fe.activeTexture(P.TEXTURE0),fe.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,I.flipY),fe.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),fe.pixelStorei(P.UNPACK_ALIGNMENT,I.unpackAlignment);let gn=fe.getParameter(P.UNPACK_ROW_LENGTH),ot=fe.getParameter(P.UNPACK_IMAGE_HEIGHT),ls=fe.getParameter(P.UNPACK_SKIP_PIXELS),un=fe.getParameter(P.UNPACK_SKIP_ROWS),Ul=fe.getParameter(P.UNPACK_SKIP_IMAGES);fe.pixelStorei(P.UNPACK_ROW_LENGTH,xt.width),fe.pixelStorei(P.UNPACK_IMAGE_HEIGHT,xt.height),fe.pixelStorei(P.UNPACK_SKIP_PIXELS,Te),fe.pixelStorei(P.UNPACK_SKIP_ROWS,ze),fe.pixelStorei(P.UNPACK_SKIP_IMAGES,tt);let wr=_.isDataArrayTexture||_.isData3DTexture,us=I.isDataArrayTexture||I.isData3DTexture;if(_.isDepthTexture){let rt=Re.get(_),nn=Re.get(I),li=Re.get(rt.__renderTarget),Dt=Re.get(nn.__renderTarget);fe.bindFramebuffer(P.READ_FRAMEBUFFER,li.__webglFramebuffer),fe.bindFramebuffer(P.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let Yt=0;Yt<ve;Yt++)wr&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Re.get(_).__webglTexture,B,tt+Yt),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Re.get(I).__webglTexture,de,Lt+Yt)),P.blitFramebuffer(Te,ze,Te+xe,ze+le,Me,nt,Me+xe,nt+le,P.DEPTH_BUFFER_BIT,P.NEAREST);fe.bindFramebuffer(P.READ_FRAMEBUFFER,null),fe.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(B!==0||_.isRenderTargetTexture||Re.has(_)){let rt=Re.get(_),nn=Re.get(I);fe.bindFramebuffer(P.READ_FRAMEBUFFER,A),fe.bindFramebuffer(P.DRAW_FRAMEBUFFER,z);for(let li=0;li<ve;li++)wr?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,rt.__webglTexture,B,tt+li):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,rt.__webglTexture,B),us?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,nn.__webglTexture,de,Lt+li):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,nn.__webglTexture,de),B!==0?P.blitFramebuffer(Te,ze,Te+xe,ze+le,Me,nt,Me+xe,nt+le,P.COLOR_BUFFER_BIT,P.NEAREST):us?P.copyTexSubImage3D(be,de,Me,nt,Lt+li,Te,ze,xe,le):P.copyTexSubImage2D(be,de,Me,nt,Te,ze,xe,le);fe.bindFramebuffer(P.READ_FRAMEBUFFER,null),fe.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else us?_.isDataTexture||_.isData3DTexture?P.texSubImage3D(be,de,Me,nt,Lt,xe,le,ve,_t,ln,xt.data):I.isCompressedArrayTexture?P.compressedTexSubImage3D(be,de,Me,nt,Lt,xe,le,ve,_t,xt.data):P.texSubImage3D(be,de,Me,nt,Lt,xe,le,ve,_t,ln,xt):_.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,de,Me,nt,xe,le,_t,ln,xt.data):_.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,de,Me,nt,xt.width,xt.height,_t,xt.data):P.texSubImage2D(P.TEXTURE_2D,de,Me,nt,xe,le,_t,ln,xt);fe.pixelStorei(P.UNPACK_ROW_LENGTH,gn),fe.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ot),fe.pixelStorei(P.UNPACK_SKIP_PIXELS,ls),fe.pixelStorei(P.UNPACK_SKIP_ROWS,un),fe.pixelStorei(P.UNPACK_SKIP_IMAGES,Ul),de===0&&I.generateMipmaps===!0&&I.mipmapsAutoUpdate===!0&&P.generateMipmap(be),fe.unbindTexture()},this.initRenderTarget=function(_){Re.get(_).__webglFramebuffer===void 0&&Ue.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?Ue.setTextureCube(_,0):_.isData3DTexture?Ue.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?Ue.setTexture2DArray(_,0):Ue.setTexture2D(_,0),fe.unbindTexture()},this.resetState=function(){Z=0,V=0,ne=null,fe.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var Tw={type:"change"},Jv={type:"start"},Dw={type:"end"},tp=new Ys,Cw=new xn,xU=Math.cos(70*Ta.DEG2RAD),$t=new N,Nn=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Kv=1e-6,np=class extends bl{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:rs.ROTATE,MIDDLE:rs.DOLLY,RIGHT:rs.PAN},this.touches={ONE:ss.ROTATE,TWO:ss.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new jn,this._lastTargetPosition=new N,this._quat=new jn().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Sa,this._sphericalDelta=new Sa,this._scale=1,this._panOffset=new N,this._rotateStart=new _e,this._rotateEnd=new _e,this._rotateDelta=new _e,this._panStart=new _e,this._panEnd=new _e,this._panDelta=new _e,this._dollyStart=new _e,this._dollyEnd=new _e,this._dollyDelta=new _e,this._dollyDirection=new N,this._mouse=new _e,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=MU.bind(this),this._onPointerDown=EU.bind(this),this._onPointerUp=bU.bind(this),this._onContextMenu=RU.bind(this),this._onMouseWheel=CU.bind(this),this._onKeyDown=DU.bind(this),this._onTouchStart=IU.bind(this),this._onTouchMove=AU.bind(this),this._onMouseDown=wU.bind(this),this._onMouseMove=TU.bind(this),this._interceptControlDown=NU.bind(this),this._interceptControlUp=PU.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=lt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Tw),this.update(),this.state=lt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;$t.copy(t).sub(this.target),$t.applyQuaternion(this._quat),this._spherical.setFromVector3($t),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Nn:i>Math.PI&&(i-=Nn),r<-Math.PI?r+=Nn:r>Math.PI&&(r-=Nn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if($t.setFromSpherical(this._spherical),$t.applyQuaternion(this._quatInverse),t.copy(this.target).add($t),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=$t.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){let a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;let l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=$t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(tp.origin.copy(this.object.position),tp.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(tp.direction))<xU?this.object.lookAt(this.target):(Cw.setFromNormalAndCoplanarPoint(this.object.up,this.target),tp.intersectPlane(Cw,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Kv||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Kv||this._lastTargetPosition.distanceToSquared(this.target)>Kv?(this.dispatchEvent(Tw),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Nn/60*this.autoRotateSpeed*e:Nn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){$t.setFromMatrixColumn(t,0),$t.multiplyScalar(-e),this._panOffset.add($t)}_panUp(e,t){this.screenSpacePanning===!0?$t.setFromMatrixColumn(t,1):($t.setFromMatrixColumn(t,0),$t.crossVectors(this.object.up,$t)),$t.multiplyScalar(e),this._panOffset.add($t)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;$t.copy(r).sub(this.target);let s=$t.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Nn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Nn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Nn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Nn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new _e,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function EU(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function MU(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function bU(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Dw),this.state=lt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function wU(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case rs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=lt.DOLLY;break;case rs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=lt.ROTATE}break;case rs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(Jv)}function TU(n){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function CU(n){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(n.preventDefault(),this.dispatchEvent(Jv),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Dw))}function DU(n){this.enabled!==!1&&this._handleKeyDown(n)}function IU(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ss.ROTATE:if(this.enableRotate===!1){this.state=lt.NONE;break}this._handleTouchStartRotate(n),this.state=lt.TOUCH_ROTATE;break;case ss.PAN:if(this.enablePan===!1){this.state=lt.NONE;break}this._handleTouchStartPan(n),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case ss.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=lt.TOUCH_DOLLY_PAN;break;case ss.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(Jv)}function AU(n){switch(this._trackPointer(n),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=lt.NONE}}function RU(n){this.enabled!==!1&&n.preventDefault()}function NU(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function PU(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var OU={organization:"ORGANISATION",person:"PERSONNE",case:"AFFAIRE",event:"\xC9V\xC9NEMENT",document:"DOCUMENT"},Iw={organization:"#cc594f",person:"#447b81",case:"#b7843f",event:"#6c608a",document:"#68724d"};function Aw(n,e,t){let i=e.split(/\s+/u),r=[],s="";for(let o of i){let a=s?`${s} ${o}`:o;n.measureText(a).width>t&&s?(r.push(s),s=o):s=a}return s&&r.push(s),r}function Qv(n,e=!1){let t=document.createElement("canvas");t.width=640,t.height=420;let i=t.getContext("2d");if(!i)throw new Error("Canvas 2D indisponible");let r=i.createLinearGradient(0,0,640,420);r.addColorStop(0,e?"#fffdf1":"#eee9d9"),r.addColorStop(1,"#d9d0bc"),i.fillStyle=r,i.fillRect(0,0,640,420),i.globalAlpha=.055;for(let o=0;o<640;o+=12)for(let a=0;a<420;a+=12)i.fillStyle=(o+a)%24?"#1d1a16":"#ffffff",i.fillRect(o,a,1,1);i.globalAlpha=1,i.fillStyle=Iw[n.category],i.fillRect(0,0,640,52),i.fillStyle="#fffaf0",i.font="600 20px system-ui, sans-serif",i.fillText(OU[n.category],28,34),i.fillStyle="#29251f",i.font="700 38px Georgia, serif",Aw(i,n.label,575).slice(0,2).forEach((o,a)=>i.fillText(o,30,112+a*43)),i.strokeStyle=Iw[n.category],i.lineWidth=3,i.beginPath(),i.moveTo(30,190),i.lineTo(610,190),i.stroke(),i.fillStyle="#4d463b",i.font="24px system-ui, sans-serif",Aw(i,n.summary,575).slice(0,4).forEach((o,a)=>i.fillText(o,30,235+a*34)),i.fillStyle="#756c5e",i.font="600 17px ui-monospace, monospace",i.fillText(n.id.toUpperCase(),30,392),e&&(i.strokeStyle="#d13f38",i.lineWidth=12,i.strokeRect(6,6,628,408));let s=new ul(t);return s.colorSpace=Sn,s.needsUpdate=!0,s}function LU(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Rw(n){let e=new Map,t={organization:{x:-5.2,y:2.8},person:{x:0,y:3.2},case:{x:5.2,y:2.3},event:{x:-2.8,y:-3},document:{x:3.5,y:-3.1}},i=new Map;for(let r of n)i.set(r.category,[...i.get(r.category)??[],r]);for(let[r,s]of i){let o=t[r];s.forEach((a,c)=>{if(a.position){e.set(a.id,{x:a.position.x,y:a.position.y,z:a.position.z??.24,rotation:a.position.rotation??0});return}let l=LU(a.id),u=Math.floor(c/6)+1,d=c%6/6*Math.PI*2+l%21/50,f=1.1*u;e.set(a.id,{x:o.x+Math.cos(d)*f,y:o.y+Math.sin(d)*f,z:.22+l%7*.008,rotation:(l%13-6)*.006})})}return e}var ip=class{constructor(e,t={}){if(this.container=e,this.options=t,this.scene=new ol,this.raycaster=new Ml,this.pointer=new _e,this.nodeMeshes=new Map,this.edgeMeshes=new Map,this.subscriptions=[],this.animationFrame=0,this.dragPlane=new xn(new N(0,0,1),-.28),this.filters={},this.disposed=!1,this.animate=()=>{if(!this.disposed){if(this.animationFrame=requestAnimationFrame(this.animate),this.cameraAnimation){let i=Math.min(1,(performance.now()-this.cameraAnimation.started)/650),r=1-Math.pow(1-i,3);this.camera.position.lerpVectors(this.cameraAnimation.from,this.cameraAnimation.to,r),this.controls.target.lerpVectors(this.cameraAnimation.targetFrom,this.cameraAnimation.targetTo,r),i===1&&(this.cameraAnimation=void 0)}this.controls.update(),this.renderer.render(this.scene,this.camera)}},!e)throw new Error("Un conteneur est requis");this.scene.background=t.theme==="light"?new Ke("#d7d1c5"):null,this.camera=new En(38,1,.1,120),this.camera.position.set(t.camera?.x??0,t.camera?.y??0,t.camera?.z??22),this.renderer=new Jh({antialias:t.quality!=="low",alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,t.quality==="high"?2:1.5)),this.renderer.shadowMap.enabled=t.quality!=="low",this.renderer.domElement.className="investigation-board-canvas",this.renderer.domElement.tabIndex=0,this.renderer.domElement.setAttribute("role","application"),this.renderer.domElement.setAttribute("aria-label","Tableau d'enqu\xEAte interactif. Fl\xE8ches pour d\xE9placer la vue, plus et moins pour zoomer."),e.append(this.renderer.domElement),this.controls=new np(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.075,this.controls.enableRotate=!0,this.controls.minDistance=7,this.controls.maxDistance=42,this.controls.maxPolarAngle=Math.PI*.62,this.controls.target.set(t.camera?.targetX??0,t.camera?.targetY??0,t.camera?.targetZ??0),this.createEnvironment(),this.bindEvents(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),this.animate()}loadGraph(e){this.clearGraph(),this.graph=e,this.filters=this.options.initialFilters??{},e.visual?.cameraDistance&&(this.camera.position.z=e.visual.cameraDistance);let t=Rw(e.nodes);for(let i of e.nodes){let r=t.get(i.id);if(!r)continue;let s=this.createCard(i);s.position.set(r.x,r.y,r.z),s.rotation.z=r.rotation,this.scene.add(s),this.nodeMeshes.set(i.id,s)}for(let i of e.edges)this.createEdge(i);this.applyFilters(),this.options.selectedNodeId&&this.selectNode(this.options.selectedNodeId),this.emit("board-ready",{graph:e})}selectNode(e){let t=e&&this.nodeMeshes.has(e)?e:void 0;if(this.selectedNodeId===t)return;this.selectedNodeId&&this.updateCardTexture(this.selectedNodeId,!1),this.selectedNodeId=t,this.selectedNodeId&&this.updateCardTexture(this.selectedNodeId,!0);let i=this.graph?.nodes.find(r=>r.id===this.selectedNodeId)??null;this.updateFocusVisibility(),this.emit("node-selected",{node:i})}selectEdge(e){this.selectedEdgeId&&this.edgeMeshes.get(this.selectedEdgeId)?.material.emissive.set("#000000"),this.selectedEdgeId=e&&this.edgeMeshes.has(e)?e:void 0,this.selectedEdgeId&&this.edgeMeshes.get(this.selectedEdgeId)?.material.emissive.set("#6b1515");let t=this.graph?.edges.find(i=>i.id===this.selectedEdgeId)??null;this.emit("edge-selected",{edge:t})}focusNode(e){let t=this.nodeMeshes.get(e);if(!t)return;this.selectNode(e);let i=t.position.clone();i.z=0;let r=new N(i.x,i.y,10.5);if(this.options.reducedMotion||matchMedia("(prefers-reduced-motion: reduce)").matches){this.camera.position.copy(r),this.controls.target.copy(i);return}this.cameraAnimation={from:this.camera.position.clone(),to:r,targetFrom:this.controls.target.clone(),targetTo:i,started:performance.now()}}resetCamera(){this.selectNode(),this.cameraAnimation={from:this.camera.position.clone(),to:new N(0,0,22),targetFrom:this.controls.target.clone(),targetTo:new N,started:performance.now()}}setFilters(e){this.filters=he({},e),this.applyFilters()}setTheme(e){this.scene.background=e==="light"?new Ke("#d7d1c5"):null}getCameraState(){return{x:this.camera.position.x,y:this.camera.position.y,z:this.camera.position.z,targetX:this.controls.target.x,targetY:this.controls.target.y,targetZ:this.controls.target.z}}destroy(){if(!this.disposed){this.disposed=!0,cancelAnimationFrame(this.animationFrame),this.resizeObserver.disconnect();for(let e of this.subscriptions)e();this.clearGraph(),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}createEnvironment(){this.scene.add(new El("#d9c8ac",1.8));let e=new va("#ffd9a3",4.2);e.position.set(-6,9,13),e.castShadow=!0,this.scene.add(e);let t=new va("#7393a7",1.3);t.position.set(10,-3,8),this.scene.add(t)}createCard(e){let t=new es({map:Qv(e),roughness:.82,metalness:0,transparent:!0}),i=new Tn(new Zs(3.05,2),t);i.userData={kind:"node",id:e.id},i.castShadow=!0,i.receiveShadow=!0;let r=new gr,s=new Tn(new hl(.04,.045,.24,12),new es({color:"#6e1714",metalness:.2,roughness:.4}));s.rotation.x=Math.PI/2,s.position.z=.13;let o=new Tn(new gl(.11,16,10),new es({color:"#b52620",metalness:.1,roughness:.32}));return o.position.z=.27,r.add(s,o),r.position.y=.82,i.add(r),i}createEdge(e){let t=this.nodeMeshes.get(e.source),i=this.nodeMeshes.get(e.target);if(!t||!i)return;let r=this.buildEdgeMesh(e,t.position,i.position);this.scene.add(r),this.edgeMeshes.set(e.id,r)}buildEdgeMesh(e,t,i){let r=t.clone().setZ(.16),s=i.clone().setZ(.16),o=Math.min(1.1,r.distanceTo(s)*.11),a=new ya(r,r.clone().add(new N(0,-o,.5)),s.clone().add(new N(0,-o,.5)),s),c=new yl(a,22,.035,6,!1),l=new es({color:e.color??"#9f2824",roughness:.72,metalness:.05}),u=new Tn(c,l);return u.userData={kind:"edge",id:e.id},u.castShadow=!0,u}updateEdgesForNode(e){if(this.graph)for(let t of this.graph.edges.filter(i=>i.source===e||i.target===e)){let i=this.edgeMeshes.get(t.id),r=this.nodeMeshes.get(t.source),s=this.nodeMeshes.get(t.target);if(!i||!r||!s)continue;let o=this.buildEdgeMesh(t,r.position,s.position);o.visible=i.visible,this.scene.remove(i),i.geometry.dispose(),i.material.dispose(),this.scene.add(o),this.edgeMeshes.set(t.id,o)}}applyFilters(){if(!this.graph)return;let e=this.filters.query?.trim().toLocaleLowerCase("fr")??"";for(let t of this.graph.nodes){let i=!this.filters.categories?.length||this.filters.categories.includes(t.category),r=`${t.label} ${t.summary} ${t.description} ${(t.aliases??[]).join(" ")}`.toLocaleLowerCase("fr"),s=!e||r.includes(e),o=this.nodeMeshes.get(t.id);o&&(o.visible=i&&s)}for(let t of this.graph.edges){let i=this.nodeMeshes.get(t.source)?.visible??!1,r=this.nodeMeshes.get(t.target)?.visible??!1,s=!this.filters.relationTypes?.length||this.filters.relationTypes.includes(t.type),o=!this.filters.documentaryStatuses?.length||this.filters.documentaryStatuses.includes(t.documentaryStatus),a=this.edgeMeshes.get(t.id);a&&(a.visible=i&&r&&s&&o)}this.updateFocusVisibility()}updateFocusVisibility(){if(!this.graph)return;let e=new Set;if(this.selectedNodeId)for(let t of this.graph.edges)(t.source===this.selectedNodeId||t.target===this.selectedNodeId)&&(e.add(t.source),e.add(t.target));for(let[t,i]of this.nodeMeshes)i.material.opacity=!this.selectedNodeId||e.has(t)?1:.28;for(let[t,i]of this.edgeMeshes){let r=this.graph.edges.find(s=>s.id===t);i.material.opacity=!this.selectedNodeId||r?.source===this.selectedNodeId||r?.target===this.selectedNodeId?1:.16,i.material.transparent=!0}}updateCardTexture(e,t){let i=this.nodeMeshes.get(e),r=this.graph?.nodes.find(s=>s.id===e);!i||!r||(i.material.map?.dispose(),i.material.map=Qv(r,t),i.material.needsUpdate=!0)}bindEvents(){let e=this.renderer.domElement,t=a=>{let c=this.pick(a);if(c?.userData.kind==="node"){let l=c;this.selectNode(l.userData.id),this.options.enableDrag!==!1&&a.shiftKey&&(this.dragging=l,this.controls.enabled=!1,e.setPointerCapture(a.pointerId))}else c?.userData.kind==="edge"?this.selectEdge(c.userData.id):(this.selectNode(),this.selectEdge())},i=a=>{if(!this.dragging)return;this.setPointer(a);let c=new N;this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.ray.intersectPlane(this.dragPlane,c)&&(this.dragging.position.x=Ta.clamp(c.x,-8.2,8.2),this.dragging.position.y=Ta.clamp(c.y,-5.1,5.1),this.updateEdgesForNode(this.dragging.userData.id))},r=a=>{this.dragging&&e.releasePointerCapture(a.pointerId),this.dragging=void 0,this.controls.enabled=!0},s=a=>{if(this.options.enableKeyboard===!1)return;let c=a.shiftKey?1.2:.55;if(a.key==="ArrowLeft")this.controls.target.x-=c;else if(a.key==="ArrowRight")this.controls.target.x+=c;else if(a.key==="ArrowUp")this.controls.target.y+=c;else if(a.key==="ArrowDown")this.controls.target.y-=c;else if(a.key==="+"||a.key==="=")this.camera.position.z=Math.max(7,this.camera.position.z-1.5);else if(a.key==="-")this.camera.position.z=Math.min(42,this.camera.position.z+1.5);else if(a.key==="Home")this.resetCamera();else return;a.preventDefault()},o=()=>this.emit("camera-changed",this.getCameraState());e.addEventListener("pointerdown",t),e.addEventListener("pointermove",i),e.addEventListener("pointerup",r),e.addEventListener("keydown",s),this.controls.addEventListener("end",o),this.subscriptions.push(()=>e.removeEventListener("pointerdown",t),()=>e.removeEventListener("pointermove",i),()=>e.removeEventListener("pointerup",r),()=>e.removeEventListener("keydown",s),()=>this.controls.removeEventListener("end",o))}pick(e){return this.setPointer(e),this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.intersectObjects([...this.nodeMeshes.values(),...this.edgeMeshes.values()],!1).find(t=>t.object.visible)?.object}setPointer(e){let t=this.renderer.domElement.getBoundingClientRect();this.pointer.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1)}resize(){let e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1)}clearGraph(){for(let e of[...this.nodeMeshes.values(),...this.edgeMeshes.values()])this.scene.remove(e),e.geometry.dispose(),e.material.map?.dispose(),e.material.dispose();this.nodeMeshes.clear(),this.edgeMeshes.clear(),this.graph=void 0}emit(e,t){this.container.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}};var FU=["host"];function kU(n,e){n&1&&(Vn(0,"div",4),Oo(1,"Ouverture des archives\u2026"),ti())}function UU(n,e){if(n&1&&(Vn(0,"div",5),Oo(1),ti()),n&2){let t=Cg();Ls(),od(t.error())}}var rp=(()=>{class n{constructor(){this.graphId="demonstration",this.filters={},this.theme="dark",this.graphLoaded=new Ut,this.nodeSelected=new Ut,this.edgeSelected=new Ut,this.boardError=new Ut,this.loading=sr(!0),this.error=sr(""),this.initialized=!1,this.onNodeSelected=t=>this.nodeSelected.emit(t.detail.node),this.onEdgeSelected=t=>this.edgeSelected.emit(t.detail.edge)}ngAfterViewInit(){this.board=new ip(this.host.nativeElement,{theme:this.theme,enableDrag:!0,enableKeyboard:!0,quality:"high"}),this.host.nativeElement.addEventListener("node-selected",this.onNodeSelected),this.host.nativeElement.addEventListener("edge-selected",this.onEdgeSelected),this.initialized=!0,this.load()}ngOnChanges(t){this.initialized&&(t.graphId&&this.load(),t.filters&&this.board?.setFilters(this.filters),t.theme&&this.board?.setTheme(this.theme),t.selectedNodeId&&this.selectedNodeId&&this.board?.selectNode(this.selectedNodeId))}focusNode(t){this.board?.focusNode(t)}selectNode(t){this.board?.selectNode(t)}resetCamera(){this.board?.resetCamera()}setFilters(t){this.board?.setFilters(t)}setTheme(t){this.board?.setTheme(t)}ngOnDestroy(){this.abortController?.abort(),this.host.nativeElement.removeEventListener("node-selected",this.onNodeSelected),this.host.nativeElement.removeEventListener("edge-selected",this.onEdgeSelected),this.board?.destroy()}async load(){this.abortController?.abort(),this.abortController=new AbortController,this.loading.set(!0),this.error.set("");try{let t=await new tf("data/v1/graphs").loadGraph(this.graphId,this.abortController.signal);this.board?.loadGraph(t),this.board?.setFilters(this.filters);let i=t.nodes.length===1?t.nodes[0]:void 0;i&&this.board?.focusNode(i.id),this.graphLoaded.emit(t)}catch(t){if(t.name==="AbortError")return;let i=t instanceof Error?t:new Error(String(t));this.error.set(i.message),this.boardError.emit(i)}finally{this.loading.set(!1)}}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=xi({type:n,selectors:[["atf-board-canvas"]],viewQuery:function(i,r){if(i&1&&Po(FU,7),i&2){let s;gc(s=yc())&&(r.host=s.first)}},inputs:{graphId:"graphId",filters:"filters",theme:"theme",selectedNodeId:"selectedNodeId"},outputs:{graphLoaded:"graphLoaded",nodeSelected:"nodeSelected",edgeSelected:"edgeSelected",boardError:"boardError"},features:[Co],decls:4,vars:3,consts:[["host",""],[1,"board-host"],["class","loading",4,"ngIf"],["class","error",4,"ngIf"],[1,"loading"],[1,"error"]],template:function(i,r){i&1&&(Vn(0,"div",1,0),nd(2,kU,2,0,"div",2)(3,UU,2,1,"div",3),ti()),i&2&&(rd("aria-busy",r.loading()),Ls(2),Us("ngIf",r.loading()),Ls(),Us("ngIf",r.error()))},dependencies:[_d,Gg],styles:["[_nghost-%COMP%], .board-host[_ngcontent-%COMP%]{display:block;width:100%;height:100%;min-height:300px;position:relative;overflow:hidden}.loading[_ngcontent-%COMP%], .error[_ngcontent-%COMP%]{position:absolute;z-index:3;left:50%;top:50%;translate:-50% -50%;padding:.75rem 1rem;background:#121412e8;border:1px solid rgba(255,255,255,.1490196078);border-radius:3px;color:#eee7d9;letter-spacing:.04em}.error[_ngcontent-%COMP%]{color:#ffd2cd;border-color:#a44840;max-width:min(36rem,85%)}"]})}}return n})();var Nw=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=xi({type:n,selectors:[["atf-main"]],decls:2,vars:0,consts:[["aria-label","Fiche Papacito",1,"workspace"]],template:function(i,r){i&1&&(Vn(0,"main",0),Fr(1,"atf-board-canvas"),ti())},dependencies:[rp],styles:["[_nghost-%COMP%]{display:block;min-height:100vh;background:#0d0f0e}.workspace[_ngcontent-%COMP%]{width:100vw;height:100vh;overflow:hidden;background:radial-gradient(circle at 50% 44%,#191b18 0,#101210 38%,#090b0a)}atf-board-canvas[_ngcontent-%COMP%]{display:block;width:100%;height:100%}"]})}}return n})();var BU=["board"],Pw=(()=>{class n{constructor(t){this.onMessage=r=>{if(r.source!==window.parent||r.origin!==this.allowedOrigin||!this.isCommand(r.data))return;let s=r.data;s.type==="select-node"?this.board?.selectNode(s.id):s.type==="focus-node"?this.board?.focusNode(s.id):s.type==="reset-camera"?this.board?.resetCamera():s.type==="set-filters"?this.board?.setFilters(s.filters):s.type==="set-theme"&&(this.theme=s.theme,this.board?.setTheme(s.theme))},this.graphId=t.snapshot.paramMap.get("graphId")??"demonstration",this.theme=t.snapshot.queryParamMap.get("theme")==="light"?"light":"dark";let i=t.snapshot.queryParamMap.get("origin");this.allowedOrigin=this.safeOrigin(i)??location.origin,window.addEventListener("message",this.onMessage)}ngOnDestroy(){window.removeEventListener("message",this.onMessage)}ready(t){this.post({type:"board-ready",graphId:t.id})}forwardNode(t){this.post({type:"node-selected",node:t})}forwardEdge(t){this.post({type:"edge-selected",edge:t})}post(t){window.parent!==window&&window.parent.postMessage(t,this.allowedOrigin)}safeOrigin(t){if(!t)return null;try{let i=new URL(t);return i.protocol==="https:"||i.origin===location.origin?i.origin:null}catch{return null}}isCommand(t){return typeof t!="object"||t===null||!("type"in t)||typeof t.type!="string"?!1:t.type==="reset-camera"?!0:(t.type==="select-node"||t.type==="focus-node")&&"id"in t?typeof t.id=="string":t.type==="set-filters"&&"filters"in t?typeof t.filters=="object"&&t.filters!==null:t.type==="set-theme"&&"theme"in t&&(t.theme==="dark"||t.theme==="light")}static{this.\u0275fac=function(i){return new(i||n)(ks(zi))}}static{this.\u0275cmp=xi({type:n,selectors:[["atf-embed"]],viewQuery:function(i,r){if(i&1&&Po(BU,5),i&2){let s;gc(s=yc())&&(r.board=s.first)}},decls:5,vars:2,consts:[["board",""],[3,"graphLoaded","nodeSelected","edgeSelected","graphId","theme"],[1,"badge"]],template:function(i,r){i&1&&(Vn(0,"main")(1,"atf-board-canvas",1,0),sd("graphLoaded",function(o){return r.ready(o)})("nodeSelected",function(o){return r.forwardNode(o)})("edgeSelected",function(o){return r.forwardEdge(o)}),ti(),Vn(3,"span",2),Oo(4,"AFFICHETONFA \xB7 EMBED"),ti()()),i&2&&(Ls(),Us("graphId",r.graphId)("theme",r.theme))},dependencies:[rp],styles:["[_nghost-%COMP%], main[_ngcontent-%COMP%], atf-board-canvas[_ngcontent-%COMP%]{display:block;width:100%;height:100%;min-height:100vh}main[_ngcontent-%COMP%]{position:relative;background:#101211}.badge[_ngcontent-%COMP%]{position:absolute;right:12px;bottom:10px;color:#bdb5a7;font:600 10px ui-monospace;letter-spacing:.12em;background:#151716bd;padding:6px 8px;border:1px solid rgba(255,255,255,.1019607843)}"]})}}return n})();var Ow=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=xi({type:n,selectors:[["atf-root"]],decls:1,vars:0,template:function(i,r){i&1&&Fr(0,"router-outlet")},dependencies:[zc],encapsulation:2})}}return n})();Kg(Ow,{providers:[Vg(),Cy([{path:"",component:Nw},{path:"embed/:graphId",component:Pw},{path:"**",redirectTo:""}],Dy())]}).catch(n=>console.error(n));
