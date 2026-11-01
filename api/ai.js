/* Vercel Node serverless API; never deploy OpenAI credentials to GitHub Pages. */
const ORIGIN = process.env.UNLOXX_ALLOWED_ORIGIN || "https://ngonavs.github.io";
const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
module.exports = async function handler(req,res) {
  res.setHeader("Cache-Control","no-store");
  res.setHeader("Access-Control-Allow-Origin",ORIGIN);
  res.setHeader("Vary","Origin");
  res.setHeader("Access-Control-Allow-Methods","POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");
  if(req.method==="OPTIONS")return res.status(204).end();
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  if(req.headers.origin!==ORIGIN)return res.status(403).json({error:"Origin not allowed"});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:"AI is not configured"});
  // Do not make an unauthenticated paid API public. Server-side identity verification
  // must be integrated before enabling live traffic; browser tokens are not sufficient.
  if(process.env.UNLOXX_AI_ENABLED!=="true")return res.status(503).json({error:"AI activation pending secure authentication"});
  return res.status(503).json({error:"AI requires server-side authentication and rate limiting before launch"});
};
