import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("/p.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.4); /* yarim shaffof */
  backdrop-filter: blur(
    2px
  ); /* rasmni sal blur qiladi, professional ko'rinish */
  padding: 40px 30px;
  border-radius: 15px;
  width: 450px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const EyeIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 40%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 18px;
  &:focus {
    border-color: #1e3c72;
    outline: none;
  }
  color: black;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0f172a;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #1e3c72;
  }
`;


export const LogoWrapper = styled.div`
  color: white;
  font-size: 36px;
  padding: 20px 20px;
  background-color: #0f172a;
  margin-bottom: 15px;
  border-radius: 10px;
`;