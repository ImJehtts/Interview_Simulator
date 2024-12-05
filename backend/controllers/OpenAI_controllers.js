let OpenAI = require('openai')
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY, 
})


const trimJobinformation  = async (req, res) =>{
    try {
        const {jobData} = req.body;

        if (!jobData || jobData.length < 4) {
            return res.status(400).json({ error: 'Invalid jobData format.' });
        }

        const prompt =`
        You are given two job-related paragraphs: one describes the job description and the other outlines the job requirements. 
        Your task is to summarize the paragraphs to a maximum of 750 characters each, preserving all critical information including what you'll be working on and languages/frameworks and concepts they value.
        Based on the given context, Respond in this strict JSON format (no additional information or text): 
        {"jobDescription": "Overview of the job...",
        "jobRequirements": "Qualifications and requirements..."}
        No additional information or text outside the JSON format. Dont even label it as json
        Here are the details:
        - Job Description: ${jobData[2]}
        - Job Requirements: ${jobData[3]}
    `
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model:"gpt-4o",
    })

    if (!response || !response.choices || response.choices.length === 0) {
        throw new Error('API response didnt work or no choices returned');
    }

    const rawResponse = response.choices[0].message.content;
    console.log('Raw OpenAI Response:', rawResponse);

    const jsonResponse = JSON.parse(rawResponse);
    const {jobDescription, jobRequirements} = jsonResponse;

    if (!jobDescription || !jobRequirements) {
        throw new Error('Failed to get job description or requirements from API.');
    }

    jobData[2] = jobDescription.trim();
    jobData[3] = jobRequirements.trim();

    res.status(200).json({jobDescription, jobRequirements});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

    const behavioural1question = async (req, res) =>{
        try {
            const {jobData} = req.body;
    
            if (!jobData || jobData.length < 4) {
                return res.status(400).json({ error: 'Invalid jobData format.' });
            }
    
            const prompt =`Act as an interview simulator for an icebreaker round. Based on the following details: Role Name:${jobData[0]} Company Name:${jobData[1]} Role Description:${jobData[2]} 
            Generate a behavioral interview question that is light, engaging, and non-technical. The goal is to help the interviewer get to know the candidate better. 
            Examples include: Why did you choose [Insert Company Name]?, Tell me about yourself.
            What's something you're particularly proud of, either personally or professionally?
            Think of 3 potential questions and return only one that fits best for the role. A get to know of why you would want to hire them. 
            Respond in this strict JSON format (no additional information or text): 
            {"question": "Your thoughtfully crafted icebreaker question here"}`

        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model:"gpt-4o",
        })
    
        if (!response || !response.choices || response.choices.length === 0) {
            throw new Error('API response didnt work or no choices returned');
        }

        const rawResponse = response.choices[0].message.content;
    
        const jsonResponse = JSON.parse(rawResponse.replace(/```json|```/g, '').trim());

        if (!jsonResponse.question) {
            throw new Error('Failed to get good response from API.');
        }
    
        const question = jsonResponse.question.trim();
    
    
        res.status(200).json({question});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: error.message});
        }
}

module.exports = {
    trimJobinformation,
    behavioural1question
}