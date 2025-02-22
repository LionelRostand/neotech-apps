
import { connect, createLocalVideoTrack, Room } from 'twilio-video';
import { supabase } from '@/lib/supabase';

export class VideoService {
  private static instance: VideoService;
  private room: Room | null = null;

  private constructor() {}

  static getInstance(): VideoService {
    if (!VideoService.instance) {
      VideoService.instance = new VideoService();
    }
    return VideoService.instance;
  }

  async getAccessToken(roomName: string, participantName: string): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('video_tokens')
        .select('token')
        .eq('room_name', roomName)
        .single();

      if (error) throw error;
      return data.token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  }

  async joinRoom(roomName: string, participantName: string): Promise<Room> {
    try {
      const token = await this.getAccessToken(roomName, participantName);
      
      const localTrack = await createLocalVideoTrack();
      this.room = await connect(token, {
        name: roomName,
        tracks: [localTrack],
      });

      return this.room;
    } catch (error) {
      console.error('Error joining room:', error);
      throw error;
    }
  }

  async leaveRoom() {
    if (this.room) {
      this.room.disconnect();
      this.room = null;
    }
  }

  getCurrentRoom(): Room | null {
    return this.room;
  }
}

export default VideoService.getInstance();
