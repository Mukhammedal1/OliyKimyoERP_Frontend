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
    font-size: 18px;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0px 5px;
`;

export const FirstWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-left: 10px; */
`;

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 52%;
  padding: 0px 12px;

  p {
    font-size: 18px;
  }

`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
  width: 40%;
  p {
    font-size: 18px;
  }
  input {
    outline: none;
  }
  #input {
    margin-left: 16px;
  }
`;

export const Input = styled.div`
  padding: 5px 12px;
  border: 2px solid #64748b;
  width: 51%;
  border-radius: 8px;
  input {
    outline: none;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  gap: 25px;
  margin-top: 20px;
  margin-left: 60px;
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

export const ProfileIconWrapper = styled.div`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  text-align: center;
  align-items: center;
  :first-child {
    margin-top: 5px;
    margin-left: 5px;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 5px;
`;

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 1fr 1fr 1fr 80px;
  background-color: #1e293b;
  color: white;
  font-weight: 600;
  padding: 6px 12px;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;

  span {
    padding: 2px 6px;
    text-align: center;
  }
`;

export const TableBody = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 1fr 1fr 1fr 70px;
  padding: 6px 12px;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f3f4f6;
  }
  span {
    padding: 2px 6px;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PlusWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #1e293b;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.1s ease;

  position: fixed;
  bottom: 220px;
  right: 60px;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  span {
    font-size: 50px;
    color: #1e293b;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;

  :first-child {
    margin-left: 20px;
    cursor: pointer;
    &:active {
      border-bottom: 2px solid red;
      padding-bottom: 1px;
    }
  }
`;

export const ContentWrapper2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 25px auto;
`;

export const NotProductWrapper = styled.div`
  font-size: 25px;
  text-align: center;
  margin-top: 10%;
`;

export const SelectWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 30%;

  p {
    font-size: 18px;
  }
  select {
    width: 230px;
    padding: 8px 12px;
    border-radius: 8px;
    border: 2px solid #64748b;
  }
  option {
    color: black;
  }
`;

export const TitleWrapper = styled.div`
  padding: 6px 12px;
  border-radius: 8px;
  background-color: #1e293b;
  p {
    font-size: 18px;
    color: white;

    padding: 2px 12px;
  }
`;

export const InputWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 30%;
  p {
    font-size: 18px;
  }
`;

export const Input2 = styled.div`
  padding: 5px 12px;
  border: 2px solid #64748b;
  border-radius: 8px;
  input {
    outline: none;
  }
`;

export const AddProductWrapper = styled.div`
  width: 100%;
  height: 250px;
  border: 1px solid #1e293b;
  border-radius: 8px;
`;

export const ButtonWrapper2 = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  gap: 30px;
  margin-top: 40px;
  margin-left: 65px;
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

export const PricesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin-top: 15px;
  padding: 0px 12px;
`;
export const Input3 = styled.div`
  padding: 4px 12px;
  border: 2px solid #64748b;
  border-radius: 8px;
  input {
    outline: none;
    width: 100%;
    font-size: 16px;
  }
`;

export const PriceNoteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PricesWrapper1 = styled.div`
  width: 52%;
`;

export const NoteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  width: 40%;
  font-size: 18px;
  padding: 0px 15px;
  p {
    margin-top: 20px;
  }

  textarea {
    border-radius: 5px;
    border: 1px solid #64748b;
    resize: none;
    width: 300px;
    height: 94px;
    outline: none;
    padding: 7px;
    font-size: 16px;
    margin-top: 15px;
  }
`;
