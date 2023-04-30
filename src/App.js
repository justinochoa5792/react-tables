import "./App.css";
import Axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";

function App() {
  const [fakeData, setFakeData] = useState([]);
  const data = useMemo(() => fakeData, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "USERNAME",
        accessor: "username",
      },
      {
        Header: "PHONE",
        accessor: "phone",
      },
      {
        Header: "WEBSITE",
        accessor: "website",
      },
    ],
    []
  );

  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let response = await Axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setFakeData(response.data);
  };

  return (
    <div className="App">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((el) => (
                    <td {...el.getCellProps()}>{el.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
