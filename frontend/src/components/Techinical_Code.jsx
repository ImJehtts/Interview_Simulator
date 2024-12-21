import React, { useState, useEffect } from 'react'
import Results from './Results'
import axios from 'axios'

const Techincal_Code = ({pressedNext, jobData, overallRatingtoMain, skills, language}) => {
    const [question, setQuestion] = useState('')
    const [TestCase1Input, setTestCase1Input] = useState('')
    const [TestCase1Output, setTestCase1Output] = useState('')
    const [TestCase2Input, setTestCase2Input] = useState('')
    const [TestCase2Output, setTestCase2Output] = useState('')
    const [questionanswer, setQuestionanswer] = useState('')
    const [ratingnumber, setRatingnumber] = useState('0.0/5')
    const [feedback, setFeedback] = useState('')
    const [apirecieved, setApirecieved] = useState(0)

    useEffect(() => {
        const getquestion = async () =>{
            try {
                let prompt = `Act as an interview simulator for an techinical coding round. Based on the following details: Role Name:${jobData[0]} Company Name:${jobData[1]} Role Description:${jobData[2]} 
                    These leetcode topics they are comfortable with: ${skills} and this language: ${language}
                    We want it to be a leetcode-style question and we want it to be based on difficulty for the position. 
                    Intern/Junior/new grad positions should only be leetcode easy or medium. Senior positions could be medium or hard etc..
                    STICK TO THE SKILLS/TOPICS PASSED IN. Keep it to 250 characters for the question itself.
                    Respond in this strict JSON format (no additional information or text). Dont even label it as json:
                    {"question": "The leetcode-style question based on topics/skills and position",
                     "TestCase1Input": "The input for the first test case",
                     "TestCase1Output": "The expected output for the first test case",
                     "TestCase2Input": "The input for the second test case",
                     "TestCase2Output": "The expected output for the second test case"}`
                const response = await axios.post('http://localhost:4800/OpenAi_routes/techcodequestion', {
                    jobData: jobData,
                    prompt: prompt,
                    skills: skills,
                    language: language
                })
                if (response.status === 200){
                    const { question, TestCase1Input, TestCase1Output, TestCase2Input, TestCase2Output } = response.data
                    setQuestion(question)
                    setTestCase1Input(TestCase1Input)
                    setTestCase1Output(TestCase1Output)
                    setTestCase2Input(TestCase2Input)
                    setTestCase2Output(TestCase2Output)

                }else {
                    console.error('Failed to get question: ', response.statusText)
                }
                
              } catch (error) {
                console.error('Error submitting data:', error)
              }
        }
        getquestion()
      }, [])


    const answers_submit = async () =>{
        console.log('Button clicked')
        const questionanswercleaned = questionanswer.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n').split('\n').map(line => line.trim()).join('\n')

        setQuestionanswer(questionanswercleaned)

        try {
            let prompt = `This was the question: "${question}". This was the answer: "${questionanswer}". This was the language: "${language}".
            This is an interview simulator designed to provide feedback on answers to Leetcode-style technical questions. Evaluate the response based on the following criteria:
            1. Completeness: Is the answer fully solving the problem as outlined in the question and test cases?
            2. Clarity & Depth: Does the answer provide a logical approach, including any assumptions or edge cases?
            3. Efficiency: Evaluate whether the solution is optimal for the problem's constraints (e.g., time and space complexity).
            4. Conciseness: Is the answer too long, redundant, or overly detailed without adding value?
            Provide 2-4 lines of feedback and give a rating to one decimal point out of 5. Respond strictly in this JSON format (no additional information or text). Dont even label it as json:
            {"feedback": "Your feedback here", "rating": "Your rating here (example: 3.5/5)"}`
            
            const response = await axios.post('http://localhost:4800/OpenAi_routes/techcodequestionfeedback', {
                prompt: prompt,
            })
            if (response.status === 200){
                const {feedback, rating} = response.data 
                setFeedback(feedback)
                setRatingnumber(rating)
                overallRatingtoMain(Number(rating.slice(0,3)))
                setApirecieved(1)

            }else {
                console.error('Failed to feedback: ', response.statusText)
            }
            
          } catch (error) {
            console.error('Error submitting data:', error)
          }
    }
    

    const handleChange = (event) => {
        const value = event.target.value
        setQuestionanswer(value)
    }


    return (
        <div>
            <div className='codequestion-form'>
                <h2>Code Question</h2>
                <h3>
                Question:  
                {question}
                </h3>
                <div className="testcases">
                    <div>
                        <h4>Test Case 1:</h4>
                        <div>Input: {TestCase1Input}</div>
                        <div>Expected Output: {TestCase1Output}</div>
                    </div>
                    <div>
                        <h4>Test Case 2:</h4>
                        <div>Input: {TestCase2Input}</div>
                        <div>Expected Output: {TestCase2Output}</div>
                    </div>
                </div>
                <form> 
                <textarea type='text'
                name="codequestionsanswer"
                maxLength='3000'
                placeholder="Please Answer the question on the left" 
                required onChange={handleChange}/>
            </form>
            </div>

        {/*         */}
        <div className='submitbtn'>
            <button className='btn' onClick={answers_submit}>Submit</button>
        </div>
        <div>
            <Results pressedNext={pressedNext} rating={ratingnumber} feedback={feedback} cangonext={apirecieved}/>
        </div>
     </div>
    )
}

export default Techincal_Code
