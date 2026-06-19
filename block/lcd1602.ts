// ============================================================================
// CONFIG — Editar SOLO aquí. Sincronizar las líneas //% marcadas con ←CFG
// MakeCode NO interpola variables; las //% deben repetir el valor literal.
// ============================================================================

// --- NAMESPACE ---
const CFG_NS_CODE = "SmartTEAM4" // Nombre del namespace en TypeScript → namespace SmartTEAM4 {
const CFG_NS_BLOCK = "SmartTEAM 4" // Título de la columna en toolbox → //% block="..."
const CFG_NS_COLOR = "#6CACE4" // Color de fondo de la categoría (hex) → //% color="..."
const CFG_NS_ICON = "\\uf1e3" // Icono: nombre PNG sin extensión (16x16/24x24 en icons/) o Font Awesome → //% icon="..."
const CFG_NS_GROUPS = "LCD1602" // Nombre del acordeón/grupo → //% groups=['...'] y //% group="..." en cada bloque

// --- BLOQUES: init ---
const CFG_BLOCK_INIT_ID = "lcd1602_init" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_INIT_TEXT = "init LCD1602" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_INIT_GROUP = "LCD1602" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_INIT_WEIGHT = 100 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_INIT_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: clear ---
const CFG_BLOCK_CLEAR_ID = "lcd1602_clear" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_CLEAR_TEXT = "clear display" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_CLEAR_GROUP = "LCD1602" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_CLEAR_WEIGHT = 99 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_CLEAR_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: show line ---
const CFG_BLOCK_LINE_ID = "lcd1602_show_line" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_LINE_TEXT = "show %text at row %row col %col" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_LINE_GROUP = "LCD1602" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_LINE_WEIGHT = 98 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_LINE_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: show number ---
const CFG_BLOCK_NUM_ID = "lcd1602_show_number" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_NUM_TEXT = "show number %num at row %row col %col" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_NUM_GROUP = "LCD1602" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_NUM_WEIGHT = 97 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_NUM_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: backlight ---
const CFG_BLOCK_BL_ID = "lcd1602_backlight" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_BL_TEXT = "set backlight %state" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_BL_GROUP = "LCD1602" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_BL_WEIGHT = 96 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_BL_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

enum LcdBacklight {
    //% block="on"
    On = 1,
    //% block="off"
    Off = 0
}

//% color="#6CACE4" icon="\uf1e3" block="SmartTEAM 4" ←CFG_NS_COLOR, CFG_NS_ICON, CFG_NS_BLOCK
//% groups=['LCD1602'] ←CFG_NS_GROUPS
namespace SmartTEAM4 { // ←CFG_NS_CODE
    const LCD_ADDR = 0x20
    const LCD_INTERVAL = 150
    let backlight = 0x08
    let lastUpdateTime = 0

    function write4bits(value: number) {
        let buf = pins.createBuffer(3)
        buf[0] = value | backlight
        buf[1] = value | backlight | 0x04
        buf[2] = value | backlight
        pins.i2cWriteBuffer(LCD_ADDR, buf)
    }

    function send(value: number, mode: number) {
        let rs = mode ? 0x01 : 0x00
        let high = (value & 0xF0) | backlight | rs
        let low = ((value << 4) & 0xF0) | backlight | rs
        write4bits(high)
        write4bits(low)
    }

    function command(cmd: number) {
        send(cmd, 0)
    }

    function data(d: number) {
        send(d, 1)
    }

    function setCursor(col: number, row: number) {
        let row_offsets = [0x00, 0x40]
        command(0x80 | (col + row_offsets[row]))
    }

    // si CFG_BLOCK_INIT_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_INIT_BLOCKNAMESPACE
    //% blockId=lcd1602_init ←CFG_BLOCK_INIT_ID
    //% block="init LCD1602" ←CFG_BLOCK_INIT_TEXT
    //% group="LCD1602" weight=100 ←CFG_BLOCK_INIT_GROUP, CFG_BLOCK_INIT_WEIGHT
    export function lcd1602_init() {
        basic.pause(50)
        write4bits(0x30)
        basic.pause(5)
        write4bits(0x30)
        basic.pause(1)
        write4bits(0x30)
        write4bits(0x20)
        command(0x28)
        command(0x0C)
        command(0x06)
        command(0x01)
        basic.pause(5)
    }

    // si CFG_BLOCK_CLEAR_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_CLEAR_BLOCKNAMESPACE
    //% blockId=lcd1602_clear ←CFG_BLOCK_CLEAR_ID
    //% block="clear display" ←CFG_BLOCK_CLEAR_TEXT
    //% group="LCD1602" weight=99 ←CFG_BLOCK_CLEAR_GROUP, CFG_BLOCK_CLEAR_WEIGHT
    export function lcd1602_clear() {
        command(0x01)
        basic.pause(2)
    }

    // si CFG_BLOCK_LINE_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_LINE_BLOCKNAMESPACE
    //% blockId=lcd1602_show_line ←CFG_BLOCK_LINE_ID
    //% block="show %text at row %row col %col" ←CFG_BLOCK_LINE_TEXT
    //% text.defl="hello"
    //% row.min=0 row.max=1 row.defl=0
    //% col.min=0 col.max=15 col.defl=0
    //% group="LCD1602" weight=98 ←CFG_BLOCK_LINE_GROUP, CFG_BLOCK_LINE_WEIGHT
    export function showAt(text: string, row: number, col: number) {
        let now = control.millis()
        if (now - lastUpdateTime < LCD_INTERVAL) return
        setCursor(col, row)
        for (let i = 0; i < text.length; i++) {
            data(text.charCodeAt(i))
        }
    }

    // si CFG_BLOCK_NUM_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_NUM_BLOCKNAMESPACE
    //% blockId=lcd1602_show_number ←CFG_BLOCK_NUM_ID
    //% block="show number %num at row %row col %col" ←CFG_BLOCK_NUM_TEXT
    //% num.defl=0
    //% row.min=0 row.max=1 row.defl=0
    //% col.min=0 col.max=15 col.defl=0
    //% group="LCD1602" weight=97 ←CFG_BLOCK_NUM_GROUP, CFG_BLOCK_NUM_WEIGHT
    export function showNumber(num: number, row: number, col: number) {
        showAt(num.toString(), row, col)
    }

    // si CFG_BLOCK_BL_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_BL_BLOCKNAMESPACE
    //% blockId=lcd1602_backlight ←CFG_BLOCK_BL_ID
    //% block="set backlight %state" ←CFG_BLOCK_BL_TEXT
    //% group="LCD1602" weight=96 ←CFG_BLOCK_BL_GROUP, CFG_BLOCK_BL_WEIGHT
    export function setBacklight(state: LcdBacklight) {
        backlight = state == LcdBacklight.On ? 0x08 : 0x00
        command(0)
    }
}
