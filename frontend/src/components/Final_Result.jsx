import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FinalResult = ({ overallRating }) => {
    let value = 0
    value = (overallRating/20) * 100

  return (
    <div className="progress-bar-wrapper">
      <div className="custom-progress-bar">
        <CircularProgressbar
          value={value.toFixed(1)}
          text={`${(overallRating/4).toFixed(1)}/5`}
          circleRatio={0.7}
          strokeWidth={5}
          styles={{
            text: {
              fill: 'var(--color-bg)',
              fontSize: '1.25rem', 
              fontWeight: 'bold' 
            },
          }}
        />
      </div>
    </div>
  );
};

export default FinalResult;