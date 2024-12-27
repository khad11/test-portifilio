import toast from "react-hot-toast";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

// update
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";

export function useLogout() {
  const { user } = useSelector((store) => store.user);
  const logout = async () => {
    let ref = doc(db, "users", user.uid);
    await updateDoc(ref, {
      online: false,
    });
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("See you soon )");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return { logout };
}
