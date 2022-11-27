import React, { useState, useEffect } from "react";
import {Storage} from "aws-amplify";
import {
    Flex,
    Heading,
    View, Image,
    withAuthenticator,
  } from "@aws-amplify/ui-react";
import { Button } from "semantic-ui-react";

export const Icon = ({fileName}) => { 
    const [image, setImage] = useState(null);

    Storage.get(fileName).then(resp => {
         setImage(resp);
      }).catch(err => {console.log(err);})

    return (<div>
          <Image rounded thumbnail src={image} width="15%"/>
          <p>{fileName}</p>
       </div>
    );
}
