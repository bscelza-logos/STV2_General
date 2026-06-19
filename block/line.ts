// ============================================================================
// CONFIG — Editar SOLO aquí. Sincronizar las líneas //% marcadas con ←CFG
// MakeCode NO interpola variables; las //% deben repetir el valor literal.
// ============================================================================

// --- NAMESPACE ---
const CFG_NS_CODE = "SmartTEAM4" // Nombre del namespace en TypeScript → namespace SmartTEAM4 {
const CFG_NS_BLOCK = "SmartTEAM 4" // Título de la columna en toolbox → //% block="..."
const CFG_NS_COLOR = "#6CACE4" // Color de fondo de la categoría (hex) → //% color="..."
const CFG_NS_ICON = "\\uf1e3" // Icono: nombre PNG sin extensión (16x16/24x24 en icons/) o Font Awesome → //% icon="..."
const CFG_NS_GROUPS = "Line Tracking Sensor" // Nombre del acordeón/grupo → //% groups=['...'] y //% group="..." en cada bloque

// --- BLOQUES: init ---
const CFG_BLOCK_INIT_ID = "linetracking_init" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_INIT_TEXT = "init line sensors|left %left|middle %middle|right %right" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_INIT_GROUP = "Line Tracking Sensor" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_INIT_WEIGHT = 59 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_INIT_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: detect ---
const CFG_BLOCK_DETECT_ID = "linetracking_detect" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_DETECT_TEXT = "%position sensor detects black line?" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_DETECT_GROUP = "Line Tracking Sensor" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_DETECT_WEIGHT = 58 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_DETECT_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: read ---
const CFG_BLOCK_READ_ID = "linetracking_read_value" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_READ_TEXT = "read %position sensor value" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_READ_GROUP = "Line Tracking Sensor" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_READ_WEIGHT = 57 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_READ_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

enum LineSensorPin {
    //% block="P0" weight=10
    P0 = DigitalPin.P0,
    //% block="P1" weight=9
    P1 = DigitalPin.P1,
    //% block="P2" weight=8
    P2 = DigitalPin.P2,
    //% block="P8" weight=7
    P8 = DigitalPin.P8,
    //% block="P12" weight=6
    P12 = DigitalPin.P12,
    //% block="P13" weight=5
    P13 = DigitalPin.P13,
    //% block="P15" weight=4
    P15 = DigitalPin.P15,
    //% block="P16" weight=3
    P16 = DigitalPin.P16
}

enum SensorSide {
    //% block="left"
    Left = 1,
    //% block="middle"
    Middle = 2,
    //% block="right"
    Right = 3
}

//% color="#6CACE4" icon="\uf1e3" block="SmartTEAM 4" ←CFG_NS_COLOR, CFG_NS_ICON, CFG_NS_BLOCK
//% groups=['Line Tracking Sensor'] ←CFG_NS_GROUPS
namespace SmartTEAM4 { // ←CFG_NS_CODE
    let leftPin: LineSensorPin
    let middlePin: LineSensorPin
    let rightPin: LineSensorPin
    let lineTrackingInitialized = false

    let pinMap: { [key: number]: LineSensorPin } = {
        1: LineSensorPin.P0,
        2: LineSensorPin.P1,
        3: LineSensorPin.P2
    }

    // si CFG_BLOCK_INIT_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_INIT_BLOCKNAMESPACE
    //% blockId=linetracking_init ←CFG_BLOCK_INIT_ID
    //% block="init line sensors|left %left|middle %middle|right %right" ←CFG_BLOCK_INIT_TEXT
    //% inlineInputMode=external
    //% left.defl=LineSensorPin.P0
    //% middle.defl=LineSensorPin.P1
    //% right.defl=LineSensorPin.P2
    //% group="Line Tracking Sensor" weight=59 ←CFG_BLOCK_INIT_GROUP, CFG_BLOCK_INIT_WEIGHT
    export function initSensors(left: LineSensorPin, middle: LineSensorPin, right: LineSensorPin): void {
        pinMap[1] = left as number
        pinMap[2] = middle as number
        pinMap[3] = right as number
        pins.setPull(pinMap[1], PinPullMode.PullNone)
        pins.setPull(pinMap[2], PinPullMode.PullNone)
        pins.setPull(pinMap[3], PinPullMode.PullNone)
        lineTrackingInitialized = true
    }

    // si CFG_BLOCK_DETECT_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_DETECT_BLOCKNAMESPACE
    //% blockId=linetracking_detect ←CFG_BLOCK_DETECT_ID
    //% block="%position sensor detects black line?" ←CFG_BLOCK_DETECT_TEXT
    //% group="Line Tracking Sensor" weight=58 ←CFG_BLOCK_DETECT_GROUP, CFG_BLOCK_DETECT_WEIGHT
    export function detectLine(position: SensorSide): boolean {
        if (!lineTrackingInitialized) return false
        let pin = pinMap[position]
        return pins.digitalReadPin(pin) === 1
    }

    // si CFG_BLOCK_READ_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_READ_BLOCKNAMESPACE
    //% blockId=linetracking_read_value ←CFG_BLOCK_READ_ID
    //% block="read %position sensor value" ←CFG_BLOCK_READ_TEXT
    //% group="Line Tracking Sensor" weight=57 ←CFG_BLOCK_READ_GROUP, CFG_BLOCK_READ_WEIGHT
    export function readSensorValue(position: SensorSide): number {
        if (!lineTrackingInitialized) return 0
        let pin = pinMap[position]
        basic.pause(10)
        return pins.digitalReadPin(pin)
    }
}
