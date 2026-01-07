import React, { useState } from "react";
import {
  Container,
  NavWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
} from "./dashboard.style";
import ProfileIcon from "../../icons/profile-icon";

const DashboardPage = () => {
  return (
    <Container>
      <NavWrapper>
        <span>Dashboard </span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
    </Container>
  );
};

export default DashboardPage;
