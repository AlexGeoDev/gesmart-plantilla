import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectLabelsEntities } from './store/labelsSlice';
import { updateTodo, openEditTodoDialog } from './store/todosSlice';
import TodoChip from './TodoChip';

const StyledListItem = styled(ListItem)(({ theme, completed }) => ({
  ...(completed && {
    background: 'rgba(0,0,0,0.03)',
    '& .todo-title, & .todo-notes': {
      textDecoration: 'line-through',
    },
  }),
}));

function TodoListItem({ todo }) {
  const dispatch = useDispatch();
  const usuarios = useSelector(selectLabelsEntities);

  const handleEditTodo = (ev) => {
    ev.preventDefault();
    dispatch(openEditTodoDialog(todo));
  };

  const handleToggleActive = (ev) => {
    ev.stopPropagation();
    dispatch(updateTodo({
      ...todo,
      active: !todo.active,
    }));
  };

  const titleTypographyProps = {
    minWidth: 300,
    justifyContent: 'flex-start',
    className: 'todo-title truncate text-14 font-medium',
    color: todo.completed ? 'textSecondary' : 'inherit',
  };

  const locationTypographyProps = {
    variant: 'body1',
    color: 'initial',
    minWidth: 150,
    justifyContent: 'flex-start',
  };

  const startDateTypographyProps = {
    variant: 'body1',
    color: 'initial',
    minWidth: 150,
    justifyContent: 'flex-start',
  };

  const descriptionTypographyProps = {
    variant: 'body1',
    color: 'initial',
    minWidth: 200,
    justifyContent: 'flex-start',
  };

  return (
    <StyledListItem
      className="py-20 px-0 sm:px-8 border-red border-1"
      completed={todo.completed ? 1 : 0}
      onClick={handleEditTodo}
      dense
      button
    >
      <IconButton
        tabIndex={-1}
        disableRipple
        onClick={handleToggleActive}
        size="large"
      >
        {todo.active ? (
          <Icon color="action">radio_button_unchecked</Icon>
        ) : (
          <Icon color="secondary">check_circle</Icon>
        )}
      </IconButton>

      <div className="flex relative overflow-hidden justify-around">
        <Typography {...titleTypographyProps}>
          {todo.name}
        </Typography>

        <Typography {...locationTypographyProps}>
          {todo.location}
        </Typography>

        <Typography {...startDateTypographyProps}>
          {new Date(todo.startDate).toLocaleDateString()}
        </Typography>

        {/* <Typography {...labelTypographyProps}>
          {todo.label}
        </Typography> */}

        <Typography {...descriptionTypographyProps}>
          {todo.description}
        </Typography>

        {/* <Typography color="textSecondary" className="todo-notes truncate">
          {_.truncate(todo.notes.replace(/<(?:.|\n)*?>/gm, ''), { length: 180 })}
        </Typography> */}

        <Typography variant="body1" color="initial">
          {todo.users}
          {/* {todo.users.map((user) => (
            <TodoChip 
            name={users[user].name}
            key={user}
            />
          ))} */}
        </Typography>
      </div>
    </StyledListItem>
  );
}

export default TodoListItem;
