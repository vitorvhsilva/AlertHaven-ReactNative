import styled from "styled-components/native";
import theme from "../styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useNavigation } from '@react-navigation/native';

type AlertType = {
  id: string;
  type: 'ALAGAMENTO' | 'TEMPESTADE' | 'TORNADO' | 'ONDA_DE_CALOR' | 'TERREMOTO' | 'ABRIGO';
  message: string;
  coordinates: string;
  date: string;
};

type AlertsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Alerts'>;
};

export const AlertsScreen: React.FC<AlertsScreenProps> = ({ navigation }) => { 
  const alerts: AlertType[] = [
    {
      id: '1',
      type: 'TEMPESTADE',
      message: 'Chuva forte prevista',
      coordinates: '-23.5505, -46.6333',
      date: '10/05/2023 14:30'
    },
    {
      id: '2',
      type: 'ALAGAMENTO',
      message: 'Alagamento na região central',
      coordinates: '-23.5510, -46.6340',
      date: '10/05/2023 12:45'
    },
    {
      id: '3',
      type: 'ONDA_DE_CALOR',
      message: 'Temperaturas acima de 40°C',
      coordinates: '-23.5520, -46.6350',
      date: '09/05/2023 10:15'
    },
    {
      id: '4',
      type: 'TERREMOTO',
      message: 'Terremoto magnitude 3.2',
      coordinates: '-23.5530, -46.6360',
      date: '08/05/2023 08:20'
    },
    {
      id: '5',
      type: 'ABRIGO',
      message: 'Abrigo disponível para desabrigados',
      coordinates: '-23.5540, -46.6370',
      date: '07/05/2023 16:40'
    }
  ];

  const alertIcons = {
    ALAGAMENTO: require('../../assets/icons/alagamento.png'),
    TEMPESTADE: require('../../assets/icons/chuva.png'),
    TORNADO: require('../../assets/icons/tornado.png'),
    ONDA_DE_CALOR: require('../../assets/icons/onda_calor.png'),
    TERREMOTO: require('../../assets/icons/terremoto.png'),
    ABRIGO: require('../../assets/icons/abrigo.png')
  };

  return (
    <Container>
      <Header>
        <BackContainer onPress={() => navigation.navigate("Home")}>
          <BackImage source={require('../../assets/icons/voltar.png')}/>
        </BackContainer>
      </Header>
      <TitleText>Últimos Alertas</TitleText>
      <AlertsContainer>
        {alerts.map((alert) => (
          <Alert key={alert.id}>
            <AlertImage source={alertIcons[alert.type]} />
            <AlertContent>
                <AlertTitle>
                    {alert.type
                        .replace('_', ' ')
                        .replace('_', ' ')
                        .toLowerCase()   
                        .replace(/\b\w/g, l => l.toUpperCase()) 
                    }
                </AlertTitle>
              <AlertMessage>{alert.message}</AlertMessage>
              <AlertDetails>
                <AlertDetailText>Local: {alert.coordinates}</AlertDetailText>
                <AlertDetailText>Data: {alert.date}</AlertDetailText>
              </AlertDetails>
            </AlertContent>
          </Alert>
        ))}
      </AlertsContainer>
    </Container>
  );
};

const Container = styled.ScrollView`
  display: flex;
  background-color: ${theme.colors.preto};
  padding: 20px;
`;

const Header = styled.View`
  width: 100%;
  height: fit-content;
  margin-bottom: 20px;
`;

const BackContainer = styled.TouchableOpacity`
  width: fit-content;
  height: fit-content;
  padding: 5px;
`;

const BackImage = styled.Image`
  width: 40px;
  height: 40px;
`;

const TitleText = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.bold}; 
  font-size: ${theme.typography.title.fontSize};
  margin-bottom: 20px;
`;

const AlertsContainer = styled.View`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Alert = styled.View`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${theme.colors.roxo1};
  border-radius: 10px;
  padding: 15px;
  gap: 15px;
`;

const AlertImage = styled.Image`
  width: 60px;
  height: 60px;
`;

const AlertContent = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const AlertTitle = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.bold};
  font-size: ${theme.typography.subtitle.fontSize};
  text-transform: capitalize;
`;

const AlertMessage = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular};
  font-size: ${theme.typography.body.fontSize};
`;

const AlertDetails = styled.View`
  margin-top: 5px;
`;

const AlertDetailText = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular};
  font-size: ${theme.typography.subtitle.fontSize};
`;