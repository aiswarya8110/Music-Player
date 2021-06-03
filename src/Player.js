import {useState ,useEffect } from 'react';
import './Player.css';
import songData from './songData';
import Progress from './Progress';
import TimeRange from './TimeRange';
import ControlGroup from './ControlGroup';

const audio = new Audio();
let audioIndex=0;

function Player(){

  const[ timeElapsed, setCurrentTime] =useState('0:00');
  const[duration, setDuration] =useState('2:02');
  const[ progressWidth, setProgressWidth] = useState(0);
  const [image, setImage]= useState('');

  function getSongsData(){
    console.log('rendered');
    if(localStorage.getItem('audioIndex')){
       audioIndex= JSON.parse(localStorage.getItem('audioIndex'));
    }
    else{
      localStorage.setItem('audioIndex',JSON.stringify(audioIndex));
    }
    setSong();
  }

  useEffect(getSongsData,[]);

  function setProgress(e){
    const {offsetX, target}  = e.nativeEvent;
    console.log((offsetX/target.offsetWidth)*100);
    console.log("previous",progressWidth);
    setProgressWidth((offsetX/target.offsetWidth)*100);
    console.log("updated",progressWidth);
    audio.currentTime=(offsetX/target.offsetWidth)*audio.duration;
  }

  function setAudioTime(){
    const minutes= Math.floor(audio.currentTime/60);
    let seconds= Math.floor(audio.currentTime%60);
    if(seconds<10){
      seconds=`0${seconds}`;
    }
    setCurrentTime(`${minutes}:${seconds}`);

    const durationMinutes= Math.floor(audio.duration/60);
    let durationSeconds=Math.floor(audio.duration%60);
    if(durationSeconds<10){
      durationSeconds=`0${durationSeconds}`;
    }
    setDuration(`${durationMinutes}:${durationSeconds}`);
  }

  console.log('hello');

  function updateProgress(){
      if(audio.duration){
      setProgressWidth((audio.currentTime/audio.duration)*100);
      console.log(progressWidth);
      setAudioTime();
      }
  }

  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', setNextSong);
  function toggleSong(e){
    console.log(e.nativeEvent);
     if(audio.paused){
       audio.play();
     }
     else{
       audio.pause();
     }
  }

  function setSong(){
      audio.src=songData[audioIndex][`music${audioIndex}`];
      setImage(songData[audioIndex][`img${audioIndex}`]);
  }

  function updateAudioIndex(){
     localStorage.setItem('audioIndex',JSON.stringify(audioIndex));
     setSong();
     audio.play();
  }

  function setNextSong(){
     audioIndex++;
     if(audioIndex>songData.length-1){
       audioIndex=0;
     }
     updateAudioIndex();
  }

  function setPrevSong(){
    audioIndex--;
    if(audioIndex<0){
      audioIndex=songData.length-1;
    }
    updateAudioIndex();
  }

    return(
        <div className='player-container'>
          <img className='cover' alt='music-image' src={image}></img>
          <h2>Song title</h2>
          <h3>Song artist</h3>
          <Progress progressWidth={progressWidth} setProgress={setProgress}/>
          <TimeRange timeElapsed={timeElapsed} duration={duration}/>
          <ControlGroup toggleSong={toggleSong} setNextSong={setNextSong} 
          setPrevSong={setPrevSong}/>
        </div>
    )
}

export default Player;