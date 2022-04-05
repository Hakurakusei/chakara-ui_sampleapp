import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { User } from "../types/user";
import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/useLoginUser";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            setLoginUser(res.data);
            showMessage({ title: "ログインしました。", status: "success" });
            navigate("/home");
          } else {
            showMessage({
              title: "ユーザーがみつかりませんお",
              status: "error"
            });
          }
        })
        .catch(() =>
          showMessage({
            title: "ログインできませんお",
            status: "error"
          })
        )
        .finally(() => setLoading(false));
    },
    [navigate, setLoginUser, showMessage]
  );
  return { login, loading };
};
