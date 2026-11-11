const $=s=>document.querySelector(s);
const SK='sop-progress',L=['ยังไม่ได้ทำ','กำลังดำเนินการ','เสร็จสิ้น'],IC=['○','◐','✔'];
let S={},F=0,hl=null;
function sv(){try{localStorage.setItem(SK,JSON.stringify(S))}catch(e){}}

try{S=JSON.parse(localStorage.getItem(SK))||{};const o=JSON.parse(localStorage.getItem('itsupport-progress')||'null');if(o&&!S.__m1){for(const k in o)S['sop-01:'+k]=o[k];S.__m1=1;sv()}}catch(e){S={}}
const RB={low:['ต่ำ','bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30','bg-emerald-500'],mid:['กลาง','bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30','bg-amber-500'],high:['สูง','bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30','bg-rose-500']};
const risk=m=>{const[l,c,d]=RB[m.risk];return`<span class="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${c}"><i class="h-2 w-2 rounded-full ${d}"></i>เสี่ยง${l}</span>`};
const BOX='rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900';
const SB=['border-l-slate-300 dark:border-l-slate-600','border-l-amber-400','border-l-emerald-500'];
const BT='rounded-full border px-3.5 py-1 text-[13px] transition';
const BI='border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300';
const BA=['border-blue-500 bg-blue-50 font-semibold text-blue-700 dark:bg-slate-700 dark:text-sky-300','border-amber-500 bg-amber-50 font-semibold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300','border-emerald-500 bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'];
const TITLE='SOP คู่มือการปฏิบัติงานด้านไอที – IT SUPPORT';
const cats=m=>CONTENT[m.id]||[];
const g=(m,c,k)=>S[m.id+':'+c.id+'_'+k]||0;
const cd=(m,c)=>c.s.filter((_,k)=>g(m,c,k)==2).length;
const tot=m=>cats(m).reduce((a,c)=>a+c.s.length,0),dn=m=>cats(m).reduce((a,c)=>a+cd(m,c),0);
const pc=(a,b)=>b?Math.round(a/b*100):0;
const bar=p=>`<div class="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><i class="block h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-300 transition-all duration-500" style="width:${p}%"></i></div>`;
const back=(h,t)=>`<a href="#${h}" class="mb-4 inline-block rounded-full border border-slate-200 px-4 py-1.5 text-sm text-blue-600 hover:border-blue-500 dark:border-slate-700 dark:text-sky-300">← ${t}</a>`;

function route(){const h=location.hash.slice(1)||'home',m=M.find(x=>h==x.id||h.startsWith(x.id+'-'));if(!m)return{p:'home'};
const c=h==m.id?null:cats(m).find(x=>h==m.id+'-'+x.id);return{p:c?'cat':'man',m,c}}

