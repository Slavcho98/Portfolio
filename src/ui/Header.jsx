import styled from "styled-components";
import HeaderMenu from "../ui/HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { HiOutlineBars3 } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    padding: 1.2rem 1.6rem;
    gap: 1.2rem;
    justify-content: space-between;
  }
`;

const MobileMenuButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }
`;

function Header({ onToggleSidebar }) {
  return (
    <StyledHeader>
      <MobileMenuButton>
        <ButtonIcon onClick={onToggleSidebar}>
          <HiOutlineBars3 />
        </ButtonIcon>
      </MobileMenuButton>
      <RightSection>
        <UserAvatar />
        <HeaderMenu />
      </RightSection>
    </StyledHeader>
  );
}

export default Header;
