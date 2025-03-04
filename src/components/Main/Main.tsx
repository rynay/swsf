import { FC, PropsWithChildren } from "react";
import styles from "./Main.module.scss";

const cells = [
  "Уровень",
  "Наименование работ",
  "Основная з/п",
  "Оборудование",
  "Накладные расходы",
  "Сметная прибыль",
];

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.main}>
      <h2>
        <span>Строительно-монтажные работы</span>
      </h2>
      <div className={styles.page}>
        <main>
          {cells.map((cell) => (
            <button className={styles.button} key={cell}>
              {cell}
            </button>
          ))}
          {children}
        </main>
      </div>
    </div>
  );
};
