# Task Tracker CLI

A simple command line interface (CLI) application to track and manage your tasks effectively.

## Overview

Task Tracker CLI is a Node.js application that allows you to manage your tasks directly from the command line. It provides a straightforward way to add, update, delete, and track the status of your tasks. All tasks are stored in a JSON file for persistence.

## Features

- Add new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as "in progress" or "done"
- List all tasks
- Filter tasks by status (todo, in-progress, done)

## Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/doubleKari/task-tracker-cli.git
   cd task-tracker-cli
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Make the CLI executable:
   ```
   chmod +x app.js
   ```


## Usage


After installation, you can run the app using the command `./app.js <command>`
### Available Commands

```
Task Tracker CLI - Available commands:
  add "description"         - Add a new task
  update <id> "description" - Update a task
  delete <id>               - Delete a task
  mark-in-progress <id>     - Mark task as in-progress
  mark-done <id>            - Mark task as done
  list [status]             - List all tasks or filter by status
                             - Status can be: todo, in-progress, done
```

### Examples

#### Adding a new task
```
task-cli add "Buy groceries"
```
Output: `Task added successfully (ID: 1)`

#### Updating a task
```
task-cli update 1 "Buy groceries and cook dinner"
```
Output: `Task 1 updated successfully.`

#### Deleting a task
```
task-cli delete 1
```
Output: `Task 1 deleted successfully.`

#### Marking a task as in progress
```
task-cli mark-in-progress 1
```
Output: `Task 1 marked as in-progress`

#### Marking a task as done
```
task-cli mark-done 1
```
Output: `Task 1 marked as done`

#### Listing all tasks
```
task-cli list
```

#### Listing tasks by status
```
task-cli list todo
task-cli list in-progress
task-cli list done
```

## Task Properties

Each task has the following properties:

- **id**: A unique identifier for the task
- **description**: A short description of the task
- **status**: The status of the task (todo, in-progress, done)
- **createdAt**: The date and time when the task was created
- **updatedAt**: The date and time when the task was last updated

## Data Storage

Tasks are stored in a JSON file (`task.json`) located in the same directory as the application. This file is automatically created when you add your first task.

## Note

This is a project from [roadmaps.sh](https://roadmap.sh/projects/task-tracker)