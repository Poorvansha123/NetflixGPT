import OpenAI from 'openai';
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_Key, 
   dangerouslyAllowBrowser: true 
});
export default client
//this is the initial setup of open ai