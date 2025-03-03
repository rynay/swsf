import { FC, PropsWithChildren } from 'react';
import styles from './Main.module.scss';

const cells = [
    'Уровень',
    'Наименование работ',
    'Основная з/п',
    'Оборудование',
    'Накладные расходы',
    'Сметная прибыль',
]

export const Main: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.main}>
            <h2>
                <span>Строительно-монтажные работы</span>
            </h2>
            <section>
                {cells.map(cell => <button key={cell}>{cell}</button>)}
            </section>
            <main>
                {children}
            </main>
        </div>
    )
};