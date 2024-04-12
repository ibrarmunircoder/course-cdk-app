import { FullPageCircularSpinner, MainContent } from '@/shared/components';
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  colors,
} from '@mui/material';
import ReactPlayer from 'react-player';
import { useListCourseVideos } from './hooks/useListCourseVideos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CoursePage = () => {
  const {
    isLoading,
    videos,
    video,
    handleUserCompletedVideo,
    handleVideoClick,
    userVideos,
  } = useListCourseVideos();

  if (isLoading) {
    return <FullPageCircularSpinner />;
  }

  if (videos.length === 0) {
    return (
      <MainContent>
        <Typography textAlign="center" variant="body1" py={3}>
          No Videos Found!
        </Typography>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Box
        component={Card}
        position="fixed"
        width="280px"
        top="65px"
        height="calc(100vh-65px)"
        overflow="auto"
        left="0"
        bottom="0"
      >
        <Typography p={1} my={2} variant="h6" textAlign="center">
          Course Content
        </Typography>
        <List>
          {videos.map((v, index) => {
            const hasWatched = userVideos.some(
              (userVideo) => userVideo.vidId === v.id && userVideo.completed
            );
            return (
              <ListItem key={v.id} disableGutters>
                <ListItemButton onClick={() => handleVideoClick(v.id)}>
                  <ListItemText
                    sx={{
                      color: v.sk === video!.sk ? colors.blue[700] : 'inherit',
                    }}
                  >
                    Video {index + 1}
                  </ListItemText>
                  {hasWatched && (
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        ml="280px"
      >
        <Box p={5}>
          <ReactPlayer url={video!.signedUrl} width="100%" controls />
          <Box display="flex" justifyContent="flex-end" my={2}>
            {!userVideos.some(
              (userVideo) =>
                userVideo.vidId === video?.id && userVideo.completed
            ) && (
              <Button onClick={handleUserCompletedVideo} variant="outlined">
                Mark as Completed
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </MainContent>
  );
};

export default CoursePage;
