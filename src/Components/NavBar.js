import { Navbar, Nav } from 'react-bootstrap';

function NavBar(props) {
  const { user, handleLogout, email } = props;

  return (
    <>
    {!user ? (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Overflowstack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    ) : (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Overflowstack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login" onClick={handleLogout}>Logout</Nav.Link>
            <Nav.Link> Hi {email} </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )}
    </>
  );
}

export default NavBar;



