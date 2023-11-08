import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';

import Link from 'next/link';
import { ContextProvider } from './contexts/ContextProvider';

export default function Home (){
  
ReactDOM.render(
<ContextProvider><App />, document.getElementById('root')</ContextProvider> ) }