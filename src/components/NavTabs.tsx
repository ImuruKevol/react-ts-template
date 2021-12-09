import { FC, useLayoutEffect, useState } from "react";
import { link } from "@/reducers/navReducer";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import UserGroup from "@c/Main/UserGroup";
import { checkSession } from "@/utils/api";

type menu = {
  uri: string;
  comp: FC;
  name: string;
}[];

const NavTabs: FC = () => {
  const [menu, setMenu] = useState<menu>([]);
  const dispatch = useDispatch();
  const menus = [{ uri: "/group", comp: <></>, name: "Group list" }];
  // const menus = [{ uri: "/group", comp: UserGroup, name: "Group list" }];

  const nav = (uri: string, comp: FC) => {
    dispatch(link(uri, comp));
  };

  useLayoutEffect(() => {
    const func = async () => {
      // const valid = await checkSession();
      // if (valid) {
      //   setMenu(menus);
      //   nav(menus[0].uri, menus[0].comp);
      // }
    };
    func();
  }, []);

  return menu.length > 0 ? (
    <Nav fill variant="tabs" defaultActiveKey={menus[0].uri}>
      {menu.map((m, i) => (
        <Nav.Item key={`nav-menu-${i}`}>
          <Nav.Link eventKey={m.uri} onClick={() => nav(m.uri, m.comp)}>
            {m.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  ) : (
    <></>
  );
};

export default NavTabs;
