import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ account, onConnect }) {
  return (
    <>
      <AdminNavbar account={account} onConnect={onConnect} />
      <div className="pt-16"> 
        <Outlet />
      </div>
    </>
  );
}
