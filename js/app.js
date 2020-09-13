let fillbar = document.querySelector(".fill");
let currentTime = document.querySelector(".time");
const playBtn = document.querySelector(".play-pause");
const audio = document.querySelector("audio");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const progress = document.querySelector(".fill");

const songs = [
    {
        title : "Cradles",
        artist : "Sub Urban" 
    },
    {
        title : "Legends Never Die",
        artist : "Chrissy Constanza"
    },
    {
        title : "Warriors",
        artist : "Avril Lavigne"
    }
]

const songsList = [
    "../songs/Cradles.mp3",
    "../songs/Legends Never Die.mp3",
    "../songs/Warriors.mp3",
]

let isPlaying = false;

//play the music
const playMusic = () => {
    isPlaying = true;
    audio.play();
    playBtn.innerHTML = '<i class="far fa-pause-circle"></i>';
    playBtn.style.fontSize = "30px";
    playBtn.style.padding = "17px 21px";
};

//pause the music
const pauseMusic = () => {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = '<i class="far fa-play-circle"></i>';
};

//condition for play or pause music
playBtn.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
})

//using space bar to play/pause the music
if(audio){
    window.addEventListener("keydown", function(event){
        var key = event.which || event.keyCode;

        if(key == 32){
            event.preventDefault();

            audio.paused ? (
                                audio.play(),
                                playBtn.innerHTML = '<i class="far fa-pause-circle"></i>'
                            ) : 
                            (
                                audio.pause(),
                                playBtn.innerHTML = '<i class="far fa-play-circle"></i>'
                            );
        }
    })
}

//changing music data
const title = document.querySelector("#name");
const artist = document.querySelector("#artist");
const image = document.querySelector("#img");

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = "Vocalist - " + songs.artist;
    audio.src = "../songs/" + songs.title + ".mp3";
    image.src = "../images/" + songs.title + ".jpg"
}

songIndex = 0;
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;  
    loadSong(songs[songIndex]);
    playMusic();
}

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;  
    loadSong(songs[songIndex]);
    playMusic();
}

//progress bar update
audio.addEventListener("timeupdate", (e) => {
    const {currentTime, duration} = e.srcElement;
    let progress_time = (currentTime/duration)*100;
    progress.style.width = `${progress_time}%`;

    //duration update
    let current_time = document.querySelector("#current_time");
    let total_duration = document.querySelector("#duration");

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let tot_duration = `${min_duration}:${sec_duration}`;

    if(duration){
        total_duration.textContent = `${tot_duration}`;
    }

    //current time update
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if(sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`;
    }

    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`;
})

//progress on click functionality
const seek = document.querySelector(".seek");
seek.addEventListener("click", (e) =>{
    const {duration} = audio;
    let move_progress = (e.offsetX / e.srcElement.clientWidth) * duration;
    audio.currentTime = move_progress;
})

//if music has ended, call nextSong function
audio.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

//Volume increase, decrease and mute
function decreaseVolume(){
    audio.volume -= 0.10;
}

function increaseVolume(){
    audio.volume += 0.10;
}

let volumeUp = document.querySelector(".volume-up");
volumeUp.addEventListener("click", function(){
    if(audio.volume === 1){
        audio.volume = 0;
        document.querySelector(".volume-up i").className = "fas fa-volume-mute";
    }
    else{
        audio.volume = 1;
        document.querySelector(".volume-up i").className = "fas fa-volume-up";
    }
})

//repeat song in a loop
let repeatBtn = document.querySelector(".repeat");
repeatBtn.addEventListener("click", function(){
    if(audio.loop === true){
        audio.loop = false;
        audio.load();
    }
    else{
        audio.loop = true;
        audio.load();
    }
})

//shuffle songs button
    // var songsIndex = songs.indexOf[Math.floor(Math.random() * songs.length)];
    // var songsInfo = songs[Math.floor(Math.random() * songs.length)];
    // var srcAudio = songsList[Math.floor(Math.random() * songs.length)];
    // var newAudio = new Audio(srcAudio);
    // loadSong(songs[songsIndex]);
    // newAudio.play();
    // playBtn.innerHTML = '<i class="far fa-pause-circle"></i>';

}

// autoplay on window load
window.onload = function(e) {
    audio.volume = 0.3;
    playMusic();
};