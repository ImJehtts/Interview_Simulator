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
        Respond with json format like this. No extra information. Just this without the quotations:
        "{1:Blahblahblahjobstuff
        2:Blahblahblahjobstuff}" 
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

    const jobDescriptionMatch = rawResponse.match(/1:(.*?)2:/s);  
    const jobRequirementsMatch = rawResponse.match(/2:(.*)/s);  

    if (!jobDescriptionMatch || !jobRequirementsMatch) {
        throw new Error('Failed to get job description or requirements from API.');
    }

    const jobDescription = jobDescriptionMatch[1].trim();
    const jobRequirements = jobRequirementsMatch[1].trim();

    jobData[2] = jobDescription;
    jobData[3] = jobRequirements;

    res.status(200).json({jobDescription, jobRequirements});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    trimJobinformation,
}