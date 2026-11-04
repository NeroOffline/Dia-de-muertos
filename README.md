# Entre Flores y Recuerdos

## Para los weyes de mi team

Los homenajes están en `personas.json`. Cada objeto representa un altar:

- `nom`, `apodo`, `f`, `m`, `texto` y `gustos` contienen la información que aparece en la galería y su ventana de homenaje.
- `imagen` es la URL directa del retrato y `fuenteImagen` enlaza a su página de origen o atribución.
- Si `imagen` queda vacía o el enlace falla, se muestra el monograma.
- `mono` son las iniciales para ese monograma y `id` debe ser único.

La página carga `personas.json` con `fetch`, así que debe abrirse desde un servidor web local o de alojamiento (por ejemplo, Live Server), no directamente como archivo `file://`.
