import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navigation from "./components/Navigation";
import Authenticate from "./Pages/Authenticate/Authenticate";
import Activate from "./components/Activate";
import Rooms from "./Pages/Rooms";
import SemiProtectedRoute from "./Pages/Authenticate/SemiProtectedRoute";
import PrivateRoute from "./Pages/Authenticate/PrivateRoute";
import ProtectedRoute from "./Pages/Authenticate/ProtectedRoute";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import SingleRoom from "./Pages/SingleRoom";
import Profile from "./Pages/Profile";

function App() {
  const { user, isAuth } = useSelector((state) => state.auth);

  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <Loader message="Loading, please wait.." />
  ) : (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<PrivateRoute isAuth={isAuth} />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route
          exact
          path="/authenticate"
          element={<PrivateRoute isAuth={isAuth} />}
        >
          <Route exact path="/authenticate" element={<Authenticate />} />
        </Route>
        <Route
          exact
          path="/activate"
          element={<SemiProtectedRoute isAuth={isAuth} user={user} />}
        >
          <Route exact path="/activate" element={<Activate />} />
        </Route>
        <Route
          exact
          path="/rooms"
          element={<ProtectedRoute isAuth={isAuth} user={user} />}
        >
          <Route exact path="/rooms" element={<Rooms />} />
        </Route>
        <Route
          exact
          path="/room/:id"
          element={<ProtectedRoute isAuth={isAuth} user={user} />}
        >
          <Route exact path="/room/:id" element={<SingleRoom />} />
        </Route>
        <Route
          exact
          path="/profile"
          element={<ProtectedRoute isAuth={isAuth} user={user} />}
        >
          <Route exact path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
