import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: rgb(142, 142, 142);
`;

export const DesignContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const DesignLogo = styled.div`
  margin: 0 10px;
`;

export const DesignTextFront = styled.div`
  display: flex;
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  color: #40407a;
  padding-top: 8px;
`;

export const DesignTextTail = styled(DesignTextFront)``;
