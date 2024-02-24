import React from "react";

interface SelectOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  handleOptionClick: (option: any) => void;
  children?: React.ReactNode;
  isSelected: boolean;
  option: any;
  isCheckboxDisplayed?: boolean;
  containerStyle?: React.CSSProperties;
}

const Box = ({ isSelected }: { isSelected: true }) => (
  <div
    style={{
      minWidth: "20px",
      minHeight: "20px",
      width: "20px",
      height: "20px",
      border: "1px solid black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "2.5px",
    }}
  >
    {isSelected && <div>&#10003;</div>}
  </div>
);

const SelectOption: React.FC<SelectOptionProps> = ({
  isSelected,
  isCheckboxDisplayed = false,
  handleOptionClick,
  option,
  children,
  containerStyle,
}: any) => {
  return (
    <div
      style={{
        color: "black",
        display: "flex",
        width: "100%",
        columnGap: "0.5rem",
        flex: 1,
        padding: "0.5rem",
        cursor: "pointer",
        ...containerStyle,
      }}
      onClick={(event) => {
        event.stopPropagation();
        handleOptionClick(option);
      }}
    >
      {isCheckboxDisplayed && <Box isSelected={isSelected} />}
      <div>{children}</div>
    </div>
  );
};

export default SelectOption;
