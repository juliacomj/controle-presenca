"use client";
import { PrimaryButton } from "@/app/components/primaryButton/primaryButton";
import {
  Input,
  InputOnChangeData,
  Label,
  makeStyles,
} from "@fluentui/react-components";
import * as NextImage from "next/image";
import React, { ChangeEvent, useState } from "react";

type InputType =
  | "number"
  | "text"
  | "date"
  | "tel"
  | "email"
  | "search"
  | "time"
  | "password"
  | "url"
  | "datetime-local"
  | "month"
  | "week"
  | undefined;

interface FormField {
  label: string;
  placeHolder: string;
  id: string;
  onType: (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  type: InputType;
}

const useStyles = makeStyles({
  fieldset: {
    marginTop: "10px",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  main: {
    display: "flex",
    justifyContent: "center",
  },
  fieldSection: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
  },
  imageSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "30px",
  },
  buttons: {
    marginTop: "10px",
  },
});

export default function AddStudentPage() {
  const styles = useStyles();
  const formFields: FormField[] = React.useMemo(
    () => [
      {
        label: "Nome completo",
        placeHolder: "Bob Esponja",
        id: "nome",
        onType: () => {},
        type: "text",
      },
      {
        label: "Serie",
        placeHolder: "Quinta Série A",
        id: "seri",
        onType: () => {},
        type: "text",
      },
      {
        label: "Responsável",
        placeHolder: "Bob Esponja",
        id: "responsavel",
        onType: () => {},
        type: "text",
      },
      {
        label: "Data de nascimento",
        placeHolder: "01/01/2015",
        id: "data",
        onType: () => {},
        type: "date",
      },
      {
        label: "Endereço",
        placeHolder: "Rua dos bobos",
        id: "endereco",
        onType: () => {},
        type: "text",
      },
      {
        label: "Telefone",
        placeHolder: "(11)99994444",
        id: "telfone",
        onType: () => {},
        type: "tel",
      },
      {
        label: "Email",
        placeHolder: "email@gmail.com",
        id: "email",
        onType: () => {},
        type: "email",
      },
    ],
    []
  );

  const [imageSrc, setImageSrc] = useState("");

  const handleUploadFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file && file.type == "image/png") {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result == "string") {
          setImageSrc(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <PrimaryButton
        className={styles.buttons}
        label="Início"
        onClick={() => {}}
      />
      <main className={styles.main}>
        <form className={styles.fieldSection}>
          {formFields.map((field) => (
            <fieldset className={styles.fieldset} key={field.id}>
              <p className={styles.section}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  onChange={field.onType}
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeHolder}
                />
              </p>
            </fieldset>
          ))}
          <PrimaryButton
            className={styles.buttons}
            label="Salvar"
            onClick={() => {}}
          />
        </form>

        <section className={styles.imageSection}>
          <NextImage.default
            alt="foto do aluno"
            src={imageSrc.length > 0 ? imageSrc : "/sem_avatar.png"}
            width="200"
            height="200"
          />
          <label htmlFor="uploadFile">
            <input
              id="uploadFile"
              className={styles.buttons}
              type="file"
              onChange={handleUploadFile}
            />
          </label>
        </section>
      </main>
    </>
  );
}
