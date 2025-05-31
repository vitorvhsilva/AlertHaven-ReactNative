import React, { useState } from 'react';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { TextInput } from 'react-native';
import Toast from 'react-native-toast-message';

type EditUserScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditUser'>;
};

export const EditUserScreen: React.FC<EditUserScreenProps> = ({ navigation }) => {
  const [userData, setUserData] = useState({
    photo: require('../../assets/icons/usuario.png'),
    name: 'Vitor Silva',
    email: 'vitor@email.com',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    birthDate: '15/05/1990',
  });

  const validateFields = () => {
    if (!userData.name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, insira seu nome completo',
        position: 'bottom',
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, insira um e-mail válido',
        position: 'bottom',
      });
      return false;
    }
    
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(userData.cpf)) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, insira um CPF válido (XXX.XXX.XXX-XX)',
        position: 'bottom',
      });
      return false;
    }

    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(userData.phone)) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, insira um telefone válido (XX) XXXXX-XXXX',
        position: 'bottom',
      });
      return false;
    }

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(userData.birthDate)) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, insira uma data válida (DD/MM/AAAA)',
        position: 'bottom',
      });
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateFields()) {
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: 'Dados atualizados com sucesso!',
      position: 'bottom',
    });
    
    navigation.navigate('User');
  };

  const formatCPF = (text: string) => {
    let formattedText = text.replace(/\D/g, '');
    
    if (formattedText.length > 3) {
      formattedText = formattedText.replace(/^(\d{3})/, '$1.');
    }
    if (formattedText.length > 7) {
      formattedText = formattedText.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
    }
    if (formattedText.length > 11) {
      formattedText = formattedText.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
    }
    
    return formattedText.substring(0, 14);
  };

  const formatPhone = (text: string) => {
    let formattedText = text.replace(/\D/g, '');
    
    if (formattedText.length > 0) {
      formattedText = `(${formattedText.substring(0, 2)}`;
    }
    if (formattedText.length > 3) {
      formattedText = `${formattedText}) ${formattedText.substring(3, 8)}`;
    }
    if (formattedText.length > 10) {
      formattedText = `${formattedText}-${formattedText.substring(10, 14)}`;
    }
    
    return formattedText.substring(0, 15);
  };

  const formatDate = (text: string) => {
    let formattedText = text.replace(/\D/g, '');
    
    if (formattedText.length > 2) {
      formattedText = `${formattedText.substring(0, 2)}/${formattedText.substring(2, 4)}`;
    }
    if (formattedText.length > 5) {
      formattedText = `${formattedText}/${formattedText.substring(5, 9)}`;
    }
    
    return formattedText.substring(0, 10);
  };

  return (
    <Container>
      <Header>
        <BackContainer onPress={() => navigation.navigate('User')}>
          <BackImage source={require('../../assets/icons/voltar.png')} />
        </BackContainer>
        <HeaderTitle>Editar Perfil</HeaderTitle>
        <SaveButton onPress={handleSave}>
          <SaveText>Salvar</SaveText>
        </SaveButton>
      </Header>

      <ProfileContainer>
        <ProfilePhotoContainer>
          <ProfilePhoto source={userData.photo} />
          <EditPhotoButton>
            <EditIcon source={require('../../assets/icons/editar.png')} />
          </EditPhotoButton>
        </ProfilePhotoContainer>

        <UserInfoContainer>
          <InfoItem>
            <InfoLabel>Nome completo</InfoLabel>
            <StyledInput
              value={userData.name}
              onChangeText={(text: string) => setUserData({...userData, name: text})}
              placeholder="Digite seu nome"
              maxLength={100}
            />
          </InfoItem>

          <InfoItem>
            <InfoLabel>E-mail</InfoLabel>
            <StyledInput
              value={userData.email}
              onChangeText={(text: string) => setUserData({...userData, email: text})}
              keyboardType="email-address"
              placeholder="Digite seu e-mail"
              autoCapitalize="none"
              maxLength={100}
            />
          </InfoItem>

          <InfoItem>
            <InfoLabel>CPF</InfoLabel>
            <StyledInput
              value={userData.cpf}
              onChangeText={(text: string) => setUserData({...userData, cpf: formatCPF(text)})}
              keyboardType="numeric"
              placeholder="000.000.000-00"
              maxLength={14}
            />
          </InfoItem>

          <InfoItem>
            <InfoLabel>Telefone</InfoLabel>
            <StyledInput
              value={userData.phone}
              onChangeText={(text: string) => setUserData({...userData, phone: formatPhone(text)})}
              keyboardType="phone-pad"
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
          </InfoItem>

          <InfoItem>
            <InfoLabel>Data de nascimento</InfoLabel>
            <StyledInput
              value={userData.birthDate}
              onChangeText={(text: string) => setUserData({...userData, birthDate: formatDate(text)})}
              keyboardType="numeric"
              placeholder="DD/MM/AAAA"
              maxLength={10}
            />
          </InfoItem>

          <PasswordChangeButton onPress={() => navigation.navigate('EditPassword')}>
            <PasswordChangeText>Alterar Senha</PasswordChangeText>
          </PasswordChangeButton>
        </UserInfoContainer>
      </ProfileContainer>
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

const SaveButton = styled.TouchableOpacity`
  padding: 8px 16px;
`;

const SaveText = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.bold};
  font-size: 16px;
`;

const ProfileContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const ProfilePhotoContainer = styled.View`
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

const ProfilePhoto = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 3px;
  border-color: ${theme.colors.roxo1};
`;

const EditPhotoButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  bottom: 0;
  background-color: ${theme.colors.roxo2};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const EditIcon = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: ${theme.colors.branco};
`;

const UserInfoContainer = styled.View`
  margin-bottom: 30px;
`;

const InfoItem = styled.View`
  margin-bottom: 20px;
`;

const InfoLabel = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  margin-bottom: 5px;
`;

const StyledInput = styled(TextInput)`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  padding: 12px;
  background-color: ${theme.colors.roxo2};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.colors.roxo1};
`;

const PasswordChangeButton = styled.TouchableOpacity`
  margin-top: 30px;
  padding: 15px;
  background-color: ${theme.colors.roxo1};
  border-radius: 10px;
  align-items: center;
`;

const PasswordChangeText = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.bold};
  font-size: 16px;
`;