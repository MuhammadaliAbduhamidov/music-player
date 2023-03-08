const heartFill = document.querySelector("#heart-fill");
const heartStroke = document.querySelector("#heart-stroke");
const img = document.querySelectorAll(".music-img img");
const back = document.querySelector(".back");
const next = document.querySelector(".next");
const currenTime = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const title = document.querySelector(".music-title h1");
const description = document.querySelector(".music-description p");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const play = document.querySelector(".play"),
  faPlay = play.querySelector(".fa-play"),
  faPause = play.querySelector(".fa-pause");

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
const audiosTitle = ["J Ahmadaliyev", "M Nematov", "D Ergashev", "X Sobirov"];
const audiosDescr = ["19 yil", "Bir she'r yozdim", "Modniylarga", "Gavharim"];

let audio = new Audio(audios[0]);

const audioPlay = () => {
  if (audio.paused) {
    audio.play();
    faPause.style.display = "block";
    faPlay.style.display = "none";
    musicInterval();
  } else {
    audio.pause();
    faPause.style.display = "none";
    faPlay.style.display = "block";
    clearInterval(interval);
  }
};
let countMusic = 0;
let countTitle = 0;
let offset = 0;
let interval = 0;

const audioNext = () => {
  countTitle++;
  if (countTitle > 3) {
    countTitle = 0;
  }
  title.textContent = audiosTitle[countTitle];
  description.textContent = audiosDescr[countTitle];
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
  musicInterval();
  faPause.style.display = "block";
  faPlay.style.display = "none";
};
const audioBack = () => {
  countTitle--;
  if (countTitle < 0) {
    countTitle = audiosTitle.length - 1;
  }
  title.textContent = audiosTitle[countTitle];
  description.textContent = audiosDescr[countTitle];
  offset = offset - 200;
  if (offset < 0) {
    offset = 600;
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
    countMusic = audios.length - 1;
  }
  audio = new Audio(audios[countMusic]);
  audio.play();
  musicInterval();
  faPause.style.display = "block";
  faPlay.style.display = "none";
};

const musicInterval = () => {
  interval = setInterval(() => {
    timeFormat();
  }, 1000);
};

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

const timeFormat = () => {
  currenTime.textContent = `${
    Math.floor(audio.currentTime / 60) < 10
      ? `0${Math.floor(audio.currentTime / 60)}`
      : Math.floor(audio.currentTime / 60)
  } : ${
    Math.floor(audio.currentTime % 60) < 10
      ? `0${Math.floor(audio.currentTime % 60)}`
      : Math.floor(audio.currentTime % 60)
  }`;
  durationTime.textContent = `${
    Math.floor(audio.duration / 60) < 10
      ? `0${Math.floor(audio.duration / 60)}`
      : Math.floor(audio.duration / 60)
  } : ${
    Math.floor(audio.duration % 60) < 10
      ? `0${Math.floor(audio.duration % 60)}`
      : Math.floor(audio.duration % 60)
  }`;
  progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  if (audio.currentTime === audio.duration) {
    audioNext();
  }
};

back.addEventListener("click", audioBack);
play.addEventListener("click", audioPlay);
next.addEventListener("click", audioNext);
progressBar.addEventListener("click", setProgress);
