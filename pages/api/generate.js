import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.subject),
    temperature: 0.2,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(subject) {
  const capitalizedSubject =
    subject[0].toUpperCase() + subject.slice(1).toLowerCase();
    return ` First epeat the input: Your subject was: "[subject]." 
    then give 3 numbered prompts on new lines.
    Example:
    Your subject was: "{subject}".
    1. prompt[0]/n
    2. prompt[1]/n
    3. prompt[2]/n
    Subject: flowers Say: Your subject was: "Flowers".
    Prompts:  
    1. A single rose 
    2. Wildflowers in the hand of a child  
    3. Blowing a dandelion  
    4. A vase of tulips  
    5. A field of poppies 
    Subject: A landscape Say: Your subject was: "A landscape".
    Prompts:
    1. An imaginary dystopia
    2. An empty playground
    3. A beach at sunset
    4. A birds-eye view of a forest
    5. A cornfield
    Subject: human figure  Your subject was "human figure".
    Prompts:
    1. Your foot
    2. An old hand next to a young hand
    3. A close-up of an ear
    4. The same mouth holding different expressions 
    5. A backlit sillouette 
    Subject: still-life Say: Your subject was "still life".
    Prompts:  
    1. A bowl of fruit 
    2. A toy 
    3. A salt and pepper shaker set 
    4. Painting supplies 
    5. old books 
    Subject: pet say: Your subject was "pet" 
    Prompts: 
    1. A sleeping cat 
    2 A dog playing fetch  
    3. A bird in a cage  
    4. A fish in a bowl 
    5. A hamster in a wheel  
    Subject: flowers Say: Your subject was: "flowers"
    Promtpts:  
    1. A single rose 
    2. Wildflowers in the hand of a child 
    3. Blowing a dandelion 
    4. A vase of tulips 
    5. A field of poppies 
    Subject: Something yellow Say: Your subject was: "flowers" 
    Prompts: 
    1. A dandelion 
    2. A lemon 
    3. A sunflower 
    4. A canary 
    5. A banana 
    Subject: "in the dark" Say: Your subject was: "in the dark"
    Prompts:
    1. A candle in the dark
    2. A night sky  
    3. A creature in the shadows 
    4. A face in the dark 
    5. Glowing eyes in the dark
Subject: ${capitalizedSubject}
Your Subject was: {Subject}
Prompts:' /n'`
}
