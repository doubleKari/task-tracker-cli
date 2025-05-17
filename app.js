#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TASK_FILE = path.join(__dirname, 'task.json');

const STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    DONE: 'done'
}


//Load or initialize tasks
const loadTasks = () => {
    try {
      // Check if file exists and has content
      if (fs.existsSync(TASK_FILE)) {
        const data = fs.readFileSync(TASK_FILE, 'utf8');
        // If file is empty, return empty array
        if (data.trim() === '') {
          console.log('Tasks file is empty - initializing with empty task list');
          return [];
        }
        return JSON.parse(data);
      }
      console.log('No tasks file found - creating new task database');
      return []; // Return empty array if file doesn't exist
    } catch (err) {
      console.error('Error loading tasks:', err.message);
      return []; // Return empty array on any error
    }
  };



const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Error saving tasks:', err.message);
    // Create file if it doesn't exist
    if (err.code === 'ENOENT') {
      console.log('Creating new tasks file...');
      fs.writeFileSync(TASK_FILE, '[]'); // Initialize with empty array
      saveTasks(tasks); // Retry saving
    } else {
      console.error('Critical error: Could not save tasks');
    }
  }
};

//generate new task ID
const generateId = (tasks) => tasks.length > 0 ? Math.max( ...tasks.map(t => t.id)) + 1 : 1;

//add new task
const addTask = (description) => {


    const tasks = loadTasks();
    const newTask = {
        id: generateId(tasks),
        description,
        status: STATUS.TODO,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString() 
    };

    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
    
}


//update a task
const updateTask = (id, description) => {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex == -1){
        console.error("Task not found.");
        return;
        
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        description, 
        updatedAt: new Date().toISOString()
    };

    saveTasks(tasks);
    console.log(`Task ${id} updated successfully.`);
    

}


//delete a task
const deleteTask = (id) => {
    const tasks = loadTasks();
    const filteredTasks = tasks.filter(t => t.id == parseInt(id))

    if (taskIndex === -1){
        console.error("Task not found");
        return;
    }

   saveTasks(filteredTasks);
   console.log(`Task ${id} deleted successfully.`);
}


//change task status
const changeStatus = (id, status) => {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1){
        console.error("Task not found");
        return;
    }

    tasks[taskIndex] = {
        ...task[taskIndex],
        status, 
        updatedAt: new Date().toISOString()
    }

    saveTasks(tasks);
    console.log(`Task ${id} marked as ${status}`);



    
}


//mark task as in progress
const markInProgress = (id) =>  changeStatus(id, STATUS.IN_PROGRESS);


//mark task as done
const markDone = (id) => changeStatus(id, STATUS.DONE);


const listTasks = (statusFilter) => {
    const tasks = loadTasks();
    const filteredTasks = statusFilter 
      ? tasks.filter(t => t.status === statusFilter)
      : tasks;
    
    if (filteredTasks.length === 0) {
      const message = statusFilter 
        ? `No tasks with status "${statusFilter}" found`
        : 'No tasks found';
      console.log(message);
      return;
    }
    
    displayTasks(filteredTasks);
  };

//display  tasks in formatted way

const displayTasks = (tasks) => {
    console.log('\nTasks:');
    console.log('----------------------------------------');
    tasks.forEach(task => {
      console.log(`ID: ${task.id}`);
      console.log(`Description: ${task.description}`);
      console.log(`Status: ${task.status}`);
      console.log(`Created: ${new Date(task.createdAt).toLocaleString()}`);
      console.log(`Updated: ${new Date(task.updatedAt).toLocaleString()}`);
      console.log('----------------------------------------');
    });
  };

  const main = () => {
    const [,, command, ...args] = process.argv;
    
    const commands = {
      add: () => {
        if (args.length < 1) throw new Error('Usage: task-cli add "task description"');
        addTask(args[0]);
      },
      update: () => {
        if (args.length < 2) throw new Error('Usage: task-cli update <id> "new description"');
        updateTask(args[0], args[1]);
      },
      delete: () => {
        if (args.length < 1) throw new Error('Usage: task-cli delete <id>');
        deleteTask(args[0]);
      },
      'mark-in-progress': () => {
        if (args.length < 1) throw new Error('Usage: task-cli mark-in-progress <id>');
        markInProgress(args[0]);
      },
      'mark-done': () => {
        if (args.length < 1) throw new Error('Usage: task-cli mark-done <id>');
        markDone(args[0]);
      },
      list: () => {
        if (args.length > 0) {
          if (!Object.values(STATUS).includes(args[0])) {
            throw new Error('Invalid status. Use: todo, in-progress, or done');
          }
          listTasks(args[0]);
        } else {
          listTasks();
        }
      },

      help: () => {
        console.log('Task Tracker CLI - Available commands:');
        console.log('  add "description"         - Add a new task');
        console.log('  update <id> "description" - Update a task');
        console.log('  delete <id>               - Delete a task');
        console.log('  mark-in-progress <id>     - Mark task as in-progress');
        console.log('  mark-done <id>            - Mark task as done');
        console.log('  list [status]             - List all tasks or filter by status');
        console.log('                             - Status can be: todo, in-progress, done');
      }
    };
  
    try {
      if (!command || command === 'help') {
        commands.help();
      } else if (commands[command]) {
        commands[command]();
      } else {
        throw new Error(`Unknown command: ${command}`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };
  
  // Run the CLI
  main();