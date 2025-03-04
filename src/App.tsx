import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import styles from "./App.module.scss";
import {
  createEntity,
  createRow,
  deleteRow,
  getTreeRows,
  updateRow,
} from "./api";
import { useCallback, useEffect, useState } from "react";
import { TreeRows } from "./types";
import Row from "./components/Row";
import { addRowToTree, deleteRowFromTree, updateTree } from "./helpers";
import { useLocaleStorage } from "./hooks/useLocaleStorage";

const App = () => {
  const [entityId, setEntityId] = useLocaleStorage<string>("entityId");
  const [treeRows, setTreeRows] = useState<TreeRows>();
  const [itemOnEdit, setItemOnEdit] = useState<"new" | number | null>(null);

  useEffect(() => {
    if (entityId) return;
    const fetchData = async () => {
      setEntityId((await createEntity()) ?? null);
    };
    fetchData();
  }, [entityId, setEntityId]);

  useEffect(() => {
    if (!entityId) return;
    const fetchData = async () => {
      setTreeRows((await getTreeRows(entityId))?.[0]);
    };
    fetchData();
  }, [entityId]);

  const handleChangeRow = useCallback(
    async (value: Partial<TreeRows>) => {
      if (!entityId) return;
      if (value.id) {
        const result = await updateRow(entityId, value.id?.toString(), value);

        if (result) {
          setTreeRows((tree) => updateTree(tree!, result!));
        }
      } else {
        const result = await createRow(entityId, value);

        if (result) {
          setTreeRows((tree) =>
            !tree?.id ? result : addRowToTree(tree, result),
          );
        }
      }
    },
    [entityId],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!entityId) return;
      await deleteRow(entityId, id.toString());
      setTreeRows((tree) => (tree ? deleteRowFromTree(tree, id) : tree));
    },
    [entityId],
  );

  useEffect(() => {
    if (treeRows === null) setTreeRows({} as TreeRows);
  }, [treeRows]);

  return (
    <>
      <Header />
      <div className={styles.layout}>
        <Sidebar />
        <Main>
          {treeRows && (
            <Row
              onDelete={handleDelete}
              itemOnEditId={itemOnEdit}
              handleSetItemOnEditId={setItemOnEdit}
              level={1}
              onSubmit={handleChangeRow}
              value={treeRows}
              initiallyOnEdit={!treeRows?.id}
            />
          )}
        </Main>
      </div>
    </>
  );
};

export default App;
