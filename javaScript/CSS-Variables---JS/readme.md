# 🎨 CSS Variables with JavaScript

A simple and interactive project that demonstrates how to dynamically update **CSS Variables (Custom Properties)** using **JavaScript**.  
Users can control **spacing**, **blur**, and **base color** using HTML inputs, and see the live visual changes applied instantly.

---

## 📸 Project Preview

> Live Screenshot Preview:

![CSS Variables Screenshot](/preview.png)

---

## 🚀 Features

- 🔧 Live update of CSS variables using JavaScript  
- 🎛 Adjustable **spacing**, **blur**, and **color** using sliders & color picker  
- 🖼 Real-time effect applied to image and text elements  
- 🎨 Smooth UI preview for CSS styling experiments  
- 👨‍💻 Great for learning **CSS Variables**, **DOM manipulation**, and `dataset` usage  

---

## 📂 Project Structure

/project-folder
│── index.html
│── style.css
│── script.js
│── got-wallpaper.jpg


---

## 🛠 Technologies Used

| Technology | Usage |
|------------|-------|
| HTML | Structure & inputs |
| CSS | Custom properties, styling, filters |
| JavaScript | Event handling, DOM updates |
| DOM API | `style.setProperty()` and dataset handling |

---

## 🧠 How It Works

### 🎯 Key JavaScript Logic

Updates CSS variables when input values change:

```js
const suffix = this.dataset.sizing || "";
document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
