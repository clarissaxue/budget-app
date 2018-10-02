import React from "react";
import { WebView } from "react-native";
import plaid from "../plaidAuth";

const PlaidLink = props => {
  return (
    <WebView
      source={{
        uri: `https://cdn.plaid.com/link/v2/stable/link.html?key=${
          plaid.PLAID_PUBLIC_KEY
        }&apiVersion=v2&env=${
          plaid.PLAID_ENV
        }&product=auth,transactions&clientName=${
          props.username
        }&isWebView=true&isMobile=true`
      }}
      onMessage={e => props.onMessage(e)}
    />
  );
};

export default PlaidLink;
