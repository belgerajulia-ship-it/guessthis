const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const state = {
  stage: 0,
  music: true,
  blown: false,
  bookOpened: false,
  timers: []
};

const scenes = $$(".scene");
const dots = $$(".dot");
const counter = $("#stageCounter");
const music = $("#music");
const musicBtn = $("#musicBtn");

const labels = [
  "INTRO",
  "CHAPTER 01",
  "CHAPTER 02",
  "CHAPTER 03",
  "CHAPTER 04",
  "THE END"
];


function clearTimers() {
  state.timers.forEach(clearTimeout);
  state.timers = [];
}


function later(fn, ms) {
  const id = setTimeout(fn, ms);
  state.timers.push(id);
  return id;
}


function makeSparkles() {
  const field = $("#sparkleField");

  for (let i = 0; i < 48; i++) {

    const s = document.createElement("i");

    s.style.left = (Math.random() * 100) + "%";
    s.style.top = (Math.random() * 100) + "%";

    s.style.animationDelay =
      (-Math.random() * 3) + "s";

    s.style.animationDuration =
      (2 + Math.random() * 3) + "s";

    field.appendChild(s);
  }
}


makeSparkles();


function setStage(n, manual = false) {

  n = Math.max(0, Math.min(5, n));

  if (
    n === state.stage &&
    scenes[n].classList.contains("active") &&
    !manual
  ) {
    return;
  }

  clearTimers();

  scenes.forEach((s, i) => {
    s.classList.toggle("active", i === n);
    s.classList.remove("exit");
  });

  dots.forEach((d, i) => {
    d.classList.toggle("active", i === n);
  });

  counter.textContent = labels[n];

  state.stage = n;

  if (n === 1) stageOne();
  if (n === 2) stageTwo();
  if (n === 3) stageThree();
  if (n === 4) stageFour();
  if (n === 5) stageFive();

  if (n < 5) {
    $(".scene-five").classList.remove("done");
  }

  window.dispatchEvent(
    new CustomEvent(
      "birthday-stage",
      {
        detail: n
      }
    )
  );
}


function startMusic() {

  if (!state.music) {
    return;
  }

  music.volume = .34;

  music.play().catch(() => {});
}


function toggleMusic() {

  state.music = !state.music;

  if (state.music) {

    startMusic();

    musicBtn.textContent = "♫ Music";

  } else {

    music.pause();

    musicBtn.textContent = "♫ Muted";
  }
}


musicBtn.addEventListener(
  "click",
  e => {
    e.stopPropagation();
    toggleMusic();
  }
);


document.addEventListener(
  "pointerdown",
  () => {
    if (state.stage === 0) {
      startMusic();
    }
  },
  {
    once: true
  }
);


/* Stage 1 */

function stageOne() {

  const box = $("#confettiOne");

  box.innerHTML = "";

  for (let i = 0; i < 80; i++) {

    const x = document.createElement("i");

    x.style.left =
      Math.random() * 100 + "%";

    x.style.top =
      (-10 - Math.random() * 35) + "%";

    x.style.transform =
      `rotate(${Math.random() * 180}deg)`;

    x.style.animationDelay =
      (Math.random() * 2.2) + "s";

    x.style.animationDuration =
      (2.8 + Math.random() * 2.8) + "s";

    box.appendChild(x);
  }

  later(
    () => box.classList.add("live"),
    400
  );
}


/* Stage 2 */

function stageTwo() {

  startMusic();

  later(
    () => document
      .querySelector(".scene-two")
      .classList.add("singing"),
    100
  );
}


/* Stage 3 */

function stageThree() {

  state.blown = false;

  $$(".giant-candle").forEach(
    c => c.classList.remove("off")
  );

  $("#wind").innerHTML = "";

  later(
    () => {
      if (!state.blown) {
        blowCake();
      }
    },
    5200
  );
}


function blowCake() {

  if (state.blown) {
    return;
  }

  state.blown = true;

  $$(".giant-candle").forEach(c => {

    c.style.transition = "1s ease";

    c.style.opacity = "0";

    c.style.transform =
      "translateY(-18px) scale(.7)";
  });


  const wind = $("#wind");

  for (let i = 0; i < 20; i++) {

    const w = document.createElement("i");

    w.style.left =
      (8 + Math.random() * 18) + "%";

    w.style.top =
      (35 + Math.random() * 28) + "%";

    w.style.animationDelay =
      (Math.random() * .35) + "s";

    wind.appendChild(w);
  }


  /*
   * Soft whoosh using Web Audio.
   */

  try {

    const ctx =
      new (window.AudioContext ||
        window.webkitAudioContext)();

    const o =
      ctx.createOscillator();

    const g =
      ctx.createGain();

    o.type = "sine";

    o.frequency.setValueAtTime(
      180,
      ctx.currentTime
    );

    o.frequency.exponentialRampToValueAtTime(
      65,
      ctx.currentTime + .5
    );

    g.gain.setValueAtTime(
      .0001,
      ctx.currentTime
    );

    g.gain.exponentialRampToValueAtTime(
      .12,
      ctx.currentTime + .06
    );

    g.gain.exponentialRampToValueAtTime(
      .0001,
      ctx.currentTime + .6
    );

    o.connect(g).connect(ctx.destination);

    o.start();

    o.stop(
      ctx.currentTime + .65
    );

  } catch {}


  later(
    () => nextStage(),
    1900
  );
}


