import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Home from "./layouts/Home";
import { Routes, Route } from "react-router-dom";
import Packages from "./pages/Packages";
import AddPackage from "./components/AddPackage";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateResort from "./components/createResort";
// import showR from "./pages/showResorts";
import UpdateResort from "./components/updateResort";
import ViewAllResorts from "./pages/viewAllResorts";
import ReservationForm from "./components/reservationForm";
import ViewResort from "./pages/viewResort";
import ResortView from "./pages/resortView";
import UpdatePackage from "./components/UpdatePackage";
import AdminDash from "./layouts/AdminDash";
import {PackageDetails}  from "./components/PackageDetails";
import LiveBoardCusView from "./pages/LiveaboardCusView";
import AddLBbookings from "./pages/AddLBbookings";
import LiveBoardView from "./pages/LiveBoard";
import AddLiveBoard from "./pages/AddLiveBoard";
import AdminBooking from "./pages/Bookings";
import ShowResorts from "./pages/showResorts"

function App() {
  return (
    <div>
      <Header />

      <section>
        {localStorage.getItem("token") ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/addpackage" element={<AddPackage />} />
            <Route path="/admindashboard" element={<AdminDash />} />
            <Route path="/packagedetails" element={<PackageDetails />} />
            <Route path="/resorts" element={<ShowResorts />} />
            <Route path="/create-resorts" element={<CreateResort />} />
            <Route path="/liveBoardView" element={<LiveBoardView />} />
            <Route path="/addliveboard" element={<AddLiveBoard />} />
            <Route path="/bookingsadmin" element={<AdminBooking />} />
            <Route path="/LiveBoardCusView" element={<LiveBoardCusView/>} />
            <Route path="/AddLBbookings/:id" exact={false} element={<AddLBbookings/>}/>
            <Route
              path="/update-resorts/:id"
              exact={false}
              element={<UpdateResort />}
            />
            <Route path="/view-all-resorts" exact element={<ViewAllResorts />} />
            <Route path="/resort-view/:id" exact element={<ResortView />} />

            <Route path="/book-reservation/:id" exact={false} element={<ReservationForm />} />
            <Route path="/view-resort/:id" exact={false} element={<ViewResort />}/>
            <Route
              path="/packages/updatepackage/:id"
              exact={false}
              element={<UpdatePackage />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default App;