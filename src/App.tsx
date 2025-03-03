import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import styles from './App.module.scss';
import { createEntity, getTreeRows } from './api';
import { useEffect, useState } from 'react';
import { useLocaleStorage } from './hooks/useLocaleStorage';
import { TreeRows } from './types';
import Row from './components/Row';

const App = () => {
  const [entityId, setEntityId] = useLocaleStorage<string>('entityId');
  const [treeRows, setTreeRows] = useState<TreeRows>();

  useEffect(() => {
    const fetchData = async () => {
      setEntityId(await createEntity());
    }
    fetchData();
  }, [setEntityId])

  useEffect(() => {
    if (!entityId) return;
    const fetchData = async () => {
      // await getTreeRows(entityId)
      setTreeRows(await getTreeRows(entityId));
    }
    fetchData();
  }, [entityId]);

  return (
    <>
      <Header />
      <div className={styles.layout}>
        <Sidebar />
        <Main>
          {treeRows && <Row value={treeRows} initiallyOnEdit={!treeRows?.id} />}
        </Main>
      </div>
    </>
  );
}

export default App;
