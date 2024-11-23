import React from "react";
import { PropsWithChildren } from "react";

const AppWrapper = ({ children }: PropsWithChildren) => {
  console.log("AppWrapper");
  return <div>{children}</div>;
};

export default AppWrapper;
