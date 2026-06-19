
> Extensión general de desarrollo SmartTEAM para micro:bit.

## Propósito

Este repositorio concentra **todos los bloques** SmartTEAM para desarrollo y pruebas locales.

Las extensiones publicadas por separado (EXT1–EXT9, SALIDAS, etc.) se derivarán de aquí y se publicarán en repositorios GitHub independientes.

## Estructura

```
ST_GENERAL/
├── main.ts          # Bloques principales (Motion, Motor, Servo, LED Strip)
├── main.blocks      # Proyecto MakeCode base
├── pxt.json         # Configuración de la extensión
├── block/           # Bloques por módulo
│   ├── cantidad.ts
│   ├── sensor.ts
│   ├── ultrasonic.ts
│   ├── veml6040.ts
│   ├── joystick.ts
│   ├── line.ts
│   ├── lcd1602.ts
│   └── pins.ts      # Enums de pines compartidos
├── icons/           # Iconos PNG personalizados (opcional)
└── test.ts
```

## Uso local

1. Abrir [MakeCode micro:bit](https://makecode.microbit.org/)
2. **Import** → **Import URL**
3. Importar desde la ruta local o el repositorio GitHub de ST_GENERAL

## Editar

* Abrir el proyecto en MakeCode o editar los archivos `.ts` directamente.
* Compilar con `pxt build` (requiere [PXT CLI](https://makecode.com/cli)).

## Aclaraciones

MakeCode **no lee variables TypeScript** en las anotaciones `//%`. Los bloques se configuran con comentarios especiales encima del `namespace`, del `enum` o de cada `export function`.

Cada archivo en `block/` incluye una sección **CONFIG** al inicio como panel de control. Tras editar CONFIG, hay que **copiar los mismos valores literales** a las líneas `//%` marcadas con `←CFG`.

Las constantes `CFG_*` **no se usan en el código de ejecución** — MakeCode las ignora. Son la fuente de verdad para ti; las líneas `//%` son las que MakeCode lee.

### Estructura CONFIG

```typescript
// --- NAMESPACE ---
const CFG_NS_CODE = "SmartTEAM4"       // namespace SmartTEAM4 { ... }
const CFG_NS_BLOCK = "SmartTEAM 4"       // //% block="..."
const CFG_NS_COLOR = "#6CACE4"           // //% color="..."
const CFG_NS_ICON = "joystick"           // //% icon="..." (PNG o Font Awesome)
const CFG_NS_GROUPS = "Joystick"         // //% groups=['...']

// --- BLOQUES ---
const CFG_BLOCK_INIT_ID = "joystick_init"
const CFG_BLOCK_INIT_TEXT = "initialize joystick|..."
const CFG_BLOCK_INIT_GROUP = "Joystick"
const CFG_BLOCK_INIT_WEIGHT = 50
const CFG_BLOCK_INIT_BLOCKNAMESPACE = "" // blockNamespace: "" = categoría propia | "input" = Entradas → //% blockNamespace=input
```

### Dónde editar cada campo

| Campo | Dónde se edita | Ejemplo |
|-------|----------------|---------|
| **Categoría nativa micro:bit** | `CFG_BLOCK_*_BLOCKNAMESPACE` + `//% blockNamespace=...` en el bloque | `"input"` → Entradas |
| **Texto del bloque** | `//% block="..."` encima de `export function` | `//% block="read distance (cm)"` |
| **Desplegables (pines, etc.)** | `enum` + `//% block="P0"` en cada valor | `enum UltrasonicPin { //% block="P0" P0 = ... }` |
| **Color de categoría** | `//% color="#RRGGBB"` en la línea del **namespace** | `//% color="#6CACE4"` |
| **Nombre de categoría** | `//% block="..."` en la línea del **namespace** | `//% block="SmartTEAM 4"` |
| **Grupo (subsección)** | `//% group="..."` en **cada bloque** | `//% group="Joystick"` |
| **Orden de grupos** | `//% groups=[...]` en el **namespace** | `//% groups=['Joystick']` |
| **Icono de categoría** | `//% icon="..."` en el **namespace** | `//% icon="\uf1e3"` |
| **Icono de un bloque** | `//% blockIcon="..."` encima del bloque (opcional) | `//% blockIcon="ultrasonic"` |
| **Orden del bloque** | `//% weight=N` (mayor = más arriba) | `//% weight=50` |

### Categoría nativa vs categoría propia

- **Categoría propia** (`CFG_NS_BLOCK`): dejar `CFG_BLOCK_*_BLOCKNAMESPACE = ""` y no añadir `//% blockNamespace`.
- **Categoría nativa** (Entradas, Básico, LED…): poner el valor en CONFIG y añadir la línea en el bloque:

```typescript
const CFG_BLOCK_DISTANCE_BLOCKNAMESPACE = "input" // blockNamespace: ... (ver comentario en la línea)

//% blockNamespace=input ←CFG_BLOCK_DISTANCE_BLOCKNAMESPACE
//% blockId=ultrasonic_read_distance
```

Valores habituales: `input`=Entradas, `basic`=Básico, `led`=LED, `pins`=Pines, `music`=Música, `radio`=Radio, `logic`=Lógica, `loops`=Bucles, `variables`=Variables, `math`=Matemática, `functions`=Funciones.

### Categoría vs grupo

- **Categoría** = columna del toolbox de MakeCode. La define el `namespace` con `//% block="Nombre"`.
- **Grupo** = acordeón dentro de esa categoría. Lo define `//% group="..."` en cada bloque.

Ejemplo en `block/ultrasonic.ts`:

```typescript
//% color="#4CAF50" icon="\uf1eb" block="Sensores Libro 4"
//% groups=['Ultrasonido']
namespace sensoresLibro4 {
    //% blockId=ultrasonic_init
    //% block="init ultrasonic|Trig %trig|Echo %echo"
    //% group="Ultrasonido" weight=9
    export function initUltrasonic(...) { }
}
```

### Iconos

MakeCode admite dos tipos de icono:

#### 1. Font Awesome (rápido, sin archivos)

En la línea del `namespace`:

```typescript
//% icon="\uf1e3" block="SmartTEAM 4"
```

Busca códigos en [Font Awesome 4](https://fontawesome.com/v4/icons/) (formato `\uXXXX`).

#### 2. Imagen PNG personalizada

1. Coloca PNG de **16×16** o **24×24** px en la carpeta `icons/` (ej. `ultrasonic.png`).
2. Añade `icons.jres` al array `"files"` de `pxt.json` (se genera al compilar con PXT CLI).
3. Referencia el icono por nombre (sin extensión):

```typescript
//% color="#4CAF50" icon="ultrasonic" block="Sensores Libro 4"
namespace sensoresLibro4 {
    //% blockIcon="ultrasonic"
    //% block="init ultrasonic"
    export function initUltrasonic() { }
}
```

- `icon` → icono de la **categoría** (columna del toolbox).
- `blockIcon` → icono del **bloque individual** (opcional).

Ver también `icons/README.md` y la plantilla `block/_meta.template.ts`.

#### Metadata

* SmartTEAM General — PXT/microbit extension
