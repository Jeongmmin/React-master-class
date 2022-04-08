import styled from 'styled-components'

const Navbar = styled.div`
  padding: 10px 20px;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface IRouterProps {
  toggleDark: ()=> void;
}

function Nav({ toggleDark }: IRouterProps) {


  return (
    <Navbar>
      <span><a href="/">HOME</a></span>
      <button onClick={toggleDark}>dark</button>
    </Navbar>
  )
}

export default Nav