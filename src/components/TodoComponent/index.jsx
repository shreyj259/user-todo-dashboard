import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserTodosQuery, useAddUserTodoMutation, useDeleteUserTodoMutation } from '../../redux/api';
import { 
  Paper, Typography, Box, TextField, Button, List, ListItem, ListItemText, 
  IconButton, CircularProgress, Alert, Snackbar, Skeleton 
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';



const TodoComponent = () => {
  const [newTodo, setNewTodo] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const selectedUser = useSelector((state) => state.users.selectedUser);

  const { data=  {todos :[]}, isLoading, isFetching } = useGetUserTodosQuery(
    { userId: selectedUser?.id },
    { skip: !selectedUser?.id }
  );
  const { todos = [] } = data; 

  const [addTodo, { isLoading: isAdding }] = useAddUserTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteUserTodoMutation();

  const handleCloseToast = () => setToast({ ...toast, open: false });
  const showToast = (message, severity = 'success') => setToast({ open: true, message, severity });

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await addTodo({ 
        userId: selectedUser.id, 
        todo: { 
          todo: newTodo,
          completed: false,
          userId: selectedUser.id
        }
      }).unwrap();
      setNewTodo('');
      showToast('Todo added successfully');
    } catch (error) {
      showToast('Failed to add todo', 'error');
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo({ userId: selectedUser.id, todoId }).unwrap();
      showToast('Todo deleted successfully');
    } catch (error) {
      showToast('Failed to delete todo', 'error');
    }
  };

  return (
    <Paper sx={{ p: 2, margin: 'auto' }}>
      <Box component="form" onSubmit={handleAddTodo} sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {isLoading ? <Skeleton width={150} /> : 'Add New Todo'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
            disabled={isAdding}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isAdding || !newTodo.trim()}
            startIcon={isAdding ? <CircularProgress size={20} /> : <Add />}
          >
            Add
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        {isLoading ? <Skeleton width={100} /> : `Todos (${todos.length})`}
      </Typography>

      <List>
        {isLoading || isFetching ? (
          [...Array(3)].map((_, index) => <TodoSkeleton key={index} />)
        ) : todos.length > 0 ? (
          todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={() => handleDeleteTodo(todo.id)}
                  disabled={isDeleting}
                >
                  <Delete />
                </IconButton>
              }
              sx={{
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <ListItemText 
                primary={todo.todo}
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary'
                }}
              />
            </ListItem>
          ))
        ) : (
          <Typography color="text.secondary" align="center">
            No todos found
          </Typography>
        )}
      </List>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseToast} 
          severity={toast.severity}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};


const TodoSkeleton = () => (
  <ListItem
    sx={{
      bgcolor: 'background.paper',
      mb: 1,
      borderRadius: 1,
    }}
  >
    <Skeleton variant="text" width="80%" height={40} />
    <Box sx={{ ml: 'auto' }}>
      <Skeleton variant="circular" width={40} height={40} />
    </Box>
  </ListItem>
);

export default TodoComponent;