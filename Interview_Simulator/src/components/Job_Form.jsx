import React, { useState } from 'react'


function Job_Description({pressedNext, totalSteps, currentStep}){
    const [jobTitle, setJobTitle] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobRequirements, setJobRequirements] = useState('')
    
    return (
        <div>
        <div className="form-container">
            <h2>About Job</h2>
            <form> 
                <input 
                type="text" 
                placeholder="What is the Job Title (eg. Software Engineering Intern)"
                />
                <input type="text" placeholder="What is the Company Name (eg. Mohib's Software Inc.)"></input>
                <input type="text" placeholder="What is the Job Description (eg. The 'What we do' and/or 'What you will do' sections)" className="description_section"></input>
                <input type="text" placeholder="What are the Job Requirments (eg. Skills/Requirments section (Python, Bachelors, ...))" className="requirments_section"></input>
            </form>
        </div>
        {/*         */}
        
        <div className='submitbtn'>
            <button className='btn'>Submit</button>
        </div>

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
    </div>
    )
}

export default Job_Description