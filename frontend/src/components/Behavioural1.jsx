import React, { useState } from 'react'
import Results from './Results'

const Behavioural1 = ({pressedNext, totalSteps, currentStep, jobData}) => {
    const [Questionanswer, setQuestionanswer] = useState('')

    const answers_submitted = async () =>{

    }

    async function getquestion(jobData) {
        
    }
    

    const handleChange = (event) => {
        const value = event.target
    }


    return (
        <div>
            <div className='behavioural-form'>
                <h2>Behavioural #1</h2>
                <h3>Question: </h3>
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
