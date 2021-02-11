import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)({
  background: 'linear-gradient(67deg, #0bd480d4 30%, #14c5b5 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function ComonSubmit(props) {

  return <StyledButton
    type={props.type}
    fullwidth={props.fullwidth}
    variant={props.variant}
    className={props.className}
  >
    {props.children}
  </StyledButton>;
}