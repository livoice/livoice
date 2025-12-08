import { useEffect } from 'react';

import { loadingIndicator } from '@/utils/loadingIndicator';

type RouterState = {
  navigation: { state: string };
  fetchers: Map<string, { state: string }>;
  revalidation: string;
};

type RouterLike = {
  subscribe: (listener: (state: RouterState) => void) => () => void;
  state: RouterState;
};

interface NavigationLoadingListenerProps {
  router: RouterLike;
}

export function NavigationLoadingListener({ router }: NavigationLoadingListenerProps) {
  useEffect(() => {
    let navigationInProgress = false;

    const syncLoadingState = (state: RouterState) => {
      const isNavigationLoading = state.navigation.state !== 'idle';
      const isFetcherLoading = Array.from(state.fetchers.values()).some(
        ({ state: fetcherState }) => fetcherState !== 'idle'
      );
      const isRevalidating = state.revalidation === 'loading';
      const isBusy = isNavigationLoading || isFetcherLoading || isRevalidating;

      if (isBusy === navigationInProgress) return;
      navigationInProgress = isBusy;

      if (isBusy) {
        loadingIndicator.start();
        return;
      }

      loadingIndicator.stop();
    };

    const unsubscribe = router.subscribe(syncLoadingState);
    syncLoadingState(router.state);

    return () => unsubscribe();
  }, [router]);

  return null;
}
