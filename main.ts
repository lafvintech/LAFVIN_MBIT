/*
Copyright (C): 2010-2019,
load dependency
"mbit": "file:../pxt-mbit"
*/




/*****************************************************************************************************************************************
 *  小车类 ***************************************************************************************************************************** 
 ****************************************************************************************************************************************/

//% color="#430fbb" weight=25 icon="\uf2db"
namespace LA_MBitCar {

    const PCA9685_ADD = 0x41
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04

    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const PRESCALE = 0xFE

    let initialized = false
    let yahStrip: neopixel.Strip;

    export enum enColor {

        //% blockId="OFF" block="Off"
        OFF = 0,
        //% blockId="Red" block="Red"
        Red,
        //% blockId="Green" block="Green"
        Green,
        //% blockId="Blue" block="Blue"
        Blue,   
        //% blockId="White" block="White"
        White,
        //% blockId="Cyan" block="Cyan"
        Cyan,
        //% blockId="Pinkish" block="Pinkish"
        Pinkish,
        //% blockId="Yellow" block="Yellow"
        Yellow,

    }
    export enum enMusic {

        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }
    export enum enPos {

        //% blockId="LeftState" block="LeftState"
        LeftState = 0,
        //% blockId="RightState" block="RightState"
        RightState = 1
    }

    export enum enLineState {
        //% blockId="White" block="White"
        White = 0,
        //% blockId="Black" block="Black"
        Black = 1
    }
    
    export enum enServo {
        
