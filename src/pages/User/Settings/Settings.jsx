import React from "react";
import UsersSettingsNavbar from "../../../components/UsersSettingNavbar/UsersSettingNavbar";
import { Col, Container } from "react-bootstrap";

function Settings() {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{ marginTop: "20px", fontSize: "30px", fontWeight: "bold" }}
        className="fs-1 mb-5"
      >
        ACCOUNT
      </div>
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <UsersSettingsNavbar />
      </div>
    </Container>
  );
}

export default Settings;
