import "./AccordionItem.scss";
import { useState } from "react";

const Accordion = ({ open, children, title }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleOpening = () => {
    setIsOpen((prev) => !prev);
  };
  // console.log(children);

  return (
    <>
      <div className="accordion">
        <div className="accordion__con1">
          <div className="accordion__header">
            <div className="accordion__title">{title}</div>
            <button className="accordion__btn" onClick={handleOpening}>
              {!isOpen ? "close" : "open"}
            </button>
          </div>
        </div>
        <div className="accordion__con2">
          <div className="accordion__saved-pl">
            {isOpen && <div className="accordion__saved-pl-c">{children}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
