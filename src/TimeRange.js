import './TimeRange.css';

function TimeRange(props){
    return(<div className='timeRange-container'>
         <span className='time-elapsed'>{props.timeElapsed}</span>
         <span className='duration'>{props.duration}</span>
    </div>)
}

export default TimeRange;