"use client";
import { PrimaryButton } from "@/app/components/primaryButton/primaryButton";
import {
  Input,
  Label,
  MessageBar,
  MessageBarBody,
  MessageBarIntent,
  MessageBarTitle,
  makeStyles,
} from "@fluentui/react-components";
import * as NextImage from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabase/client";
import { Student } from "../../interfaces/Student/Students";

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
  type: InputType;
  required?: boolean;
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
    width: "30%",
    display: "flex",
    flexDirection: "column",
  },
  imageSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "30px",
    alignItems: "center",
  },
  buttons: {
    marginTop: "10px",
  },
  topButton: {
    marginTop: "30px",
  },
});

interface ExampleMessage {
  intent: MessageBarIntent;
  id: string;
  message: string;
}

export default function AddStudentPage() {
  const styles = useStyles();

  const formFields: FormField[] = React.useMemo(
    () => [
      {
        label: "Nome completo",
        placeHolder: "Bob Esponja",
        id: "nome",
        type: "text",
        required: true,
      },
      {
        label: "Serie",
        placeHolder: "Quinta Série A",
        id: "serie",
        type: "text",
        required: true,
      },
      {
        label: "Responsável",
        placeHolder: "Bob Esponja",
        id: "responsavel",
        type: "text",
        required: true,
      },
      {
        label: "Segund Responsável",
        placeHolder: "Bob Esponja",
        id: "segundo_responsavel",
        type: "text",
      },
      {
        label: "Data de nascimento",
        placeHolder: "01/01/2015",
        id: "data_nascimento",
        type: "date",
        required: true,
      },
      {
        label: "Endereço",
        placeHolder: "Rua dos bobos",
        id: "endereco",
        type: "text",
        required: true,
      },
      {
        label: "Telefone",
        placeHolder: "(11)99994444",
        id: "telfone",
        type: "tel",
        required: true,
      },
      {
        label: "Email",
        placeHolder: "email@gmail.com",
        id: "email",
        type: "email",
        required: true,
      },
    ],
    []
  );
  const router = useRouter();

  const [imageSrc, setImageSrc] = useState("");
  const [studentId, setStudentId] = useState<string>("");
  const [payload, setPayload] = useState<Partial<Student>>();
  const [messages, setMessages] = React.useState<ExampleMessage[]>([]);
  const [file, setFile] = React.useState<File>();

  const handleUploadFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const photo = ev.target.files?.[0];
    if (photo && (photo.type == "image/png" || photo.type == "image/jpeg")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result == "string") {
          setImageSrc(e.target.result);
          setFile(photo);
        }
      };
      reader.readAsDataURL(photo);
      setMessages([]);
    } else {
      setMessages([
        {
          id: "error",
          intent: "error",
          message: "Adicione um arquivo png ou jpeg",
        },
      ]);
    }
  };

  const onFormChange = (ev: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(ev.currentTarget);
    const payload = {
      nome: formData.get("nome")?.toString(),
      matricula: studentId,
      endereco: formData.get("endereco")?.toString(),
      data_nascimento: formData.get("data_nascimento")?.toString(),
      responsavel: formData.get("responsavel")?.toString(),
      segundo_responsavel: formData.get("segundo_responsavel")?.toString(),
      serie: formData.get("serie")?.toString(),
      telefone: formData.get("telefone")?.toString(),
      email: formData.get("email")?.toString(),
    };
    setPayload(payload);
  };

  const submitForm = async () => {
    const bytes = await file?.arrayBuffer();
    const extension = file?.name.split(".").pop();
    let avatarUrl: string = "";

    if (bytes) {
      const fileName = `${studentId}.${extension}`;
      const bucket = supabase.storage.from("presenca-bucket");
      const result = await bucket.upload(fileName, bytes, {
        upsert: true,
      });
      if (!result.error) {
        avatarUrl = bucket.getPublicUrl(fileName).data.publicUrl;
      }
    }

    const { data, error } = await supabase
      .from("students")
      .insert([{ ...payload, avatar: avatarUrl }])
      .select();

    if (data) {
      setMessages([
        {
          id: "success",
          intent: "success",
          message: "Aluno adicionado com sucesso",
        },
      ]);
    }

    if (error) {
      setMessages([
        {
          id: "error",
          intent: "error",
          message: "Error ao adicionar aluno",
        },
      ]);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await supabase.from("students").select();
      const students = data as Student[];

      setStudentId(addZeroToLeft(students.length + 1));
    };

    fetchStudents();
  }, []);

  return (
    <>
      <PrimaryButton
        className={styles.topButton}
        label="Início"
        onClick={() => router.push("/")}
      />
      <main className={styles.main}>
        <form
          id="studenForm"
          className={styles.fieldSection}
          onChange={onFormChange}
        >
          <h3>Matrícula: {studentId}</h3>
          {messages.map(({ id, intent, message }) => (
            <MessageBar intent={intent} key={id}>
              <MessageBarBody>
                <MessageBarTitle>{message}</MessageBarTitle>
              </MessageBarBody>
            </MessageBar>
          ))}
          {formFields.map((field) => (
            <fieldset className={styles.fieldset} key={field.id}>
              <p className={styles.section}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  name={field.id}
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeHolder}
                  disabled={messages.length > 0}
                  required={field.required}
                />
              </p>
            </fieldset>
          ))}
          <PrimaryButton
            className={styles.buttons}
            label="Salvar"
            onClick={submitForm}
            disabled={messages.length > 0}
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

function addZeroToLeft(rowNumber: number) {
  let numStr = rowNumber.toString();

  let zerosToAdd = 6 - numStr.length;

  for (let i = 0; i < zerosToAdd; i++) {
    numStr = "0" + numStr;
  }

  return numStr;
}
