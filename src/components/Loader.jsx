import React from "react";

const loaderIcon =
  "https://static.pixicook.com/images/upload/cooking/webp/Ellipse+1068.webp";

const Loader = (props) => {
  return (
    <div
      className="flex h-full w-full animate-spin items-center justify-center"
      style={props?.wrapperStyles}
    >
      <div
        className="h-[19px] w-[18px] bg-custom-grey"
        style={{
          mask: `url(${loaderIcon}) no-repeat center / contain`,
          WebkitMask: `url(${loaderIcon}) no-repeat center / contain`,
          ...props?.imageStyles,
        }}
      />
    </div>
  );
};

export default Loader;
``;
