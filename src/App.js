import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableComponent from './components/DraggableComponent';
import FormList from './components/FormList';

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <h1>Form Test Realsmart</h1>
                <div className="form-builder">
                  
                    <FormList />
                </div>
            </div>
        </DndProvider>
    );
};

export default App;
