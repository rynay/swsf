import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import styles from "./Placeholder.module.scss";
import classNames from "classnames";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  danger?: boolean;
};

export const Placeholder: FC<Props> = ({ danger, ...props }) => {
  return (
    <div
      {...props}
      className={classNames(styles.placeholder, props.className, {
        [styles.placeholder_danger]: danger,
      })}
    />
  );
};
