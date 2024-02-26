import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const uuid = async () => {
  let uid: string = localStorage.getItem("Uid") || "";
  console.log("Existing uid------------", uid);
  if (uid === "") {
    const characters =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uid += characters.charAt(randomIndex);
    }
    localStorage.setItem("Uid", uid);
  }
  return uid;
};
