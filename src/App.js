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
  const [path, setPath] = useState(['Root']);
  const [folders, setFolders] = useState([new Set()]);
//  let folders = new Set();

  useEffect(() => {
    Storage.configure({
      customPrefix: {
          public: 'pictures/',
          protected: 'pictures/',
          private: 'pictures/'
      },
    })

    let pt = '';
    if(path!='Root') pt = path;
    Storage.list(pt).then(files => {
      setFiles(files);    
   }).catch(err => {
    console.log(err);
   })
  }, [path]);

  useEffect(() => {
    let fd = new Set();
    files.map((f) => {
      let fn = String(f.key);
      let folder = fn.substring(0, fn.indexOf('/'))
      fd.add(folder);
    })
    fd.delete(path)
    if(path=='Root') fd.delete('')
    if(path!='Root') fd.add('Root')

    setFolders(fd)
  }, [files]);

  const Icon = ({fileName, file}) => { 
    const [image, setImage] = useState(null);
    let fn = String(fileName)
    if(fn.endsWith('.json')) {
      return null
    }
    // let sub = fn.replace(path + '/', '')
    
    if(path=='Root' && fn.indexOf('/')>0) {
       return null
     }
    //else {

    Storage.get(fileName).then(resp => {
         setImage(resp);
      }).catch(err => {console.log(err);})

    return (
          <Image rounded='true' thumbnail='true' src={image} zoom={true} 
            alt={fileName} title={fileName} width='12%' />
    );
    //}
}

const folderChange = (folder) => { 
    if('Root'==folder) setPath('Root');
    else setPath(folder)
  }

  return (
    <View className="App">
      <Table highlightOnHover={false}>
        <TableHead>
          <TableRow>
            <TableCell><Heading level={3} color='red'>Love Album</Heading></TableCell>
            <TableCell align="right"><Button align='right' onClick={signOut}>Sign Out</Button></TableCell>
          </TableRow>
          <TableRow align='left'>
            <TableCell align='left'><Heading level={9} color='black'>Current folder: {path}</Heading></TableCell>
          </TableRow>
           </TableHead>
      </Table>
      

      {/* <View margin="3rem 0"> */}
        <Flex
            key="folders"
            direction="flex-start"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
          >        
          <Heading level={9} color='black'>Select a folder:</Heading>
          {Array.from(folders).map((folder) => (
            //<Heading level={3}>{folder}</Heading>
            <Button onClick={() => folderChange(folder)}>{folder}</Button>
          ))}
          </Flex>
          <br></br>
          <Flex
            key="pics"
            direction="flex-start"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
          >      
          {files.map((file) => (
            <Icon key={file.key} width='40' fileName={file.key} file={file} ></Icon>
          ))}

        </Flex>
        <br></br>
          
      </View>
  );

}

export default withAuthenticator(App);