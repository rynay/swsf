import { FC, useCallback, useState } from 'react';
import { TreeRows } from '../../types';

type Props = {
    value: TreeRows;
    initiallyOnEdit?: boolean;
}


const fieldNames = [
    'rowName' as const,
    'salary' as const,
    'equipmentCosts' as const,
    'materials' as const,
    'total' as const,
]

export const Row: FC<Props> = ({ value, initiallyOnEdit = false }) => {
    const [onEdit, setOnEdit] = useState(initiallyOnEdit);
    const [values, setValues] = useState<Partial<TreeRows>>(
        fieldNames
            .reduce((res, field) => ({
                ...res, [field]: value[field]
            }), {})
    );

    const handleChange = useCallback((fieldName: keyof TreeRows, value: string) => {
        setValues(values => ({
            ...values,
            [fieldName]: value,
        }))
    }, [])

    return (
        <>
            <div>кнопки</div>
            {onEdit && (
                fieldNames
                    .map(field => (
                        <input
                            value={values[field]}
                            onChange={(e) => handleChange(field, e.target.value)}
                        />
                    ))
            )}
            {!onEdit && fieldNames.map(field => <div key={field}>{value[field]}</div>)}
            {value.child?.map(el => <Row key={el.id} value={el} />)}
        </>
    )
}
