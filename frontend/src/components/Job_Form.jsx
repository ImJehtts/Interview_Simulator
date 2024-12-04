import React, { useState } from 'react'
import Results from './Results'


function Job_Description({pressedNext, totalSteps, currentStep, jobDatatoMain}){
    const [jobTitle, setJobTitle] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobRequirements, setJobRequirements] = useState('')

    const answers_submitted = async () =>{
        const data = [jobTitle, companyName, jobDescription, jobRequirements]
        jobDatatoMain(data)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
    
        if (name === "jobTitle") {
            setJobTitle(value)
        } else if (name === "companyName") {
            setCompanyName(value)
        } else if (name === "jobDescription") {
            setJobDescription(value)
        } else if (name === "jobRequirements") {
            setJobRequirements(value)
        }
    }


    return (
        <div>
        <div className="form-container">
            <h2>About Job</h2>
            <form> 
                <input 
                type="text" 
                name="jobTitle"
                placeholder="What is the Job Title (eg. Software Engineering Intern)"
                required onChange={handleChange}
                />
                <input type="text"
                name="companyName"
                placeholder="What is the Company Name (eg. Mohib's Software Inc.)" 
                required onChange={handleChange}
                />
                <textarea type='text'
                name="jobDescription"
                maxLength='2000'
                placeholder="What is the Job Description (eg. The 'What we do' and/or 'What you will do' sections). You are only allowed 700 characters" 
                className="description_section" 
                required onChange={handleChange}/>
                <textarea type='text'
                name="jobRequirements"
                maxLength='2000'
                placeholder="What are the Job Requirments (eg. Skills/Requirments section (Python, Bachelors, ...)).. You are only allowed 700 characters " 
                className="requirments_section" 
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

export default Job_Description