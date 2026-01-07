import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 30px;
    font-weight: 500;
  }
  margin-bottom: 20px;
  background-color: #1e293b;
  color: white;
  padding: 5px 30px;
  border-radius: 8px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 15%;
`;

export const ProfileIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  text-align: center;
  align-items: center;
  :first-child {
    margin-top: 7px;
    margin-left: 7px;
  }
`;
