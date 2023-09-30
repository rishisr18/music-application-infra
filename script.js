console.log("welcome to sotify");

//initialising the variables
let songIndex=0;
let audiElement=new Audio('song/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressbar=document.getElementById('myProgressbar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItems'));
let song=[
    {songName:"Fark Hai",filePath:"song/1.mp3",coverPath:"musiclogo/1.jpg"},
    {songName:"Haareya",filePath:"song/2.mp3",coverPath:"musiclogo/2.jpg"},
    {songName:"Mitti di khushboo",filePath:"song/3.mp3",coverPath:"musiclogo/3.jpg"},
    {songName:"Smak That",filePath:"song/4.mp3",coverPath:"musiclogo/4.jpg"},
    {songName:"Uff Teri Adda",filePath:"song/5.mp3",coverPath:"musiclogo/5.jpg"},
    {songName:"Wild Heart",filePath:"song/6.mp3",coverPath:"musiclogo/6.jpg"},

]

songItems.forEach((element,i) => {
 console.log(element,i);
 element.getElementsByTagName("img")[0].src = song[i].coverPath;
 element.getElementsByClassName("songName")[0].innerText = song[i].songName;  
})
//audiElement.play();

//handel play/pause click
masterPlay.addEventListener('click',()=>{
    if(audiElement.paused || audiElement.currentTime<=0){
        audiElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;

    }
    else{
        audiElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }

})

//listen to event
audiElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seek bar
    progress = parseInt((audiElement.currentTime/audiElement.duration)*100);
    console.log(progress);
    myProgressbar.value=progress;
})
myProgressbar.addEventListener('change',()=>{
    audiElement.currentTime=myProgressbar.value*audiElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audiElement.src=`song/${songIndex +1}.mp3`;
        masterSongName.innerText=song[songIndex].songName;
        audiElement.currentTime= 0;
        audiElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audiElement.src=`song/${songIndex +1}.mp3`;
    masterSongName.innerText=song[songIndex].songName;
    audiElement.currentTime= 0;
    audiElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=5;
    }
    else{
        songIndex-=1;
    }
    audiElement.src=`song/${songIndex +1}.mp3`;
    masterSongName.innerText=song[songIndex].songName;
    audiElement.currentTime= 0;
    audiElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})