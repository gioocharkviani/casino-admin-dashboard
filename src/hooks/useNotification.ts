import { getAllNotification, markNotificationAsRead } from '@/services';
import { handleGetAuthCookie } from '@/utils/cookies';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<any>([]);
  const [unReadNotification, setUnReadNotification] = useState<number>(0);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const token = await handleGetAuthCookie();
      const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_NEST_API_URL;
      const apiUrl = `${backendUrl}/notification`;

      const response = await getAllNotification({ apiUrl, token });

      // Filter unread notifications
      const unreadCount = response.data.filter(
        (notification: any) => notification.readAt === null
      ).length;

      setNotifications(response.data);
      setUnReadNotification(unreadCount); // Update the count of unread notifications
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const token = await handleGetAuthCookie();
      const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_NEST_API_URL;

      const response = await markNotificationAsRead({
        apiUrl: `${backendUrl}/notification/${notificationId}/read`,
        token,
      });

      setNotifications((prevNotifications: any) =>
        prevNotifications.map((notification: any) =>
          notification.id === response.id
            ? { ...notification, readAt: new Date() }
            : notification
        )
      );

      setUnReadNotification((prevCount) => prevCount - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      query: { userId },
    });

    socket.on('notification', (newNotification) => {
      setNotifications((prevNotifications: any) => [
        newNotification,
        ...prevNotifications,
      ]);

      if (newNotification.readAt === null) {
        setUnReadNotification((prevCount) => prevCount + 1);
      }
    });

    fetchNotifications();

    return () => {
      socket.off('notification');
      socket.disconnect();
    };
  }, [userId]);

  return { notifications, unReadNotification, handleMarkAsRead };
};

export default useNotifications;
