import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  hr {
    margin-top: 25px;
    border: 1px solid #1e293b;
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 20px;
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

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-columns: auto auto;
  gap: 15px;
  /* padding: 0px 5px; */
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 25px;
  align-items: center;
  width: 80%;
  p {
    font-size: 20px;
  }
  span {
    border: 1px solid #64748b;
    border-radius: 8px;
    padding: 4px 8px;
  }
  textarea {
    border: 1px solid #64748b;
    border-radius: 8px;
    margin-top: 20px;
    padding: 4px 8px;
    width: 300px;
    height: 70px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  gap: 25px;
  margin-top: 40px;
  button {
    width: 150px;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    color: white;
    background-color: #0f172a;
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

export const NoteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  textarea {
    border-radius: 5px;
    border: 2px solid #64748b;
    resize: none;
    width: 300px;
    height: 94px;
    outline: none;
    padding: 7px;
    font-size: 16px;
  }
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
  grid-template-columns: 40px 2fr 2fr 2fr 2fr 100px;
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
  grid-template-columns: 40px 2fr 2fr 2fr 2fr 100px;
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
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
  width: 80px;
  padding-left: 25px;

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
export const NotCustomerWrapper = styled.div`
  font-size: 25px;
  text-align: center;
  margin-top: 15%;
`;

export const NotProductWrapper = styled.div`
  font-size: 25px;
  text-align: center;
  margin-top: 15%;
`;

export const TabWrapper = styled.div<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "white" : "#1e293b")};
  background-color: ${({ $active }) => ($active ? "#1e293b" : "white")};
  border: ${({ $active }) => ($active ? "none" : "1px solid #1e293b")};
  transition: all 0.3s ease;
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
`;

export const BackButtonWrapper = styled.div`
  align-self: end;
  margin-top: 15px;
  button {
    width: 150px;
    border: none;
    border-radius: 8px;
    padding: 8px 11px;
    color: white;
    background-color: #0f172a;
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
export const CustomerInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35%;
  align-items: center;
  margin-top: 15px;
  p {
    font-weight: 600;
  }
  span {
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #1e293b;
  }
`;
// export const ProfileWrapper = styled.div``;
// export const ProfileWrapper = styled.div``;
// export const ProfileWrapper = styled.div``;
