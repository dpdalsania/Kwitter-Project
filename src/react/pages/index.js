import Home from "./Home";
import Profile from "./Profile";
import NotFound from "./NotFound";
import MessageFeed from "./MessageFeed";
import Register from "./Register";
import EditUser from "./EditUser";

export default {
  Home: { path: "/", component: Home },
  Register: { path: "/register", component: Register },
  Profile: { path: "/profile/:username", component: Profile },
  MessageFeed: { path: "/messagefeed", component: MessageFeed },
  EditUser: { path: "/edit+profile/:username", component: EditUser },
  NotFound: { path: "*", component: NotFound }
};
