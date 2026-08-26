const LEGACY_KEY='medviz3';
const STORAGE_KEY='medwizDataV2';
const SCHEMA_VERSION=2;
const APP_VERSION='3.2-QA.1';

const PILOT_TOPIC_ID='heart-anatomy';
const HEART_SECTION_ID='anatomy-heart';
const ANATOMY_LEGACY_SECTION_ID='anatomy-legacy-section';
const HEART_SOURCE_ID='src-heart-gaivoronsky';

const HEART_OBJECTIVES=[
  {id:'heart-obj-1',text:'Назвать четыре камеры сердца и различать правые и левые отделы.'},
  {id:'heart-obj-2',text:'Соотнести атриовентрикулярные клапаны с соответствующими камерами.'},
  {id:'heart-obj-3',text:'Соотнести полулунные клапаны с выходными отделами желудочков.'},
  {id:'heart-obj-4',text:'Восстановить последовательность движения крови через камеры и клапаны сердца.'}
];

const HEART_BLOCKS=[
  {id:'heart-cb-orientation',topicId:PILOT_TOPIC_ID,type:'definition',title:'Что изучаем',order:100,content:'Сердце имеет четыре камеры: правое предсердие, правый желудочек, левое предсердие и левый желудочек. Клапанный аппарат обеспечивает направленное сообщение между камерами и крупными сосудами.'},
  {id:'heart-cb-chambers',topicId:PILOT_TOPIC_ID,type:'structure',title:'Камеры сердца',order:200,content:'Правые отделы: правое предсердие и правый желудочек. Левые отделы: левое предсердие и левый желудочек.'},
  {id:'heart-cb-av',topicId:PILOT_TOPIC_ID,type:'table',title:'Атриовентрикулярные клапаны',order:300,content:'Справа между правым предсердием и правым желудочком расположен трёхстворчатый клапан. Слева между левым предсердием и левым желудочком расположен митральный (двустворчатый) клапан.'},
  {id:'heart-cb-semilunar',topicId:PILOT_TOPIC_ID,type:'table',title:'Полулунные клапаны',order:400,content:'Клапан лёгочного ствола расположен на выходе из правого желудочка. Аортальный клапан расположен на выходе из левого желудочка.'},
  {id:'heart-cb-valve-apparatus',topicId:PILOT_TOPIC_ID,type:'keyPoint',title:'Створчатые и полулунные клапаны',order:500,content:'Сухожильные хорды и сосочковые мышцы относятся к аппарату атриовентрикулярных клапанов. Полулунные клапаны не имеют сухожильных хорд.'},
  {id:'heart-cb-flow',topicId:PILOT_TOPIC_ID,type:'diagram',title:'Схема направления крови',order:600,content:'Полые вены → правое предсердие → трёхстворчатый клапан → правый желудочек → клапан лёгочного ствола → лёгочный ствол → лёгкие → лёгочные вены → левое предсердие → митральный клапан → левый желудочек → аортальный клапан → аорта.'}
];

const HEART_QUESTIONS=[
  {id:'heart-q1',topicId:PILOT_TOPIC_ID,objectiveId:'heart-obj-2',stem:'Какой клапан расположен между правым предсердием и правым желудочком?',options:['Митральный','Трёхстворчатый','Аортальный','Клапан лёгочного ствола'],correct:1,explanation:'Между правым предсердием и правым желудочком расположен трёхстворчатый атриовентрикулярный клапан.'},
  {id:'heart-q2',topicId:PILOT_TOPIC_ID,objectiveId:'heart-obj-2',stem:'Какой клапан расположен между левым предсердием и левым желудочком?',options:['Митральный','Трёхстворчатый','Аортальный','Клапан лёгочного ствола'],correct:0,explanation:'Между левым предсердием и левым желудочком расположен митральный (двустворчатый) клапан.'},
  {id:'heart-q3',topicId:PILOT_TOPIC_ID,objectiveId:'heart-obj-3',stem:'Какой клапан находится на выходе из левого желудочка?',options:['Митральный','Трёхстворчатый','Аортальный','Клапан лёгочного ствола'],correct:2,explanation:'Из левого желудочка кровь поступает в аорту через аортальный клапан.'},
  {id:'heart-q4',topicId:PILOT_TOPIC_ID,objectiveId:'heart-obj-4',stem:'Какой фрагмент последовательности движения крови через правые отделы сердца указан верно?',options:['Правое предсердие → митральный клапан → правый желудочек','Правое предсердие → трёхстворчатый клапан → правый желудочек','Правый желудочек → аортальный клапан → лёгочный ствол','Правое предсердие → аортальный клапан → правый желудочек'],correct:1,explanation:'Правое предсердие сообщается с правым желудочком через трёхстворчатый клапан.'}
];

const HEART_SOURCE={id:HEART_SOURCE_ID,type:'textbook',title:'Гайворонский — «Дыхательная система и сердце»',documentName:'Пользовательский учебный материал для пилотной темы',medicalAuthorityLevel:'C',verificationStatus:'SourceChecked',verifiedAt:'2026-08-25',purpose:'Основной учебный источник пилотной темы «Камеры и клапаны сердца».'};

