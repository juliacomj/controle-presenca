"use client";

import {
  Avatar,
  CardFooter,
  Label,
  makeStyles,
} from "@fluentui/react-components";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { useRouter } from "next/navigation";

const useStyles = makeStyles({
  navbar: {
    width: "100%",
    backgroundColor: "#4C27D3",
    height: "50px",
    paddingRight: "10px",
    paddingLeft: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },

  title: {
    paddingTop: "10px",
    color: "#fff",
  },

  menu: {
    marginLeft: "10px",
  },

  footer: {
    display: "flex",
    flexDirection: "column",
    paddingRight: "10px",
    paddingLeft: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderTopColor: "black",
    borderBottomColor: "black",
    borderLeftColor: "black",
    borderRightColor: "black",
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
  },
});

export function Header() {
  const styles = useStyles();
  const router = useRouter();

  return (
    <>
      <nav className={styles.navbar}>
        <h1 className={styles.title}>Escola Octógono</h1>
        <span>
          <Avatar aria-label="Guest" image={{ src: "/avatar.png" }} />
          <span className={styles.menu}>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuButton></MenuButton>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem>Perfil</MenuItem>
                  <MenuItem onClick={() => router.push("/")}>Sair</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </span>
        </span>
      </nav>
      <CardFooter className={styles.footer}>
        <Label size="large">Funcionario: Nome</Label>
        <Label size="large">Matricula: 000000</Label>
        <Label size="large">Data: 01/01/2024</Label>
      </CardFooter>
    </>
  );
}
