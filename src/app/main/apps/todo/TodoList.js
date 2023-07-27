import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTodos } from './store/todosSlice';
import TodoListItem from './TodoListItem';
import { Stack } from '@mui/material';

function TodoList(props) {
  const todos = useSelector(selectTodos);
  const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
  const orderBy = useSelector(({ todoApp }) => todoApp.todos.orderBy);
  const orderDescending = useSelector(({ todoApp }) => todoApp.todos.orderDescending);
  const [filteredData, setFilteredData] = useState(null);

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };


  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return entities;
      }
      return FuseUtils.filterArrayByString(entities, _searchText);
    }

    if (todos) {
      setFilteredData(
        _.orderBy(
          getFilteredArray(todos, searchText),
          [orderBy],
          [orderDescending ? 'desc' : 'asc']
        )
      );
    }
  }, [todos, searchText, orderBy, orderDescending]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          ¡No se han creado proyectos!
        </Typography>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
      style={{ overflowX: 'auto' }}
    >
      <List className="p-0 w-full border-1 pt-8" sx={{ borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Stack direction={'row'} width={800} ml={5} className="flex p-4 rounded-t-lg font-semibold" sx={{ fontSize: '110%' }}>
          <div className="flex flex-1 w-300 justify-start ">Título</div>
          <div className="flex flex-1 w-150 justify-center">Ámbito / Ubicación</div>
          <div className="flex flex-1 w-150 justify-center">Fecha de Creación</div>
          <div className="flex flex-1 w-200 justify-start ">Notas</div>
        </Stack>

        {filteredData.map((todo) => (
          <motion.div
            key={todo.id}
            variants={item}
            className="flex items-center border-b border-gray-200 p-4"
          >
            <TodoListItem todo={todo} />
          </motion.div>
        ))}
      </List>
    </motion.div>
  );
}

export default TodoList;
