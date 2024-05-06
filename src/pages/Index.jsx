import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={8}>
        <Heading size="lg">Todo App</Heading>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }} width="full">
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            mr={2}
          />
          <Button colorScheme="blue" px={8} type="submit">Add</Button>
        </Flex>
        <List spacing={3} width="full">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <Flex>
                <IconButton
                  aria-label="Complete task"
                  icon={<FaCheckCircle />}
                  onClick={() => toggleTaskCompletion(task.id)}
                  colorScheme={task.isCompleted ? "green" : "gray"}
                  mr={2}
                />
                <IconButton
                  aria-label="Delete task"
                  icon={<FaTrash />}
                  onClick={() => deleteTask(task.id)}
                  colorScheme="red"
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;