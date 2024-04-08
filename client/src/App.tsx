import { Amplify } from 'aws-amplify';
import awsConfig from './aws-config';
import './App.css';
console.log(awsConfig);
Amplify.configure(awsConfig);

function App() {
  return <div>App</div>;
}

export default App;
