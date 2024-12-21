import React, { useState} from 'react'
import Results from './Results'

const Skills_Select = ({pressedNext, skillstoMain, languagetoMain}) => {
    const topics = ['Arrays/Hashing', 'Two pointers', 'Stack','Binary Search', 'Sliding Window', 'Linked list','Trees', 'Tries', 'Backtracking', 
        'Heap/Priority Queue', 'Graphs','1-D DP', 'Intervals', 'Greedy', 'Advanced Graphs', '2-D DP','Bit Manipultation', 'Math & Geometry']
    const languages = ['Python 3','Java','C++','C','C#','JavaScript','Swift', 'Rust', 'Ruby']

    const [selectedTopics, setSelectedTopics] = useState([])
    const [ratingnumber, setRatingnumber] = useState('0.0/5')
    const [feedback, setFeedback] = useState('')
    const [selectedLanguage, setSelectedlanguage] = useState('')
    const [readyfornext, setReadyfornext] = useState(0)

    const topicsheckboxHandle = (event) => {
        const { checked, value } = event.target

        if (value === 'checkAll') {
            setSelectedTopics(checked ? [...topics] : [])
        } else {
            if (checked) {
                setSelectedTopics((prev) => [...prev, value])
            } else {
                setSelectedTopics((prev) => prev.filter((topic) => topic !== value))
            }
        }
    }

    const isAllChecked = topics.length > 0 && selectedTopics.length === topics.length

    const languageheckboxHandle = (e) => {
        setSelectedlanguage(e.target.value)
    }

    const handleSubmit = () => {
        skillstoMain(selectedTopics)
        languagetoMain(selectedLanguage)
        if (selectedTopics.length === 0 || selectedLanguage === ''){
            setFeedback('Please select at least one topic and one language')
            return
        }else{
            setReadyfornext(1)
            setFeedback('Proceed to the next step')
        }
    }


    return (
        <div className='selections'>
            <div selections>
                <div className='skills-selection'>
                    <div className='topics-side'>
                        <h3>Select Topics</h3>
                        <div className='topics-container'>
                            <div className='topicscheckbox-item'>
                                <label>
                                    <input
                                        type='checkbox'
                                        value='checkAll'
                                        onChange={topicsheckboxHandle}
                                        checked={isAllChecked}
                                    />
                                    Check All
                                </label>
                            </div>
                            {topics.map((topic, index) => (
                                <div key={index} className={`topicscheckbox-item group-${Math.floor(index / 3)}`}>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value={topic}
                                            onChange={topicsheckboxHandle}
                                            checked={selectedTopics.includes(topic)}
                                        />
                                        {topic}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>

            <div className='language-selection'>
                <div className='language-side'>
                    <h3>Select Language</h3>
                    <div className='language-container'>
                        {languages.map((lang, index) => (
                            <div key={index} className='languagecheckbox-item'>
                                <label>
                                    <input
                                        type='radio'
                                        name='language'  
                                        value={lang}
                                        onChange={languageheckboxHandle}
                                        checked={selectedLanguage === lang} 
                                    />
                                    {lang}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className='submitbtn'>
            <button className='btn' onClick={handleSubmit}>Submit</button>
        </div>

        <div>
            <Results pressedNext={pressedNext} rating={ratingnumber} feedback={feedback} cangonext={readyfornext}/>
        </div>
    </div>
    )
}

export default Skills_Select