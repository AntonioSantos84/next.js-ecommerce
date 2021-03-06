import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import { map, size } from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { getMeApi } from "../../../api/user";
import { getCategoriesApi } from "../../../api/category";

export default function MenuWeb() {
  const [categories, setCategories] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar Sesión");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const response = await getCategoriesApi(7);
      if (size(response) > 0) setCategories(response);
      else setProducts([]);
    })();
  }, []);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={10}>
            <MenuCategories categories={categories} />
          </Grid.Column>
          <Grid.Column className="menu__right" width={6}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

/*Category.slug  for the Strapi server*/
function MenuCategories(props) {
  const { categories } = props;
  return (
    <Menu>
      {map(categories, (category) => (
        <Link href={`/category/${category.url}`} key={category._id}>
          <Menu.Item as="a" name={category.url}>
            {category.name}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;
  const { productsCart } = useCart();
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>

          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="archive" />
              My Orders
            </Menu.Item>
          </Link>

          <Link href="/wishlist">
            <Menu.Item as="a" className="m-0">
              <Icon name="heart outline" />
            </Menu.Item>
          </Link>

          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>

          <Menu.Item onClick={logout} className="m-0">
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          My Account
        </Menu.Item>
      )}
    </Menu>
  );
}
