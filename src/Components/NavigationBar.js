// NavigationBar component using react-bootstrap for navigation between routes
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Travel Log</Navbar.Brand> {/* Brand name in the Navbar */}
      <Nav className="mr-auto">
        {/* Links to different routes in the app */}
        <Nav.Link as={Link} to="/home">Home</Nav.Link>
        <Nav.Link as={Link} to="/read">Read</Nav.Link>
        <Nav.Link as={Link} to="/create">Create</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;