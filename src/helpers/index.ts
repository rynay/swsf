import { TreeRows } from "../types";

export const updateTree = (
  tree: TreeRows,
  updatedRow: Partial<TreeRows>,
): TreeRows => {
  if (tree.id === updatedRow.id) {
    return {
      ...tree,
      ...updatedRow,
    };
  } else {
    return {
      ...tree,
      child: tree.child.map((el) => updateTree(el, updatedRow)),
    };
  }
};

export const addRowToTree = (tree: TreeRows, row: TreeRows): TreeRows => {
  if (tree.id === row.parentId) {
    return {
      ...tree,
      child: [...tree.child, row],
    };
  } else {
    return {
      ...tree,
      child: tree.child?.map((el) => addRowToTree(el, row)),
    };
  }
};

export const deleteRowFromTree = (tree: TreeRows, id: number): TreeRows => {
  if (tree.id === id) return null!;
  else
    return {
      ...tree,
      child: tree.child
        .map((el) => deleteRowFromTree(el, id))
        .filter((el) => el),
    };
};
