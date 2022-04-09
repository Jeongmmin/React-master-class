import styled from "styled-components";

// const FooterWrapper = styled.div`
//   min-height:200px;
//   position:relative;
//   width:100%;
// `;

const FooterdBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  bottom: 0;
  width: 100%;
  /* position: absolute; */
`;

function Footer() {
  return (
    <FooterdBox>
      <p>© 👻 BitGoast</p>
    </FooterdBox>
  );
}

export default Footer;
