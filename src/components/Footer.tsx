import styled from "styled-components";

const FooterdBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  bottom: 0;
  width: 100%;
`;

function Footer() {
  return (
    <FooterdBox>
      <p>© 👻 BitGoast</p>
    </FooterdBox>
  );
}

export default Footer;
