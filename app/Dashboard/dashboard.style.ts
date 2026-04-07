import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 22px;
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

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background-color: #1e293b;
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Card Title
export const CardTitle = styled.div`
  font-size: 18px;
`;

// Card Value
export const CardValue = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

// Table Wrapper
export const TableWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 20px;
    margin-bottom: 15px;
    color: #0f172a;
  }
`;

// Table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// Table Header
export const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  background-color: #e2e8f0;
  color: #0f172a;
`;

// Table Row
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8fafc;
  }
`;

// Table Cell
export const TableCell = styled.td`
  padding: 10px;
`;

export const ChartWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const TopProductsWrapper = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #1e293b;
  height: 280px;
  overflow-y: auto;
`;

export const ProductName = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

export const ProductSold = styled.span`
  font-weight: 700;
  color: #0f172a;
  margin-right: 20px;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  border-bottom: 1px solid #e2e8f0;
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f1f5f9;
    border-radius: 6px;
    transition: 0.3s;
  }
`;

export const ProgressBar = styled.div<{ progress: number; color: string }>`
  height: 8px;
  width: 300px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${(props) => props.progress}%;
    background-color: ${(props) => props.color};
    transition: width 0.3s ease;
  }
`;

export const ScrollWrapper = styled.div`
  height: 500px;
  overflow-y: auto;
`;
