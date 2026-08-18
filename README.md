# Cinnamoroll Birthday — Professional 5-Stage Interactive Card

A no-build, GitHub Pages friendly animated birthday experience.

The project uses:

- index.html
- style.css
- script.js
- local image assets
- local MP3 audio

---

## PROJECT STRUCTURE

cinnamoroll_birthday_professional/

├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    │
    ├── references/
    │   ├── reference-01.jpg
    │   ├── reference-02.jpg
    │   ├── reference-03.jpg
    │   ├── reference-04.jpg
    │   └── reference-05.jpg
    │
    ├── book/
    │   ├── cover.jpg
    │   ├── left.jpg
    │   ├── right.jpg
    │   └── final.jpg
    │
    └── music/
        └── soft-birthday-original.mp3

---

## FIVE REFERENCE IMAGES

The five supplied Cinnamoroll reference images are stored here:

assets/references/reference-01.jpg
assets/references/reference-02.jpg
assets/references/reference-03.jpg
assets/references/reference-04.jpg
assets/references/reference-05.jpg

They are retained as visual reference assets.

The animated character in the website is constructed with HTML/CSS shapes rather than simply displaying the supplied photographs.

---

## BOOK PHOTOS

The three book photo slots are:

assets/book/cover.jpg

assets/book/left.jpg

assets/book/right.jpg

The cover photo appears on the closed book.

When the book opens:

- left.jpg appears on the left page
- right.jpg appears on the right page

---

## FINAL PHOTOGRAPH

The final photograph is:

assets/book/final.jpg

This appears beside the final birthday message.

---

## REPLACING PHOTOS

You can replace the photos while keeping the exact same filenames.

For example:

assets/book/cover.jpg

can be replaced with another image.

The website will automatically use the new image.

You can also change the image path directly inside index.html.

---

## STORY

1. INTRO

"hi babyyy"

A soft blue Cinnamoroll-inspired scene with stars and glow.

---

2. BIRTHDAY CAKE

The character presents the birthday cake.

Text:

HAPPY BIRTHDAY, MY LOVE ♡

Confetti begins falling.

---

3. THEATER

The character performs on stage.

Features:

- theater curtains
- spotlight
- microphone
- animated singing mouth
- musical notes
- supporting instruments

---

4. BLOW THE CAKE

The cake grows toward the viewer.

The user can:

- tap the button
- double-click for microphone access

The candle is extinguished and a wish effect appears.

---

5. BOUQUET + KISS

The character walks toward the viewer.

The character presents a bouquet.

The character gets larger as it approaches.

The kiss sequence creates:

- hearts
- kisses
- sparkle particles
- glowing effects

---

6. PHOTO BOOK

The cover opens using a 3D page-turn effect.

The left and right pages display the supplied photographs.

---

7. FINAL PAGE

The final photograph appears with the birthday message.

The final interaction creates a large sparkle/heart explosion.

---

## GITHUB PAGES

Upload the entire project.

Keep index.html in the project root.

Then:

Settings
→ Pages
→ Deploy from branch

Choose your main branch.

Because the project uses relative paths, GitHub Pages will automatically find:

assets/references/
assets/book/
assets/music/

---

## IMPORTANT

Do not rename the assets unless you also change their paths in index.html.

Recommended:

.jpg for photographs

.mp3 for music

---

## CHARACTER

The supplied references are retained inside:

assets/references/

The animated character is constructed from HTML/CSS so that it can move, scale, sing, walk, present the bouquet and perform the kiss animation.

The supplied references are used as visual direction rather than simply being pasted over the animation.
