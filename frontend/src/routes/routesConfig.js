import ACReport from "../components/ACReport";
import AddBatch from "../pages/AddBatch";
import AddChemical from "../pages/AddChemical";
import AddInstrument from "../pages/AddInstrument";
import AddIntimate from "../pages/AddIntimate";
import AddMedia from "../pages/AddMedia";
import AddProduct from "../pages/AddProduct";
import BatchManagement from "../pages/BatchManagement";
import Chemical from "../pages/Chemical";
import Dashboard from "../pages/Dashboard";
import DispatchBay from "../pages/DispatchBay";
import Glp from "../pages/Glp";
import Home from "../pages/Home";
import Instruments from "../pages/Instruments";
import Intimate from "../pages/Intimate";
import LaunchScreen from "../pages/LaunchScreen";
import Lims from "../pages/Lims";
import Lims2 from "../pages/Lims2";
import Media from "../pages/Media";
import Production from "../pages/Production";
import Products from "../pages/Products";
import Qms from "../pages/Qms";
import Stores from "../pages/Stores";
import Team from "../pages/Team";

export const routesConfig = [
  {
    path: "/login",
    element: <LaunchScreen />,
    protected: false,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    protected: true,
  },
  {
    path: "/",
    element: <Home />,
    protected: true,
  },
  {
    path: "/intimate",
    element: <Intimate />,
    protected: true,
  },
  {
    path: "/addIntimate",
    element: <AddIntimate />,
    protected: true,
  },
  {
    path: "/batch",
    element: <BatchManagement />,
    protected: true,
  },
  {
    path: "/addBatch",
    element: <AddBatch />,
    protected: true,
  },
  {
    path: "/limsFirst",
    element: <Lims />,
    protected: true,
  },
  {
    path: "/limsSecond",
    element: <Lims2 />,
    protected: true,
  },
  {
    path: "/production",
    element: <Production />,
    protected: true,
  },
  {
    path: "/glp",
    element: <Glp />,
    protected: true,
  },
  {
    path: "qms",
    element: <Qms />,
    protected: true,
  },
  {
    path: "/stores",
    element: <Stores />,
    protected: true,
  },
  {
    path: "/dispatchBay",
    element: <DispatchBay />,
    protected: true,
  },
  {
    path: "/users",
    element: <Team />,
    protected: true,
  },
  {
    path: "/products",
    element: <Products />,
    protected: true,
  },
  {
    path: "/addProduct",
    element: <AddProduct />,
    protected: true,
  },
  {
    path: "/instruments",
    element: <Instruments />,
    protected: true,
  },
  {
    path: "/addInstrument",
    element: <AddInstrument />,
    protected: true,
  },
  {
    path: "/medias",
    element: <Media />,
    protected: true,
  },
  {
    path: "/addMedia",
    element: <AddMedia />,
    protected: true,
  },
  {
    path: "/chemicals",
    element: <Chemical />,
    protected: true,
  },
  {
    path: "/addChemical",
    element: <AddChemical />,
    protected: true,
  },
  {
    path: "/acReport",
    element: <ACReport />,
    protected: false,
  },
];
