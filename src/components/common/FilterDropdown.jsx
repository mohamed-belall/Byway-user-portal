import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { useAtom } from "jotai";
import { CourseFiltersAtom } from "../../atoms/CourseAtom";

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("The Latest");
  const [courseFilter, setCourseFilter] = useAtom(CourseFiltersAtom);

  const options = ["TheLatest", "TheOldest", "LowestPrice", "HighesPrice"];

  const handelSortBy = () => {
    setCourseFilter((prev) => ({ ...prev, Sort: selected }));
  };

  useEffect(() => {
    handelSortBy();
  }, [selected]);

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg font-medium hover:bg-gray-100"
      >
        <span>{selected}</span>
        <FaChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
