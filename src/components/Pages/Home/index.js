import React, { useContext } from 'react';
import { Posts } from '../../Posts';
import { Layout } from '../../Pages';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../UserContext';

export function Home() {
  const { user } = useContext(UserContext);
  const history = useHistory();

  if (!user) {
    history.push('/login');
  }

  return (
    <Layout>
      <Posts />
    </Layout>
  );
}
