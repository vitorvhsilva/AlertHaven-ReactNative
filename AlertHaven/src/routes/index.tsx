
import { useAuth } from '../contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AlertsScreen } from '../screens/AlertsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={//user ? 'Home' : 
        'Alerts'
          }
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Alerts" component={AlertsScreen} />
          </>
          /*
          <>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
          */ 
          ) : (
          <>
          </>
          /*
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddMotorcycle" component={AddMotorcycle} />
            <Stack.Screen name="ViewMotorcycle" component={ViewMotorcycleScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
            <Stack.Screen name="UserConfig" component={UserConfig} />
            <Stack.Screen name="SeeCourtyard" component={SeeCourtyardScreen} /> 
            <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} /> 
            <Stack.Screen name="ChangeNameOrPassword" component={ChangeNameOrPasswordScreen} /> 
          </>
          */
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
