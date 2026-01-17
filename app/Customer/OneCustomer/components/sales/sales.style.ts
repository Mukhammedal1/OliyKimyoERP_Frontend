import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  height: 370px;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 20px;
`;

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: 30px 2fr 2fr 2fr 2fr 2fr 2fr;
  background-color: #1e293b;
  color: white;
  font-weight: 600;
  padding: 8px 10px;
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
  grid-template-columns: 30px 2fr 2fr 2fr 2fr 2fr 2fr;
  align-items: center;
  padding: 8px 10px;
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
    border-right: 1px solid #eee;
    &:last-child {
      border-right: none;
    }
  }
  .red {
    color: red;
  }
  .blue {
    color: green;
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
  margin-top: 14%;
`;

export const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  background: #f8fafc;
  border-radius: 6px;
  overflow: hidden;
  thead {
    background: #e5e7eb;
  }

  th {
    padding: 4px;
    text-align: center;
    font-weight: 600;
    font-size: 12px;
  }

  td {
    padding: 4px;
    text-align: center;
    border-right: 1px solid #e5e7eb;
    border-bottom: 1px solid #eee;
  }

  tr:hover td {
    background: #f1f5f9;
  }
`;

export const ProductsRow = styled.div`
  background: white;
`;

export const ListWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-right: 1px solid #e5e7eb;
`;



export const TotalDebts = styled.div`
  display: flex;
  width: 50%;
  margin-top: 15px;
  justify-content: space-between;
  align-items: center;
  padding: 6px 18px;
  background-color: #e5e7eb;
  border-radius: 8px;
  border: 1px solid #334155;
  .red {
    color: red;
    font-weight: 600;
  }
  .green {
    color: green;
    font-weight: 600;
  }
  p {
    font-weight: 600;
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const MainDateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  /* margin-top: 15px; */
  align-self: end;
`;

export const Input = styled.input`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  min-width: 150px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
