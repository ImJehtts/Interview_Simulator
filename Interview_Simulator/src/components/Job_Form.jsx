import React, { useState } from 'react'


function Job_Description({pressedNext, totalSteps, currentStep}){
    const [jobTitle, setJobTitle] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobRequirements, setJobRequirements] = useState('')

    const answers_submitted = async () =>{
        console.log(jobTitle, companyName)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === "jobTitle") {
            setJobTitle(value);
        } else if (name === "companyName") {
            setCompanyName(value);
        } else if (name === "jobDescription") {
            setJobDescription(value);
        } else if (name === "jobRequirments") {
            setJobRequirements(value);
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
                <input type="text" 
                name="jobDescription"
                placeholder="What is the Job Description (eg. The 'What we do' and/or 'What you will do' sections)" 
                className="description_section" 
                required onChange={handleChange}/>
                <input type="text" 
                name="jobRequirments"
                placeholder="What are the Job Requirments (eg. Skills/Requirments section (Python, Bachelors, ...))" 
                className="requirments_section" 
                required onChange={handleChange}/>
            </form>
        </div>
        {/*         */}
        
        <div className='submitbtn'>
            <button className='btn' onClick={answers_submitted}>Submit</button>
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