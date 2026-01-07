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
    /* font-weight: 500; */
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

export const MainTabWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
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

export const TableWrapper = styled.div`
  width: 100%;
  height: 420px;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 20px;
`;

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 1fr 1fr 80px;
  background-color: #1e293b;
  color: white;
  font-weight: 600;
  padding: 8px 16px;
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
  grid-template-columns: 40px 1fr 1fr 1fr 1fr 70px;
  align-items: center;
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
  padding-left: 20px;

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

export const Span1 = styled.span<{ $type?: string }>`
  margin: 0 auto;
  padding: 2px 4px;
  border-radius: 10px;
  width: 40%;
  color: white;
  border: none;
  font-weight: 600;
  background: ${({ $type }) => {
    if ($type === "KIRIM") return "linear-gradient(90deg, #0F9D50, #69F0AE)";
    if ($type === "CHIQIM") return "linear-gradient(90deg, #B71C1C, #FF8A80)";
  }};
  filter: saturate(1.6);
`;

export const GlowText = styled.span<{ $type?: string }>`
  font-weight: 700;
  font-size: 16px;

  /* Matn rangini gradient bilan yarim toq / yarim och qilish */
  background: ${({ $type }) => {
    if ($type === "SOTUV") return "linear-gradient(90deg, #0F9D50, #69F0AE)";
    if ($type === "XARID") return "linear-gradient(90deg, #FF8A80, #B71C1C)";
    if ($type === "MIJOZ QARZ TO'LOVI")
      return "linear-gradient(90deg, #64B5F6, #0D47A1)";
    if ($type === "KOMPANIYAMIZ QARZ TO'LOVI")
      return "linear-gradient(90deg, #FFCC80, #EF6C00)";
    return "linear-gradient(90deg, #BDBDBD, #616161)";
  }};

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Quyosh nuri / glow effekti */
  text-shadow: ${({ $type }) => {
    if ($type === "SOTUV")
      return `
        0 0 4px rgba(129, 199, 132, 0.7),
        0 0 10px rgba(15, 157, 80, 0.5),
        0 0 20px rgba(15, 157, 80, 0.35)
      `;
    if ($type === "XARID")
      return `
        0 0 4px rgba(255, 138, 128, 0.7),
        0 0 10px rgba(183, 28, 28, 0.5),
        0 0 20px rgba(183, 28, 28, 0.35)
      `;
    if ($type === "MIJOZ QARZ TO'LOVI")
      return `
        0 0 4px rgba(100, 181, 246, 0.7),
        0 0 10px rgba(13, 71, 161, 0.5),
        0 0 20px rgba(13, 71, 161, 0.35)
      `;
    if ($type === "KOMPANIYAMIZ QARZ TO'LOVI")
      return `
        0 0 4px rgba(239, 108, 0, 0.7),
        0 0 10px rgba(255, 204, 128, 0.5),
        0 0 20px rgba(255, 204, 128, 0.35)
      `;
    return `
      0 0 4px rgba(97, 97, 97, 0.5),
      0 0 10px rgba(189, 189, 189, 0.35)
    `;
  }};

  filter: saturate(1.6);
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 16px;
  button {
    background-color: #1e293b;
    color: white;
    border-radius: 8px;
    padding: 6px 14px;
    border: none;
    margin-left: 9%;
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

export const Input = styled.input`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  min-width: 150px;
`;

export const Select = styled.select`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 25%;
  .sale {
    color: #0f9d50;
    font-weight: 750;
  }
  .purchase {
    color: #b71c1c;
    font-weight: 750;
  }
  .customer_debt {
    color: #0d47a1;
    font-weight: 750;
  }
  .company_debt {
    color: #ef6c00;
    font-weight: 750;
  }
  .other {
    color: #616161;
    font-weight: 750;
  }
`;

export const Button = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  background-color: #0f9d50;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #0bb648;
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
`;
export const ButtonWrapper = styled.div``;
// export const TabWrapper=styled.div``
// export const TabWrapper=styled.div``
// export const TabWrapper=styled.div``
// export const TabWrapper=styled.div``
// export const TabWrapper=styled.div``
// export const TabWrapper=styled.div``
// export const TabWrapper = styled.div``;
