// ============================================================================
// CONFIG — Editar SOLO aquí. Sincronizar las líneas //% marcadas con ←CFG
// MakeCode NO interpola variables; las //% deben repetir el valor literal.
// ============================================================================

// --- NAMESPACE ---
const CFG_NS_CODE = "SmartTEAM4" // Nombre del namespace en TypeScript → namespace SmartTEAM4 {
const CFG_NS_BLOCK = "SmartTEAM 4" // Título de la columna en toolbox → //% block="..."
const CFG_NS_COLOR = "#6CACE4" // Color de fondo de la categoría (hex) → //% color="..."
const CFG_NS_ICON = "\\uf1e3" // Icono: nombre PNG sin extensión (16x16/24x24 en icons/) o Font Awesome → //% icon="..."
const CFG_NS_GROUPS = "Joystick" // Nombre del acordeón/grupo → //% groups=['...'] y //% group="..." en cada bloque

// --- BLOQUES: init ---
const CFG_BLOCK_INIT_ID = "joystick_init" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_INIT_TEXT = "initialize joystick|X %xPin|Y %yPin|button %swPin" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_INIT_GROUP = "Joystick" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_INIT_WEIGHT = 50 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_INIT_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: read value ---
const CFG_BLOCK_READ_ID = "joystick_read_value" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_READ_TEXT = "read joystick %direction value" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_READ_GROUP = "Joystick" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_READ_WEIGHT = 49 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_READ_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: detect direction ---
const CFG_BLOCK_DIR_ID = "joystick_detect_direction" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_DIR_TEXT = "joystick detects %orientation?" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_DIR_GROUP = "Joystick" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_DIR_WEIGHT = 48 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_DIR_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: button ---
const CFG_BLOCK_BTN_ID = "joystick_button" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_BTN_TEXT = "joystick button pressed?" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_BTN_GROUP = "Joystick" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_BTN_WEIGHT = 47 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_BTN_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

enum JoystickPin {
    //% block="P0"
    P0 = AnalogPin.P0,
    //% block="P1"
    P1 = AnalogPin.P1,
    //% block="P2"
    P2 = AnalogPin.P2
}

enum JoySWPin {
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

enum JoyAxis {
    //% block="X"
    X = 0,
    //% block="Y"
    Y = 1
}

enum JoyDirection {
    //% block="up"
    Up = 1,
    //% block="down"
    Down = 2,
    //% block="left"
    Left = 3,
    //% block="right"
    Right = 4
}

//% color="#6CACE4" icon="\uf1e3" block="SmartTEAM 4" ←CFG_NS_COLOR, CFG_NS_ICON, CFG_NS_BLOCK
//% groups=['Joystick'] ←CFG_NS_GROUPS
namespace SmartTEAM4 { // ←CFG_NS_CODE
    let joyX: JoystickPin
    let joyY: JoystickPin
    let joySW: JoySWPin
    let joystickInitialized = false

    // si CFG_BLOCK_INIT_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_INIT_BLOCKNAMESPACE
    //% blockId=joystick_init ←CFG_BLOCK_INIT_ID
    //% block="initialize joystick|X %xPin|Y %yPin|button %swPin" ←CFG_BLOCK_INIT_TEXT
    //% inlineInputMode=external
    //% xPin.defl=JoystickPin.P0
    //% yPin.defl=JoystickPin.P1
    //% swPin.defl=JoySWPin.P2
    //% group="Joystick" weight=50 ←CFG_BLOCK_INIT_GROUP, CFG_BLOCK_INIT_WEIGHT
    export function initJoystick(xPin: JoystickPin, yPin: JoystickPin, swPin: JoySWPin) {
        joyX = xPin
        joyY = yPin
        joySW = swPin
        pins.setPull(joySW, PinPullMode.PullUp)
        joystickInitialized = true
    }

    // si CFG_BLOCK_READ_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_READ_BLOCKNAMESPACE
    //% blockId=joystick_read_value ←CFG_BLOCK_READ_ID
    //% block="read joystick %direction value" ←CFG_BLOCK_READ_TEXT
    //% group="Joystick" weight=49 ←CFG_BLOCK_READ_GROUP, CFG_BLOCK_READ_WEIGHT
    export function readJoystickValue(direction: JoyAxis): number {
        if (!joystickInitialized) return 0
        if (direction == JoyAxis.X) {
            return pins.analogReadPin(joyX)
        } else {
            return pins.analogReadPin(joyY)
        }
    }

    // si CFG_BLOCK_DIR_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_DIR_BLOCKNAMESPACE
    //% blockId=joystick_detect_direction ←CFG_BLOCK_DIR_ID
    //% block="joystick detects %orientation?" ←CFG_BLOCK_DIR_TEXT
    //% group="Joystick" weight=48 ←CFG_BLOCK_DIR_GROUP, CFG_BLOCK_DIR_WEIGHT
    export function isJoystickDirection(orientation: JoyDirection): boolean {
        if (!joystickInitialized) return false

        let x = pins.analogReadPin(joyX)
        let y = pins.analogReadPin(joyY)
        let center = 512
        let threshold = 200

        if (orientation == JoyDirection.Up) {
            return y < center - threshold
        }
        if (orientation == JoyDirection.Down) {
            return y > center + threshold
        }
        if (orientation == JoyDirection.Left) {
            return x > center + threshold
        }
        if (orientation == JoyDirection.Right) {
            return x < center - threshold
        }
        return false
    }

    // si CFG_BLOCK_BTN_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_BTN_BLOCKNAMESPACE
    //% blockId=joystick_button ←CFG_BLOCK_BTN_ID
    //% block="joystick button pressed?" ←CFG_BLOCK_BTN_TEXT
    //% group="Joystick" weight=47 ←CFG_BLOCK_BTN_GROUP, CFG_BLOCK_BTN_WEIGHT
    export function isJoystickPressed(): boolean {
        if (!joystickInitialized) return false
        return pins.digitalReadPin(joySW) == 0
    }
}
