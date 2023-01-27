import "./AccordionItem.scss";
import { useEffect, useState, useRef } from "react";

const AccordionItem = ({ open, children, title }) => {
  const [isOpen, setIsOpen] = useState(open);
  const ref = useRef(null);

  const [height, setHeight] = useState(open ? undefined : 0);
  const handleOpening = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined;
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);
  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);

  return (
    <>
      <div className="accordion">
        <div className="accordion__con1">
          <div className="accordion__header">
            <div className="accordion__pl-cover">TEXT</div>
            <div className="accordion__header-wrapper">
              <div className="accordion__title">{title}</div>
              <button className="accordion__btn" onClick={handleOpening}>
                {!isOpen ? "close" : "open"}
              </button>
            </div>
          </div>
        </div>
        <div className="accordion__con2">
          <div className="my-collapse" style={{ height }}>
            <div ref={ref}>
              <div className="accordion__saved-pl-c">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccordionItem;
