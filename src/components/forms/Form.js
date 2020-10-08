import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((them) => ({
  root: {
    width: "100%",
    marginTop: them.spacing(1),
  },
}));

function Form({ children, ...props }) {
  const styles = useStyles();

  return (
    <form className={styles.root} noValidate {...props}>
      {{ children }}
    </form>
  );
}

export default Form;
