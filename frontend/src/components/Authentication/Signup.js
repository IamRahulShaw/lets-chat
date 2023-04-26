import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import axios from "axios";
import { validate } from "react-email-validator";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../context/chatprovider";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  // const [pic, setPic] = useState();
  const [picfile, setPicFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const postDetails = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Upload an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/jpg"
    ) {
      toast({
        title: "Only jpeg, jpg and png formats are supported",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    setPicFile(pic);
    setPreview(URL.createObjectURL(pic));
  };

  const sumbitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the details",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Password and Confirm Password does not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (!validate(email)) {
      toast({
        title: "Please enter a valid email",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    let uploadpic;
    if (
      picfile &&
      (picfile.type === "image/jpg" ||
        picfile.type === "image/jpeg" ||
        picfile.type === "image/png")
    ) {
      const formdata = new FormData();
      formdata.append("file", picfile);
      formdata.append("upload_preset", "lets-chat");
      formdata.append("cloud_name", "rahulshaw");
      try {
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/rahulshaw/image/upload",
          formdata
        );
        uploadpic = data.secure_url;
        // setPic(data.secure_url);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Can't upload the image",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        // console.log(error);
      }
    }
    try {
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic: uploadpic },
        { headers: { "Content-Type": "application/json" } }
      );
      toast({
        title: "Registration successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your password"
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement
            maxW="10rem"
            minW="9rem"
            justifyContent="space-around"
          >
            <Box>
              <PasswordStrengthBar password={password} />
            </Box>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Confirm your password"
            type={show ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement
            maxW="10rem"
            minW="9rem"
            justifyContent="space-around"
          >
            <Box>
              <PasswordStrengthBar password={confirmpassword} />
            </Box>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          accept=".png, .jpeg, .jpg"
          p={1.5}
          lineHeight="normal"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      {preview && <Image boxSize="xs" src={preview} alt="Preview" />}
      <Box w="100%">
        <Button
          w="100%"
          colorScheme="blue"
          marginTop="10px"
          isLoading={loading}
          onClick={sumbitHandler}
        >
          Signup
        </Button>
      </Box>
    </VStack>
  );
};

export default Signup;
