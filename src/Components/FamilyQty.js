import React from "react";

function FamilyQty(props) {
  if (props.familyMembers === true) {
    return (
      <input
        type="number"
        min="1"
        size="3"
        value={props.familyQty}
        onChange={
          (e) => props.setFamilyQty(e.target.value)
          // props.setFormValues({
          //   ...props.formValues,
          //   familyQty: e.target.value,
          // })
        }
      />
    );
  }
  return;
}

export default FamilyQty;
