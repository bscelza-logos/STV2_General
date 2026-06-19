// ============================================================================
// CONFIG — Editar SOLO aquí. Sincronizar las líneas //% marcadas con ←CFG
// MakeCode NO interpola variables; las //% deben repetir el valor literal.
// ============================================================================

// --- NAMESPACE ---
const CFG_NS_CODE = "SmartTEAM4" // Nombre del namespace en TypeScript → namespace SmartTEAM4 {
const CFG_NS_BLOCK = "SmartTEAM 4" // Título de la columna en toolbox → //% block="..."
const CFG_NS_COLOR = "#6CACE4" // Color de fondo de la categoría (hex) → //% color="..."
const CFG_NS_ICON = "\\uf1e3" // Icono: nombre PNG sin extensión (16x16/24x24 en icons/) o Font Awesome → //% icon="..."
const CFG_NS_GROUPS = "Color Sensor" // Nombre del acordeón/grupo → //% groups=['...'] y //% group="..." en cada bloque

// --- BLOQUES: init ---
const CFG_BLOCK_INIT_ID = "init_color_sensor" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_INIT_TEXT = "init color sensor" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_INIT_GROUP = "Color Sensor" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_INIT_WEIGHT = 39 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_INIT_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: detect color ---
const CFG_BLOCK_DETECT_ID = "isColorDetected" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_DETECT_TEXT = "detect color %color?" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_DETECT_GROUP = "Color Sensor" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_DETECT_WEIGHT = 38 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_DETECT_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: brightness ---
const CFG_BLOCK_BRIGHT_ID = "readWhiteValue" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_BRIGHT_TEXT = "read brightness" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_BRIGHT_GROUP = "Color Sensor" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_BRIGHT_WEIGHT = 36 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_BRIGHT_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

const GAIN_R = 1.82 // Ganancia calibración canal rojo (uso interno del sensor, no afecta bloques)
const GAIN_G = 1.5 // Ganancia calibración canal verde (uso interno del sensor, no afecta bloques)
const GAIN_B = 2.4 // Ganancia calibración canal azul (uso interno del sensor, no afecta bloques)

enum DetectedColor {
    //% block="red"
    Red,
    //% block="orange"
    Orange,
    //% block="yellow"
    Yellow,
    //% block="green"
    Green,
    //% block="cyan"
    Cyan,
    //% block="blue"
    Blue,
    //% block="purple"
    Purple,
    //% block="white"
    White,
    //% block="black"
    Black
}

enum RgbChannel {
    //% block="R"
    Red,
    //% block="G"
    Green,
    //% block="B"
    Blue,
}

//% color="#6CACE4" icon="\uf1e3" block="SmartTEAM 4" ←CFG_NS_COLOR, CFG_NS_ICON, CFG_NS_BLOCK
//% groups=['Color Sensor'] ←CFG_NS_GROUPS
namespace SmartTEAM4 { // ←CFG_NS_CODE
    const VEML6040_ADDR = 0x10
    const REG_CONF = 0x00
    const REG_RED = 0x08
    const REG_GREEN = 0x09
    const REG_BLUE = 0x0A
    const REG_WHITE = 0x0B
    const IT_320MS = 0x30
    const AF_AUTO = 0x00
    const SD_ENABLE = 0x00

    let colorSensorInitialized = false
    let cacheR = 0
    let cacheG = 0
    let cacheB = 0
    let cacheW = 0
    let lastReadTime = 0
    const READ_INTERVAL = 320

    function setConfiguration() {
        let buf = pins.createBuffer(3)
        buf[0] = REG_CONF
        buf[1] = IT_320MS | AF_AUTO | SD_ENABLE
        buf[2] = 0
        pins.i2cWriteBuffer(VEML6040_ADDR, buf, false)
    }

    function readReg(reg: number): number {
        let regBuf = pins.createBuffer(1)
        regBuf[0] = reg
        pins.i2cWriteBuffer(VEML6040_ADDR, regBuf, true)
        basic.pause(5)
        let data = pins.i2cReadBuffer(VEML6040_ADDR, 2, false)
        return data[0] | (data[1] << 8)
    }

