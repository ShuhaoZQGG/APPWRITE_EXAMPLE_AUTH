import React, { FormEvent, useState } from 'react';

function Login(props: any) {
  const [ state, setState ] = useState({
    email: '',
    password: '',
    loading: false,
    error: '',
  })

  async function processSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault() // Prevent default to prevent reloading of page.

    if(!props.currentPage){
      await processLogin(event);
    } else {
      await processRegister(event);
    }
  }


  async function processLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (state.loading) return;

    setState({
      ... state,
      error: '',
      loading: true,
    })

    if (!(state.password.length >= 6 && state.password.length <= 32)) {
      setState ({
        ...state,
        error: 'Error: Password must be between 6 and 32 characters.',
        loading: false
      });

      return;
    }

    await props.loginFunc(state.email, state.password);

    setState({
      ...state,
      loading: false,
    });
  }

  async function processRegister(event: FormEvent<HTMLFormElement>){
    if (state.loading) return; // If loading then return.

    setState({...state, error: '', loading: true }); // Start new request by removing any previous errors and setting loading to true

    // Validation
    if (!(state.password.length >= 6 && state.password.length <= 32)) {
      // If validation incorrect then set error and then set loading to false
      setState({ ...state, error: 'Error: Password must be between 6 and 32 characters.', loading: false });
      return;
    }

    await props.registerFunc(state.email, state.password); // Request Register

    // If success then set loading to false
    setState({ ...state, loading: false });
  }

  const error = state.error || props.error();

  return (
    <div>
      {!props.currentPage ? (<h1>Login</h1>) : (<h1>Register</h1>)}
      {error && (
        <p className='error'>{error}</p>
      )}
      <form onSubmit={(e) => processSubmit(e)}>
        <input onChange={(event) => setState({ ...state, email: event.target.value })} type='email' id='email' required placeholder='Email' />
        <input onChange={(event) => setState({ ...state, password: event.target.value })} type='password' id='password' required placeholder='Password' />
        {!props.currentPage ? (<button disabled={state.loading} type='submit'>Sign In</button>) : <button disabled={state.loading} type='submit'>Register</button>}
      </form>
    </div>
  )
}

export default Login;