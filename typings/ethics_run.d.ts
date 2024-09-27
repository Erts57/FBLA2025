declare module "*.svg" {
    const content: any;
    export default content;
}

declare interface Controls {
    A: Phaser.Input.Keyboard.Key;
    E: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    DOWN: Phaser.Input.Keyboard.Key;
    ESC: Phaser.Input.Keyboard.Key;
    LEFT: Phaser.Input.Keyboard.Key;
    RIGHT: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    UP: Phaser.Input.Keyboard.Key;
    W: Phaser.Input.Keyboard.Key;
    [key: string]: Phaser.Input.Keyboard.Key;
}

declare interface IAnimation {
    easing: Function;
    duration: number;
    yoyo: boolean;
}
