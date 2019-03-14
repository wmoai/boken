import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from 'pixi.js';

const You = CustomPIXIComponent<{}, PIXI.Graphics>({
  customDisplayObject: () => {
    const you = new PIXI.Graphics();
    you.beginFill(0x999999);
    you.drawCircle(0, 0, 10);
    return you;
  },
}, 'Rect');

export default You;

