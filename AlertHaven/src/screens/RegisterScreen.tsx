import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import Toast from 'react-native-toast-message';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [prevPhone, setPrevPhone] = useState('');
  const [prevBirthDate, setPrevBirthDate] = useState('');
  const [prevCpf, setPrevCpf] = useState('');
  const { register } = useAuth();

  const formatCpf = (text: string, previousValue?: string) => {
    if (text.length < (previousValue || '').length) {
      return text;
    }

    const cleaned = text.replace(/\D/g, '');
    let formattedText = cleaned;
    
    if (cleaned.length > 3) {
      formattedText = `${cleaned.substring(0, 3)}.${cleaned.substring(3, 6)}`;
    }
    if (cleaned.length > 6) {
      formattedText = `${formattedText}.${cleaned.substring(6, 9)}`;
    }
    if (cleaned.length > 9) {
      formattedText = `${formattedText}-${cleaned.substring(9, 11)}`;
    }
    
    return formattedText.substring(0, 14);
  };

  const formatPhone = (text: string, previousValue?: string) => {
    if (text.length < (previousValue || '').length) {
      return text;
    }

    const cleaned = text.replace(/\D/g, '');
    let formattedText = '';
    
    if (cleaned.length > 0) {
      formattedText = `(${cleaned.substring(0, 2)}`;
    }
    if (cleaned.length > 2) {
      formattedText = `${formattedText}) ${cleaned.substring(2, 7)}`;
    }
    if (cleaned.length > 7) {
      formattedText = `${formattedText}-${cleaned.substring(7, 11)}`;
    }
    
    return formattedText;
  };

  const formatDate = (text: string, previousValue?: string) => {
    if (text.length < (previousValue || '').length) {
      return text;
    }

    const cleaned = text.replace(/\D/g, '');
    let formattedText = '';
    
    if (cleaned.length > 0) {
      formattedText = cleaned.substring(0, 2);
    }
    if (cleaned.length > 2) {
      formattedText = `${formattedText}/${cleaned.substring(2, 4)}`;
    }
    if (cleaned.length > 4) {
      formattedText = `${formattedText}/${cleaned.substring(4, 8)}`;
    }
    
    return formattedText;
  };

    const validateEmail = (email: string): boolean => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email.toLowerCase());
    };

  const handleRegister = async () => {
    if (!name || !email || !cpf || !phone || !birthDate || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Preencha todos os campos',
        position: 'bottom',
      });
      return;
    }

    if (!validateEmail(email)) {
        Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, insira um e-mail válido',
        position: 'bottom',
        });
        return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'As senhas não coincidem',
        position: 'bottom',
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'A senha deve ter pelo menos 6 caracteres',
        position: 'bottom',
      });
      return;
    }

    try {
      setLoading(true);
      await register({
        nome: name,
        email,
        cpf,
        telefone: phone,
        dataNascimento: birthDate,
        senha: password,
        dataCriacao: new Date().toLocaleDateString('pt-BR') 
      });
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Cadastro realizado com sucesso!',
        position: 'bottom',
      });
      navigation.navigate('Home');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error instanceof Error ? error.message : 'Erro ao cadastrar',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
      <Container>
        <Header>
          <BackContainer onPress={() => navigation.goBack()}>
            <BackImage source={require('../../assets/icons/voltar.png')} />
          </BackContainer>
          <HeaderTitle>Cadastro</HeaderTitle>
          <EmptyView />
        </Header>

        <ContentContainer>
            <InputContainer>
                <InputLabel>Nome completo</InputLabel>
                <StyledInput
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome completo"
                />
            </InputContainer>

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
                <InputLabel>CPF</InputLabel>
                <StyledInput
                value={cpf}
                onChangeText={(text: string) => {
                    const formatted = formatCpf(text, prevCpf);
                    setPrevCpf(formatted);
                    setCpf(formatted);
                }}
                placeholder="000.000.000-00"
                keyboardType="numeric"
                maxLength={14}
                />
            </InputContainer>

            <InputContainer>
                <InputLabel>Telefone</InputLabel>
                <StyledInput
                value={phone}
                onChangeText={(text: string) => {
                    const formatted = formatPhone(text, prevPhone);
                    setPrevPhone(formatted);
                    setPhone(formatted);
                }}
                placeholder="(00) 00000-0000"
                keyboardType="phone-pad"
                maxLength={15}
                />
            </InputContainer>

            <InputContainer>
                <InputLabel>Data de nascimento</InputLabel>
                <StyledInput
                value={birthDate}
                onChangeText={(text: string) => {
                    const formatted = formatDate(text, prevBirthDate);
                    setPrevBirthDate(formatted);
                    setBirthDate(formatted);
                }}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                maxLength={10}
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

          <InputContainer>
            <InputLabel>Confirmar senha</InputLabel>
            <StyledInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirme sua senha"
              secureTextEntry
            />
          </InputContainer>

          <RegisterButton onPress={handleRegister} disabled={loading}>
            <ButtonText>{loading ? 'Carregando...' : 'Cadastrar'}</ButtonText>
          </RegisterButton>

          <LoginText>
            Já tem uma conta?{' '}
            <LoginLink onPress={() => navigation.navigate('Login')}>
              Faça login
            </LoginLink>
          </LoginText>
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
`;

const HeaderTitle = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.bold};
  font-size: ${theme.typography.title.fontSize};
`;

const EmptyView = styled.View`
  width: 40px;
`;

const ContentContainer = styled.ScrollView`
  flex: 1;
  padding: 30px;
`;

const InputContainer = styled.View`
  margin-bottom: 20px;
`;

const InputLabel = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular};
  font-size: ${theme.typography.subtitle.fontSize};
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

const RegisterButton = styled.TouchableOpacity`
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
  font-size: ${theme.typography.subtitle.fontSize};
`;

const LoginText = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular};
  font-size: ${theme.typography.subtitle.fontSize};
  text-align: center;
  margin-top: 20px;
`;

const LoginLink = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.bold};
`;