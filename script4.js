console.log("Welcome To BeatBox");

// Initialize the variable
let songindex = 0;
let audioElement = new Audio("song/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  { songname: "Jai Shree Ram", filepath: "song/1.mp3", coverpath: "Cover/1.jpg" },
  { songname: "jugjugg jeyoo", filepath: "song/2.mp3", coverpath: "Cover/2.jpg" },
  { songname: "Lambiya Judaiyan", filepath: "song/3.mp3", coverpath: "Cover/3.jpg" },
  { songname: "Main Rang Sharbaton Ka", filepath: "song/4.mp3", coverpath: "Cover/4.jpg" },
  { songname: "Sahi Galat", filepath: "song/5.mp3", coverpath: "Cover/5.jpg" },
  { songname: "Sau Aasmaan", filepath: "song/6.mp3", coverpath: "Cover/6.jpg" },
  { songname: "Tum Kya Mile", filepath: "song/7.mp3", coverpath: "Cover/7.jpg" },  
  { songname: "Raataan Lambiyan", filepath: "song/8.mp3", coverpath: "Cover/8.jpg" },  
]

// Set song information for each songItem
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName('songname')[0].innerText = songs[i].songname;
})

// Function to reset play button styles for all song items
const makeallplays = () => {
  Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  })
}

// Add click event listeners to each songitemplay
Array.from(document.getElementsByClassName('songitemplay')).forEach((element, index) => {
  element.addEventListener('click', (e) => {
    makeallplays();
    songindex = index;
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src = songs[songindex].filepath;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
  })
})

// Listen to timeupdate events to update the seekbar
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myprogressbar.value = progress;
})

// Update audioElement's currentTime when the seekbar is changed
myprogressbar.addEventListener('change', () => {
  audioElement.currentTime = (myprogressbar.value * audioElement.duration / 100);
})

// Handle play/pause click for masterPlay
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
  }
})

// Handle next button click
document.getElementById('next').addEventListener('click', () => {
  songindex = (songindex + 1) % songs.length;
  playSong(songindex);
})

// Handle previous button click
document.getElementById('previous').addEventListener('click', () => {
  songindex = (songindex - 1 + songs.length) % songs.length;
  playSong(songindex);
})

// Function to play a song by its index
function playSong(index) {
  makeallplays();
  audioElement.src = songs[index].filepath;
  mastersongname.innerText = songs[index].songname;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
}
