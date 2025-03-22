import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--background-secondary-color);
      height: 100%;
      min-height: 100vh;
      width: 250px;
      margin-left: -250px;
      transition: margin-left 0.3s ease-in-out;
    }
    .show-sidebar {
      margin-left: 0px;
    }
    .content {
      position: sticky;
      top: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: left;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
color: var(--text-secondary-color);
      &:hover {
        padding-left: 3rem;
        color: var(--primary-500);
        transition: var(--transition);
      }
    }
      .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }
        .logo {
    display: flex;
    align-items: center;
    width: 200px;
  }
       .active {
      color: var(--primary-500);
    }
      .pending {
  background: var(--background-color);
}
  }
`;

export default Wrapper;
