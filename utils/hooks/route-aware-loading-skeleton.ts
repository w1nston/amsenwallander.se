import { useEffect, useState, ComponentType } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';

const LoadingRecipesListSkeleton = dynamic(
  import('../../features/recipes/list/components/LoadingRecipesListSkeleton')
);

const LoadingRecipeSkeleton = dynamic(
  import('../../features/recipes/recipe/components/LoadingRecipeSkeleton')
);

const LoadingPreparationsListSkeleton = dynamic(
  import(
    '../../features/preparations/list/components/LoadingPreparationsListSkeleton'
  )
);

const LoadingPreparationSkeleton = dynamic(
  import(
    '../../features/preparations/preparation/components/LoadingPreparationSkeleton'
  )
);
export function useLoadingSkeleton(): ComponentType | null {
  const [LoadingSkeleton, setLoadingSkeleton] = useState<ComponentType | null>(
    null
  );

  function handleRouteChangeStart(destinationRoute: string) {
    if (destinationRoute.match(/^\/recipes$/)) {
      setLoadingSkeleton(LoadingRecipesListSkeleton);
      return;
    }

    if (destinationRoute.match(/^\/recipes\/*/)) {
      setLoadingSkeleton(LoadingRecipeSkeleton);
      return;
    }

    if (destinationRoute.match(/^\/preparations$/)) {
      setLoadingSkeleton(LoadingPreparationsListSkeleton);
      return;
    }

    if (destinationRoute.match(/^\/preparations\/*/)) {
      setLoadingSkeleton(LoadingPreparationSkeleton);
      return;
    }
  }

  function handleRouteChangeComplete() {
    setLoadingSkeleton(null);
  }

  function handleRouteChangeError(error: unknown) {
    console.error('Error handling route change.', error);
    setLoadingSkeleton(null);
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return LoadingSkeleton;
}
