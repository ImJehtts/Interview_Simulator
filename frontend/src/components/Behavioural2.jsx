import React, { useState, useEffect } from 'react'
import Results from './Results'
import axios from 'axios';

const Behavioural2 = ({pressedNext, jobData, overallRatingtoMain}) => {
    const [question, setQuestion] = useState('')
    const [questionanswer, setQuestionanswer] = useState('')
    const [ratingnumber, setRatingnumber] = useState('0.0/5')
    const [feedback, setFeedback] = useState('')
    const [apirecieved, setApirecieved] = useState(0)

    useEffect(() => {
        const getquestion = async () =>{
            try {
                let prompt = `Act as an interview simulator for a behavioral round. Based on the following details: Role Name:${jobData[0]} Company Name:${jobData[1]} Role Description:${jobData[2]} 
                Generate a behavioral interview question that follows the STAR (Situation, Task, Action, Result) model. The goal is to assess the candidate's past experiences in a structured way. 
                Examples include: Tell me about a time when you faced a challenging situation at work and how you handled it, Describe a situation where you had to work under pressure and the steps you took to succeed.
                Think of 3 potential questions and return only one that fits best for the role. The question should encourage the candidate to share a specific experience, focusing on their problem-solving and decision-making abilities. 
                Respond in this strict JSON format (no additional information or text). Don't even label it as JSON:
                {"question": "Your thoughtfully crafted STAR behavioral question here"}` 
                const response = await axios.post('http://localhost:4800/OpenAi_routes/behaviouralquestion', {
                    jobData: jobData,
                    prompt: prompt,
                });
                if (response.status === 200){
                    const {question} = response.data; 
                const formattedQuestion = question
                .split(" ")
                .reduce((acc, word, index) => {
                    return acc + (index > 0 && index % 8 === 0 ? "\n" : " ") + word;
                }, "")

                    setQuestion(formattedQuestion);
                }else {
                    console.error('Failed to get question: ', response.statusText);
                }
                
              } catch (error) {
                console.error('Error submitting job data:', error);
              }
        }
        getquestion()
      }, [])


    const answers_submitted = async () =>{
        const questionanswercleaned = questionanswer.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n').split('\n').map(line => line.trim()).join('\n');
        setQuestionanswer(questionanswercleaned)

        try {

            let prompt = `This was the question: "${question}". This was the answer: "${questionanswer}". This was the jobtitle: "${jobData[0]}".
            This is an interview simulator, so critique the answer accordingly. Focus on the following:
            1. Assess how well the answer follows the STAR (Situation, Task, Action, Result) model. All stages of the STAR model should be present and missing components should heavily loss marks. 
            2. Point out if the candidate clearly explains the situation and provides a specific example.
            3. Criticize any vague or generic details in the answer. The candidate should demonstrate depth and provide clear examples of their actions.
            4. Evaluate if the result of the situation was clearly stated and how it relates to the role being applied for.
            5. Provide constructive feedback on how the candidate could improve the answer or clarify the example.
            Provide 2-4 lines of feedback and give a rating to one decimal point out of 5. Respond strictly in this JSON format (no additional information or text). Don't even label it as json:
            {"feedback": "Your feedback here", "rating": "Your rating here (example: 3.5/5)"}`
            
            const response = await axios.post('http://localhost:4800/OpenAi_routes/behaveQfeedback', {
                question:question,
                questionanswer:questionanswer,
                jobData: jobData,
                prompt: prompt,
            });
            if (response.status === 200){
                const {feedback, rating} = response.data; 
                setFeedback(feedback)
                setRatingnumber(rating)
                overallRatingtoMain(Number(rating.slice(0,3)))
                setApirecieved(1)

            }else {
                console.error('Failed to get question: ', response.statusText);
            }
            
          } catch (error) {
            console.error('Error submitting job data:', error);
          }
    }
    

    const handleChange = (event) => {
        const value = event.target.value
        setQuestionanswer(value)
    }


    return (
        <div>
            <div className='behavioural-form'>
                <h2>Behavioural #2</h2>
                <h3>
                Question: 
                {question.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                ))}
                </h3>
                <form> 
                <textarea type='text'
                name="behaviouralanswer"
                maxLength='2500'
                placeholder="Please Answer the question on the left. You are only allowed 2500 characters (Follow the STAR model)" 
                required onChange={handleChange}/>
            </form>
            </div>

        {/*         */}
        
        <div className='submitbtn'>
            <button className='btn' onClick={answers_submitted}>Submit</button>
        </div>
        <div>
            <Results pressedNext={pressedNext} rating={ratingnumber} feedback={feedback} cangonext={apirecieved}/>
        </div>
     </div>
    )
}

export default Behavioural2
