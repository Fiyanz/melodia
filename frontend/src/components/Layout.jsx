import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ account, onConnect }) {
  return (
    <>
      <Navbar account={account} onConnect={onConnect} />
      <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
        <Outlet />
      </div>
    </>
  );
}
