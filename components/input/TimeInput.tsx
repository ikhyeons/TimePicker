import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import DatePicker from "react-native-date-picker";
import { useRequestStore } from "../../store/requestStore";
const TimeInput = (props: { setIsOpen: (value: boolean) => void }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [isDateOpen, setIsDateOpen] = useState(true);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  useEffect(() => {
    if (date != null && time != null) {
      setDeadline(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          time.getHours(),
          time.getMinutes()
        )
      );
    }
  }, [date, time]);

  const setDeadline = useRequestStore((state) => state.setSendRequestDeadline);
  return (
    <View>
      <DatePicker
        title={"년도 월일을 골라 주세요"}
        dividerColor="red"
        modal
        date={date ? date : new Date()}
        open={isDateOpen}
        mode="date"
        onConfirm={(date) => {
          setDate(date);
          setIsTimeOpen(true);
        }}
        onCancel={() => {
          setIsDateOpen(false);
          props.setIsOpen(false);
        }}
      />
      <DatePicker
        title={"시간을 골라 주세요"}
        modal
        date={date ? date : new Date()}
        mode="time"
        open={isTimeOpen}
        onConfirm={(date) => {
          setTime(date);
          setIsTimeOpen(false);
          props.setIsOpen(false);
        }}
        onCancel={() => {
          setIsTimeOpen(false);
          props.setIsOpen(false);
        }}
      />
    </View>
  );
};

export default TimeInput;
