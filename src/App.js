import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage, AmplifyS3Image } from "aws-amplify";
import Image from "./image";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
// import { listAlbums } from "./graphql/queries";
import {
  createAlbum as createAlbumMutation,
  deleteAlbum as deleteAlbumMutation,
} from "./graphql/mutations";
import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";

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
  }, [image]);

  const showImg = (file) => {
    Storage.get(file).then(resp => {
      console.log(resp);
      setImage(resp);
    }).catch(err => {console.log(err);})
  }

  function showText(text){
    document.getElementById("text").innerHTML=text;
  }
  function hide(){
    document.getElementById("text").innerHTML="";
  }

  const Icon = ({fileName}) => { 
    const [image, setImage] = useState(null);

    Storage.get(fileName).then(resp => {
         setImage(resp);
      }).catch(err => {console.log(err);})

    return (<div>
          <Image rounded thumbnail src={image} zoom={true} alt="skfjkld" width="15%" 
          onClick={() => showImg(fileName)}
        //  onMouseOver={() => showText('Some Text')} 
        //  onMouseOut={() => hide()}
          />
          <p>{fileName}</p>
       </div>
    );
}


  return (
    <View className="App">
      <Heading level={1}>Photo Albums App</Heading>
      {/* <View as="form" margin="3rem 0" onSubmit={createAlbum}>
      <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Album Name"
            label="Album Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="owner"
            placeholder="Owner"
            label="Owner"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Album
          </Button>
        </Flex>
      </View> */}
      <Heading level={2}>Current Albums</Heading>
      <View margin="3rem 0">
        {files.map((file) => (
          <Flex
            key={file.key || file.key}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Text as="strong" fontWeight={700}>
              {key}
            </Text> */}
            {/* <div style={{ width: 400, margin: '0 auto' }}>
              <AmplifyS3Image
                imgKey={file.key}
              />
            </div> */}
            <Icon fileName={file.key} ></Icon>
          </Flex>
        ))}
      </View>
            <Flex justifyContent="center"
            alignItems="center"><Image src={image} width="600"/></Flex>
            <br></br>
            <Flex justifyContent="center"
            alignItems="center"><Button onClick={signOut}>Sign Out</Button></Flex>
  </View>
  );

}

export default withAuthenticator(App);