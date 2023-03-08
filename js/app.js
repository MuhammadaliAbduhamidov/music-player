const heartFill = document.querySelector("#heart-fill");
const heartStroke = document.querySelector("#heart-stroke");
const img = document.querySelectorAll(".music-img img");
const play = document.querySelector(".play"),
  faPlay = play.querySelector(".fa-play"),
  faPause = play.querySelector(".fa-pause");
const back = document.querySelector(".back");
const next = document.querySelector(".next");

heartFill.style.display = "none";
faPause.style.display = "none";

heartStroke.addEventListener("click", (e) => {
  heartFill.style.display = "block";
  heartFill.style.color = "#3b45ef";
  e.target.style.display = "none";
});
heartFill.addEventListener("click", (e) => {
  heartStroke.style.display = "block";
  e.target.style.display = "none";
});

const audios = [
  "./audio/19 Yil @UzTaronaCom.mp3",
  "./audio/AUD-20220122-WA0000.mp3",
  "./audio/Modniylarga [Yoshlar.com].mp3",
  "./audio/xamdam-sobirov-gavharim_(uzhits.net).mp3",
];

let audio = new Audio(audios[0]);

const audioPlay = () => {
  if (audio.paused) {
    audio.play();
    faPause.style.display = "block";
    faPlay.style.display = "none";
  } else {
    audio.pause();
    faPause.style.display = "none";
    faPlay.style.display = "block";
  }
};
let countMusic = 0;
let offset = 0;

const audioNext = () => {
  offset = offset + 200;
  if (offset == 800) {
    offset = 0;
  }
  img.forEach((item) => {
    item.style.transform = `translateX(${-offset}px)`;
  });
  if (!audio.paused) {
    audio.pause();
  }
  if (audios.length - 1 > countMusic) {
    audio.currentTime = 0;
    ++countMusic;
  } else {
    countMusic = 0;
  }
  audio = new Audio(audios[countMusic]);
  audio.play();
  faPause.style.display = "block";
  faPlay.style.display = "none";
};
const audioBack = () => {
  offset = offset - 200;
  if (offset < 0) {
    offset = 0;
  }
  img.forEach((item) => {
    item.style.transform = `translateX(${-offset}px)`;
  });
  if (!audio.paused) {
    audio.pause();
  }
  if (0 < countMusic) {
    audio.currentTime = 0;
    --countMusic;
  } else {
    countMusic = 0;
  }
  audio = new Audio(audios[countMusic]);
  audio.play();
  faPause.style.display = "block";
  faPlay.style.display = "none";
};

back.addEventListener("click", audioBack);
play.addEventListener("click", audioPlay);
next.addEventListener("click", audioNext);