$("#blowBtn").addEventListener(
  "click",
  e => {
    e.stopPropagation();
    blowCake();
  }
);


/* Stage 4 */

function stageFour() {

  const layer = $("#kissLayer");

  layer.innerHTML = "";

  later(
    () => {

      for (let i = 0; i < 70; i++) {

        const k =
          document.createElement("i");

        k.textContent =
          Math.random() > .35
            ? "♥"
            : "♡";

        k.style.left =
          (35 + Math.random() * 30) + "%";

        k.style.top =
          (35 + Math.random() * 30) + "%";

        k.style.setProperty(
          "--x",
          (Math.random() * 100 - 50) + "vw"
        );

        k.style.setProperty(
          "--y",
          (Math.random() * 100 - 50) + "vh"
        );

        k.style.setProperty(
          "--r",
          (Math.random() * 90 - 45) + "deg"
        );

        k.style.animationDelay =
          (Math.random() * 1.8) + "s";

        k.style.animationDuration =
          (1.8 + Math.random() * 1.6) + "s";

        layer.appendChild(k);
      }

    },
    4100
  );


  later(
    () => nextStage(),
    8200
  );
}


/* Stage 5 */

function stageFive() {

  state.bookOpened = false;

  $(".book").classList.remove("open");

  $(".scene-five").classList.remove("done");

  later(
    () => $("#openBook").focus(),
    500
  );
}


$("#openBook").addEventListener(
  "click",
  e => {

    e.stopPropagation();

    if (state.bookOpened) {
      return;
    }

    state.bookOpened = true;

    $(".book").classList.add("open");

    later(
      () => finalExplosion(),
      1500
    );
  }
);


function finalExplosion() {

  const layer =
    $("#finalExplosion");

  layer.innerHTML = "";

  for (let i = 0; i < 150; i++) {

    const p =
      document.createElement("i");

    p.style.left = "50%";
    p.style.top = "50%";

    p.style.setProperty(
      "--x",
      Math.random() * 120 - 60
    );

    p.style.setProperty(
      "--y",
      Math.random() * 120 - 60
    );

    p.style.setProperty(
      "--s",
      .5 + Math.random() * 2.6
    );

    p.style.animationDelay =
      Math.random() * .8 + "s";

    p.style.animationDuration =
      1.5 + Math.random() * 1.6 + "s";

    layer.appendChild(p);
  }

  later(
    () => $(".scene-five").classList.add("done"),
    2500
  );
}


/* Navigation */

function nextStage() {

  if (state.stage < 5) {
    setStage(state.stage + 1);
  }
}


function prevStage() {

  if (state.stage > 0) {
    setStage(state.stage - 1);
  }
}


/* Intro */

$(".start-btn").addEventListener(
  "click",
  e => {

    e.stopPropagation();

    startMusic();

    setStage(1);
  }
);


/* Replay */

$("#replayBtn").addEventListener(
  "click",
  e => {

    e.stopPropagation();

    setStage(0, true);
  }
);


/* Navigation dots */

dots.forEach(
  d => {

    d.addEventListener(
      "click",
      e => {

        e.stopPropagation();

        setStage(
          Number(d.dataset.go),
          true
        );
      }
    );

  }
);


/* Swipe navigation */

let downX = 0;
let downY = 0;
let downT = 0;


document.addEventListener(
  "pointerdown",
  e => {

    downX = e.clientX;
    downY = e.clientY;
    downT = performance.now();
  }
);


document.addEventListener(
  "pointerup",
  e => {

    const dx =
      e.clientX - downX;

    const dy =
      e.clientY - downY;

    const dt =
      performance.now() - downT;


    if (
      Math.abs(dx) > 55 &&
      Math.abs(dx) >
        Math.abs(dy) * 1.25
    ) {

      dx < 0
        ? nextStage()
        : prevStage();

      return;
    }


    if (
      dt < 500 &&
      state.stage !== 0 &&
      state.stage !== 3 &&
      state.stage !== 5
    ) {

      nextStage();
    }
  }
);


/* Keyboard navigation */

document.addEventListener(
  "keydown",
  e => {

    if (
      ["ArrowRight", " ", "Enter"]
        .includes(e.key)
    ) {

      if (state.stage === 3) {

        blowCake();

        return;
      }


      if (
        state.stage === 5 &&
        !state.bookOpened
      ) {

        $(".book").classList.add("open");

        state.bookOpened = true;

        later(
          finalExplosion,
          1500
        );

        return;
      }


      nextStage();
    }


    if (e.key === "ArrowLeft") {
      prevStage();
    }

  }
);


/* Initialize */

setStage(0);