const stage=(n,t,id,sub)=>`<div id="${id}" class="mb-4 mt-10 flex scroll-mt-24 items-center gap-3"><span class="grid h-9 w-9 flex-none place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-sm font-bold text-white shadow">${n}</span><div><h2 class="text-xl font-bold leading-tight">${t}</h2><p class="text-sm text-slate-500 dark:text-slate-400">${sub}</p></div></div>`;
function chk(m,key,title,items){
if(!items||!items.length)return'';
const on=i=>S[m.id+':'+key+'_'+i]?1:0,d=items.filter((_,i)=>on(i)).length;
return`<section class="${BOX} p-5"><div class="mb-3 flex items-center justify-between gap-3"><h3 class="font-semibold">${title}</h3><span class="rounded-full px-2.5 py-0.5 text-xs font-semibold ${d==items.length?'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300':'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300'}">${d}/${items.length}</span></div>
<div class="grid gap-x-6 gap-y-1 md:grid-cols-2">${items.map((x,i)=>`<button data-ck="${m.id}|${key}|${i}" class="flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-slate-50 dark:hover:bg-slate-800"><span class="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-md border-2 text-xs font-bold ${on(i)?'border-emerald-500 bg-emerald-500 text-white':'border-slate-300 dark:border-slate-600'}">${on(i)?'✓':''}</span><span class="${on(i)?'text-slate-400 line-through':'text-slate-700 dark:text-slate-200'}">${x}</span></button>`).join('')}</div></section>`}
const toolsBox=x=>x.tools&&x.tools.length?`<section class="${BOX} p-5"><h3 class="mb-3 font-semibold">🧰 เครื่องมือและอุปกรณ์</h3><div class="flex flex-wrap gap-2">${x.tools.map(t=>`<span class="rounded-lg bg-slate-100 px-3 py-1.5 text-sm dark:bg-slate-800">${t}</span>`).join('')}</div></section>`:'';
const ppeBox=x=>x.ppe&&x.ppe.length?`<section class="${BOX} p-5"><h3 class="mb-3 font-semibold">🦺 อุปกรณ์ป้องกันส่วนบุคคล (PPE)</h3><ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">${x.ppe.map(t=>`<li class="flex gap-2"><span class="text-emerald-500">✓</span><span>${t}</span></li>`).join('')}</ul></section>`:'';
function trouble(x){const it=(x.troubleshooting||[]).map(a=>Array.isArray(a)?{issue:a[0],cause:a[1],action:a[2]}:a);
return it.length?`<section class="${BOX} divide-y divide-slate-100 overflow-hidden dark:divide-slate-800">${it.map((a,i)=>`<details class="group"${i==0?' open':''}><summary class="flex cursor-pointer list-none items-center gap-3 px-5 py-3.5 font-medium hover:bg-slate-50 dark:hover:bg-slate-800"><span class="grid h-7 w-7 flex-none place-items-center rounded-lg bg-amber-100 text-sm font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">!</span><span class="flex-1">${a.issue}</span><span class="text-slate-400 transition group-open:rotate-180">▾</span></summary><div class="grid gap-3 px-5 pb-4 pl-5 text-sm sm:grid-cols-2 sm:pl-[68px]"><div><b class="text-xs text-slate-400">สาเหตุที่เป็นไปได้</b><p class="mt-0.5 text-slate-600 dark:text-slate-300">${a.cause}</p></div><div><b class="text-xs text-emerald-600 dark:text-emerald-400">แนวทางดำเนินการ</b><p class="mt-0.5 text-slate-600 dark:text-slate-300">${a.action}</p></div></div></details>`).join('')}</section>`:''}
function refsBox(x){const refs=(x.references||[]).map(a=>Array.isArray(a)?{title:a[0],url:a[1]}:a);
return refs.length||x.note?`<section class="${BOX} p-5"><h3 class="mb-3 font-semibold">🔗 เอกสารอ้างอิง</h3><ul class="space-y-2 text-sm">${refs.map(a=>`<li><a class="text-blue-600 underline decoration-dotted underline-offset-4 hover:text-blue-800 dark:text-sky-300" href="${a.url}" target="_blank" rel="noopener noreferrer">${a.title} ↗</a></li>`).join('')}</ul>${x.note?`<div class="mt-4 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">⚠️ ${x.note}</div>`:''}</section>`:''}

function card(m){const t=tot(m);
return`<a href="#${m.id}" class="${BOX} group flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-lg">
<div class="mb-3 flex flex-wrap items-start justify-between gap-3"><div class="flex items-center gap-3"><span class="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-2xl dark:bg-slate-800">${m.ic}</span><span class="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">${m.code}</span></div>${risk(m)}</div>
<h3 class="font-semibold leading-snug group-hover:text-blue-700 dark:group-hover:text-sky-300">${m.t}</h3><p class="mt-1 flex-1 text-sm text-slate-500 dark:text-slate-400">${m.ds}</p>
${t?`<div class="mt-4">${bar(pc(dn(m),t))}<p class="mt-1.5 flex justify-between text-xs text-slate-400"><span>${dn(m)} จาก ${t} ขั้นตอน</span><span>${pc(dn(m),t)}%</span></p></div>`:''}</a>`}

