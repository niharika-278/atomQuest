import { useEffect } from 'react';
import { useUiStore } from '../store/uiStore';

export function useNotifications(timeoutMs = 4000) {
  const notification = useUiStore((s) => s.notification);
  const setNotification = useUiStore((s) => s.setNotification);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), timeoutMs);
    return () => clearTimeout(timer);
  }, [notification, setNotification, timeoutMs]);

  return { notification, setNotification };
}
