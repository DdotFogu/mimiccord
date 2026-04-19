import { User } from "../types/user";
import { useUsersUpdate } from "../context/UserContext";
import { motion } from "motion/react";
import { truncate } from "../utils/stringutils.ts";

type DisplayProps = {
  user: User;
  onEditClick: (u: User) => void;
};

export const UserDisplay = ({ user, onEditClick = () => {} }: DisplayProps) => {
  const { removeUser } = useUsersUpdate();

  const handleUserDelete = () => removeUser(user);

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
      exit={{ opacity: 0, y: -15, transition: { duration: 0.25 } }}
      className="text-white bg-darkermist min-w-35.5 max-w-35.5 min-h-fit flex flex-col items-center rounded-2xl gap-1 py-2"
    >
      <span className=" font-semibold text-center min-h-6 max-w-35.5 flex flex-col truncate shrink">
        {truncate(user.username, 10)}
      </span>

      <img className="rounded-full" width={70} src={user.pfp} />

      <span className="flex flex-row justify-center items-center w-fit gap-5 ">
        <button className=" cursor-pointer" onClick={() => onEditClick(user)}>
          <motion.svg
            initial={{ fill: "#9D9EA5" }}
            whileHover={{ fill: "#FFFFFF", transition: { duration: 0.25 } }}
            className="fill-mist"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z" />
          </motion.svg>
        </button>

        {user.id != "superuser" && (
          <button className="cursor-pointer" onClick={() => handleUserDelete()}>
            <motion.svg
              initial={{ fill: "#9D9EA5" }}
              whileHover={{ fill: "#FF746C", transition: { duration: 0.25 } }}
              className="fill-mist"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
            </motion.svg>
          </button>
        )}
      </span>
    </motion.div>
  );
};

export default UserDisplay;
