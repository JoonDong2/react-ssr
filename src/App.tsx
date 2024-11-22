import React, { useEffect } from "react";
import { Suspender } from "./suspender";

interface Props {
  queryKey?: string | null;
}

const App = ({ queryKey }: Props) => {
  const suspender = Suspender.get(queryKey);
  const data = suspender.read();

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
