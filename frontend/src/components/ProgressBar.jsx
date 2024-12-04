import React from 'react'

function ProgressBar({totalSteps, currentStep}) {
    const progress = ((currentStep) / (totalSteps)) * 100
    
  return (
    <div className='progress active' 
    style={{
        height: "0.25rem",
        background: "var(--color-white)",
        width: "100%",
        transition: "all 0.6s ease-in",
    }}
    >
        <div
        style={{
        height: "0.25rem",
        background: "#2b2924",
        width: `${progress}%`,
        transition: "all 0.6s ease-in",
        }}
        ></div>
    </div>
  )
}

export default ProgressBar
