declare module 'nprogress' {
  interface NProgressOptions {
    minimum?: number;
    template?: string;
    easing?: string;
    positionUsing?: string;
    speed?: number;
    trickle?: boolean;
    trickleSpeed?: number;
    showSpinner?: boolean;
    barSelector?: string;
    spinnerSelector?: string;
    parent?: string;
  }

  type StartPosition = number | null;

  interface NProgress {
    configure: (options: NProgressOptions) => NProgress;
    start: () => NProgress;
    set: (n: number) => NProgress;
    trickle: () => NProgress;
    inc: (amount?: number) => NProgress;
    done: (force?: boolean) => NProgress;
    remove: () => void;
    status: StartPosition;
  }

  const nprogress: NProgress;
  export default nprogress;
}

