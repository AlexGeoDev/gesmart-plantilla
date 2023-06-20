import Icon from '@mui/material/Icon';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

function TodoSidebarHeader() {

  return (
    <div className="flex flex-col justify-center h-full p-24" style={{ backgroundColor: '#57998f' }}>
      <div className="flex items-center justify-around flex-1">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          folder
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-16 md:text-24 font-semibold"
        >
          Proyectos
        </Typography>
      </div>
    </div>
  );
}

export default TodoSidebarHeader;
