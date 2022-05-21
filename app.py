import os
import openai
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        subject = request.form["subject"] 
        response = openai.Completion.create(  
            engine="text-davinci-002",
            prompt=generate_prompt(subject),
            temperature=0.7,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

        return redirect(url_for("index", result=response.choices[0].text))

    result = request.args.get("result")
    return render_template("index.html", result=result)
def generate_prompt(subject):
    
    return """Please put each prompt on a new line. First repeat the input: Your subject was "[subject]" then give a numbered list of prompts to draw from the subject given.
    Subject: Flowers
    Prompts: Your subject was "Flowers"  
    1. A single rose 
    2. Wildflowers in the hand of a child  
    3. Blowing a dandelion  
    4. A vase of tulips  
    5. A field of poppies 
    Subject: A landscape 
    Prompts: Your subject was "A landscape" 
    1. An imaginary dystopia  
    2. An empty playground 
    3. A beach at sunset  
    4. A birds-eye view of a forest  
    5. A cornfield  
    Subject: human figure
    Prompts: Your subject was "human figure" 
    1. Your foot 
    2. An old hand next to a young hand 
    3. A close-up of an ear  
    4. The same mouth holding different expressions 
    5. A backlit sillouette 
    Subject: still-life 
    Prompts: Your subject was "still life" 
    1. A bowl of fruit 
    2. A toy 
    3. A salt and pepper shaker set 
    4. Painting supplies 
    5. old books 
    Subject: pet 
    Prompts: Your subject was "pet" 
    1. A sleeping cat 
    2 A dog playing fetch  
    3. A bird in a cage  
    4. A fish in a bowl 
    5. A hamster in a wheel  
    Subject: flowers
    Promtpts: Your subject was "flowers" 
    1. A single rose 
    2. Wildflowers in the hand of a child 
    3. Blowing a dandelion 
    4. A vase of tulips 
    5. A field of poppies 
    Subject: Something yellow 
    Prompts: Your subject was "flowers" 
    1. A dandelion 
    2. A lemon 
    3. A sunflower 
    4. A canary 
    5. A banana 
    Subject: in the dark 
    Prompts:Your subject was "in the dark" 
    1. A candle in the dark 
    2. A night sky  
    3. A creature in the shadows 
    4. A face in the dark 
    5. Glowing eyes in the dark 
    Subject: {}    
    Prompts:""".format(
        subject.capitalize()
        )
    
    