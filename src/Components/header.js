const Header = () => {
  return <div>
  <div className="container text-center mt-4">
    <h2>Welcome to Travel Log!</h2>
    <p>
      This is your personal space to track your travels, activities, and memories. 
      You can add new trips, explore past trips, and upload photos to share your experiences with others.
    </p>
  </div>
  
  <div className="container text-center mt-4">
    <h3>Get Started</h3>
    <p>
      Create a new trip or explore your past adventures! Click below to get started:
    </p>
    <div className="row">
      <div className="col">
        <a href="/create" className="btn btn-primary">Add a New Trip</a>
      </div>
      <div className="col">
        <a href="/trips" className="btn btn-secondary">View Trips</a>
      </div>
    </div>
  </div>

  
</div>
};

export default Header;
