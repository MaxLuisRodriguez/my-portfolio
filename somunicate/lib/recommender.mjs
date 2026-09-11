export const groups = {
  Status: ['having_finished_successfully','having_a_problem','process_ongoing','being_ready','having_news','being_empty','shutting_down'],
  Appeal: ['negative_warnings','urgency_reminder','encouraging_confirmations','starting_prompts','waiting_prompts'],
  Character: ['sophistication','positivity','progressiveness','dominance','solidity','purity','playfulness'],
};
export const dimensions = Object.values(groups).flat();
export const label = key => key.replaceAll('_',' ').replace(/^./, c => c.toUpperCase());

function inverse(matrix) {
  const n = matrix.length;
  const a = matrix.map((r,i) => [...r,...Array.from({length:n},(_,j)=>+(i===j))]);
  for(let i=0;i<n;i++) {
    let pivot=i;
    for(let j=i+1;j<n;j++) if(Math.abs(a[j][i])>Math.abs(a[pivot][i])) pivot=j;
    [a[i],a[pivot]]=[a[pivot],a[i]];
    const scale=a[i][i];
    if(!Number.isFinite(scale)||Math.abs(scale)<1e-14) throw new Error('Invalid covariance');
    a[i]=a[i].map(v=>v/scale);
    for(let j=0;j<n;j++) if(j!==i) { const factor=a[j][i]; a[j]=a[j].map((v,k)=>v-factor*a[i][k]); }
  }
  return a.map(r=>r.slice(n));
}

export function recommend(rows, query) {
  if(!query || typeof query !== 'object' || !query.ratings || typeof query.ratings !== 'object' || Array.isArray(query.ratings)) throw new Error('Choose at least one dimension.');
  // Canonical order makes results invariant to the order of request keys.
  const keys=dimensions.filter(k=>Object.hasOwn(query.ratings,k));
  if(!keys.length || Object.keys(query.ratings).some(k=>!dimensions.includes(k))) throw new Error('Unknown or empty dimensions.');
  const target=keys.map(k=>query.ratings[k]);
  if(target.some(v=>typeof v!=='number'||!Number.isFinite(v)||v < -1||v > 1)) throw new Error('Ratings must be numbers between -1 and 1.');
  const limit=query.limit??5;
  if(!Number.isInteger(limit)||limit<1||limit>10) throw new Error('Choose 1 to 10 results.');
  const cohort=query.cohort??[];
  if(!Array.isArray(cohort)||cohort.some(v=>!Number.isInteger(v)||v<1||v>12)||new Set(cohort).size!==cohort.length) throw new Error('Invalid demographic groups.');
  const thresholds=[query.minLiking??0,query.minFamiliarity??0];
  if(thresholds.some(v=>typeof v!=='number'||!Number.isFinite(v)||v<0||v>100)) throw new Error('Thresholds must be between 0 and 100.');
  const valid=rows.filter(r=>keys.every(k=>Number.isFinite(r[k])&&r[k]>=-1&&r[k]<=1));
  if(!valid.length) return [];
  const mean=keys.map(k=>valid.reduce((s,r)=>s+r[k],0)/valid.length);
  // Select covariance by feature NAME, then invert that marginal covariance.
  // Ridge regularization preserves differences even for constant/collinear features.
  const cov=keys.map((a,i)=>keys.map((b,j)=>valid.reduce((s,r)=>s+(r[a]-mean[i])*(r[b]-mean[j]),0)/Math.max(1,valid.length-1)));
  const ridge=Math.max(1e-6,cov.reduce((s,r,i)=>s+r[i],0)/keys.length*1e-3);
  const precision=inverse(cov.map((r,i)=>r.map((v,j)=>v+(i===j?ridge:0))));
  const ids=cohort.length?cohort:Array.from({length:12},(_,i)=>i+1);
  const average=(r,offset)=> { const values=ids.map(i=>r[String(i+offset)]).filter(Number.isFinite); return values.length?values.reduce((a,b)=>a+b,0)/values.length:null; };
  return valid.map(r=> {
    const diff=keys.map((k,i)=>r[k]-target[i]);
    const squared=diff.reduce((s,v,i)=>s+v*diff.reduce((t,w,j)=>t+precision[i][j]*w,0),0);
    return {id:r.id,title:r.title,distance:Math.sqrt(Math.max(0,squared)),liking:average(r,0),familiarity:average(r,12),synth:r.synth};
  }).filter(r=>(thresholds[0]===0 || (r.liking!==null&&r.liking>=thresholds[0]))&&(thresholds[1]===0 || (r.familiarity!==null&&r.familiarity>=thresholds[1])))
    .sort((a,b)=>a.distance-b.distance||String(a.id).localeCompare(String(b.id))).slice(0,limit);
}
