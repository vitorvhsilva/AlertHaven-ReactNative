import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native';

type UserScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'User'>;
};

export const UserScreen: React.FC<UserScreenProps> = ({ navigation }) => {
  const [userData, setuserData] = useState<{
    photo?: any;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birthDate: string;
    accountCreated: string;
  } | null>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    setuserData({
      photo: require('../../assets/icons/usuario.png'),
      name: user?.nome || 'Nome não informado',
      email: user?.email || 'Email não informado',
      cpf: user?.cpf || 'CPF não informado',
      phone: user?.telefone || 'Telefone não informado',
      birthDate: user?.dataNascimento || 'Data não informada',
      accountCreated: user?.dataCriacao || 'Data não informada'
    });
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.replace('Auth'); 
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Logout realizado com sucesso!',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível fazer logout',
        position: 'bottom',
      });
    }
  };

  return (
    <Container>
      <Header>
        <BackContainer onPress={() => navigation.navigate('Home')}>
          <BackImage source={require('../../assets/icons/voltar.png')} />
        </BackContainer>
        <HeaderTitle>Meu Perfil</HeaderTitle>
        <EmptyView /> 
      </Header>

      <ProfileContainer>
        <ProfilePhotoContainer>
          <ProfilePhoto source={userData?.photo} />
          <EditPhotoButton onPress={() => navigation.navigate('EditUser')}>
            <EditIcon source={require('../../assets/icons/editar.png')} />
          </EditPhotoButton>
        </ProfilePhotoContainer>

        <UserInfoContainer>
          <InfoItem>
            <InfoLabel>Nome completo</InfoLabel>
            <InfoValue>{userData?.name}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>E-mail</InfoLabel>
            <InfoValue>{userData?.email}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>CPF</InfoLabel>
            <InfoValue>{userData?.cpf}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Telefone</InfoLabel>
            <InfoValue>{userData?.phone}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Data de nascimento</InfoLabel>
            <InfoValue>{userData?.birthDate}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Conta criada em</InfoLabel>
            <InfoValue>{userData?.accountCreated}</InfoValue>
          </InfoItem>
        </UserInfoContainer>

        <ButtonContainer>
          <EditButton onPress={() => navigation.navigate('EditUser')}>
            <ButtonText>Editar Perfil</ButtonText>
          </EditButton>
          <LogoutButton onPress={handleLogout}>
            <ButtonText>Sair</ButtonText>
          </LogoutButton>
        </ButtonContainer>
      </ProfileContainer>
      <Toast />
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
  font-size: 20px;
`;

const EmptyView = styled.View`
  width: 40px;
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

const InfoValue = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  padding: 10px;
  background-color: ${theme.colors.roxo2};
  border-radius: 8px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
`;

const EditButton = styled.TouchableOpacity`
  background-color: ${theme.colors.roxo1};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 15px;
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: ${theme.colors.vermelho};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.bold};
  font-size: 16px;
`;