import React, { useState } from 'react'
import Results from './Results'
import axios from 'axios';



function Job_Description({pressedNext, jobDatatoMain}){
    const [jobTitle, setJobTitle] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobRequirements, setJobRequirements] = useState('')
    const [apirecieved, setApirecieved] = useState(0)
    const [feedback, setFeedback] = useState('(Please type out all responses. Do not use autofill)')
    const backendUrl = import.meta.env.VITE_BACK_END_PORT

    const answers_submitted = async () =>{
        setFeedback('Loading...')
        const data = [jobTitle, companyName, jobDescription, jobRequirements]

        const finalText2 = jobDescription.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n').split('\n').map(line => line.trim()).join('\n');
        data[2] = finalText2

        const finalText3 = jobRequirements.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n').split('\n').map(line => line.trim()).join('\n');
        data[3] = finalText3

        try {
            const response = await axios.post(`${backendUrl}/OpenAi_routes/trimjobinfo`, {
                jobData: data,
            });

            const {jobDret, jobRret} = response.data; 
            data[2] = jobDret
            data[3] = jobRret
            jobDatatoMain(data)
            setApirecieved(1)
            setFeedback('This is where you will see feedback when you complete a question')
        
          } catch (error) {
            console.error('Error submitting job data:', error);
            setFeedback('Error submitting data. Try again in a seconds')
          }
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
                placeholder="What is the Job Description (eg. The 'What we do' and/or 'What you will do' sections). You are only allowed 2000 characters" 
                className="description_section" 
                required onChange={handleChange}/>
                <textarea type='text'
                name="jobRequirements"
                maxLength='2000'
                placeholder="What are the Job Requirments (eg. Skills/Requirments section (Python, Bachelors, ...)).. You are only allowed 2000 characters " 
                className="requirments_section" 
                required onChange={handleChange}/>
            </form>
        </div>
        {/*         */}
        
        <div className='submitbtn'>
            <button className='btn' onClick={answers_submitted}>Submit</button>
        </div>

        <div>
            <Results pressedNext={pressedNext}   
            rating={"You will get a rating out of /5 for your response"} feedback={feedback}
            cangonext={apirecieved}/>
        </div>
    </div>
    )
}

export default Job_Description