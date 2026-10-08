const fs=require('fs');const vm=require('vm');
const ctx={console,Math,Date,Object,JSON};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('model.js','utf8')+fs.readFileSync('events.js','utf8')+`
function run(policy){const S=newState();S.auto.n=policy.n;S.auto.borrow=true;S.release.fine=40;S.release.pepper=80;S.silver=policy.silver;
 let out=[];
 while(!S.ended){ step(S);
  while(S.queue.length){const id=S.queue.shift();const e=EVENT_BY_ID[id];const c=e.choices[policy.choice||0]; if(c.fx)c.fx(S);}
  const y=yearOf(S.t);
  if(y>=1612) S.divRate=policy.div(y,S);
  if(mdOf(S.t)===101){ const f=foundablePosts(S,y); if(f.length&&!S.letter.found){S.letter={...S.letter,found:f[0],issued:S.t};S.letterSealed=false;} else if(S.asia.posts[S.letter.found]) {S.letter={...S.letter,found:'',issued:S.t};}
   if(y%20===0) out.push([y,Math.round(S.cash/1e3),Math.round(S.debt/1e3),Math.round(S.share),Math.round(S.asia.capital/1e3),Object.keys(S.asia.posts).length,Math.round(S.asia.eff*100)/100,Math.round(S.asia.personnel),S.humans.sent,S.humans.returned,Math.round(S.stats.auction/1e6),Math.round(S.discontent), JSON.stringify(Object.fromEntries(Object.entries(S.lastPrice).map(([k,v])=>[k,Math.round(v)])))].join(' | '));}
 }
 out.push('END '+JSON.stringify({cash:Math.round(S.cash),debt:Math.round(S.debt),share:Math.round(S.share),div:Math.round(S.stats.divPaid/1e6),voy:S.stats.voyages,lost:S.stats.lost,h:S.humans,auct:Math.round(S.stats.auction/1e6)}));
 return out.join('\\n');}
`,ctx);
for(const p of [{n:2,silver:200000,div:()=>15},{n:3,silver:150000,div:()=>15},{n:2,silver:300000,div:()=>10},{n:2,silver:200000,div:()=>0}]){
 console.log('--- policy',p.n,p.silver,p.div(1700));
 console.log(vm.runInContext('run('+'{n:'+p.n+',silver:'+p.silver+',div:'+p.div.toString()+'}'+')',ctx));}
// event frequency check
vm.runInContext(`
var counts={};
for(let k=0;k<5;k++){const S=newState();S.auto.n=2;S.auto.borrow=true;S.silver=200000;S.release.fine=40;S.release.pepper=80;
 while(!S.ended){step(S);while(S.queue.length){const id=S.queue.shift();counts[id]=(counts[id]||0)+1;const e=EVENT_BY_ID[id];const c=e.choices[Math.floor(Math.random()*e.choices.length)];if(c.fx)c.fx(S);}
  const y=yearOf(S.t); if(y>=1612)S.divRate=15;
  if(mdOf(S.t)===101){const f=foundablePosts(S,y);if(f.length&&!S.letter.found){S.letter={...S.letter,found:f[0],issued:S.t};}else if(S.asia.posts[S.letter.found]){S.letter={...S.letter,found:'',issued:S.t};}}}
}
`,ctx);
console.log(JSON.stringify(vm.runInContext('counts',ctx)));
