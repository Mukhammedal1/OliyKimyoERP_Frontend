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
  margin-bottom: 40px;
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
  gap: 40px;
  padding: 0px 5px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 20px;
  }
  input {
    outline: none;
    width: 100%;
  }
`;
export const Input = styled.div`
  padding: 8px 12px;
  border: 2px solid #64748b;
  width: 80%;
  border-radius: 8px;
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

// export const ProfileWrapper = styled.div``;
