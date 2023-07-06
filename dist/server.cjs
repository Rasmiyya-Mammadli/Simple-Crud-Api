(()=>{var e={738:(e,t,n)=>{const r=n(147),o=n(17),s=n(37),i=n(113),a=n(968).version,c=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function l(e){console.log(`[dotenv@${a}][DEBUG] ${e}`)}function d(e){return e&&e.DOTENV_KEY&&e.DOTENV_KEY.length>0?e.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function u(e,t){let n;try{n=new URL(t)}catch(e){if("ERR_INVALID_URL"===e.code)throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");throw e}const r=n.password;if(!r)throw new Error("INVALID_DOTENV_KEY: Missing key part");const o=n.searchParams.get("environment");if(!o)throw new Error("INVALID_DOTENV_KEY: Missing environment part");const s=`DOTENV_VAULT_${o.toUpperCase()}`,i=e.parsed[s];if(!i)throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${s} in your .env.vault file.`);return{ciphertext:i,key:r}}function p(e){let t=o.resolve(process.cwd(),".env");return e&&e.path&&e.path.length>0&&(t=e.path),t.endsWith(".vault")?t:`${t}.vault`}const f={configDotenv:function(e){let t=o.resolve(process.cwd(),".env"),n="utf8";const i=Boolean(e&&e.debug);var a;e&&(null!=e.path&&(t="~"===(a=e.path)[0]?o.join(s.homedir(),a.slice(1)):a),null!=e.encoding&&(n=e.encoding));try{const o=f.parse(r.readFileSync(t,{encoding:n}));let s=process.env;return e&&null!=e.processEnv&&(s=e.processEnv),f.populate(s,o,e),{parsed:o}}catch(e){return i&&l(`Failed to load ${t} ${e.message}`),{error:e}}},_configVault:function(e){console.log(`[dotenv@${a}][INFO] Loading env from encrypted .env.vault`);const t=f._parseVault(e);let n=process.env;return e&&null!=e.processEnv&&(n=e.processEnv),f.populate(n,t,e),{parsed:t}},_parseVault:function(e){const t=p(e),n=f.configDotenv({path:t});if(!n.parsed)throw new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);const r=d(e).split(","),o=r.length;let s;for(let e=0;e<o;e++)try{const t=u(n,r[e].trim());s=f.decrypt(t.ciphertext,t.key);break}catch(t){if(e+1>=o)throw t}return f.parse(s)},config:function(e){const t=p(e);return 0===d(e).length?f.configDotenv(e):r.existsSync(t)?f._configVault(e):(n=`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`,console.log(`[dotenv@${a}][WARN] ${n}`),f.configDotenv(e));var n},decrypt:function(e,t){const n=Buffer.from(t.slice(-64),"hex");let r=Buffer.from(e,"base64");const o=r.slice(0,12),s=r.slice(-16);r=r.slice(12,-16);try{const e=i.createDecipheriv("aes-256-gcm",n,o);return e.setAuthTag(s),`${e.update(r)}${e.final()}`}catch(e){const t=e instanceof RangeError,n="Invalid key length"===e.message,r="Unsupported state or unable to authenticate data"===e.message;if(t||n)throw new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");if(r)throw new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw console.error("Error: ",e.code),console.error("Error: ",e.message),e}},parse:function(e){const t={};let n,r=e.toString();for(r=r.replace(/\r\n?/gm,"\n");null!=(n=c.exec(r));){const e=n[1];let r=n[2]||"";r=r.trim();const o=r[0];r=r.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===o&&(r=r.replace(/\\n/g,"\n"),r=r.replace(/\\r/g,"\r")),t[e]=r}return t},populate:function(e,t,n={}){const r=Boolean(n&&n.debug),o=Boolean(n&&n.override);if("object"!=typeof t)throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");for(const n of Object.keys(t))Object.prototype.hasOwnProperty.call(e,n)?(!0===o&&(e[n]=t[n]),r&&l(!0===o?`"${n}" is already defined and WAS overwritten`:`"${n}" is already defined and was NOT overwritten`)):e[n]=t[n]}};e.exports.configDotenv=f.configDotenv,e.exports._configVault=f._configVault,e.exports._parseVault=f._parseVault,e.exports.config=f.config,e.exports.decrypt=f.decrypt,e.exports.parse=f.parse,e.exports.populate=f.populate,e.exports=f},367:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteUser=t.updateUser=t.createUser=t.getUserById=t.getAllUsers=void 0;const r=n(600),o=n(859);t.getAllUsers=async function(e,t){const n=(0,o.getAllUsers)();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(n))},t.getUserById=async function(e,t,n){const r=(0,o.getUserById)(n);r?(t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(r))):(t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"User not found"})))},t.createUser=async function(e,t){let n="";e.on("data",(e=>{n+=e.toString()})),e.on("end",(async()=>{const{username:e,age:s,hobbies:i}=JSON.parse(n);if(!e||!s)return t.writeHead(400,{"Content-Type":"application/json"}),void t.end(JSON.stringify({message:"Username and age are required"}));const a={id:(0,r.v4)(),username:e,age:s,hobbies:i||[]},c=(0,o.createUser)(a);t.writeHead(201,{"Content-Type":"application/json"}),t.end(JSON.stringify(c))}))},t.updateUser=async function(e,t,n){let r="";e.on("data",(e=>{r+=e.toString()})),e.on("end",(async()=>{const{username:e,age:s,hobbies:i}=JSON.parse(r);if(!e||!s)return t.writeHead(400,{"Content-Type":"application/json"}),void t.end(JSON.stringify({message:"Username and age are required"}));const a={id:n,username:e,age:s,hobbies:i||[]},c=(0,o.updateUser)(a);c?(t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(c))):(t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"User not found"})))}))},t.deleteUser=async function(e,t,n){(0,o.deleteUser)(n)?(t.writeHead(204),t.end()):(t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"User not found"})))}},137:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.handleRequest=void 0;const r=n(367);t.handleRequest=function(e,t){const n=null==e?void 0:e.method,o=null==e?void 0:e.url;if("/api/users"===o&&"GET"===n)(0,r.getAllUsers)(e,t);else if(o.match(/\/api\/users\/([a-zA-Z0-9-]+)/)){const s=o.split("/")[3];"GET"===n?(0,r.getUserById)(e,t,s):"PUT"===n?(0,r.updateUser)(e,t,s):"DELETE"===n&&(0,r.deleteUser)(e,t,s)}else"/api/users"===o&&"POST"===n?(0,r.createUser)(e,t):(t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"Not found"})))}},859:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteUser=t.updateUser=t.createUser=t.getUserById=t.getAllUsers=void 0;const n=[];t.getAllUsers=function(){return n},t.getUserById=function(e){return n.find((t=>t.id===e))},t.createUser=function(e){return n.push(e),e},t.updateUser=function(e){const t=n.findIndex((t=>t.id===e.id));if(-1!==t)return n[t]=e,e},t.deleteUser=function(e){const t=n.findIndex((t=>t.id===e));return-1!==t&&(n.splice(t,1),!0)}},728:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(685)),s=r(n(1)),i=r(n(738)),a=r(n(742)),c=n(137);i.default.config();const l=o.default.createServer(((e,t)=>{(0,c.handleRequest)(e,t)}));if(s.default.isPrimary){const e=n(37).cpus().length-1;console.log(`Master process ${a.default.pid} is running`);for(let t=0;t<e;t++)s.default.fork();s.default.on("exit",((e,t,n)=>{console.log(`Worker process ${a.default.pid} died`),s.default.fork()}))}else{const e=Number(a.default.env.PORT)||4e3;l.listen(e),console.log(`Worker process ${a.default.pid} is running on port ${e}`)}},600:(e,t,n)=>{"use strict";n.r(t),n.d(t,{NIL:()=>O,parse:()=>h,stringify:()=>p,v1:()=>m,v3:()=>U,v4:()=>w,v5:()=>_,validate:()=>l,version:()=>D});var r=n(113),o=n.n(r);const s=new Uint8Array(256);let i=s.length;function a(){return i>s.length-16&&(o().randomFillSync(s),i=0),s.slice(i,i+=16)}const c=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,l=function(e){return"string"==typeof e&&c.test(e)},d=[];for(let e=0;e<256;++e)d.push((e+256).toString(16).slice(1));function u(e,t=0){return(d[e[t+0]]+d[e[t+1]]+d[e[t+2]]+d[e[t+3]]+"-"+d[e[t+4]]+d[e[t+5]]+"-"+d[e[t+6]]+d[e[t+7]]+"-"+d[e[t+8]]+d[e[t+9]]+"-"+d[e[t+10]]+d[e[t+11]]+d[e[t+12]]+d[e[t+13]]+d[e[t+14]]+d[e[t+15]]).toLowerCase()}const p=function(e,t=0){const n=u(e,t);if(!l(n))throw TypeError("Stringified UUID is invalid");return n};let f,g,v=0,y=0;const m=function(e,t,n){let r=t&&n||0;const o=t||new Array(16);let s=(e=e||{}).node||f,i=void 0!==e.clockseq?e.clockseq:g;if(null==s||null==i){const t=e.random||(e.rng||a)();null==s&&(s=f=[1|t[0],t[1],t[2],t[3],t[4],t[5]]),null==i&&(i=g=16383&(t[6]<<8|t[7]))}let c=void 0!==e.msecs?e.msecs:Date.now(),l=void 0!==e.nsecs?e.nsecs:y+1;const d=c-v+(l-y)/1e4;if(d<0&&void 0===e.clockseq&&(i=i+1&16383),(d<0||c>v)&&void 0===e.nsecs&&(l=0),l>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");v=c,y=l,g=i,c+=122192928e5;const p=(1e4*(268435455&c)+l)%4294967296;o[r++]=p>>>24&255,o[r++]=p>>>16&255,o[r++]=p>>>8&255,o[r++]=255&p;const m=c/4294967296*1e4&268435455;o[r++]=m>>>8&255,o[r++]=255&m,o[r++]=m>>>24&15|16,o[r++]=m>>>16&255,o[r++]=i>>>8|128,o[r++]=255&i;for(let e=0;e<6;++e)o[r+e]=s[e];return t||u(o)},h=function(e){if(!l(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n};function E(e,t,n){function r(e,r,o,s){var i;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof r&&(r=h(r)),16!==(null===(i=r)||void 0===i?void 0:i.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let a=new Uint8Array(16+e.length);if(a.set(r),a.set(e,r.length),a=n(a),a[6]=15&a[6]|t,a[8]=63&a[8]|128,o){s=s||0;for(let e=0;e<16;++e)o[s+e]=a[e];return o}return u(a)}try{r.name=e}catch(e){}return r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",r}const U=E("v3",48,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),o().createHash("md5").update(e).digest()})),b={randomUUID:o().randomUUID},w=function(e,t,n){if(b.randomUUID&&!t&&!e)return b.randomUUID();const r=(e=e||{}).random||(e.rng||a)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=r[e];return t}return u(r)},_=E("v5",80,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),o().createHash("sha1").update(e).digest()})),O="00000000-0000-0000-0000-000000000000",D=function(e){if(!l(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)}},1:e=>{"use strict";e.exports=require("cluster")},113:e=>{"use strict";e.exports=require("crypto")},147:e=>{"use strict";e.exports=require("fs")},685:e=>{"use strict";e.exports=require("http")},742:e=>{"use strict";e.exports=require("node:process")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")},968:e=>{"use strict";e.exports=JSON.parse('{"name":"dotenv","version":"16.3.1","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"funding":"https://github.com/motdotla/dotenv?sponsor=1","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3","decache":"^4.6.1","sinon":"^14.0.1","standard":"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0","tap":"^16.3.0","tar":"^6.1.11","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}')}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(728)})();