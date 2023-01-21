import "./index.scss";

import { useTable, usePagination } from "react-table";
import { SvgIcon } from "../SvgIcon/Index";
import { Loading } from "../Loading/Index";
import { Link } from "react-router-dom";

interface AppTableInterface {
  onPageChange?: (v: any) => void;
  columns?: any;
  data?: any;
  total?: any;
  loading?: boolean;
  baseUrl?: any;
  label?: any;
  manual?: boolean;
}

export const AppTable = ({
  columns,
  data,
  total,
  loading,
  baseUrl,
  label,
  onPageChange,
  manual = false,
}: AppTableInterface) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      ...(!manual && {
        manualPagination: true,
        pageCount: Math.ceil(total / 10),
        initialState: { pageIndex: 0, pageSize: 10 },
      }),
      ...(manual && { initialState: { pageIndex: 0, pageSize: 10 } }),
    },
    usePagination
  );

  return (
    <>
      <div className="appTable">
        <div className="appTable-main">
          <div className="appTable-content scrollBar-x">
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
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.column.id !== "controls" && (
                              <>{cell.render("Cell")}</>
                            )}

                            {cell.column.id === "controls" && (
                              <div className="appTable-controls d-flex align-items-center justify-content-center flex-wrap">
                                {cell.column.value.view && (
                                  <Link
                                    to={`/${baseUrl}/view/${cell.row.original._id}`}
                                    className="appTable-controls-button d-flex align-items-center justify-content-center mx-1"
                                  >
                                    <SvgIcon name="eye" />
                                  </Link>
                                )}

                                {cell.column.value.edit && (
                                  <Link
                                    to={`/${baseUrl}/edit/${cell.row.original._id}`}
                                    className="appTable-controls-button d-flex align-items-center justify-content-center mx-1"
                                  >
                                    <SvgIcon name="edit" />
                                  </Link>
                                )}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {loading && (
              <div
                className={`appTable-loading d-flex align-items-center justify-content-center ${
                  !data.length && "no-data"
                }`}
              >
                <Loading size="sm" />
              </div>
            )}

            {data.length == "0" && !loading && (
              <div className="appTable-noData text-center pb-4 pt-5">
                <SvgIcon name="database-o" className="d-block text-danger" />
                <p className="mb-0 badge fs-xs">No Data{label}</p>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-end flex-wrap">
          <div className="appTable-pagination-pageBox d-flex align-items-center">
            <span className="me-sm fs-xs fw-semiBold">Go to page : </span>
            <span>
              <input
                type="number"
                value={pageIndex + 1}
                min="1"
                max={pageCount}
                onChange={(e: any) => {
                  if (e.target.value == "0") e.target.value = 1;
                  if (e.target.value > pageCount) e.target.value = pageCount;

                  const page = e.target.value ? Number(e.target.value) - 1 : 0;

                  onPageChange?.(page + 1);
                  gotoPage(page);
                }}
                className="form-control appTable-pagination-input"
              />
            </span>
          </div>

          <span className="fs-xs fw-bold px-3">
            <strong className="px-2">
              {pageIndex + 1} from {pageOptions.length}
            </strong>
            Page
          </span>

          <div className="appTable-pagination me-4">
            <button
              onClick={() => {
                if (!manual) onPageChange?.(1);
                gotoPage(0);
              }}
              disabled={!canPreviousPage}
            >
              <SvgIcon name="chevron-double-left" />
            </button>
            <button
              onClick={() => {
                if (!manual) onPageChange?.(pageIndex);
                previousPage();
              }}
              disabled={!canPreviousPage}
            >
              <SvgIcon name="chevron-left-o" />
            </button>
            <button
              onClick={() => {
                if (!manual) onPageChange?.(pageIndex + 2);
                nextPage();
              }}
              disabled={!canNextPage}
            >
              <SvgIcon name="chevron-right" />
            </button>
            <button
              onClick={() => {
                if (!manual) onPageChange?.(pageCount);
                gotoPage(pageCount - 1);
              }}
              disabled={!canNextPage}
            >
              <SvgIcon name="chevron-double-right" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

AppTable.defaultProps = {
  columns: [],
  data: [],
  total: 0,
  loading: false,
  baseUrl: "#",
  label: "",
};
