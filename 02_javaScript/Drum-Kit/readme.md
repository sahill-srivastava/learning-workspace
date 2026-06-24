# 🎵 JavaScript Drum Kit

An interactive drum kit built using **HTML**, **CSS**, and **Vanilla JavaScript** that lets users play drum sounds using **keyboard keys** and **mouse clicks**. Each drum pad triggers a unique sound and plays an animated visual effect.

---

## 📸 Project Screenshot

> Sample UI preview of the drum pad layout:

![Drum Kit Screenshot](/preview.png)

---

## 🚀 Features

- Play drum sounds using **keyboard keys (A–J)**
- **Click** on drum pads to trigger sounds
- Smooth animation using **CSS transitions**
- Uses **data-key** attributes to map keys and sounds
- Rewinds sound with `audio.currentTime = 0` for fast repeat play
- Lightweight — No external libraries

---

## 📂 Project Structure

/project-folder
│── index.html
│── styles.css
│── script.js
│── /sounds
│ ├── kick-bass.mp3
│ ├── snare.mp3
│ ├── tom-1.mp3
│ ├── tom-2.mp3
│ ├── tom-3.mp3
│ ├── tom-4.mp3
│ ├── crash.mp3

---

## 🛠 Technologies Used

| Technology | Usage                                       |
| ---------- | ------------------------------------------- |
| HTML       | Drum kit layout and audio elements          |
| CSS        | Styling and animations                      |
| JavaScript | Event handling and sound control            |
| DOM API    | Element selection and data attribute access |
| Audio API  | Play, pause, rewind audio                   |

---

## ▶ How It Works

### 🎯 Keyboard Interaction

Listens for `keydown` event and matches `e.keyCode` with a corresponding `<audio>` element using `data-key`.

### 🖱 Click Interaction

When user clicks a `.drum-pad`, it fetches `dataset.key` to locate and play the correct sound.

### 🎬 Animation

Adds `.playing` class on activation, and removes it using `transitionend` event when animation ends.

---

## 🎹 Keyboard Sound Mapping

| Key    | Sound |
| ------ | ----- |
| A (65) | Kick  |
| S (83) | Snare |
| D (68) | Tom 1 |
| F (70) | Tom 2 |
| G (71) | Tom 3 |
| H (72) | Crash |
| J (74) | Tom 4 |

---

## 📦 How to Use

1️⃣ Download or clone the project  
2️⃣ Make sure the `/sounds` folder contains the audio files  
3️⃣ Open `index.html` in a browser  
4️⃣ Press keys or click buttons to play sounds

💡 Tip: Use **Live Server in VS Code** for fast testing.

---

## ✨ Future Enhancements

- Volume controls
- Record & playback beats
- Mobile touch support
- Sound visualizer and glow effect
- Add beat loop creator

---

## 👨‍💻 Author

Project developed using HTML, CSS, and JavaScript  
Designed for learning event handling, audio API, and DOM interactions.

---
