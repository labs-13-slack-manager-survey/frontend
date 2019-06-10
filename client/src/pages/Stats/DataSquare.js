import React, { Component } from "react";
import { Card, Typography } from "@material-ui/core";

import "./DataSquare.css";

class DataSquare extends Component {
  render() {
    return (
      <div className="square">
        <Card>
          <Typography variant="h6">{this.props.text}</Typography>
          <Typography variant="h6">{this.props.data}</Typography>
        </Card>
      </div>
    );
  }
}

export default DataSquare;
