import React from 'react';
import Placeholder from 'components/Placeholder/Placeholder';

type ErrorPlaceholderProps = {
  onButtonPress: () => void;
};

const ErrorPlaceholder = ({ onButtonPress }: ErrorPlaceholderProps) => (
  <Placeholder
    title="Ooops...!"
    subtitle="Something went wrong. Please try again."
    buttonText="Retry"
    onButtonPress={onButtonPress}
  />
);

export default ErrorPlaceholder;
