import { useRouter } from "next/router";
import ProfilePage from "../components/Profile";

export default function UserProfile() {
  const router = useRouter();
  const { name } = router.query;

  return <ProfilePage name={name} />;
}
