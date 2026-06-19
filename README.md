<div align="center">
  <img src="https://img.shields.io/badge/WebSerial_API-00ff41?style=for-the-badge&logo=usb&logoColor=black" />
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Monaco_Editor-2C2C32?style=for-the-badge&logo=visualstudiocode&logoColor=007ACC" />
  
  <br />
  <br />

  <h1 style="color: #00ff41;">🦆 DuckyFlow</h1>
  <p><b>Browser-Native BadUSB / DuckyScript Flasher via WebSerial</b></p>
  
  <p>
    <i>Bilingual Documentation (English & Español)</i>
  </p>
</div>

---

## 🌍 Overview / Descripción General

**(EN)** **DuckyFlow** is an elite, browser-native Progressive Web App (PWA) designed to write, compile, and flash DuckyScript payloads (BadUSB scripts) directly to microcontrollers (like Arduino or Raspberry Pi Pico) using the highly experimental **WebSerial API**. Zero desktop software required.

**(ES)** **DuckyFlow** es una aplicación web de élite que permite escribir, compilar y flashear scripts de automatización DuckyScript (BadUSB) directamente a microcontroladores (como Arduino o Raspberry Pi Pico) usando la API experimental **WebSerial**. No requiere instalar ningún software de escritorio.

---

## ⚡ Features / Características

- 🔌 **WebSerial Engine:** Connects securely to physical COM/tty USB ports directly from Chrome/Edge.
- 💻 **Pro Editor:** Integrated Monaco Editor (VSCode core) with custom DuckyScript syntax highlighting.
- 📟 **COM Terminal:** Real-time serial terminal to monitor hardware responses.
- 🥷 **Hacker UI:** Deep dark Cyberpunk-inspired UI built with Tailwind CSS v4.

---

## 🛠 Tech Stack / Tecnologías

| Component | Technology | Description |
|-----------|------------|-------------|
| **Core** | WebSerial API | Low-level JS abstraction over hardware USB ports |
| **Frontend**| Next.js 15, React 19 | High-performance React framework |
| **Editor** | Monaco Editor | The same core that powers VSCode for web |
| **State** | Zustand | Lightweight state management |

---

## 🏗 System Architecture / Arquitectura del Sistema

\`\`\`mermaid
graph LR
    A[Monaco Editor] -->|DuckyScript| B(Compiler Hook)
    B -->|Uint8Array| C{WebSerial API}
    C <-->|USB COM Port| D[Microcontroller]
    D -->|COM Log| E[Serial Terminal UI]
\`\`\`

---

## 🚀 Usage / Uso

1. Go to the live app (must be served over HTTPS).
2. Click **"Enlazar Puerto"** and grant browser permission to your microcontroller's USB COM port.
3. Write your payload in the Monaco Editor.
4. Click **"FLASH PAYLOAD"** and watch the real-time execution in the Serial COM_LOG.

---

<div align="center">
  <p><i>Engineered by <a href="https://github.com/Juan23456788977">Juan Alberto Cortez Urrea</a></i></p>
</div>
