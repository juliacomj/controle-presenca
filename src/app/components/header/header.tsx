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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
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
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <h1 className={styles.title}>Escola Octógono</h1>
        <span>
          <Avatar
            aria-label="Guest"
            image={<Image alt="avatar" src={"/avatar.svg"} />}
          />
          <span className={styles.menu}>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuButton></MenuButton>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem>Perfil</MenuItem>
                  <MenuItem onClick={signOut}>Sair</MenuItem>
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
