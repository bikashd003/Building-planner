# Building-Planner

This is a simple canvas drawing application built with React and Konva that allows users to create and manipulate various shapes and text on a canvas.
## Live Demo

You can try out the live demo of the application [here](https://building-planner-web-app.netlify.app/).

## Features

- Create rectangles, circles, arrows, lines, scribbles
- Select, move, resize, and delete shapes
- Change stroke color for shapes
- You can download the canvas in png foramt

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed on your local machine

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/bikashd003/Building-planner.git
2. Navigate to the project directory
   ```bash
   cd Building-planner
3. Install dependencies
   ```bash
        npm install
4. Start the development server
   ```bash
   npm run dev

### Usage
- Select a drawing tool from the toolbar.
- Click on the canvas to create shapes.
- Use the selection tool to select, move, resize, or delete shapes.
- Change stroke color using the color picker in the toolbar.
## Future Implementation

1. **Add Basic Annotation**: Implement a feature to allow users to add basic annotations to the canvas, such as length, breadth & any other dimensions of the objects that the user creates.

2. **Add Database for Saving Canvas**: Integrate a database solution to save the canvas data, enabling users to retrieve and access their canvases at a later time. This would provide a convenient way for users to store and retrieve their work for future reference or editing.

## Screenshots

### Toolbar Implementation

![Toolbar](/public/toolbar.png)

### Canvas Area Implementation

![Canvas Area](/public/canvas.png)
