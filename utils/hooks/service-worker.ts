import { useEffect } from 'react';

export function useServiceWorker() {
  useEffect(() => {
    async function initializeServiceWorker() {
      if ('serviceWorker' in navigator) {
        try {
          const status = await navigator.serviceWorker.register(
            '/serviceWorker.js'
          );
          if (status.installing) {
            console.log('Installing service worker...');
          } else if (status.waiting) {
            console.log('waiting for service worker...');
          } else if (status.active) {
            console.log('Service worker active!');
          }
        } catch (error) {
          console.error('Error initializing service worker!', error);
        }
      }
    }

    initializeServiceWorker();
  }, []);
}
