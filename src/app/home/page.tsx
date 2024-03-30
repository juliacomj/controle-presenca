"use client";
import {
  Body1,
  CardHeader,
  Input,
  Label,
  makeStyles,
  useId,
} from "@fluentui/react-components";
import { PrimaryButton } from "../components/primaryButton/primaryButton";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "30px",
  },
  buttons: {
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: "30px",
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

export default function Page() {
  const searchId = useId("search");
  const styles = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const onType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const cleanSearch = () => {
    if (searchValue) {
      setSearchValue("");
    }
  };

  const searchStudent = () => {
    if (searchValue) {
      router.push(`/home/studentList?searchValue=${searchValue}`);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <CardHeader
          className={styles.header}
          image={
            <Image
              priority={true}
              className={styles.image}
              src="/octogono.png"
              alt="octogono roxo"
              width="100"
              height="100"
            />
          }
          header={<Body1 className={styles.body}>Escola Octógono</Body1>}
        ></CardHeader>
        <Input
          onChange={onType}
          value={searchValue}
          placeholder="Buscar aluno"
          id={searchId}
          type="search"
        />
        <div>
          <PrimaryButton
            className={styles.buttons}
            label="Limpar"
            onClick={cleanSearch}
          />
          <PrimaryButton
            disabled={!searchValue}
            className={styles.buttons}
            label="Buscar"
            onClick={searchStudent}
          />
          <PrimaryButton
            className={styles.buttons}
            label="Adicionar aluno"
            onClick={() => router.push("/home/addStudent")}
          />
        </div>
      </div>
    </>
  );
}
