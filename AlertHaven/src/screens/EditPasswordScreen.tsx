import React, { useState } from 'react';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { TextInput } from 'react-native';
import Toast from 'react-native-toast-message';

type EditPasswordScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditPassword'>;
};

export const EditPasswordScreen: React.FC<EditPasswordScreenProps> = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Preencha todos os campos',
        position: 'bottom',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'As senhas não coincidem',
        position: 'bottom',
      });
      return;
    }

    if (newPassword.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'A senha deve ter pelo menos 8 caracteres',
        position: 'bottom',
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Senha alterada com sucesso!',
        position: 'bottom',
      });
      navigation.navigate('User');
    }, 1500);
  };

  return (
      <Container>
        <Header>
          <BackContainer onPress={() => navigation.navigate('EditUser')}>
            <BackImage source={require('../../assets/icons/voltar.png')} />
          </BackContainer>
          <HeaderTitle>Alterar Senha</HeaderTitle>
          <EmptyView />
        </Header>

        <ContentContainer>
          <PasswordContainer>
            <InfoItem>
              <InfoLabel>Senha atual</InfoLabel>
              <PasswordInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Digite sua senha atual"
                secureTextEntry
                placeholderTextColor={theme.colors.cinza}
              />
            </InfoItem>

            <InfoItem>
              <InfoLabel>Nova senha</InfoLabel>
              <PasswordInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Digite a nova senha"
                secureTextEntry
                placeholderTextColor={theme.colors.cinza}
              />
            </InfoItem>

            <InfoItem>
              <InfoLabel>Confirmar nova senha</InfoLabel>
              <PasswordInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirme a nova senha"
                secureTextEntry
                placeholderTextColor={theme.colors.cinza}
              />
            </InfoItem>

            <PasswordRequirements>
              <RequirementText>Mínimo de 8 caracteres</RequirementText>
              <RequirementText>Recomendamos usar números e símbolos</RequirementText>
            </PasswordRequirements>
          </PasswordContainer>

          <SaveButton 
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            <ButtonText>
              {isLoading ? 'Processando...' : 'Salvar Alterações'}
            </ButtonText>
          </SaveButton>
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
  font-size: 20px;
`;

const EmptyView = styled.View`
  width: 40px;
`;

const ContentContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const PasswordContainer = styled.View`
  margin-bottom: 30px;
`;

const InfoItem = styled.View`
  margin-bottom: 20px;
`;

const InfoLabel = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  margin-bottom: 8px;
`;

const PasswordInput = styled(TextInput)`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  padding: 15px;
  background-color: ${theme.colors.roxo2};
  border-radius: 10px;
  border-width: 1px;
  border-color: ${theme.colors.roxo1};
`;

const PasswordRequirements = styled.View`
  margin-top: 20px;
  padding: 15px;
  background-color: ${theme.colors.roxo2};
  border-radius: 10px;
`;

const RequirementText = styled.Text`
  color: ${theme.colors.cinza};
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  margin-bottom: 5px;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: ${theme.colors.roxo1};
  padding: 18px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

const ButtonText = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.bold};
  font-size: 16px;
`;