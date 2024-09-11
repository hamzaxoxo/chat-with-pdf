import React from "react";

interface ToggleCheckboxProps {
    isChecked: boolean;
    handleToggle: () => void;
    disabled?: boolean;
}

const ToggleCheckbox: React.FC<ToggleCheckboxProps> = ({
    isChecked,
    handleToggle,
    disabled
}) => {
    return (
        <label htmlFor="toggleDescription">
            <input type="checkbox" id="toggleDescription"
                checked={isChecked} disabled={disabled}
                onChange={handleToggle} />
            Show Description
        </label>
    );
};

export default ToggleCheckbox;
