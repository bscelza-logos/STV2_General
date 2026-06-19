// ============================================================================
// CONFIG — Enums compartidos de pines (no define bloques visibles)
// Usar estos enums como tipo de parámetro en los bloques de otros archivos.
// ============================================================================

/** Pines digitales disponibles en micro:bit */
enum DigitalPins {
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

/** Pines analógicos disponibles en micro:bit */
enum AnalogPins {
    //% block="P0"
    P0 = AnalogPin.P0,
    //% block="P1"
    P1 = AnalogPin.P1,
    //% block="P2"
    P2 = AnalogPin.P2
}