function nav(r){
const lk=on=>on?'bg-blue-50 font-semibold text-blue-700 dark:bg-slate-800 dark:text-sky-300':'hover:bg-slate-100 dark:hover:bg-slate-800';
const sub=(m,c)=>{const on=r.c==c,d=cd(m,c),full=d==c.s.length;
return`<a href="#${m.id}-${c.id}" class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] ${on?'bg-blue-600 font-semibold text-white shadow-sm':'text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800'}"><span class="flex-1 leading-snug">${c.t}</span><span class="rounded-full px-2 py-0.5 text-[11px] ${on?'bg-white/25 text-white':full?'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300':'bg-slate-200/70 text-slate-500 dark:bg-slate-700 dark:text-slate-300'}">${d}/${c.s.length}</span></a>`};
const item=m=>{const on=r.m==m,cs=on?cats(m):[];
const hc=on?(cs.length?(r.p=='man'?'font-semibold text-blue-700 dark:text-sky-300':'font-medium'):'bg-blue-50 font-semibold text-blue-700 dark:bg-slate-800 dark:text-sky-300'):'hover:bg-slate-100 dark:hover:bg-slate-800';
const head=`<a href="#${m.id}" class="flex items-start gap-3 rounded-xl px-3 py-2 text-sm ${hc}"><span class="text-lg leading-6">${m.ic}</span><span><span class="block text-[11px] text-slate-400">${m.code}</span><span class="leading-snug">${m.t}</span></span></a>`;
return cs.length?`<div class="my-1 rounded-2xl bg-slate-50 p-1.5 ring-1 ring-slate-200 dark:bg-slate-800/40 dark:ring-slate-700">${head}<div class="ml-[26px] mt-1 space-y-1 border-l-2 border-slate-200 pl-2.5 dark:border-slate-600">${cs.map(c=>sub(m,c)).join('')}</div></div>`:head};
$('#nav').innerHTML=`<a href="#home" class="mb-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${lk(r.p=='home')}"><span class="text-lg">🏠</span>หน้าหลัก SOP</a>`+
GROUPS.map(g=>`<p class="mb-1 mt-4 px-3 text-xs font-medium tracking-wide text-slate-400">${g.ic} ${g.t}</p>`+M.filter(m=>m.g==g.id).map(item).join('')).join('')}

