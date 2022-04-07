import styled from 'styled-components'

const Navbar = styled.div`
  padding: 10px 20px;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Nav() {
  return (
    <Navbar>
      <span><a href="/">HOME</a></span>
      <button>dark</button>
    </Navbar>
  )
}

export default Nav