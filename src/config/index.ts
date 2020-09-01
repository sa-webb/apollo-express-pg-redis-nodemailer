import "./env";
// import errorReporter from "./err";

export const checkConfig = () => {
  console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);

  console.log(`Sample key is ${process.env.DB_NAME}`);

  // EXAMPLE
  // errorReporter.report(new Error("No database"));
};
