import React, { useEffect, useRef } from "react";
import { Image, X } from "lucide-react";

const UploadWidget = ({ setCloudinaryURL, cloudinaryURL }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "drlnh7yxm",
        uploadPreset: "h2h_photos",
        multiple: false,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.secure_url;
          console.log("Upload Image Url: ", imageUrl);
          setCloudinaryURL(imageUrl);
        }
      }
    );
  }, []);
  return (
    <div className="my-4 flex justify-center w-full text-center">
      {cloudinaryURL && (
        <button
          type="button"
          className="bg-accent text-text w-full flex px-4 py-4 font-bold rounded-md hover:bg-orange-600"
          onClick={() => setCloudinaryURL("")}
        >
          <div className="flex gap-2 items-center m-auto">
            <p>Change Image</p>
            <Image />
          </div>
        </button>
      )}
      {!cloudinaryURL && (
        <button
          type="button"
          className="bg-accent text-text px-4 py-4 w-full flex font-bold rounded-md hover:bg-orange-600"
          onClick={() => widgetRef.current.open()}
        >
          <div className="flex gap-2 items-center m-auto">
            <p>Upload Image</p>
            <Image />
          </div>
        </button>
      )}
    </div>
  );
};

export default UploadWidget;
