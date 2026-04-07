import styled from "styled-components";

interface SectionWrapperProps {
  active?: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Sidebar = styled.div`
  width: 22%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* gap: 10px; */
  background-color: #0f172a;
  font-size: 18px;
`;

export const LogoWrapper = styled.div`
  color: white;
  font-size: 36px;
  padding: 20px 20px;
`;

export const Content = styled.div`
  background-color: white;
  color: black;
  width: 78%;
  padding: 20px 30px;
`;

export const Button = styled.button`
  border: none;
  border-radius: 6px;
  padding: 14px 0px;
  text-align: start;
  cursor: pointer;
  font-size: 20px;
`;

export const SectionWrapper = styled.div<SectionWrapperProps>`
  display: flex;
  justify-content: flex-start;
  gap: 18px;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 2px 25px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;

  background-color: ${(props) => (props.active ? "#334155" : "transparent")};
  border-radius: ${(props) => (props.active ? "10px" : "0px")};

  &:hover {
    background-color: #334155;
    border-radius: 10px;
  }

  
  &:active {
    transform: scale(1.1);
  }
`;
// export const Sidebar=styled.div``
// export const Sidebar = styled.div``;
