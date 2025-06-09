declare module 'lenis' {
  export interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    orientation?: 'vertical' | 'horizontal';
    gestureOrientation?: 'vertical' | 'horizontal';
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    wheelMultiplier?: number;
    lerp?: number;
    infinite?: boolean;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    destroy(): void;
    raf(time: number): void;
    scrollTo(target: string | number | HTMLElement, options?: { offset?: number; duration?: number; easing?: (t: number) => number }): void;
  }
} 