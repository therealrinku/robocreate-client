import { useLogin } from "react-facebook";
import { FaFacebook } from "react-icons/fa";

export default function FbHandler() {
  const { login, status, isLoading, error } = useLogin();

  async function handleLogin() {
    try {
      const response = await login({
        scope: `pages_manage_engagement,
        pages_manage_posts,
        pages_read_engagement,
        pages_read_user_engagement`,
      });

      console.log(response.status);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="mt-5 flex items-center gap-2 text-sm bg-red-800 py-2 px-5 hover:bg-red-700 rounded-md"
    >
      <FaFacebook />
      Connect Facebook Page
    </button>
  );
}
