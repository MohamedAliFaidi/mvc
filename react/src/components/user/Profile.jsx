import { useState } from "react";
import { useUser } from "../../stores/userStore";
import { axiosClient } from "../../utils/axiosClient";
import LoadingFallback from "../layouts/Loading";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { RiImageEditLine } from "react-icons/ri";
import { Link } from "react-router-dom";

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
    let old = "";
    if (user?.avatar?.public_id) {
      old = user?.avatar?.public_id;
    }
    return await axiosClient
      .post(
        "/user/update/" + user._id + "?old=" + old,
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
          className="w-[180px] rounded-full"
          src={!user?.avatar?.url ? "/vite.svg" : user?.avatar?.url}
          alt="avatar"
        />
      </figure>
      {!upDate && (
        <button
          name="edit"
          type="button"
          className="bg-black text-white hover:bg-gray-800  font-bold py-2 px-4 rounded"
          onClick={() => {
            setUpDate(!upDate);
          }}
        >
          <RiImageEditLine />
        </button>
      )}
      {upDate && (
        <>
          {" "}
          <input onChange={handleFileInputChange} type="file" />
          {!upload ? (
            <>
              <button
                type="button"
                name="cancel"
                className="bg-black text-white hover:bg-gray-800    font-bold py-2 px-4 rounded mr-10"
                onClick={() => {
                  setUpDate(false);
                }}
              >
                {" "}
                <MdCancel />
              </button>
              <button
                type="button"
                name="upload"
                disabled={data.length == 0}
                className="bg-black text-white hover:bg-gray-800  font-bold py-2 px-4 rounded"
                onClick={up}
              >
                {" "}
                <FaCloudUploadAlt />
              </button>
            </>
          ) : (
            <LoadingFallback />
          )}
        </>
      )}

      <hr className="my-4" />
      <figcaption>
        {/* <h5 className="font-semibold text-lg">{user?.name}</h5> */}
        <p>
          <b>Email:</b> {user?.email}{" "}
        </p>
      </figcaption>
      <hr className="my-4" />
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            {/* <Sidebar /> */}
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <figure className="flex items-start sm:items-center">
                <div className="relative">
                  <img
                    className="w-16 h-16 rounded-full mr-4"
                    src={"/logo192.png"}
                    alt={"user name"}
                  />
                </div>
                <figcaption>
                  <h5 className="font-semibold text-lg">Ghulam</h5>
                  <p>
                    <b>Email:</b> ghulam@gmail.com | <b>Joined On:</b>
                    2023-12-24
                  </p>
                </figcaption>
              </figure>

              <hr className="my-4" />

              {/* <UserAddresses /> */}

              <Link to="/address/new">
                <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
                  <i className="mr-1 fa fa-plus"></i> Add new address
                </button>
              </Link>

              <hr className="my-4" />
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
