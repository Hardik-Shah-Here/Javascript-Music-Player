var play = document.getElementById('play');
var music = document.querySelector('audio');

var isPlaying = false;

// Function to play music
function playMusic(){
    music.play();
    isPlaying = true;

    //Make it the pause button
    play.classList.replace('fa-play', 'fa-pause');
}

// Function to pause music
function pauseMusic(){
    music.pause();
    isPlaying = false;

    //Make it the play button
    play.classList.replace('fa-pause', 'fa-play');
}

play.addEventListener('click', function(){
    if(isPlaying)
        pauseMusic();
    else
        playMusic();
});


// Pause Play button functionality
var title = document.getElementById('title');
var artist = document.getElementById('artist');
var img = document.querySelector('img');
var next = document.getElementById('next');
var prev = document.getElementById('prev');

var progress = document.getElementById('progress');
var total_duration = document.getElementById('duration');
var current_time = document.getElementById('current-time');
var progress_div = document.getElementById('progress-div')

const songs = [
    {
        name: "song-1",
        title: "Duniyaa",
        artist: "Akhil, Dhvani Bhanushali",
    },
    {
        name: "song-2",
        title: "Bekhayali",
        artist: "Sachet Tandon",
    },
    {
        name: "song-3",
        title: "Beh Chala",
        artist: "Yasser Desai",
    },
    {
        name: "song-4",
        title: "Jay Jay Shivshankar",
        artist: "Benny Dayal, Vishal Dadlani",
    }
]

var song_index = 0;

function loadSong(songs){
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name + ".mp3";
    img.src = "images/" + songs.name + ".jpg";
}

// Function to play next song
function nextSong(){
    song_index = (song_index + 1) % songs.length;
    loadSong(songs[song_index]);
    playMusic();
};

// Function to play previous song
function prevSong(){
    song_index = (song_index - 1 + songs.length) % songs.length;
    loadSong(songs[song_index]);
    playMusic();
}


// Progress Bar work
music.addEventListener('timeupdate', function(event){
    
    const {currentTime, duration } = event.target;
    // Finding % progress made
    var progress_time = (currentTime / duration) * 100;
    progress.style.width = progress_time + "%";



    // Custom music duration changes
    var duration_min = Math.floor(duration / 60);
    var duration_sec = Math.floor(duration % 60);
    var tot_duration = duration_min + ":" + duration_sec;
    // To resolve NaN issue between song changes
    if(duration)
        total_duration.textContent = tot_duration;

    

    // Current Duration Update
    var currentTime_min = Math.floor(currentTime / 60);
    var currentTime_sec = Math.floor(currentTime % 60);
    // To resolve 0.1, 0.2 ... for 1s, 2s ... instead of 0:01, 0:02 ...
    if(currentTime_sec < 10)
        currentTime_sec = "0"+currentTime_sec;
    var tot_currentTime = currentTime_min + ":" + currentTime_sec;
    // To resolve NaN issue between song changes
    if(currentTime)
        current_time.textContent = tot_currentTime;
});


// Dynamic Progress Change feature
progress_div.addEventListener('click', function(event){
    const { duration } = music;
    // Calculated the % of duration which has been covered
    var move_progress = (event.offsetX / event.target.clientWidth) * duration;
    music.currentTime = move_progress;
});

//Call next song function if current song ends
music.addEventListener('ended', nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);


// Switching Light and Dark Mode
var darkModeOn = false;
var mode = document.getElementById('mode');

var c_main = document.getElementsByClassName('main')[0];
var c_music_container = document.getElementsByClassName('music-container')[0];
var c_title = document.getElementById('title');
var c_progress_duration_meter = document.getElementsByClassName('progress-duration-meter')[0];
var c_progress_div = document.getElementsByClassName('progress-div')[0];
var c_icons = document.querySelectorAll('.music-container .fas');

mode.addEventListener('click', function(){
    if(!darkModeOn)
    {
        darkModeOn = true;

        c_main.style.backgroundColor = "#111111";
        c_music_container.style.backgroundColor = "#404040";
        c_title.style.color = "white";
        c_title.style.textShadow = "0 0.3rem 0.3rem #cccaca";
        img.style.boxShadow = "0 0.1rem 3rem #cccaca";
        c_progress_duration_meter.style.color = "white";
        c_progress_div.style.backgroundColor = "white";
        c_progress_div.style.boxShadow = "0 1px 2px #cccaca, 0 2px 4px #cccaca, 0 4px 8px #cccaca, 0 8px 16px #cccaca, 0 16px 32px #cccaca, 0 32px 64px #cccaca";
        c_icons[1].style.color = "white";
        c_icons[3].style.color = "white";
        mode.classList.replace('fa-moon', 'fa-sun');
        mode.style.color = "#111111";
        mode.style.background = "white";
        mode.style.fontSize = "1.8rem";
    }
    else
    {
        darkModeOn = false;

        c_main.style.backgroundColor = "#f6f6f6";
        c_music_container.style.backgroundColor = "#ffffff";
        c_title.style.color = "#171717";
        c_title.style.textShadow = "0 0.3rem 0.5rem rgba(0, 0, 0, 0.3)";
        img.style.boxShadow = "0 1.2rem 3rem rgba(0, 0, 0, 0.4)";
        c_progress_duration_meter.style.color = "black";
        c_progress_div.style.backgroundColor = "white";
        c_progress_div.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07)";
        c_icons[1].style.color = "#111111";
        c_icons[3].style.color = "#111111";
        mode.classList.replace('fa-sun', 'fa-moon');
        mode.style.color = "white";
        mode.style.background = "#111111";
        mode.style.fontSize = "1.6rem";
    }
})