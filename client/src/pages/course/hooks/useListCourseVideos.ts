import {
  useAuthUserSelector,
  useAuthUserSessionSelector,
} from '@/shared/hooks/useAuthStore';
import { UserVideos, Videos } from '@/shared/types';
import { get, post } from 'aws-amplify/api';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const API_NAME = import.meta.env.VITE_API_NAME;

export const useListCourseVideos = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<Videos[]>([]);
  const [userVideos, setUserVideos] = useState<UserVideos[]>([]);
  const userSession = useAuthUserSessionSelector();
  const user = useAuthUserSelector();

  const getVideos = useCallback(async () => {
    const getOperation = get({
      apiName: API_NAME,
      path: 'course-videos',
      options: {
        headers: {
          Authorization: userSession!.tokens!.idToken!.toString(),
        },
      },
    });
    const { body } = await getOperation.response;
    const response = await body.json();
    return response as Videos[];
  }, [userSession]);

  const getUserVideos = useCallback(async () => {
    const getOperation = get({
      apiName: API_NAME,
      path: 'user-completed-videos',
      options: {
        headers: {
          Authorization: userSession!.tokens!.idToken!.toString(),
        },
      },
    });
    const { body } = await getOperation.response;
    const response = await body.json();
    return response as UserVideos[];
  }, [userSession]);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setIsLoading(true);
        const response = await Promise.all([getVideos(), getUserVideos()]);
        const videos = response[0];
        const userVideos = response[1];
        setVideos(videos);
        setUserVideos(userVideos);
        if (videos.length) {
          setSearchParams(
            new URLSearchParams({
              'current-video': videos[0].id,
            })
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVideos, getUserVideos]);

  const video = videos.find((v) => v.id === searchParams.get('current-video'));

  const handleNextVideo = () => {
    const currentVideoIndex = videos.findIndex(
      (v) => v.id === searchParams.get('current-video')
    );
    if (currentVideoIndex !== videos.length - 1) {
      const nextVideo = videos[currentVideoIndex + 1];
      setSearchParams(
        new URLSearchParams({
          'current-video': nextVideo.id,
        })
      );
    } else {
      navigate('/');
    }
  };

  const handleUserCompletedVideo = async () => {
    try {
      const postOperation = post({
        apiName: API_NAME,
        path: 'user-completed-videos',
        options: {
          body: {
            userId: user!.userId,
            vidKey: video!.key,
            vidId: video!.id,
            completed: true,
          },
          headers: {
            Authorization: userSession!.tokens!.idToken!.toString(),
          },
        },
      });
      const { body } = await postOperation.response;
      const response = await body.json();
      setUserVideos((prev) => [...prev, response as UserVideos]);
      handleNextVideo();
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoClick = (id: string) => {
    setSearchParams(
      new URLSearchParams({
        'current-video': id,
      })
    );
  };

  return {
    videos,
    isLoading,
    video,
    handleUserCompletedVideo,
    handleVideoClick,
    userVideos,
  };
};
