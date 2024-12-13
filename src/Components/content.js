// Content component to display a simple message and current time
const Content = () => {
    return (
      <div>
        <h1>Hello World!</h1>
        {/* Display the current time */}
        <h2>It is {new Date().toLocaleTimeString()}</h2>
      </div>
    );
  }
  
  export default Content;
