# Stopwatch Web App

This is a simple digital stopwatch built using **HTML**, **CSS**, and **JavaScript**. It includes functionality to **start**, **stop**, and **reset** the timer, making it a great beginner-friendly project for understanding DOM manipulation and time-based logic in JavaScript.

---

## 🔧 Features

- Displays minutes, seconds, and milliseconds in `MM : SS : MS` format.
- Provides three button controls:
  - **Start** – begins/resumes the timer
  - **Stop** – pauses the timer
  - **Reset** – resets the timer to `00 : 00 : 00`

---

## 📁 File Structure

- `index.html` – Markup for the stopwatch UI
- `style.css` – Styling for layout, typography, and buttons
- `script.js` – Core logic for timing and event handling

---

## 🧠 JavaScript Logic Explained

Here’s how the stopwatch logic works, step by step:

### 1. **Time Counters**
Three variables are declared to track:
- `msec` – milliseconds (increments every 10ms, resets after reaching 100)
- `secs` – seconds (increments when `msec` reaches 100, resets after 60)
- `mins` – minutes (increments when `secs` reaches 60)

```js
let msec = 0;
let secs = 0;
let mins = 0;
```

### 2. **startTimer Function**
This function is called every 10 milliseconds via `setInterval`.

- Increments `msec`
- Rolls over to `secs` after 100 ms
- Rolls over to `mins` after 60 sec
- Formats values into two-digit strings
- Updates the timer display in the DOM

```js
function startTimer() {
  msec++;
  if (msec == 100) {
    msec = 0;
    secs++;
    if (secs == 60) {
      secs = 0;
      mins++;
    }
  }

  let msecString = msec < 10 ? `0${msec}` : msec;
  let secsString = secs < 10 ? `0${secs}` : secs;
  let minsString = mins < 10 ? `0${mins}` : mins;

  timerDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
}
```

### 3. **Event Listeners**
Each button triggers an event:
- `Start` clears any running interval and starts a new one.
- `Stop` clears the current interval.
- `Reset` stops the interval and resets the counters and display.

```js
startBtn.addEventListener("click", function () {
  if (timerId !== null) {
    clearInterval(timerId);
  }
  timerId = setInterval(startTimer, 10);
});

stopBtn.addEventListener("click", function () {
  clearInterval(timerId);
});

resetBtn.addEventListener("click", function () {
  clearInterval(timerId);
  timerDisplay.innerHTML = `00 : 00 : 00`;
  msec = secs = mins = 00;
});
```

---

### 📸 Preview

![Stopwatch UI Preview](/preview.png)

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (with custom properties for button colors)
- Vanilla JavaScript (`setInterval`, `clearInterval`, DOM API)

---

## 🧩 Future Improvements (Optional Ideas)

- Add lap functionality
- Store last run in `localStorage`
- Convert to a countdown timer
- Add sound notification when timer stops

---

## 📄 License

This project is open-source and free to use under the [MIT License](LICENSE).
