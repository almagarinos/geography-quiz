# Trivial geográfico

Juego familiar, inspirado en el popular juego de mesa "Trivial Pursuit", donde hay que acertar preguntas de geografía sobre ciudades, países y continentes.


## 📈 Versión 1.0.1

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000) ![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)

Esta es una versión estable del proyecto, desarrollada únicamente con tecnologías Front-End nativas: JavaScript, HTML y CSS.

El proyecto está diseñado con una arquitectura modular sin dependencias externas, sin frameworks y sin módulos ES de JavaScript.

Se puede ejecutar directamente en cualquier navegador, puesto que no necesita procesos de compilación, ni instalación de dependencias, ni conexión a Internet.


## 🎮 Jugar _online_

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?logo=github&logoColor=white)

Gracias al despliegue en GitHub Pages, se puede jugar aquí:

👉 https://almagarinos.github.io/geography-quiz/ 👈

Compatible con navegadores modernos, no requiere de:
- Node.js
- npm
- build
- bundlers
- transpilers


## 💻 Instalación local

![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)

### Clonar repositorio ⬇️

Si se tiene instalado [Git](https://git-scm.com/), sólo hay que usar los siguientes comandos en un terminal, dentro de la ruta del directorio donde se quiera descargar el juego:

```bash
git clone https://github.com/almagarinos/geography-quiz   # Descarga el proyecto
geography-quiz\index.html                 # Ejecuta el juego en un navegador web
```

### Descargar fichero 🗂️

Se puede obtener todo el proyecto comprimido en [este ZIP](https://github.com/almagarinos/geography-quiz/archive/refs/heads/main.zip). Descomprímase su contenido dentro del directorio donde se quiera ubicar el juego, para luego abrir el archivo **index.html** en un navegador web.


## 📂 Estructura del proyecto

```sh
geography-quiz/
│
├── assets/
│   │
│   ├── css/                    # Estilos propios de la aplicación
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── screens.css
│   │
│   └── icon/                   # Archivos de favicon, de https://favicon.io/
│       └── ...
│
├── data/                       # Base de datos usada para las preguntas
│   │
│   └── datos-ciudades.js
│
├── js/                         # Archivos de lógica del juego
│   │
│   ├── storage/
│   │   └── local-storage.js
│   │
│   ├── utils/
│   │   ├── random.js
│   │   ├── array.js
│   │   ├── geo.js
│   │   ├── date.js
│   │   └── validation.js
│   │
│   ├── state/
│   │   └── store.js
│   │
│   ├── services/
│   │   ├── score-service.js
│   │   ├── leaderboard-service.js
│   │   ├── question-generator.js
│   │   └── quiz-service.js
│   │
│   ├── components/
│   │   ├── progress-bar.js
│   │   ├── notification.js
│   │   └── drag-sort.js
│   │
│   ├── questions/
│   │   ├── binary-question.js
│   │   ├── single-choice-question.js
│   │   ├── multiple-choice-question.js
│   │   ├── text-question.js
│   │   └── ordering-question.js
│   │
│   ├── views/
│   │   ├── start-view.js
│   │   ├── question-view.js
│   │   ├── result-view.js
│   │   └── leaderboard-view.js
│   │
│   └── main.js
│
├── LICENSE.md                  # Archivo de licencia MIT
│
├── README.md                   # Archivo "Léeme" del proyecto
│
└── index.html                  # Punto de entrada de la aplicación
```