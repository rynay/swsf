import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { ReactComponent as NavIcon } from "../../assets/navlink.svg";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const NavLink: FC<Props> = ({ children, ...props }) => {
  return (
    <button {...props}>
      <NavIcon />
      <span>{children}</span>
    </button>
  );
};
