import React from 'react';
import Image from 'react-bootstrap/Image';

type Props = {
  flag: string;
};

const Flag = ({ flag }: Props) => (
  <div className="flag-wrapper">
    <Image src={flag} />
  </div>
);

export default Flag;
