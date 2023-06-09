import _ from '@lodash';
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

function TodoListItem(props) {
  const dispatch = useDispatch();
  const usuarios = useSelector(selectLabelsEntities);

  return (
    <StyledListItem
      className="py-20 px-0 sm:px-8"
      completed={props.todo.completed ? 1 : 0}
      onClick={(ev) => {
        ev.preventDefault();
        dispatch(openEditTodoDialog(props.todo));
      }}
      dense
      button
    >
      <IconButton
        tabIndex={-1}
        disableRipple
        onClick={(ev) => {
          ev.stopPropagation();
          dispatch(
            updateTodo({
              ...props.todo,
              completed: !props.todo.completed,
            })
          );
        }}
        size="large"
      >
        {props.todo.completed ? (
          <Icon color="action">radio_button_unchecked</Icon>
        ) : (
          <Icon color="secondary">check_circle</Icon>
        )}
      </IconButton>

      <div className="flex flex-1 relative overflow-hidden justify-around">
        <Typography
          className="todo-title truncate text-14 font-medium"
          color={props.todo.completed ? 'textSecondary' : 'inherit'}
        >
          {props.todo.title}
        </Typography>

        <Typography variant="body1" color="initial">
          {props.todo.label}
        </Typography>

        <Typography variant="body1" color="initial">
          {props.todo.description}
        </Typography>

        <Typography variant="body1" color="initial">
          {new Date(props.todo.startDate).toLocaleDateString()}
        </Typography>

        <Typography color="textSecondary" className="todo-notes truncate">
          {_.truncate(props.todo.notes.replace(/<(?:.|\n)*?>/gm, ''), { length: 180 })}
        </Typography>

        <Typography variant="body1" color="initial">
          {props.todo.users}
          {/* {props.todo.users.map((user) => (
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
