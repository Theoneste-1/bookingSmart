'use client'
import { ReactNode } from "react";
import ProtectedRoute from "../auth/ProtectedRoute";
import  ClientHeader  from "./ClientHeader";
import ClientSidebar from "./ClientSidebar";

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["CLIENT"]}>
      <div className="min-h-screen bg-gray-50">
        <ClientHeader />
        <div className="flex">
          <ClientSidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};
