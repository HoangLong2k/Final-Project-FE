import React, { useRef, useState } from "react";
import { Image } from "antd";
import { nanoid } from "nanoid";
import CropImage from "./ImageCrop";
import _keys from "lodash/keys";
import { InstagramOutlined, CloseOutlined } from "@ant-design/icons";

import "./styles.less";

export const getExtension = (filename) =>
  filename.split(".").slice(-1)[0].toLowerCase();

export const convertFileToBase64 = (file) => {
  const fileReader = new FileReader();
  return new Promise((resolve) => {
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (event) => {
      const {
        currentTarget: { readyState, result },
      } = event;
      if (readyState === fileReader.DONE) {
        resolve(result);
        fileReader.abort();
      }
    };
  });
};

const mapFiles = (fileList) =>
  _keys(fileList).map((key) => {
    const file = fileList[key];
    return { id: nanoid(), file };
  });

const mergeFilesWithBase64 = (filesDetail) =>
  filesDetail.map(async (item) => {
    const { file } = item;
    const extension = getExtension(file.name);
    const url = ["jpg", "jpeg", "png", "heic"].includes(extension)
      ? await convertFileToBase64(file)
      : undefined;

    return { ...item, url };
  });

export const UploadFile = ({
  id,
  label,
  accept,
  name,
  multiple,
  validFile,
  setValidFile,
  disabled,
  onChange,
  checkValidFile,
}) => {
  const inputRef = useRef();

  const [imgBeforeCrop, setImgBeforeCrop] = useState([]);
  const [cropVisible, setCropVisible] = useState(false);

  const browseFile = () => {
    inputRef.current && inputRef.current.click();
  };

  const handleDropFile = (event) => {
    event.preventDefault();
    const { dataTransfer } = event;
    const files = dataTransfer.files;
    if (!files) return;

    if (files.length > 1) return;

    handleFiles(files);
  };

  const handleOnchange = (event) => {
    const {
      target: { files },
    } = event;
    handleFiles(files);
    inputRef.current.value = "";
  };

  const handleFiles = async (files) => {
    let lstFiles = mapFiles(files);
    const filesWithBase64 = await Promise.all(mergeFilesWithBase64(lstFiles));
    const newImageBeforeCrop = multiple
      ? [...imgBeforeCrop, ...filesWithBase64]
      : [...filesWithBase64];

    if (checkValidFile) {
      lstFiles = lstFiles.filter((item) => checkValidFile(item.file));
    }
    if (newImageBeforeCrop[0].url) {
      setImgBeforeCrop(newImageBeforeCrop);
      setCropVisible(true);
    }
  };

  const handleDragOverFile = (event) => {
    event.preventDefault();
  };

  const handlRemoveFile = () => {
    if (onChange) {
      onChange(name, undefined);
    }
    setValidFile(undefined);
  };

  const handleImportTransformImage = (resizer, base64Data) => {
    imgBeforeCrop.map((item) => {
      const transformImage = {
        ...item,
        file: resizer,
        url: base64Data,
      };
      setValidFile(transformImage);
      if (onChange) {
        return onChange(name, [transformImage]);
      }
    });
  };

  return (
    <div
      id={id}
      className={"container-upload"}
      onClick={browseFile}
      onDrop={handleDropFile}
      onDragOver={handleDragOverFile}
    >
      {!validFile && (
        <>
          <div className="element-upload__icon">
            <InstagramOutlined style={{ fontSize: "40px" }} />
          </div>
          <div className="element-upload__label">{label}</div>
        </>
      )}

      {!cropVisible ? (
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: "none", visibility: "hidden" }}
          onChange={handleOnchange}
          disabled={disabled}
        />
      ) : (
        <CropImage
          isVisibleConfirm={cropVisible}
          setIsVisibleCancelConfirm={setCropVisible}
          currentCropImage={imgBeforeCrop}
          handleUpdateCropImage={handleImportTransformImage}
        />
      )}

      <div>
        {validFile && (
          <FileDetail
            key={validFile.id}
            fileDetail={validFile}
            reUploadFile={browseFile}
            handlRemoveFile={handlRemoveFile}
          />
        )}
      </div>
    </div>
  );
};

export default UploadFile;

const FileDetail = (props) => {
  const { fileDetail } = props;

  return (
    <div
      className="conatiner-fileDetail"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="fileDetail">
        <div className="wrapperThumbnail">
          <Image src={fileDetail.url} />
        </div>
      </div>
    </div>
  );
};
