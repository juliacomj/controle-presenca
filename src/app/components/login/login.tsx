"use client";
import * as React from "react";
import {
  Body1,
  Card,
  CardHeader,
  Input,
  Label,
  makeStyles,
  useId,
} from "@fluentui/react-components";
import { PrimaryButton } from "../primaryButton/primaryButton";
import Image from "next/image";

import { useRouter } from "next/navigation";

const useStyles = makeStyles({
  card: {
    maxWidth: "400px",
    display: "flex",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  body: {
    paddingBottom: "15px",
    paddingTop: "15px",
    fontSize: "30px",
    color: "#4C27D3",
  },
  image: {
    marginLeft: "10px",
  },
});

export function Login() {
  const loginId = useId("login");
  const passwordId = useId("password");
  const styles = useStyles();
  const router = useRouter();

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.header}
        image={
          <Image
            className={styles.image}
            src="/octogono.png"
            alt="octogono roxo"
            width="100"
            height="100"
          />
        }
        header={<Body1 className={styles.body}>Escola Octógono</Body1>}
      ></CardHeader>
      <Label htmlFor={loginId}>Login</Label>
      <Input type="email" id={loginId} />
      <Label htmlFor={passwordId}>Senha</Label>
      <Input type="password" id={passwordId} />
      <PrimaryButton onClick={() => router.push("/home")} label="Entrar" />
    </Card>
  );
}
