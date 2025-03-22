import styled from "styled-components";

const Wrapper = styled.div`
position:relative;

.logout-btn {
    display: flex;
      align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
}
    .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
    .dropdown {
    position:absolute;
    top: 45px;
    left: 0;
    width: 100%;
     box-shadow: var(--shadow-2);
     test-align: center;
     visibility: hidden;
       border-radius: var(--border-radius);
    background: var(--primary-500);
    
    }
    .show-dropdown {
    visibility: visible;
  }
    .dropdown-btn {
        width: 100%;
        height: 100%;
        cursor: pointer;
        text-transform: pointer;
        color: var(--white);
        background: transparent;
        border-color: transparent;
        letter-spacing: var(--letter-spacing);
        padding:0.5rem;
    }

`;

export default Wrapper;