import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
// import './App.css';
import app from "./firebase.init";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const auth = getAuth(app);


function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleNameBlur = event => {
    setName(event.target.value);
  }
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = event => {
    setPass(event.target.value);
  }

  const handleRegisteredChange = event => {
    setRegistered(event.target.checked)

  }

  const handleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
      return;
    }
    if (!/(?=.*?[0-9])/.test(pass)) {
      setError('At least one digit');
      return;

    }
    setValidated(true);
    setError('');
    if (registered) {
      signInWithEmailAndPassword(auth, email, pass)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.log(error);
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPass('');
          verifyEmail();
          setUserName();

        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })

    }

    /* ---------------------------------------------------------- */

    event.preventDefault()
  }
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email send')
      })
      .catch()

  }
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log('updating user profile')

      }).catch(error => {
        setError(error.message);
      })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email verification send')
      })
      .catch()

  }

  return (
    <div className="App">
      <div className="reg w-50 mx-auto">
        <h2 className="text-primary mt-5">Please {registered ? 'Login' : 'Register'}</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {/* ---------------------------------------------------------------- */}
          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Name </Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter name" required />
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>}
          {/* ---------------------------------------------------------------- */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          {/* ---------------------------------------------------------------- */}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already registered ?" />
          </Form.Group>
          {/* ---------------------------------------------------------------- */}

          <p className="text-success">{'Successfully Registered !'}</p>
          <p className="text-danger">{error}</p>
          <Button onClick={handlePasswordReset} variant="link">Forget Password ?</Button> <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default App;
