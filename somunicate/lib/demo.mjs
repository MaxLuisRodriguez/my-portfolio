import {dimensions} from './recommender.mjs';
// Procedural examples only. These descriptors are design heuristics, not research ratings.
export function demoCatalog() {
  return Array.from({length:48},(_,i)=> {
    const bright=(i%4)/3, rise=Math.floor(i/4)%3-1, pulse=Math.floor(i/12)%4;
    const r={id:`tone-${i}`, title:`${['Low','Soft','Clear','Bright'][i%4]} ${['fall','chime','rise'][rise+1]} · ${pulse+1} ${pulse?'pulses':'pulse'}`, synth:{frequency:220+bright*660,rise,pulses:pulse+1}};
    const features=[rise, -rise, pulse/1.5-1, rise*.6, bright, -bright, -rise, pulse/1.5-1, pulse/1.5-1, rise, bright*.7, -pulse/3, 1-bright, rise*.6, bright, 1-bright*2, 1-bright, 1-pulse/1.5, bright*2-1];
    dimensions.forEach((k,j)=>r[k]=features[j]);
    return r;
  });
}
