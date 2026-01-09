import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOAuthToken } from "../../api";
import { saveToken } from "../../localStorage";
import { setToken } from "../../store/slices/app";
import { useDispatch } from "react-redux";
import styles from "./OAthCallback.module.css";

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getOAuthToken();
        if (accessToken) {
          saveToken(accessToken);
          dispatch(setToken(accessToken));
            navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getToken();
  }, [dispatch, navigate]);

  return (
    <>
      <div className={styles.loader}></div>
    </>
  );
};
