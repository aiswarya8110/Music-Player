import './ControlGroup.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay , faPause, faForward, faBackward} from '@fortawesome/free-solid-svg-icons';


function ControlGroup(props){
    return(<div className='controls-group'>
        <button onClick={props.setPrevSong}> <FontAwesomeIcon icon={faBackward}></FontAwesomeIcon></button>
        <button onClick={props.playSong}><FontAwesomeIcon className="fa-3x" icon={props.isPlaying ? faPause : faPlay}>
            </FontAwesomeIcon></button>
        <button onClick={props.setNextSong}><FontAwesomeIcon icon={faForward}></FontAwesomeIcon></button>
    </div>)
}

export default ControlGroup;