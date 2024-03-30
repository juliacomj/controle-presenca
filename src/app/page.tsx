import styles from "./page.module.css";
import { Login } from "./components/login/login";
import { isUserAuthenticated } from "./auth/utils/isUserAuthenticated";
import { redirect } from "next/navigation";

export default async function Home() {
  const isAuthentificated = await isUserAuthenticated();
  if (isAuthentificated) {
    redirect("/home");
  } else {
    return (
      <main className={styles.main}>
        <Login></Login>
      </main>
    );
  }
}
