import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PlaidLink from "./components/PlaidLink";
import api from "./api/api";
export default class App extends Component {
  state = {
    data: {},
    status: "LOGIN_BUTTON"
  };

  render() {
    console.log("Current webview event: " + this.state.data.action);
    return this.state.data.action &&
      this.state.data.action.indexOf("::connected") !== -1
      ? this.renderDetails()
      : this.renderLogin();
  }

  renderButton = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({ status: "" })}>
          <Text style={styles.paragraph}>Login with Plaid</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderLogin() {
    return (
      <PlaidLink username={"claris"} onMessage={this.onPlaidLinkMessage} />
    );
  }

  renderDetails() {
    if (this.state.data.metadata.public_token) {
      api.exchangePublicToken(this.state.data.metadata.public_token);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Institution</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.institution.name}
        </Text>
        <Text style={styles.paragraph}>Institution ID</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.institution.institution_id}
        </Text>
        <Text style={styles.paragraph}>Token</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.public_token}
        </Text>
      </View>
    );
  }
  onPlaidLinkMessage = response => {
    this.setState({
      data: JSON.parse(response.nativeEvent.data)
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  value: {
    marginBottom: 20,
    textAlign: "center"
  }
});
