import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage, AmplifyS3Image } from "aws-amplify";
import Image from "./image";
import {
  Button,
  Flex,
  Heading,
  View, Table, TableHead, TableRow, TableCell,
  withAuthenticator,
} from "@aws-amplify/ui-react";

const App = ({ signOut }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    Storage.configure({
      customPrefix: {
          public: 'pictures/',
          protected: 'pictures/',
          private: 'pictures/'
      },
    })

    Storage.list('tony2022').then(files => {
      setFiles(files);    
 
    files.map((file) => (console.log(file)))
    console.log("sldkfjdsjfkjlk");
   }).catch(err => {
    console.log(err);
   })
  }, []);

  const Icon = ({fileName, file}) => { 
    const [image, setImage] = useState(null);

    console.log(fileName + '........' + file.key)

    Storage.get(fileName).then(resp => {
         setImage(resp);
      }).catch(err => {console.log(err);})

    return (
          <Image rounded='true' thumbnail='true' src={image} zoom={true} 
            alt={fileName} title={fileName} width='12%' />
    );
}


  return (
    <View className="App">
      <Table highlightOnHover={false}>
        <TableHead>
          <TableRow>
            <TableCell><Heading level={3} color='red'>Love Album</Heading></TableCell>
            <TableCell align="right"><Button align='right' onClick={signOut}>Sign Out</Button></TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <br></br>
      {/* <View margin="3rem 0"> */}
        <Flex
            key="main"
            direction="flex-start"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="flex-start"
            wrap="wrap"
          >        
          {files.map((file) => (
            <Icon key={file.key} width='40' fileName={file.key} file={file} ></Icon>
          ))}
        </Flex>
      </View>
  );

}

export default withAuthenticator(App);