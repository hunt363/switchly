import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return(
    <div className='bg-cat-crust text-cat-lavender text-base text-center py-5 absolute bottom-0 w-screen'>
        Copyright &#169; Switchly | Kinchit Kumar | 2024
    </div>
  )
};

export default Footer;
