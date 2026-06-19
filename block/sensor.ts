// ============================================================================
// CONFIG — Editar SOLO aquí. Sincronizar las líneas //% marcadas con ←CFG
// MakeCode NO interpola variables; las //% deben repetir el valor literal.
// ============================================================================

// --- NAMESPACE ---
const CFG_NS_CODE = "SmartTEAM4" // Nombre del namespace en TypeScript → namespace SmartTEAM4 {
const CFG_NS_BLOCK = "SmartTEAM 4" // Título de la columna en toolbox → //% block="..."
const CFG_NS_COLOR = "#6CACE4" // Color de fondo de la categoría (hex) → //% color="..."
const CFG_NS_ICON = "\\uf1e3" // Icono: nombre PNG sin extensión (16x16/24x24 en icons/) o Font Awesome → //% icon="..."
const CFG_NS_GROUP_POT = "Potentiometer" // Grupo potenciómetro → //% groups=['...'] y //% group="Potentiometer"
const CFG_NS_GROUP_SOIL = "Soil Moisture Sensor" // Grupo humedad suelo → //% groups=['...'] y //% group="Soil Moisture Sensor"

// --- BLOQUES: potenciómetro raw ---
const CFG_BLOCK_POT_RAW_ID = "potentiometer_read_raw" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_POT_RAW_TEXT = "read potentiometer %pin raw value" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_POT_RAW_GROUP = "Potentiometer" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_POT_RAW_WEIGHT = 99 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_POT_RAW_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: potenciómetro % ---
const CFG_BLOCK_POT_PCT_ID = "potentiometer_read_percent" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_POT_PCT_TEXT = "read potentiometer %pin percentage" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_POT_PCT_GROUP = "Potentiometer" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_POT_PCT_WEIGHT = 98 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_POT_PCT_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: humedad raw ---
const CFG_BLOCK_SOIL_RAW_ID = "soil_read_raw" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_SOIL_RAW_TEXT = "read soil moisture %pin raw value" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_SOIL_RAW_GROUP = "Soil Moisture Sensor" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_SOIL_RAW_WEIGHT = 89 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_SOIL_RAW_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

// --- BLOQUES: humedad % ---
const CFG_BLOCK_SOIL_PCT_ID = "soil_read_percent" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_SOIL_PCT_TEXT = "read soil moisture %pin percentage" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_SOIL_PCT_GROUP = "Soil Moisture Sensor" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_SOIL_PCT_WEIGHT = 88 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_SOIL_PCT_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

enum PotPin {
    //% block="P0"
    P0 = AnalogPin.P0,
    //% block="P1"
    P1 = AnalogPin.P1,
    //% block="P2"
    P2 = AnalogPin.P2
}

//% color="#6CACE4" icon="\uf1e3" block="SmartTEAM 4" ←CFG_NS_COLOR, CFG_NS_ICON, CFG_NS_BLOCK
//% groups=['Potentiometer', 'Soil Moisture Sensor'] ←CFG_NS_GROUP_POT, CFG_NS_GROUP_SOIL
namespace SmartTEAM4 { // ←CFG_NS_CODE
    // si CFG_BLOCK_POT_RAW_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_POT_RAW_BLOCKNAMESPACE
    //% blockId=potentiometer_read_raw ←CFG_BLOCK_POT_RAW_ID
    //% block="read potentiometer %pin raw value" ←CFG_BLOCK_POT_RAW_TEXT
    //% group="Potentiometer" weight=99 ←CFG_BLOCK_POT_RAW_GROUP, CFG_BLOCK_POT_RAW_WEIGHT
    export function readPotentiometerRaw(pin: PotPin): number {
        return pins.analogReadPin(pin as number)
    }

    // si CFG_BLOCK_POT_PCT_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_POT_PCT_BLOCKNAMESPACE
    //% blockId=potentiometer_read_percent ←CFG_BLOCK_POT_PCT_ID
    //% block="read potentiometer %pin percentage" ←CFG_BLOCK_POT_PCT_TEXT
    //% group="Potentiometer" weight=98 ←CFG_BLOCK_POT_PCT_GROUP, CFG_BLOCK_POT_PCT_WEIGHT
    export function readPotentiometerPercent(pin: PotPin): number {
        let rawValue = pins.analogReadPin(pin as number)
        let percentage = (rawValue * 100) / 1023
        percentage = Math.min(100, Math.max(0, percentage))
        return Math.round(percentage)
    }

    // si CFG_BLOCK_SOIL_RAW_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_SOIL_RAW_BLOCKNAMESPACE
    //% blockId=soil_read_raw ←CFG_BLOCK_SOIL_RAW_ID
    //% block="read soil moisture %pin raw value" ←CFG_BLOCK_SOIL_RAW_TEXT
    //% group="Soil Moisture Sensor" weight=89 ←CFG_BLOCK_SOIL_RAW_GROUP, CFG_BLOCK_SOIL_RAW_WEIGHT
    export function readSoilMoistureRaw(pin: PotPin): number {
        return pins.analogReadPin(pin as number)
    }

    // si CFG_BLOCK_SOIL_PCT_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_SOIL_PCT_BLOCKNAMESPACE
    //% blockId=soil_read_percent ←CFG_BLOCK_SOIL_PCT_ID
    //% block="read soil moisture %pin percentage" ←CFG_BLOCK_SOIL_PCT_TEXT
    //% group="Soil Moisture Sensor" weight=88 ←CFG_BLOCK_SOIL_PCT_GROUP, CFG_BLOCK_SOIL_PCT_WEIGHT
    export function readSoilMoisturePercent(pin: PotPin): number {
        let rawValue = pins.analogReadPin(pin as number)
        let percentage = (rawValue * 100) / 1023
        percentage = Math.min(100, Math.max(0, percentage))
        return Math.round(percentage)
    }
}
