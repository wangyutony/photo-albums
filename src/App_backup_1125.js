import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from "aws-amplify";
import Home from "./component/home";
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

const App = ({ signOut }) => {
  // state = { fileUrl: ''}
  // componentDidMount() {
  //   Storage.get('kdfjkd.jpg')
  //   .then(data => {
  //     this.setState()
  //   })
  // }
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function fetchAlbums() {

  const albumQuery = `query MyQuery {
      listAlbums {
        items {
          name
          id
          owner
        }
      }
    }`;
    const apiData = await API.graphql({ query: albumQuery });

    const albumsFromAPI = apiData.data.listAlbums.items;

    setAlbums(albumsFromAPI);
  }

  async function createAlbum(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      owner: form.get("owner"),
    };
    API.graphql({
      query: createAlbumMutation,
      variables: { input: data },
    });

    event.target.reset();
    await fetchAlbums();
  }

  async function deleteAlbum({ id }) {
    const newAlbums = albums.filter((album) => album.id !== id);
    setAlbums(newAlbums);
    await API.graphql({
      query: deleteAlbumMutation,
      variables: { input: { id } },
    });
  }
// <Home></Home> 
  return (
    <View className="App">
      <Heading level={1}>Photo Albums App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createAlbum}>
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
      </View>
      <Heading level={2}>Current Albums</Heading>
      <View margin="3rem 0">
        {albums.map((album) => (
          <Flex
            key={album.id || album.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {album.name}
            </Text>
            <Text as="span">{album.owner}</Text>
            <Button variation="link" onClick={() => deleteAlbum(album)}>
              Delete album
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
        
    </View>

  );
};

export default withAuthenticator(App);