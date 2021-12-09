import { Method } from "@/type";
import request from "./request";

type API = [string, Method];

const qs = (obj: { [key: string]: string }) => {
  let res = Object.entries(obj)
    .map((val) => {
      if (val[1].length === 0) return null;
      return `${val[0]}=${encodeURIComponent(val[1])}`;
    })
    .filter((o) => o);
  const result = res.join("&");
  if (result.length === 0) return "/";
  return `?${result}`;
};

const api = {
  user: {
    list: (): API => [`users/list`, "post"],
    info: (userId: string): API => [`users/${userId}`, "get"],
    create: (): API => ["users/", "post"],
    update: (): API => ["users/", "patch"],
    delete: (): API => ["users/", "delete"],
  },
  session: {
    check: (): API => ["auth/session", "get"],
    login: (): API => ["auth/login", "post"],
  },
};

export const getUserList = async (
  params: {
    page?: number;
    size?: number;
    userId?: string;
    userName?: string;
  } = {}
) => {
  const [url, method] = api.user.list();
  let data: { [key: string]: string | number } = {};
  if (params.page !== undefined) data.page = params.page;
  if (params.size !== undefined) data.size = params.size;
  if (params.userId !== undefined) data.id = params.userId;
  if (params.userName !== undefined) data.name = params.userName;
  return await request({
    url,
    method,
    data,
  });
};

export const getUserInfo = async (userId: string) => {
  const [url, method] = api.user.info(userId);
  return await request(
    {
      url,
      method,
    },
    {}
  );
};

export const checkSession = async () => {
  const [url, method] = api.session.check();
  return await request(
    {
      url,
      method,
    },
    false,
    false
  );
};

export const adminLogin = async (password: string) => {
  const [url, method] = api.session.login();
  return await request(
    {
      url,
      method,
      data: {
        password,
      },
    },
    false
  );
};

export default api;
