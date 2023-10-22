import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPhone,
  faScissors,
  faGlasses,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Parent({ children }) {
  return (
    <div>
      <div className="pt-16 ml-16 place-items-center">{children}</div>
      <aside>
        <Link href="/">
          <div className="flex flex-row space-x-6 place-items-">
            <FontAwesomeIcon
              style={{ height: 20, width: 20 }}
              icon={faHouse}
              size="2xs"
              color="blue"
            />
            <a>Home</a>
          </div>
        </Link>
        <Link href="/"></Link>
        <div className="flex flex-row space-x-6 place-items-center ml-16">
          <FontAwesomeIcon
            style={{ height: 20, width: 20 }}
            icon={faPhone}
            size="2xs"
            color="blue"
          />
          <a>POS</a>
        </div>
        <Link href="/">
          <div className="flex flex-row space-x-6 place-items-center ml-16">
            <FontAwesomeIcon
              style={{ height: 20, width: 20 }}
              icon={faScissors}
              size="2xs"
              color="blue
"
            />
            <a>Sales</a>
          </div>
        </Link>
        <Link href="/">
          <div className="flex flex-row space-x-6 place-items-center">
            <FontAwesomeIcon
              style={{ height: 20, width: 20 }}
              icon={faGlasses}
              size="2xs"
              color="blue
"
            />
            <a>Brands</a>
          </div>
        </Link>
        <Link href="/">
          <div className="flex flex-row space-x-3 place-items-center">
            <FontAwesomeIcon
              style={{ height: 20, width: 20 }}
              icon={faWallet}
              size="2xs"
              color="blue
"
            />
            <a>Collections</a>
          </div>
        </Link>
      </aside>
      
    </div>
  );
}
export default Parent;
