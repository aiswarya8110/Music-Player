import {useEffect, useRef, useState} from 'react';
import './App.css';
import Player from './Player';
import songsData from './songsData';

let currentSongIndex=0;

function App() {
   const [songs]= useState(songsData);
   let  [currentIndex, setCurrentIndex] =useState(0);
   const [progressWidth, setProgressWidth] =useState(0);
   const [isPlaying, setIsPlaying]= useState(false);
   
   const audioEl= useRef(null);

   function storeCurrentIndex(){
     localStorage.setItem("currentSongIndex",JSON.stringify(currentSongIndex));
   }

   useEffect(function(){
        if(localStorage.getItem("currentSongIndex")){
          setCurrentIndex(JSON.parse(localStorage.getItem("currentSongIndex")));
        }
        else{
          storeCurrentIndex();
        }
   },[])

   function setNextSong(){
     let newCurrentIndex= currentIndex;
     newCurrentIndex+=1;
     if(newCurrentIndex>songs.length-1){
       newCurrentIndex=0;
     }
     currentSongIndex=newCurrentIndex;
     storeCurrentIndex();
     setCurrentIndex(newCurrentIndex);
     audioEl.current.addEventListener('loadedmetadata',function(){
      audioEl.current.play();  
     })
     
     setProgressWidth(0);
     setIsPlaying(true);
   }
   
   function setPrevSong(){
     let newCurrentIndex=currentIndex;
     newCurrentIndex--;
     if(newCurrentIndex<0){
       newCurrentIndex=songs.length-1;
     }
     currentSongIndex=newCurrentIndex;
     storeCurrentIndex();
     setCurrentIndex(newCurrentIndex);
     audioEl.current.addEventListener('loadedmetadata',function(){
      audioEl.current.play();  
     })
     setProgressWidth(0);
     setIsPlaying(true);
   }


  return (
    <div className="App">
          <audio ref={audioEl} src={songs[currentIndex].music_src}></audio>
          <Player progressWidth={progressWidth} setProgressWidth={setProgressWidth} 
          song={songs[currentIndex]} setNextSong={setNextSong}
          setPrevSong={setPrevSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}
          audioEl={audioEl}
          ></Player>
    </div>
  );
}

export default App;