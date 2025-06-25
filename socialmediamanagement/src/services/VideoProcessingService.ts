// src/services/videoProcessingService.ts

export interface VideoUploadResult {
    videoId: string; // ID for the uploaded video, used for subsequent processing
    fileName: string;
    fileSize: number;
  }
  
  export interface VideoProcessingParams {
    // You might add parameters here for how to split the video (e.g., targetDuration, numClips)
    // For now, we'll keep it simple, assuming the backend intelligently splits.
  }
  
  export interface ProcessedClip {
    id: string; // Unique ID for the clip
    title: string;
    duration: string; // e.g., "0:15"
    thumbnailUrl: string; // URL to the clip's thumbnail image
    videoUrl: string; // URL to the actual short clip video file
    description?: string;
  }
  
  export interface VideoProcessingStatus {
    jobId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number; // 0-100
    clips?: ProcessedClip[]; // Populated when status is 'completed'
    errorMessage?: string; // Populated when status is 'failed'
  }
  
  export class VideoProcessingService {
    // In a real app, you might pass a base API URL here, or use environment variables
    private baseUrl: string = '/api/video-processing'; // Example backend API endpoint
  
    // Method to upload the video file
    async uploadVideo(file: File): Promise<VideoUploadResult> {
      const formData = new FormData();
      formData.append('video', file);
  
      try {
        const response = await fetch(`${this.baseUrl}/upload`, {
          method: 'POST',
          body: formData,
          // No 'Content-Type' header needed for FormData; fetch sets it automatically.
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          console.error('Video upload failed:', response.status, response.statusText, errorDetail);
          throw new Error(`Failed to upload video: ${response.status} - ${errorDetail}`);
        }
  
        // Assuming backend returns { videoId: "...", fileName: "...", fileSize: ... }
        return await response.json() as VideoUploadResult;
      } catch (error) {
        console.error('Error during video upload:', error);
        throw new Error(`Video upload service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  
    // Method to start processing the uploaded video
    async startProcessing(videoId: string, params: VideoProcessingParams = {}): Promise<{ jobId: string }> {
      try {
        const response = await fetch(`${this.baseUrl}/${videoId}/process`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          console.error('Failed to start video processing:', response.status, response.statusText, errorDetail);
          throw new Error(`Failed to start video processing: ${response.status} - ${errorDetail}`);
        }
  
        // Assuming backend returns { jobId: "..." }
        return await response.json() as { jobId: string };
      } catch (error) {
        console.error('Error starting video processing:', error);
        throw new Error(`Start processing service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  
    // Method to get the status of a video processing job
    async getProcessingStatus(jobId: string): Promise<VideoProcessingStatus> {
      try {
        const response = await fetch(`${this.baseUrl}/status/${jobId}`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          const errorDetail = await response.text();
          console.error('Failed to get video processing status:', response.status, response.statusText, errorDetail);
          throw new Error(`Failed to get status: ${response.status} - ${errorDetail}`);
        }
  
        // Assuming backend returns VideoProcessingStatus object
        return await response.json() as VideoProcessingStatus;
      } catch (error) {
        console.error('Error getting video processing status:', error);
        throw new Error(`Get status service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  
    // Method to trigger a clip download (client-side, backend provides URL)
    // This might not be part of the service, but rather a direct link usage.
    // We'll keep it simple for now, assuming the URL from ProcessedClip.videoUrl is directly downloadable.
  }