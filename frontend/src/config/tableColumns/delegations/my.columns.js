import React from "react";
import { selectFilter } from "react-bootstrap-table2-filter";

import { columnsCentered } from "../_styles";
import ButtonLink from "../../../components/ButtonLink/ButtonLink.component";
import { delegationStatuses } from "../..";
import commonColumns from "./common.columns";

const columns = [
  ...commonColumns,
  {
    dataField: "status",
    text: "Status",
    sort: true,
    classes: (cell, row) => (row.status ? row.status.toLowerCase() : ""),
    formatter: cell => <span className="delegation-status">{delegationStatuses[cell]}</span>,
    filter: selectFilter({
      options: delegationStatuses
    }),
    ...columnsCentered()
  },
  {
    dataField: "view",
    text: "View",
    isDummyField: true,
    editable: false,
    formatter: (cell, row) => <ButtonLink href={`/delegations/${row.id}`} text="View" />
  }
];

export default columns;
