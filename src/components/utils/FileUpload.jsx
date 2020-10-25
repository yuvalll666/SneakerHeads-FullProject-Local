import React, { useState } from "react";
import Dropzone from "react-dropzone";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { useToasts } from "react-toast-notifications";

function FileUpload(props) {
  const { addToast } = useToasts();
  const [images, setImages] = useState([]);

  const onDrop = async (files) => {
    const formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    try {
      const { data } = await http.post(
        `${apiUrl}/products/uploadImage`,
        formData,
        config
      );
      setImages([...images, data.image]);
      props.refreshFunction([...images, data.image]);
    } catch (error) {
      if (error.response) {
        addToast("Faild to save the Image in the server", {
          appearance: "error",
        });
      }
    }
  };

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);

    let newImages = [...images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div className="container d-lg-flex justify-content-center">
      <div className="row justify-content-center">
        <div className="mr-4 mb-2 ">
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgrey",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <i className="fas fa-plus" style={{ fontSize: "4rem" }}></i>
              </div>
            )}
          </Dropzone>
        </div>

        <div
          className="ml-4"
          style={{
            display: "flex",
            width: "351px",
            height: "241px",
            overflowX: "auto",
            overflowY: "hidden",
            border: "1px solid lightgrey",
          }}
        >
          {images.map((image, index) => (
            <div onClick={() => handleDelete(image)} key={index}>
              <img
                style={{ minWidth: "300px", width: "300px", height: "240px" }}
                src={`http://localhost:3000/${image}`}
                alt={`productImg-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
