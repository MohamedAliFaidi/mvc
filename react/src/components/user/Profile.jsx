import { useState } from "react";
import { useUser } from "../../stores/userStore";
import { axiosClient } from "../../utils/axiosClient";
import LoadingFallback from "../layouts/Loading";

function Profile() {
  const [data, setData] = useState("");
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);
  const [upDate, setUpDate] = useState(false);
  const [upload, setUpload] = useState(false);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setData(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const up = async () => {
    setUpload(true);
    return await axiosClient
      .post(
        "/user/update/" + user._id,
        { data },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const updatedUser = { ...user };
        // Update the avatar object
        updatedUser.avatar = {
          public_id: res?.data?.avatar?.public_id,
          url: res?.data?.avatar?.secure_url,
        };
        // Update the state with the new user object
        setUser(updatedUser);
        setUpDate(false);
        setUpload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <figure className="flex items-start sm:items-center ">
        <img
          className="w-15 h-15 rounded-full"
          src={!user?.avatar?.url ? "/vite.svg" : user?.avatar?.url}
          alt="avatar"
        />
      </figure>
      <button
        type="button"
        className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setUpDate(!upDate);
        }}
      >
        {" "}
        {upDate ? "Cancel" : "Edit"}
      </button>
      {upDate && (
        <>
          {" "}
          <input onChange={handleFileInputChange} type="file" />
          {!upload ? (
            <button
              type="button"
              className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
              onClick={up}
            >
              {" "}
              upload
            </button>
          ) : (
            <LoadingFallback />
          )}
        </>
      )}

      <hr className="my-4" />
      <figcaption>
        <h5 className="font-semibold text-lg">{user?.name}</h5>
        <p>
          <b>Email:</b> {user?.email}{" "}
        </p>
      </figcaption>
      <hr className="my-4" />
    </div>
  );
}

export default Profile;
