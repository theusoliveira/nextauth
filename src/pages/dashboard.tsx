import { useContext, useEffect } from 'react';
import { Can } from '../components/Can';
import { AuthContext } from '../contexts/AuthContext';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get('/me')
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Bem vindo, {user?.email}</h1>

      <Can permissions={['metrics.list']}>Métricas</Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx);
  await apiClient.get('/me');

  return {
    props: {},
  };
});
