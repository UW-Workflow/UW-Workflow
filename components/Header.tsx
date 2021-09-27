// import { signIn, signOut, useSession } from 'next-auth/client'

export default function Header() {

  // const [session, loading] = useSession();

  var button;

  if (true) {
    button = <button className="btn btn-secondary" onClick={() => {}}>Logout</button>;
  }
  else {
    button = <button className="btn btn-primary" onClick={() => {}}>Login</button>;
  }

  return (

    <nav className="navbar">

        <ul id="navlist">
            <h3 style={{margin: "30px 30px 0 20px", color: "white"}}>UW-WORKFLOW</h3>
            <li>Home</li>
            <li onClick={() => {}}>Items</li>
            <li style={{float: "left"}} onClick={() => {}}>{true ? "Logout" : "Login"}</li>
        </ul>

    </nav>
  )
}