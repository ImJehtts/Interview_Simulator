import React from 'react'

const Results = ({pressedNext, totalSteps, currentStep}) => {
  return (
    <div className='results'>
        <div className='results_5'>
            <h3>Results: You will get a rating out of /5 for your response</h3>
        </div>
        <div className='results_reedback'>
            <h4>Feedback: This is where you will see feedback when you complete a question</h4>
        </div>
        <div> 
        <button className={`${currentStep === totalSteps ? "disabled":"btn"}`} onClick={pressedNext}>Next</button>
        </div>
    </div>
  )
}

export default Results
