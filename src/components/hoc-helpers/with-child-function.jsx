import React from 'react';

//композиция функции (hoc)
const withChildFunction = (fn) =>(Wrapped)=> {
    return (props) => {
      return (
        <Wrapped {...props}>
          {fn}
        </Wrapped>
      )
    };
  };

  export default withChildFunction;