
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Userlogin from "components/userLogin";
import Usersignup from "components/userSignup";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Chatbot from "./components/chatSystem";
import FormApp from "components/Form";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/rtl/*" element={<RTLLayout />} />
          <Route
            path="*"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route path="/admin/login" element={<Userlogin/>}/>
          <Route path="/admin/signup" element={<Usersignup/>}/>
          <Route path="/admin/chat" element={<Chatbot/>}/>
          <Route path="/admin/form" element={<FormApp/>}/>

        </Routes>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
