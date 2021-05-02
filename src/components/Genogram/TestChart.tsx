import React, { useState } from 'react'

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { makeStyles } from '@material-ui/core';

interface Props {
    
}



const TestChart = (props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [chartData, setChartData] = useState(mdata);

    const classes = useStyles();

    const $ = go.GraphObject.make;

    const diagram =
      $(go.Diagram,
        {
          'undoManager.isEnabled': true,  // must be set to allow for model change listening
          // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
          'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
          model: $(go.GraphLinksModel,
            {
              linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
            })
        });


    // define a simple Node template
    diagram.nodeTemplate =
      $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
          // Shape.fill is bound to Node.data.color
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { margin: 8, editable: true },  // some room around the text
          new go.Binding('text').makeTwoWay()
        )
      );


      function initDiagram() {
        const $ = go.GraphObject.make;
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
        const diagram =
          $(go.Diagram,
            {
              'undoManager.isEnabled': true,  // must be set to allow for model change listening
              // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
              'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
              model: $(go.GraphLinksModel,
                {
                  linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                })
            });
    
        // define a simple Node template
        diagram.nodeTemplate =
          $(go.Node, 'Auto',  // the Shape will go around the TextBlock
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, 'RoundedRectangle',
              { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
              // Shape.fill is bound to Node.data.color
              new go.Binding('fill', 'color')),
            $(go.TextBlock,
              { margin: 8, editable: true },  // some room around the text
              new go.Binding('text').makeTwoWay()
            )
          );
    
        return diagram;
      }

      function handleModelChange(changes: any) {
        // alert(`GoJS model changed! ${changes}` );
        setChartData(changes);
      }
        

    return (
        <div>
            <ReactDiagram
          initDiagram={initDiagram}
          divClassName={classes.diagramcomponent}
          skipsDiagramUpdate={true}
        //   modelData={chartData}
          nodeDataArray={[
            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
          ]}
          linkDataArray={[
            { key: -1, from: 0, to: 1 },
            { key: -2, from: 0, to: 2 },
            { key: -3, from: 1, to: 1 },
            { key: -4, from: 2, to: 3 },
            { key: -5, from: 3, to: 0 }
          ]}
          onModelChange={handleModelChange}
        />
        </div>
    )
}

let mdata: any[] = [
    { key: 0, n: "Aaron", s: "M", m:-10, f:-11, ux: 1, a: ["C", "F", "K"] },
    { key: 1, n: "Alice", s: "F", m:-12, f:-13, a: ["B", "H", "K"] },
    { key: 2, n: "Bob", s: "M", m: 1, f: 0, ux: 3, a: ["C", "H", "L"] },
    { key: 3, n: "Barbara", s: "F", a: ["C"] },
    { key: 4, n: "Bill", s: "M", m: 1, f: 0, ux: 5, a: ["E", "H"] },
    { key: 5, n: "Brooke", s: "F", a: ["B", "H", "L"] },
    { key: 6, n: "Claire", s: "F", m: 1, f: 0, a: ["C"] },
    { key: 7, n: "Carol", s: "F", m: 1, f: 0, a: ["C", "I"] },
    { key: 8, n: "Chloe", s: "F", m: 1, f: 0, vir: 9, a: ["E"] },
    { key: 9, n: "Chris", s: "M", a: ["B", "H"] },
    { key: 10, n: "Ellie", s: "F", m: 3, f: 2, a: ["E", "G"] },
    { key: 11, n: "Dan", s: "M", m: 3, f: 2, a: ["B", "J"] },
    { key: 12, n: "Elizabeth", s: "F", vir: 13, a: ["J"] },
    { key: 13, n: "David", s: "M", m: 5, f: 4, a: ["B", "H"] },
    { key: 14, n: "Emma", s: "F", m: 5, f: 4, a: ["E", "G"] },
    { key: 15, n: "Evan", s: "M", m: 8, f: 9, a: ["F", "H"] },
    { key: 16, n: "Ethan", s: "M", m: 8, f: 9, a: ["D", "K", "S"] },
    { key: 17, n: "Eve", s: "F", vir: 16, a: ["B", "F", "L", "S"] },
    { key: 18, n: "Emily", s: "F", m: 8, f: 9 },
    { key: 19, n: "Fred", s: "M", m: 17, f: 16, a: ["B"] },
    { key: 20, n: "Faith", s: "F", m: 17, f: 16, a: ["L"] },
    { key: 21, n: "Felicia", s: "F", m: 12, f: 13, a: ["H"] },
    { key: 22, n: "Frank", s: "M", m: 12, f: 13, a: ["B", "H"] },

    // "Aaron"'s ancestors
    { key: -10, n: "Paternal Grandfather", s: "M", m: -33, f: -32, ux: -11, a: ["A"] },
    { key: -11, n: "Paternal Grandmother", s: "F", a: ["E"] },
    { key: -32, n: "Paternal Great", s: "M", ux: -33, a: ["F", "H"] },
    { key: -33, n: "Paternal Great", s: "F" },
    { key: -40, n: "Great Uncle", s: "M", m: -33, f: -32, a: ["F", "H"] },
    { key: -41, n: "Great Aunt", s: "F", m: -33, f: -32, a: ["B", "I"] },
    { key: -20, n: "Uncle", s: "M", m: -11, f: -10, a: ["A"] },

    // "Alice"'s ancestors
    { key: -12, n: "Maternal Grandfather", s: "M", ux: -13, a: ["D", "L"] },
    { key: -13, n: "Maternal Grandmother", s: "F", m: -31, f: -30, a: ["H"] },
    { key: -21, n: "Aunt", s: "F", m: -13, f: -12, a: ["C", "I"] },
    { key: -22, n: "uncle", s: "M", ux: -21 },
    { key: -23, n: "cousin", s: "M", m: -21, f: -22 },
    { key: -30, n: "Maternal Great", s: "M", ux: -31, a: ["D", "J"] },
    { key: -31, n: "Maternal Great", s: "F", m: -50, f: -51, a: ["B", "H", "L"] },
    { key: -42, n: "Great Uncle", s: "M", m: -30, f: -31, a: ["C", "J"] },
    { key: -43, n: "Great Aunt", s: "F", m: -30, f: -31, a: ["E", "G"] },
    { key: -50, n: "Maternal Great Great", s: "F", ux: -51, a: ["D", "I"] },
    { key: -51, n: "Maternal Great Great", s: "M", a: ["B", "H"] }
  ]



  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    content: {
      marginTop: '40px',
      flexGrow: 1,
      height: '100vh',
      overflow: 'none',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },

    menuButton: {
      marginRight: theme.spacing(2),
      // [theme.breakpoints.up('sm')]: {
      //   display: 'none',
      // },
    },
    diagramcomponent: {
        width: '400px',
        height: '400px',
        border: 'solid 1px black',
        backgroundColor: 'white',
    }
  }))

export default TestChart
