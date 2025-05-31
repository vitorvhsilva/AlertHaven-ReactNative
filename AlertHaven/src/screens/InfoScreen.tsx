import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from "styled-components/native";
import theme from "../styles/theme";

type InfoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Info'>;
};

export const InfoScreen: React.FC<InfoScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <BackContainer onPress={() => navigation.navigate("Home")}>
          <BackImage source={require('../../assets/icons/voltar.png')}/>
        </BackContainer>
      </Header>
      
      <ContentContainer>
        <InfoTitleText>Sobre o Aplicativo</InfoTitleText>
        
        <InfoCard>
          <InfoSubtitleText>Monitoramento Climático em Tempo Real</InfoSubtitleText>
          <InfoText>
            Nosso aplicativo fornece informações atualizadas sobre eventos climáticos extremos,
            ajudando comunidades a se prepararem e responderem a emergências ambientais.
          </InfoText>
        </InfoCard>

        <InfoCard>
          <InfoSubtitleText>Funcionalidades Principais</InfoSubtitleText>
          <InfoList>
            <InfoListItem>• Mapa interativo com eventos climáticos em tempo real</InfoListItem>
            <InfoListItem>• Alertas personalizados para sua região</InfoListItem>
            <InfoListItem>• Localização de abrigos e pontos de apoio</InfoListItem>
            <InfoListItem>• Dicas de preparação e segurança</InfoListItem>
          </InfoList>
        </InfoCard>

        <InfoCard>
          <InfoSubtitleText>Como Utilizar</InfoSubtitleText>
          <InfoText>
            1. Navegue pelo mapa para ver os eventos ativos{'\n'}
            2. Use os filtros para encontrar informações específicas{'\n'}
            3. Toque em marcadores para detalhes completos{'\n'}
            4. Ative notificações para alertas na sua área
          </InfoText>
        </InfoCard>

        <InfoCard>
          <InfoSubtitleText>Contato e Suporte</InfoSubtitleText>
          <InfoText>
            Dúvidas ou problemas? Entre em contato:{'\n'}
            alerthaven.suporte@alerthaven.com{'\n'}
            (11) 99999-9999
          </InfoText>
        </InfoCard>
        </ContentContainer>

        <ContentContainer>
        <InfoIntensityCard>
            <InfoSubtitleText>Eventos Climáticos e Suas Intensidades</InfoSubtitleText>
            
            <InfoText>
                Nosso mapa exibe diferentes tipos de eventos climáticos com cores que indicam sua intensidade:
            </InfoText>
            
            <IntensityContainer>
                <IntensityItem>
                <IntensityColor color={theme.colors.intensidade_fraca} />
                <IntensityTextContainer>
                    <IntensityTitle>Intensidade Fraca</IntensityTitle>
                    <IntensityDescription>
                    Eventos com baixo impacto: pequenos alagamentos, chuvas leves, ondas de calor moderadas
                    </IntensityDescription>
                </IntensityTextContainer>
                </IntensityItem>
                
                <IntensityItem>
                <IntensityColor color={theme.colors.intensidade_media} />
                <IntensityTextContainer>
                    <IntensityTitle>Intensidade Média</IntensityTitle>
                    <IntensityDescription>
                    Eventos com impacto moderado: tempestades, ventos fortes, alagamentos médios
                    </IntensityDescription>
                </IntensityTextContainer>
                </IntensityItem>
                
                <IntensityItem>
                <IntensityColor color={theme.colors.intensidade_alta} />
                <IntensityTextContainer>
                    <IntensityTitle>Intensidade Alta</IntensityTitle>
                    <IntensityDescription>
                    Eventos graves: tornados, enchentes severas, terremotos fortes
                    </IntensityDescription>
                </IntensityTextContainer>
                </IntensityItem>
            </IntensityContainer>
        
            <InfoText style={{marginTop: 15}}>
                O tamanho do círculo no mapa indica a área afetada pelo evento.
            </InfoText>
        </InfoIntensityCard>
        </ContentContainer>
    </Container>
  );
};

const Container = styled.ScrollView`
  background-color: ${theme.colors.preto};
`;

const ContentContainer = styled.View`
  padding: 20px;
`;

const Header = styled.View`
  width: 100%;
  padding: 20px;
  background-color: ${theme.colors.preto};
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

const InfoTitleText = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.bold}; 
  font-size: ${theme.typography.title.fontSize};
  margin-bottom: 30px;
  text-align: center;
`;

const InfoCard = styled.View`
  background-color: ${theme.colors.roxo2};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const InfoIntensityCard = styled.View`
  background-color: ${theme.colors.roxo1};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const InfoSubtitleText = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.bold}; 
  font-size: ${theme.typography.subtitle.fontSize};
  margin-bottom: 10px;
`;

const InfoText = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.regular}; 
  font-size: ${theme.typography.body.fontSize};
  line-height: 24px;
`;

const InfoList = styled.View`
  margin-left: 10px;
`;

const InfoListItem = styled(InfoText)`
  margin-bottom: 5px;
`;

const IntensityContainer = styled.View`
  margin-top: 15px;
`;

const IntensityItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const IntensityColor = styled.View<{color: string}>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => props.color};
  margin-right: 12px;
`;

const IntensityTextContainer = styled.View`
  flex: 1;
`;

const IntensityTitle = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  margin-bottom: 2px;
`;

const IntensityDescription = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  line-height: 18px;
`;