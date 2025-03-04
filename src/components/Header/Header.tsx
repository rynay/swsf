import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__icons}>
        <MenuIcon />
        <BackIcon />
      </div>
      <button className={styles.active}>Просмотр</button>
      <button>Управление</button>
    </header>
  );
};
