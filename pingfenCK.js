

let fs = require('fs');
// const jj = fs.readFileSync("/jd/own/cookies.txt",function(err){if(err){console.log(`jj :${err}`);}});
const jj = fs.readFileSync("/jd/own/ck-dyj.txt",function(err){if(err){console.log(`jj :${err}`);}});
const ckArr = jj.toString().replace(/\r/g, '').split('\n');
// const ckArr = jj.toString().replace('\r', '').split('\n')

// 每100个为一组
// for (let i = 0, len = ckArr.length; i < len; i++) {
//   if (ckArr[i]) {
//     if (i % 100 === 0) {
//       fs.appendFileSync('pingfenCK.txt', '\n\n\n');
//     }
//     fs.appendFileSync('pingfenCK.txt', 'Cookie' + (i % 100 + 1) + '="' + ckArr[i] + '"\n');
//   } else {
//     break;
//   }
// }

// 添加Cookie=""
fs.unlink("/jd/own/pingfenCK.txt",function(err){if(err){console.log(`unlink :${err}`);}});
let n = 0;
for (let i = 0; i < ckArr.length; i++) {
  if (!ckArr[i]) return;
  let num = 60, step = 60;
  if (i < num) {
    num = i;
  } else if (i > num + step * n && i < num + step * (n + 1)) {
    num = i - (num + step * n);
  } else {
    fs.appendFileSync('/jd/own/pingfenCK.txt', '\n\n\n');
    if (i > num) n++;
    num = 0;
  }
  fs.appendFileSync('/jd/own/pingfenCK.txt', 'Cookie' + (num % 1000 + 8) + '="' + ckArr[i] + '"\n');
}

// 过滤重复的
// const _ckArr = [...new Set(ckArr)];
// fs.appendFileSync('filter.txt', _ckArr.join('\n'));
