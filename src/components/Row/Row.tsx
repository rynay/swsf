import { FC, useCallback, useEffect, useState } from "react";
import { TreeRows } from "../../types";
import styles from "./Row.module.scss";
import { ReactComponent as ListIcon } from "../../assets/list.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash.svg";
import classNames from "classnames";
import Placeholder from "../Placeholder";

type Props = {
  value: Partial<TreeRows>;
  initiallyOnEdit?: boolean;
  level: number;
  initialDeleteLoading?: boolean;
  itemOnEditId: "new" | number | null;
  handleSetItemOnEditId: (id: "new" | number | null) => void;
  onSubmit: (value: Partial<TreeRows>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

const fieldNames = [
  "rowName" as const,
  "salary" as const,
  "equipmentCosts" as const,
  "overheads" as const,
  "estimatedProfit" as const,
];

export const Row: FC<Props> = ({
  level,
  value,
  onSubmit,
  onDelete,
  initiallyOnEdit = false,
  itemOnEditId,
  handleSetItemOnEditId,
  initialDeleteLoading = false,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(initialDeleteLoading);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(initiallyOnEdit);
  const [onAddNew, setOnAddNew] = useState(false);
  const [values, setValues] = useState<Partial<TreeRows>>(
    fieldNames.reduce(
      (res, field) => ({
        ...res,
        [field]: value[field] ?? "",
      }),
      {},
    ),
  );

  const handleChange = useCallback(
    (fieldName: keyof TreeRows, value: string) => {
      setValues((values) => ({
        ...values,
        [fieldName]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (value: Partial<TreeRows>) => {
      setLoading(true);
      await onSubmit(value);
      setOnAddNew(false);
      setLoading(false);
      handleSetItemOnEditId(null);
    },
    [onSubmit, handleSetItemOnEditId],
  );

  useEffect(() => {
    if (!onEdit) return;
    const listener = (event: KeyboardEvent) => {
      event.stopPropagation();

      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        const { child, ...prev } = value;
        handleSubmit({
          ...prev,
          ...values,
        });
        setOnEdit(false);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [onEdit, value, handleSubmit, values]);

  useEffect(() => {
    if (initiallyOnEdit) handleSetItemOnEditId("new");
  }, [initiallyOnEdit, handleSetItemOnEditId]);

  const handleEdit = useCallback(() => {
    setOnEdit(true);
    handleSetItemOnEditId(value.id ?? null);
  }, [handleSetItemOnEditId, value.id]);

  const handleDelete = useCallback(() => {
    setDeleteLoading(true);
    if (value.id) onDelete(value.id);
  }, [value.id, onDelete]);

  return (
    <>
      <div
        style={{ paddingLeft: `${level * 2}rem` }}
        className={styles.buttons}
        onDoubleClick={itemOnEditId ? undefined : handleEdit}
      >
        <div
          className={classNames(styles.buttons__container, {
            [styles.buttons__container_inactive]: onEdit || itemOnEditId,
          })}
          onClick={(e) => e.stopPropagation()}
        >
          {level !== 1 && <div className={styles.branch} />}
          <button
            className={styles.buttons__add}
            onClick={() => setOnAddNew(true)}
          >
            <ListIcon />
          </button>
          <button className={styles.buttons__delete} onClick={handleDelete}>
            <TrashIcon />
          </button>
        </div>
      </div>
      {onEdit &&
        fieldNames.map((field) => (
          <div key={field} className={styles.inputContainer}>
            <input
              className={styles.input}
              value={values[field]}
              type={field === "rowName" ? "text" : "number"}
              min={0}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        ))}
      {!onEdit &&
        fieldNames.map((field) => (
          <div
            onDoubleClick={itemOnEditId ? undefined : handleEdit}
            key={field}
          >
            {(loading &&
              (value.id
                ? itemOnEditId === value.id
                : itemOnEditId === "new")) ||
            deleteLoading ||
            initialDeleteLoading ? (
              <Placeholder
                className={styles.placeholder}
                danger={deleteLoading || initialDeleteLoading}
              />
            ) : (
              (value[field] ?? <Placeholder className={styles.placeholder} />)
            )}
          </div>
        ))}
      {value.child?.map((el) => (
        <Row
          initialDeleteLoading={deleteLoading || initialDeleteLoading}
          onDelete={onDelete}
          itemOnEditId={itemOnEditId}
          handleSetItemOnEditId={handleSetItemOnEditId}
          level={level + 1}
          onSubmit={onSubmit}
          key={el.id}
          value={el}
        />
      ))}
      {onAddNew && (
        <Row
          onDelete={onDelete}
          itemOnEditId={itemOnEditId}
          handleSetItemOnEditId={handleSetItemOnEditId}
          level={level + 1}
          onSubmit={handleSubmit}
          value={{ parentId: value.id }}
          initiallyOnEdit={true}
        />
      )}
    </>
  );
};
