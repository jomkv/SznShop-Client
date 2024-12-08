import React from "react";
import UsersSettingsNavbar from "../../../components/UsersSettingNavbar/UsersSettingNavbar";

function Settings() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <div
        style={{ marginTop: "20px", fontSize: "30px", fontWeight: "bold" }}
        className="fs-1"
      >
        ACCOUNT
      </div>
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <UsersSettingsNavbar />
      </div>
    </div>
  );
}

export default Settings;
