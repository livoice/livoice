type Listener = (isActive: boolean) => void;

const listeners = new Set<Listener>();
let activeTasks = 0;

const notify = () => {
  const isActive = activeTasks > 0;
  listeners.forEach(listener => listener(isActive));
};

export const loadingIndicator = {
  start: () => {
    activeTasks += 1;
    notify();
  },
  stop: () => {
    activeTasks = Math.max(0, activeTasks - 1);
    notify();
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    listener(activeTasks > 0);
    return () => listeners.delete(listener);
  }
};
