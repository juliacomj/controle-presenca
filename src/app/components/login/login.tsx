"use client";
import * as React from "react";
import {
  Body1,
  Card,
  CardHeader,
  Input,
  Label,
  MessageBar,
  MessageBarBody,
  MessageBarIntent,
  MessageBarTitle,
  makeStyles,
  useId,
} from "@fluentui/react-components";
import { PrimaryButton } from "../primaryButton/primaryButton";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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

interface ExampleMessage {
  intent: MessageBarIntent;
  id: string;
}

export function Login() {
  const loginId = useId("login");
  const passwordId = useId("password");
  const styles = useStyles();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [messages, setMessages] = React.useState<ExampleMessage[]>([]);

  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    try {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      router.refresh();
      if (res.data.user) {
        router.push("/home");
      }

      if (res.error) {
        console.log(res.error);
        setMessages([{ id: "error", intent: "error" }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (email) {
      setEmail(email);
    }
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    if (password) {
      setPassword(password);
    }
  };

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
      <Input onChange={changeEmail} type="email" id={loginId} />
      <Label htmlFor={passwordId}>Senha</Label>
      <Input onChange={changePassword} type="password" id={passwordId} />
      {messages.map(({ id, intent }) => (
        <MessageBar intent={intent} id={id}>
          <MessageBarBody>
            <MessageBarTitle>Credenciais inválidas</MessageBarTitle>
          </MessageBarBody>
        </MessageBar>
      ))}
      <PrimaryButton onClick={handleSignIn} label="Entrar" />
    </Card>
  );
}
