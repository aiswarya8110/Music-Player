import './Progress.css';

function Progress(props){
    return (
        <div className='progress-bar' onClick={props.setProgress}>
            <div className='progress' style={{width:`${props.progressWidth}%`}}></div>
        </div>
    )
}

export default Progress;