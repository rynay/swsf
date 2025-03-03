import { TreeRows } from "../types";
import { API_ROUTES } from "./routes"

export const createEntity = async (): Promise<string | undefined> => {
    try {
        const response = await fetch(API_ROUTES.CREATE_ENTITY, { method: 'POST' });
        const result = await response.json();
        return result?.id;
    } catch (error) {
        console.error(error)
    }
}

export const getTreeRows = async (entityId: string): Promise<TreeRows | undefined> => {
    try {
        const response = await fetch(API_ROUTES.GET_LIST(entityId));
        return await response.json();
    } catch (error) {
        console.error(error)
    }
}

export const createRow = async (entityId: string) => {
    try {
        const response = await fetch(API_ROUTES.CREATE_ROW(entityId), { method: 'POST' });
        const result = await response.json();
        console.log({ result })
    } catch (error) {
        console.error(error)
    }
}

export const updateRow = async (entityId: string, rowId: string) => {
    try {
        const response = await fetch(
            API_ROUTES.UPDATE_ROW(entityId, rowId),
            { method: 'POST' },
        );
        const result = await response.json();
        console.log({ result });
    } catch (error) {
        console.error(error)
    }
}

export const deleteRow = async (entityId: string, rowId: string) => {
    try {
        const response = await fetch(
            API_ROUTES.DELETE_ROW(entityId, rowId),
            { method: 'DELETE' },
        );
        const result = await response.json();
        console.log({ result });
    } catch (error) {
        console.error(error)
    }
}