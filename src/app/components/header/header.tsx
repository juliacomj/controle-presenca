"use client";

import { getUserData } from "../../auth/utils/getUserData";
import { Employee } from "../../interfaces/Employee/Employee";
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
  const [employee, setEmployee] = useState<Employee>();
  const date = new Date().toLocaleDateString("pt-BR");

  const loadEmployee = async () => {
    const user = await getUserData();
    setEmployee(user);
  };

  React.useEffect(() => {
    loadEmployee();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  const openProfile = async () => {
    router.refresh();
    router.push("/profile");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <h1 className={styles.title}>Escola Octógono</h1>
        <span>
          <Avatar aria-label="Guest" image={{ src: employee?.avatar ?? "" }} />
          <span className={styles.menu}>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuButton></MenuButton>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem onClick={openProfile}>Perfil</MenuItem>
                  <MenuItem onClick={signOut}>Sair</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </span>
        </span>
      </nav>
      <CardFooter className={styles.footer}>
        <Label size="large">Funcionario: {employee?.nome}</Label>
        <Label size="large">Matricula: {employee?.id}</Label>
        <Label size="large">Data: {date}</Label>
      </CardFooter>
    </>
  );
}
