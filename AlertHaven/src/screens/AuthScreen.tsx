// src/screens/AuthScreen.tsx
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import WebMap from '../components/WebMap';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

const AuthScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <WebMap />
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.preto};
`;

export default AuthScreen;