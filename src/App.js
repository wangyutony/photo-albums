import React, { useState, useEffect } from "react";
//import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage, AmplifyS3Image } from "aws-amplify";
import Image from "./image";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View, Table, TableHead, TableRow, TableCell,
  withAuthenticator,
} from "@aws-amplify/ui-react";
// import { listAlbums } from "./graphql/queries";
// import {
//   createAlbum as createAlbumMutation,
//   deleteAlbum as deleteAlbumMutation,
// } from "./graphql/mutations";
// import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";

const App = ({ signOut }) => {
  // state = { fileUrl: ''}
  // componentDidMount() {
  //   Storage.get('kdfjkd.jpg')
  //   .then(data => {
  //     this.setState()
  //   })
  // }
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  //const [map, setMap] = useState(new Map());
 // var listOfObjects = [];

  const [map, setMap ] = useState(new Map());
 // let map = new Map();


  useEffect(() => {


  Storage.configure({
      customPrefix: {
          public: 'pictures/',
          protected: 'pictures/',
          private: 'pictures/'
      },
  })


  Storage.list('').then(files => {
    setFiles(files);    
 
    console.log("sldkfjdsjfkjlk");
   }).catch(err => {
    console.log(err);
   })
  }, []);

  const Icon = ({fileName}) => { 
    const [image, setImage] = useState(null);

    Storage.get(fileName).then(resp => {
         setImage(resp);
      }).catch(err => {console.log(err);})

    return (
          <Image rounded thumbnail src={image} zoom={true} 
            alt={fileName} title={fileName} width='12%' />
    );
}


  return (
    <View className="App">
      <Table highlightOnHover={false}>
        <TableHead>
          <TableRow>
            <TableCell><Heading level={3}>My family</Heading></TableCell>
            <TableCell align="right"><Button align='right' onClick={signOut}>Sign Out</Button></TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <br></br>
            {/* <View margin="3rem 0"> */}
            <Flex
            key="main"
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="flex-start"
          >        {files.map((file) => (

            <Icon fileName={file.key} ></Icon>

        ))}
                  </Flex>
      </View>
  );

}

export default withAuthenticator(App);