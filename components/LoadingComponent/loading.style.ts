import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 140px 0;
`;

export const SpinnerCircle = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid #ccc;
  border-top: 6px solid #1d4ed8;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

export const LoadingText = styled.div`
  font-size: 18px;
  color: #1d4ed8;
  font-weight: 500;
`;
