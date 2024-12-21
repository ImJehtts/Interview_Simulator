import React, { useState, useEffect } from 'react'
import Results from './Results'
import axios from 'axios'

const Techincalwordquestion = ({pressedNext, jobData, overallRatingtoMain, skills}) => {
    const [question, setQuestion] = useState('')
    const [questionanswer, setQuestionanswer] = useState('')
    const [ratingnumber, setRatingnumber] = useState('0.0/5')
    const [feedback, setFeedback] = useState('')
    const [apirecieved, setApirecieved] = useState(0)

    useEffect(() => {
        const getquestion = async () => {
            try {
                let prompt = `Act as an interview simulator for a technical round. Based on the following details: Role Name:${jobData[0]} Role Description:${jobData[3]} 
                Generate a technical interview question that assesses the candidate's technical skills and problem-solving abilities. 
                Examples include: Describe a challenging technical problem you faced and how you solved it, Can you explain the difference between a stack and a queue? When would you use each?, Explain use of async and await in JavaScript.
                The question should be general enough to apply to various technical roles and not overly specific to any particular industry or domain.
                The question should encourage the candidate to share a technical experience and focus on skills/frameworks mentioned in the Role description or skills given. 
                Ensure the question is not overly focused on any single aspect. Base the difficulty of the question on the level of the role being applied for:
                If the role is an intern position, focus on soft skills like working in teams or the languages/frameworks mentioned, avoiding hard/specific skills. Maybe ask about DSA they could know from school. 
                If the role is a senior position, you can ask more challenging questions that assess deeper technical knowledge and abilities.
                Should be able to answer in 1 paragraph and the question should be 250 characters max. 
                Respond in this strict JSON format (no additional information or text). Don't even label it as JSON:
                {"question": "Your thoughtfully crafted technical question here"}`
                const response = await axios.post('http://localhost:4800/OpenAi_routes/makequestion', {
                    jobData: jobData,
                    prompt: prompt,
                })
                if (response.status === 200) {
                    const { question } = response.data
                    const formattedQuestion = question
                        .split(" ")
                        .reduce((acc, word, index) => {
                            return acc + (index > 0 && index % 8 === 0 ? "\n" : " ") + word
                        }, "")

                    setQuestion(formattedQuestion)
                } else {
                    console.error('Failed to get question: ', response.statusText)
                }

            } catch (error) {
                console.error('Error submitting data:', error)
            }
        }
        getquestion()
    }, [])

    const answers_submitted = async () => {
        setFeedback('Loading...')
        const questionanswercleaned = questionanswer.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n').split('\n').map(line => line.trim()).join('\n')
        setQuestionanswer(questionanswercleaned)

        try {
            let prompt = `This was the question: "${question}". This was the answer: "${questionanswer}". This was the jobtitle: "${jobData[0]}".
            This is an interview simulator, so critique the answer accordingly. Focus on the following:
            1. Assess how well the answer demonstrates technical skills and problem-solving abilities.
            2. Point out if the candidate clearly understands the technical problem and provides a specific example.
            3. Criticize any vague or generic details in the answer. The candidate should demonstrate depth and provide clear examples of their technical actions.
            4. Evaluate if the result of the technical solution was clearly stated and how it relates to the role being applied for.
            5. Provide constructive feedback on how the candidate could improve the answer or clarify the example.
            Provide 2-4 lines of feedback and give a rating to one decimal point out of 5. Respond strictly in this JSON format (no additional information or text). Don't even label it as json:
            {"feedback": "Your feedback here", "rating": "Your rating here (example: 3.5/5)"}`

            const response = await axios.post('http://localhost:4800/OpenAi_routes/recieveQfeedback', {
                question: question,
                questionanswer: questionanswer,
                jobData: jobData,
                prompt: prompt,
            })
            if (response.status === 200) {
                const { feedback, rating } = response.data
                setFeedback(feedback)
                setRatingnumber(rating)
                overallRatingtoMain(Number(rating.slice(0, 3)))
                setApirecieved(1)

            } else {
                console.error('Failed to get feedback: ', response.statusText)
            }

        } catch (error) {
            console.error('Error submitting data:', error)
            setFeedback('Error submitting data. Try again in a seconds')
        }
    }

    const handleChange = (event) => {
        const value = event.target.value
        setQuestionanswer(value)
    }

    return (
        <div>
            <div className='wordquestions-form'>
                <h2>Technical Question</h2>
                <h3>
                    Question:
                    {question.split("\n").map((line, idx) => (
                        <div key={idx}>{line}</div>
                    ))}
                </h3>
                <form>
                    <textarea type='text'
                        name="technicalanswer"
                        maxLength='2500'
                        placeholder="Please Answer the question on the left. You are only allowed 2500 characters."
                        required onChange={handleChange} />
                </form>
            </div>

            <div className='submitbtn'>
                <button className='btn' onClick={answers_submitted}>Submit</button>
            </div>
            <div>
                <Results pressedNext={pressedNext} rating={ratingnumber} feedback={feedback} cangonext={apirecieved} />
            </div>
        </div>
    )
}

export default Techincalwordquestion