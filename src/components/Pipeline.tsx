import CanvasBackground, { CanvasBackgroundProps } from "./CanvasBackground";

import { HALF_PI, TAU, TO_RAD, rand, fadeInOut } from "../utils/Math";

const { cos, sin, round } = Math;

const pipeCount = 30;
const pipePropCount = 8;
const pipePropsLength = pipeCount * pipePropCount;
const turnCount = 8;
const turnAmount = (360 / turnCount) * TO_RAD;
const turnChanceRange = 58;
const baseSpeed = 0.5;
const rangeSpeed = 1;
const baseTTL = 100;
const rangeTTL = 300;
const baseWidth = 2;
const rangeWidth = 4;
const baseHue = 180;
const rangeHue = 60;

export interface PipelineProps extends CanvasBackgroundProps {
  backgroundColor?: string;
}

class Pipeline extends CanvasBackground<PipelineProps> {
  protected pipeProps: Float32Array | null;

  public static defaultProps = {
    ...CanvasBackground.defaultProps,
    backgroundColor: "hsla(150,80%,1%,1)",
  };

  constructor(props: any) {
    super(props);
    this.tick = 0;
    this.pipeProps = null;
  }

  init() {
    this.initPipes();
  }

  draw() {
    this.updatePipes();
    this.renderPipeline();
  }

  initPipes() {
    this.pipeProps = new Float32Array(pipePropsLength);
    for (let i = 0; i < pipePropsLength; i += pipePropCount) {
      this.initPipe(i);
    }
  }

  initPipe(i: number) {
    let x, y, direction, speed, life, ttl, width, hue;
    const ca = this.canvasA.current;

    if (ca && this.pipeProps) {
      x = rand(ca.width);
      y = this.center[1];
      direction = round(rand(1)) ? HALF_PI : TAU - HALF_PI;
      speed = baseSpeed + rand(rangeSpeed);
      life = 0;
      ttl = baseTTL + rand(rangeTTL);
      width = baseWidth + rand(rangeWidth);
      hue = baseHue + rand(rangeHue);

      this.pipeProps.set([x, y, direction, speed, life, ttl, width, hue], i);
    }
  }

  updatePipes() {
    this.tick++;
    let i;
    for (i = 0; i < pipePropsLength; i += pipePropCount) {
      this.updatePipe(i);
    }
  }

  updatePipe(i: number) {
    if (this.pipeProps) {
      let i2 = 1 + i,
        i3 = 2 + i,
        i4 = 3 + i,
        i5 = 4 + i,
        i6 = 5 + i,
        i7 = 6 + i,
        i8 = 7 + i;
      let x, y, direction, speed, life, ttl, width, hue, turnChance, turnBias;

      x = this.pipeProps[i];
      y = this.pipeProps[i2];
      direction = this.pipeProps[i3];
      speed = this.pipeProps[i4];
      life = this.pipeProps[i5];
      ttl = this.pipeProps[i6];
      width = this.pipeProps[i7];
      hue = this.pipeProps[i8];

      this.drawPipe(x, y, life, ttl, width, hue);

      life++;
      x += cos(direction) * speed;
      y += sin(direction) * speed;
      turnChance =
        !(this.tick % round(rand(turnChanceRange))) &&
        (!(round(x) % 6) || !(round(y) % 6));
      turnBias = round(rand(1)) ? -1 : 1;
      direction += turnChance ? turnAmount * turnBias : 0;

      this.pipeProps[i] = x;
      this.pipeProps[i2] = y;
      this.pipeProps[i3] = direction;
      this.pipeProps[i5] = life;

      this.checkBounds(x, y);
      life > ttl && this.initPipe(i);
    }
  }

  drawPipe(
    x: number,
    y: number,
    life: number,
    ttl: number,
    width: number,
    hue: number
  ) {
    if (this.ctx?.a) {
      this.ctx.a.save();
      this.ctx.a.strokeStyle = `hsla(${hue},75%,50%,${
        fadeInOut(life, ttl) * 0.125
      })`;
      this.ctx.a.beginPath();
      this.ctx.a.arc(x, y, width, 0, TAU);
      this.ctx.a.stroke();
      this.ctx.a.closePath();
      this.ctx.a.restore();
    }
  }

  checkBounds(x: number, y: number) {
    if (this.canvasA.current) {
      if (x > this.canvasA.current.width) {
        x = 0;
      }
      if (x < 0) {
        x = this.canvasA.current.width;
      }
      if (y > this.canvasA.current.height) {
        y = 0;
      }
      if (y < 0) {
        y = this.canvasA.current.height;
      }
    }
  }

  renderPipeline() {
    if (this.ctx?.b && this.canvasA.current && this.canvasB.current) {
      this.ctx.b.save();
      this.ctx.b.fillStyle = this.props.backgroundColor!;
      this.ctx.b.fillRect(
        0,
        0,
        this.canvasB.current.width,
        this.canvasB.current.height
      );
      this.ctx.b.restore();

      this.ctx.b.save();
      this.ctx.b.filter = "blur(12px)";
      this.ctx.b.drawImage(this.canvasA.current, 0, 0);
      this.ctx.b.restore();

      this.ctx.b.save();
      this.ctx.b.drawImage(this.canvasA.current, 0, 0);
      this.ctx.b.restore();
    }
  }
}

export default Pipeline;
