import { useState } from "react";
import { useUser } from "../../stores/userStore";
import { axiosClient } from "../../utils/axiosClient";

function Profile() {
  const [data, setData] = useState("");
  const [user] = useUser((state) => [state.user]);
  const [upDate,setUpDate] =useState(false)

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setData(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const up = async () => {
    console.log("executed");
    return await axiosClient
      .post(
        "/user/update/" + user._id,
        { data },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input onChange={handleFileInputChange} type="file" />
      <button type="button" className="bg-black" onClick={up}>
        {" "}
        upload
      </button>

      <figure className="flex items-start sm:items-center ">
        <div className="relative">
          <img
            className="w-10 h-10 rounded-full"
            src={!user?.avatar?.url ? "/vite.svg" : user?.avatar?.url}
            alt="avatar"
            width="40"
            height="40"
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.name}</h5>
          <p>
            <b>Email:</b> {user?.email}{" "}
          </p>
        </figcaption>
      </figure>
      <hr className="my-4" />

      <hr className="my-4" />
    </div>
  );
}

export default Profile;
