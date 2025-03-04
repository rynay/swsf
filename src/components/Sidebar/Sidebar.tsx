import NavLink from "../NavLink";
import { ReactComponent as ArrowDown } from "../../assets/arrow-down.svg";
import styles from "./Sidebar.module.scss";
import classNames from "classnames";

const linkNames = [
  "По проекту",
  "Объекты",
  "РД",
  "МТО",
  "СМР",
  "График",
  "МиМ",
  "Рабочие",
  "Капвложения",
  "Бюджет",
  "Финансирование",
  "Панорамы",
  "Камеры",
  "Поручения",
  "Контрагенты",
];

const activeLinkName = "СМР";

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <button className={styles.sidebar__header}>
        <div>
          <span>Название проекта</span>
          <span>Аббревиатура</span>
        </div>
        <ArrowDown />
      </button>
      <nav className={styles.sidebar__nav}>
        {linkNames.map((linkName) => (
          <NavLink
            key={linkName}
            className={classNames({
              [styles.active]: linkName === activeLinkName,
            })}
          >
            {linkName}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
