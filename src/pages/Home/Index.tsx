import { useAsync } from "react-use";
import { $axios } from "../../client/axios";
import { useMemo } from "react";
import { AppTable } from "../../components/AppTable/Index";
import { useQuery } from "../../helpers/hooks";

export default () => {
  const { params } = useQuery();
  const currentPage = params.get("page");

  const doctors = useAsync(async () => {
    const { data } = await $axios.get(
      `/doctor${currentPage ? `?page=${currentPage}` : ""}`
    );

    return data;
  }, [currentPage]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "first_name_en",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Verified",
        accessor: "verified",
      },
    ],
    []
  );

  return (
    <div className="home">
      <div className="container">
        <h2 className="mb-xl">Home</h2>
        <div className="row">
          <div className="col-12">
            <AppTable
              columns={columns}
              data={doctors?.value?.data}
              loading={doctors?.loading}
              total={doctors?.value?.page_info?.total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
