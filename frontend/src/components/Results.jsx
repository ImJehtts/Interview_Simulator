import React from 'react'

const Results = ({pressedNext, rating, feedback, cangonext}) => {
  const onClickfunction = cangonext === 0 ? null : pressedNext

  return (
    <div className='results'>
        <div className='results_5'>
            <h3>Results: {rating}</h3>
        </div>
        <div className='results_reedback'>
            <h4>Feedback: {feedback}</h4>
        </div>
        <div> 
        <button className={`${cangonext === 0 ? "disabled":"btn"}`} onClick={onClickfunction}>Next</button>
        </div>
    </div>
  )
}

export default Results
