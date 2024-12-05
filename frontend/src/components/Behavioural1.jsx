import React, { useState, useEffect } from 'react'
import Results from './Results'
import axios from 'axios';

const Behavioural1 = ({pressedNext, totalSteps, currentStep, jobData}) => {
    const [question, setQuestion] = useState('')
    const [Questionanswer, setQuestionanswer] = useState('')
    const [ratingnumber, setRatingnumber] = useState(0)
    const [feedback, setFeedback] = useState('')

    useEffect(() => {
        const getquestion = async () =>{
            try {
                const response = await axios.patch('http://localhost:4800/OpenAi_routes/behavioural1question', {
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

    }
    

    const handleChange = (event) => {
        const value = event.target
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
            <Results pressedNext={pressedNext} totalSteps={totalSteps} currentStep={currentStep}/>
        </div>
     </div>
    )
}

export default Behavioural1
