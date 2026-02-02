import { FC, Fragment } from 'react';
import { observer } from 'mobx-react';
import Historic from '~/components/Historic';
import StatusCards from '~/components/StatusCards';
import TopBar from '~/components/TopBar/TopBar';
import { useUserName } from '~/utils/hooks';

interface HomeProps {
  data: HomeResponse | null;
  loading: boolean;
  onFilterChange: () => void;
}

const Home: FC<HomeProps> = observer(({ data, loading, onFilterChange }) => {
  const userName = useUserName();

  return (
    <Fragment>
      <TopBar userName={userName} />
      <StatusCards
        data={data}
        loading={loading}
        onFilterChange={onFilterChange}
      />
      <Historic />
    </Fragment>
  );
});

export default Home;
