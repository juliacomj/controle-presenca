"use client";
import { Text, makeStyles, Image } from "@fluentui/react-components";
import { PrimaryButton } from "../components/primaryButton/primaryButton";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "../auth/utils/getUserData";
import { Employee } from "../interfaces/Employee/Employee";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const useStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "inline-grid",
    gridTemplateColumns: "auto auto",
    columnGap: "100px",
    marginTop: "30px",
  },
  button: {
    display: "inline-block",
    width: "60%",
  },
});

export default function Page() {
  const styles = useStyles();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee>();
  const supabase = createClientComponentClient();

  const loadEmployee = async () => {
    const user = await getUserData();
    setEmployee(user);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  React.useEffect(() => {
    loadEmployee();
  }, []);

  return (
    <>
      <section className={styles.button}>
        <PrimaryButton label="Início" onClick={() => router.push("/")} />
      </section>
      <div className={styles.container}>
        <section className={styles.section}>
          <Text>
            {<b>Funcionário: </b>} {employee?.nome}
          </Text>
          <Text>
            {<b>Matrícula: </b>} {employee?.id}
          </Text>
          <Text>
            {<b>Data de nascimento: </b>}
            {employee?.data_nascimento}
          </Text>
          <Text>
            {<b>Email: </b>}
            {employee?.email}
          </Text>
          <Text>
            {<b>CPF: </b>}
            {employee?.cpf}
          </Text>
        </section>
        <section className={styles.section}>
          <Image
            src={employee?.avatar ?? ""}
            alt={employee?.nome ?? ""}
            width={300}
          />
        </section>
      </div>
      <section className={styles.button}>
        <PrimaryButton label="Sair" onClick={signOut} />
      </section>
    </>
  );
}
