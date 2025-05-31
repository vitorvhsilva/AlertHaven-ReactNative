import React, { useState } from 'react';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { TextInput } from 'react-native';

type EditUserScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditUser'>;
};

export const EditUserScreen: React.FC<EditUserScreenProps> = ({ navigation}) => {
  const [userData, setUserData] = useState({
    photo: require('../../assets/icons/usuario.png'),
    name: 'Vitor Silva',
    email: 'vitor@example.com',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    birthDate: '15/05/1990',
  });

  const handleSave = () => {
    console.log('Dados salvos:', userData);
    navigation.navigate('User');
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
            />
          </InfoItem>

          <InfoItem>
            <InfoLabel>E-mail</InfoLabel>
            <StyledInput
              value={userData.email}
              onChangeText={(text: string) => setUserData({...userData, email: text})}
              keyboardType="email-address"
              placeholder="Digite seu e-mail"
            />
          </InfoItem>

          <InfoItem>
            <InfoLabel>CPF</InfoLabel>
            <StyledInput
              value={userData.cpf}
              onChangeText={(text: string) => setUserData({...userData, cpf: text})}
              keyboardType="numeric"
              placeholder="Digite seu CPF"
            />
          </InfoItem>

          <InfoItem>
            <InfoLabel>Telefone</InfoLabel>
            <StyledInput
              value={userData.phone}
              onChangeText={(text: string) => setUserData({...userData, phone: text})}
              keyboardType="phone-pad"
              placeholder="Digite seu telefone"
            />
          </InfoItem>

          <InfoItem>
            <InfoLabel>Data de nascimento</InfoLabel>
            <StyledInput
              value={userData.birthDate}
              onChangeText={(text: string) => setUserData({...userData, birthDate: text})}
              placeholder="DD/MM/AAAA"
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