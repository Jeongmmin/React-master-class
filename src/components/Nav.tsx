import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {  CheckedState, isDarkAtom } from "../atom";

const Navbar = styled.div`
  padding: 10px 20px;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
`;

const Switch = styled.label`
  /* --moon-mask: ; */
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const HomeBtn = styled.span`
  display: inline-block;
  padding: 14px 0px;
  background-color: ${(props) => props.theme.homeBtnColor};
  border-radius: 30px;
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  font-size: 15px;
  font-weight: 600;
  z-index: 1;
  a {
    padding: 20px 14px;
    box-sizing: border-box;
    color: ${(props) => props.theme.textColor};
  }
  ::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }
  ::after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: rgba(148, 83, 233, 0.8);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }
  :hover {
    a {
      color: white;
    }
  }
  :hover:before {
    top: -35%;
    background-color: rgba(152, 137, 255, 0.8);
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
  :hover:after {
    top: -45%;
    background-color: rgba(152, 137, 255, 0.8);
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
`;

const Input = styled.input`
  :checked + .slider {
    background-color: #17181a;
  }
  :checked + .slider:before {
    box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -5px 0 0 #a3dafb;
    transform: translateX(1.5em);
    background: #17181a;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d8d8d89f;
  transition: 0.4s;
  border-radius: 30px;
  ::before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 20px;
    left: 0.3em;
    bottom: 0.3em;
    background: linear-gradient(40deg, #ff1188, #ff8c00 70%);
    transition: 0.4s;
  }
`;

function Nav() {

  const [Checked, setChecked] = useRecoilState(CheckedState);

  const setDarkAtom = useSetRecoilState(isDarkAtom);


  const toggleDarkAtom = () => setDarkAtom((prev: any) => !prev);

  const toggleCheckedAtom = () => setChecked((prev: any) => !prev);

  return (
    <Navbar>
      <HomeBtn>
        <a href="/bit-ghost">HOME</a>
      </HomeBtn>
      <Switch className="switch">
        <Input key="isDark" type="checkbox" onClick={toggleDarkAtom} defaultChecked={Checked} onChange={toggleCheckedAtom}/>
        <Slider className="slider"></Slider>
      </Switch>
    </Navbar>
  );
}

export default Nav;
