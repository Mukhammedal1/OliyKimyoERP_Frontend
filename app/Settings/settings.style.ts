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

export const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const TextIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: white;
  border: 2px solid #1e293b;
  border-radius: 10px;
  padding: 6px 20px;
  p {
    font-size: 22px;
    color: #1e293b;
  }
  width: 48%;
  cursor: pointer;
  transition: transform 0.2s ease; 
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1.1);
  }
`;
export const SettingsIconWrapper = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: #1e293b;
  align-content: center;
  padding-left: 25px;
`;


// export const SectionWrapper=styled.div``
// export const SectionWrapper=styled.div``
// export const SectionWrapper=styled.div``
// export const SectionWrapper=styled.div``
// export const SectionWrapper=styled.div``
// export const SectionWrapper=styled.div``
// export const SectionWrapper=styled.div``
// export const SectionWrapper=styled.div``
// export const SectionWrapper = styled.div``;
