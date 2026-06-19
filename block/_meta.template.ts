/**
 * PLANTILLA — copiar al crear un nuevo archivo en block/
 * Ver README.md → Aclaraciones
 */

// ============================================================================
// CONFIG — Editar SOLO aquí. Sincronizar las líneas //% marcadas con ←CFG
// MakeCode NO interpola variables; las //% deben repetir el valor literal.
// ============================================================================

// --- NAMESPACE ---
const CFG_NS_CODE = "MiNamespace" // Nombre del namespace en TypeScript → namespace MiNamespace {
const CFG_NS_BLOCK = "Mi Categoría" // Título de la columna en toolbox → //% block="..."
const CFG_NS_COLOR = "#6CACE4" // Color de fondo de la categoría (hex) → //% color="..."
const CFG_NS_ICON = "\\uf1e3" // Icono: nombre PNG sin extensión (16x16/24x24 en icons/) o Font Awesome → //% icon="..."
const CFG_NS_GROUPS = "Mi Grupo" // Nombre del acordeón/grupo → //% groups=['...'] y //% group="..." en cada bloque

// --- BLOQUES ---
const CFG_BLOCK_EJEMPLO_ID = "mi_bloque_id" // Identificador único del bloque → //% blockId=...
const CFG_BLOCK_EJEMPLO_TEXT = "mi bloque %valor" // Texto visible; %nombre = hueco del parámetro → //% block="..."
const CFG_BLOCK_EJEMPLO_GROUP = "Mi Grupo" // Grupo/acordeón donde aparece → //% group="..."
const CFG_BLOCK_EJEMPLO_WEIGHT = 10 // Posición vertical (mayor = más arriba) → //% weight=N
const CFG_BLOCK_EJEMPLO_BLOCKNAMESPACE = "" // Categoría nativa micro:bit; ""=propia (CFG_NS_BLOCK). Con valor → //% blockNamespace=VALOR. "input"=Entradas, "basic"=Básico, "led"=LED, "pins"=Pines, "music"=Música, "radio"=Radio, "logic"=Lógica, "loops"=Bucles, "variables"=Variables, "math"=Matemática, "functions"=Funciones

//% color="#6CACE4" icon="\uf1e3" block="Mi Categoría" ←CFG_NS_COLOR, CFG_NS_ICON, CFG_NS_BLOCK
//% groups=['Mi Grupo'] ←CFG_NS_GROUPS
namespace MiNamespace { // ←CFG_NS_CODE
    // si CFG_BLOCK_EJEMPLO_BLOCKNAMESPACE != "": //% blockNamespace=VALOR ←CFG_BLOCK_EJEMPLO_BLOCKNAMESPACE
    //% blockId=mi_bloque_id ←CFG_BLOCK_EJEMPLO_ID
    //% block="mi bloque %valor" ←CFG_BLOCK_EJEMPLO_TEXT
    //% group="Mi Grupo" weight=10 ←CFG_BLOCK_EJEMPLO_GROUP, CFG_BLOCK_EJEMPLO_WEIGHT
    //% valor.defl=0
    export function miBloque(valor: number): void {
        // lógica...
    }
}
