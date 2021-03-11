import "./Error404Page.css";
import { Link } from 'react-router-dom';

const Error404Page = () => {
  return (
    <div id="error-page">
      <h1> We can't find that page. </h1>
      <Link to='/'> Go back home</Link>
    </div>  
  )
}

export default Error404Page;