import type { ComponentType, ReactElement } from 'react';
import React from 'react';

type Children = ReactElement | Iterable<ReactElement | false> | false;
type PropsWithChildren<P = unknown> = P & { children: Children };
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type ComponentOrComponentWithProps<T = any> = ComponentType<T> | [ComponentType<T>, T];

export const combineProviders =
  (providers: ComponentOrComponentWithProps[]) =>
  ({ children }: PropsWithChildren) =>
    providers
      .slice()
      .reverse()
      .reduce<ReactElement>((tree, componentOrComponentWithProps) => {
        const [Provider, props] = Array.isArray(componentOrComponentWithProps)
          ? componentOrComponentWithProps
          : [componentOrComponentWithProps, {}];

        return React.createElement(Provider, props, tree);
      }, children as ReactElement);
