import React, { useReducer } from "react";
import { View } from "react-native";
import AppTextField from "../component/AppTextField";

export const NXTForm = (props) => {
  const [state, dispatch] = useReducer(reducer, {});
  const inputReference = Array(props.formFields.length);
  var index;
  for (index = 0; index < props.formFields.length; index++) {
    inputReference[index] = React.createRef()
  }

  const validForm = hasValidateForm(props.formFields, state);

  const form = { fields: state, isValid: validForm };
  props.onUpdate(form);
  return (
    <View style={props.style}>
      {Inputs(props.formFields, inputReference, dispatch)}
    </View>
  );
};

const Inputs = (data, inputReference, dispatch) => {
  var inputFields = [];
  data.map((field, index) => {
    inputFields.push(
      <AppTextField
        key={field.id}
        ref={inputReference[index]}
        inputType={field.fieldType}
        placeholder={field.placeholder}
        onChangeText={(text, isValid) => {
          const payload = {
            value: text,
            isValid: isValid,
          };
          dispatch({ type: field.id, payload: payload });
        }}
        onSubmitEditing={() => {
          data.length - 1 != index
            ? inputReference[index + 1].current.focus()
            : null;

        }}
        returnKeyType={data.length - 1 == index ? "done" : "next"}
      />
    );
  });

  return inputFields;
};

const reducer = (state, action) => {
  return {
    ...state,
    [action.type]: {
      value: action.payload.value,
      isValid: action.payload.isValid,
    },
  };
};

const hasValidateForm = (formFields, state) => {
  const value = formFields.every(function (field) {
    const fieldFromState = state[field.id];
    if (fieldFromState != null) {
      if (field.validationRequired) {
        return fieldFromState.isValid;
      }
    } else {
      return false;
    }
  });
  if (value == false) {
    return false;
  } else {
    return true;
  }
};
