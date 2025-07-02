import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/Layout";

// Pages
import Home from "@/components/pages/Home";
import Providers from "@/components/pages/Providers";
import ProviderProfile from "@/components/pages/ProviderProfile";
import AISearch from "@/components/pages/AISearch";
import SponsorshipProgram from "@/components/pages/SponsorshipProgram";
import PatientApplication from "@/components/pages/PatientApplication";
import PractitionerApplication from "@/components/pages/PractitionerApplication";
import Resources from "@/components/pages/Resources";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/providers/:id" element={<ProviderProfile />} />
          <Route path="/ai-search" element={<AISearch />} />
          <Route path="/sponsorship" element={<SponsorshipProgram />} />
          <Route path="/apply-patient" element={<PatientApplication />} />
          <Route path="/apply-practitioner" element={<PractitionerApplication />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </Layout>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;