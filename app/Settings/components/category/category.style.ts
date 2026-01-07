import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 20px;
`;

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: 40px 2fr 100px;
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
  grid-template-columns: 40px 2fr 100px;
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f3f4f6;
  }
  span {
    padding: 4px 8px;
    font-size: 14px;
    text-align: center;
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
export const NotCategoryWrapper = styled.div`
  font-size: 25px;
  text-align: center;
  margin-top: 15%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 25px;
    font-weight: 600;
  }
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

export const AddCategoryWrapper = styled.div``;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
  width: 100%;
  margin-top: 25px;
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
  width: 40%;
  border-radius: 8px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  gap: 25px;
  margin-top: 45px;
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
// export const AddCategoryWrapper=styled.div``
// export const AddCategoryWrapper=styled.div``
// export const AddCategoryWrapper = styled.div``;
