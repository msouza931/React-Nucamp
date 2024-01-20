import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, selectCurrentUser } from './userSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Button
} from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import defaultAvatar from '../../app/assets/img/unicorn.png';
//import validateUserLoginForm from '../../utils/validateUserLoginForm';
import { ErrorMessage } from 'formik';



const UserLoginForm = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
  
    const handleLogin = (values) => {
      const newUser = {
        id: Date.now(),
        avatar: defaultAvatar,
        username: values.username,
        password: values.password,
      };
  
      dispatch(setCurrentUser(newUser));
      setLoginModalOpen(false);
    };
  
    return (
      <>
        <span className='navbar-text ml-auto'>
          {currentUser ? (
            <div style={{ width: '4rem', height: '4rem' }}>
              <img
                src={currentUser.avatar}
                alt={'user'}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          ) : (
            <Button
              outline
              onClick={() => setLoginModalOpen(true)}
              style={{ color: 'white', border: '1px solid white' }}
            >
              <i className='fa fa-sign-in fa-lg' /> Login
            </Button>
          )}
        </span>
        <Modal isOpen={loginModalOpen}>
          <ModalHeader toggle={() => setLoginModalOpen(false)}>Login</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={handleLogin}
              validate={(values) => {
                const errors = {};
                if (!values.username) {
                  errors.username = 'Required';
                } else if (values.username.length < 6 || values.username.length > 15) {
                  errors.username = 'Username must be between 6 and 15 characters';
                }
                if (!values.password) {
                  errors.password = 'Required';
                } else if (values.password.length < 8) {
                  errors.password = 'Password must be at least 8 characters';
                }
                return errors;
              }}
            >
              <Form>
                <FormGroup>
                  <Label htmlFor='username'>Username</Label>
                  <Field
                    id='username'
                    name='username'
                    placeholder='Username'
                    className='form-control'
                  />
                  <ErrorMessage name='username' component='div' />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='password'>Password</Label>
                  <Field
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Password'
                    className='form-control'
                  />
                  <ErrorMessage name='password' component='div' />
                </FormGroup>
                <Button type='submit' color='primary'>
                  Login
                </Button>
              </Form>
            </Formik>
          </ModalBody>
        </Modal>
      </>
    );
  };
  
  export default UserLoginForm;