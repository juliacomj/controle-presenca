"use client";
import { makeStyles } from "@fluentui/react-components";
import { Header } from "../components/header/header";
const useStyles = makeStyles({
  container: {
    height: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  root: {
    height: "100vh",
  },
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const styles = useStyles();

  return (
    <main className={styles.root}>
      <Header></Header>
      <div className={styles.container}>{children}</div>
    </main>
  );
}
