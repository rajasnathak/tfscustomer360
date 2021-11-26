import {
  blackColor,
  whiteColor,
  hexToRgb,
} from "assets/jss/material-dashboard-react.js";

const cardStyle = {
  card: {
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    background: blackColor,
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
  },
  cardPlain: {
    background: "blackColor",
    boxShadow: "none",
  },
  cardProfile: {
    marginTop: "30px",
    textAlign: "center",
  },
  cardChart: {
    "& p": {
      marginTop: "0px",
      paddingTop: "0px",
    },
  },
};

export default cardStyle;
