# Iconos de bloques SmartTEAM

MakeCode admite dos tipos de icono:

## 1. Font Awesome (rápido, sin archivos)

En la línea del `namespace`:

```typescript
//% icon="\uf1e3" block="SmartTEAM 4"
```

Busca códigos en [Font Awesome 4](https://fontawesome.com/v4/icons/) (formato `\uXXXX`).

## 2. Imagen PNG personalizada

1. Coloca PNG de **16×16** o **24×24** px en esta carpeta (ej. `ultrasonic.png`).
2. Añade `icons.jres` al array `"files"` de `pxt.json` (se genera al compilar con PXT CLI).
3. Referencia el icono por nombre (sin extensión):

```typescript
//% color="#6CACE4" icon="ultrasonic" block="Sensores"
namespace sensoresLibro4 {
    //% blockIcon="ultrasonic"
    //% block="init ultrasonic"
    export function initUltrasonic() { }
}
```

- `icon` → icono de la **categoría** (columna del toolbox).
- `blockIcon` → icono del **bloque individual** (opcional).
