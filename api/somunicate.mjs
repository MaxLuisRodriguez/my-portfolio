import {recommend} from '../somunicate/lib/recommender.mjs';
import {demoCatalog} from '../somunicate/lib/demo.mjs';
export default function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if(['https://maxluisrodriguez.github.io','https://max-rodriguez-portfolio.vercel.app'].includes(req.headers.origin)) res.setHeader('Access-Control-Allow-Origin',req.headers.origin);
  res.setHeader('Vary','Origin');
  if(req.method==='OPTIONS') {res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');return res.status(204).end();}
  if(req.method!=='POST') return res.status(405).json({error:'Use POST.'});
  try { const query=typeof req.body==='string'?JSON.parse(req.body):req.body; return res.status(200).json({mode:'demo',results:recommend(demoCatalog(),query)}); }
  catch { return res.status(400).json({error:'Choose valid dimensions and ratings between -1 and 1.'}); }
}
