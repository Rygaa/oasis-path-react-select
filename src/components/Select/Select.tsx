import React from "react";
import ReactDOM from "react-dom";
import useOpenDropdown from "./useOpenDropdown";

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  tags: React.ReactElement;
  overrideArrow?: React.ReactElement;
  placeholder?: string;
  containerStyle?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
}

const Arrow = () => (
  <div
    style={{
      rotate: "90deg",
      color: "black",
    }}
  >
    &#10132;
  </div>
);

const Select: React.FC<SelectProps> = ({
  tags,
  children,
  placeholder,
  overrideArrow,
  containerStyle,
  dropdownStyle,
}) => {
  const { isOpen, dropdownRef, toggleRef, dropdownHookStyle, toggleDropdown } = useOpenDropdown();

  const [unifiedChildren, setUnifiedChildren] = React.useState<React.ReactElement[]>(
    React.Children.toArray(children) as React.ReactElement[]
  );

  React.useEffect(() => {
    setUnifiedChildren(React.Children.toArray(children) as React.ReactElement[]);
  }, [children]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        width: "10rem",
        height: "3rem",
        padding: "0rem 1rem",
        margin: 0,
        borderRadius: 2.5,
        border: "1px solid black",
        ...containerStyle,
      }}
      ref={toggleRef}
      onClick={toggleDropdown}
    >
      {tags}
      {tags.props.children.length === 0 && <span style={{ color: "black" }}>{placeholder}</span>}
      {!overrideArrow && <Arrow />}
      {isOpen
        ? ReactDOM.createPortal(
            <div ref={dropdownRef} style={{ ...dropdownHookStyle, ...dropdownStyle }}>
              {unifiedChildren}
            </div>,
            document.documentElement as HTMLElement
          )
        : null}
    </div>
  );
};

export default Select;
