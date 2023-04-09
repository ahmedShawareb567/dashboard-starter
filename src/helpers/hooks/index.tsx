import { useLocation } from "react-router-dom";

const useQuery = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  return {
    location,
    params: queryParams,
  };
};

export { useQuery };
