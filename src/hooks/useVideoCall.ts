
import { useState, useCallback } from 'react';
import { Room } from 'twilio-video';
import videoService from '@/services/videoService';

export const useVideoCall = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const joinRoom = useCallback(async (roomName: string, participantName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newRoom = await videoService.joinRoom(roomName, participantName);
      setRoom(newRoom);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const leaveRoom = useCallback(async () => {
    await videoService.leaveRoom();
    setRoom(null);
  }, []);

  return {
    room,
    error,
    isLoading,
    joinRoom,
    leaveRoom,
  };
};
