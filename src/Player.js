import {useState ,useEffect} from 'react';
import './Player.css';
import Progress from './Progress';
import TimeRange from './TimeRange';
import ControlGroup from './ControlGroup';


function Player(props){  
      
      const {progressWidth, setProgressWidth, isPlaying , setIsPlaying, audioEl}= props;
      const [timeElapsed, setTimeElapsed]= useState("0:00");
      const [duration, setDuration]= useState("0:00");
      
      function updateTimeElapsed(){
        const minutes=Math.floor(audioEl.current.currentTime/60);
        let seconds= Math.floor(audioEl.current.currentTime%60);
        if(seconds<10){
          seconds=`0${seconds}`;
      }
       
       setTimeElapsed(`${minutes}:${seconds}`);
       
       const durationMinutes=Math.floor(audioEl.current.duration/60);
       let durationSeconds= Math.floor(audioEl.current.duration%60);
       if(durationSeconds<10){
         durationSeconds=`0${durationSeconds}`;
       }
       if(audioEl.current.duration){
        setDuration(`${durationMinutes}:${durationSeconds}`);
       }
    }
      function updateProgress(){
        const{currentTime, duration}= audioEl.current;
        setProgressWidth((currentTime/duration)*100);
        updateTimeElapsed();
      }

      function attachEventListeners(){
         audioEl.current.addEventListener('timeupdate', updateProgress);
         audioEl.current.addEventListener('ended', function(){
            setProgressWidth(0);
            setTimeElapsed("0:00");
            audioEl.current.play();
         });
      }

      useEffect(attachEventListeners,[]);

      function setProgress(e){
        const {offsetX, target}= e.nativeEvent;
        setProgressWidth((offsetX/target.clientWidth)*100);
        audioEl.current.currentTime=(offsetX/target.clientWidth)*audioEl.current.duration;
      }

      
      function playSong(){
        if(isPlaying){
          audioEl.current.pause();
        }
        else{
         audioEl.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    return(
        <div className='player-container'>
         <div className="muic-player">
         <img className='cover' alt='cover' src={props.song.img_src}></img>
          <h2>{props.song.title}</h2>
          <h3>{props.song.artist}</h3>
          <Progress progressWidth={progressWidth} setProgress={setProgress}/>
          <TimeRange timeElapsed={timeElapsed} duration={duration}/>
          <ControlGroup setNextSong={props.setNextSong} setPrevSong={props.setPrevSong}
          playSong={playSong} isPlaying={isPlaying}/>
         </div>
        </div>
    )
}


export default Player