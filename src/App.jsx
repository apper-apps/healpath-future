import { createContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { setUser, clearUser } from '@/store/userSlice';
import Layout from "@/components/Layout";

// Authentication Pages
import Login from '@/components/pages/Login';
import Signup from '@/components/pages/Signup';
import Callback from '@/components/pages/Callback';
import ErrorPage from '@/components/pages/ErrorPage';
import ResetPassword from '@/components/pages/ResetPassword';
import PromptPassword from '@/components/pages/PromptPassword';

// Application Pages
import Home from "@/components/pages/Home";
import Providers from "@/components/pages/Providers";
import ProviderProfile from "@/components/pages/ProviderProfile";
import AISearch from "@/components/pages/AISearch";
import SponsorshipProgram from "@/components/pages/SponsorshipProgram";
import PatientApplication from "@/components/pages/PatientApplication";
import PractitionerApplication from "@/components/pages/PractitionerApplication";
import Resources from "@/components/pages/Resources";

// Create auth context
export const AuthContext = createContext(null);

function App() {
  
return (
    <div className="App">
      <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/prompt-password/:appId/:emailAddress/:provider" element={<PromptPassword />} />
          <Route path="/reset-password/:appId/:fields" element={<ResetPassword />} />
          
          {/* Application Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/providers" element={<Layout><Providers /></Layout>} />
          <Route path="/providers/:id" element={<Layout><ProviderProfile /></Layout>} />
          <Route path="/ai-search" element={<Layout><AISearch /></Layout>} />
          <Route path="/sponsorship" element={<Layout><SponsorshipProgram /></Layout>} />
          <Route path="/apply-patient" element={<Layout><PatientApplication /></Layout>} />
          <Route path="/apply-practitioner" element={<Layout><PractitionerApplication /></Layout>} />
          <Route path="/resources" element={<Layout><Resources /></Layout>} />
</Routes>

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