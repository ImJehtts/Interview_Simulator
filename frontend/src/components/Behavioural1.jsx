import React, { useState, useEffect } from 'react'
import Results from './Results'
import axios from 'axios';

const Behavioural1 = ({pressedNext, jobData}) => {
    const [question, setQuestion] = useState('')
    const [questionanswer, setQuestionanswer] = useState('')
    const [ratingnumber, setRatingnumber] = useState('0.0/5')
    const [feedback, setFeedback] = useState('')

    useEffect(() => {
        const getquestion = async () =>{
            try {
                const response = await axios.post('http://localhost:4800/OpenAi_routes/behavioural1question', {
                    jobData: jobData,
                });
                if (response.status === 200){
                    const {question} = response.data; 
                    setQuestion(question);
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
            console.log('Question:', question);
            console.log('Question Answer:', questionanswer);
            console.log('Job Data:', jobData);
            
            const response = await axios.post('http://localhost:4800/OpenAi_routes/behaveQ1feedback', {
                question:question,
                questionanswer:questionanswer,
                jobData: jobData,
            });
            if (response.status === 200){
                const {feedback, rating} = response.data; 
                setFeedback(feedback)
                setRatingnumber(rating)
                console.log(feedback)

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
                <h2>Behavioural #1</h2>
                <h3>Question: {question}</h3>
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
            <Results pressedNext={pressedNext} rating={ratingnumber} feedback={feedback}/>
        </div>
     </div>
    )
}

export default Behavioural1