        S1 = 1,
        S2,
        S3
    }
    export enum CarState {
        //% blockId="Car_Run" block="Forward"
        Car_Run = 1,
        //% blockId="Car_Back" block="Backward"
        Car_Back = 2,
        //% blockId="Car_Left" block="Left"
        Car_Left = 3,
        //% blockId="Car_Right" block="Right"
        Car_Right = 4,
        //% blockId="Car_Stop" block="Stop"
        Car_Stop = 5,
        //% blockId="Car_SpinLeft" block="Rotate Left"
        Car_SpinLeft = 6,
        //% blockId="Car_SpinRight" block="Rotate Right"
        Car_SpinRight = 7
    }

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }


    function Car_run(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }

        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P16, 1);
       // pins.analogWritePin(AnalogPin.P1, 1023-speed); //速度控制

       // pins.analogWritePin(AnalogPin.P0, speed);//速度控制
       // pins.digitalWritePin(DigitalPin.P8, 0);
    }

    function Car_back(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        setPwm(12, 0, 0);
        setPwm(13, 0, speed1);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed2);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed); //速度控制

        //pins.analogWritePin(AnalogPin.P0, 1023 - speed);//速度控制
        //pins.digitalWritePin(DigitalPin.P8, 1);
    }

    function Car_left(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_right(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 1);
       // pins.analogWritePin(AnalogPin.P1, 1023 - speed);
    }

    function Car_stop() {
       
        setPwm(12, 0, 0);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);
        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_spinleft(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }        
        
        setPwm(12, 0, 0);
        setPwm(13, 0, speed1);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed);
    } 

    function Car_spinright(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }      
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed2);
        //pins.analogWritePin(AnalogPin.P0, 1023-speed);
        //pins.digitalWritePin(DigitalPin.P8, 1);

        //pins.digitalWritePin(DigitalPin.P16, 1);
        //pins.analogWritePin(AnalogPin.P1, 1023-speed);

    }

    /**
     * *****************************************************************
     * @param index
     */
    //% blockId=mbit_RGB_Car_Big2 block="RGB_Car_Searchlights|Colors %value"
    //% weight=89
    //% blockGap=15
    //% color="#e61919"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big2(value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Red: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Green: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Blue: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.White: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Cyan: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Pinkish: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Yellow: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
        }
    }
    //% blockId=mbit_RGB_Car_Big block="RGB_Car_Searchlights|Red %value1|Green %value2|Blue %value3"
    //% weight=88
    //% blockGap=15
    //% color="#e61919"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big(value1: number, value2: number, value3: number): void {

        let R = value1 * 16;
        let G = value2 * 16;
        let B = value3 * 16;

        if (R > 4096)
            R = 4095;
        if (G > 4096)
            G = 4095;
        if (B > 4096)
            B = 4095;

        setPwm(0, 0, R);
        setPwm(1, 0, G);
        setPwm(2, 0, B);

    }

    //% blockId=mbit_RGB_Car_Program block="Atmospheric light strip"
    //% weight=90
    //% blockGap=15
    //% color="#e61919"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Program(): neopixel.Strip {
         
        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB);
        }
        return yahStrip;  
    }


    //% blockId=mbit_Music_Car block="Music_Car|%index"
    //% weight=97
    //% blockGap=15
    //% color="#f5550c"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Car(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
    //% blockId=mbit_Servo_Car block="Servo_Car|num %num|Angle %value"
    //% weight=96
    //% blockGap=15
    //% color="#006400"
    //% num.min=1 num.max=3 value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo_Car(num: enServo, value: number): void {

        // 50hz: 20,000 us
        let us = (value * 1800 / 180 + 600); // 0.6 ~ 2.4
        let pwm = us * 4096 / 20000;
        setPwm(num + 2, 0, pwm);

    }
    
    //% blockId=mbit_Line_Sensor block="Line_Sensor|direct %direct|Detection %value"
    //% weight=91
    //% blockGap=15
    //% color="#096ef1"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Line_Sensor(direct: enPos, value: enLineState): boolean {

        let temp: boolean = false;

        switch (direct) {
            case enPos.LeftState: {
                if (pins.digitalReadPin(DigitalPin.P12) < 1) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(7, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(7, 0, 0);
                }
                break;
            }

            case enPos.RightState: {
                if (pins.digitalReadPin(DigitalPin.P13) < 1) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(6, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(6, 0, 0);
                }
                break;
            }
        }
        return temp;

    }
    //% blockId=mbit_CarCtrl block="CarCtrl|%index"
    //% weight=100
    //% blockGap=15
    //% color="#2908df"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrl(index: CarState): void {
        switch (index) {
            case CarState.Car_Run: Car_run(255, 255); break;
            case CarState.Car_Back: Car_back(255, 255); break;
            case CarState.Car_Left: Car_left(0, 255); break;
            case CarState.Car_Right: Car_right(255, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(255, 255); break;
            case CarState.Car_SpinRight: Car_spinright(255, 255); break;
        }
    }
    //% blockId=mbit_CarCtrlSpeed block="CarCtrl|%index|speed %speed"
    //% weight=99
    //% blockGap=15
    //% speed.min=0 speed.max=255
    //% color="#2908df"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed(index: CarState, speed: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed, speed); break;
            case CarState.Car_Back: Car_back(speed, speed); break;
            case CarState.Car_Left: Car_left(0, speed); break;
            case CarState.Car_Right: Car_right(speed, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed, speed); break;
            case CarState.Car_SpinRight: Car_spinright(speed, speed); break;
        }
    }
    //% blockId=mbit_CarCtrlSpeed2 block="CarCtrl|%index|Lmotor %speed1|Rmotor %speed2"
    //% weight=98
    //% blockGap=15
    //% speed1.min=0 speed1.max=255 speed2.min=0 speed2.max=255
    //% color="#2908df"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed2(index: CarState, speed1: number, speed2: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed1, speed2); break;
            case CarState.Car_Back: Car_back(speed1, speed2); break;
            case CarState.Car_Left: Car_left(0, speed2); break;
            case CarState.Car_Right: Car_right(speed1, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed1, speed2); break;
            case CarState.Car_SpinRight: Car_spinright(speed1, speed2); break;
        }
    }
 
    // MakerBit 红外功能（合并到 mbit_Smartcar）
    export const enum IrButton {
        //% block="any"
        Any = -1,
        Up = 0x62,
        LEFT = 0x22,
        RIGHT = 0xc2,
        NUM3 = 0xb0,
        OK = 0x02,
        NUM2 = 0x98,
        Down = 0xa8,
        NUM1 = 0x68,
        NUM4 = 0x30,
        NUM5 = 0x18,
        NUM6 = 0x7a,
        NUM7 = 0x10,
        NUM8 = 0x38,
        NUM9 = 0x5a,
        STAR = 0x42,
        NUM0 = 0x4a,
        GRID = 0x52
    }

    export const enum IrButtonAction {
        //% block="pressed"
        Pressed = 0,
        //% block="released"
        Released = 1,
    }

    export const enum IrProtocol {
        //% block="Keyestudio"
        Keyestudio = 0,
        //% block="NEC"
        NEC = 1,
    }

    let irState: IrState;

    const IR_REPEAT = 256;
    const IR_INCOMPLETE = 257;
    const IR_DATAGRAM = 258;

    const REPEAT_TIMEOUT_MS = 120;

    interface IrState {
        protocol: IrProtocol;
        hasNewDatagram: boolean;
        bitsReceived: number;
        addressSectionBits: number;
        commandSectionBits: number;
        hiword: number;
        loword: number;
        activeCommand: number;
        repeatTimeout: number;
        onIrButtonPressed: IrButtonHandler[];
        onIrButtonReleased: IrButtonHandler[];
        onIrDatagram: () => void;
    }

    class IrButtonHandler {
        irButton: IrButton;
        onEvent: () => void;

        constructor(
            irButton: IrButton,
            onEvent: () => void
        ) {
            this.irButton = irButton;
            this.onEvent = onEvent;
        }
    }

    function appendBitToDatagram(bit: number): number {
        irState.bitsReceived += 1;

        if (irState.bitsReceived <= 8) {
            irState.hiword = (irState.hiword << 1) + bit;
            if (irState.protocol === IrProtocol.Keyestudio && bit === 1) {
                irState.bitsReceived = 9;
                irState.hiword = 1;
            }
        } else if (irState.bitsReceived <= 16) {
            irState.hiword = (irState.hiword << 1) + bit;
        } else if (irState.bitsReceived <= 32) {
            irState.loword = (irState.loword << 1) + bit;
        }

        if (irState.bitsReceived === 32) {
            irState.addressSectionBits = irState.hiword & 0xffff;
            irState.commandSectionBits = irState.loword & 0xffff;
            return IR_DATAGRAM;
        } else {
            return IR_INCOMPLETE;
        }
    }

    function decode(markAndSpace: number): number {
        if (markAndSpace < 1600) {
            return appendBitToDatagram(0);
        } else if (markAndSpace < 2700) {
            return appendBitToDatagram(1);
        }

        irState.bitsReceived = 0;

        if (markAndSpace < 12500) {
            return IR_REPEAT;
        } else {
            return IR_INCOMPLETE;
        }
    }

    function enableIrMarkSpaceDetection(pin: DigitalPin) {
        pins.setPull(pin, PinPullMode.PullNone);

        let mark = 0;
        let space = 0;

        pins.onPulsed(pin, PulseValue.Low, () => {
            mark = pins.pulseDuration();
        });

        pins.onPulsed(pin, PulseValue.High, () => {
            space = pins.pulseDuration();
            const status = decode(mark + space);

            if (status !== IR_INCOMPLETE) {
                handleIrEvent(status);
            }
        });
    }

    function handleIrEvent(irEvent: number) {
        if (irEvent === IR_DATAGRAM || irEvent === IR_REPEAT) {
            irState.repeatTimeout = input.runningTime() + REPEAT_TIMEOUT_MS;
        }

        if (irEvent === IR_DATAGRAM) {
            irState.hasNewDatagram = true;

            if (irState.onIrDatagram) {
                background.schedule(irState.onIrDatagram, background.Thread.UserCallback, background.Mode.Once, 0);
            }

            const newCommand = irState.commandSectionBits >> 8;

            if (newCommand !== irState.activeCommand) {

                if (irState.activeCommand >= 0) {
                    const releasedHandler = irState.onIrButtonReleased.find(h => h.irButton === irState.activeCommand || IrButton.Any === h.irButton);
                    if (releasedHandler) {
                        background.schedule(releasedHandler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
                    }
                }

                const pressedHandler = irState.onIrButtonPressed.find(h => h.irButton === newCommand || IrButton.Any === h.irButton);
                if (pressedHandler) {
                    background.schedule(pressedHandler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
                }

                irState.activeCommand = newCommand;
            }
        }
    }

    function initIrState() {
        if (irState) {
            return;
        }

        irState = {
            protocol: undefined,
            bitsReceived: 0,
            hasNewDatagram: false,
            addressSectionBits: 0,
            commandSectionBits: 0,
            hiword: 0,
            loword: 0,
            activeCommand: -1,
            repeatTimeout: 0,
            onIrButtonPressed: [],
            onIrButtonReleased: [],
            onIrDatagram: undefined,
        };
    }

    //% blockId="makerbit_infrared_connect_receiver"
    //% block="connect IR receiver at pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.tooltips="false"
    //% weight=94
    //% blockGap=15
    export function connectIrReceiver(
        pin: DigitalPin
    ): void {
        initIrState();

        irState.protocol = IrProtocol.NEC;

        enableIrMarkSpaceDetection(pin);

        background.schedule(notifyIrEvents, background.Thread.Priority, background.Mode.Repeat, REPEAT_TIMEOUT_MS);
    }

    function notifyIrEvents() {
        if (irState.activeCommand === -1) {
            // skip
        } else {
            const now = input.runningTime();
            if (now > irState.repeatTimeout) {
                const handler = irState.onIrButtonReleased.find(h => h.irButton === irState.activeCommand || IrButton.Any === h.irButton);
                if (handler) {
                    background.schedule(handler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
                }

                irState.bitsReceived = 0;
                irState.activeCommand = -1;
            }
        }
    }

    //% blockId=makerbit_infrared_on_ir_button
    //% block="on IR button | %button | %action"
    //% button.fieldEditor="gridpicker"
    //% button.fieldOptions.tooltips="false"
    //% weight=93
    //% blockGap=15
    export function onIrButton(
        button: IrButton,
        action: IrButtonAction,
        handler: () => void
    ) {
        initIrState();
        if (action === IrButtonAction.Pressed) {
            irState.onIrButtonPressed.push(new IrButtonHandler(button, handler));
        }
        else {
            irState.onIrButtonReleased.push(new IrButtonHandler(button, handler));
        }
    }

    /*
    //% blockId=makerbit_infrared_ir_button_pressed
    //% block="IR button"
    //% weight=70
    export function irButton(): number {
        basic.pause(0);
        if (!irState) {
            return IrButton.Any;
        }
        return irState.commandSectionBits >> 8;
    }

    //% blockId=makerbit_infrared_on_ir_datagram
    //% block="on IR datagram received"
    //% weight=40
    export function onIrDatagram(handler: () => void) {
        initIrState();
        irState.onIrDatagram = handler;
    }

    //% blockId=makerbit_infrared_ir_datagram
    //% block="IR datagram"
    //% weight=30
    export function irDatagram(): string {
        basic.pause(0);
        initIrState();
        return (
            "0x" +
            ir_rec_to16BitHex(irState.addressSectionBits) +
            ir_rec_to16BitHex(irState.commandSectionBits)
        );
    }

    //% blockId=makerbit_infrared_was_any_ir_datagram_received
    //% block="IR data was received"
    //% weight=80
    export function wasIrDataReceived(): boolean {
        basic.pause(0);
        initIrState();
        if (irState.hasNewDatagram) {
            irState.hasNewDatagram = false;
            return true;
        } else {
            return false;
        }
    }
    */

    //% blockId=makerbit_infrared_button_code
    //% button.fieldEditor="gridpicker"
    //% button.fieldOptions.columns=3
    //% button.fieldOptions.tooltips="false"
    //% block="IR button code %button"
    //% weight=92
    //% blockGap=15
    export function irButtonCode(button: IrButton): number {
        basic.pause(0);
        return button as number;
    }

    function ir_rec_to16BitHex(value: number): string {
        let hex = "";
        for (let pos = 0; pos < 4; pos++) {
            let remainder = value % 16;
            if (remainder < 10) {
                hex = remainder.toString() + hex;
            } else {
                hex = String.fromCharCode(55 + remainder) + hex;
            }
            value = Math.idiv(value, 16);
        }
        return hex;
    }

    export namespace background {

        export enum Thread {
            Priority = 0,
            UserCallback = 1,
        }

        export enum Mode {
            Repeat,
            Once,
        }

        class Executor {
            _newJobs: Job[] = undefined;
            _jobsToRemove: number[] = undefined;
            _pause: number = 100;
            _type: Thread;

            constructor(type: Thread) {
                this._type = type;
                this._newJobs = [];
                this._jobsToRemove = [];
                control.runInParallel(() => this.loop());
            }

            push(task: () => void, delay: number, mode: Mode): number {
                if (delay > 0 && delay < this._pause && mode === Mode.Repeat) {
                    this._pause = Math.floor(delay);
                }
                const job = new Job(task, delay, mode);
                this._newJobs.push(job);
                return job.id;
            }

            cancel(jobId: number) {
                this._jobsToRemove.push(jobId);
            }

            loop(): void {
                const _jobs: Job[] = [];

                let previous = control.millis();

                while (true) {
                    const now = control.millis();
                    const delta = now - previous;
                    previous = now;

                    // Add new jobs
                    this._newJobs.forEach(function (job: Job, index: number) {
                        _jobs.push(job);
                    });
                    this._newJobs = [];

                    // Cancel jobs
                    this._jobsToRemove.forEach(function (jobId: number, index: number) {
                        for (let i = _jobs.length - 1; i >= 0; i--) {
                            const job = _jobs[i];
                            if (job.id == jobId) {
                                _jobs.removeAt(i);
                                break;
                            }
                        }
                    });
                    this._jobsToRemove = []


                    // Execute all jobs
                    if (this._type === Thread.Priority) {
                        // newest first
                        for (let i = _jobs.length - 1; i >= 0; i--) {
                            if (_jobs[i].run(delta)) {
                                this._jobsToRemove.push(_jobs[i].id)
                            }
                        }
                    } else {
                        // Execute in order of schedule
                        for (let i = 0; i < _jobs.length; i++) {
                            if (_jobs[i].run(delta)) {
                                this._jobsToRemove.push(_jobs[i].id)
                            }
                        }
                    }

                    basic.pause(this._pause);
                }
            }
        }

        class Job {
            id: number;
            func: () => void;
            delay: number;
            remaining: number;
            mode: Mode;

            constructor(func: () => void, delay: number, mode: Mode) {
                this.id = randint(0, 2147483647)
                this.func = func;
                this.delay = delay;
                this.remaining = delay;
                this.mode = mode;
            }

            run(delta: number): boolean {
                if (delta <= 0) {
                    return false;
                }
                
                this.remaining -= delta;
                if (this.remaining > 0) {
                    return false;
                }

                switch (this.mode) {
                    case Mode.Once:
                        this.func();
                        basic.pause(0);
                        return true;
                    case Mode.Repeat:
                        this.func();
                        this.remaining = this.delay;
                        basic.pause(0);
                        return false;
                }
            }
        }

        const queues: Executor[] = [];

        export function schedule(    
            func: () => void,
            type: Thread,
            mode: Mode,
            delay: number,
        ): number {
            if (!func || delay < 0) return 0;

            if (!queues[type]) {
                queues[type] = new Executor(type);
            }

            return queues[type].push(func, delay, mode);
        }

        export function remove(type: Thread, jobId: number): void {
            if (queues[type]) {
                queues[type].cancel(jobId);
            }
        }
    }

    // Sonar / Ping utilities （合并到 mbit_Smartcar）
    export enum PingUnit {
        //% block="μs"
        MicroSeconds,
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig trigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=mbit_sonar_ping block="ping trig %trig|echo %echo|unit %unit"
     //% weight=95
    //% blockGap=15
    //% color="#8a8994"
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d;
        }
    }

    /**
     * Well known colors for a NeoPixel strip
     */
    export enum NeoPixelColors {
        //% block=red
        Red = 0xFF0000,
        //% block=orange
        Orange = 0xFFA500,
        //% block=yellow
        Yellow = 0xFFFF00,
        //% block=green
        Green = 0x00FF00,
        //% block=blue
        Blue = 0x0000FF,
        //% block=indigo
        Indigo = 0x4b0082,
        //% block=violet
        Violet = 0x8a2be2,
        //% block=purple
        Purple = 0xFF00FF,
        //% block=white
        White = 0xFFFFFF,
        //% block=black
        Black = 0x000000
    }

    /**
     * Different modes for RGB or RGB+W NeoPixel strips
     */
    export enum NeoPixelMode {
        //% block="RGB (GRB format)"
        RGB = 0,
        //% block="RGB+W"
        RGBW = 1,
        //% block="RGB (RGB format)"
        RGB_RGB = 2
    }

    /**
     * Functions to operate NeoPixel strips.
     */
    export namespace neopixel {
        //% shim=sendBufferAsm
        function sendBuffer(buf: Buffer, pin: DigitalPin) {
        }

        export class Strip {
            buf: Buffer;
            pin: DigitalPin;
            brightness: number;
            start: number;
            _length: number;
            _mode: NeoPixelMode;
            _matrixWidth: number;
            _matrixChain: number;
            _matrixRotation: number;

            //% blockId="neopixel_set_strip_color" block="%strip|show color %rgb=neopixel_colors"
            //% weight=85 blockGap=15
            //% parts="neopixel"
            showColor(rgb: number) {
                rgb = rgb >> 0;
                this.setAllRGB(rgb);
                this.show();
            }

            //% blockId="neopixel_set_strip_rainbow" block="%strip|show rainbow from %startHue|to %endHue"
            //% weight=85 blockGap=15
            //% parts="neopixel"
            showRainbow(startHue: number = 1, endHue: number = 360) {
                if (this._length <= 0) return;

                startHue = startHue >> 0;
                endHue = endHue >> 0;
                const saturation = 100;
                const luminance = 50;
                const steps = this._length;
                const direction = HueInterpolationDirection.Clockwise;

                const h1 = startHue;
                const h2 = endHue;
                const hDistCW = ((h2 + 360) - h1) % 360;
                const hStepCW = Math.idiv((hDistCW * 100), steps);
                const hDistCCW = ((h1 + 360) - h2) % 360;
                const hStepCCW = Math.idiv(-(hDistCCW * 100), steps);
                let hStep: number;
                if (direction === HueInterpolationDirection.Clockwise) {
                    hStep = hStepCW;
                } else if (direction === HueInterpolationDirection.CounterClockwise) {
                    hStep = hStepCCW;
                } else {
                    hStep = hDistCW < hDistCCW ? hStepCW : hStepCCW;
                }
                const h1_100 = h1 * 100;

                const s1 = saturation;
                const s2 = saturation;
                const sDist = s2 - s1;
                const sStep = Math.idiv(sDist, steps);
                const s1_100 = s1 * 100;

                const l1 = luminance;
                const l2 = luminance;
                const lDist = l2 - l1;
                const lStep = Math.idiv(lDist, steps);
                const l1_100 = l1 * 100

                if (steps === 1) {
                    this.setPixelColor(0, hsl(h1 + hStep, s1 + sStep, l1 + lStep))
                } else {
                    this.setPixelColor(0, hsl(startHue, saturation, luminance));
                    for (let i = 1; i < steps - 1; i++) {
                        const h = Math.idiv((h1_100 + i * hStep), 100) + 360;
                        const s = Math.idiv((s1_100 + i * sStep), 100);
                        const l = Math.idiv((l1_100 + i * lStep), 100);
                        this.setPixelColor(i, hsl(h, s, l));
                    }
                    this.setPixelColor(steps - 1, hsl(endHue, saturation, luminance));
                }
                this.show();
            }

            //% weight=84 blockGap=15
            //% blockId=neopixel_show_bar_graph block="%strip|show bar graph of %value|up to %high"
            //% icon="\uf080"
            //% parts="neopixel"
            showBarGraph(value: number, high: number): void {
                if (high <= 0) {
                    this.clear();
                    this.setPixelColor(0, NeoPixelColors.Yellow);
                    this.show();
                    return;
                }

                value = Math.abs(value);
                const n = this._length;
                const n1 = n - 1;
                let v = Math.idiv((value * n), high);
                if (v == 0) {
                    this.setPixelColor(0, 0x666600);
                    for (let i = 1; i < n; ++i)
                        this.setPixelColor(i, 0);
                } else {
                    for (let i = 0; i < n; ++i) {
                        if (i <= v) {
                            const b = Math.idiv(i * 255, n1);
                            this.setPixelColor(i, neopixel.rgb(b, 0, 255 - b));
                        }
                        else this.setPixelColor(i, 0);
                    }
                }
                this.show();
            }

            //% blockId="neopixel_set_pixel_color" block="%strip|set pixel color at %pixeloffset|to %rgb=neopixel_colors"
            //% blockGap=15
            //% weight=80
            //% parts="neopixel" advanced=true
            setPixelColor(pixeloffset: number, rgb: number): void {
                this.setPixelRGB(pixeloffset >> 0, rgb >> 0);
            }

            //% blockId=neopixel_set_matrix_width block="%strip|set matrix width %width|rotation %rotation|chain %chain"
            //% blockGap=15
            //% weight=5
            //% parts="neopixel" advanced=true
            setMatrixWidth(width: number, rotation: number, chain: number) {
                this._matrixWidth = Math.min(this._length, width >> 0);
                this._matrixRotation = rotation >> 0;
                this._matrixChain = chain >> 0;
            }

            //% blockId="neopixel_set_matrix_color" block="%strip|set matrix color at x %x|y %y|to %rgb=neopixel_colors"
            //% weight=15 //% blockGap=15
            //% parts="neopixel" advanced=true
            setMatrixColor(x: number, y: number, rgb: number) {
                if (this._matrixWidth <= 0) return; // not a matrix, ignore
                x = x >> 0;
                y = y >> 0;
                rgb = rgb >> 0;
                const cols = Math.idiv(this._length, this._matrixWidth);

                if (this._matrixRotation == 1) {
                    let t = y;
                    y = x;
                    x = t;
                } else if (this._matrixRotation == 2) {
                    x = this._matrixWidth - x - 1;
                }

                if (this._matrixChain == 1 && y % 2 == 1) {
                    x = this._matrixWidth - x - 1;
                }
                if (x < 0 || x >= this._matrixWidth || y < 0 || y >= cols) return;

                let i = x + y * this._matrixWidth;
                this.setPixelColor(i, rgb);
            }

            //% blockId="neopixel_set_pixel_white" block="%strip|set pixel white LED at %pixeloffset|to %white"
            //% blockGap=15
            //% weight=80
            //% parts="neopixel" advanced=true
            setPixelWhiteLED(pixeloffset: number, white: number): void {
                if (this._mode === NeoPixelMode.RGBW) {
                    this.setPixelW(pixeloffset >> 0, white >> 0);
                }
            }

            //% blockId="neopixel_show" block="%strip|show" blockGap=15
            //% weight=79
            //% parts="neopixel"
            show() {
                sendBuffer(this.buf, this.pin);
            }

            //% blockId="neopixel_clear" block="%strip|clear" blockGap=15
            //% weight=76
            //% parts="neopixel"
            clear(): void {
                const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
                this.buf.fill(0, this.start * stride, this._length * stride);
            }

            //% blockId="neopixel_length" block="%strip|length" blockGap=15
            //% weight=60 advanced=true
            length() {
                return this._length;
            }

            //% blockId="neopixel_set_brightness" block="%strip|set brightness %brightness" blockGap=8
            //% weight=59
            //% parts="neopixel" advanced=true
            setBrightness(brightness: number): void {
                this.brightness = brightness & 0xff;
            }

            //% blockId="neopixel_each_brightness" block="%strip|ease brightness" blockGap=15
            //% weight=58
            //% parts="neopixel" advanced=true
            easeBrightness(): void {
                const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
                const br = this.brightness;
                const buf = this.buf;
                const end = this.start + this._length;
                const mid = Math.idiv(this._length, 2);
                for (let i = this.start; i < end; ++i) {
                    const k = i - this.start;
                    const ledoffset = i * stride;
                    const br = k > mid
                        ? Math.idiv(255 * (this._length - 1 - k) * (this._length - 1 - k), (mid * mid))
                        : Math.idiv(255 * k * k, (mid * mid));
                    serial.writeLine(k + ":" + br);
                    const r = (buf[ledoffset + 0] * br) >> 8; buf[ledoffset + 0] = r;
                    const g = (buf[ledoffset + 1] * br) >> 8; buf[ledoffset + 1] = g;
                    const b = (buf[ledoffset + 2] * br) >> 8; buf[ledoffset + 2] = b;
                    if (stride == 4) {
                        const w = (buf[ledoffset + 3] * br) >> 8; buf[ledoffset + 3] = w;
                    }
                }
            }

            //% weight=86 blockGap=15
            //% blockId="neopixel_range" block="%strip|range from %start|with %length|leds"
            //% parts="neopixel"
            //% blockSetVariable=range
            range(start: number, length: number): Strip {
                start = start >> 0;
                length = length >> 0;
                let strip = new Strip();
                strip.buf = this.buf;
                strip.pin = this.pin;
                strip.brightness = this.brightness;
                strip.start = this.start + Math.clamp(0, this._length - 1, start);
                strip._length = Math.clamp(0, this._length - (strip.start - this.start), length);
                strip._matrixWidth = 0;
                strip._mode = this._mode;
                return strip;
            }

            //% blockId="neopixel_shift" block="%strip|shift pixels by %offset" blockGap=15
            //% weight=40
            //% parts="neopixel"
            shift(offset: number = 1): void {
                offset = offset >> 0;
                const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
                this.buf.shift(-offset * stride, this.start * stride, this._length * stride)
            }

            //% blockId="neopixel_rotate" block="%strip|rotate pixels by %offset" blockGap=15
            //% weight=39
            //% parts="neopixel"
            rotate(offset: number = 1): void {
                offset = offset >> 0;
                const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
                this.buf.rotate(-offset * stride, this.start * stride, this._length * stride)
            }

            //% weight=10 
            //% blockGap=15
            //% parts="neopixel" advanced=true
            setPin(pin: DigitalPin): void {
                this.pin = pin;
                pins.digitalWritePin(this.pin, 0);
            }

            //% weight=9 blockId=neopixel_power block="%strip|power (mA)"
            //% advanced=true
            //% blockGap=15
            power(): number {
                const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
                const end = this.start + this._length;
                let p = 0;
                for (let i = this.start; i < end; ++i) {
                    const ledoffset = i * stride;
                    for (let j = 0; j < stride; ++j) {
                        p += this.buf[i + j];
                    }
                }
                return Math.idiv(this.length(), 2) /* 0.5mA per neopixel */
                    + Math.idiv(p * 433, 10000); /* rought approximation */
            }

            private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
                if (this._mode === NeoPixelMode.RGB_RGB) {
                    this.buf[offset + 0] = red;
                    this.buf[offset + 1] = green;
                } else {
                    this.buf[offset + 0] = green;
                    this.buf[offset + 1] = red;
                }
                this.buf[offset + 2] = blue;
            }

            private setAllRGB(rgb: number) {
                let red = unpackR(rgb);
                let green = unpackG(rgb);
                let blue = unpackB(rgb);

                const br = this.brightness;
                if (br < 255) {
                    red = (red * br) >> 8;
                    green = (green * br) >> 8;
                    blue = (blue * br) >> 8;
                }
                const end = this.start + this._length;
                const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
                for (let i = this.start; i < end; ++i) {
                    this.setBufferRGB(i * stride, red, green, blue)
                }
            }
            private setAllW(white: number) {
                if (this._mode !== NeoPixelMode.RGBW)
                    return;

                let br = this.brightness;
                if (br < 255) {
                    white = (white * br) >> 8;
                }
                let buf = this.buf;
                let end = this.start + this._length;
                for (let i = this.start; i < end; ++i) {
                    let ledoffset = i * 4;
                    buf[ledoffset + 3] = white;
                }
            }
            private setPixelRGB(pixeloffset: number, rgb: number): void {
                if (pixeloffset < 0
                    || pixeloffset >= this._length)
                    return;

                let stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
                pixeloffset = (pixeloffset + this.start) * stride;

                let red = unpackR(rgb);
                let green = unpackG(rgb);
                let blue = unpackB(rgb);

                let br = this.brightness;
                if (br < 255) {
                    red = (red * br) >> 8;
                    green = (green * br) >> 8;
                    blue = (blue * br) >> 8;
                }
                this.setBufferRGB(pixeloffset, red, green, blue)
            }
            private setPixelW(pixeloffset: number, white: number): void {
                if (this._mode !== NeoPixelMode.RGBW)
                    return;

                if (pixeloffset < 0
                    || pixeloffset >= this._length)
                    return;

                pixeloffset = (pixeloffset + this.start) * 4;

                let br = this.brightness;
                if (br < 255) {
                    white = (white * br) >> 8;
                }
                let buf = this.buf;
                buf[pixeloffset + 3] = white;
            }
        }

        //% blockId="neopixel_create" block="NeoPixel at pin %pin|with %numleds|leds as %mode"
        //% weight=87 blockGap=15
        //% parts="neopixel"
        //% trackArgs=0,2
        //% blockSetVariable=strip
        export function create(pin: DigitalPin, numleds: number, mode: NeoPixelMode): Strip {
            let strip = new Strip();
            let stride = mode === NeoPixelMode.RGBW ? 4 : 3;
            strip.buf = pins.createBuffer(numleds * stride);
            strip.start = 0;
            strip._length = numleds;
            strip._mode = mode;
            strip._matrixWidth = 0;
            strip.setBrightness(255)
            strip.setPin(pin)
            return strip;
        }

        //% weight=1 blockGap=15
        //% blockId="neopixel_rgb" block="red %red|green %green|blue %blue"
        //% advanced=true
        export function rgb(red: number, green: number, blue: number): number {
            return packRGB(red, green, blue);
        }

        //% weight=2 blockGap=15
        //% blockId="neopixel_colors" block="%color"
        //% advanced=true
        export function colors(color: NeoPixelColors): number {
            return color;
        }

        function packRGB(a: number, b: number, c: number): number {
            return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
        }
        function unpackR(rgb: number): number {
            let r = (rgb >> 16) & 0xFF;
            return r;
        }
        function unpackG(rgb: number): number {
            let g = (rgb >> 8) & 0xFF;
            return g;
        }
        function unpackB(rgb: number): number {
            let b = (rgb) & 0xFF;
            return b;
        }

        //% blockId=neopixelHSL block="hue %h|saturation %s|luminosity %l" 
        //% blockGap=15
        export function hsl(h: number, s: number, l: number): number {
            h = Math.round(h);
            s = Math.round(s);
            l = Math.round(l);

            h = h % 360;
            s = Math.clamp(0, 99, s);
            l = Math.clamp(0, 99, l);
            let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000);
            let h1 = Math.idiv(h, 60);
            let h2 = Math.idiv((h - h1 * 60) * 256, 60);
            let temp = Math.abs((((h1 % 2) << 8) + h2) - 256);
            let x = (c * (256 - (temp))) >> 8;
            let r$: number;
            let g$: number;
            let b$: number;
            if (h1 == 0) {
                r$ = c; g$ = x; b$ = 0;
            } else if (h1 == 1) {
                r$ = x; g$ = c; b$ = 0;
            } else if (h1 == 2) {
                r$ = 0; g$ = c; b$ = x;
            } else if (h1 == 3) {
                r$ = 0; g$ = x; b$ = c;
            } else if (h1 == 4) {
                r$ = x; g$ = 0; b$ = c;
            } else if (h1 == 5) {
                r$ = c; g$ = 0; b$ = x;
            }
            let m = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
            let r = r$ + m;
            let g = g$ + m;
            let b = b$ + m;
            return packRGB(r, g, b);
        }

        export enum HueInterpolationDirection {
            Clockwise,
            CounterClockwise,
            Shortest
        }
    }
}