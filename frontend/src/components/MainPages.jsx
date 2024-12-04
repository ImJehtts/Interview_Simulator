import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import Job_Description from './Job_Form'
import Behavioural1 from './Behavioural1'



function MainPages(){
    const [currentStep, setcurrentStep] = useState(0)
    const [jobdata, setjobData] = useState('')
    const totalSteps = 6

    function pressedNext() {
        if (currentStep < 7) setcurrentStep((currentStep) => currentStep + 1)
    }

    const jobDatatoMain = (jobdata) => {
        setjobData(jobdata)
        console.log("This is jobdata post summary:", jobdata)
    }

    const renderSteps = () =>{
        switch (currentStep){
            case 0: return <Job_Description pressedNext={pressedNext} totalSteps={totalSteps} currentStep={currentStep} jobDatatoMain={jobDatatoMain}/>;
            case 1: return <Behavioural1 pressedNext={pressedNext} totalSteps={totalSteps} currentStep={currentStep} jobData={jobdata}/>;
            case 2: return <Job_Description pressedNext={pressedNext} totalSteps={totalSteps} currentStep={currentStep}/>;
            case 3: return <Job_Description pressedNext={pressedNext} totalSteps={totalSteps} currentStep={currentStep}/>;
            case 4: return <Job_Description pressedNext={pressedNext} totalSteps={totalSteps} currentStep={currentStep}/>;
            case 5: return <Job_Description pressedNext={pressedNext} totalSteps={totalSteps} currentStep={currentStep}/>;
            case 6: return <Job_Description pressedNext={pressedNext} totalSteps={totalSteps} currentStep={currentStep}/>;
            default: return null;
    }
}

    return <div className='container'>
        <div className='progress_container'>
            <ProgressBar totalSteps={totalSteps} currentStep={currentStep} className='progress'/>
            <div className={`${currentStep >= 0 ? "circle active":"circle"}`}>About Job</div>
            <div className={`${currentStep >= 1? "circle active":"circle"}`}>Behavioural #1</div>
            <div className={`${currentStep >= 2 ? "circle active":"circle"}`}>Behavioural #2</div>
            <div className={`${currentStep >= 3 ? "circle active":"circle"}`}>Skills</div>
            <div className={`${currentStep >= 4 ? "circle active":"circle"}`}>Techincal Code</div>
            <div className={`${currentStep >= 5 ? "circle active":"circle"}`}>Techincal Question</div>
            <div className={`${currentStep >= 6 ? "circle active":"circle"}`}>Results</div>
        </div>
        <div className="content">
            {renderSteps()}
        </div>
    </div>

}

export default MainPages
