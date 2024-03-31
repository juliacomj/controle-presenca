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

const columns = [
  { columnKey: "nome", label: "Nome" },
  { columnKey: "matricula", label: "Matrícula" },
  { columnKey: "responsavel", label: "Responsável" },
  { columnKey: "faltas", label: "Faltas" },
];

interface ResultsTableProps {
  items: Student[];
}

export function ResultsTable(props: ResultsTableProps) {
  const { items } = props;
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
          {items.map((item) => (
            <TableRow key={item.matricula}>
              <TableCell>
                <TableCellLayout
                  media={
                    <Avatar
                      aria-label={item.nome}
                      name={item.nome}
                      image={{
                        src: `${item.avatar}`,
                      }}
                    />
                  }
                >
                  {item.nome}
                </TableCellLayout>
              </TableCell>
              <TableCell>{item.matricula}</TableCell>
              <TableCell>{item.responsavel}</TableCell>
              <TableCell>{item.faltas}</TableCell>
              <TableCell>
                <PrimaryButton label="Ver dados" onClick={() => {}} />
              </TableCell>
              <TableCell>
                <PrimaryButton label="Registrar presença" onClick={() => {}} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
