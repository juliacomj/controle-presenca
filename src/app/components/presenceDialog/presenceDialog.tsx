import * as React from "react";
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
  Image,
  Checkbox,
  Dropdown,
  Option,
  useId,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  MessageBarIntent,
} from "@fluentui/react-components";
import { Student } from "../../interfaces/Student/Students";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import supabase from "../../utils/supabase/client";
import { Presence } from "../../interfaces/Presence/Presence";
import { PrimaryButton } from "../primaryButton/primaryButton";

interface PresenceDialogProps {
  student: Student;
}

const useStyles = makeStyles({
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "5px",
    marginTop: "5px",
  },
  studentInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  control: {
    maxWidth: "300px",
    marginTop: "5px",
  },
});

interface ExampleMessage {
  intent: MessageBarIntent;
  id: string;
  message: string;
}

const onFormatDate = (date?: Date): string => {
  return !date
    ? ""
    : date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        (date.getFullYear() % 100);
};

export function PresenceDialog(props: PresenceDialogProps) {
  const { student } = props;
  const styles = useStyles();
  const dropdownId = useId("dropdown-default");

  const [value, setValue] = React.useState<Date | null | undefined>(null);
  const datePickerRef = React.useRef<HTMLInputElement>(null);
  const [absence, setAbsence] = React.useState<boolean>(false);
  const [reason, setReason] = React.useState<string>("");
  const [messages, setMessages] = React.useState<ExampleMessage[]>([]);

  const options = ["Doença", "Sem justificativa", "Outros"];

  const onParseDateFromString = React.useCallback(
    (newValue: string): Date => {
      const previousValue = value || new Date();
      const newValueParts = (newValue || "").trim().split("/");
      const day =
        newValueParts.length > 0
          ? Math.max(1, Math.min(31, parseInt(newValueParts[0], 10)))
          : previousValue.getDate();
      const month =
        newValueParts.length > 1
          ? Math.max(1, Math.min(12, parseInt(newValueParts[1], 10))) - 1
          : previousValue.getMonth();
      let year =
        newValueParts.length > 2
          ? parseInt(newValueParts[2], 10)
          : previousValue.getFullYear();
      if (year < 100) {
        year +=
          previousValue.getFullYear() - (previousValue.getFullYear() % 100);
      }
      return new Date(year, month, day);
    },
    [value]
  );

  const submitPresence = async () => {
    const payload: Presence = {
      matricula: student.matricula,
      data: value!,
      justificativa: reason,
      presente: !absence,
    };

    const { data } = await supabase.from("presenca").insert([payload]).select();

    if (data) {
      setAbsence(false);
      setValue(null);
      setReason("");
      setMessages([
        {
          id: "success",
          intent: "success",
          message: "Registrado com sucesso",
        },
      ]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="primary">Registrar Presença</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Registrar Presença</DialogTitle>
          {messages.map(({ id, intent, message }) => (
            <MessageBar intent={intent} key={id}>
              <MessageBarBody>
                <MessageBarTitle>{message}</MessageBarTitle>
              </MessageBarBody>
            </MessageBar>
          ))}
          <DialogContent className={styles.studentInfo}>
            <section className={styles.dialogContent}>
              <Text>
                {<b>Aluno: </b>} {student.nome}
              </Text>
              <Text>
                {<b>Matrícula: </b>} {student.matricula}
              </Text>
              <Checkbox
                checked={absence}
                onChange={(ev, data) => setAbsence(data.checked === true)}
                label="Aluno ausente"
              />
              <label id={dropdownId}>Justificativa: </label>
              <Dropdown
                onOptionSelect={(ev, data) => setReason(data.optionText ?? "")}
                aria-labelledby={dropdownId}
                placeholder="-"
                {...props}
              >
                {options.map((option) => (
                  <Option key={option} disabled={absence == false}>
                    {option}
                  </Option>
                ))}
              </Dropdown>

              <DatePicker
                ref={datePickerRef}
                allowTextInput
                value={value}
                onSelectDate={setValue as (date?: Date | null) => void}
                formatDate={onFormatDate}
                parseDateFromString={onParseDateFromString}
                placeholder="Selecione a data"
                className={styles.control}
              />
            </section>
            <Image src={student.avatar} alt={student.nome} width={150} />
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Fechar</Button>
            </DialogTrigger>
            <PrimaryButton
              label="Registrar"
              disabled={!!value == false}
              onClick={submitPresence}
            />
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