    function updateRGB() {
        if (!colorSensorInitialized) {
            initColorSensor()
        }

        let now = control.millis()
        if (now - lastReadTime < READ_INTERVAL) return

        let s = readReg(REG_RED)
        let h = readReg(REG_GREEN)
        let c = readReg(REG_BLUE)
        let w = readReg(REG_WHITE)

        if (s == 0 && h == 0 && c == 0 && w == 0) return

        cacheR = s
        cacheG = h
        cacheB = c
        cacheW = w
        lastReadTime = now
    }

    // si CFG_BLOCK_INIT_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_INIT_BLOCKNAMESPACE
    //% blockId=init_color_sensor ←CFG_BLOCK_INIT_ID
    //% block="init color sensor" ←CFG_BLOCK_INIT_TEXT
    //% group="Color Sensor" weight=39 ←CFG_BLOCK_INIT_GROUP, CFG_BLOCK_INIT_WEIGHT
    export function initColorSensor(): void {
        if (!colorSensorInitialized) {
            setConfiguration()
            basic.pause(320)
            colorSensorInitialized = true
        }
    }

    // si CFG_BLOCK_DETECT_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_DETECT_BLOCKNAMESPACE
    //% blockId=isColorDetected ←CFG_BLOCK_DETECT_ID
    //% block="detect color %color?" ←CFG_BLOCK_DETECT_TEXT
    //% group="Color Sensor" weight=38 ←CFG_BLOCK_DETECT_GROUP, CFG_BLOCK_DETECT_WEIGHT
    export function isColorDetected(color: DetectedColor): boolean {
        updateRGB()

        let r = cacheR
        let g = cacheG
        let b = cacheB
        let w = cacheW

        let nr = (r / w) * GAIN_R
        let ng = (g / w) * GAIN_G
        let nb = (b / w) * GAIN_B

        let sum = nr + ng + nb
        nr /= sum
        ng /= sum
        nb /= sum

        let max = max3(nr, ng, nb)
        let min = min3(nr, ng, nb)

        if (max == 0) return false
        let s = 0
        if (max != min) {
            s = (max - min) / max
        }

        if (w < 2500) {
            return color == DetectedColor.Black
        }
        if (s < 0.1) {
            return color == DetectedColor.White
        }

        let h = 0
        if (max == nr) {
            h = 60 * ((ng - nb) / (max - min))
        } else if (max == ng) {
            h = 60 * (2 + (nb - nr) / (max - min))
        } else {
            h = 60 * (4 + (nr - ng) / (max - min))
        }

        if (h < 0) h += 360

        if (color == DetectedColor.Red) {
            if (h < 25 || h >= 345) return true
            return false
        } else if (color == DetectedColor.Orange) {
            if (h >= 25 && h < 45) return true
            return false
        } else if (color == DetectedColor.Yellow) {
            if (h >= 45 && h < 80) return true
            return false
        } else if (color == DetectedColor.Green) {
            if (h >= 80 && h < 180) return true
            return false
        } else if (color == DetectedColor.Cyan) {
            if (h >= 180 && h < 223) return true
            return false
        } else if (color == DetectedColor.Blue) {
            if (h >= 223 && h < 240) return true
            return false
        } else if (color == DetectedColor.Purple) {
            if (h >= 235 && h < 345) return true
            return false
        }
        return false
    }

    // si CFG_BLOCK_BRIGHT_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_BRIGHT_BLOCKNAMESPACE
    //% blockId=readWhiteValue ←CFG_BLOCK_BRIGHT_ID
    //% block="read brightness" ←CFG_BLOCK_BRIGHT_TEXT
    //% group="Color Sensor" weight=36 ←CFG_BLOCK_BRIGHT_GROUP, CFG_BLOCK_BRIGHT_WEIGHT
    export function readWhiteValue(): number {
        updateRGB()

        let nw = Math.round(cacheW * 255 / 65535)
        if (nw > 255) nw = 255
        if (nw < 0) nw = 0
        return nw
    }

    function max3(a: number, b: number, c: number): number {
        let m = a
        if (b > m) m = b
        if (c > m) m = c
        return m
    }

    function min3(a: number, b: number, c: number): number {
        let m = a
        if (b < m) m = b
        if (c < m) m = c
        return m
    }
}
