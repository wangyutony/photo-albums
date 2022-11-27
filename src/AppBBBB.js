import React from "react";
import { Amplify } from "aws-amplify";
import {withAuthenticator} from "@aws-amplify/ui-react";
import { AmplifyS3Album } from '@aws-amplify/ui-react/legacy';
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const App = () => {
  return <AmplifyS3Album path="/pictures" />;
};

export default withAuthenticator(App);