function home(){const T=M.reduce((x,m)=>x+tot(m),0),D=M.reduce((x,m)=>x+dn(m),0);
const stat=(v,l)=>`<div class="${BOX} p-4"><b class="text-3xl text-blue-600 dark:text-sky-300">${v}</b><span class="block text-sm text-slate-500 dark:text-slate-400">${l}</span></div>`;
const pil=(i,t,d)=>`<div class="${BOX} p-5"><div class="mb-2 text-2xl">${i}</div><h3 class="font-semibold">${t}</h3><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">${d}</p></div>`;
return`<section class="up grid items-center gap-6 rounded-3xl bg-gradient-to-br from-navy via-navy-700 to-blue-500 p-7 text-white md:grid-cols-[1.4fr_1fr] md:p-10">
<div><span class="rounded-full bg-white/15 px-3 py-1 text-xs text-sky-200">IT SUPPORT</span><h1 class="mb-3 mt-3 text-3xl font-bold leading-tight md:text-4xl">SOP คู่มือการปฏิบัติงานด้านไอที</h1>
<p class="mb-6 max-w-xl text-blue-100">มาตรฐานขั้นตอนการติดตั้ง ซ่อม และแก้ไขปัญหาอุปกรณ์ไอทีของสาขา พร้อมข้อควรระวังด้านความปลอดภัยในทุกงาน</p>
<button data-go="groups" class="rounded-full bg-white px-7 py-2.5 font-semibold text-navy hover:bg-sky-200">เริ่มต้นใช้งาน</button></div>
<svg class="hidden md:block" viewBox="0 0 240 180" aria-hidden="true"><rect x="30" y="14" width="180" height="116" rx="12" fill="#0b2545" stroke="#8fd0ff" stroke-width="4"/><rect x="42" y="26" width="156" height="92" rx="6" fill="#1d5fd1"/><path d="M60 50h50M60 66h80M60 82h64" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/><circle cx="168" cy="84" r="16" fill="#8fd0ff"/><path d="M161 84l5 5 9-10" stroke="#0b2545" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M100 130h40l8 24H92z" fill="#8fd0ff"/><rect x="74" y="154" width="92" height="9" rx="4.5" fill="#fff"/></svg></section>
<div class="my-5 grid grid-cols-2 gap-3 md:grid-cols-4">${stat(M.length,'คู่มือทั้งหมด')}${stat(GROUPS.length,'กลุ่มงาน')}${stat(T,'ขั้นตอนทั้งหมด')}${stat(D,'ทำเสร็จแล้ว')}</div>
<div id="groups">${GROUPS.map(g=>`<h2 class="mb-3 mt-8 text-xl font-semibold">${g.ic} ${g.t}</h2><div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">${M.filter(m=>m.g==g.id).map(card).join('')}</div>`).join('')}</div>
<h2 class="mb-3 mt-10 text-xl font-semibold">หลักความปลอดภัยที่ทุก SOP ต้องมี</h2>
<div class="grid gap-4 md:grid-cols-3">${pil('🦺','ความปลอดภัยทางกายภาพ','ไฟฟ้า การทำงานที่สูง การใช้เครื่องมือและอุปกรณ์')}${pil('🔐','ความปลอดภัยไซเบอร์','รหัสผ่าน การแยกเครือข่าย การอัปเดตเฟิร์มแวร์ และสิทธิ์การเข้าถึง')}${pil('🪪','ข้อมูลส่วนบุคคล','ภาพจากกล้อง ข้อมูลลูกค้าและยอดขาย การเก็บ ส่งออก และทำลายข้อมูล')}</div>`}

function manual(m){const i=M.indexOf(m),pv=M[i-1],nx=M[i+1],cs=cats(m),t=tot(m),d=dn(m),x=SOP_META[m.id]||{};
const chip=(id,l)=>`<button data-go="${id}" class="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm transition hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:hover:text-sky-300">${l}</button>`;
const info=(i,t,p)=>`<div class="${BOX} p-5"><h3 class="mb-2 font-semibold">${i} ${t}</h3><p class="text-sm leading-7 text-slate-600 dark:text-slate-300">${p}</p></div>`;
return`${back('home','กลับหน้าหลัก SOP')}
<section class="${BOX} up overflow-hidden"><div class="h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-300"></div><div class="flex flex-wrap items-start gap-x-4 gap-y-3 p-5 sm:flex-nowrap sm:p-6"><span class="order-1 grid h-14 w-14 flex-none place-items-center rounded-2xl bg-blue-50 text-3xl dark:bg-slate-800">${m.ic}</span><div class="order-3 w-full min-w-0 sm:order-2 sm:w-auto sm:flex-1"><span class="text-xs font-semibold text-slate-400">${m.code}</span><h1 class="text-xl font-bold leading-snug sm:text-2xl">${m.t}</h1><p class="mt-1 text-slate-500 dark:text-slate-400">${m.ds}</p><p class="mt-3 text-xs text-slate-400">จัดทำโดย แผนก IT</p></div><div class="order-2 ml-auto sm:order-3 sm:ml-0">${risk(m)}</div></div></section>
<div class="mt-4 flex flex-wrap gap-2">${chip('st-before','① ก่อนเริ่มงาน')}${chip('st-work','② ขั้นตอน')}${chip('st-after','③ หลังเสร็จงาน')}${chip('st-fix','④ แก้ปัญหา')}</div>
${x.purpose?`<section class="mt-5 grid gap-4 md:grid-cols-2">${info('🎯','วัตถุประสงค์',x.purpose)}${info('📌','ขอบเขตการปฏิบัติงาน',x.scope||'-')}</section>`:''}
${stage(1,'ก่อนเริ่มงาน','st-before','รู้ความเสี่ยงและเตรียมให้พร้อมก่อนลงมือ')}
<section class="up rounded-2xl border border-amber-300 bg-amber-50 p-5 dark:border-amber-500/40 dark:bg-amber-500/10"><h3 class="mb-3 font-semibold text-amber-800 dark:text-amber-300">⚠️ ข้อควรระวังด้านความปลอดภัย</h3>
<ul class="space-y-1.5 text-sm">${m.safety.map(s=>`<li class="flex gap-2"><span>•</span><span>${s}</span></li>`).join('')}</ul></section>
<div class="mt-4 space-y-4">${chk(m,'pre','✅ ตรวจก่อนเริ่มงาน',x.preflight)}<div class="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">${toolsBox(x)}${ppeBox(x)}</div></div>
${stage(2,'ปฏิบัติงานตามขั้นตอน','st-work','ทำตามหมวดและกดสถานะเมื่อทำแต่ละข้อเสร็จ')}
${t?`<div class="${BOX} mb-4 flex flex-wrap items-center gap-4 p-4 text-sm"><div class="min-w-[160px] flex-1">${bar(pc(d,t))}</div><b class="whitespace-nowrap">${d} จาก ${t} ขั้นตอน (${pc(d,t)}%)</b><button data-reset="${m.id}" class="rounded-full border border-dashed border-slate-300 px-4 py-1.5 text-slate-500 hover:border-rose-400 hover:text-rose-600 dark:border-slate-600">ล้างความคืบหน้า</button></div>
<div class="grid gap-4 sm:grid-cols-2">${cs.map(c=>`<a href="#${m.id}-${c.id}" class="${BOX} p-5 transition hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-lg"><div class="flex items-center gap-3"><span class="grid h-11 w-11 flex-none place-items-center rounded-xl bg-blue-50 text-2xl dark:bg-slate-800">${c.ic}</span><div><h3 class="font-semibold leading-snug">${c.t}</h3><p class="text-sm text-slate-500 dark:text-slate-400">${c.ds} • ${c.s.length} ขั้นตอน</p></div></div><div class="mt-3">${bar(pc(cd(m,c),c.s.length))}</div></a>`).join('')}</div>`
:`<section class="${BOX} grid place-items-center border-dashed p-10 text-center"><div><div class="mb-2 text-4xl">📝</div><h3 class="font-semibold">เนื้อหาขั้นตอนอยู่ระหว่างจัดทำ</h3><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">ขั้นตอนทีละข้อ ภาพประกอบ และ Checklist จะเพิ่มเมื่อได้รับข้อมูล</p></div></section>`}
${stage(3,'หลังเสร็จงาน','st-after','ตรวจผลงานก่อนส่งมอบ')}
${chk(m,'acc','📋 เกณฑ์ตรวจงาน',x.acceptance)}
${trouble(x)?stage(4,'แก้ปัญหาเบื้องต้น','st-fix','เมื่อพบปัญหาระหว่างหรือหลังทำงาน')+trouble(x):''}
${refsBox(x)?`<div class="mt-4">${refsBox(x)}</div>`:''}
<div class="mt-8 flex flex-wrap justify-between gap-3 text-sm">${pv?`<a href="#${pv.id}" class="${BOX} px-4 py-2.5 hover:border-blue-500">← ${pv.t}</a>`:'<span></span>'}${nx?`<a href="#${nx.id}" class="${BOX} px-4 py-2.5 hover:border-blue-500">${nx.t} →</a>`:''}</div>`}

function step(m,c,s,k){const v=g(m,c,k);
return`<article id="s-${m.id}-${c.id}-${k}" class="${BOX} relative mb-4 border-l-4 p-5 ${SB[v]}"><div class="flex items-start gap-3"><span class="grid h-8 w-8 flex-none place-items-center rounded-full bg-navy text-sm font-semibold text-white">${k+1}</span><h3 class="flex-1 pt-0.5 text-lg font-semibold xl:pr-[370px]">${s.t}</h3></div>
<div class="mt-3 flex flex-wrap gap-2 sm:justify-end xl:absolute xl:right-5 xl:top-4 xl:mt-0">${L.map((l,x)=>`<button data-s="${m.id}|${c.id}|${k}|${x}" class="${BT} ${v==x?BA[x]:BI}">${IC[x]} ${l}</button>`).join('')}</div>
<ol class="mt-3 list-decimal space-y-1 pl-12 pr-2 max-sm:pl-8">${s.d.map(x=>`<li>${x}</li>`).join('')}</ol>
${s.c?`<pre class="mt-3 overflow-x-auto rounded-xl bg-navy p-3 text-[13px] text-sky-100 sm:ml-11">${s.c}</pre>`:''}
${s.n?`<div class="mt-3 rounded-lg border-l-4 border-blue-500 bg-blue-50 px-3.5 py-2 text-sm dark:bg-blue-500/10 sm:ml-11">💡 คำแนะนำ: ${s.n}</div>`:''}
${s.w?`<div class="mt-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 px-3.5 py-2 text-sm dark:bg-amber-500/10 sm:ml-11">⚠️ ข้อควรระวัง: ${s.w}</div>`:''}
<div class="shots mt-3 grid gap-3 sm:ml-11" data-p="${m.id}/${c.id}-${k+1}" data-l="${(s.imgs||(s.img?[s.img]:[])).join('|')}"><figure class="grid min-h-[90px] place-items-center rounded-xl border-2 border-dashed border-slate-200 text-sm text-slate-400 dark:border-slate-700">ภาพหน้าจอตัวอย่าง ขั้นตอนที่ ${k+1}</figure></div></article>`}

function catpage(m,c){const all=cats(m),i=all.indexOf(c),pv=all[i-1],nx=all[i+1],d=cd(m,c),p=pc(d,c.s.length);
const list=c.s.map((s,k)=>({s,k})).filter(o=>F==0||g(m,c,o.k)==F-1);
return`${back(m.id,'กลับ '+m.code+' '+m.t)}
<section class="${BOX} flex items-center gap-4 p-5"><span class="text-3xl">${c.ic}</span><div><h1 class="text-xl font-bold">${c.t}</h1><p class="text-sm text-slate-500 dark:text-slate-400">${c.ds}</p></div></section>
<div class="sticky top-[58px] z-10 mb-2 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 bg-slate-50 py-2 text-sm dark:bg-slate-950"><div class="min-w-[120px] flex-1">${bar(p)}</div><b class="whitespace-nowrap">${d} จาก ${c.s.length} ขั้นตอน (${p}%)</b><button data-reset="${m.id}|${c.id}" class="whitespace-nowrap rounded-full border border-dashed border-slate-300 px-3.5 py-1 text-[13px] text-slate-500 hover:border-rose-400 hover:text-rose-600 dark:border-slate-600">ล้างหมวดนี้</button></div>
<div class="mb-4 flex flex-wrap gap-2">${['ทั้งหมด',...L].map((l,x)=>`<button data-f="${x}" class="rounded-full border px-3.5 py-1 text-[13px] ${F==x?'border-blue-600 bg-blue-600 text-white':'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'}">${l}</button>`).join('')}</div>
${list.map(o=>step(m,c,o.s,o.k)).join('')||'<p class="text-slate-500">ไม่มีขั้นตอนในสถานะนี้</p>'}
<div class="mt-6 flex flex-wrap justify-between gap-3 text-sm">${pv?`<a href="#${m.id}-${pv.id}" class="${BOX} px-4 py-2.5 hover:border-blue-500">← ${pv.t}</a>`:'<span></span>'}${nx?`<a href="#${m.id}-${nx.id}" class="${BOX} px-4 py-2.5 hover:border-blue-500">${nx.t} →</a>`:`<a href="#${m.id}" class="${BOX} px-4 py-2.5 hover:border-blue-500">เสร็จสิ้นทุกหมวด กลับหน้าคู่มือ</a>`}</div>`}

function render(){const r=route();nav(r);$('#m').innerHTML=r.p=='cat'?catpage(r.m,r.c):r.p=='man'?manual(r.m):home();
document.title=(r.p=='cat'?r.c.t+' – '+r.m.code+' – ':r.m?r.m.code+' '+r.m.t+' – ':'')+TITLE;shots();
if(hl){const e=document.getElementById(hl);hl=null;if(e){e.classList.add('ring-4','ring-sky-300');e.scrollIntoView({block:'center'});setTimeout(()=>e.classList.remove('ring-4','ring-sky-300'),2200)}}}
function closeM(){$('#sd').classList.add('-translate-x-full');$('#ov').classList.add('hidden')}
addEventListener('hashchange',()=>{F=0;render();closeM();if(!hl)scrollTo(0,0)});

document.addEventListener('click',e=>{const T=e.target;
const go=T.closest('[data-go]');if(go)document.getElementById(go.dataset.go).scrollIntoView({behavior:'smooth'});
const ck=T.closest('[data-ck]');if(ck){const[a,b,i]=ck.dataset.ck.split('|'),k=a+':'+b+'_'+i;if(S[k])delete S[k];else S[k]=1;sv();render();return}
const st=T.closest('[data-s]');if(st){const[a,b,k,v]=st.dataset.s.split('|');S[a+':'+b+'_'+k]=+v;sv();render();return}
const f=T.closest('[data-f]');if(f){F=+f.dataset.f;render();return}
const rs=T.closest('[data-reset]');if(rs){const[a,b]=rs.dataset.reset.split('|');askReset(M.find(m=>m.id==a),b);return}
const h=T.closest('[data-hl]');if(h){hl=h.dataset.hl;if(location.hash==h.getAttribute('href'))setTimeout(render)}
if(T.closest('#nav a,#res a')){closeM();$('#res').classList.add('hidden');$('#q').value=''}
if(!T.closest('#q,#res'))$('#res').classList.add('hidden')});
$('#mb').onclick=()=>{$('#sd').classList.toggle('-translate-x-full');$('#ov').classList.toggle('hidden')};
$('#ov').onclick=closeM;
$('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});
addEventListener('scroll',()=>$('#top').classList.toggle('hidden',scrollY<400));

$('#q').oninput=e=>{const q=e.target.value.trim().toLowerCase(),r=$('#res');if(!q){r.classList.add('hidden');return}
const o=[];M.forEach(m=>{if((m.code+m.t+m.ds+m.safety.join(' ')).toLowerCase().includes(q))o.push(`<a href="#${m.id}" class="block border-b border-slate-100 px-4 py-2.5 hover:bg-blue-50 dark:border-slate-800 dark:hover:bg-slate-800">${m.ic} ${m.t}<small class="block text-slate-400">${m.code}</small></a>`);
cats(m).forEach(c=>c.s.forEach((s,k)=>{if((s.t+' '+s.d.join(' ')+' '+(s.c||'')+' '+(s.n||'')+' '+(s.w||'')).toLowerCase().includes(q))o.push(`<a href="#${m.id}-${c.id}" data-hl="s-${m.id}-${c.id}-${k}" class="block border-b border-slate-100 px-4 py-2.5 hover:bg-blue-50 dark:border-slate-800 dark:hover:bg-slate-800">${s.t}<small class="block text-slate-400">${m.code} › ${c.t}</small></a>`)}))});
r.innerHTML=o.length?o.join(''):'<p class="p-4 text-sm text-slate-400">ไม่พบ SOP ที่ตรงกับคำค้นหา</p>';r.classList.remove('hidden')};

function toast(t){const d=document.createElement('div');d.className='fixed bottom-6 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-6 py-2.5 text-sm text-white shadow-xl up';d.textContent='✔ '+t;document.body.appendChild(d);setTimeout(()=>d.remove(),2600)}
function askReset(m,cid){const c=cid&&cats(m).find(x=>x.id==cid),pre=c?m.id+':'+c.id+'_':m.id+':';
const o=document.createElement('div');o.className='fixed inset-0 z-40 grid place-items-center bg-slate-950/60 p-5 backdrop-blur-sm';
o.innerHTML=`<div class="up w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-2xl dark:border-slate-700 dark:bg-slate-900" role="alertdialog" aria-modal="true"><div class="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-3xl dark:bg-amber-500/20">🗑️</div><h3 class="text-xl font-semibold">${c?'ล้างความคืบหน้าหมวดนี้?':'ล้างความคืบหน้า '+m.code+'?'}</h3><p class="mb-6 mt-1 text-sm text-slate-500 dark:text-slate-400">${c?`ขั้นตอนใน “${c.t}” จะกลับเป็น “ยังไม่ได้ทำ” หมวดอื่นไม่ถูกกระทบ และไม่สามารถกู้คืนได้`:'สถานะ Checklist ของคู่มือนี้จะกลับเป็น “ยังไม่ได้ทำ” และไม่สามารถกู้คืนได้'}</p><div class="flex gap-3"><button data-x="0" class="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 font-semibold hover:border-blue-500 dark:border-slate-700 dark:bg-slate-800">ยกเลิก</button><button data-x="1" class="flex-1 rounded-xl bg-rose-600 py-2.5 font-semibold text-white hover:bg-rose-700">ล้างความคืบหน้า</button></div></div>`;
document.body.appendChild(o);
const kd=e=>{if(e.key=='Escape')close()};const close=()=>{document.removeEventListener('keydown',kd);o.remove()};document.addEventListener('keydown',kd);
o.onclick=e=>{const x=e.target.dataset.x;if(e.target==o||x=='0')close();else if(x=='1'){for(const k in S)if(k.startsWith(pre))delete S[k];sv();render();close();toast(c?'ล้างความคืบหน้าหมวดนี้แล้ว':'ล้างความคืบหน้าเรียบร้อยแล้ว')}};
o.querySelector('[data-x="0"]').focus()}

/* รูปประกอบ: ใช้ imgs/img ใน data ถ้ามี ไม่เช่นนั้นหา images/sop-01/cat1-1.png, cat1-1-2.png ... (png/jpg/jpeg/webp สูงสุด 12 รูป) */
function probe(b){return new Promise(r=>{const x=['png','jpg','jpeg','webp'];let i=0;(function t(){if(i>=x.length)return r(null);const im=new Image(),u=b+'.'+x[i++];im.onload=()=>r(u);im.onerror=t;im.src=u})()})}
function shots(){document.querySelectorAll('.shots').forEach(async b=>{
const fig=u=>{const f=document.createElement('figure');f.className='mx-auto w-fit max-w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700';f.innerHTML='<img class="block max-w-full" alt="ภาพหน้าจอ">';f.firstChild.src=u;return f};
const put=l=>{if(l.length)b.replaceChildren(...l.map(fig))};
if(b.dataset.l){put(b.dataset.l.split('|'));return}
const l=[];for(let n=1;n<=12;n++){const u=await probe('images/'+b.dataset.p+(n>1?'-'+n:''));if(!u)break;l.push(u)}if(l.length)put(l);else b.remove()})}

function setTh(d){document.documentElement.classList.toggle('dark',d);$('#th').textContent=d?'☀️':'🌙'}
setTh(document.documentElement.classList.contains('dark'));
$('#th').onclick=()=>{const d=!document.documentElement.classList.contains('dark');setTh(d);try{localStorage.setItem('sop-theme',d?'dark':'light')}catch(e){}};
render();
