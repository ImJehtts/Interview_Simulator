import React from 'react'

function Rounds(){
    return <div className='container'>
        <div className='progress_container'>
            <div className='progress'></div>
            <div className="circle">About Job</div>
            <div className="circle">Behavioural #1</div>
            <div className="circle">Behavioural #2</div>
            <div className="circle">Skills</div>
            <div className="circle">Techincal Code</div>
            <div className="circle">Techincal Question</div>
            <div className="circle">Results</div>
        </div>
        <div className="content">
            <h2>Job Description</h2>
        </div>
        <div className='bts'>
            <button className='btn'>Submit</button>
        </div>
    </div>

}

function MainPages() {
  return (
  <Rounds/>
)
}

export default MainPages
