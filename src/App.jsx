import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as Sentry from "@sentry/react";

let release='react-sentry@1.0.0';

Sentry.init({
  dsn: "https://f1aa48782e92be2dc3177967ba52a559@o4509020979003392.ingest.de.sentry.io/4509021136420944",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  release:release,
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [ "localhost", /^https:\/\/yourserver\.io\/api/ ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
 class ValidationError extends Error{
  constructor(message){
    super(message)//
    this.name=`Error: "${message}" from ${release}`;
  }
 }

function App() {
  const [count, setCount] = useState(0)
 function handleClick(message){
  throw new ValidationError(message);
 }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() =>{
         setCount((count) => count + 1)
         handleClick("houston we have an error")
         }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default  Sentry.withProfiler(App);