function uid(prefix){return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`}
function clone(x){return JSON.parse(JSON.stringify(x))}
function now(){return new Date().toISOString()}
function safeParse(raw){try{return raw?JSON.parse(raw):null}catch{return null}}

function baseState(){
  return {app:{name:'MedWiz',version:APP_VERSION,schemaVersion:SCHEMA_VERSION},knowledgeData:{subjects:[],sections:[],topics:[],contentBlocks:[],questions:[],sources:[clone(HEART_SOURCE)],sourceLinks:[]},learningData:{progress:{},reviews:{},questionAttempts:[],notes:{},favorites:[],learningEvents:[]},userData:{theme:'light',lastTopicId:null,migration:{from:null,at:null},legacy31:null}};
}

function legacyFallback(){
  return {subjects:[{id:'anatomy',name:'Анатомия',emoji:'🫀',desc:'Строение органов и систем',topics:[{id:'heart-anatomy',name:'Камеры и клапаны сердца',type:'heart',summary:'Камеры, клапаны и крупные сосуды сердца.'}]}],favorites:[],trash:[],archive:[],notes:{},reviews:{},theme:'light',last:null};
}

function heartSection(){
  return {id:HEART_SECTION_ID,subjectId:'anatomy',name:'Сердечно-сосудистая система',description:'Строение сердца и сосудов.',order:100,status:'active',version:1};
}
function deterministicSection(subject){
  if(subject.id==='anatomy') return {id:ANATOMY_LEGACY_SECTION_ID,subjectId:subject.id,name:'Материалы MedWiz 3.1',description:'Нераспределённые темы Анатомии, перенесённые из стабильной версии 3.1.',order:900,status:'active',version:1};
  return {id:`${subject.id}-legacy-section`,subjectId:subject.id,name:'Материалы MedWiz 3.1',description:'Темы, перенесённые из стабильной версии 3.1.',order:100,status:'active',version:1};
}
function anatomySectionIdForTopic(topicId){
  return topicId===PILOT_TOPIC_ID||topicId==='circulation'?HEART_SECTION_ID:ANATOMY_LEGACY_SECTION_ID;
}

function migrate31(legacy){
  const s=baseState();
  const input=legacy&&Array.isArray(legacy.subjects)?legacy:legacyFallback();
  input.subjects.forEach((ls,si)=>{
    const subj={id:ls.id,name:ls.name,shortName:ls.name,description:ls.desc||'',icon:ls.emoji||'📘',status:ls.archived?'archived':ls.hidden?'hidden':'active',order:(si+1)*100,version:1};
    s.knowledgeData.subjects.push(subj);
    const sec=deterministicSection(ls); s.knowledgeData.sections.push(sec);
    if(ls.id==='anatomy') s.knowledgeData.sections.push(heartSection());
    (ls.topics||[]).forEach((lt,ti)=>{
      const sectionId=ls.id==='anatomy'?anatomySectionIdForTopic(lt.id):sec.id;
      const topic={id:lt.id,sectionId,name:lt.name,summary:lt.summary||'',order:(ti+1)*100,status:lt.hidden?'hidden':'active',version:1,medicalVerificationStatus:lt.id===PILOT_TOPIC_ID?'SourceChecked':'legacy-unverified',learningObjectives:lt.id===PILOT_TOPIC_ID?clone(HEART_OBJECTIVES):[]};
      s.knowledgeData.topics.push(topic);
      if(typeof lt.progress==='number') s.learningData.progress[lt.id]={topicId:lt.id,status:lt.progress>=100?'MASTERED':lt.progress>0?'IN_PROGRESS':'NOT_STARTED',lastScore:lt.progress,updatedAt:now(),source:'legacy31'};
    });
  });
  if(!s.knowledgeData.topics.find(t=>t.id===PILOT_TOPIC_ID)){
    let a=s.knowledgeData.subjects.find(x=>x.id==='anatomy');
    if(!a){a={id:'anatomy',name:'Анатомия',shortName:'Анатомия',description:'Строение органов и систем',icon:'🫀',status:'active',order:100,version:1};s.knowledgeData.subjects.unshift(a);s.knowledgeData.sections.unshift(deterministicSection(a));s.knowledgeData.sections.unshift(heartSection());}
    s.knowledgeData.topics.push({id:PILOT_TOPIC_ID,sectionId:HEART_SECTION_ID,name:'Камеры и клапаны сердца',summary:'Камеры, клапаны и крупные сосуды сердца.',order:200,status:'active',version:1,medicalVerificationStatus:'SourceChecked',learningObjectives:clone(HEART_OBJECTIVES)});
  }
  const heart=s.knowledgeData.topics.find(t=>t.id===PILOT_TOPIC_ID); if(heart){heart.sectionId=HEART_SECTION_ID;heart.learningObjectives=clone(HEART_OBJECTIVES);heart.medicalVerificationStatus='SourceChecked';}
  s.knowledgeData.contentBlocks.push(...clone(HEART_BLOCKS));
  s.knowledgeData.questions.push(...clone(HEART_QUESTIONS));
  HEART_BLOCKS.forEach(b=>s.knowledgeData.sourceLinks.push({id:`sl-${b.id}`,sourceId:HEART_SOURCE_ID,targetType:'contentBlock',targetId:b.id,purpose:'Подтверждение учебного содержания пилотной темы',verifiedAt:'2026-08-25'}));
  HEART_QUESTIONS.forEach(q=>s.knowledgeData.sourceLinks.push({id:`sl-${q.id}`,sourceId:HEART_SOURCE_ID,targetType:'question',targetId:q.id,purpose:'Подтверждение тестового материала пилотной темы',verifiedAt:'2026-08-25'}));
  s.learningData.favorites=clone(input.favorites||[]);
  s.learningData.notes=clone(input.notes||{});
  Object.entries(input.reviews||{}).forEach(([topicId,dueAt])=>s.learningData.reviews[topicId]={id:`review-${topicId}`,topicId,status:new Date(dueAt)<=new Date()?'DUE':'SCHEDULED',dueAt,weakQuestionIds:[],weakObjectiveIds:[],reviewMode:'FULL_TOPIC',createdAt:now(),updatedAt:now(),source:'legacy31'});
  s.userData.theme=input.theme||'light';
  s.userData.lastTopicId=input.last||null;
  s.userData.migration={from:'3.1',at:now()};
  s.userData.legacy31=clone(input);
  return s;
}

function normalizeV2(input){
  if(!input||input.app?.schemaVersion!==2) return null;
  input.app.version=APP_VERSION;
  input.knowledgeData=input.knowledgeData||{subjects:[],sections:[],topics:[],contentBlocks:[],questions:[],sources:[],sourceLinks:[]};
  input.knowledgeData.subjects=input.knowledgeData.subjects||[];
  input.knowledgeData.sections=input.knowledgeData.sections||[];
  input.knowledgeData.topics=input.knowledgeData.topics||[];
  input.knowledgeData.sources=input.knowledgeData.sources||[];
  if(!input.knowledgeData.sources.find(x=>x.id===HEART_SOURCE_ID)) input.knowledgeData.sources.push(clone(HEART_SOURCE));
  input.knowledgeData.contentBlocks=input.knowledgeData.contentBlocks||[];
  input.knowledgeData.questions=input.knowledgeData.questions||[];
  input.knowledgeData.sourceLinks=input.knowledgeData.sourceLinks||[];
  input.learningData=input.learningData||{};
  input.learningData.progress=input.learningData.progress||{}; input.learningData.reviews=input.learningData.reviews||{}; input.learningData.questionAttempts=input.learningData.questionAttempts||[]; input.learningData.notes=input.learningData.notes||{}; input.learningData.favorites=input.learningData.favorites||[]; input.learningData.learningEvents=input.learningData.learningEvents||[];
  input.userData=input.userData||{theme:'light',lastTopicId:null};

  // BUG-002 repair: keep the approved cardiovascular section focused and move
  // unmapped legacy Anatomy topics into a neutral legacy section. This also
  // repairs medwizDataV2 created by the first 3.2 QA build without touching medviz3.
  const anatomy=input.knowledgeData.subjects.find(x=>x.id==='anatomy');
  if(anatomy){
    if(!input.knowledgeData.sections.find(x=>x.id===HEART_SECTION_ID)) input.knowledgeData.sections.push(heartSection());
    if(!input.knowledgeData.sections.find(x=>x.id===ANATOMY_LEGACY_SECTION_ID)) input.knowledgeData.sections.push(deterministicSection(anatomy));
    input.knowledgeData.topics.forEach(t=>{
      if(t.id===PILOT_TOPIC_ID||t.id==='circulation') t.sectionId=HEART_SECTION_ID;
      else if(t.sectionId===HEART_SECTION_ID&&t.medicalVerificationStatus==='legacy-unverified') t.sectionId=ANATOMY_LEGACY_SECTION_ID;
    });
  }

  // BUG-001 repair: legacy 3.1 reviews did not have weakQuestionIds. Mark them
  // as full-topic reviews so startReview can run the available topic question bank.
  Object.values(input.learningData.reviews).forEach(r=>{
    if(r?.source==='legacy31'&&!r.weakQuestionIds?.length) r.reviewMode='FULL_TOPIC';
  });
  return input;
}

function loadState(){
  const v2=normalizeV2(safeParse(localStorage.getItem(STORAGE_KEY))); if(v2){localStorage.setItem(STORAGE_KEY,JSON.stringify(v2));return v2;}
  const legacy=safeParse(localStorage.getItem(LEGACY_KEY));
  const migrated=migrate31(legacy||legacyFallback()); localStorage.setItem(STORAGE_KEY,JSON.stringify(migrated)); return migrated;
}
let state=loadState();
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function event(type,entityType,entityId,metadata={}){state.learningData.learningEvents.push({id:uid('evt'),type,entityType,entityId,metadata,at:now()})}

let page='home',currentSubjectId=null,currentSectionId=null,currentTopicId=null,testSession=null,manageTab='active';
const appEl=document.getElementById('app');
const subjects=()=>state.knowledgeData.subjects.filter(x=>x.status!=='trashed');
const sectionsFor=sid=>state.knowledgeData.sections.filter(x=>x.subjectId===sid&&x.status!=='trashed').sort((a,b)=>a.order-b.order);
const topicsFor=secid=>state.knowledgeData.topics.filter(x=>x.sectionId===secid&&x.status!=='trashed').sort((a,b)=>a.order-b.order);
const topicBy=id=>state.knowledgeData.topics.find(x=>x.id===id);
const sectionBy=id=>state.knowledgeData.sections.find(x=>x.id===id);
const subjectBy=id=>state.knowledgeData.subjects.find(x=>x.id===id);
const progressFor=id=>state.learningData.progress[id]||{topicId:id,status:'NOT_STARTED',lastScore:0};
const reviewFor=id=>state.learningData.reviews[id]||null;

function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function shell(body){
  appEl.innerHTML=`<div class="app"><div class="top"><div class="brand"><div class="logo">✚</div><div><b>MedWiz ${APP_VERSION}</b><div class="qa">Development build • не Release</div></div></div><div class="row"><button class="btn ghost" id="searchTop">⌕</button><button class="btn ghost" id="manageTop">⚙︎</button><button class="btn ghost" id="themeBtn">${state.userData.theme==='dark'?'☀️':'🌙'}</button></div></div>${body}<div class="bottom"><button class="nav ${page==='home'?'active':''}" data-page="home">⌂<br>Главная</button><button class="nav ${['knowledge','subject','section','topic'].includes(page)?'active':''}" data-page="knowledge">▦<br>Знания</button><button class="nav ${page==='review'?'active':''}" data-page="review">↻<br>Повторение</button><button class="nav ${page==='exam'?'active':''}" data-page="exam">✓<br>Экзамен</button></div></div>`;
  document.documentElement.dataset.theme=state.userData.theme;
  document.getElementById('themeBtn').onclick=()=>{state.userData.theme=state.userData.theme==='dark'?'light':'dark';save();render()};
  document.getElementById('searchTop').onclick=()=>{page='search';render()};
  document.getElementById('manageTop').onclick=()=>{page='manage';render()};
  document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{page=b.dataset.page;render()});
}
function topicStatus(id){const p=progressFor(id);const r=reviewFor(id);if(p.status==='WEAK'||r?.status==='DUE')return '<span class="pill weak">Слабая</span>';if(p.status==='REVIEWED'||p.status==='MASTERED')return '<span class="pill ok">Изучено</span>';if(p.status==='IN_PROGRESS')return '<span class="pill">В процессе</span>';return '<span class="pill">Не начато</span>'}
function openTopic(id){const t=topicBy(id);if(!t)return;currentTopicId=id;currentSectionId=t.sectionId;currentSubjectId=sectionBy(t.sectionId)?.subjectId||null;state.userData.lastTopicId=id;save();page='topic';render()}

function home(){
  const last=state.userData.lastTopicId?topicBy(state.userData.lastTopicId):null;
  const reviews=Object.values(state.learningData.reviews).filter(r=>r.status==='DUE'||(r.dueAt&&new Date(r.dueAt)<=new Date()&&r.status!=='COMPLETED'));
  const weak=state.knowledgeData.topics.filter(t=>progressFor(t.id).status==='WEAK');
  const done=Object.values(state.learningData.progress).filter(p=>['MASTERED','REVIEWED'].includes(p.status)).length;
  shell(`<div class="hero"><h1>Что учить сейчас?</h1><p>Структурировать → Понять → Проверить → Повторить</p><div class="progress"><i style="width:${state.knowledgeData.topics.length?Math.round(done/state.knowledgeData.topics.length*100):0}%"></i></div></div>
  ${last?`<h2>Продолжить</h2><div class="item" data-open-topic="${last.id}"><div><b>${esc(last.name)}</b><div class="muted">${esc(sectionBy(last.sectionId)?.name||'')}</div></div><span>›</span></div>`:''}
  <h2>На повторение</h2><div class="list">${reviews.length?reviews.map(r=>`<div class="item" data-review-topic="${r.topicId}"><span>${esc(topicBy(r.topicId)?.name||r.topicId)}</span><span class="pill weak">Повторить</span></div>`).join(''):'<div class="notice">Нет тем на повторение.</div>'}</div>
  <h2>Слабые темы</h2><div class="list">${weak.length?weak.map(t=>`<div class="item" data-open-topic="${t.id}"><span>${esc(t.name)}</span><span class="pill weak">Weak</span></div>`).join(''):'<div class="notice">Пока слабых тем нет.</div>'}</div>`);
  document.querySelectorAll('[data-open-topic]').forEach(x=>x.onclick=()=>openTopic(x.dataset.openTopic));
  document.querySelectorAll('[data-review-topic]').forEach(x=>x.onclick=()=>startReview(x.dataset.reviewTopic));
}

function knowledge(){
  shell(`<h1>Знания</h1><p class="muted">Subject → Section → Topic</p><div class="grid two">${subjects().filter(s=>s.status==='active').sort((a,b)=>a.order-b.order).map(s=>`<div class="card" data-subject="${s.id}" style="cursor:pointer"><div style="font-size:34px">${s.icon||'📘'}</div><h3>${esc(s.name)}</h3><p class="muted">${esc(s.description||'')}</p><small>${sectionsFor(s.id).length} раздел(а)</small></div>`).join('')}</div>`);
  document.querySelectorAll('[data-subject]').forEach(x=>x.onclick=()=>{currentSubjectId=x.dataset.subject;page='subject';render()});
}
function subjectPage(){const s=subjectBy(currentSubjectId);if(!s){page='knowledge';return render()} shell(`<div class="breadcrumb">Знания → ${esc(s.name)}</div><button class="btn ghost" id="back">← Знания</button><div class="card" style="margin-top:12px"><h1>${esc(s.name)}</h1><p class="muted">${esc(s.description||'')}</p></div><h2>Разделы</h2><div class="list">${sectionsFor(s.id).filter(x=>x.status==='active').map(sec=>`<div class="item" data-section="${sec.id}"><div><b>${esc(sec.name)}</b><div class="muted">${esc(sec.description||'')}</div></div><span>›</span></div>`).join('')}</div>`);document.getElementById('back').onclick=()=>{page='knowledge';render()};document.querySelectorAll('[data-section]').forEach(x=>x.onclick=()=>{currentSectionId=x.dataset.section;page='section';render()})}
function sectionPage(){const sec=sectionBy(currentSectionId),s=subjectBy(sec?.subjectId);if(!sec){page='knowledge';return render()} shell(`<div class="breadcrumb">Знания → ${esc(s?.name||'')} → ${esc(sec.name)}</div><button class="btn ghost" id="back">← ${esc(s?.name||'Предмет')}</button><div class="card" style="margin-top:12px"><h1>${esc(sec.name)}</h1><p class="muted">${esc(sec.description||'')}</p></div><h2>Темы</h2><div class="list">${topicsFor(sec.id).filter(t=>t.status==='active').map(t=>{let p=progressFor(t.id);return `<div class="item" data-topic="${t.id}"><div><b>${esc(t.name)}</b><div class="muted">${esc(t.summary||'')}</div><div class="progress" style="width:180px;margin-top:8px"><i style="width:${Number(p.lastScore||0)}%"></i></div></div>${topicStatus(t.id)}</div>`}).join('')}</div>`);document.getElementById('back').onclick=()=>{currentSubjectId=sec.subjectId;page='subject';render()};document.querySelectorAll('[data-topic]').forEach(x=>x.onclick=()=>openTopic(x.dataset.topic))}

function topicPage(){
  const t=topicBy(currentTopicId),sec=sectionBy(t?.sectionId),s=subjectBy(sec?.subjectId);if(!t){page='knowledge';return render()}
  const p=progressFor(t.id); const fav=state.learningData.favorites.includes(t.id); const note=state.learningData.notes[t.id]||''; const blocks=state.knowledgeData.contentBlocks.filter(b=>b.topicId===t.id).sort((a,b)=>a.order-b.order); const source=state.knowledgeData.sources.find(x=>x.id===HEART_SOURCE_ID);
  if(!state.learningData.progress[t.id]) state.learningData.progress[t.id]={topicId:t.id,status:'IN_PROGRESS',lastScore:0,updatedAt:now()}; else if(state.learningData.progress[t.id].status==='NOT_STARTED')state.learningData.progress[t.id].status='IN_PROGRESS'; event('TOPIC_OPEN','Topic',t.id); save();
  shell(`<div class="breadcrumb">Знания → ${esc(s?.name||'')} → ${esc(sec?.name||'')} → ${esc(t.name)}</div><div class="row between"><button class="btn ghost" id="back">← Раздел</button><button class="btn secondary" id="favBtn">${fav?'★':'☆'} Избранное</button></div><div class="card" style="margin-top:12px"><h1>${esc(t.name)}</h1><p class="muted">${esc(t.summary||'')}</p><div class="row"><span class="pill">Анатомия</span>${topicStatus(t.id)}<span class="pill">Verification: ${esc(t.medicalVerificationStatus||'')}</span></div><div class="progress" style="margin-top:12px"><i style="width:${Number(p.lastScore||0)}%"></i></div></div>
  <div class="card content-block"><h3>Учебные цели</h3><ol>${(t.learningObjectives||[]).map(o=>`<li>${esc(o.text)}</li>`).join('')}</ol></div>
  ${blocks.map(b=>`<div class="card content-block"><span class="pill">${esc(b.type)}</span><h3>${esc(b.title)}</h3><p>${esc(b.content)}</p></div>`).join('')}
  <div class="card content-block"><h3>Источник и верификация</h3><div class="source"><b>${esc(source?.title||'Источник')}</b><div class="muted">${esc(source?.purpose||'')}</div><div class="row" style="margin-top:8px"><span class="pill">${esc(source?.medicalAuthorityLevel||'')}</span><span class="pill ok">${esc(source?.verificationStatus||'')}</span><span class="pill">Проверено: ${esc(source?.verifiedAt||'')}</span></div></div></div>
  <div class="card content-block"><h3>Личная заметка</h3><textarea id="note">${esc(note)}</textarea><button class="btn secondary" id="saveNote">Сохранить заметку</button></div>
  <div class="card content-block"><h3>Проверка знаний</h3><p class="muted">Ответы не раскрываются до выбора.</p><button class="btn" id="startTest">Начать тест</button></div>`);
  document.getElementById('back').onclick=()=>{currentSectionId=t.sectionId;page='section';render()};
  document.getElementById('favBtn').onclick=()=>{state.learningData.favorites=fav?state.learningData.favorites.filter(x=>x!==t.id):[...state.learningData.favorites,t.id];event(fav?'FAVORITE_REMOVE':'FAVORITE_ADD','Topic',t.id);save();render()};
  document.getElementById('saveNote').onclick=()=>{state.learningData.notes[t.id]=document.getElementById('note').value;event('NOTE_SAVE','Topic',t.id);save();alert('Заметка сохранена')};
  document.getElementById('startTest').onclick=()=>startTest(t.id,false);
}

function startTest(topicId,isReview){
  const all=state.knowledgeData.questions.filter(q=>q.topicId===topicId); const rev=reviewFor(topicId); const qs=isReview&&rev?.weakQuestionIds?.length?all.filter(q=>rev.weakQuestionIds.includes(q.id)):all;
  testSession={topicId,isReview,questions:clone(qs),index:0,answers:[],startedAt:now()}; page='test';render();
}
function testPage(){
  if(!testSession||!testSession.questions.length){page='topic';return render()} const q=testSession.questions[testSession.index]; const ans=testSession.answers.find(a=>a.questionId===q.id);
  shell(`<div class="breadcrumb">${testSession.isReview?'Повторение':'Тест темы'} • ${testSession.index+1}/${testSession.questions.length}</div><div class="card question"><h2>${esc(q.stem)}</h2>${q.options.map((o,i)=>`<button class="btn ghost option ${ans?.selected===i?'selected':''}" data-option="${i}" ${ans?'disabled':''}>${esc(o)}</button>`).join('')}<div id="feedback">${ans?`<div class="notice ${ans.correct?'ok':'warn'}">${esc(q.explanation)}</div>`:''}</div>${ans?`<button class="btn" id="nextQ">${testSession.index===testSession.questions.length-1?'Завершить':'Следующий вопрос'}</button>`:''}</div>`);
  if(!ans) document.querySelectorAll('[data-option]').forEach(b=>b.onclick=()=>answerQuestion(q,Number(b.dataset.option)));
  const n=document.getElementById('nextQ'); if(n)n.onclick=()=>{if(testSession.index===testSession.questions.length-1)finishTest();else{testSession.index++;render()}};
}
function answerQuestion(q,selected){const correct=selected===q.correct;const a={id:uid('attempt'),questionId:q.id,topicId:q.topicId,objectiveId:q.objectiveId,selected,correct,attemptedAt:now(),mode:testSession.isReview?'review':'topicTest'};testSession.answers.push(a);state.learningData.questionAttempts.push(clone(a));event('QUESTION_ANSWER','Question',q.id,{correct,mode:a.mode});save();render()}
function finishTest(){
  const total=testSession.answers.length,correct=testSession.answers.filter(a=>a.correct).length,score=total?Math.round(correct/total*100):0; const weakAnswers=testSession.answers.filter(a=>!a.correct); const weakQuestionIds=[...new Set(weakAnswers.map(a=>a.questionId))],weakObjectiveIds=[...new Set(weakAnswers.map(a=>a.objectiveId))];
  const old=progressFor(testSession.topicId); const p={...old,topicId:testSession.topicId,lastScore:score,lastTestAt:now(),updatedAt:now(),weakQuestionIds,weakObjectiveIds};
  if(weakQuestionIds.length){p.status='WEAK';state.learningData.reviews[testSession.topicId]={id:`review-${testSession.topicId}`,topicId:testSession.topicId,status:'DUE',dueAt:now(),weakQuestionIds,weakObjectiveIds,createdAt:reviewFor(testSession.topicId)?.createdAt||now(),updatedAt:now()};}
  else if(testSession.isReview){p.status='REVIEWED';const r=reviewFor(testSession.topicId);if(r){r.status='COMPLETED';r.completedAt=now();r.updatedAt=now();r.weakQuestionIds=[];r.weakObjectiveIds=[];}}
  else p.status='MASTERED';
  state.learningData.progress[testSession.topicId]=p; event('TEST_COMPLETE','Topic',testSession.topicId,{score,isReview:testSession.isReview,weakQuestionIds});save(); page='result';render();
}
function resultPage(){const t=topicBy(testSession?.topicId);if(!testSession||!t){page='home';return render()} const p=progressFor(t.id),weak=p.weakQuestionIds||[];shell(`<h1>${testSession.isReview?'Результат повторения':'Результат теста'}</h1><div class="card"><div class="stat"><b>${p.lastScore}%</b><div class="muted">Последний результат</div></div>${weak.length?`<div class="notice warn" style="margin-top:12px"><b>Слабые элементы: ${weak.length}</b><div>Ошибки добавлены в Progress / Review.</div></div>`:`<div class="notice ok" style="margin-top:12px"><b>Ошибок нет.</b><div>${testSession.isReview?'Review завершён.':'Тема отмечена как изученная.'}</div></div>`}<div class="row" style="margin-top:14px">${weak.length?`<button class="btn" id="reviewErrors">Разобрать ошибки</button>`:''}<button class="btn secondary" id="toHome">На Главную</button><button class="btn ghost" id="toTopic">К теме</button></div></div>`);document.getElementById('toHome').onclick=()=>{testSession=null;page='home';render()};document.getElementById('toTopic').onclick=()=>{const id=t.id;testSession=null;openTopic(id)};const re=document.getElementById('reviewErrors');if(re)re.onclick=()=>{const id=t.id;testSession=null;startReview(id)}}
function startReview(topicId){
  currentTopicId=topicId;
  const r=reviewFor(topicId);
  if(!r){alert('Повторение для этой темы не найдено.');page='review';return render()}
  const hasWeak=!!r.weakQuestionIds?.length;
  const canFullTopic=r.reviewMode==='FULL_TOPIC'&&state.knowledgeData.questions.some(q=>q.topicId===topicId);
  if(!hasWeak&&!canFullTopic){alert('Для этой темы пока нет доступных вопросов для повторения.');page='review';return render()}
  startTest(topicId,true);
}
function reviewPage(){const rs=Object.values(state.learningData.reviews).filter(r=>r.status!=='COMPLETED');shell(`<h1>Повторение</h1><p class="muted">Слабые темы и запланированные повторы.</p><div class="list">${rs.length?rs.map(r=>`<div class="item" data-review="${r.topicId}"><div><b>${esc(topicBy(r.topicId)?.name||r.topicId)}</b><div class="muted">${r.reviewMode==='FULL_TOPIC'&&!r.weakQuestionIds?.length?'Полный тест темы • из MedWiz 3.1':`${r.weakQuestionIds?.length||0} слабых вопроса`}</div></div><span class="pill weak">${esc(r.status)}</span></div>`).join(''):'<div class="notice">Нет активных повторений.</div>'}</div>`);document.querySelectorAll('[data-review]').forEach(x=>x.onclick=()=>startReview(x.dataset.review))}
function exam(){shell(`<h1>Экзамен</h1><div class="notice">Экзаменационное UX-пространство сохранено. В этой Development-сборке изменяется только вертикальный сценарий пилотной Topic; расширение Exam не выполняется.</div>`)}
function searchPage(){shell(`<h1>Поиск</h1><input id="q" class="search" placeholder="Предмет, раздел или тема"><div id="results" class="list" style="margin-top:12px"></div>`);const q=document.getElementById('q'),out=document.getElementById('results');q.oninput=()=>{const v=q.value.trim().toLowerCase();if(!v){out.innerHTML='';return}const rows=[];subjects().forEach(s=>{if(s.name.toLowerCase().includes(v))rows.push({type:'Предмет',name:s.name,action:`sub:${s.id}`})});state.knowledgeData.sections.forEach(s=>{if(s.name.toLowerCase().includes(v))rows.push({type:'Раздел',name:s.name,action:`sec:${s.id}`})});state.knowledgeData.topics.forEach(t=>{if((t.name+' '+(t.summary||'')).toLowerCase().includes(v))rows.push({type:'Тема',name:t.name,action:`topic:${t.id}`})});out.innerHTML=rows.length?rows.map((r,i)=>`<div class="item" data-action="${r.action}"><div><b>${esc(r.name)}</b><div class="muted">${r.type}</div></div><span>›</span></div>`).join(''):'<div class="notice">Ничего не найдено.</div>';out.querySelectorAll('[data-action]').forEach(el=>el.onclick=()=>{const [kind,id]=el.dataset.action.split(':');if(kind==='topic')openTopic(id);else if(kind==='sub'){currentSubjectId=id;page='subject';render()}else{currentSectionId=id;page='section';render()}})}}

function manage(){shell(`<h1>Управление</h1><div class="tabs"><button class="btn secondary" id="constructor">Конструктор</button><button class="btn secondary" id="favorites">Избранное</button><button class="btn secondary" id="archive">Архив / Корзина</button><button class="btn secondary" id="data">Backup / Restore</button></div><div id="manageBody" style="margin-top:14px"></div>`);document.getElementById('constructor').onclick=()=>drawConstructor();document.getElementById('favorites').onclick=()=>drawFavorites();document.getElementById('archive').onclick=()=>drawArchive();document.getElementById('data').onclick=()=>drawData();drawConstructor()}
function drawConstructor(){const body=document.getElementById('manageBody');body.innerHTML=`<div class="notice">Конструктор сохраняет stable IDs. В этой QA-сборке доступно скрытие/архивирование предметов без удаления учебного контента пилотной темы.</div><div class="list" style="margin-top:12px">${subjects().map(s=>`<div class="item"><div><b>${esc(s.name)}</b><div class="muted">${esc(s.status)}</div></div><div class="row"><button class="btn ghost" data-hide="${s.id}">${s.status==='hidden'?'Показать':'Скрыть'}</button><button class="btn ghost" data-arch="${s.id}">${s.status==='archived'?'Вернуть':'Архив'}</button></div></div>`).join('')}</div>`;body.querySelectorAll('[data-hide]').forEach(b=>b.onclick=()=>{let s=subjectBy(b.dataset.hide);s.status=s.status==='hidden'?'active':'hidden';s.version=(s.version||1)+1;save();drawConstructor()});body.querySelectorAll('[data-arch]').forEach(b=>b.onclick=()=>{let s=subjectBy(b.dataset.arch);s.status=s.status==='archived'?'active':'archived';s.version=(s.version||1)+1;save();drawConstructor()})}
function drawFavorites(){const body=document.getElementById('manageBody');const list=state.learningData.favorites.map(topicBy).filter(Boolean);body.innerHTML=list.length?`<div class="list">${list.map(t=>`<div class="item" data-favtopic="${t.id}"><span>${esc(t.name)}</span><span>›</span></div>`).join('')}</div>`:'<div class="notice">Избранное пусто.</div>';body.querySelectorAll('[data-favtopic]').forEach(x=>x.onclick=()=>openTopic(x.dataset.favtopic))}
function drawArchive(){const body=document.getElementById('manageBody');const list=subjects().filter(s=>s.status==='archived'||s.status==='hidden');body.innerHTML=list.length?`<div class="list">${list.map(s=>`<div class="item"><span>${esc(s.name)}</span><button class="btn secondary" data-restore="${s.id}">Восстановить</button></div>`).join('')}</div>`:'<div class="notice">Архив и скрытые объекты пусты.</div>';body.querySelectorAll('[data-restore]').forEach(b=>b.onclick=()=>{subjectBy(b.dataset.restore).status='active';save();drawArchive()})}
function backupEnvelope(){return {app:{name:'MedWiz',version:APP_VERSION},backupVersion:1,schemaVersion:2,createdAt:now(),knowledgeData:clone(state.knowledgeData),learningData:clone(state.learningData),userData:clone(state.userData),legacy31:clone(state.userData.legacy31)}}
function drawData(){const body=document.getElementById('manageBody');body.innerHTML=`<div class="card"><h3>Экспорт QA backup</h3><button class="btn" id="exportBtn">Скачать резервную копию</button></div><div class="card" style="margin-top:12px"><h3>Импорт</h3><p class="muted">Поддерживаются backup schema v2 и legacy JSON MedWiz 3.1.</p><input id="fileInput" type="file" accept=".json"><button class="btn secondary" id="importBtn">Импортировать</button></div>`;document.getElementById('exportBtn').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(backupEnvelope(),null,2)],{type:'application/json'}));a.download='medwiz-3.2-qa-backup.json';a.click();URL.revokeObjectURL(a.href)};document.getElementById('importBtn').onclick=()=>{const f=document.getElementById('fileInput').files[0];if(!f)return alert('Выберите JSON');const r=new FileReader();r.onload=()=>{const data=safeParse(r.result);if(!data)return alert('Файл повреждён');let next;if(data.schemaVersion===2&&data.knowledgeData){next=normalizeV2({app:{name:'MedWiz',version:APP_VERSION,schemaVersion:2},knowledgeData:data.knowledgeData,learningData:data.learningData,userData:data.userData})}else if(Array.isArray(data.subjects)){next=migrate31(data)}else return alert('Неподдерживаемый формат');if(!next)return alert('Не удалось импортировать');localStorage.setItem(`${STORAGE_KEY}:recovery:${Date.now()}`,JSON.stringify(state));state=next;save();alert('Импорт завершён');page='home';render()};r.readAsText(f)}}

function render(){if(page==='home')home();else if(page==='knowledge')knowledge();else if(page==='subject')subjectPage();else if(page==='section')sectionPage();else if(page==='topic')topicPage();else if(page==='test')testPage();else if(page==='result')resultPage();else if(page==='review')reviewPage();else if(page==='exam')exam();else if(page==='search')searchPage();else if(page==='manage')manage();else{page='home';home()}}
if('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
render();
