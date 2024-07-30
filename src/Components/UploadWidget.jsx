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
    <div className="my-4 flex justify-center">
      {cloudinaryURL && (
        <button
          type="button"
          className="bg-accent text-text p-4 font-bold"
          onClick={() => setCloudinaryURL("")}
        >
          <div className="flex gap-1">
            <p> Cancel Upload</p>
            <X />
          </div>
        </button>
      )}
      {!cloudinaryURL && (
        <button
          type="button"
          className="bg-accent text-text p-4 font-bold"
          onClick={() => widgetRef.current.open()}
        >
          <div className="flex gap-2 items-center">
            <p>Upload Profile Photo</p>
            <Image />
          </div>
        </button>
      )}
    </div>
  );
};

export default UploadWidget;
