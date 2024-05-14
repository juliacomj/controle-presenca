"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import supabase from "../../utils/supabase/client";
import { Loading } from "../../components/loading/loading";
import { Student } from "../../interfaces/Student/Students";
import { ResultsTable } from "../../components/resultsTable/resultsTable";
import { PrimaryButton } from "../../components/primaryButton/primaryButton";
import { Text, makeStyles } from "@fluentui/react-components";
import { Presence } from "../../interfaces/Presence/Presence";

const useStyles = makeStyles({
  controls: {
    display: "flex",
    marginBottom: "30px",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "30px",
    marginRight: "30px",
  },
  button: {
    marginLeft: "5px",
  },
});

export default function StudentList() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("searchValue");
  const router = useRouter();
  const styles = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [presence, setPresence] = useState<Presence[]>([]);

  const loadInformation = useCallback(async () => {
    const fetchStudents = async () => {
      const { data } = await supabase
        .from("students")
        .select()
        .ilike("nome", `%${searchValue}%`);
      const students = data as Student[];

      setStudents(students);
      return students;
    };
    const results = await fetchStudents();
    const studentIds = results.map((student) => student.matricula);

    const fetchPrecenses = async () => {
      const { data } = await supabase
        .from("presenca")
        .select("*")
        .in("matricula", studentIds);

      const presences = data as Presence[];
      setPresence(presences);
      setIsLoading(false);
    };

    fetchPrecenses();
  }, [searchValue]);

  useEffect(() => {
    loadInformation();
  }, [searchValue, loadInformation]);

  return isLoading ? (
    <Loading label="Procurando alunos" size="huge" />
  ) : (
    <main className={styles.main}>
      <span className={styles.controls}>
        <PrimaryButton label="Voltar" onClick={() => router.push("/home")} />
        <PrimaryButton
          className={styles.button}
          label="Adicionar aluno"
          onClick={() => router.push("/home/addStudent")}
        />
      </span>
      {students.length > 0 ? (
        <ResultsTable items={students} presence={presence} />
      ) : (
        <Text weight="bold" size={700}>
          ALUNO NÃO ENCONTRADO
        </Text>
      )}
    </main>
  );
}
