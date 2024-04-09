import { Amplify } from 'aws-amplify';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouter } from '@/routes/AppRouter';
import awsConfig from '@/aws-config';
import theme from '@/theme';
import './App.css';

Amplify.configure(awsConfig);
console.log(awsConfig);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
