import React, { useEffect } from "react";
import { Suspender } from "./suspender";

interface Props {
  queryKey?: string | null;
}

const App = ({ queryKey }: Props) => {
  console.log("App");
  const suspender = Suspender.get(queryKey);
  const data = suspender.read();

  /*
   * Forces hydration failure.
   * Excludes AppWrapper from re-rendering and starts re-rendering from App.
   */
  // if (globalThis.window) {
  //   return <div>boundary test !!</div>;
  // }

  useEffect(() => {
    console.log("App from client", queryKey, data);
  }, [queryKey, data]);

  return (
    <div
      onClick={() => {
        alert(data);
      }}
    >{`key: ${data}`}</div>
  );
};

export default App;
