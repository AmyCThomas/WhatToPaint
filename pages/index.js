import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [subjectInput, setSubjectInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: subjectInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setSubjectInput("");
  }

  return (
    <div>
      <Head>
        <title>What Should I paint?</title>
        <link rel="icon" href="/artlogo.png" />
      </Head>

      <main className={styles.main}>
        <img src="/artlogo.png" className={styles.icon} />
        <h3>What Should I Paint?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="subject"
            placeholder="i.e. flowers, landscape, human figure"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
          />
          <input type="submit" value="Generate prompt" />
        </form>
        <div className={styles.result}> {result}
</div>
      </main>
    </div>
  );
}
