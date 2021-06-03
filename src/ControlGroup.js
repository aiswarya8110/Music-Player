import './ControlGroup.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';

function ControlGroup(props){
    return(<div className='controls-group'>
        <button onClick={props.setPrevSong}> <i className="fas fa-backward"></i></button>
        <button onClick={props.toggleSong}><i className="fas fa-play fa-2x"></i></button>
        <button onClick={props.setNextSong}><i className="fas fa-forward"></i></button>
    </div>)
}

export default ControlGroup;