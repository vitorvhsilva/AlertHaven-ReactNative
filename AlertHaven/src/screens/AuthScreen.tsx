import React from 'react';
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type AuthScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <LogoContainer>
        <Logo source={require('../../assets/logos/alerthaven.png')} />
        <AppTitle>AlertHaven</AppTitle>
        <AppSubtitle>Monitoramento climático em tempo real</AppSubtitle>
      </LogoContainer>

      <ButtonsContainer>
        <LoginButton onPress={() => navigation.navigate('Login')}>
          <ButtonText>Entrar</ButtonText>
        </LoginButton>
        <RegisterButton onPress={() => navigation.navigate('Register')}>
          <ButtonText>Cadastrar</ButtonText>
        </RegisterButton>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.preto};
  padding: 40px;
  justify-content: center;
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 50px;
`;

const Logo = styled.Image`
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
`;

const AppTitle = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.bold};
  font-size: ${theme.typography.title.fontSize};
  margin-bottom: 10px;
`;

const AppSubtitle = styled.Text`
  width: 80%;
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular};
  font-size: ${theme.typography.subtitle.fontSize};
  text-align: center;
`;

const ButtonsContainer = styled.View`
  width: 100%;
`;

const BaseButton = styled.TouchableOpacity`
  padding: 16px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 15px;
`;

const LoginButton = styled(BaseButton)`
  background-color: ${theme.colors.roxo1};
`;

const RegisterButton = styled(BaseButton)`
  background-color: ${theme.colors.roxo2};
`;

const ButtonText = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.bold};
  font-size: ${theme.typography.subtitle.fontSize};
`;