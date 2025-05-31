import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import Toast from 'react-native-toast-message';
import { KeyboardAvoidingView, Platform } from 'react-native';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Preencha todos os campos',
        position: 'bottom',
      });
      return;
    }

    try {
      setLoading(true);
      await signIn({ email, senha: password });
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Login realizado com sucesso!',
        position: 'bottom',
      });
      navigation.navigate('Home');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error instanceof Error ? error.message : 'Erro ao fazer login',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
        <Header>
            <BackContainer onPress={() => navigation.navigate('Auth')}>
            <BackImage source={require('../../assets/icons/voltar.png')} />
            </BackContainer>
            <HeaderTitle>Login</HeaderTitle>
            <EmptyView />
        </Header>

        <ContentContainer>
            <InputContainer>
            <InputLabel>E-mail</InputLabel>
            <StyledInput
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            </InputContainer>

            <InputContainer>
            <InputLabel>Senha</InputLabel>
            <StyledInput
                value={password}
                onChangeText={setPassword}
                placeholder="Digite sua senha"
                secureTextEntry
            />
            </InputContainer>

            <LoginButton onPress={handleLogin} disabled={loading}>
            <ButtonText>{loading ? 'Carregando...' : 'Entrar'}</ButtonText>
            </LoginButton>

            <RegisterText>
            Não tem uma conta?{' '}
            <RegisterLink onPress={() => navigation.navigate('Register')}>
                Cadastre-se
            </RegisterLink>
            </RegisterText>
        </ContentContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.preto};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom-width: 2px;
  border-bottom-color: ${theme.colors.roxo1};
`;

const BackContainer = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

const BackImage = styled.Image`
  width: 100%;
  height: 100%;
  tint-color: ${theme.colors.roxo1};
`;

const HeaderTitle = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.bold};
  font-size: 20px;
`;

const EmptyView = styled.View`
  width: 40px;
`;

const ContentContainer = styled.ScrollView`
  flex: 1;
  padding: 30px;
`;

const InputContainer = styled.View`
  margin-bottom: 25px;
`;

const InputLabel = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular};
  font-size: ${theme.typography.subtitle.fontSize};;
  margin-bottom: 8px;
`;

const StyledInput = styled.TextInput`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.regular};
  font-size: ${theme.typography.subtitle.fontSize};
  padding: 15px;
  background-color: ${theme.colors.roxo2};
  border-radius: 10px;
  border-width: 1px;
  border-color: ${theme.colors.roxo1};
`;

const LoginButton = styled.TouchableOpacity`
  background-color: ${theme.colors.roxo1};
  padding: 16px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

const ButtonText = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.bold};
  font-size: ${theme.typography.title.fontSize};
`;

const RegisterText = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular};
  font-size: ${theme.typography.body.fontSize};
  text-align: center;
  margin-top: 20px;
`;

const RegisterLink = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.bold};
`;