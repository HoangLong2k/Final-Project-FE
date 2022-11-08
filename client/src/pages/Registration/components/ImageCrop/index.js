import React, { useState, useEffect, useCallback } from "react";
import { Modal, Row, Col, Slider, Button } from "antd";

import Cropper from "react-easy-crop";
import Resizer from "react-image-file-resizer";

import "./styles.less";
import _ from "lodash";

const STRACK_STYLE = {
  background: "#d31145",
  borderRadius: "12px",
  height: "8px",
};

const HANDLE_STYLE = {
  border: "solid 4px #D31145",
  marginTop: "-5px",
  top: "6px",
};
const CROP_SIZE = { width: 320, height: 180 };
const DEFAULT_ZOOM_VALUE = 1;

const IMAGE_COMPRESS = {
  MAX_WIDTH: 1500,
  MAX_HEIGHT: 1500,
  TYPE: "JPEG",
  QUALITY: 50,
  ROTATION: 0,
  OUTPUT_TYPE: "file",
  MIN_WIDTH: 0,
  MIN_HEIGHT: 0,
};

const CropImage = ({
  isVisibleConfirm,
  setIsVisibleCancelConfirm,
  currentCropImage,
  handleUpdateCropImage,
}) => {
  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(DEFAULT_ZOOM_VALUE);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();
  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  useEffect(() => {
    currentCropImage.map((item) => {
      setUpImg(item.url);
    });
  }, [currentCropImage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRotation(0);
    }, 150);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fileChangedHandler = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        IMAGE_COMPRESS.MAX_WIDTH,
        IMAGE_COMPRESS.MAX_HEIGHT,
        IMAGE_COMPRESS.TYPE,
        IMAGE_COMPRESS.QUALITY,
        IMAGE_COMPRESS.ROTATION,
        (uri) => {
          resolve(uri);
        },
        IMAGE_COMPRESS.OUTPUT_TYPE,
        IMAGE_COMPRESS.MIN_WIDTH,
        IMAGE_COMPRESS.MIN_HEIGHT
      );
    });

  const handleConfirmModal = () => {
    setIsVisibleCancelConfirm(false);
    getFileCrop();
  };

  const convertFileToBase64 = (file) => {
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

  const handleSkipModal = async () => {
    setIsVisibleCancelConfirm(false);
    const resizer = await fileChangedHandler(currentCropImage[0].file);
    const base64Data = await convertFileToBase64(resizer);
    handleUpdateCropImage(resizer, base64Data);
  };

  const getFileCrop = useCallback(async () => {
    if (upImg) {
      const croppedImage = await getCroppedImg(
        upImg,
        croppedAreaPixels,
        rotation,
        __filename
      );
      const file = new File([croppedImage], __filename);
      const resizer = await fileChangedHandler(file);
      const base64Data = await convertFileToBase64(resizer);
      handleUpdateCropImage(resizer, base64Data);
      setRotation(0);
      setZoom(DEFAULT_ZOOM_VALUE);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <Modal
      destroyOnClose
      open={isVisibleConfirm}
      width="623px"
      centered
      footer={null}
      onCancel={() => {
        setIsVisibleCancelConfirm(false);
      }}
    >
      <div className="modal-container-crop">
        <Col>
          <div className="title-modal">
            {/* {t('verify.account.upload.crop.title.modal', '')} */}
            {"Crop Image"}
          </div>
          <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
            <Col span={22} offset={1} style={{ height: "300px" }}>
              <Cropper
                image={upImg}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                rotation={rotation}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropSize={CROP_SIZE}
                objectFit="contain"
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }}>
            <Col span={20} offset={2}>
              <div className="modal-controls">
                <div className="control_item">
                  <span className="control_item__label">
                    {/* {t('verify.account.upload.crop.title.zoom', '')} */}
                    {"Zoom"}
                  </span>
                  <Slider
                    open={false}
                    value={zoom}
                    min={DEFAULT_ZOOM_VALUE}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={setZoom}
                    trackStyle={STRACK_STYLE}
                    handleStyle={HANDLE_STYLE}
                  />
                </div>
                <div className="control_item">
                  <span className="control_item__label">
                    {/* {t('verify.account.upload.crop.title.rotate', '')} */}
                    {"Rotate"}
                  </span>
                  <Slider
                    open={false}
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    trackStyle={STRACK_STYLE}
                    handleStyle={HANDLE_STYLE}
                    onChange={setRotation}
                  />
                </div>
              </div>
              <div className="modal-btn">
                <Button
                  type="primary"
                  className="btn-confirm"
                  onClick={handleConfirmModal}
                  name="btn-continue"
                >
                  {/* {t('verify.account.upload.crop.btn.confirm', '')} */}
                  {"Confirm"}
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </div>
    </Modal>
  );
};

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}
async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, "image/jpeg");
  });
}

export default CropImage;
