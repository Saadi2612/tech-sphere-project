import React, { useState } from "react";

const AccordionItem = ({
  index,
  title,
  content,
  isExpanded,
  toggleAccordion,
}) => {
  return (
    <div
      className="group flex flex-col gap-2 rounded-lg bg-violet-50 p-5 text-violet-900"
      tabIndex="1"
    >
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => toggleAccordion(index)}
      >
        <span>{title}</span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
          className={`h-2 w-3 transition-all duration-500 ${
            isExpanded ? "rotate-180" : ""
          }`}
          alt="Chevron Icon"
        />
      </div>
      <div
        className={`invisible h-auto max-h-0 items-center opacity-0 transition-all ${
          isExpanded ? "visible max-h-screen opacity-100 duration-1000" : ""
        }`}
      >
        <div className="py-1">
          <p className="font-semibold text-gray-600 tracking-tight">
            Total amount
          </p>
          <p className="text-gray-800">{content.SellerName}</p>
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  //   console.log(data);
  //   const products = data;
  //   console.log(products);
  const toggleAccordion = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.name}
          content={item}
          isExpanded={index === expandedIndex}
          toggleAccordion={toggleAccordion}
        />
      ))}
    </div>
  );
};

export default Accordion;
