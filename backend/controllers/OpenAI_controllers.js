let OpenAI = require('openai')
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY, 
})


const trimJobinformation  = async (req, res) =>{
    try {
        const {jobData} = req.body

        if (!Array.isArray(jobData)) {
            console.error('Invalid jobData received:', jobData)
            return res.status(400).json({ error: 'Invalid jobData format: not array.' })
        }

        if (jobData.length < 4) {
            console.error('Invalid jobData received:', jobData)
            return res.status(400).json({ error: 'Invalid jobData format: length' })
        }

        const prompt =`
        You are given two job-related paragraphs: one describes the job description and the other outlines the job requirements. 
        Your task is to summarize the paragraphs to a maximum of 750 characters each, preserving all critical information including what you'll be working on and languages/frameworks and concepts they value.
        Based on the given context, Respond in this strict JSON format (no additional information or text): 
        {"jobDescriptionres": "Overview of the job...",
        "jobRequirementsres": "Qualifications and requirements..."}
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
        throw new Error('API response didnt work or no choices returned')
    }

    const rawResponse = response.choices[0].message.content
    console.log('Raw OpenAI Response:', rawResponse)

    const jsonResponse = JSON.parse(rawResponse)
    const {jobDescriptionres, jobRequirementsres} = jsonResponse

    if (!jobDescriptionres || !jobRequirementsres) {
        throw new Error('Failed to get job description or requirements from API.')
    }

    jobDret = jobDescriptionres.trim()
    jobRret = jobRequirementsres.trim()

    res.status(200).json({jobDret, jobRret})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

    const behavioural1question = async (req, res) =>{
        try {
            const {jobData} = req.body
    
            if (!jobData || jobData.length < 4) {
                return res.status(400).json({ error: 'Invalid jobData format.' })
            }
    
            const prompt =`Act as an interview simulator for an icebreaker round. Based on the following details: Role Name:${jobData[0]} Company Name:${jobData[1]} Role Description:${jobData[2]} 
            Generate a behavioral interview question that is light, engaging, and non-technical. The goal is to help the interviewer get to know the candidate better
            but it should still be a question that could appear in an interview/
            Examples include: Why did you choose [Insert Company Name]?, Tell me about yourself.
            What's something you're particularly proud of, either personally or professionally?
            Think of 3 potential questions and return only one that fits best for the role. A get to know of why you would want to hire them. 
            Respond in this strict JSON format (no additional information or text). Dont even label it as json:
            {"question": "Your thoughtfully crafted icebreaker question here"}`

        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model:"gpt-4o",
        })
    
        if (!response || !response.choices || response.choices.length === 0) {
            throw new Error('API response didnt work or no choices returned')
        }

        const rawResponse = response.choices[0].message.content
    
        const jsonResponse = JSON.parse(rawResponse.replace(/```json|```/g, '').trim())

        if (!jsonResponse.question) {
            throw new Error('Failed to get good response from API.')
        }
    
        const question = jsonResponse.question.trim()
    
    
        res.status(200).json({question})
        } catch (error) {
            console.error(error)
            res.status(500).json({error: error.message})
        }
}


const behaveQ1feedback = async (req, res) =>{
    try {
        const {question, questionanswer, jobData} = req.body

        if (!question || !questionanswer || !jobData || !jobData[0]) {
            return res.status(400).json({error: 'Invalid data format'})
        }

        const prompt = `This was the question: "${question}". This was the answer: "${questionanswer}". This was the jobtitle: "${jobData[0]}".
        This is meant to be for an interview simulator so critique accordingly. Call out answers that are too short or vague or even too long. Feel free to be harsh with rating or feedback. 
        Don't give out easy 4 or 5's.   
        Provide 2-3 lines of feedback and give a rating to one decimal point out of 5. Respond strictly in this JSON format (no additional information or text). Dont even label it as json:
        {"feedback": "Your feedback here", "rating": "Your rating here (example: 3.5/5)"}`

        const response = await openai.chat.completions.create({
            messages: [{role: 'user', content: prompt}],
            model: "gpt-4o",
        })

        if (!response || !response.choices || response.choices.length === 0) {
            throw new Error('API response is invalid or no choices were returned.')
        }

        const rawResponse = response.choices[0].message.content

        console.log('Raw OpenAI Response:', rawResponse)

        const {feedback, rating} = JSON.parse(response.choices[0].message.content)

        res.status(200).json({feedback, rating})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    trimJobinformation,
    behavioural1question,
    behaveQ1feedback
}