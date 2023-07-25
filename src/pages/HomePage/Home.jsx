import { Card } from "antd";
import "./home.css"; // Importing the CSS

export default function Home({ user, onLogout }) {
  return (
    <div className="home-content">
      <Card className="home-card">
        {user ? (
          <>
            <h1>Welcome back, {user.username}</h1>
            <a href="/" onClick={onLogout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <h1>Welcome to React-Login</h1>
            <p>
              <a href="/signup">Sign up</a> or <a href="/login">Log in</a>
            </p>
          </>
        )}
      </Card>
    </div>
  );
}
