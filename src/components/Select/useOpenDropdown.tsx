import React from "react";

const useOpenDropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownHookStyle, setDropdownHookStyle] = React.useState({});
  const dropdownRef = React.useRef(null) as any;
  const toggleRef = React.useRef(null) as any;

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target) &&
        toggleRef.current &&
        !(toggleRef.current as HTMLElement).contains(event.target)
      ) {
        setIsOpen(() => false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);

    if (!isOpen && toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const maxHeight = spaceBelow < 100 ? rect.top - 100 : spaceBelow - 100;

      setDropdownHookStyle({
        top: spaceBelow < 100 ? "auto" : rect.bottom + window.scrollY,
        bottom: spaceBelow < 100 ? window.innerHeight - rect.top + window.scrollY : "auto",
        left: rect.left + window.scrollX,
        maxHeight: maxHeight,
        width: rect.width,
        position: "fixed",
        backgroundColor: "rgba(230, 230, 230)",
      });
    }
  };

  return { isOpen, dropdownRef, toggleRef, dropdownHookStyle, toggleDropdown };
};

export default useOpenDropdown;
