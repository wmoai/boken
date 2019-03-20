import * as PIXI from 'pixi.js';

export default class You extends PIXI.Graphics {
  public constructor() {
    super();
    this.beginFill(0x999999);
    this.drawCircle(0, 0, 10);
  }

  // public setMove(x: number, y: number): void {
  // this.moveTo = { x, y };
  // }
}
