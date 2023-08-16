import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/style.css'
import UserProvider from "./contexts/userContext";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import TimeLinePage from "./pages/timelinePage";
import HashatgPage from "./pages/hashtagPage";
import UserPostsPage from "./pages/userPostsPage";




export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/timeline" element={<TimeLinePage />} />
          <Route path="/hashtag/:hashtag" element={<HashatgPage />} />
          <Route path="/user/:id" element={<UserPostsPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

