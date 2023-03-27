import React from "react";
import "./styles.css";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

import { TabulatorFull as Tabulator } from "tabulator-tables";
import SelectEditor from "tabulator-tables/src/js/modules/Edit/defaults/editors/select";

import { ReactTabulator } from "react-tabulator";

// https://codesandbox.io/s/react-tabulator-examples-forked-xb9mi8?file=/src/components/Home.js:0-2965

Tabulator.extendModule("edit", "editors", {
  select: function (cell, onRendered, success, cancel, options) {
    let inputElement = SelectEditor.call(
      this,
      cell,
      onRendered,
      success,
      cancel,
      options
    );

    let listener = function (event) {
      inputElement.blur();
    };

    inputElement.addEventListener("search", listener);
    return inputElement;
  }
});

const data = [
  {
    id: 1,
    name: "Oli Bob",
    age: "12",
    color: "red",
    dob: "01/01/1980",
    rating: 5,
    passed: true,
    pets: ["cat", "dog"]
  },
  {
    id: 2,
    name: "Mary May",
    age: "1",
    color: "green",
    dob: "12/05/1989",
    rating: 4,
    passed: true,
    pets: ["cat"]
  },
  {
    id: 5,
    name: "Margret Marmajuke",
    age: "16",
    color: "yellow",
    dob: "07/01/1999",
    rating: 4,
    passed: false
  },
  {
    id: 6,
    name: "Van Ng",
    age: "37",
    color: "green",
    dob: "06/10/1982",
    rating: 4,
    passed: true,
    pets: ["dog", "fish"]
  },
  {
    id: 7,
    name: "Duc Ng",
    age: "37",
    color: "yellow",
    dob: "10/10/1982",
    rating: 4,
    passed: true,
    pets: ["dog"]
  }
];

// Editable Example:
const colorOptions = {
  red: "red",
  green: "green",
  yellow: "yellow"
};

const editableColumns = [
  {
    title: "Name",
    field: "name",
    width: 150
  },
  {
    title: "Age",
    field: "age"
  },
  {
    title: "Favourite Color",
    field: "color",
    editor: "select",
    editorParams: {
      allowEmpty: true,
      showListOnEmpty: true,
      values: colorOptions
    },
    headerFilter: "select",
    headerFilterParams: { values: colorOptions }
  }
];

class Home extends React.Component {
  state = {
    data: [],
    selectedName: ""
  };
  ref = null;

  columns = [
    { title: "Name", field: "name", width: 150 },
    { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
    { title: "Favourite Color", field: "color" }
  ];

  rowClick = (e, row) => {
    // console.log("ref table: ", this.ref.current); // this is the Tabulator table instance
    // console.log("rowClick id: ${row.getData().id}", row, e);
    this.setState({ selectedName: row.getData().name });
  };

  setData = () => {
    this.setState({ data });
  };

  clearData = () => {
    this.setState({ data: [] });
  };

  render() {
    return (
      <div>
        <ReactTabulator
          columns={editableColumns}
          data={data}
          footerElement={<span>Footer</span>}
        />
      </div>
    );
  }
}

export default Home;
