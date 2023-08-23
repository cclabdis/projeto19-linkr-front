import axios from "axios";
import styled from "styled-components";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UserContext } from "../../../contexts/userContext.js";
import DebounceInput from "react-debounce-input";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const arrowRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser({});
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (dropdownRef.current) {
      if (!arrowRef.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleSearchChange = async (value) => {
    setSearchValue(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/timeline/${value}`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        });

        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <HeaderSC>
        <h1 onClick={() => navigate("/timeline")}>linker</h1>
        {!isMobile && (
          <DesktopInputSC>
            <DebounceInput
              data-test="search"
              type="text"
              placeholder={"Search for people"}
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              debouncetimeout={300}
              minLength={3}
            ></DebounceInput>
            {suggestions.length > 0 && (
              <SuggestionsDesktop>
                <ul>
                  {suggestions.map((user) => (
                    <li data-test="user-search" className="Lato" key={user.id} onClick={() => navigate(`/user/${user.id}` )}>
                      <img src={user.photo} alt="User image" ></img>
                      <p>{user.username}</p>
                      {user.isFollowing && <span>• following</span>}
                    </li>
                  ))}
                </ul>
              </SuggestionsDesktop>
            )}
          </DesktopInputSC>
        )}
        <div ref={arrowRef} >
          {isDropdownOpen ? (
            <span>
              <ArrowUp />
            </span>
          ) : (
            <span>
              <ArrowDown />
            </span>
          )}
          <img data-test="avatar" src={user.photo} alt="Profile picture" onClick={toggleDropdown} ></img>
        </div>
        {isDropdownOpen && (
          <span ref={dropdownRef}>
            <Dropdown data-test="menu">
              <p data-test="logout" onClick={logout}>Logout</p>
            </Dropdown>
          </span>
        )}
      </HeaderSC>
      {isMobile && (
        <MobileInputSC>
          <DebounceInput
            data-test="search"          
            type="text"
            placeholder={"Search for people"}
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            debouncetimeout={300}
            minLength={3}
          ></DebounceInput>
          {suggestions.length > 0 && (
            <SuggestionsMobile>
              <ul>
                {suggestions.map((user) => (
                  <li data-test="user-search" className="Lato" key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
                    <img data-test="avatar" src={user.photo} alt="User image" onClick={toggleDropdown} ></img>
                    <p>{user.username}</p>
                  </li>
                ))}
              </ul>
            </SuggestionsMobile>
          )}
        </MobileInputSC>
      )}
    </>
  );
}

const SuggestionsDesktop = styled.div`
  position: absolute;
  margin-top: -5px;
  width: 50%;
  background-color: #fff;
  border-radius: 8px 8px 8px 8px;
  top: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1;
  ul {
    width: 100%;
    list-style: none;
    border-radius: 0px 0px 8px 8px;
    background: #e7e7e7;
    li {
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;

      display: flex;
      align-items: center;
      justify-content: flex-start;
      &:hover {
        background-color: #f0f0f0;
      }
      p {
        margin-left: 10px;
        cursor: pointer;
        color: #515151;
        font-size: 19px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      span{
        color: #c5c5c5;
        font-size: 19px;
        font-weight: 400;
        margin-left: 7px;
      }
      img {
        margin-left: 10px;
        width: 39px;
        height: 39px;
        border-radius: 50%;
        background-color: gray;
        object-fit: cover;
      }
    }
  }
`;

const SuggestionsMobile = styled.div`
  position: absolute;
  margin-top: -5px;
  width: 50%;
  background-color: #fff;
  border-radius: 0px 0px 8px 8px;
  top: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1;
  ul {
    width: 100%;
    list-style: none;
    border-radius: 8px;
    background: #e7e7e7;
    li {
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;

      display: flex;
      align-items: center;
      justify-content: flex-start;
      &:hover {
        background-color: #f0f0f0;
      }
      p {
        margin-left: 10px;
        cursor: pointer;
        color: #515151;
        font-family: Lato;
        font-size: 19px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        background-color: gray;
        object-fit: cover;
      }
    }
  }
`;

const ArrowDown = styled(RiArrowDownSLine)`
  font-size: 35px;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const ArrowUp = styled(RiArrowUpSLine)`
  font-size: 35px;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const DesktopInputSC = styled.div`
  width: 100%;
  height: 55px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 50%;
    height: 45px;
    border: none;
    border-radius: 8px;
    padding-left: 17px;
    background: #ffffff;
    color: #515151;
    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    box-sizing: border-box;
    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #C6C6C6;
   }

    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #C6C6C6;
    }

    &::-ms-input-placeholder { /* Microsoft Edge */
      color: #C6C6C6;
    }
  }
`;

const MobileInputSC = styled.div`
  width: 100%;
  height: 55px;
  position: relative;

  display: flex;
  align-items: flex-end;
  justify-content: center;
  input {
    width: 50%;
    height: 45px;
    border: none;
    border-radius: 8px;
    background: #ffffff;
    color: #c6c6c6;
    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 47px;
  border-radius: 0px 0px 20px 20px;
  background: #171717;
  z-index: 1;
  p {
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.85px;
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
`;

const HeaderSC = styled.header`
  width: 100%;
  height: 72px;
  background-color: #151515;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin-left: 2%;
    color: #ffffff;
    font-family: Passion One;
    font-size: 49px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 2.5px;
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
  > div {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-right: 2%;
    > img {
      width: 53px;
      height: 53px;
      border-radius: 50%;
      background-color: gray;
      object-fit: cover;
    }
  }
`;
