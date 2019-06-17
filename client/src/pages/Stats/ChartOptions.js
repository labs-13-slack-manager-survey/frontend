import React, { Component } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

export default class ChartOptions extends Component {
  render() {
    return (
      <div>
        <form
          autoComplete="off"
          className="form"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <FormControl className="formControl">
            <InputLabel className="inputLabel" style={{ marginBottom: "20px" }}>
              Filter By
            </InputLabel>

            <Select
              value={this.state.filterBy}
              style={{ marginTop: "20px" }}
              name="filterBy"
              onChange={this.handleChange}
              className="select"
            >
              <MenuItem value={"day"}>Day</MenuItem>
              <MenuItem value={"week"}>Week</MenuItem>
              <MenuItem value={"month"}>Month</MenuItem>
              <MenuItem value={"quarter"}>Quarter</MenuItem>
              <MenuItem value={"year"}>Year</MenuItem>
            </Select>
            <button onClick={this.setLabels} style={{ margin: "20px" }}>
              Filter
            </button>
          </FormControl>
        </form>
      </div>
    );
  }
}
