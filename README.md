# Entre Flores y Recuerdos

Página conmemorativa de Día de Muertos con altar interactivo, galería de homenajes, tradiciones y un libro de ofrendas digital. Proyecto del equipo.

<p align="center">
  <img width="1800" height="760" alt="all-devices-white" src="https://github.com/user-attachments/assets/2d93f2a6-e533-4eb6-80d9-f99ab0947efd" />
</p>

> La imagen de arriba es un **mockup del navegador** generado con [Website Mockup Generator](https://websitemockupgenerator.com/). Sustituye `docs/preview.png` por tu propia captura una vez generada.

---

### ✨ Características

- Galería infinidad de altares con retratos y monogramas.
- Ventana de homenaje por persona con apodo, fechas, texto y gustos.
- Sección de tradiciones del Día de Muertos.
- Libro de ofrendas: deja el nombre de quien deseas recordar.
- Navegación fluida, modo noche con estrellas y pétalos animados.
- Diseño responsivo con paleta inspirada en el cempasúchil y el papel picado.

---

### 🚀 Cómo ejecutar

La página carga `personas.json` mediante `fetch`, por lo que debe servirse desde un servidor web local (no abrir directamente como `file://`).

```bash
# Con Live Server (VS Code)
# Abre la carpeta y dale a "Go Live"

# O con Python
python -m http.server 8000
# Luego visita http://localhost:8000

# O con Node
npx serve .
# Luego visita http://localhost:5000
```

---

### 📁 Estructura del proyecto

```
Dia-de-muertos/
├── index.html      # Página principal
├── style.css       # Estilos y animaciones
├── script.js       # Lógica de la galería, modal y ofrenda
├── personas.json   # Datos de los homenajeados
├── Altar.svg       # Gráficos del altar
├── README.md       # Este archivo
└── docs/           # Imágenes y mockups (crea esta carpeta)
```

---

### 🗂️ Formato de `personas.json`

Cada objeto del array representa un altar:

| Campo | Descripción |
|-------|-------------|
| `id` | Identificador único |
| `nom` | Nombre completo |
| `apodo` | Apodo que se muestra en la galería |
| `f` | Fecha aproximada de nacimiento |
| `m` | Fecha de fallecimiento |
| `mono` | Iniciales para el monograma |
| `texto` | Texto del homenaje |
| `gustos` | Array de gustos aficiones |
| `imagen` | URL directa del retrato |
| `fuenteImagen` | Página de origen o atribución de la imagen |

Si `imagen` está vacía o falla, se muestra el monograma.

---

### 👥 Equipo

- Efrén Alejandro González Castillo
- Hugo Lares Saucedo
- Eduardo Fierros Solorio
- Rodrigo Alejandro Loza Navarro
- Raymundo Pérez Hernández
- José Luis Quevedo Hernández

---

### 🖼️ Generar el mockup del README

Para obtener la imagen de vista previa (`docs/preview.png`):

1. Abre el sitio en tu navegador: `http://localhost:8000` (o donde lo estés sirviendo).
2. Toma una captura de pantalla de la página completa o del hero.
3. Entra a [Website Mockup Generator](https://websitemockupgenerator.com/).
4. Sube tu captura, elige el marco de navegador/dispositivo que prefieras y exporta la imagen.
5. Guarda el resultado como `docs/preview.png` en este repositorio.

---

<p align="center">
  <b>Mientras nos recuerden, nunca nos iremos</b>
</p>
