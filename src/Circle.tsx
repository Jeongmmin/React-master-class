import { useState } from 'react';
import styled from "styled-components";


interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${props => props.bgColor};
  border-radius: 100px;
  border: 2px solid ${props => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  // optional
  borderColor?: string;
  text?: string;
}


function Circle( {bgColor, borderColor, text =" default text "} : CircleProps) {


  return (
    // borderColor가 undefined 상태라면 초기값 bgColor
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>{text}</Container>
  )
}

export default Circle;