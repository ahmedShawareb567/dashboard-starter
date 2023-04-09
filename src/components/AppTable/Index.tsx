import "./scss/index.scss";

import { useTable, usePagination } from "react-table";
import { SvgIcon } from "../SvgIcon/Index";
import { Loading } from "../Loading/Index";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../helpers/hooks";
import { Shimmer } from "../Shimmers/Index";
import { ShimmerTypes } from "../Shimmers/types";

interface AppTableInterface {
  onPageChange?: (v: any) => void;
  columns?: any;
  data?: any;
  total?: any;
  loading?: boolean;
  label?: any;
  manual?: boolean;
}

export const AppTable = ({
  columns,
  data,
  total,
  loading,
  label,
  onPageChange,
  manual = false,
}: AppTableInterface) => {
  const { location, params: queryString } = useQuery();
  const shallowPage = queryString?.get("page");

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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      ...(!manual && {
        manualPagination: true,
        pageCount: Math.ceil(total / 10),
        initialState: {
          pageIndex: shallowPage ? parseInt(shallowPage) - 1 : 0,
          pageSize: 10,
        },
      }),
      ...(manual && {
        initialState: {
          pageIndex: shallowPage ? parseInt(shallowPage) - 1 : 0,
          pageSize: 10,
        },
      }),
    },
    usePagination
  );

  const navigate = useNavigate();

  const onPageChangeAction = (page) => {
    navigate(`${location?.pathname}${page > 1 ? `?page=${page}` : ""}`);
    onPageChange?.(page);
  };

  if (loading && !data?.length) {
    return (
      <>
        <Shimmer type={ShimmerTypes.HEADER} cols={1} />
        <Shimmer type={ShimmerTypes.CARD} cols={4} />
        <Shimmer type={ShimmerTypes.HEADER} cols={1} />
      </>
    );
  }

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
                            {cell.render("Cell")}
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
                className={`appTable-loading d-flex align-items-center justify-content-center`}
              >
                <Loading size="md" />
              </div>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center flex-wrap">
          <span className="fs-xs fw-bold px-3">
            <strong className="px-2">
              {pageIndex + 1} from {pageOptions.length}
            </strong>
            Page
          </span>

          <div className="appTable-pagination me-4">
            <button
              onClick={() => {
                if (!manual) onPageChangeAction?.(1);
                gotoPage(0);
              }}
              disabled={!canPreviousPage}
            >
              <SvgIcon name="chevron-double-left" />
            </button>
            <button
              onClick={() => {
                if (!manual) onPageChangeAction?.(pageIndex);
                previousPage();
              }}
              disabled={!canPreviousPage}
            >
              <SvgIcon name="chevron-left-o" />
            </button>
            <button
              onClick={() => {
                if (!manual) onPageChangeAction?.(pageIndex + 2);
                nextPage();
              }}
              disabled={!canNextPage}
            >
              <SvgIcon name="chevron-right" />
            </button>
            <button
              onClick={() => {
                if (!manual) onPageChangeAction?.(pageCount);
                gotoPage(pageCount - 1);
              }}
              disabled={!canNextPage}
            >
              <SvgIcon name="chevron-double-right" />
            </button>
          </div>

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

                  if (!manual) onPageChangeAction?.(page + 1);
                  gotoPage(page);
                }}
                className="form-control appTable-pagination-input"
              />
            </span>
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
  label: "",
};
