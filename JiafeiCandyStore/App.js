import Navigator from './src/components/navigator/Navigator';
import { AuthProvider } from './src/components/auth/AuthProvider';
import { pt, registerTranslation } from 'react-native-paper-dates'
registerTranslation('pt', pt)

export default function App() {
  return (

    <AuthProvider>
      <Navigator></Navigator>
    </AuthProvider>
    
  );
}

