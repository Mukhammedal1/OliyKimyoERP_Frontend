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

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 20px;
  border: 1px solid #334155;
  border-radius: 8px;
  button {
    background-color: #1e293b;
    color: white;
    border-radius: 8px;
    padding: 8px 20px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      background-color: #1e293b;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 16%;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 23%;
`;

export const TableWrapper = styled.div`
  width: 100%;
  height: 450px;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 20px;
`;

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: 35px 1fr 1fr 1fr 245px 1fr 80px;
  background-color: #1e293b;
  color: white;
  font-weight: 600;
  padding: 12px 16px;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;

  span {
    padding: 4px 8px;
    text-align: center;
  }
`;

export const TableBody = styled.div`
  display: grid;
  grid-template-columns: 35px 1fr 1fr 1fr 245px 1fr 70px;
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f3f4f6;
  }
  span {
    padding: 4px 8px;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
  padding-left: 10px;

  :first-child {
    cursor: pointer;
    &:active {
      border-bottom: 2px solid red;
      padding-bottom: 1px;
    }
  }
  :last-child {
    cursor: pointer;
    &:active {
      border-bottom: 2px solid blue;
      padding-bottom: 1px;
    }
  }
`;
export const NotProductWrapper = styled.div`
  font-size: 25px;
  text-align: center;
  margin-top: 15%;
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
