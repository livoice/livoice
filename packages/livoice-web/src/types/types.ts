declare global {
  type Option<V = string, L = string> = {
    value: V;
    label: L;
  };
}
