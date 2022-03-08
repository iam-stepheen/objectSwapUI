import { Text, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
const axios = require('axios').default;

const Form = () => {
  let [value, setValue] = React.useState('');
  let [loading, setLoading] = React.useState(false);
  let [isModalOpen, setModal] = React.useState(false);
  let [respMessage, setRespMessage] = React.useState('');

  const submitHandler = async () => {
    let formatedObject = null;
    try {
      formatedObject = JSON.parse(value);
    } catch (e) {
      formatedObject = false;
    }
    if (formatedObject === false || formatedObject === null) {
      toast.error('Please enter a valid object', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setLoading(true);
      axios
        .post('https://object-swap.herokuapp.com/api/v1/swapObject', {
          object: formatedObject,
        })
        .then(function (response) {
          setLoading(false);
          setModal(true);
          setRespMessage(`${JSON.stringify(response.data.data)}`);
        })
        .catch(function (error) {
          setLoading(false);
          toast.error(`${error.response.data.message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };
  return (
    <Box
      mx="auto"
      width={700}
      borderRadius={20}
      padding={20}
      backgroundColor="#1d1f25"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="30px"
    >
      <ToastContainer />
      <Text textAlign="center" color="#ffff" mb="8px">
        Enter your Object
      </Text>
      <CodeEditor
        value={value}
        language="js"
        placeholder="Please enter a valid javascript object"
        onChange={evn => setValue(evn.target.value)}
        padding={15}
        style={{
          height: '400px',
          border: '1px solid #fff',
          'caret-color': '#fff',
          color: '#fff',
          fontSize: 12,
          backgroundColor: '#1d1f25',
          borderRadius: '20px',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />

      <Button
        isLoading={loading}
        loadingText="Submitting"
        colorScheme="teal"
        variant="outline"
        onClick={submitHandler}
        alignSelf="center"
      >
        Submit
      </Button>
      <Modal isOpen={isModalOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Your Result</ModalHeader>

          <ModalBody>
            <CodeEditor
              value={respMessage}
              language="js"
              disabled={true}
              padding={15}
              style={{
                height: '400px',
                border: '1px solid #fff',
                'caret-color': '#fff',
                color: '#fff',
                fontSize: 12,
                backgroundColor: '#1d1f25',
                borderRadius: '20px',
                fontFamily:
                  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={e => setModal(false)}
              colorScheme="teal"
              variant="outline"
              alignSelf="center"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Form;
