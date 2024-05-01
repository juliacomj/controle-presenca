import {
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Table,
  Avatar,
} from "@fluentui/react-components";
import { Student } from "../../interfaces/Student/Students";
import { PrimaryButton } from "../primaryButton/primaryButton";
import { StudentDataDialog } from "../studentDialog/studentDialog";
import { Presence } from "../../interfaces/Presence/Presence";
import { PresenceDialog } from "../presenceDialog/presenceDialog";

const columns = [
  { columnKey: "nome", label: "Nome" },
  { columnKey: "matricula", label: "Matrícula" },
  { columnKey: "responsavel", label: "Responsável" },
  { columnKey: "faltas", label: "Quantidade de faltas" },
];

interface ResultsTableProps {
  items: Student[];
  presence: Presence[];
}

const getAbsences = (presences: Presence[], studentId: string) => {
  return presences.filter(
    (presence) => presence.matricula == studentId && !presence.presente
  );
};

export function ResultsTable(props: ResultsTableProps) {
  const { items, presence } = props;

  return (
    <>
      <Table arial-label="Default table">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const studentAbsences = getAbsences(presence, item.matricula);
            return (
              <TableRow key={item.matricula}>
                <TableCell>
                  <TableCellLayout
                    media={
                      <Avatar
                        aria-label={item.nome}
                        name={item.nome}
                        image={{
                          src: item.avatar ? `${item.avatar}` : "",
                        }}
                      />
                    }
                  >
                    {item.nome}
                  </TableCellLayout>
                </TableCell>
                <TableCell>{item.matricula}</TableCell>
                <TableCell>{item.responsavel}</TableCell>
                <TableCell>{studentAbsences.length}</TableCell>
                <TableCell>
                  <StudentDataDialog
                    student={item}
                    presences={studentAbsences}
                  />
                </TableCell>
                <TableCell>
                  <PresenceDialog student={item} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
