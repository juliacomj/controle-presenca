"use client";

import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  studentForm: {
    width: "90%",
  },
});

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const styles = useStyles();
  return (
    <>
      <div className={styles.studentForm}>{children}</div>
    </>
  );
}
