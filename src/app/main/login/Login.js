import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import { motion } from 'framer-motion';
import { useState } from 'react';
import JWTLoginTab from './tabs/JWTLoginTab';

const Root = styled('div')(({ theme }) => ({
  background: '#06332c'
}));

function Login() {
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className="Login-leftSection flex flex-col w-full max-w items-center justify-center shadow-0 "
          square
        >
          <CardContent className="flex flex-col items-center justify-center py-96">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img 
                  className="flex flex-1 logo-icon" 
                  src="assets/images/logos/Urbaser-txtColor.png" 
                  alt="logo" 
                />
              </div>
            </motion.div>

            {selectedTab === 0 && <JWTLoginTab />}
            {/* {selectedTab === 1 && <FirebaseLoginTab />}
            {selectedTab === 2 && <Auth0LoginTab />} */}
          </CardContent>
        </Card>
      </motion.div>
    </Root>
  );
}

export default Login;
