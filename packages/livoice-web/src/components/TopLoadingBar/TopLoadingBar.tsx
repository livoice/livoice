import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

import { loadingIndicator } from '@/utils/loadingIndicator';

export function TopLoadingBar() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false, trickleSpeed: 120, minimum: 0.1 });

    const unsubscribe = loadingIndicator.subscribe(isActive => {
      if (isActive) {
        NProgress.start();
        return;
      }

      NProgress.done();
    });

    return () => {
      unsubscribe();
      NProgress.remove();
    };
  }, []);

  return null;
}









