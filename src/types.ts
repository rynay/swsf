export type EntityResponse = {
    id: number;
    rowName: string;
}

export type TreeRows = {
    equipmentCosts: number;
    estimatedProfit: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    parentId?: number;
    rowName: string
    salary: number;
    supportCosts: number;
    id: number;
    total: number;
    child: TreeRows[];
}