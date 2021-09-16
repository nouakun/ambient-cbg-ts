import React, { Component, CSSProperties, RefObject } from "react";

export type CanvasBackgroundProps = {};
//@ts-ignore
type CanvasBackgroundStates = {};

class CanvasBackground<CanvasBackgroundProps> extends Component {
  protected canvasA: RefObject<HTMLCanvasElement>;
  protected canvasB: RefObject<HTMLCanvasElement>;
  protected ctx: {
    a: CanvasRenderingContext2D | null;
    b: CanvasRenderingContext2D | null;
  } | null;
  protected center: number[];
  protected frameId: number | null;
  protected tick: number;

  constructor(props: CanvasBackgroundProps) {
    super(props);
    this.canvasA = React.createRef<HTMLCanvasElement>();
    this.canvasB = React.createRef<HTMLCanvasElement>();
    this.ctx = null;
    this.center = [];
    this.frameId = null;
    this.tick = 0;
  }

  componentDidMount() {
    this.createCanvas();
    this.resize();
    this.init();
    this.startLoop();
    window.addEventListener("resize", this.resize.bind(this));
  }

  componentWillUnmount() {
    if (this.frameId) {
      window.cancelAnimationFrame(this.frameId);
    }
  }

  init() {}

  draw() {}

  render() {
    const styles: CSSProperties = {
      position: "fixed",
      zIndex: -1,
      top: 0,
      left: 0,
      width: 100 + "vw",
      height: 100 + "vh",
    };

    return (
      <>
        <canvas ref={this.canvasA} style={styles} />
        <canvas ref={this.canvasB} style={styles} />
      </>
    );
  }

  createCanvas() {
    if (this.canvasA.current && this.canvasB.current) {
      this.ctx = {
        a: this.canvasA.current.getContext("2d"),
        b: this.canvasB.current.getContext("2d"),
      };
    }
    this.center = [];
    this.tick = 0;
  }

  resize() {
    const { innerWidth, innerHeight } = window;
    const ca = this.canvasA.current;
    const cb = this.canvasB.current;
    const ctxa = this.ctx?.a;
    const ctxb = this.ctx?.b;

    if (ca && cb && ctxa && ctxb) {
      // Canvas A
      ca.width = innerWidth;
      ca.height = innerHeight;
      ctxa.drawImage(cb, 0, 0);

      // Canvas B
      cb.width = innerWidth;
      cb.height = innerHeight;
      ctxb.drawImage(ca, 0, 0);
      this.center[0] = 0.5 * ca.width;
      this.center[1] = 0.5 * ca.height;
    }
  }

  startLoop() {
    if (this.frameId == null) {
      this.frameId = window.requestAnimationFrame(this.initDraw.bind(this));
    }
  }

  initDraw() {
    this.draw();
    this.frameId = window.requestAnimationFrame(this.initDraw.bind(this));
  }
}

export default CanvasBackground;
