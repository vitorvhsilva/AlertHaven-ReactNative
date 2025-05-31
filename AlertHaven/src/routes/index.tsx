
import { useAuth } from '../contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreen }  from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AlertsScreen } from '../screens/AlertsScreen';
import { InfoScreen } from '../screens/InfoScreen';
import { UserScreen } from '../screens/UserScreen';
import { EditUserScreen } from '../screens/EditUserScreen';
import { EditPasswordScreen } from '../screens/EditPasswordScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Home' : 'Auth'}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
          ) : (
            <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Alerts" component={AlertsScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="EditUser" component={EditUserScreen} />
            <Stack.Screen name="EditPassword" component={EditPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
