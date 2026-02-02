import { TechnicalManagerNfItem } from '~/api/technicalManager';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import Divider from '~/components/Divider';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import MainContentContainer from '~/components/MainContentContainer';
import TechnicalManagerItem from '~/components/TechnicalManagerItem';
import { Text } from '~/components/Typography/styles';
import { useStore } from '~/stores';
import { withGestorTecnicoView } from '~/utils/hocs';
import { useUserName } from '~/utils/hooks';
import { ScrollableContainer } from '../styles';
import { TitleContainer } from './styles';

interface GestorTecnicoItemProps {
  data: TechnicalManagerNfItem[];
  isLoading: boolean;
}

const GestorTecnicoItem = ({ data, isLoading }: GestorTecnicoItemProps) => {
  const nfe = sessionStorage.getItem('selectedNf');
  const { maintenanceStore } = useStore();
  const userName = useUserName();
  console.log(data);

  return (
    <MainContentContainer
      title="Gestor Técnico"
      actionArea={false}
      userName={userName}
      icon="check_circle"
      goBack={true}
    >
      <Divider />
      <TitleContainer>
        <Text variant="title">
          NF-e {nfe} - Nº referencia:{' '}
          {maintenanceStore.maintenanceNfItems?.fluigNumber || ''}
        </Text>
      </TitleContainer>
      <ScrollableContainer>
        {isLoading ? (
          <TableSkeleton />
        ) : data.length === 0 ? (
          <EmptyStateFeedback text="Nenhum item de gestor técnico encontrado" />
        ) : (
          data.map((item, index) => (
            <TechnicalManagerItem key={index} item={item} nf={nfe!} />
          ))
        )}
      </ScrollableContainer>
    </MainContentContainer>
  );
};

export default withGestorTecnicoView(GestorTecnicoItem);
