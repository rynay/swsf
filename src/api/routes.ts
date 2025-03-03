const API = 'http://185.244.172.108:8081';

export const API_ROUTES = {
    CREATE_ENTITY: `${API}/v1/outlay-rows/entity/create`,
    GET_LIST: (entityId: string) => `${API}/v1/outlay-rows/entity/${entityId}/row/list`,
    CREATE_ROW: (entityId: string) => `${API}/v1/outlay-rows/entity/${entityId}/row/create`,
    UPDATE_ROW: (entityId: string, rowId: string) =>  `${API}/v1/outlay-rows/entity/${entityId}/row/${rowId}/update`,
    DELETE_ROW: (entityId: string, rowId: string) => `${API}/v1/outlay-rows/entity/${entityId}/row/${rowId}/delete`,
}