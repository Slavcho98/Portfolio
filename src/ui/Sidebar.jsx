import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader"

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 999;
  }
`;

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 26rem;
    height: 100vh;
    z-index: 1000;
    transform: ${(props) => (props.$isOpen ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease-in-out;
    box-shadow: ${(props) => (props.$isOpen ? "var(--shadow-lg)" : "none")};
  }
`;

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <StyledSidebar $isOpen={isOpen}>
        <Logo />
        <MainNav onNavClick={onClose} />
        <Uploader/>
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
