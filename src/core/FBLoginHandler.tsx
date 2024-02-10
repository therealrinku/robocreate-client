import { FaFacebook } from "react-icons/fa";

export default function FbLoginHandler() {
  //CONFIG FOR FB LOGIN DIALOG
  const requiredScopes = "pages_manage_engagement,pages_manage_posts,pages_read_engagement";
  const fbDialogPopupURI = `https://www.facebook.com/v19.0/dialog/oauth?redirect_uri=${window.location.origin}&client_id=881256046505003&scope=${requiredScopes}&response_type=token`;
  //CONFIG FOR FB LOGIN DIALOG

  return (
    <a
      href={fbDialogPopupURI}
      className="mt-5 border flex items-center gap-2 text-sm  py-2 px-5 hover:bg-red-500 hover:border-red-500 transition duration-500 ease-in-out"
    >
      <FaFacebook />
      Connect Facebook Page
    </a>
  );
}
