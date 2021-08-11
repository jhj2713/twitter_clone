import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
    <nav>
        <ul className="navList">
            <li>
                <Link to="/" style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" />
                </Link>
            </li>
            <li>
                <Link
                    to="/profile" 
                    className="navLink">
                    <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="3x" />
                    <span style={{ marginTop: 10 }}>
                        {userObj.displayName
                        ? `${userObj.displayName}의 Profile`
                        : "Profile"}
                    </span>
                </Link>
            </li>
        </ul>
    </nav>
);

export default Navigation;