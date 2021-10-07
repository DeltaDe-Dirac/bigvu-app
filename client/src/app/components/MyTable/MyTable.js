import "./MyTable.scss";
import React from "react";
import Table from "react-bootstrap/Table";

export default function MyTable({ rows, hs, ais }) {
  return (
    <div className="myTable">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Guess [{hs ? hs : ""}]</th>
            <th>Result</th>
            <th>AI Guess [{ais ? ais : ""}]</th>
            <th>AI Result</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
