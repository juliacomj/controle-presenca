import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Text,
  makeStyles,
  Divider,
} from "@fluentui/react-components";
import { Student } from "../../interfaces/Student/Students";
import { Presence } from "../../interfaces/Presence/Presence";

interface StudentDataDialogProps {
  student: Student;
  presences: Presence[];
}

const useStyles = makeStyles({
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "24px",
    marginBottom: "5px",
    marginTop: "5px",
  },
});

const formatDate = (date: Date) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("pt-BR");
};

export function StudentDataDialog(props: StudentDataDialogProps) {
  const { student, presences } = props;
  const styles = useStyles();

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="primary">Ver dados</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Registro do aluno</DialogTitle>
          <DialogContent>
            <Text as="h3" size={500}>
              Dados
            </Text>
            <section className={styles.dialogContent}>
              <Text>
                {<b>Aluno: </b>} {student.nome}
              </Text>
              <Text>
                {<b>Matrícula: </b>} {student.matricula}
              </Text>
              <Text>
                {<b>Data de nascimento: </b>}
                {student.dataNascimento}
              </Text>
              <Text>
                {<b>Série: </b>} {student.serie}
              </Text>
              <Text>
                {<b>Endereço: </b>}
                {student.endereco}
              </Text>
            </section>

            <Divider />
            <Text as="h3" size={500}>
              Responsáveis
            </Text>
            <section className={styles.dialogContent}>
              <Text>
                {<b>Responsável: </b>} {student.responsavel}
              </Text>
              {!!student.segundoResponsavel ?? (
                <Text>
                  {<b>Responsável: </b>} {student.segundoResponsavel}
                </Text>
              )}
            </section>

            <Divider />
            <Text as="h3" size={500}>
              Contato
            </Text>
            <section className={styles.dialogContent}>
              <Text>
                {<b>Telefone: </b>} {student.telefone}
              </Text>
              <Text>
                {<b>Email: </b>}
                {student.email}
              </Text>
            </section>

            <Divider />
            <Text as="h3" size={500}>
              Faltas
            </Text>
            {!!presences && presences.length > 0 ? (
              presences.map((presence, index) => (
                <section className={styles.dialogContent} key={index}>
                  <Text>
                    {<b>Data da falta: </b>} {formatDate(presence.data)}
                  </Text>
                  <Text>
                    {<b>Justificativa: </b>}
                    {presence.justificativa}
                  </Text>
                </section>
              ))
            ) : (
              <section className={styles.dialogContent}>
                <Text>Aluno não faltou</Text>
              </section>
            )}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Fechar</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
