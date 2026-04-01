import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import ChatPage from "../pages/ChatPage"
import AdminPage from "../pages/AdminPage";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/layout/Header";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />


                <Route
                    path="/chat"
                    element={
                        <PrivateRoute tipoPermitido="aluno">
                            <Header />
                            <ChatPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute tipoPermitido="admin">
                            <Header />
                            <AdminPage />
                        </PrivateRoute>
                    }
                />
                

                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />

            </Routes>
        </BrowserRouter>
    );
}