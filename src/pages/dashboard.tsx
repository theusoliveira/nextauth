import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

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

  return <h1>Bem vindo, {user?.email}</h1>;
}
