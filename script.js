(() => {

  'use strict';


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const scenes = [
    ...document.querySelectorAll('.scene')
  ];

  const transition =
    document.getElementById('transition');

  const progress =
    document.getElementById('progressFill');

  const music =
    document.getElementById('music');

  const soundBtn =
    document.getElementById('soundBtn');

  const particles =
    document.getElementById('particles');


  /* =========================================================
     STORY STATE
     ========================================================= */

  let index = 0;

  let musicOn = true;

  let audioStarted = false;

  let micStream = null;

  let blown = false;


  const order = [
    'intro',
    'one',
    'two',
    'three',
    'four',
    'book',
    'final'
  ];


  const sceneByName = name =>
    scenes.find(
      scene =>
        scene.dataset.scene === name
    );


  const wait = ms =>
    new Promise(
      resolve =>
        setTimeout(resolve, ms)
    );


  /* =========================================================
     PROGRESS BAR
     ========================================================= */

  function setProgress(){

    progress.style.width =
      `${(index / (order.length - 1)) * 100}%`;

  }


  /* =========================================================
     PARTICLE BURST
     ========================================================= */

  function burst(
    count = 30,
    type = 'sparkle'
  ){

    const chars =
      type === 'heart'
        ? ['♥','♡','✦','✧']
        : ['✦','✧','•','✺'];


    for(
      let i = 0;
      i < count;
      i++
    ){

      const el =
        document.createElement('span');


      el.textContent =
        chars[
          Math.floor(
            Math.random() *
            chars.length
          )
        ];


      el.style.position =
        'absolute';


      el.style.left =
        `${10 + Math.random() * 80}%`;


      el.style.top =
        `${15 + Math.random() * 70}%`;


      el.style.color =
        [
          '#fff',
          '#ffd56f',
          '#ff9fbe',
          '#7fcff2'
        ][
          Math.floor(
            Math.random() * 4
          )
        ];


      el.style.fontSize =
        `${10 + Math.random() * 26}px`;


      el.style.textShadow =
        '0 0 15px currentColor';


      el.style.animation =
        `twinkle ${
          .7 + Math.random() * 1.6
        }s ease-out forwards`;


      particles.appendChild(el);


      setTimeout(
        () => el.remove(),
        2500
      );

    }

  }


  /* =========================================================
     CONFETTI
     ========================================================= */

  function confetti(){

    const root =
      document.getElementById(
        'confetti'
      );


    root.innerHTML = '';


    const colors = [
      '#ff9fbe',
      '#ffd66f',
      '#7fcff2',
      '#a8dcae',
      '#b8a3e5',
      '#fff'
    ];


    for(
      let i = 0;
      i < 80;
      i++
    ){

      const x =
        document.createElement('i');


      x.style.left =
        `${Math.random() * 100}%`;


      x.style.top =
        `${-10 - Math.random() * 30}%`;


      x.style.background =
        colors[
          i % colors.length
        ];


      x.style.transform =
        `rotate(${
          Math.random() * 180
        }deg)`;


      x.style.animationDelay =
        `${Math.random() * 2}s`;


      x.style.animationDuration =
        `${3 + Math.random() * 2}s`;


      root.appendChild(x);

    }

  }


  /* =========================================================
     KISS / HEART RAIN
     ========================================================= */

  function kissRain(){

    const field =
      document.getElementById(
        'kissField'
      );


    field.innerHTML = '';


    for(
      let i = 0;
      i < 90;
      i++
    ){

      const k =
        document.createElement('span');


      k.className = 'kiss';


      k.textContent =
        i % 3 === 0
          ? '♥'
          : '♡';


      k.style.left =
        `${20 + Math.random() * 60}%`;


      k.style.top =
        `${38 + Math.random() * 30}%`;


      k.style.setProperty(
        '--dx',
        `${Math.random() * 100 - 50}vw`
      );


      k.style.setProperty(
        '--dy',
        `${-20 - Math.random() * 70}vh`
      );


      k.style.animationDelay =
        `${Math.random() * 1.7}s`;


      k.style.fontSize =
        `${18 + Math.random() * 34}px`;


      field.appendChild(k);

    }

  }


  /* =========================================================
     FINAL EXPLOSION
     ========================================================= */

  function finalExplosion(){

    const root =
      document.getElementById(
        'finalExplosion'
      );


    root.innerHTML = '';


    for(
      let i = 0;
      i < 90;
      i++
    ){

      const b =
        document.createElement('span');


      b.className = 'blast';


      const angle =
        Math.random() *
        Math.PI *
        2;


      const radius =
        20 +
        Math.random() * 55;


      b.style.setProperty(
        '--x',
        `${Math.cos(angle) * radius}vw`
      );


      b.style.setProperty(
        '--y',
        `${Math.sin(angle) * radius}vh`
      );


      b.style.animationDelay =
        `${Math.random() * .4}s`;


      b.style.width =
        `${4 + Math.random() * 12}px`;


      b.style.height =
        b.style.width;


      b.style.background =
        i % 4 === 0
          ? '#ff9fbe'
          : i % 4 === 1
            ? '#ffd66f'
            : i % 4 === 2
              ? '#8fd8ff'
              : '#fff';


      root.appendChild(b);

    }


    burst(
      70,
      'heart'
    );

  }


  /* =========================================================
     SCENE TRANSITION
     ========================================================= */

  async function go(name){

    const target =
      sceneByName(name);


    if(!target){
      return;
    }


    transition.classList.add('go');


    await wait(500);


    scenes.forEach(
      scene =>
        scene.classList.remove(
          'active'
        )
    );


    target.classList.add('active');


    index =
      order.indexOf(name);


    setProgress();


    await wait(180);


    transition.classList.remove('go');


    /* Stage 1 */

    if(name === 'one'){

      confetti();

      burst(24);

    }


    /* Stage 2 */

    if(name === 'two'){

      burst(20);

    }


    /* Stage 4 */

    if(name === 'four'){

      document
        .getElementById('walkCinna')
        .classList
        .remove('reset');

    }


    /* Final */

    if(name === 'final'){

      await wait(1100);

      finalExplosion();

    }

  }


  /* =========================================================
     MUSIC
     ========================================================= */

  function startMusic(){

    if(
      !musicOn ||
      audioStarted
    ){

      return;

    }


    audioStarted = true;


    music.volume = .34;


    music
      .play()
      .catch(() => {

        audioStarted = false;

      });

  }


  soundBtn.addEventListener(
    'click',
    () => {

      musicOn = !musicOn;


      soundBtn.textContent =
        musicOn
          ? '♫'
          : '×';


      if(musicOn){

        startMusic();

      }else{

        music.pause();

      }

    }
  );


  /* =========================================================
     INTRO BUTTON
     ========================================================= */

  document
    .getElementById('startBtn')
    .addEventListener(
      'click',
      () => {

        startMusic();

        go('one');

      }
    );


  /* =========================================================
     NEXT BUTTONS
     ========================================================= */

  document
    .querySelectorAll(
      '[data-next]'
    )
    .forEach(
      btn => {

        btn.addEventListener(
          'click',
          () => {

            startMusic();

            go(
              btn.dataset.next
            );

          }
        );

      }
    );


  /* =========================================================
     OPEN BOOK
     ========================================================= */

  document
    .getElementById(
      'openBookBtn'
    )
    .addEventListener(
      'click',
      async () => {

        const book =
          document.getElementById(
            'bookWrap'
          );


        if(
          !book.classList.contains(
            'open'
          )
        ){

          book.classList.add(
            'open'
          );


          burst(35);


          await wait(1900);


          go('final');

        }

      }
    );


  /* =========================================================
     BLOW CANDLE
     ========================================================= */

  async function blow(){

    if(blown){
      return;
    }


    blown = true;


    document
      .querySelector(
        '.stage-three'
      )
      .classList
      .add('blown');


    burst(45);


    playTone(
      740,
      .16,
      'sine'
    );


    await wait(1700);

  }


  document
    .getElementById(
      'blowBtn'
    )
    .addEventListener(
      'click',
      blow
    );


  /* =========================================================
     MICROPHONE BLOW DETECTION
     ========================================================= */

  async function micBlow(){

    try{

      micStream =
        await navigator
          .mediaDevices
          .getUserMedia({
            audio:true
          });


      const ctx =
        new (
          window.AudioContext ||
          window.webkitAudioContext
        )();


      const src =
        ctx.createMediaStreamSource(
          micStream
        );


      const analyser =
        ctx.createAnalyser();


      analyser.fftSize = 512;


      src.connect(
        analyser
      );


      const data =
        new Uint8Array(
          analyser.fftSize
        );


      const check = () => {

        analyser.getByteTimeDomainData(
          data
        );


        let sum = 0;


        for(
          const v of data
        ){

          const n =
            (v - 128) / 128;


          sum += n * n;

        }


        const rms =
          Math.sqrt(
            sum / data.length
          );


        if(rms > .13){

          blow();

        }else if(!blown){

          requestAnimationFrame(
            check
          );

        }

      };


      check();

    }catch(e){

      /*
        Tap fallback remains available.
      */

    }

  }


  document
    .getElementById(
      'blowBtn'
    )
    .addEventListener(
      'dblclick',
      micBlow
    );


  /* =========================================================
     SOUND EFFECT
     ========================================================= */

  function playTone(
    freq,
    duration = .12,
    type = 'sine'
  ){

    try{

      const ctx =
        new (
          window.AudioContext ||
          window.webkitAudioContext
        )();


      const oscillator =
        ctx.createOscillator();


      const gain =
        ctx.createGain();


      oscillator.type =
        type;


      oscillator.frequency.value =
        freq;


      gain.gain.setValueAtTime(
        .0001,
        ctx.currentTime
      );


      gain.gain.exponentialRampToValueAtTime(
        .05,
        ctx.currentTime + .01
      );


      gain.gain.exponentialRampToValueAtTime(
        .0001,
        ctx.currentTime + duration
      );


      oscillator
        .connect(gain)
        .connect(ctx.destination);


      oscillator.start();


      oscillator.stop(
        ctx.currentTime +
        duration +
        .03
      );

    }catch(e){

      /*
        Audio effects are optional.
      */

    }

  }


  /* =========================================================
     KISS BUTTON
     ========================================================= */

  document
    .getElementById(
      'kissBtn'
    )
    .addEventListener(
      'click',
      () => {

        kissRain();


        playTone(
          660,
          .12
        );


        setTimeout(
          () =>
            playTone(
              880,
              .15
            ),
          110
        );

      }
    );


  /* =========================================================
     FINAL LOVE BUTTON
     ========================================================= */

  document
    .getElementById(
      'finalBtn'
    )
    .addEventListener(
      'click',
      () => {

        finalExplosion();


        playTone(
          523,
          .18
        );


        setTimeout(
          () =>
            playTone(
              659,
              .18
            ),
          100
        );


        setTimeout(
          () =>
            playTone(
              784,
              .35
            ),
          220
        );

      }
    );


  /* =========================================================
     STARFIELD
     ========================================================= */

  for(
    let i = 0;
    i < 45;
    i++
  ){

    const s =
      document.createElement(
        'span'
      );


    s.textContent =
      i % 4
        ? '✦'
        : '✧';


    s.style.position =
      'absolute';


    s.style.left =
      `${Math.random() * 100}%`;


    s.style.top =
      `${Math.random() * 100}%`;


    s.style.color =
      'rgba(255,255,255,.8)';


    s.style.fontSize =
      `${5 + Math.random() * 14}px`;


    s.style.animation =
      `twinkle ${
        1.5 + Math.random() * 2
      }s ease-in-out infinite`;


    s.style.animationDelay =
      `${Math.random() * 2}s`;


    document
      .getElementById(
        'stars'
      )
      .appendChild(s);

  }


  /* Initial progress */

  setProgress();

})();
