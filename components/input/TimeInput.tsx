import { View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import DatePicker from "react-native-date-picker";

const TimeInput = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <DatePicker
      modal
      open={open}
      date={date}
      onConfirm={(date) => {
        setOpen(false);
        setDate(date);
      }}
      onCancel={() => {
        setOpen(false);
      }}
    />
  );
};

export default TimeInput;
