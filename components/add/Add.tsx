import React, { useRef } from "react";
import { Platform, Text } from "react-native";
import styled from "styled-components/native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";

const View = styled.View`
  height: 50px;
  background-color: red;
`;

const Add = () => {
  const bannerRef = useRef<BannerAd>(null);
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";
  return (
    <BannerAd
      ref={bannerRef}
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
  );
};

export default Add;
