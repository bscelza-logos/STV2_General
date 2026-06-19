// ============================================================================
// CONFIG — Editar SOLO aquí. Sincronizar las líneas //% marcadas con ←CFG
// MakeCode NO interpola variables; las //% deben repetir el valor literal.
// ============================================================================

// --- NAMESPACE ---
const CFG_NS_CODE = "sensoresLibro4" // Nombre del namespace en TypeScript → namespace sensoresLibro4 {
const CFG_NS_BLOCK = "Sensores Libro 4" // Título de la columna en toolbox → //% block="..."
const CFG_NS_COLOR = "#4CAF50" // Color de fondo de la categoría (hex) → //% color="..."
const CFG_NS_ICON = "\\uf1eb" // Icono: nombre PNG sin extensión (16x16/24x24 en icons/) o Font Awesome → //% icon="..."
const CFG_NS_GROUPS = "Ultrasonido" // Nombre del acordeón/grupo → //% groups=['...'] y //% group="..." en cada bloque

// --- BLOQUES: init ---
const CFG_BLOCK_INIT_ID = "ultrasonic_init" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_INIT_TEXT = "init ultrasonic|Trig %trig|Echo %echo" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_INIT_GROUP = "Ultrasonido" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_INIT_WEIGHT = 9 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_INIT_BLOCKNAMESPACE = "input" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: distance ---
const CFG_BLOCK_DISTANCE_ID = "ultrasonic_read_distance" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_DISTANCE_TEXT = "read distance (cm)" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_DISTANCE_GROUP = "Ultrasonido" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_DISTANCE_WEIGHT = 8 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_DISTANCE_BLOCKNAMESPACE = "input" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

enum UltrasonicPin {
    //% block="P0"
    P0 = DigitalPin.P0,
    //% block="P1"
    P1 = DigitalPin.P1,
    //% block="P2"
    P2 = DigitalPin.P2,
    //% block="P8"
    P8 = DigitalPin.P8,
    //% block="P12"
    P12 = DigitalPin.P12,
    //% block="P13"
    P13 = DigitalPin.P13,
    //% block="P15"
    P15 = DigitalPin.P15,
    //% block="P16"
    P16 = DigitalPin.P16
}

//% color="#4CAF50" icon="\uf1eb" block="Sensores Libro 4" ←CFG_NS_COLOR, CFG_NS_ICON, CFG_NS_BLOCK
//% groups=['Ultrasonido'] ←CFG_NS_GROUPS
namespace sensoresLibro4 { // ←CFG_NS_CODE
    let trigPin: UltrasonicPin
    let echoPin: UltrasonicPin
    let ultrasonicInitialized = false

    //% blockNamespace=input ←CFG_BLOCK_INIT_BLOCKNAMESPACE
    //% blockId=ultrasonic_init ←CFG_BLOCK_INIT_ID
    //% block="init ultrasonic|Trig %trig|Echo %echo" ←CFG_BLOCK_INIT_TEXT
    //% inlineInputMode=external
    //% trig.defl=UltrasonicPin.P0
    //% echo.defl=UltrasonicPin.P1
    //% group="Ultrasonido" weight=9 ←CFG_BLOCK_INIT_GROUP, CFG_BLOCK_INIT_WEIGHT
    export function initUltrasonic(trig: UltrasonicPin, echo: UltrasonicPin): void {
        trigPin = trig
        echoPin = echo
        ultrasonicInitialized = true
        pins.digitalWritePin(trigPin, 0)
        pins.setPull(echoPin, PinPullMode.PullNone)
    }

    //% blockNamespace=input ←CFG_BLOCK_DISTANCE_BLOCKNAMESPACE
    //% blockId=ultrasonic_read_distance ←CFG_BLOCK_DISTANCE_ID
    //% block="read distance (cm)" ←CFG_BLOCK_DISTANCE_TEXT
    //% group="Ultrasonido" weight=8 ←CFG_BLOCK_DISTANCE_GROUP, CFG_BLOCK_DISTANCE_WEIGHT
    export function readDistance(): number {
        if (!ultrasonicInitialized) {
            return 0
        }

        pins.digitalWritePin(trigPin, 0)
        basic.pause(1)
        pins.digitalWritePin(trigPin, 1)
        control.waitMicros(50)
        pins.digitalWritePin(trigPin, 0)

        let duration = pins.pulseIn(echoPin, PulseValue.High, 50000)
        let distance = duration * 0.034 / 2 * 1.0

        if (distance < 2 || distance > 400) {
            distance = 0
        }

        return Math.round(distance)
    }
}
