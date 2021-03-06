// import { Card, CardContent, Typography } from "@material-ui/core";
// import React from "react";
// import "./InfoBox.css"
// function InfoBox({ title, cases, total }) {
//   return (
//     <Card className="infoBox">
//       <CardContent>
//         <Typography className="infoBox__title" color="textPrimary">
//         {/* <Typography className="infoBox__title" color="textSecondary"> */}
//           {title}
//         </Typography>

//         <h2 className="infobox__cases">{cases}</h2>
//         <Typography className="infobox__total" color="textSecondary">{total} Total</Typography>


//       </CardContent>
//     </Card>
//   );
// }

// export default InfoBox;
import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed , ...props }) {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;