import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { routesTree } from "./router";
import { useAuth, UseAuthInterface } from "./store/auth";
import { shallow } from "zustand/shallow";

const App = () => {
  const { isLoading, isLoggedIn, me } = useAuth(
    ({ isLoading, isLoggedIn, me }: UseAuthInterface) => ({
      isLoading,
      isLoggedIn,
      me,
    }),
    shallow
  );

  useEffect(() => {
    (async () => {
      await me();
    })();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="App">
      <RouterProvider router={routesTree(isLoggedIn)} />
    </div>
  );
};

export default App;
