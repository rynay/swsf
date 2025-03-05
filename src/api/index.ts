import { Row, TreeRows } from "../types";
import { defaultRow } from "./constants";
import { API_ROUTES } from "./routes";

export const createEntity = async (): Promise<string | undefined> => {
  try {
    const response = await fetch(API_ROUTES.CREATE_ENTITY, {
      method: "POST",
    });
    const result = await response.json();
    return result?.id;
  } catch (error) {
    console.error(error);
  }
};

export const getTreeRows = async (
  entityId: string,
): Promise<TreeRows[] | undefined> => {
  try {
    const response = await fetch(API_ROUTES.GET_LIST(entityId));
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const createRow = async (entityId: string, value: Partial<TreeRows>) => {
  try {
    const response = await fetch(API_ROUTES.CREATE_ROW(entityId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...defaultRow,
        ...value,
        equipmentCosts: Number(value.equipmentCosts ?? "0"),
        estimatedProfit: Number(value.estimatedProfit ?? "0"),
        machineOperatorSalary: Number(value.machineOperatorSalary ?? "0"),
        mainCosts: Number(value.mainCosts ?? "0"),
        materials: Number(value.materials ?? "0"),
        mimExploitation: Number(value.mimExploitation ?? "0"),
        overheads: Number(value.overheads ?? "0"),
        salary: Number(value.salary ?? "0"),
        supportCosts: Number(value.supportCosts ?? "0"),
        id: Number(value.id ?? "0"),
        total: Number(value.total ?? "0"),
      }),
    });
    const result = await response.json();
    return {
      ...result.current,
      parentId: result.current.parentId ?? value.parentId ?? null,
      child: result.current.child ?? value.child ?? [],
    } as TreeRows;
  } catch (error) {
    console.error(error);
  }
};

export const updateRow = async (
  entityId: string,
  rowId: string,
  value: Partial<Row>,
) => {
  try {
    const response = await fetch(API_ROUTES.UPDATE_ROW(entityId, rowId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...defaultRow,
        ...value,
        equipmentCosts: Number(value.equipmentCosts ?? "0"),
        estimatedProfit: Number(value.estimatedProfit ?? "0"),
        machineOperatorSalary: Number(value.machineOperatorSalary ?? "0"),
        mainCosts: Number(value.mainCosts ?? "0"),
        materials: Number(value.materials ?? "0"),
        mimExploitation: Number(value.mimExploitation ?? "0"),
        overheads: Number(value.overheads ?? "0"),
        salary: Number(value.salary ?? "0"),
        supportCosts: Number(value.supportCosts ?? "0"),
        id: Number(value.id ?? "0"),
        total: Number(value.total ?? "0"),
      }),
    });
    const result = await response.json();
    return result.current as Partial<TreeRows>;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRow = async (entityId: string, rowId: string) => {
  try {
    const response = await fetch(API_ROUTES.DELETE_ROW(entityId, rowId), {
      method: "DELETE",
    });
    const result = await response.json();
    console.log({ result });
  } catch (error) {
    console.error(error);
  }
};
