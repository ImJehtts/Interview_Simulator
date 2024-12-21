import React, { useState, useEffect } from 'react'
import Results from './Results'
import axios from 'axios';

const Behavioural1 = ({pressedNext, jobData, overallRatingtoMain}) => {
    const [question, setQuestion] = useState('')
    const [questionanswer, setQuestionanswer] = useState('')
    const [ratingnumber, setRatingnumber] = useState('0.0/5')
    const [feedback, setFeedback] = useState('')
    const [apirecieved, setApirecieved] = useState(0)

    useEffect(() => {
        const getquestion = async () =>{
            try {
                let prompt = `Act as an interview simulator for an icebreaker round. Based on the following details: Role Name:${jobData[0]} Company Name:${jobData[1]} Role Description:${jobData[2]} 
                    Generate a behavioral interview question that is light, engaging, and non-technical. The goal is to help the interviewer get to know the candidate better
                    but it should still be a question that could appear in an interview/
                    Examples include: Why did you choose [Insert Company Name]?, Tell me about yourself.
                    What's something you're particularly proud of, either personally or professionally?
                    Think of 3 potential questions and return only one that fits best for the role. A get to know of why you would want to hire them and less like a STAR question. 
                    Respond in this strict JSON format (no additional information or text). Dont even label it as json:
                    {"question": "Your thoughtfully crafted icebreaker question here"}`
                const response = await axios.post('http://localhost:4800/OpenAi_routes/makequestion', {
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
        /*
        .replace(/\s+/g, ' '): This replaces all sequences of one or more whitespace characters (spaces, tabs, etc.) with a single space.
        .replace(/\n\s*\n/g, '\n'): This removes any extra blank lines. It replaces multiple newline characters (with or without spaces/tabs in between) with a single newline.
         .split('\n'): This splits the string into an array of lines based on the newline character (\n).
         .map(line => line.trim()): This trims leading and trailing whitespace from each line in the array. It removes any extra spaces at the beginning or end of each line.
         .join('\n'): This joins the array of lines back into a single string, with each line separated by a newline character (\n).
         */
        setQuestionanswer(questionanswercleaned)

        try {

            let prompt = `This was the question: "${question}". This was the answer: "${questionanswer}". This was the jobtitle: "${jobData[0]}".
            This is an interview simulator, so critique the answer accordingly. Focus on the following:
            1. Call out answers that are too short, vague, or overly general. 
            2. Point out answers that lack depth or clear examples.
            3. Criticize answers that are too long or overly detailed without adding value.
            4. Be critical of answers that seem too rehearsed or lack originality.
            5. Always provide constructive feedback. Be harsh when necessary, but don’t be dismissive.
            Provide 2-4 lines of feedback and give a rating to one decimal point out of 5. Respond strictly in this JSON format (no additional information or text). Dont even label it as json:
            {"feedback": "Your feedback here", "rating": "Your rating here (example: 3.5/5)"}`
            
            const response = await axios.post('http://localhost:4800/OpenAi_routes/recieveQfeedback', {
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
            <div className='wordquestions-form'>
                <h2>Behavioural #1</h2>
                <h3>
                Question: 
                {question.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                ))}
                </h3>
                <form> 
                <textarea type='text'
                name="behaviouralanswer"
                maxLength='2000'
                placeholder="Please Answer the question on the left. You are only allowed 2000 characters " 
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

export default Behavioural1
