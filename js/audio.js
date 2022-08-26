let audio = document.getElementById('audio');
let playBtn = document.querySelector('.play-btn');
let controlIcon = document.querySelector('.svg');
let playImg = document.querySelector('.play-img')
let pauseImg = document.querySelector('.pause-img')

playBtn.addEventListener('click', () => {
    playBtn.classList.toggle('play');

    if (playBtn.classList.contains('play')) {
        audio.play();
        pauseImg.classList.add('active');
        playImg.classList.remove('active');
    } else {
        audio.pause();
        playImg.classList.add('active');
        pauseImg.classList.remove('active');
    }
})


