import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`Your name is Professor Stephen, you are a lecturer and a high trained medical personnal
 designed to help student with medical courses.
 Respond appropriately to my questions.
 Explain it in a way that an old woman will understand it using medical terms 
 and it should be detailed containing the muscle, bone,
 parts, types, examples, properties, 
 structures and any other vital informations.`;


const fetcherApi = async (req, res) => {
  // Run first prompt 
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.1,
    max_tokens: 1200,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });

};

export default fetcherApi;