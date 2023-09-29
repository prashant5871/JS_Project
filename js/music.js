let audio = document.querySelector('audio');
let play = document.querySelector('#play');
let play_button = document.querySelector('.play_button');
let image = document.querySelector('.image-container');
let IsPlaying = false;

const songs = [
    {
        name: "music-2.mp3",
        artist: "Anirudh Ravichander, Vishal Dadlani and Shilpa Rao",
        title: "ramaiya vastavaiya"
    },
    {
        name: "music-1.mp3",
        artist: "prashant",
        title: "KGF-2 background music"
    }

];

let title = document.querySelector('#title');
let artist = document.querySelector('#artist');
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');

const PlaySong = () => {
    play.classList.replace('fa-pause', 'fa-play');
    audio.play();
    IsPlaying = true;
    image.classList.add('anime');
    play.title = "Pause";
}

const PauseSong = () => {
    play.classList.replace('fa-play', 'fa-pause');
    audio.pause();
    IsPlaying = false;
    image.classList.remove('anime');
    play.title = "Play";
}
PlaySong();
play_button.addEventListener('click', (e) => {
    if (!IsPlaying) {
        PlaySong();
    }
    else {
        PauseSong();
    }
})
let index = 0;
let size = songs.length;


const nextsong = () => {
    play.classList.replace('fa-pause', 'fa-play');
    index++;
    audio.src = `../music/${songs[index % size].name}`;
    title.innerHTML = songs[index % size].title;
    artist.innerHTML = songs[index % size].artist;
    image.classList.add('anime');
    audio.play();
    IsPlaying = true;
}

const prevsong = () => {
    play.classList.replace('fa-pause', 'fa-play');
    index = (index + size - 1) % size;
    audio.src = `../music/${songs[index].name}`;
    title.innerHTML = songs[index].title;
    artist.innerHTML = songs[index].artist;
    image.classList.add('anime');
    audio.play();
    IsPlaying = true;
}

// for the progress bar
let progress = document.querySelector('#progress');
let current_time = document.querySelector('#current_time');
let total_duration = document.querySelector('#duration');
let progress_bar = document.querySelector('#progress_bar');
audio.addEventListener('timeupdate', (event) => {
    // console.log(event);
    let { currentTime, duration } = event.srcElement;
    // console.log(currentTime, duration);
    if (currentTime && duration) {
        let progress_width = (currentTime / duration) * 100;

        progress.style.width = `${progress_width}%`;
    }

    let duration_min = Math.floor(duration / 60);
    let duration_sec = Math.floor(duration % 60);

    // console.log(duration_min,duration_sec);
    if (duration)
        total_duration.innerHTML = `${duration_min}:${duration_sec}`;


    let current_min = Math.floor(Number(currentTime) / 60);
    let current_sec = Math.floor(currentTime % 60);

    if (current_sec < 10) {
        current_sec = `0${current_sec}`;
    }
    // console.log(duration_min,duration_sec);
    if (currentTime)
        current_time.innerHTML = `${current_min}:${current_sec}`;
})
const total_progress_width = progress_bar.clientWidth;
progress_bar.addEventListener('click', (event) => {
    // console.log(event);
    let touch_point = event.offsetX;


    console.log(touch_point, total_progress_width);

    let progressWidth = (touch_point / total_progress_width);

    // console.log(audio.duration);
    let point_time = progressWidth * audio.duration;

    audio.currentTime = point_time;

})

next.addEventListener('click', nextsong);

prev.addEventListener('click', prevsong);



audio.addEventListener('ended', () => {
    nextsong();
})


// Keydown codes

const volumePlus = document.getElementById("volume-indicator-plus");
const volumeMinus = document.getElementById("volume-indicator-minus");
let showingVolume = false;

document.addEventListener('keydown', (event) => {
    // console.log(event.keyCode);
    if (event.keyCode == 37) {
        prevsong();
    } else if (event.keyCode == 39) {
        nextsong();
    } else if (event.keyCode == 32) {
        IsPlaying ? PauseSong() : PlaySong();
    } else if (event.keyCode == 38) {
        if (!showingVolume) {
            volumePlus.style.opacity = 1;
            showingVolume = true;

            setTimeout(() => {
                volumePlus.style.opacity = 0;
                showingVolume = false;
            }, 300); // Display volume increase for 1 second
        }
        // console.log(audio.volume);
        let vol = audio.volume;
        vol += .1;
        if (vol > 1) {
            vol = 1;
        }

        audio.volume = vol;
        console.log(audio.volume);

    } else if (event.keyCode == 40) {
        if (!showingVolume) {
            volumeMinus.style.opacity = 1;
            showingVolume = true;

            setTimeout(() => {
                volumeMinus.style.opacity = 0;
                showingVolume = false;
            }, 300); // Display volume increase for 1 second
        }
        let vol = audio.volume;
        vol -= .1;
        if (vol < 0) {
            vol = 0;
        }

        audio.volume = vol;

        // console.log(audio.volume);
    }
})
