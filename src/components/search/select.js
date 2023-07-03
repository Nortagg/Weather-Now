import "./select.styles.scss";
import { FiChevronDown } from "react-icons/fi";
import * as Select from "@radix-ui/react-select";

const SelectBar = ({
  handleSelectChange,
  selectedSelectItem,
  classNameSelection,
  classNameContent,
}) => {
  const selectItems = [
    { name: "Aleksinac", value: "Aleksinac" },
    { name: "Nis", value: "Nis Rs" },
    { name: "Belgrade", value: "Belgrade" },
    { name: "Novi Sad", value: "Novi Sad" },
    { name: "Subotica", value: "Subotica" },
  ];

  return (
    <Select.Root value={selectedSelectItem} onValueChange={handleSelectChange}>
      <Select.Trigger className={classNameSelection}>
        {selectedSelectItem ? selectedSelectItem : "Quick RS search"}
        <Select.Icon className="select-icon">
          <FiChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className={classNameContent}>
        <Select.Group>
          <Select.Label className="city-label-select">Serbia</Select.Label>
          {selectItems.map((item, index) => {
            return (
              <Select.Item
                key={index}
                className="select-item"
                value={item.value}
              >
                {item.name}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectBar;
